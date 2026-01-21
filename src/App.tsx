import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { MainPage } from "./pages/MainPage";
import { ReservePage } from "./pages/ReservePage";
import { MenuPage } from "./pages/MenuPage";

export function App() {
  const [currentPage, setCurrentPage] = useState("main");
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/reserve") {
        setCurrentPage("reserve");
        window.scrollTo(0, 0);
      } else if (hash === "#/menu") {
        setCurrentPage("menu");
        window.scrollTo(0, 0);
      } else {
        setCurrentPage("main");
        window.scrollTo(0, 0);
      }
    };
    // Set initial page based on hash
    handleHashChange();
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return (
    <main className="min-h-screen w-full bg-neutral-950 text-white selection:bg-amber-500/30 selection:text-amber-100">
      <Navigation currentPage={currentPage} />

      {currentPage === "main" && <MainPage />}
      {currentPage === "menu" && <MenuPage />}
      {currentPage === "reserve" && <ReservePage />}
    </main>
  );
}
