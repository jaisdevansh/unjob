import Navbar from "@/components/shared/Navbar";
import MobileNav from "@/components/shared/MobileNav";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 w-full mx-auto pb-16 md:pb-0 relative">{children}</main>
            <MobileNav />
        </div>
    );
}
