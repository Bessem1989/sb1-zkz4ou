import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Article, LigneDevis, typeDevis, otTypes } from './types/types';
import { ArticleSelector } from './components/ArticleSelector';
import { Header } from './components/Header';
import { DevisForm } from './components/DevisForm';
import { OTGroup } from './components/OTGroup';
import { Totals } from './components/Totals';
import { Signatures } from './components/Signatures';
import { PageNumber } from './components/PageNumber';

const App: React.FC = () => {
  const TVA_RATE = 0.19;

  const [devis, setDevis] = useState({
    devisTypes: [{ type: typeDevis[0], puissance1: '', puissance2: '', longueur: '' }],
    date: new Date().toISOString().split('T')[0],
    police: '',
    adresse: '',
    client: '',
    milieu: '',
    observation: '',
    lbt: '',
    lmt: '',
    agent: {
      nom: '',
      matricule: ''
    },
    otGroups: [] as { code: string; lignes: LigneDevis[]; sousTotal: number }[],
    totalHT: 0,
  });

  const millimesToDinars = (millimes: number) => {
    return (millimes / 1000).toFixed(3);
  };

  const validateDevis = () => {
    const errors = [];
    if (!devis.devisTypes[0].type) errors.push("Type de devis");
    if (!devis.police) errors.push("Numéro de police");
    if (!devis.client) errors.push("Nom du client");
    if (!devis.agent.matricule) errors.push("Matricule de l'agent");
    if (!devis.agent.nom) errors.push("Nom de l'agent");
    if (!devis.observation) errors.push("Observation");

    if (errors.length > 0) {
      alert(`Veuillez remplir les champs suivants avant d'imprimer:\n\n${errors.join('\n')}`);
      return false;
    }
    return true;
  };

  const handlePrint = () => {
    if (validateDevis()) {
      window.print();
    }
  };

  const handleAddOTGroup = () => {
    setDevis({
      ...devis,
      otGroups: [
        ...devis.otGroups,
        { code: '', lignes: [], sousTotal: 0 }
      ]
    });
  };

  const totalHT = devis.otGroups.reduce((sum, g) => sum + g.sousTotal, 0);
  const tva = totalHT * TVA_RATE;
  const totalTTC = totalHT * (1 + TVA_RATE);

  return (
    <div className="min-h-screen bg-gray-50 p-4 print:p-0 print:bg-white">
      <div className="max-w-7xl mx-auto">
        <Header title="Devis" date={devis.date} />
        <DevisForm 
          devis={devis} 
          setDevis={setDevis}
          onValidate={validateDevis}
        />
        
        <div className="mt-6">
          {devis.otGroups.map((group, index) => (
            <OTGroup
              key={index}
              code={group.code}
              lignes={group.lignes}
              sousTotal={group.sousTotal}
              onAddArticle={(article: Article) => {
                const newGroups = [...devis.otGroups];
                newGroups[index].lignes.push({
                  article,
                  quantite: 0,
                  montant: 0
                });
                setDevis({ ...devis, otGroups: newGroups });
              }}
              onUpdateQuantite={(lineIndex: number, quantite: number) => {
                const newGroups = [...devis.otGroups];
                const ligne = newGroups[index].lignes[lineIndex];
                ligne.quantite = quantite;
                ligne.montant = quantite * ligne.article.prix;
                newGroups[index].sousTotal = newGroups[index].lignes.reduce(
                  (sum, l) => sum + l.montant,
                  0
                );
                setDevis({ ...devis, otGroups: newGroups });
              }}
              onDeleteLigne={(lineIndex: number) => {
                const newGroups = [...devis.otGroups];
                newGroups[index].lignes.splice(lineIndex, 1);
                newGroups[index].sousTotal = newGroups[index].lignes.reduce(
                  (sum, l) => sum + l.montant,
                  0
                );
                setDevis({ ...devis, otGroups: newGroups });
              }}
              onDeleteGroup={() => {
                const newGroups = devis.otGroups.filter((_, i) => i !== index);
                setDevis({ ...devis, otGroups: newGroups });
              }}
              onChangeCode={(newCode: string) => {
                const newGroups = [...devis.otGroups];
                newGroups[index].code = newCode;
                setDevis({ ...devis, otGroups: newGroups });
              }}
              millimesToDinars={millimesToDinars}
              autoFocus={index === devis.otGroups.length - 1}
            />
          ))}
        </div>

        <button
          onClick={handleAddOTGroup}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mt-4 print:hidden"
        >
          <Plus className="h-4 w-4" />
          Ajouter un groupe d'OT
        </button>

        <div className="print:hidden">
          <Totals
            totalHT={totalHT}
            tva={tva}
            totalTTC={totalTTC}
            millimesToDinars={millimesToDinars}
            onPrint={handlePrint}
          />
        </div>

        <Signatures 
          agent={devis.agent}
          totalHT={totalHT}
          tva={tva}
          totalTTC={totalTTC}
          millimesToDinars={millimesToDinars}
        />
        
        <PageNumber police={devis.police} />
      </div>
    </div>
  );
};

export default App;