const trustedLogos = [
    { name: 'Amazon', svg: 'M.045 18.02c.072-.116.187-.124.348-.022 2.344 1.758 4.974 2.635 7.89 2.635 2.17 0 4.477-.55 6.926-1.645.355-.159.609-.1.76.182.15.28.025.525-.375.734-2.475 1.116-5.1 1.673-7.875 1.673-3.413 0-6.304-.916-8.675-2.75-.18-.135-.18-.27 0-.41zm22.45-2.56c-.197-.255-.964-.305-1.975-.193-.494.057-.905.145-1.237.26-.18.064-.227-.02-.148-.257.148-.387.5-.89.836-1.147.336-.26.862-.39 1.577-.39.715 0 1.225.082 1.527.247.305.165.43.458.38.877-.035.295-.16.684-.37 1.17-.215.484-.386.78-.518.887-.13.107-.23.058-.3-.147s-.073-.505.228-1.304z' },
    { name: 'Flipkart', text: 'F' },
    { name: 'PharmEasy', text: 'PE' },
    { name: 'Nykaa', text: 'N' },
    { name: '1mg', text: '1mg' },
    { name: 'BigBasket', text: 'BB' },
    { name: 'JioMart', text: 'JM' },
    { name: 'Netmeds', text: 'NM' },
    { name: 'Meesho', text: 'M' },
    { name: 'Healthkart', text: 'HK' },
];

const TrustedBy = () => {
    // Duplicate for infinite scroll
    const allLogos = [...trustedLogos, ...trustedLogos];

    return (
        <section className="py-14 sm:py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-8">
                <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                    Trusted by leading platforms across India
                </p>
            </div>

            {/* Scrolling logo strip */}
            <div className="relative">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex animate-scroll-logos gap-12 sm:gap-16 items-center w-max">
                    {allLogos.map((logo, idx) => (
                        <div
                            key={`${logo.name}-${idx}`}
                            className="flex items-center gap-2.5 px-4 shrink-0 group"
                        >
                            {/* Logo mark */}
                            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-gray-600 group-hover:border-gray-200 transition-all duration-300">
                                {logo.svg ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d={logo.svg} />
                                    </svg>
                                ) : (
                                    <span className="text-xs font-black">{logo.text}</span>
                                )}
                            </div>
                            <span className="text-sm font-bold text-gray-300 group-hover:text-gray-500 transition-colors duration-300 select-none whitespace-nowrap">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
