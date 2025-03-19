import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const PaypalButtonComponent = ({ selectedRoute }) => {
  const navigate = useNavigate();

  const initialOptions = {
    "client-id": "AZBpRrAZEgCXMTTBCuUi2LwRQ8v0I2cSbJ9XegxTEIXEpiozfNYictP1x-lTALtS7QreGSzLZ2_lm7RL",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    if (typeof selectedRoute.precio !== "number" || isNaN(selectedRoute.precio)) {
      console.error("El precio no es un número válido:", selectedRoute.precio);
      return;
    }

    console.log("Creando orden con precio:", selectedRoute.precio);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: selectedRoute.precio.toString(),
          },
          description: `Ruta: ${selectedRoute.destino}, Tipo: ${selectedRoute.tipo}, Guía: ${selectedRoute.guia}`
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();

      const user = auth.currentUser;
      if (!user) {
        console.error("No se encontró un usuario autenticado.");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        rutas: arrayUnion({
          destino: selectedRoute.destino,
          tipo: selectedRoute.tipo,
          precio: selectedRoute.precio,
          guia: selectedRoute.guia,
          fecha: new Date().toISOString(),
        }),
      });

      navigate('/exitosa', {
        state: {
          transactionDetails: details,
          selectedRoute,
        },
      });
    } catch (error) {
      console.error("Error al procesar la transacción:", error.message);
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default function Paypal() {
  const location = useLocation();
  const { selectedRoute } = location.state || {};

  console.log("Datos recibidos en Paypal:", selectedRoute);

  if (!selectedRoute || !selectedRoute.precio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Error: No se recibieron datos de la ruta.
          </h1>
          <p className="text-lg text-gray-700 text-center">
            Por favor, selecciona una ruta nuevamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Pago con PayPal
        </h1>

        <div className="space-y-4 mb-6">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Ruta:</span> {selectedRoute.destino}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Tipo:</span> {selectedRoute.tipo}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Precio:</span> ${selectedRoute.precio}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Guía:</span> {selectedRoute.guia}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Descripción:</span> {selectedRoute.descripcion}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Dificultad:</span> {selectedRoute.dificultad}
          </p>
        </div>

        <div className="mt-6">
          <PaypalButtonComponent selectedRoute={selectedRoute} />
        </div>
      </div>
    </div>
  );
}