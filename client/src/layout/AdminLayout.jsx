import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import AdminSidebar from "../components/Admin/AdminSidebar";
import Header from "../components/Admin/Header";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* <Toaster /> */}
    </SidebarProvider>
  );
};

export default AdminLayout;
