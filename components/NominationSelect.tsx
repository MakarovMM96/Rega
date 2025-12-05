import React from 'react';
import { NOMINATIONS_LIST } from '../constants';
import { Trophy, Check } from 'lucide-react';
import { Nomination } from '../types';

interface NominationSelectProps {
  selected: Nomination[];
  onChange: (nomination: Nomination) => void;
  error?: string;
}

export const NominationSelect: React.FC<NominationSelectProps> = ({ selected, onChange, error }) => {
  return (
    <div className="mb-6 w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2.5 flex items-center gap-2">
        <Trophy size={16} className="text-yellow-400" />
        Выберите номинации (можно несколько)
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {NOMINATIONS_LIST.map((nom) => {
          const isSelected = selected.includes(nom);
          return (
            <button
              key={nom}
              type="button"
              onClick={() => onChange(nom)}
              className={`
                relative flex items-center justify-between p-3 rounded-lg border text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900
                ${isSelected 
                  ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 focus:ring-yellow-500' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600 focus:ring-slate-500'}
              `}
            >
              <span>{nom}</span>
              {isSelected && <Check size={16} className="text-yellow-400" />}
            </button>
          );
        })}
      </div>
      
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
};