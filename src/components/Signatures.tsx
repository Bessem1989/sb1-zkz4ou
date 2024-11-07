import React from 'react';

interface SignaturesProps {
  agent: {
    nom: string;
    matricule: string;
  };
  totalHT: number;
  tva: number;
  totalTTC: number;
  millimesToDinars: (millimes: number) => string;
}

export function Signatures({ agent, totalHT, tva, totalTTC, millimesToDinars }: SignaturesProps) {
  return (
    <div className="hidden print:block mt-4">
      <div className="border-t pt-4 mb-4">
        <div className="flex justify-end mb-6">
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
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="font-semibold mb-8">L'Agent</div>
          <div className="text-sm">{agent.nom}</div>
          <div className="text-sm text-gray-600">({agent.matricule})</div>
        </div>
        <div className="text-center">
          <div className="font-semibold mb-8">Chef Division</div>
          <div className="text-sm">(Signature)</div>
        </div>
        <div className="text-center">
          <div className="font-semibold mb-8">Chef District</div>
          <div className="text-sm">(Signature)</div>
        </div>
      </div>
    </div>
  );
}