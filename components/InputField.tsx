import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({ label, error, icon, className, ...props }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
          {icon}
        </div>
        <input
          className={`
            w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg 
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5 
            placeholder-slate-500 transition-all duration-200 outline-none
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};