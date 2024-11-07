import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { typeDevis } from '../types/types';

interface DevisFormProps {
  devis: any;
  setDevis: (devis: any) => void;
  onValidate: () => boolean;
}

export function DevisForm({ devis, setDevis, onValidate }: DevisFormProps) {
  const validatePolice = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 7) return;
    setDevis(prev => ({ ...prev, police: numericValue }));
  };

  const validateMatricule = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 5) return;
    setDevis(prev => ({ 
      ...prev, 
      agent: { ...prev.agent, matricule: numericValue }
    }));
  };

  const validateLongueur = (value: string, field: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 4) return;
    setDevis(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const validatePuissance = (value: string, index: number, field: 'puissance1' | 'puissance2') => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 3) return;
    setDevis(prev => {
      const newDevisTypes = [...prev.devisTypes];
      if (!newDevisTypes[index][field]) {
        newDevisTypes[index] = { ...newDevisTypes[index], [field]: '' };
      }
      newDevisTypes[index][field] = numericValue;
      return { ...prev, devisTypes: newDevisTypes };
    });
  };

  const validateLongueurDevis = (value: string, index: number) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 3) return;
    setDevis(prev => {
      const newDevisTypes = [...prev.devisTypes];
      newDevisTypes[index].longueur = numericValue;
      return { ...prev, devisTypes: newDevisTypes };
    });
  };

  const addDevisType = () => {
    setDevis(prev => ({
      ...prev,
      devisTypes: [...(prev.devisTypes || []), { type: '', puissance1: '', puissance2: '', longueur: '' }]
    }));
  };

  const removeDevisType = (index: number) => {
    setDevis(prev => ({
      ...prev,
      devisTypes: prev.devisTypes.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateDevisType = (index: number, value: string) => {
    setDevis(prev => {
      const newDevisTypes = [...prev.devisTypes];
      newDevisTypes[index] = { ...newDevisTypes[index], type: value };
      return { ...prev, devisTypes: newDevisTypes };
    });
  };

  const needsPuissanceInputs = (type: string) => [
    "AUG DE PUISSANCE NON FORFAITAIRE",
    "AUG DE PUISSANCE FORFAITAIRE",
    "PASSAGE MONO -TRIPHASE"
  ].includes(type);

  const needsLongueurInput = (type: string) => [
    "ALIMENTATION FORFAITAIRE EN AERIEN",
    "ALIMENTATION FORFAITAIRE EN S/T"
  ].includes(type);

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        {(devis.devisTypes || []).map((devisType: any, index: number) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <select
                  value={devisType.type}
                  onChange={(e) => updateDevisType(index, e.target.value)}
                  className="w-full border rounded-lg p-1.5"
                >
                  {typeDevis.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {needsPuissanceInputs(devisType.type) && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={devisType.puissance1 || ''}
                    onChange={(e) => validatePuissance(e.target.value, index, 'puissance1')}
                    className="w-20 border rounded-lg p-1.5 text-center"
                    placeholder="000"
                  />
                  <span>–</span>
                  <input
                    type="text"
                    value={devisType.puissance2 || ''}
                    onChange={(e) => validatePuissance(e.target.value, index, 'puissance2')}
                    className="w-20 border rounded-lg p-1.5 text-center"
                    placeholder="000"
                  />
                </div>
              )}
              
              {needsLongueurInput(devisType.type) && (
                <input
                  type="text"
                  value={devisType.longueur || ''}
                  onChange={(e) => validateLongueurDevis(e.target.value, index)}
                  className="w-20 border rounded-lg p-1.5 text-center"
                  placeholder="000"
                />
              )}

              {index > 0 && (
                <button
                  onClick={() => removeDevisType(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addDevisType}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 w-fit"
        >
          <Plus className="h-4 w-4" />
          Ajouter un type de devis
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Police *
          </label>
          <input
            type="text"
            value={devis.police}
            onChange={(e) => validatePolice(e.target.value)}
            className="w-full border rounded-lg p-1.5"
            placeholder="7 chiffres max"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client *
          </label>
          <input
            type="text"
            value={devis.client}
            onChange={(e) => setDevis(prev => ({ ...prev, client: e.target.value }))}
            className="w-full border rounded-lg p-1.5"
            placeholder="Nom du client"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse *
          </label>
          <input
            type="text"
            value={devis.adresse}
            onChange={(e) => setDevis(prev => ({ ...prev, adresse: e.target.value }))}
            className="w-full border rounded-lg p-1.5"
            placeholder="Adresse"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Milieu *
          </label>
          <select
            value={devis.milieu}
            onChange={(e) => setDevis(prev => ({ ...prev, milieu: e.target.value }))}
            className="w-full border rounded-lg p-1.5"
            required
          >
            <option value="">Sélectionner</option>
            <option value="urbain">Urbain</option>
            <option value="rural">Rural</option>
          </select>
        </div>
      </div>

      {devis.milieu === 'rural' && (
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LBT (mètres)
            </label>
            <input
              type="text"
              value={devis.lbt || ''}
              onChange={(e) => validateLongueur(e.target.value, 'lbt')}
              className="w-full border rounded-lg p-1.5"
              placeholder="4 chiffres max"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LMT (mètres)
            </label>
            <input
              type="text"
              value={devis.lmt || ''}
              onChange={(e) => validateLongueur(e.target.value, 'lmt')}
              className="w-full border rounded-lg p-1.5"
              placeholder="4 chiffres max"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observation *
          </label>
          <textarea
            value={devis.observation}
            onChange={(e) => setDevis(prev => ({ ...prev, observation: e.target.value }))}
            className="w-full border rounded-lg p-1.5 resize-y"
            placeholder="Observations"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'agent
            </label>
            <input
              type="text"
              value={devis.agent.nom}
              onChange={(e) => setDevis(prev => ({ 
                ...prev, 
                agent: { ...prev.agent, nom: e.target.value }
              }))}
              className="w-full border rounded-lg p-1.5 bg-yellow-50"
              placeholder="Nom de l'agent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Matricule *
            </label>
            <input
              type="text"
              value={devis.agent.matricule}
              onChange={(e) => validateMatricule(e.target.value)}
              className="w-full border rounded-lg p-1.5"
              placeholder="5 chiffres"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}