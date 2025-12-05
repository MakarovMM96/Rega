import React, { useState } from 'react';
import { User, MapPin, Hash, Calendar, GraduationCap, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { RegistrationFormData, SubmissionResult, Nomination } from './types';
import { INITIAL_FORM_STATE } from './constants';
import { InputField } from './components/InputField';
import { NominationSelect } from './components/NominationSelect';
import { Snowfall } from './components/Snowfall';
import { generateHypeMessage } from './services/geminiService';
import { saveRegistrationToYandex } from './services/yandexService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Введите ФИО";
    if (!formData.city.trim()) newErrors.city = "Введите город";
    if (!formData.nickname.trim()) newErrors.nickname = "Введите никнейм";
    if (!formData.birthDate) newErrors.birthDate = "Выберите дату рождения";
    if (!formData.teacher.trim()) newErrors.teacher = "Введите педагога";
    if (formData.nomination.length === 0) newErrors.nomination = "Выберите хотя бы одну номинацию";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof RegistrationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNominationToggle = (nom: Nomination) => {
    setFormData(prev => {
      const current = prev.nomination;
      const isSelected = current.includes(nom);
      const newNominations = isSelected 
        ? current.filter(n => n !== nom) 
        : [...current, nom];
      
      return { ...prev, nomination: newNominations };
    });

    if (errors.nomination) {
      setErrors(prev => ({ ...prev, nomination: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      // 1. Parallel execution: Save data and Generate AI Hype
      const [saveSuccess, hypeMessage] = await Promise.all([
        saveRegistrationToYandex(formData),
        generateHypeMessage(formData.nickname, formData.nomination)
      ]);

      if (saveSuccess) {
        setResult({
          success: true,
          message: "Регистрация прошла успешно!",
          aiMessage: hypeMessage
        });
        setFormData(INITIAL_FORM_STATE);
      } else {
        throw new Error("Не удалось сохранить данные");
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Произошла ошибка при отправке данных. Попробуйте позже."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <Snowfall />

      <div className="relative z-10 w-full max-w-lg my-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-4 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Sparkles className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 drop-shadow-lg">
            ЙОЛКА <span className="text-emerald-400">FEST</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
            Фестиваль уличного танца
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Progress Bar (Visual decoration) */}
          <div className="h-1 w-full bg-slate-800">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-yellow-400 w-1/3 animate-pulse" />
          </div>

          <div className="p-6 md:p-8">
            {!result ? (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <InputField
                    label="Никнейм"
                    name="nickname"
                    placeholder="B-Boy Name"
                    value={formData.nickname}
                    onChange={handleChange}
                    error={errors.nickname}
                    icon={<Hash size={18} />}
                  />
                  <InputField
                    label="Дата рождения"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    error={errors.birthDate}
                    icon={<Calendar size={18} />}
                  />
                </div>

                <InputField
                  label="ФИО"
                  name="fullName"
                  placeholder="Иванов Иван Иванович"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  icon={<User size={18} />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Город"
                    name="city"
                    placeholder="Москва"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    icon={<MapPin size={18} />}
                  />
                  <InputField
                    label="Педагог / Клуб"
                    name="teacher"
                    placeholder="Имя педагога"
                    value={formData.teacher}
                    onChange={handleChange}
                    error={errors.teacher}
                    icon={<GraduationCap size={18} />}
                  />
                </div>

                <NominationSelect 
                  selected={formData.nomination}
                  onChange={handleNominationToggle}
                  error={errors.nomination}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Регистрация...
                    </>
                  ) : (
                    'Зарегистрироваться'
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-6">
                  <CheckCircle className="text-emerald-400 w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{result.message}</h2>
                <div className="bg-slate-800/50 rounded-lg p-4 mt-6 border border-slate-700">
                   <p className="text-sm text-slate-400 mb-2 uppercase tracking-wider font-bold text-xs">AI Hype Message:</p>
                   <p className="text-lg text-emerald-300 font-medium italic">"{result.aiMessage}"</p>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="mt-8 text-slate-400 hover:text-white underline underline-offset-4 text-sm transition-colors"
                >
                  Зарегистрировать еще одного участника
                </button>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-center text-slate-600 text-xs mt-6">
          © {new Date().getFullYear()} Yolka Fest Registration System
        </p>
      </div>
    </div>
  );
};

export default App;