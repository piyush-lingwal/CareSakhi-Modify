import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sarah Johnson',
    email: user?.email || 'sarah@example.com',
    phone: '+91 98765 43210',
    address: '123 Wellness Way, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
  });

  const orders = [
    { id: 'CS-2024-1150', date: '15 Jan 2024', status: 'Delivered', deliveredOn: '18 Jan 2024', total: 899, name: 'EcoFlow Starter Kit', size: 'Regular', color: 'Blush Pink', qty: 2, payment: 'UPI', discount: 100, img: 'https://ecofriendlyitems.com/cdn/shop/files/EcoFlowKitonpinkbackground_670a3761-6a4d-4c4e-850c-6679c74f7e20.jpg?v=1706546411&width=1946' },
    { id: 'CS-2024-1098', date: '10 Jan 2024', status: 'Shipped', deliveredOn: 'Expected 20 Jan', total: 520, name: 'ComfortMax Period Brief', size: 'M', color: 'Midnight Black', qty: 1, payment: 'Card', discount: 0, img: 'https://ae01.alicdn.com/kf/S57bf14fa52454c16934ae43989ed0a431.jpg?width=800&height=800&hash=1600' },
    { id: 'CS-2024-1042', date: '5 Jan 2024', status: 'Processing', deliveredOn: 'Expected 12 Jan', total: 1255, name: 'Premium Wellness Kit', size: 'Large', color: 'Sage Green', qty: 3, payment: 'Wallet', discount: 200, img: 'https://m.media-amazon.com/images/I/41T+fJ8fccL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg' },
    { id: 'CS-2024-0988', date: '28 Dec 2023', status: 'Cancelled', deliveredOn: '—', total: 450, name: 'Organic Cotton Pads (Pack of 30)', size: 'Regular', color: 'Natural White', qty: 1, payment: 'COD', discount: 50, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn6UALBLFvrhzutfWpX3EHb3JbOXlQhwyilg&s' },
  ];

  const transactions = [
    { id: 1, type: 'in' as const, amount: 500, date: '20 Jan', label: 'Wallet top-up' },
    { id: 2, type: 'out' as const, amount: 89, date: '15 Jan', label: 'Order CS-2024-1150' },
    { id: 3, type: 'in' as const, amount: 50, date: '8 Jan', label: 'Cashback reward' },
    { id: 4, type: 'out' as const, amount: 125, date: '5 Jan', label: 'Order CS-2024-1042' },
  ];

  const badge = (s: string) =>
    s === 'Delivered' ? 'bg-emerald-100 text-emerald-700'
      : s === 'Shipped' ? 'bg-sky-100 text-sky-700'
        : s === 'Cancelled' ? 'bg-red-100 text-red-600'
          : 'bg-amber-100 text-amber-700';

  /* ─── Sections ─── */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  const sectionTitle = (title: string) => (
    <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
      {title}
    </h2>
  );

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ─── PROFILE ─── */}
        {tab === 'profile' && (
          <div>
            {sectionTitle('My Profile')}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt=""
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-pink-100 shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{profileData.name}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{profileData.email}</p>
                </div>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all">
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">Save</button>
                    <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">Cancel</button>
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
                      disabled={!isEditing}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 disabled:text-gray-500 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-6 bg-white rounded-2xl border border-red-100 shadow-sm p-6">
              <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back.</p>
              <div className="flex gap-3">
                <button onClick={logout} className="px-5 py-2.5 border-2 border-red-200 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">Log Out</button>
                <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all">Delete Account</button>
              </div>
            </div>
          </div>
        )}

        {/* ─── ORDERS ─── */}
        {tab === 'orders' && (
          <div>
            {sectionTitle('My Orders')}

            {/* Summary strip */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{orders.filter(o => o.status === 'Delivered').length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivered</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-sky-600">{orders.filter(o => o.status === 'Shipped').length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Transit</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{orders.filter(o => o.status === 'Processing').length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Processing</p>
                </div>
              </div>
              {/* Search */}
              <div className="relative">
                <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 w-56 transition-all" />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f, i) => {
                const count = f === 'All' ? orders.length : orders.filter(o => o.status === f).length;
                return (
                  <button key={f} className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400'}`}>
                    {f}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${i === 0 ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Order Cards */}
            <div className="space-y-4">
              {orders.map(o => (
                <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
                  {/* Order header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-gray-50/80 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-gray-500">ORDER <span className="text-gray-900">{o.id}</span></span>
                      <span className="text-xs text-gray-400">Placed {o.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">Paid via <span className="font-semibold text-gray-600">{o.payment}</span></span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${badge(o.status)}`}>{o.status}</span>
                    </div>
                  </div>

                  {/* Order body */}
                  <div className="p-5">
                    <div className="flex gap-5">
                      {/* Product image */}
                      <div className="relative shrink-0">
                        <img src={o.img} alt="" className="w-24 h-24 rounded-xl object-cover border border-gray-100" />
                        {o.qty > 1 && (
                          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">×{o.qty}</span>
                        )}
                      </div>

                      {/* Product details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-base">{o.name}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                          <span className="text-xs text-gray-400">Size: <span className="font-semibold text-gray-600">{o.size}</span></span>
                          <span className="text-xs text-gray-400">Color: <span className="font-semibold text-gray-600">{o.color}</span></span>
                          <span className="text-xs text-gray-400">Qty: <span className="font-semibold text-gray-600">{o.qty}</span></span>
                        </div>

                        {/* Delivery info */}
                        <div className="mt-3">
                          {o.status === 'Delivered' && (
                            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">✓ Delivered on {o.deliveredOn}</p>
                          )}
                          {o.status === 'Shipped' && (
                            <div className="flex items-center gap-3 mt-1">
                              {/* Mini tracking timeline */}
                              <div className="flex items-center gap-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                                <div className="w-8 h-0.5 bg-emerald-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                                <div className="w-8 h-0.5 bg-sky-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-sky-100 animate-pulse" />
                                <div className="w-8 h-0.5 bg-gray-200" />
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 ring-2 ring-gray-100" />
                              </div>
                              <span className="text-xs text-sky-600 font-semibold">{o.deliveredOn}</span>
                            </div>
                          )}
                          {o.status === 'Processing' && (
                            <p className="text-xs text-amber-600 font-semibold flex items-center gap-1">⏳ {o.deliveredOn}</p>
                          )}
                          {o.status === 'Cancelled' && (
                            <p className="text-xs text-red-500 font-semibold">Order was cancelled</p>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <p className="text-xl font-bold text-gray-900">₹{o.total}</p>
                        {o.discount > 0 && (
                          <p className="text-xs text-emerald-600 font-semibold mt-1">You saved ₹{o.discount}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action footer */}
                  <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50/50 border-t border-gray-100">
                    {o.status === 'Delivered' && (
                      <>
                        <button className="flex-1 py-2.5 bg-pink-600 text-white rounded-xl text-xs font-bold hover:bg-pink-700 transition-all">★ Rate & Review</button>
                        <button className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">↩ Return / Exchange</button>
                        <button className="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">Buy Again</button>
                      </>
                    )}
                    {o.status === 'Shipped' && (
                      <>
                        <button className="flex-1 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition-all">🚚 Track Package</button>
                        <button className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">Need Help?</button>
                      </>
                    )}
                    {o.status === 'Processing' && (
                      <>
                        <button className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-100 transition-all">⏳ Estimated: 3–5 days</button>
                        <button className="flex-1 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl text-xs font-bold hover:bg-red-50 transition-all">Cancel Order</button>
                      </>
                    )}
                    {o.status === 'Cancelled' && (
                      <>
                        <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all">🛒 Buy Again</button>
                        <button className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">View Refund Status</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── WALLET ─── */}
        {tab === 'wallet' && (
          <div>
            {sectionTitle('Wallet')}
            <div className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-rose-400 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
              <p className="text-white/70 text-sm">Available Balance</p>
              <p className="text-4xl font-bold mt-1 mb-5">₹358.01</p>
              <div className="flex gap-2">
                <input type="number" placeholder="₹ Amount" className="flex-1 px-4 py-2.5 bg-white/15 border border-white/25 rounded-xl text-white placeholder-white/50 focus:outline-none text-sm" />
                <button className="px-6 py-2.5 bg-white text-fuchsia-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">Add</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <h3 className="font-bold text-gray-900 px-5 py-4 border-b border-gray-100">Transaction History</h3>
              {transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between px-5 py-4 border-t border-gray-50 first:border-t-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold ${t.type === 'in' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
                      {t.type === 'in' ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{t.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{t.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${t.type === 'in' ? 'text-emerald-600' : 'text-red-500'}`}>{t.type === 'in' ? '+' : '−'}₹{t.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── WISHLIST ─── */}
        {tab === 'wishlist' && (
          <div>
            {sectionTitle('My Wishlist')}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
              <p className="text-5xl mb-4">💝</p>
              <p className="font-bold text-gray-900 text-lg">Your wishlist is empty</p>
              <p className="text-sm text-gray-400 mt-2">Save items you love and come back to them later</p>
              <a href="/products" className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl text-sm font-bold hover:bg-pink-700 transition-all">Start Shopping</a>
            </div>
          </div>
        )}

        {/* ─── ADDRESSES ─── */}
        {tab === 'addresses' && (
          <div>
            {sectionTitle('Saved Addresses')}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-4 p-4 bg-pink-50/50 rounded-xl border border-pink-100">
                <span className="text-2xl">📍</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-gray-900">{profileData.name}</p>
                    <span className="text-[10px] font-bold bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">DEFAULT</span>
                  </div>
                  <p className="text-sm text-gray-600">{profileData.address}</p>
                  <p className="text-sm text-gray-600">{profileData.city}, {profileData.state} - {profileData.pincode}</p>
                  <p className="text-sm text-gray-500 mt-1">Phone: {profileData.phone}</p>
                </div>
                <button className="text-sm text-pink-600 font-bold hover:text-pink-700 transition-colors">Edit</button>
              </div>
              <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:border-pink-300 hover:text-pink-600 transition-all">
                + Add New Address
              </button>
            </div>
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
