// src/App.jsx
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import Home from "./Home";
import Cliente from "./Cliente";
import Cocina from "./Cocina";
import Administrador from "./Administrador";

function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // ⛔ Ocultar navbar en Home (/)
  const hideNavbar = location.pathname === "/";

  // 🔹 Clases base para los links del navbar
  const baseLink =
    "px-3 py-2 rounded-lg font-semibold transition-colors duration-300";
  const activeLink = "bg-indigo-600 text-white shadow-md";
  const inactiveLink = "text-gray-700 hover:text-indigo-600";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 🔹 Navbar fijo (solo aparece fuera de / y solo con Home) */}
      {!hideNavbar && (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
          <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
            {/* Logo clickeable */}
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 tracking-tight hover:text-indigo-700 transition"
              onClick={() => setOpen(false)}
            >
              🍽️ Mi Restaurante
            </Link>

            {/* 🔹 Botón menú móvil */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-indigo-600 transition"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* 🔹 Link escritorio (solo Home) */}
            <div className="hidden md:flex gap-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink}`
                }
              >
                Home
              </NavLink>
            </div>
          </div>

          {/* 🔹 Menú móvil (solo Home) */}
          {open && (
            <div className="md:hidden flex flex-col bg-white border-t border-gray-200 px-6 py-4 shadow-lg animate-fadeIn">
              <NavLink
                to="/"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink}`
                }
              >
                Home
              </NavLink>
            </div>
          )}
        </nav>
      )}

      {/* 🔹 Contenido principal */}
      <main className={`${hideNavbar ? "pt-0" : "pt-24"} px-4 max-w-6xl mx-auto`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/cocina" element={<Cocina />} />
          <Route path="/administrador" element={<Administrador />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
