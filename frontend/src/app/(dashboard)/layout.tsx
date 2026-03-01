import { Sidebar } from "@/components/layout/Sidebar";
import { PageTransition } from "@/components/layout/PageTransition";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "2rem", overflowX: "hidden" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
                    <PageTransition>
                        {children}
                    </PageTransition>
                </div>
            </main>
        </div>
    );
}
