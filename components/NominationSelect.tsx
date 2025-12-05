import React from 'react';
import { NOMINATIONS_LIST } from '../constants';
import { Trophy } from 'lucide-react';
import { Nomination } from '../types';

interface NominationSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export const NominationSelect: React.FC<NominationSelectProps> = ({ value, onChange, error }) => {
  return (
    <div className="mb-6 w-full">
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        Номинация
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-yellow-400 transition-colors">
          <Trophy size={18} />
        </div>
        <select
          value={value}
          onChange={onChange}
          className={`
            w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg 
            focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5 
            cursor-pointer appearance-none transition-all duration-200 outline-none
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
        >
          <option value="" disabled className="text-slate-500 bg-slate-800">Выберите номинацию</option>
          {NOMINATIONS_LIST.map((nom) => (
            <option key={nom} value={nom} className="bg-slate-800 text-white py-2">
              {nom}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};