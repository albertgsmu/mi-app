// src/pages/Administrador.jsx
import React, { useContext } from "react";
import { CarritoContext } from "./context/CarritoContext";

export default function Administrador() {
  const { pedidos, marcarEntregado, marcarPagado } = useContext(CarritoContext);

  // Función para formatear el tiempo en mm:ss
  const formatearTiempo = (segundos) => {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Creamos un array de mesas fijas (10 mesas)
  const mesas = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧑‍💼 Panel del Administrador</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {mesas.map((mesaNum) => {
          const pedidosMesa = pedidos.filter((p) => p.mesa === mesaNum);

          return (
            <div
              key={mesaNum}
              style={{
                border: "2px solid #004085",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: "#e9f7fe",
              }}
            >
              <h2>🪑 Mesa {mesaNum}</h2>

              {pedidosMesa.length === 0 ? (
                <p style={{ color: "#666" }}>Sin pedidos</p>
              ) : (
                pedidosMesa.map((pedido) => (
                  <div
                    key={pedido.id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      marginTop: "10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <h3>🆔 Pedido #{pedido.id}</h3>
                    <p>
                      ⏳ Tiempo restante:{" "}
                      <strong>{formatearTiempo(pedido.tiempoRestante)}</strong>
                    </p>
                    <p>
                      💳 Forma de pago:{" "}
                      <strong>{pedido.metodoPago || "Pendiente"}</strong>
                    </p>

                    <ul>
                      {pedido.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "6px" }}>
                          🍽️ {item.nombre}
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginTop: "10px" }}>
                      <button
                        onClick={() => marcarEntregado(pedido.id)}
                        style={{
                          marginRight: "10px",
                          padding: "6px 10px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        ✅ Entregado
                      </button>
                      <button
                        onClick={() => marcarPagado(pedido.id)}
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        💰 Pagado
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
