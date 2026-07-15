import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { WeekPage } from "./pages/WeekPage";
import { DayPage } from "./pages/DayPage";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-bg">
        <Header />
        <Routes>
          <Route path="/" element={<WeekPage />} />
          <Route path="/day/:day" element={<DayPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
