import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders, Order } from '../hooks/useOrders';
import { useWallet } from '../hooks/useWallet';
import { useWishlist } from '../hooks/useWishlist';
import { useAddresses, Address } from '../hooks/useAddresses';
import { useProducts } from '../hooks/useProducts';

const Account = () => {
  const { user, isLoading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Supabase hooks
  const { orders, loading: ordersLoading } = useOrders();
  const { wallet, transactions, loading: walletLoading, addMoney } = useWallet();
  const { wishlistIds, toggleWishlist, loading: wishlistLoading } = useWishlist();
  const { addresses, loading: addressesLoading, addAddress, updateAddress, deleteAddress } = useAddresses();
  const { products } = useProducts();

  // Order filters
  const [orderFilter, setOrderFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');

  // Address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addrForm, setAddrForm] = useState({ label: 'Home', full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '', is_default: false });

  // Wallet add money
  const [walletAmount, setWalletAmount] = useState('');
  const [addingMoney, setAddingMoney] = useState(false);

  // Populate profile from auth user
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Auth guard — redirect to login when logged out
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }


  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile({
      full_name: profileData.name,
      phone: profileData.phone,
    });
    setSaving(false);
    setIsEditing(false);
  };

  const handleAddMoney = async () => {
    const amt = parseFloat(walletAmount);
    if (!amt || amt <= 0) return;
    setAddingMoney(true);
    try {
      await addMoney(amt);
      setWalletAmount('');
    } catch (error) {
      alert('Failed to add money. Please try again.');
    } finally {
      setAddingMoney(false);
    }
  };

  const handleAddressSubmit = async () => {
    // Validate required fields
    if (!addrForm.full_name.trim() || !addrForm.phone.trim() || !addrForm.address_line.trim() || !addrForm.city.trim() || !addrForm.state.trim() || !addrForm.pincode.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    if (editingAddress) {
      await updateAddress(editingAddress.id, addrForm);
    } else {
      await addAddress(addrForm);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddrForm({ label: 'Home', full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '', is_default: false });
  };

  const badge = (s: string) =>
    s === 'delivered' ? 'bg-emerald-100 text-emerald-700'
      : s === 'shipped' ? 'bg-sky-100 text-sky-700'
        : s === 'cancelled' ? 'bg-red-100 text-red-600'
          : 'bg-amber-100 text-amber-700';

  const filteredOrders = orders.filter(o => {
    const matchesFilter = orderFilter === 'All' || o.status.toLowerCase() === orderFilter.toLowerCase();
    const matchesSearch = !orderSearch || o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.items.some(i => i.product_name.toLowerCase().includes(orderSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Wishlist products
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const sectionTitle = (title: string) => (
    <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
      {title}
    </h2>
  );

  const spinner = (
    <div className="flex justify-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ─── PROFILE ─── */}
        {tab === 'profile' && (
          <div>
            {sectionTitle('My Profile')}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-8 pb-6 border-b border-gray-100">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-pink-100 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-100 shadow-sm flex items-center justify-center">
                    <User className="w-10 h-10 text-pink-400" />
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 truncate">{profileData.name || 'User'}</h3>
                  <p className="text-sm text-gray-400 mt-0.5 truncate">{profileData.email}</p>
                </div>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all">
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={handleSaveProfile} disabled={saving} className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all disabled:opacity-50">
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setIsEditing(false)} className="flex-1 sm:flex-initial px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">Cancel</button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {Object.entries(profileData).map(([key, val]) => (
                  <div key={key}>
                    <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">{key}</label>
                    <input
                      type={key === 'email' ? 'email' : 'text'}
                      value={val}
                      onChange={e => setProfileData({ ...profileData, [key]: e.target.value })}
                      disabled={!isEditing || key === 'email'}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 disabled:text-gray-500 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-6 bg-white rounded-2xl border border-red-100 shadow-sm p-5 sm:p-6">
              <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back.</p>
              <div className="flex gap-3">
                <button onClick={async () => { await logout(); navigate('/'); }} className="w-full sm:w-auto px-5 py-2.5 border-2 border-red-200 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">Log Out</button>
              </div>
            </div>
          </div>
        )}

        {/* ─── ORDERS ─── */}
        {tab === 'orders' && (
          <div>
            {sectionTitle('My Orders')}

            {ordersLoading ? spinner : orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
                <p className="text-5xl mb-4">📦</p>
                <p className="font-bold text-gray-900 text-lg">No orders yet</p>
                <p className="text-sm text-gray-400 mt-2">Start shopping to see your orders here</p>
                <Link to="/products" className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl text-sm font-bold hover:bg-pink-700 transition-all">Start Shopping</Link>
              </div>
            ) : (
              <>
                {/* Summary strip */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">{orders.filter(o => o.status === 'delivered').length}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivered</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-sky-600">{orders.filter(o => o.status === 'shipped').length}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Transit</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">{orders.filter(o => o.status === 'processing').length}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Processing</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={orderSearch}
                      onChange={e => setOrderSearch(e.target.value)}
                      className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 w-56 transition-all"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" /></svg>
                  </div>
                </div>

                {/* Filter chips */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                  {['All', 'processing', 'shipped', 'delivered', 'cancelled'].map(f => {
                    const count = f === 'All' ? orders.length : orders.filter(o => o.status === f).length;
                    const isActive = orderFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setOrderFilter(f)}
                        className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all capitalize ${isActive ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400'}`}
                      >
                        {f}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Order Cards */}
                <div className="space-y-4">
                  {filteredOrders.map((o: Order) => {
                    const firstItem = o.items[0];
                    const orderDate = new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                    return (
                      <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
                        {/* Order header */}
                        <div className="flex items-center justify-between px-5 py-3 bg-gray-50/80 border-b border-gray-100 flex-wrap gap-2">
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-500">ORDER <span className="text-gray-900">{o.id}</span></span>
                            <span className="text-xs text-gray-400">Placed {orderDate}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400">Paid via <span className="font-semibold text-gray-600">{o.payment_method}</span></span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${badge(o.status)}`}>{o.status}</span>
                          </div>
                        </div>

                        {/* Order body */}
                        <div className="p-5">
                          <div className="flex gap-5">
                            {firstItem && (
                              <div className="relative shrink-0">
                                <img src={firstItem.product_image} alt="" className="w-24 h-24 rounded-xl object-cover border border-gray-100" />
                                {o.items.length > 1 && (
                                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">+{o.items.length - 1}</span>
                                )}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 text-base">
                                {firstItem ? firstItem.product_name : 'Order'} {o.items.length > 1 && `and ${o.items.length - 1} more`}
                              </h4>
                              {firstItem && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                  {firstItem.size && <span className="text-xs text-gray-400">Size: <span className="font-semibold text-gray-600">{firstItem.size}</span></span>}
                                  {firstItem.color && <span className="text-xs text-gray-400">Color: <span className="font-semibold text-gray-600">{firstItem.color}</span></span>}
                                  <span className="text-xs text-gray-400">Qty: <span className="font-semibold text-gray-600">{firstItem.quantity}</span></span>
                                </div>
                              )}
                              <div className="mt-3">
                                {o.status === 'delivered' && (
                                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">✓ Delivered{o.delivered_at ? ` on ${new Date(o.delivered_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : ''}</p>
                                )}
                                {o.status === 'shipped' && <p className="text-xs text-sky-600 font-semibold">🚚 In transit</p>}
                                {o.status === 'processing' && <p className="text-xs text-amber-600 font-semibold">⏳ Processing</p>}
                                {o.status === 'cancelled' && <p className="text-xs text-red-500 font-semibold">Order was cancelled</p>}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xl font-bold text-gray-900">₹{o.total}</p>
                              {o.discount > 0 && <p className="text-xs text-emerald-600 font-semibold mt-1">You saved ₹{o.discount}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Action footer */}
                        <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50/50 border-t border-gray-100">
                          {o.status === 'delivered' && (
                            <button
                              onClick={() => navigate('/products')}
                              className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all"
                            >
                              🛒 Buy Again
                            </button>
                          )}
                          {o.status === 'processing' && (
                            <button className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-100 transition-all">⏳ Estimated: 3–5 days</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── WALLET ─── */}
        {tab === 'wallet' && (
          <div>
            {sectionTitle('Wallet')}
            {walletLoading ? spinner : (
              <>
                <div className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-rose-400 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                  <p className="text-white/70 text-sm">Available Balance</p>
                  <p className="text-4xl font-bold mt-1 mb-5">₹{wallet.balance.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="₹ Amount"
                      value={walletAmount}
                      onChange={e => setWalletAmount(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white/15 border border-white/25 rounded-xl text-white placeholder-white/50 focus:outline-none text-sm"
                    />
                    <button
                      onClick={handleAddMoney}
                      disabled={addingMoney}
                      className="px-6 py-2.5 bg-white text-fuchsia-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      {addingMoney ? '...' : 'Add'}
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <h3 className="font-bold text-gray-900 px-5 py-4 border-b border-gray-100">Transaction History</h3>
                  {transactions.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-sm">No transactions yet</div>
                  ) : (
                    transactions.map(t => (
                      <div key={t.id} className="flex items-center justify-between px-5 py-4 border-t border-gray-50 first:border-t-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold ${t.type === 'credit' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
                            {t.type === 'credit' ? '↓' : '↑'}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{t.description}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                          </div>
                        </div>
                        <p className={`font-bold ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>{t.type === 'credit' ? '+' : '−'}₹{t.amount}</p>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── WISHLIST ─── */}
        {tab === 'wishlist' && (
          <div>
            {sectionTitle('My Wishlist')}
            {wishlistLoading ? spinner : wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
                <p className="text-5xl mb-4">💝</p>
                <p className="font-bold text-gray-900 text-lg">Your wishlist is empty</p>
                <p className="text-sm text-gray-400 mt-2">Save items you love and come back to them later</p>
                <Link to="/products" className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl text-sm font-bold hover:bg-pink-700 transition-all">Start Shopping</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                    <Link to={`/products/${p.id}`} className="flex gap-4 p-4">
                      <img src={p.image} alt={p.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm truncate">{p.name}</h4>
                        <p className="text-pink-600 font-bold mt-1">₹{p.price}</p>
                        {p.originalPrice && <p className="text-xs text-gray-400 line-through">₹{p.originalPrice}</p>}
                        <p className="text-xs text-gray-500 mt-1">⭐ {p.rating} ({p.reviews} reviews)</p>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="w-full py-2 text-xs font-bold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-all"
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── ADDRESSES ─── */}
        {tab === 'addresses' && (
          <div>
            {sectionTitle('Saved Addresses')}
            {addressesLoading ? spinner : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                {addresses.length === 0 && !showAddressForm ? (
                  <div className="py-12 text-center">
                    <p className="text-5xl mb-4">📍</p>
                    <p className="font-bold text-gray-900 text-lg">No saved addresses</p>
                    <p className="text-sm text-gray-400 mt-2">Add an address for faster checkout</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`flex items-start gap-4 p-4 rounded-xl border ${addr.is_default ? 'bg-pink-50/50 border-pink-100' : 'border-gray-100'}`}>
                        <span className="text-2xl">📍</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-gray-900">{addr.full_name}</p>
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">{addr.label}</span>
                            {addr.is_default && <span className="text-[10px] font-bold bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">DEFAULT</span>}
                          </div>
                          <p className="text-sm text-gray-600">{addr.address_line}</p>
                          <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-sm text-gray-500 mt-1">Phone: {addr.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingAddress(addr);
                              setAddrForm({ label: addr.label, full_name: addr.full_name, phone: addr.phone, address_line: addr.address_line, city: addr.city, state: addr.state, pincode: addr.pincode, is_default: addr.is_default });
                              setShowAddressForm(true);
                            }}
                            className="text-sm text-pink-600 font-bold hover:text-pink-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button onClick={() => deleteAddress(addr.id)} className="text-sm text-red-500 font-bold hover:text-red-600 transition-colors">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Address Form */}
                {showAddressForm && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">{editingAddress ? 'Edit Address' : 'Add New Address'}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input value={addrForm.full_name} onChange={e => setAddrForm({ ...addrForm, full_name: e.target.value })} placeholder="Full Name" className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400" />
                      <input value={addrForm.phone} onChange={e => setAddrForm({ ...addrForm, phone: e.target.value })} placeholder="Phone" className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400" />
                      <input value={addrForm.address_line} onChange={e => setAddrForm({ ...addrForm, address_line: e.target.value })} placeholder="Address" className="sm:col-span-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400" />
                      <input value={addrForm.city} onChange={e => setAddrForm({ ...addrForm, city: e.target.value })} placeholder="City" className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400" />
                      <input value={addrForm.state} onChange={e => setAddrForm({ ...addrForm, state: e.target.value })} placeholder="State" className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400" />
                      <input value={addrForm.pincode} onChange={e => setAddrForm({ ...addrForm, pincode: e.target.value })} placeholder="Pincode" className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400" />
                      <select value={addrForm.label} onChange={e => setAddrForm({ ...addrForm, label: e.target.value })} className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400">
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                      <input type="checkbox" checked={addrForm.is_default} onChange={e => setAddrForm({ ...addrForm, is_default: e.target.checked })} className="rounded" />
                      Set as default address
                    </label>
                    <div className="flex gap-3 mt-5">
                      <button onClick={handleAddressSubmit} className="px-6 py-2.5 bg-pink-600 text-white rounded-xl text-sm font-bold hover:bg-pink-700 transition-all">
                        {editingAddress ? 'Update' : 'Save Address'}
                      </button>
                      <button onClick={() => { setShowAddressForm(false); setEditingAddress(null); }} className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">Cancel</button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { setShowAddressForm(true); setEditingAddress(null); setAddrForm({ label: 'Home', full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '', is_default: false }); }}
                  className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:border-pink-300 hover:text-pink-600 transition-all"
                >
                  + Add New Address
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── GENERIC SECTIONS ─── */}
        {['coupons', 'gift-cards', 'saved-cards'].includes(tab) && (
          <div>
            {sectionTitle(tab === 'coupons' ? 'Coupons & Offers' : tab === 'gift-cards' ? 'Gift Cards' : 'Saved Cards')}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
              <p className="text-5xl mb-4">{tab === 'coupons' ? '🎟️' : tab === 'gift-cards' ? '🎁' : '💳'}</p>
              <p className="font-bold text-gray-900 text-lg">Coming Soon</p>
              <p className="text-sm text-gray-400 mt-2">This feature is under development</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Account;
