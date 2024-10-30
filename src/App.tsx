import Home from "@/pages/home";
import Sidebar from "@/components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  return (
    <main className="flex">
      <Sidebar />

      <section className="flex full flex-1 flex-col items-center px-6 pb-10 pt-16 max-md:pb-32 sm:px-10">
        <div className="w-full max-w-6xl">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </div>

        <ReactQueryDevtools />
      </section>
    </main>
  );
};

export default App;
