// src/Cliente.jsx
import React, { useState, useEffect, useContext } from "react";
import { CarritoContext } from "./context/CarritoContext";

const PRECIO_ING_EXTRA = 2000;

const menuPlatos = [
  {
    nombre: "Bandeja Paisa",
    imagen: "/bandeja_paisa.jpg",
    ingredientes: ["Frijoles", "Arroz", "Carne molida", "Chicharrón", "Huevo", "Arepa", "Plátano"],
    precio: 28000,
  },
  {
    nombre: "Carne a la Parrilla",
    imagen: "/carneparrilla.jpg",
    ingredientes: ["Carne de res", "Papas fritas", "Ensalada fresca"],
    precio: 32000,
  },
  {
    nombre: "Hamburguesa Clásica",
    imagen: "/hamburguesa_clasica.jpg",
    ingredientes: ["Pan artesanal", "Carne de res", "Queso cheddar", "Lechuga", "Tomate"],
    precio: 18000,
  },
  {
    nombre: "Hamburguesa Doble Carne",
    imagen: "/hamburguesa_doble_carne.jpg",
    ingredientes: ["Pan brioche", "Doble carne de res", "Queso", "Cebolla caramelizada"],
    precio: 25000,
  },
  {
    nombre: "Pizza Hawaiana",
    imagen: "/pizza_hawaina.jpg",
    ingredientes: ["Queso mozzarella", "Jamón", "Piña"],
    precio: 30000,
  },
  {
    nombre: "Pizza Margarita",
    imagen: "/pizza_margarita.jpg",
    ingredientes: ["Queso mozzarella", "Tomate", "Albahaca fresca"],
    precio: 28000,
  },
  {
    nombre: "Pizza Peperoni",
    imagen: "/pizza_peperoni.jpg",
    ingredientes: ["Queso mozzarella", "Peperoni", "Orégano"],
    precio: 32000,
  },
  {
    nombre: "Perro Caliente",
    imagen: "/perro_caliente.jpg",
    ingredientes: ["Salchicha", "Pan suave", "Papas fosforito", "Salsas"],
    precio: 15000,
  },
  {
    nombre: "Pollo Asado",
    imagen: "/pollo-asado.jpg",
    ingredientes: ["Pollo marinado", "Papas criollas", "Ensalada"],
    precio: 27000,
  },
  {
    nombre: "Sopa de Pollo",
    imagen: "/sopa_de_pollo.jpg",
    ingredientes: ["Pollo", "Papa", "Yuca", "Cilantro"],
    precio: 14000,
  },
  {
    nombre: "Ensalada César",
    imagen: "/ensalada_cesar.jpg",
    ingredientes: ["Lechuga", "Pollo", "Queso parmesano", "Aderezo César"],
    precio: 18000,
  },
  {
    nombre: "Ensalada Tropical",
    imagen: "/ensalada_tropical.jpg",
    ingredientes: ["Frutas tropicales", "Lechuga", "Aderezo ligero"],
    precio: 16000,
  },
  {
    nombre: "Cerveza",
    imagen: "/cerveza.jpg",
    ingredientes: ["Bebida refrescante"],
    precio: 8000,
  },
  {
    nombre: "Jugo de Mango",
    imagen: "/jugo_mango.jpg",
    ingredientes: ["Mango fresco", "Agua o leche"],
    precio: 7000,
  },
  {
    nombre: "Limonada Natural",
    imagen: "/limonada_natural.jpg",
    ingredientes: ["Limón fresco", "Azúcar", "Agua"],
    precio: 6000,
  },
];

function format(n) {
  return n.toLocaleString("es-CO");
}

export default function Cliente() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, finalizarPedido } =
    useContext(CarritoContext);

  const [modal, setModal] = useState({
    open: false,
    plato: null,
    base: [],
    extrasInput: "",
    extras: [],
  });
  const [toast, setToast] = useState(null);
  const [metodoPago, setMetodoPago] = useState("");
  const [mesa, setMesa] = useState(""); // número de mesa

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  // Abrir modal
  const abrirModalNuevo = (plato) => {
    setModal({
      open: true,
      plato,
      base: plato.ingredientes.map((name) => ({ name, kept: true })),
      extrasInput: "",
      extras: [],
    });
  };

  // Toggle ingrediente base
  const toggleBase = (i) => {
    setModal((m) => {
      const base = [...m.base];
      base[i].kept = !base[i].kept;
      return { ...m, base };
    });
  };

  // Agregar extra
  const addExtraToModal = () => {
    const val = modal.extrasInput.trim();
    if (!val) return;
    setModal((m) => ({ ...m, extras: [...m.extras, val], extrasInput: "" }));
  };

  // Quitar extra
  const removeExtraFromModal = (i) => {
    setModal((m) => {
      const extras = [...m.extras];
      extras.splice(i, 1);
      return { ...m, extras };
    });
  };

  // Calcular precio modal
  const calcularPrecioModal = () => {
    if (!modal.plato) return 0;
    return modal.plato.precio + modal.extras.length * PRECIO_ING_EXTRA;
  };

  // Confirmar modal → agregar al carrito
  const confirmarModal = () => {
    if (!modal.plato) return;
    const baseKept = modal.base.filter((b) => b.kept).map((b) => b.name);

    const modificado =
      baseKept.length !== modal.plato.ingredientes.length || modal.extras.length > 0;

    const item = {
      id: Date.now() + Math.random(),
      nombre: modal.plato.nombre,
      imagen: modal.plato.imagen,
      base: baseKept,
      extras: [...modal.extras],
      precioBase: modal.plato.precio,
      modificado,
    };

    agregarAlCarrito(item);
    setToast(`✅ ${item.nombre} agregado al carrito`);

    setModal({ open: false, plato: null, base: [], extrasInput: "", extras: [] });
  };

  // Calcular total
  const calcularTotal = () =>
    carrito.reduce((sum, it) => sum + it.precioBase + it.extras.length * PRECIO_ING_EXTRA, 0);

  // Finalizar pedido
  const handleCheckout = () => {
    if (carrito.length === 0) return alert("⚠️ El carrito está vacío.");
    if (!metodoPago) return alert("⚠️ Selecciona un método de pago.");
    const mesaNum = parseInt(mesa, 10);
    if (!mesaNum || mesaNum < 1 || mesaNum > 10) {
      return alert("⚠️ Debes ingresar un número de mesa válido (1 a 10).");
    }

    finalizarPedido(mesaNum, metodoPago);
    alert(`✅ Pedido enviado a la cocina.\nMesa: ${mesaNum}\nPago: ${metodoPago}`);
    setMetodoPago("");
    setMesa("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}

      <h1 className="text-2xl font-bold text-center mb-6">🍽️ Menú</h1>

      {/* Menú */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {menuPlatos.map((plato, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <img
              src={plato.imagen}
              alt={plato.nombre}
              className="w-full h-44 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{plato.nombre}</h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {plato.ingredientes.join(", ")}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-green-700 font-bold">${format(plato.precio)}</span>
              <button
                onClick={() => abrirModalNuevo(plato)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm shadow hover:bg-blue-700"
              >
                Personalizar & Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carrito */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-bold mb-3">🛒 Tu pedido</h2>

        {carrito.length === 0 ? (
          <p className="text-gray-500">Aún no has agregado platos.</p>
        ) : (
          <>
            <div className="space-y-3">
              {carrito.map((it) => (
                <div
                  key={it.id}
                  className={`border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
                    it.modificado ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={it.imagen}
                      alt={it.nombre}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-semibold">{it.nombre}</div>
                      <div className="text-sm text-gray-600">
                        Base: {it.base.join(", ") || "Sin ingredientes"}
                      </div>
                      {it.extras.length > 0 && (
                        <div className="text-sm text-blue-600">
                          Extras: {it.extras.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="font-bold text-green-700">
                      ${format(it.precioBase + it.extras.length * PRECIO_ING_EXTRA)}
                    </div>
                    <button
                      onClick={() => eliminarDelCarrito(it.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Número de mesa y métodos de pago */}
            <div className="mt-4 border-t pt-4 flex flex-col gap-4">
              <div>
                <label className="font-semibold block mb-1">
                  🪑 Número de mesa (1–10):
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  placeholder="Ejemplo: 5"
                  className="w-32 border rounded px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ingresa tu número de mesa antes de pagar.
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="font-semibold">Total:</div>
                  <div className="text-2xl font-bold text-green-700">
                    ${format(calcularTotal())}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMetodoPago("Efectivo")}
                      className={`px-4 py-2 rounded-lg ${
                        metodoPago === "Efectivo" ? "bg-green-600 text-white" : "bg-gray-200"
                      }`}
                    >
                      💵 Efectivo
                    </button>
                    <button
                      onClick={() => setMetodoPago("QR")}
                      className={`px-4 py-2 rounded-lg ${
                        metodoPago === "QR" ? "bg-green-600 text-white" : "bg-gray-200"
                      }`}
                    >
                      📲 QR
                    </button>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Finalizar pedido
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de personalización */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-2">{modal.plato.nombre}</h3>

            <p className="mb-2 text-sm text-gray-600">Quita o mantiene ingredientes base:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {modal.base.map((b, i) => (
                <button
                  key={i}
                  onClick={() => toggleBase(i)}
                  className={`px-2 py-1 rounded-lg border ${
                    b.kept ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>

            <p className="mb-2 text-sm text-gray-600">
              Agregar ingredientes extra (+${format(PRECIO_ING_EXTRA)} c/u):
            </p>
            <div className="flex gap-2 mb-3">
              <input
                value={modal.extrasInput}
                onChange={(e) => setModal((m) => ({ ...m, extrasInput: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addExtraToModal();
                }}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Escribe y presiona Enter"
              />
              <button
                onClick={addExtraToModal}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Agregar
              </button>
            </div>

            {modal.extras.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-blue-600">Extras añadidos:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {modal.extras.map((ex, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2"
                    >
                      {ex}
                      <button
                        onClick={() => removeExtraFromModal(i)}
                        className="text-red-600"
                      >
                        ✖
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="font-bold">Total: ${format(calcularPrecioModal())}</div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setModal({ open: false, plato: null, base: [], extrasInput: "", extras: [] })
                  }
                  className="px-3 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarModal}
                  className="px-3 py-2 bg-green-600 text-white rounded"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
