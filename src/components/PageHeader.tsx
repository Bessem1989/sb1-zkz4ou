import React from 'react';

interface PageHeaderProps {
  devis: {
    police: string;
    client: string;
    adresse: string;
    milieu: string;
  };
}

export function PageHeader({ devis }: PageHeaderProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4 text-sm border-b pb-2">
      <div>
        <span className="font-medium">Police:</span> {devis.police}
      </div>
      <div>
        <span className="font-medium">Client:</span> {devis.client}
      </div>
      <div>
        <span className="font-medium">Adresse:</span> {devis.adresse}
      </div>
      <div>
        <span className="font-medium">Milieu:</span> {devis.milieu}
      </div>
    </div>
  );
}