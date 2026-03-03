export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <aside className="w-64 bg-slate-900 text-white hidden md:block">
                <div className="p-4 font-bold text-xl">Admin Panel</div>
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
