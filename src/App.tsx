import Home from "@/features/test/pages/home";
import InitiateTest from "@/features/test/pages/initiate";
import CsvSample from "@/features/test/pages/csv-sample";
import AppSidebar from "@/components/AppSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <main className="h-screen w-screen flex">
          <AppSidebar />

          <section className="max-h-screen w-full overflow-auto px-6 pb-10 pt-16 max-md:pb-32 sm:px-10">
            <SidebarTrigger className="md:hidden" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test/initiate" element={<InitiateTest />} />
              <Route path="/tools/csv-sample" element={<CsvSample />} />
            </Routes>

            {import.meta.env.MODE === "development" && <ReactQueryDevtools />}
            <Toaster />
          </section>
        </main>
      </SidebarProvider>
    </Router>
  );
};

export default App;
