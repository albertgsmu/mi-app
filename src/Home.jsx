// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  // 🔹 Estado para el tap secreto en el logo
  const [tapCount, setTapCount] = useState(0);
  const [showStaffButtons, setShowStaffButtons] = useState(false);

  // Manejo del tap en el logo
  const handleLogoTap = () => {
    setTapCount((prev) => prev + 1);
    if (tapCount >= 4) { // 5 taps
      setShowStaffButtons(true);
      setTapCount(0);
    }
    // Reset del contador después de 2s
    setTimeout(() => setTapCount(0), 2000);
  };

  const handleCliente = () => {
    navigate("/cliente");
  };

  const handleCocina = () => {
    setRole("cocina");
    setShowPrompt(true);
  };

  const handleAdministrador = () => {
    setRole("admin");
    setShowPrompt(true);
  };

  const checkPassword = () => {
    if (role === "cocina" && password === "1234") {
      setError("");
      setShowPrompt(false);
      navigate("/cocina");
    } else if (role === "admin" && password === "4321") {
      setError("");
      setShowPrompt(false);
      navigate("/administrador");
    } else {
      setError("Contraseña incorrecta ❌");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black/60">
      {/* 🔹 Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo.jpeg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔹 Contenido */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Logo con animación y tap secreto */}
        <img
          src="/logo.png"
          alt="Logo restaurante"
          onClick={handleLogoTap}
          className="w-28 h-28 mb-6 drop-shadow-lg animate-pulse-slow cursor-pointer"
        />

        {/* Botón principal (Cliente) */}
        <button
          onClick={handleCliente}
          className="bg-yellow-400 text-black text-2xl font-bold px-12 py-6 rounded-2xl shadow-xl hover:bg-yellow-300 transition mb-4 w-full max-w-sm"
        >
          👋 Bienvenido
        </button>
        <p className="text-gray-200 text-sm mb-10 text-center">
          Presiona <span className="font-semibold text-yellow-400">Bienvenido</span> para entrar como cliente
        </p>

        {/* Botones staff (se muestran tras 5 taps en el logo) */}
        {showStaffButtons && (
          <div className="flex flex-col items-center space-y-3">
            <button
              onClick={handleCocina}
              className="bg-gray-700/40 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-600/60 transition w-40 text-center"
            >
              👨‍🍳 Cocina
            </button>
            <button
              onClick={handleAdministrador}
              className="bg-blue-700/40 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600/60 transition w-40 text-center"
            >
              🧑‍💼 Administrador
            </button>
          </div>
        )}
      </div>

      {/* 🔹 Modal contraseña */}
      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">
              Ingresar contraseña
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 mb-3 focus:outline-none"
              placeholder="Contraseña"
            />
            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={checkPassword}
                className="bg-green-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-400"
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setShowPrompt(false);
                  setPassword("");
                  setError("");
                }}
                className="bg-red-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-red-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
