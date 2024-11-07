import React, { useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { LigneDevis } from '../types/types';

interface LignesTableProps {
  lignes: LigneDevis[];
  updateQuantite: (index: number, quantite: number) => void;
  deleteLigne: (index: number) => void;
  millimesToDinars: (millimes: number) => string;
}

export function LignesTable({ lignes, updateQuantite, deleteLigne, millimesToDinars }: LignesTableProps) {
  const quantityRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusLastQuantity = () => {
    const lastIndex = quantityRefs.current.length - 1;
    if (lastIndex >= 0) {
      quantityRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <table className="w-full mb-3">
      <thead>
        <tr className="border-b text-sm">
          <th className="text-left py-1">Code</th>
          <th className="text-left py-1">Désignation</th>
          <th className="text-right py-1">Prix unitaire</th>
          <th className="text-right py-1">Quantité</th>
          <th className="text-right py-1">Montant</th>
          <th className="w-8 print:hidden"></th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {lignes.map((ligne, index) => (
          <tr key={index} className="border-b">
            <td className="py-1">{ligne.article.code}</td>
            <td className="py-1">{ligne.article.designation}</td>
            <td className="text-right py-1">{millimesToDinars(ligne.article.prix)} DT/{ligne.article.unite}</td>
            <td className="text-right py-1">
              <input
                ref={el => quantityRefs.current[index] = el}
                type="number"
                min="0"
                value={ligne.quantite}
                onChange={(e) => updateQuantite(index, Number(e.target.value))}
                className={`w-16 text-right border rounded p-0.5 ${ligne.quantite === 0 ? 'bg-red-50 border-red-200' : ''}`}
              />
            </td>
            <td className="text-right py-1">{millimesToDinars(ligne.montant)} DT</td>
            <td className="text-right py-1 print:hidden">
              <button
                onClick={() => deleteLigne(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}