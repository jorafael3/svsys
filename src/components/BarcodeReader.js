import React, { useState } from 'react';
import BarcodeScanner from 'react-barcode-reader';

const BarcodeReader = () => {
  const [barcode, setBarcode] = useState('');

  const handleScan = (data) => {
    setBarcode(data);
  };

  const handleError = (error) => {
    console.error('Error al leer el código de barras:', error);
  };

  return (
    <div>
      <h2>Lector de Códigos de Barras</h2>
      <BarcodeScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment" // Utilizar cámara trasera (opcional)
      />
      <p>Código de barras: {barcode}</p>
    </div>
  );
};

export default BarcodeReader;
