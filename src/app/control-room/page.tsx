"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCMSConfig, updateCMSConfig } from "@/actions/cms-actions";
import { Save, LogOut, Calendar, Tag, Eye, EyeOff } from "lucide-react";

const MONTHS = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

export default function ControlRoomPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"promo" | "visit">("promo");
  const router = useRouter();

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem("murgia_token");
    if (!token) {
      router.push("/control-room/login");
      return;
    }

    async function loadData() {
      const data = await getCMSConfig();
      setConfig(data);
      setLoading(false);
    }
    loadData();
  }, [router]);

  async function handleSave() {
    setSaving(true);
    await updateCMSConfig(config);
    setSaving(false);
    // Visual feedback
    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-noir px-8 py-4 font-heading uppercase italic font-black z-[100000]";
    toast.innerText = "ALCHEMICAL SYNC COMPLETE";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function handleLogout() {
    localStorage.removeItem("murgia_token");
    router.push("/control-room/login");
  }

  if (loading) return (
    <div className="min-h-screen bg-noir flex items-center justify-center font-heading text-white tracking-[1em] uppercase italic">
      Inizializzazione Command Center...
    </div>
  );

  return (
    <div className="min-h-screen bg-noir text-white p-6 md:p-12 selection:bg-primary selection:text-noir pt-[40px]">
      
      {/* Header Ritual */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b-2 border-white/10 pb-8">
        <div className="space-y-2">
          <h1 className="font-heading text-6xl md:text-9xl uppercase italic font-black leading-none tracking-tighter flex items-center gap-4">
            CONTROL <span className="text-primary">ROOM</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-primary" />
            <p className="font-heading text-[10px] tracking-[0.5em] text-white/40 uppercase">Archivio Digitale Murgia &mdash; Sessione Attiva</p>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <nav className="flex gap-8">
            {["promo", "visit"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`font-heading text-xl uppercase italic font-black tracking-widest transition-all ${activeTab === tab ? 'text-primary border-b-2 border-primary pb-1' : 'text-white/20 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 text-white/40 hover:text-red-500 transition-colors font-heading text-xs tracking-widest uppercase font-bold"
          >
            Esci <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {activeTab === "promo" ? (
            <motion.section 
              key="promo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-8">
                <div className="space-y-1">
                  <h2 className="font-heading text-4xl uppercase italic font-black text-primary">Promo Ritual</h2>
                  <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Gestione Banner Promozionale</p>
                </div>
                <Switch 
                  active={config.promo.active} 
                  onChange={(val) => setConfig({ ...config, promo: { ...config.promo, active: val } })} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold flex items-center gap-2">
                      <Tag className="w-3 h-3" /> Codice Voucher
                    </label>
                    <input 
                      type="text" 
                      value={config.promo.code}
                      onChange={(e) => setConfig({ ...config, promo: { ...config.promo, code: e.target.value.toUpperCase() } })}
                      className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-4xl uppercase italic font-black focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold">Sconto (%)</label>
                    <input 
                      type="number" 
                      value={config.promo.discount}
                      onChange={(e) => setConfig({ ...config, promo: { ...config.promo, discount: parseInt(e.target.value) } })}
                      className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-4xl italic font-black focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold">Data Scadenza</label>
                    <input 
                      type="date" 
                      value={config.promo.expiryDate}
                      onChange={(e) => setConfig({ ...config, promo: { ...config.promo, expiryDate: e.target.value } })}
                      className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-2xl italic font-black focus:border-primary outline-none transition-colors invert dark:invert-0"
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.section 
              key="visit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-8">
                <div className="space-y-1">
                  <h2 className="font-heading text-4xl uppercase italic font-black text-primary">Visit Us Ritual</h2>
                  <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Sincronizzazione Prossima Esperienza</p>
                </div>
                <Switch 
                  active={config.visit.active} 
                  onChange={(val) => setConfig({ ...config, visit: { ...config.visit, active: val } })} 
                />
              </div>

              <div className="space-y-12">
                <div className="space-y-4">
                  <label className="font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Seleziona Giorno Esperienza
                  </label>
                  
                  <DatePicker 
                    value={config.visit.nextDate} 
                    onChange={(date) => {
                      const d = new Date(date);
                      const monthName = MONTHS[d.getMonth()];
                      setConfig({ 
                        ...config, 
                        visit: { 
                          ...config.visit, 
                          nextDate: date,
                          displayMonth: monthName 
                        } 
                      });
                    }}
                  />
                </div>

                <div className="p-8 border-2 border-white/5 bg-white/[0.02] space-y-4">
                  <p className="font-heading text-xs tracking-widest text-white/40 uppercase">Anteprima Mural:</p>
                  <div className="flex items-end gap-4">
                    <span className="font-heading text-6xl uppercase italic font-black text-primary leading-none">{config.visit.displayMonth}</span>
                    <span className="font-heading text-2xl uppercase italic font-black text-white/20 mb-1">{config.visit.nextDate.split('-')[2]}</span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="fixed bottom-12 right-12 z-[100]">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-noir flex items-center gap-6 px-12 py-6 font-heading text-2xl uppercase italic font-black shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all disabled:opacity-50"
        >
          {saving ? "SYNCING..." : "SALVA RITUALE"} <Save className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
}

function Switch({ active, onChange }: { active: boolean, onChange: (v: boolean) => void }) {
  return (
    <button 
      onClick={() => onChange(!active)}
      className="flex items-center gap-4 group"
    >
      <span className={`font-heading text-xs uppercase tracking-widest font-bold transition-colors ${active ? 'text-primary' : 'text-white/20'}`}>
        {active ? "ON" : "OFF"}
      </span>
      <div className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${active ? 'bg-primary' : 'bg-white/10'}`}>
        <motion.div 
          animate={{ x: active ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 bg-white rounded-full shadow-lg"
        />
      </div>
    </button>
  );
}

function DatePicker({ value, onChange }: { value: string, onChange: (date: string) => void }) {
  const date = new Date(value);
  const [viewDate, setViewDate] = useState(new Date(value));
  
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  
  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));

  return (
    <div className="border-2 border-white/10 bg-noir max-w-sm">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button onClick={prevMonth} className="p-2 hover:text-primary transition-colors italic font-black font-heading">{"<"}</button>
        <span className="font-heading text-lg uppercase italic font-black">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button onClick={nextMonth} className="p-2 hover:text-primary transition-colors italic font-black font-heading">{">"}</button>
      </div>
      <div className="grid grid-cols-7 text-center border-b border-white/10">
        {["D", "L", "M", "M", "G", "V", "S"].map((d, i) => (
          <div key={`${d}-${i}`} className="p-2 text-[10px] font-bold text-white/40">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="p-4" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const currentStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = value === currentStr;
          
          return (
            <button 
              key={day}
              onClick={() => onChange(currentStr)}
              className={`p-4 font-heading text-sm hover:bg-primary/20 transition-colors ${isSelected ? 'bg-primary text-noir font-black' : ''}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

