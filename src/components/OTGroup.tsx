import React, { useRef, useEffect } from 'react';
import { Article, LigneDevis, otTypes } from '../types/types';
import { ArticleSelector } from './ArticleSelector';
import { Plus, Trash2 } from 'lucide-react';

interface OTGroupProps {
  code: string;
  lignes: LigneDevis[];
  sousTotal: number;
  onAddArticle: (article: Article) => void;
  onUpdateQuantite: (index: number, quantite: number) => void;
  onDeleteLigne: (index: number) => void;
  onDeleteGroup: () => void;
  onChangeCode: (code: string) => void;
  millimesToDinars: (millimes: number) => string;
  autoFocus?: boolean;
}

export function OTGroup({
  code,
  lignes,
  sousTotal,
  onAddArticle,
  onUpdateQuantite,
  onDeleteLigne,
  onDeleteGroup,
  onChangeCode,
  millimesToDinars,
  autoFocus
}: OTGroupProps) {
  const [showSelector, setShowSelector] = React.useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const otInfo = otTypes.find(ot => ot.code === code);

  useEffect(() => {
    if (autoFocus && selectRef.current) {
      selectRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 print:shadow-none print:p-2">
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1">
          <select
            ref={selectRef}
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            className="w-full text-lg font-bold bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sélectionner un OT...</option>
            {otTypes.map((ot) => (
              <option key={ot.code} value={ot.code}>
                {ot.code} - {ot.nom}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onDeleteGroup}
          className="text-red-500 hover:text-red-700 print:hidden ml-2"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

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
              <td className="text-right py-1">
                {millimesToDinars(ligne.article.prix)} DT/{ligne.article.unite}
              </td>
              <td className="text-right py-1">
                <input
                  type="number"
                  min="0"
                  value={ligne.quantite}
                  onChange={(e) => onUpdateQuantite(index, Number(e.target.value))}
                  className={`w-16 text-right border rounded p-0.5 ${
                    ligne.quantite === 0 ? 'bg-red-50 border-red-200' : ''
                  }`}
                />
              </td>
              <td className="text-right py-1">{millimesToDinars(ligne.montant)} DT</td>
              <td className="text-right py-1 print:hidden">
                <button
                  onClick={() => onDeleteLigne(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right font-bold py-1">Sous-total:</td>
            <td className="text-right font-bold py-1">{millimesToDinars(sousTotal)} DT</td>
            <td className="print:hidden"></td>
          </tr>
        </tfoot>
      </table>

      {showSelector ? (
        <div className="mt-2 print:hidden">
          <ArticleSelector
            onSelect={(article) => {
              onAddArticle(article);
              setShowSelector(false);
            }}
            autoFocus
          />
          <button
            onClick={() => setShowSelector(false)}
            className="mt-2 text-gray-500 hover:text-gray-700"
          >
            Annuler
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSelector(true)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-700 print:hidden text-sm"
        >
          <Plus className="h-3 w-3" />
          Ajouter un article
        </button>
      )}
    </div>
  );
}