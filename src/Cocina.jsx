// src/pages/Cocina.jsx
import React, { useContext } from "react";
import { CarritoContext } from "./context/CarritoContext";

export default function Cocina() {
  const { pedidos, marcarEntregado } = useContext(CarritoContext);

  // Función para formatear el tiempo en mm:ss
  const formatearTiempo = (segundos) => {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Pedidos en Cocina</h1>

      {pedidos.length === 0 ? (
        <p>No hay pedidos en la cocina.</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.id}
            style={{
              border: "2px solid #333",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#fafafa",
            }}
          >
            <h2>🆔 Pedido #{pedido.id}</h2>
            <p>
              ⏳ Tiempo restante:{" "}
              <strong>{formatearTiempo(pedido.tiempoRestante)}</strong>
            </p>

            <ul>
              {pedido.items.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "10px",
                    padding: "8px",
                    border: item.modificado ? "2px solid red" : "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
                  🍽️ <strong>{item.nombre}</strong>

                  {item.base && (
                    <p>
                      Base:{" "}
                      {item.base.length > 0
                        ? item.base.join(", ")
                        : "Sin ingredientes base"}
                    </p>
                  )}

                  {item.extras && item.extras.length > 0 && (
                    <p>➕ Extras: {item.extras.join(", ")}</p>
                  )}
                </li>
              ))}
            </ul>

            <button
              onClick={() => marcarEntregado(pedido.id)}
              style={{
                marginTop: "10px",
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✅ Marcar como entregado
            </button>
          </div>
        ))
      )}
    </div>
  );
}
