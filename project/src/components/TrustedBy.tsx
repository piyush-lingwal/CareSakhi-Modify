const trustedLogos = [
    { name: 'Saukhyam Pads', logo: '/logos/Saukhyam.svg' },
    { name: 'Goonj', logo: '/logos/goonj.png' },
    { name: 'SHE Wings', logo: '/logos/she wings.webp' },
    { name: 'Eco Femme', logo: '/logos/eco fem.png' },
    { name: 'Aakar Innovations', logo: '/logos/aakar.png' },
    { name: 'Uger Pads', logo: '/logos/jatan-logoooooo.png' },
    { name: 'Amrita Foundation', logo: '/logos/adf.png' },
];

const TrustedBy = () => {
    const allLogos = [...trustedLogos, ...trustedLogos];

    return (
        <section className="py-8 sm:py-14 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-5 sm:mb-8">
                <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                    Our partners in women's wellness
                </p>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex animate-scroll-logos gap-10 sm:gap-16 items-center w-max">
                    {allLogos.map((logo, idx) => (
                        <div
                            key={`${logo.name}-${idx}`}
                            className="shrink-0 group cursor-default px-2"
                        >
                            <div className="h-12 w-28 sm:w-32 flex items-center justify-center opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                                <img
                                    src={logo.logo}
                                    alt={logo.name}
                                    className="max-h-full max-w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
