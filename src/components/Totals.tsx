import React from 'react';
import { FileDown, Printer } from 'lucide-react';

interface TotalsProps {
  totalHT: number;
  tva: number;
  totalTTC: number;
  millimesToDinars: (millimes: number) => string;
  onPrint: () => void;
}

export function Totals({ totalHT, tva, totalTTC, millimesToDinars, onPrint }: TotalsProps) {
  return (
    <div className="flex justify-end mt-3 print:mt-4">
      <div className="flex flex-col items-end gap-1">
        <div className="text-base font-semibold">
          Total HT: {millimesToDinars(totalHT)} DT
        </div>
        <div className="text-base font-semibold">
          TVA (19%): {millimesToDinars(tva)} DT
        </div>
        <div className="text-lg font-bold">
          Total TTC: {millimesToDinars(totalTTC)} DT
        </div>
        <div className="flex gap-2 print:hidden mt-2">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <FileDown className="h-4 w-4" />
            PDF
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Printer className="h-4 w-4" />
            Imprimer
          </button>
        </div>
      </div>
    </div>
  );
}