import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
    id: string;
    name: string;
    rating: number;
    deliveryTime: string;
    costForTwo: string;
    tags: string[];
    imageUrl?: string;
    offer?: string;
}

export default function RestaurantCard({
    id,
    name,
    rating,
    deliveryTime,
    costForTwo,
    tags,
    imageUrl,
    offer
}: RestaurantCardProps) {
    return (
        <Link href={`/restaurant/${id}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-card border border-border transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand/30">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image
                        src={imageUrl || "/assets/restaurant.png"}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {offer && (
                        <div className="absolute bottom-3 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-r-lg shadow-lg z-10">
                            {offer}
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg text-foreground truncate pr-2">{name}</h3>
                        <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
                            {rating} <Star className="w-3 h-3 fill-white" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-muted-foreground text-sm mb-3">
                        <span className="truncate">{tags.join(', ')}</span>
                        <span className="shrink-0 ml-2">{costForTwo}</span>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground text-xs pt-3 border-t border-border">
                        <Clock className="w-4 h-4 text-brand" />
                        <span className="font-medium">{deliveryTime} min delivery</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
