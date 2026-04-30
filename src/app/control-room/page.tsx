"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCMSConfig, updateCMSConfig } from "@/actions/cms-actions";
import { Save, LogOut, Calendar, Tag, MapPin, Plus, Trash2, ExternalLink, Search } from "lucide-react";

const MONTHS = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

export default function ControlRoomPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"promo" | "visit" | "find-us">("promo");
  const [showPromoCalendar, setShowPromoCalendar] = useState(false);
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
    const cleanConfig = {
      ...config,
      locations: config.locations?.map(({ isNew, ...rest }: any) => rest)
    };
    await updateCMSConfig(cleanConfig);
    setConfig(cleanConfig);
    setSaving(false);
    // Visual feedback
    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-noir px-8 py-4 font-heading italic font-black z-[100000]";
    toast.innerText = "saved";
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
    <div 
      className="min-h-screen bg-noir text-white px-6 md:px-12 selection:bg-primary selection:text-noir"
      style={{ paddingTop: '210px' }}
    >
      
      {/* Header Ritual */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b-2 border-white/10 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <p className="font-heading text-4xl tracking-widest text-primary uppercase font-bold">CONTROL ROOM</p>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <nav className="flex gap-8">
            {["promo", "visit", "find-us"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`font-heading text-sm uppercase font-bold tracking-widest transition-all ${activeTab === tab ? 'text-primary border-b-2 border-primary pb-1' : 'text-white/20 hover:text-white'}`}
              >
                {tab === "find-us" ? "Find Us" : tab}
              </button>
            ))}
          </nav>
          <button 
            onClick={handleLogout}
            className="text-white/40 hover:text-red-500 transition-colors"
            title="Esci"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl py-12">
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
                  <h2 className="font-heading text-2xl font-bold text-primary uppercase tracking-tight">Promozione</h2>
                  <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Configura il banner di sconto</p>
                </div>
                <Switch 
                  active={config.promo.active} 
                  onChange={(val) => setConfig({ ...config, promo: { ...config.promo, active: val } })} 
                />
              </div>

                </div>
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
                      className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-lg text-white focus:border-primary outline-none transition-colors"
                      placeholder="ES: MURGIA10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold">Sconto (%)</label>
                    <input 
                      type="number" 
                      value={config.promo.discount}
                      onChange={(e) => setConfig({ ...config, promo: { ...config.promo, discount: parseInt(e.target.value) } })}
                      className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-lg text-white focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Data Scadenza
                    </label>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setShowPromoCalendar(!showPromoCalendar)}
                        className="w-full flex items-center justify-between bg-white/5 border-b-2 border-white/10 p-4 font-sans text-lg hover:border-primary transition-colors text-left"
                      >
                        {config.promo.expiryDate}
                        <Calendar className={`w-5 h-5 ${showPromoCalendar ? 'text-primary' : 'text-white/20'}`} />
                      </button>

                      <AnimatePresence>
                        {showPromoCalendar && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 z-50 mt-4 shadow-2xl"
                          >
                            <DatePicker 
                              value={config.promo.expiryDate}
                              onChange={(date) => {
                                setConfig({ ...config, promo: { ...config.promo, expiryDate: date } });
                                setShowPromoCalendar(false);
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multilingual Contents Ritual (Promo) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8 border-t border-white/5">
                {['it', 'en'].map((lang) => (
                  <div key={`promo-lang-${lang}`} className="space-y-8">
                    <h3 className="font-heading text-xs tracking-[0.4em] text-primary uppercase font-bold">
                      Contenuti {lang.toUpperCase()}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Descrizione Breve</label>
                        <input 
                          type="text" 
                          value={config.promo.texts?.[lang]?.description || ""}
                          onChange={(e) => {
                            const newTexts = { ...config.promo.texts };
                            newTexts[lang] = { ...newTexts[lang], description: e.target.value.toUpperCase() };
                            setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                          }}
                          className="w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Descrizione Estesa</label>
                        <textarea 
                          value={config.promo.texts?.[lang]?.fullDescription || ""}
                          onChange={(e) => {
                            const newTexts = { ...config.promo.texts };
                            newTexts[lang] = { ...newTexts[lang], fullDescription: e.target.value.toUpperCase() };
                            setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                          }}
                          className="w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase h-20 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Testo CTA</label>
                          <input 
                            type="text" 
                            value={config.promo.texts?.[lang]?.cta || ""}
                            onChange={(e) => {
                              const newTexts = { ...config.promo.texts };
                              newTexts[lang] = { ...newTexts[lang], cta: e.target.value.toUpperCase() };
                              setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                            }}
                            className="w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Messaggio Successo</label>
                          <input 
                            type="text" 
                            value={config.promo.texts?.[lang]?.successMsg || ""}
                            onChange={(e) => {
                              const newTexts = { ...config.promo.texts };
                              newTexts[lang] = { ...newTexts[lang], successMsg: e.target.value.toUpperCase() };
                              setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                            }}
                            className="w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            </motion.section>
          ) : activeTab === "visit" ? (
            <motion.section 
              key="visit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-8">
                <div className="space-y-1">
                  <h2 className="font-heading text-2xl font-bold text-primary uppercase tracking-tight">Visit Us</h2>
                  <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Pianificazione Prossima Visita</p>
                </div>
                <Switch 
                  active={config.visits?.[0]?.active !== false} 
                  onChange={(val) => {
                    const newVisits = [...(config.visits || [])];
                    if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                    newVisits[0].active = val;
                    setConfig({ ...config, visits: newVisits });
                  }} 
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1 space-y-4">
                  <label className="font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Seleziona Giorno Visita
                  </label>
                  
                  <DatePicker 
                    value={config.visits?.[0]?.date || "2024-05-18"} 
                    onChange={(date) => {
                      const newVisits = [...(config.visits || [])];
                      if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                      newVisits[0].date = date;
                      setConfig({ ...config, visits: newVisits });
                    }}
                  />
                </div>

                <div className="lg:w-80 p-8 bg-white/[0.05] space-y-4 self-stretch flex flex-col justify-center">
                  <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Anteprima Live:</p>
                  <div className="flex flex-col items-center">
                    <span className="font-heading text-sm uppercase font-bold text-primary tracking-widest">
                      {new Date(config.visits?.[0]?.date || "2024-05-18").toLocaleDateString('it-IT', { weekday: 'short' })}
                    </span>
                    <span className="font-heading text-7xl uppercase font-black text-white leading-none">
                      {new Date(config.visits?.[0]?.date || "2024-05-18").getDate()}
                    </span>
                    <span className="font-heading text-lg uppercase font-bold text-white/40 tracking-[0.4em]">
                      {new Date(config.visits?.[0]?.date || "2024-05-18").toLocaleDateString('it-IT', { month: 'short' })}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5">
                    <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold block mb-2 text-center">Prezzo Visita (&euro;)</label>
                    <input 
                      type="number" 
                      value={config.visits?.[0]?.price || 0}
                      onChange={(e) => {
                        const newVisits = [...(config.visits || [])];
                        if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                        newVisits[0].price = parseInt(e.target.value);
                        setConfig({ ...config, visits: newVisits });
                      }}
                      className="w-full bg-noir border border-white/10 p-2 font-sans text-center text-lg text-primary focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Multilingual Contents Ritual (Visit) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8 border-t border-white/5">
                {['it', 'en'].map((lang) => (
                  <div key={`visit-lang-${lang}`} className="space-y-8">
                    <h3 className="font-heading text-xs tracking-[0.4em] text-primary uppercase font-bold">
                      Contenuti {lang.toUpperCase()}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Titolo</label>
                        <input 
                          type="text" 
                          value={config.visits?.[0]?.texts?.[lang]?.title || ""}
                          onChange={(e) => {
                            const newVisits = [...(config.visits || [])];
                            if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                            if (!newVisits[0].texts) newVisits[0].texts = { it: { title: "", subtitle: "", cta: "" }, en: { title: "", subtitle: "", cta: "" } };
                            newVisits[0].texts[lang] = { ...newVisits[0].texts[lang], title: e.target.value.toUpperCase() };
                            setConfig({ ...config, visits: newVisits });
                          }}
                          className="w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Sottotitolo</label>
                        <textarea 
                          value={config.visits?.[0]?.texts?.[lang]?.subtitle || ""}
                          onChange={(e) => {
                            const newVisits = [...(config.visits || [])];
                            if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                            if (!newVisits[0].texts) newVisits[0].texts = { it: { title: "", subtitle: "", cta: "" }, en: { title: "", subtitle: "", cta: "" } };
                            newVisits[0].texts[lang] = { ...newVisits[0].texts[lang], subtitle: e.target.value.toUpperCase() };
                            setConfig({ ...config, visits: newVisits });
                          }}
                          className="w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase h-20 resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Testo CTA</label>
                        <input 
                          type="text" 
                          value={config.visits?.[0]?.texts?.[lang]?.cta || ""}
                          onChange={(e) => {
                            const newVisits = [...(config.visits || [])];
                            if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                            if (!newVisits[0].texts) newVisits[0].texts = { it: { title: "", subtitle: "", cta: "" }, en: { title: "", subtitle: "", cta: "" } };
                            newVisits[0].texts[lang] = { ...newVisits[0].texts[lang], cta: e.target.value.toUpperCase() };
                            setConfig({ ...config, visits: newVisits });
                          }}
                          className="w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="find-us"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <LocationsManager config={config} setConfig={setConfig} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="fixed bottom-12 right-12 z-[100]">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-noir flex items-center gap-4 px-10 py-5 font-heading text-xl uppercase font-bold shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {saving ? "SINCRONIZZAZIONE..." : "SALVA MODIFICHE"} <Save className="w-5 h-5" />
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


function LocationsManager({ config, setConfig }: { config: any, setConfig: (c: any) => void }) {
  const [search, setSearch] = useState("");
  const locations = config.locations || [];
  
  const filtered = locations.filter((loc: any) => 
    loc.name.toLowerCase().includes(search.toLowerCase()) || 
    loc.city.toLowerCase().includes(search.toLowerCase())
  );

  const addLocation = () => {
    const newLoc = { name: "NUOVO PUNTO VENDITA", city: "CITTA", address: "VIA...", map: "", isNew: true };
    setConfig({ ...config, locations: [newLoc, ...locations] });
  };

  const updateLocation = (index: number, field: string, value: string) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setConfig({ ...config, locations: newLocations });
  };

  const deleteLocation = (index: number) => {
    if (confirm("Sei sicuro di voler eliminare questa location?")) {
      const newLocations = locations.filter((_: any, i: number) => i !== index);
      setConfig({ ...config, locations: newLocations });
    }
  };

  return (
    <div className="space-y-12 pb-32">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8">
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-bold text-primary uppercase tracking-tight">Find Us</h2>
          <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Gestisci i punti vendita e i partner</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="CERCA..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 font-heading text-xs tracking-widest uppercase focus:border-primary outline-none transition-colors"
            />
          </div>
          <button 
            onClick={addLocation}
            className="bg-primary text-noir p-4 flex items-center gap-2 font-heading text-xs font-bold tracking-widest hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> AGGIUNGI
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((loc: any, idx: number) => {
          // Find original index for updates
          const originalIdx = locations.findIndex((l: any) => l === loc);
          
          return (
            <motion.div 
              layout
              key={`loc-${originalIdx}`}
              className={`border p-6 md:p-8 space-y-6 group transition-all duration-500 ${
                loc.isNew 
                  ? 'bg-primary/10 border-primary/30 shadow-[0_0_40px_rgba(234,179,8,0.05)]' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Nome Locale</label>
                      <input 
                        type="text" 
                        value={loc.name}
                        onChange={(e) => updateLocation(originalIdx, "name", e.target.value.toUpperCase())}
                        className="w-full bg-transparent border-b border-white/10 p-2 font-heading text-sm tracking-widest text-white focus:border-primary outline-none transition-colors uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Città</label>
                      <input 
                        type="text" 
                        value={loc.city}
                        onChange={(e) => updateLocation(originalIdx, "city", e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 p-2 font-heading text-sm tracking-widest text-white focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Indirizzo</label>
                    <input 
                      type="text" 
                      value={loc.address}
                      onChange={(e) => updateLocation(originalIdx, "address", e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 p-2 font-heading text-sm tracking-widest text-white focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Google Maps Link</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="text" 
                        value={loc.map}
                        onChange={(e) => updateLocation(originalIdx, "map", e.target.value)}
                        className="flex-1 bg-transparent border-b border-white/10 p-2 font-sans text-xs text-white/60 focus:border-primary outline-none transition-colors"
                        placeholder="https://goo.gl/maps/..."
                      />
                      {loc.map && (
                        <a href={loc.map} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-primary transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex md:flex-col items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                  <button 
                    onClick={() => deleteLocation(originalIdx)}
                    className="p-4 text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
