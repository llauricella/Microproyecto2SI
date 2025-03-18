import { useLocation } from 'react-router-dom';

export default function TransaccionExitosa() {
  const location = useLocation();
  const { transactionDetails, selectedRoute, userName } = location.state || {};

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ¡Transacción Exitosa!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Gracias por tu compra. Tu transacción se ha completado correctamente.
        </p>

        {transactionDetails && (
          <div className="space-y-4 text-left">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Ruta:</span> {selectedRoute?.destino}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Tipo:</span> {selectedRoute?.tipo}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Guía:</span> {selectedRoute?.guia}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Precio:</span> ${selectedRoute?.precio}
            </p>
          </div>
        )}

        <button
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => window.location.href = "/"}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}