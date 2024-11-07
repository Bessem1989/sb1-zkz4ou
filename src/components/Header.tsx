import React from 'react';

interface HeaderProps {
  title: string;
  date: string;
}

export function Header({ title, date }: HeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="text-left font-semibold">
          STEG<br />
          DISTRICT MOKNINE<br />
          DIVISION ETUDES ET CARTOGRAPHIE
        </div>
        <div className="text-center font-semibold">
          <div className="text-xs text-gray-500 mb-1">dev. par Bfrija</div>
          <div className="text-sm text-gray-600">MERCURIALE 2022</div>
        </div>
        <div className="text-right font-semibold">
          <div>Date: {date}</div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">
        <span className="border-b-2 border-gray-800">DEVIS SUITE RE-ETUDE</span>
      </h1>
    </div>
  );
}