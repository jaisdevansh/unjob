export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-brand text-white p-4 font-bold">Delivery Partner</header>
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}
