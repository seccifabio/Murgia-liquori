"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCMSConfig, updateCMSConfig } from "@/actions/cms-actions";
import { Save, LogOut, Calendar, Tag, MapPin, Plus, Minus, Trash2, ExternalLink, Search, Mail, Type, MessageSquare, ArrowRight } from "lucide-react";

const MONTHS = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

export default function ControlRoomPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"promo" | "visit" | "find-us" | "email">("promo");
  const [promoLang, setPromoLang] = useState<"it" | "en">("it");
  const [visitLang, setVisitLang] = useState<"it" | "en">("it");
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
    toast.className = "fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#22c55e] text-black px-10 py-5 font-heading italic font-black z-[100000] shadow-[0_0_50px_rgba(34,197,94,0.3)]";
    toast.innerText = "CONFIGURAZIONE SINCRONIZZATA";
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
            {["promo", "visit", "email", "find-us"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`font-heading text-sm uppercase font-bold tracking-widest transition-all ${activeTab === tab ? 'text-primary border-b-2 border-primary pb-1' : 'text-white/20 hover:text-white'}`}
              >
                {tab === "find-us" ? "Find Us" : tab === "email" ? "Order Email" : tab}
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

      <main className="w-full py-12">
        <AnimatePresence mode="wait">
          {activeTab === "promo" &&
            <motion.section
              key="promo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <div className="max-w-4xl mx-auto space-y-12">
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
              <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white text-noir mt-24 py-24 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-12">
                  <div className="flex flex-col md:flex-row items-center justify-between border-b border-noir/10 pb-8 gap-8">
                    <div className="space-y-1">
                      <h3 className="font-heading text-2xl font-black text-noir uppercase tracking-tight">Testi Localizzati</h3>
                      <p className="font-heading text-[10px] tracking-widest text-noir/40 uppercase">Personalizza i messaggi del banner per ogni lingua</p>
                    </div>

                    <div className="flex bg-noir/5 p-1 rounded-sm border border-noir/10">
                      {["it", "en"].map((l) => (
                        <button
                          key={l}
                          onClick={() => setPromoLang(l as any)}
                          className={`px-8 py-3 font-heading text-[10px] tracking-widest uppercase transition-all ${promoLang === l ? 'bg-primary text-noir font-black' : 'text-noir/40 hover:text-noir'}`}
                        >
                          {l === "it" ? "ITALIANO" : "ENGLISH"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto w-full">
                    <motion.div
                      key={promoLang}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="font-heading text-[10px] tracking-widest text-noir/40 uppercase font-bold">Descrizione Breve</label>
                          <input
                            type="text"
                            value={config.promo.texts?.[promoLang]?.description || ""}
                            onChange={(e) => {
                              const newTexts = { ...config.promo.texts };
                              newTexts[promoLang] = { ...newTexts[promoLang], description: e.target.value.toUpperCase() };
                              setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                            }}
                            className="w-full bg-noir/5 border-b-2 border-noir/10 p-4 font-sans text-lg text-noir focus:border-primary outline-none transition-colors uppercase font-bold"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-heading text-[10px] tracking-widest text-noir/40 uppercase font-bold">Descrizione Estesa</label>
                          <textarea
                            value={config.promo.texts?.[promoLang]?.fullDescription || ""}
                            onChange={(e) => {
                              const newTexts = { ...config.promo.texts };
                              newTexts[promoLang] = { ...newTexts[promoLang], fullDescription: e.target.value.toUpperCase() };
                              setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                            }}
                            className="w-full bg-noir/5 border-b-2 border-noir/10 p-4 font-sans text-sm text-noir focus:border-primary outline-none transition-colors uppercase h-32 resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="font-heading text-[10px] tracking-widest text-noir/40 uppercase font-bold">Testo CTA</label>
                            <input
                              type="text"
                              value={config.promo.texts?.[promoLang]?.cta || ""}
                              onChange={(e) => {
                                const newTexts = { ...config.promo.texts };
                                newTexts[promoLang] = { ...newTexts[promoLang], cta: e.target.value.toUpperCase() };
                                setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                              }}
                              className="w-full bg-noir/5 border-b-2 border-noir/10 p-4 font-sans text-lg text-noir focus:border-primary outline-none transition-colors uppercase font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-heading text-[10px] tracking-widest text-noir/40 uppercase font-bold">Messaggio Successo</label>
                            <input
                              type="text"
                              value={config.promo.texts?.[promoLang]?.successMsg || ""}
                              onChange={(e) => {
                                const newTexts = { ...config.promo.texts };
                                newTexts[promoLang] = { ...newTexts[promoLang], successMsg: e.target.value.toUpperCase() };
                                setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                              }}
                              className="w-full bg-noir/5 border-b-2 border-noir/10 p-4 font-sans text-lg text-noir focus:border-primary outline-none transition-colors uppercase font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          }

          {activeTab === "visit" &&
            <motion.section
              key="visit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-8 gap-8">
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

                <div className="lg:w-80 p-8 bg-white/5 space-y-6 self-stretch flex flex-col justify-center border border-white/10">
                  <div className="space-y-4">
                    <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold text-center block">Prezzo Visita (€)</label>
                    <input
                      type="number"
                      value={config.visits?.[0]?.price || 0}
                      onChange={(e) => {
                        const newVisits = [...(config.visits || [])];
                        if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                        newVisits[0].price = parseInt(e.target.value) || 0;
                        setConfig({ ...config, visits: newVisits });
                      }}
                      className="w-full bg-transparent border-b border-white/10 p-6 font-heading text-center text-5xl text-primary focus:border-primary outline-none transition-colors font-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Multilingual Contents Ritual (Visit) */}
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white text-noir mt-24 py-24 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
              <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-noir/10 pb-8 gap-8">
                  <div className="space-y-1">
                    <h3 className="font-heading text-2xl font-black text-noir uppercase tracking-tight">Testi Esperienza</h3>
                    <p className="font-heading text-[10px] tracking-widest text-noir/40 uppercase">Gestisci i contenuti della sidebar "Prenota Visita"</p>
                  </div>

                  <div className="flex bg-noir/5 p-1 rounded-sm border border-noir/10">
                    {["it", "en"].map((l) => (
                      <button
                        key={l}
                        onClick={() => setVisitLang(l as any)}
                        className={`px-8 py-3 font-heading text-[10px] tracking-widest uppercase transition-all ${visitLang === l ? 'bg-primary text-noir font-black' : 'text-noir/40 hover:text-noir'}`}
                      >
                        {l === "it" ? "ITALIANO" : "ENGLISH"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-w-2xl mx-auto w-full">
                  <motion.div
                    key={visitLang}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="font-heading text-[10px] tracking-widest text-noir/40 uppercase font-bold">Titolo</label>
                        <input
                          type="text"
                          value={config.visits?.[0]?.texts?.[visitLang]?.title || ""}
                          onChange={(e) => {
                            const newVisits = [...(config.visits || [])];
                            if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                            if (!newVisits[0].texts) newVisits[0].texts = { it: { title: "", subtitle: "", cta: "" }, en: { title: "", subtitle: "", cta: "" } };
                            newVisits[0].texts[visitLang] = { ...newVisits[0].texts[visitLang], title: e.target.value.toUpperCase() };
                            setConfig({ ...config, visits: newVisits });
                          }}
                          className="w-full bg-noir/5 border-b-2 border-noir/10 p-4 font-sans text-lg text-noir focus:border-primary outline-none transition-colors uppercase font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-heading text-[10px] tracking-widest text-noir/40 uppercase font-bold">Sottotitolo</label>
                        <textarea
                          value={config.visits?.[0]?.texts?.[visitLang]?.subtitle || ""}
                          onChange={(e) => {
                            const newVisits = [...(config.visits || [])];
                            if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                            if (!newVisits[0].texts) newVisits[0].texts = { it: { title: "", subtitle: "", cta: "" }, en: { title: "", subtitle: "", cta: "" } };
                            newVisits[0].texts[visitLang] = { ...newVisits[0].texts[visitLang], subtitle: e.target.value.toUpperCase() };
                            setConfig({ ...config, visits: newVisits });
                          }}
                          className="w-full bg-noir/5 border-b-2 border-noir/10 p-4 font-sans text-sm text-noir focus:border-primary outline-none transition-colors uppercase h-32 resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-heading text-[10px] tracking-widest text-noir/40 uppercase font-bold">Testo CTA</label>
                        <input
                          type="text"
                          value={config.visits?.[0]?.texts?.[visitLang]?.cta || ""}
                          onChange={(e) => {
                            const newVisits = [...(config.visits || [])];
                            if (!newVisits[0]) newVisits[0] = { date: "2024-05-18", active: true };
                            if (!newVisits[0].texts) newVisits[0].texts = { it: { title: "", subtitle: "", cta: "" }, en: { title: "", subtitle: "", cta: "" } };
                            newVisits[0].texts[visitLang] = { ...newVisits[0].texts[visitLang], cta: e.target.value.toUpperCase() };
                            setConfig({ ...config, visits: newVisits });
                          }}
                          className="w-full bg-noir/5 border-b-2 border-noir/10 p-4 font-sans text-lg text-noir focus:border-primary outline-none transition-colors uppercase font-bold"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
            </div>
          </div>
        </motion.section>
          }

          {activeTab === "find-us" &&
            <motion.section
              key="find-us"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="max-w-4xl mx-auto">
                <LocationsManager config={config} setConfig={setConfig} />
              </div>
            </motion.section>
          }

          {activeTab === "email" &&
            <motion.section
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <EmailManager config={config} setConfig={setConfig} />
            </motion.section>
          }
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="fixed bottom-0 left-0 w-full bg-noir border-t border-white/10 p-6 z-[100]">
        <div className="max-w-7xl mx-auto w-full flex justify-end px-6 md:px-12">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-noir flex items-center gap-4 px-10 py-5 font-heading text-xl uppercase font-bold shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {saving ? "SINCRONIZZAZIONE..." : "SALVA MODIFICHE"} <Save className="w-5 h-5" />
          </button>
        </div>
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

function EmailManager({ config, setConfig }: { config: any, setConfig: (c: any) => void }) {
  const [lang, setLang] = useState<"it" | "en">("it");
  const emailConfig = config.email?.[lang] || {};

  const updateField = (field: string, value: string) => {
    const newEmail = { ...config.email };
    newEmail[lang] = { ...newEmail[lang], [field]: value };
    setConfig({ ...config, email: newEmail });
  };

  const fields = [
    { id: 'subject', label: 'Oggetto Email', icon: Mail, type: 'text' },
    { id: 'heroSubtitle', label: 'Sottotitolo Hero', icon: MessageSquare, type: 'textarea' },
    { id: 'orderRef', label: 'Label Riferimento Ordine', icon: Tag, type: 'text' },
    { id: 'orderTotal', label: 'Label Totale Ordine', icon: Tag, type: 'text' },
    { id: 'shippingDest', label: 'Label Destinazione', icon: MapPin, type: 'text' },
    { id: 'crossText', label: 'Testo Cross-Sell', icon: MessageSquare, type: 'textarea' },
    { id: 'crossCta', label: 'CTA Cross-Sell', icon: ArrowRight, type: 'text' },
    { id: 'supportText', label: 'Testo Supporto', icon: MessageSquare, type: 'text' },
    { id: 'contactText', label: 'Label Contatto', icon: MessageSquare, type: 'text' },
    { id: 'footerNote', label: 'Nota Footer', icon: Type, type: 'text' },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-16 items-start">
      {/* Editor Side */}
      <div className="flex-1 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-8 gap-8">
          <div className="space-y-1">
            <h2 className="font-heading text-2xl font-bold text-primary uppercase tracking-tight">Email Confirmation</h2>
            <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Transactional orders experience</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-sm border border-white/10">
            {["it", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as any)}
                className={`px-8 py-3 font-heading text-[10px] tracking-widest uppercase transition-all ${lang === l ? 'bg-primary text-noir font-black' : 'text-white/40 hover:text-white'}`}
              >
                {l === "it" ? "ITALIANO" : "ENGLISH"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {fields.map((field) => (
            <div key={field.id} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
              <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold flex items-center gap-2">
                <field.icon className="w-3 h-3" /> {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={emailConfig[field.id] || ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors h-24 resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={emailConfig[field.id] || ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-lg text-white focus:border-primary outline-none transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Side */}
      <div className="xl:w-[450px] w-full shrink-0 space-y-6">
        <h3 className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold text-center">Live Preview</h3>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden shadow-2xl sticky top-32 scale-90 origin-top">
           <EmailPreview data={emailConfig} lang={lang} />
        </div>
      </div>
    </div>
  );
}

function EmailPreview({ data, lang }: { data: any, lang: string }) {
  return (
    <div className="font-sans text-white/90 text-xs">
      {/* Subject Line Bar */}
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
          <div className="w-2 h-2 rounded-full bg-green-500/40" />
        </div>
        <span className="text-[10px] text-white/20 uppercase tracking-widest font-heading overflow-hidden text-ellipsis whitespace-nowrap">
          {data.subject || "Order Confirmation"} #ABC12345
        </span>
      </div>

      <div className="max-h-[600px] overflow-y-auto bg-[#0A0A0A]">
        {/* Yellow Header */}
        <div className="bg-primary p-6 text-center">
          <h1 className="font-heading text-2xl font-black text-noir tracking-[0.2em] m-0">MURGIA</h1>
          <p className="font-heading text-[6px] tracking-[0.5em] text-noir/60 m-0 -mt-1">LIQUORI</p>
        </div>

        {/* Hero Section */}
        <div className="relative aspect-video bg-[#121212] flex items-center justify-center p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-noir/80 to-noir" />
          <div className="relative z-10 space-y-4">
            <div className="w-8 h-[1px] bg-primary mx-auto" />
            <p className="text-[10px] italic text-white/60 leading-relaxed max-w-[200px] mx-auto">
              {data.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-end border-b border-white/10 pb-4">
            <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase font-heading">{data.orderRef}</span>
            <span className="font-mono text-[10px]">#ABC12345</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-heading text-xs font-black tracking-widest uppercase">FIL’E FERRU</p>
                <p className="text-[8px] italic text-white/40">70cl — Edizione Archivi</p>
              </div>
              <span className="text-xs">38,00€</span>
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <span className="font-heading text-sm tracking-widest uppercase">{data.orderTotal}</span>
              <span className="text-xl text-primary font-light">38,00€</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase font-heading">{data.shippingDest}</span>
            <p className="text-[10px] leading-relaxed">
              <strong className="block mb-1">Alessandro Murgia</strong>
              Via Parrocchia 29, 09039 Villacidro (SU)
            </p>
          </div>
        </div>

        {/* Cross-sell */}
        <div className="bg-[#121212] p-10 text-center space-y-4">
          <p className="text-[9px] text-white/40 leading-relaxed">
            {data.crossText}
          </p>
          <div className="inline-block bg-primary text-noir px-6 py-3 font-heading text-[8px] font-black tracking-[0.3em] uppercase">
            {data.crossCta}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black p-10 text-center space-y-8">
          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-black text-primary tracking-[0.1em] m-0 leading-none">MURGIA</h1>
            <p className="font-heading text-[6px] tracking-[0.4em] text-white/20 m-0">LIQUORI</p>
          </div>

          <div className="space-y-4">
            <p className="text-[8px] tracking-[0.1em] text-white/40 uppercase">{data.supportText}</p>
            <p className="text-primary text-[10px]">{data.contactText} info@murgialiquori.it</p>
          </div>

          <p className="text-[7px] text-white/10 uppercase tracking-widest pt-8 border-t border-white/5">
            {data.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
}
