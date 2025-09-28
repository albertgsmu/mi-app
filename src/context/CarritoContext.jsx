// src/context/CarritoContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  // 👉 Agregar un plato al carrito
  const agregarAlCarrito = (plato) => {
    setCarrito((prev) => [...prev, plato]);
  };

  // 👉 Eliminar plato del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // 👉 Finalizar pedido: pasa de "carrito" a "pedidos en cocina"
  const finalizarPedido = (mesa = null, metodoPago = null) => {
    if (carrito.length === 0) return;

    // Validar mesa
    if (!mesa || mesa < 1 || mesa > 10) {
      alert("⚠️ Debes ingresar un número de mesa válido (1-10).");
      return;
    }

    // Validar método de pago
    if (!metodoPago) {
      alert("⚠️ Debes seleccionar un método de pago.");
      return;
    }

    const nuevoPedido = {
      id: Date.now(),
      mesa, // mesa asociada al pedido
      metodoPago, // forma de pago seleccionada
      items: carrito.map((item) => ({
        ...item,
        modificado:
          item.extras?.length > 0 ||
          item.base?.length < (item.originalBase?.length || 0),
      })),
      tiempoRestante: 1800, // 30 minutos en segundos
      entregado: false,
      pagado: false,
    };

    setPedidos((prev) => [...prev, nuevoPedido]);
    setCarrito([]); // limpiar carrito después de finalizar
    alert(`✅ Pedido enviado a cocina\n📌 Mesa: ${mesa}\n💳 Pago: ${metodoPago}`);
  };

  // 👉 Marcar pedido como entregado
  const marcarEntregado = (id) => {
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, entregado: true } : p
      )
    );
  };

  // 👉 Marcar pedido como pagado
  const marcarPagado = (id) => {
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, pagado: true } : p
      )
    );
  };

  // ⏳ Reducir el tiempo de cada pedido automáticamente cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setPedidos((prev) =>
        prev.map((pedido) => ({
          ...pedido,
          tiempoRestante:
            pedido.tiempoRestante > 0 ? pedido.tiempoRestante - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        finalizarPedido,
        pedidos,
        marcarEntregado,
        marcarPagado,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
