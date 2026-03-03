export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar Placeholder */}
            <aside className="w-64 bg-white border-r hidden md:block">
                <div className="p-4 font-bold text-xl text-brand">Zomato Partner</div>
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
