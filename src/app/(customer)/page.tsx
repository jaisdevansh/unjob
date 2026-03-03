'use client';

import { Search, MapPin, ChevronRight, TrendingUp, Sparkles, Map as MapIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CATEGORIES = [
    { name: 'Pizza', image: '/assets/pizza.png', color: 'bg-orange-50' },
    { name: 'Burger', image: '/assets/burger.png', color: 'bg-red-50' },
    { name: 'Biryani', image: '/assets/biryani.png', color: 'bg-yellow-50' },
    { name: 'Chinese', image: '/assets/chinese.png', color: 'bg-indigo-50' },
    { name: 'Desserts', image: '/assets/dessert.png', color: 'bg-pink-50' },
    { name: 'Thali', image: '/assets/biryani.png', color: 'bg-emerald-50' }, // Reusing biryani
];

const COLLECTIONS = [
    { title: 'Trending this week', count: '12 places', image: '/assets/collection_trending_v2.png' },
    { title: 'Best of New Delhi', count: '30 places', image: '/assets/collection_delhi_v2.png' },
    { title: 'Pocket-friendly', count: '18 places', image: '/assets/collection_pocket_friendly.png' }, // Still unique
    { title: 'Top breakfast spots', count: '10 places', image: '/assets/collection_trending.png' }, // Still unique
];

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="space-y-16 pb-24 overflow-x-hidden">
            {/* Immersive Hero Section */}
            <section className="relative h-[450px] md:h-[600px] flex items-center justify-center -mt-16 sm:-mt-20 overflow-hidden">
                <Image
                    src="/assets/hero_bg.png"
                    alt="Hero background"
                    fill
                    className="object-cover absolute inset-0 brightness-[0.55]"
                    priority
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl w-full px-6 text-center space-y-12 relative z-20"
                >
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl">
                            zomato
                        </h1>
                        <p className="text-xl md:text-3xl text-white/90 font-medium drop-shadow-lg">
                            Discover the best food & drinks in New Delhi
                        </p>
                    </div>

                    {/* Dual Search Bar UI */}
                    <div className="bg-card rounded-2xl p-2 md:p-3 max-w-3xl w-full text-foreground flex flex-col md:flex-row items-center shadow-2xl mx-auto border border-border/10">
                        <div className="flex items-center w-full md:w-5/12 px-4 border-b md:border-b-0 md:border-r border-border h-12 md:h-14">
                            <MapPin className="text-brand mr-3 w-5 h-5 shrink-0" />
                            <input
                                type="text"
                                placeholder="New Delhi"
                                className="w-full bg-transparent outline-none font-medium text-sm md:text-base placeholder:text-muted-foreground"
                            />
                        </div>
                        <div
                            className="flex items-center flex-1 w-full px-4 h-12 md:h-14 cursor-pointer"
                            onClick={() => router.push('/search')}
                        >
                            <Search className="text-muted-foreground mr-3 w-5 h-5 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search for restaurant, cuisine or a dish..."
                                className="w-full bg-transparent outline-none font-medium text-sm md:text-base placeholder:text-muted-foreground cursor-pointer"
                                readOnly
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Inspiration Grid */}
            <section className="px-4 sm:px-8 max-w-7xl mx-auto relative z-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-foreground flex items-center gap-3">
                        <Sparkles className="text-brand w-8 h-8" />
                        Inspiration for your first order
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
                        {CATEGORIES.map((cat, i) => (
                            <Link key={i} href={`/search?q=${cat.name.toLowerCase()}`}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center gap-4 cursor-pointer group"
                                >
                                    <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-xl ring-1 ring-border/50 group-hover:ring-brand/30 transition-all duration-500`}>
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-lg font-bold text-foreground/90 group-hover:text-brand transition-colors tracking-tight font-sans">
                                        {cat.name}
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Collections Section */}
            <section className="px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10 border-b border-border pb-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-blue-500 w-8 h-8" />
                            Collections
                        </h2>
                        <p className="text-muted-foreground mt-2 font-medium">Explore curated lists of top restaurants, cafes, pubs, and bars in Delhi NCR</p>
                    </div>
                    <Link href="/search?q=collections" className="text-brand font-bold cursor-pointer hover:underline text-lg flex items-center group">
                        See all <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {COLLECTIONS.map((col, i) => (
                        <Link key={i} href={`/search?q=collection`}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl group border border-border/10"
                            >
                                <Image
                                    src={col.image}
                                    alt={col.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.7] group-hover:brightness-[0.4]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                    <h3 className="text-white text-xl font-black mb-1 group-hover:translate-x-2 transition-transform duration-300">{col.title}</h3>
                                    <div className="flex items-center text-white/90 font-bold group-hover:translate-x-2 transition-transform duration-300 delay-75">
                                        {col.count} <ChevronRight className="w-5 h-5 ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Premium Top Brands Logo Slider */}
            <section className="px-4 sm:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-10 text-foreground tracking-tight border-b border-border pb-6 flex items-center gap-3">
                    <MapIcon className="text-emerald-500 w-8 h-8" />
                    Top brands for you
                </h2>
                <div className="flex gap-10 overflow-x-auto pb-10 hide-scrollbar pt-4">
                    {[
                        { name: 'McDonald\'s', logo: '/assets/brand_mcdonalds.png' },
                        { name: 'KFC', logo: '/assets/brand_kfc_og.png' },
                        { name: 'Burger King', logo: '/assets/brand_burgerking.png' },
                        { name: 'Domino\'s', logo: '/assets/brand_dominos.png' },
                        { name: 'Subway', logo: '/assets/brand_subway.png' },
                        { name: 'Pizza Hut', logo: '/assets/brand_pizzahut.png' },
                    ].map((brand, i) => (
                        <Link href="/restaurant/rest-1" key={i} className="flex flex-col items-center gap-4 cursor-pointer group shrink-0">
                            <div className="relative w-28 h-28 md:w-36 md:h-36 bg-card border border-border rounded-full flex items-center justify-center p-6 shadow-md transition-all group-hover:shadow-2xl group-hover:border-brand/40 overflow-hidden transform group-hover:-translate-y-2 ring-1 ring-border">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className="text-lg font-bold text-foreground/80 group-hover:text-brand transition-colors">{brand.name}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
