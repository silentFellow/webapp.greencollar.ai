import Home from "@/pages/home";
import AppSidebar from "@/components/AppSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider } from "./components/ui/sidebar";

const App = () => {
  return (
    <Router>
      <SidebarProvider className="flex">
        <AppSidebar />

        <section className="flex full flex-1 flex-col items-center px-6 pb-10 pt-16 max-md:pb-32 sm:px-10">
          <div className="w-full max-w-6xl">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>

          <ReactQueryDevtools />
        </section>
      </SidebarProvider>
    </Router>
  );
};

export default App;
