import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { GroupeOT as IGroupeOT, Article, LigneDevis } from '../types/types';
import { ArticleSelector } from './ArticleSelector';
import { otTypes } from '../data/otTypes';

interface Props {
  groupe: IGroupeOT;
  onUpdate: (groupe: IGroupeOT) => void;
  onDelete: () => void;
}

export function GroupeOT({ groupe, onUpdate, onDelete }: Props) {
  const [showSelector, setShowSelector] = React.useState(false);

  const addLigne = (article: Article) => {
    const newLignes = [...groupe.lignes, {
      article,
      quantite: 0,
      montant: 0
    }];
    const total = newLignes.reduce((sum, ligne) => sum + ligne.montant, 0);
    onUpdate({ ...groupe, lignes: newLignes, total });
    setShowSelector(false);
  };

  const updateQuantite = (index: number, quantite: number) => {
    const newLignes = [...groupe.lignes];
    newLignes[index].quantite = quantite;
    newLignes[index].montant = quantite * newLignes[index].article.prix;
    const total = newLignes.reduce((sum, ligne) => sum + ligne.montant, 0);
    onUpdate({ ...groupe, lignes: newLignes, total });
  };

  const deleteLigne = (index: number) => {
    const newLignes = groupe.lignes.filter((_, i) => i !== index);
    const total = newLignes.reduce((sum, ligne) => sum + ligne.montant, 0);
    onUpdate({ ...groupe, lignes: newLignes, total });
  };

  const millimesToDinars = (millimes: number) => {
    return (millimes / 1000).toFixed(3);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 print:shadow-none print:p-2">
      <div className="flex justify-between items-center mb-3">
        <select
          value={groupe.type}
          onChange={(e) => onUpdate({ ...groupe, type: e.target.value, nom: e.target.value })}
          className="text-lg font-bold bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none pr-8"
        >
          <option value="">Sélectionner un type d'OT</option>
          {otTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 print:hidden"
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
          {groupe.lignes.map((ligne, index) => (
            <tr key={index} className="border-b">
              <td className="py-1">{ligne.article.code}</td>
              <td className="py-1">{ligne.article.designation}</td>
              <td className="text-right py-1">{millimesToDinars(ligne.article.prix)} DT/{ligne.article.unite}</td>
              <td className="text-right py-1">
                <input
                  type="number"
                  min="0"
                  value={ligne.quantite}
                  onChange={(e) => updateQuantite(index, Number(e.target.value))}
                  className="w-16 text-right border rounded p-0.5"
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
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right font-bold py-1">Total:</td>
            <td className="text-right font-bold py-1">{millimesToDinars(groupe.total)} DT</td>
            <td className="print:hidden"></td>
          </tr>
        </tfoot>
      </table>

      {showSelector ? (
        <div className="mt-2 print:hidden">
          <ArticleSelector onSelect={addLigne} />
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