import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Store, 
  MapPin, 
  Calendar, 
  Tag, 
  Save, 
  LogOut,
  ChevronRight,
  Globe,
  Plus,
  Trash2,
  Clock,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { CMSConfig, Location } from "@/types/cms";
import DatePicker from "@/components/DatePicker";

const Switch = ({ active, onChange }: { active: boolean; onChange: (val: boolean) => void }) => (
  <button
    onClick={() => onChange(!active)}
    className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-primary' : 'bg-white/10'}`}
  >
    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const LocationsManager = ({ config, setConfig }: { config: CMSConfig; setConfig: (c: CMSConfig) => void }) => {
  const addLocation = () => {
    const newLocation: Location = {
      id: crypto.randomUUID(),
      name: "NUOVA LOCATION",
      address: "",
      city: "NUORO",
      type: "RETAIL",
      active: true
    };
    setConfig({ ...config, locations: [...config.locations, newLocation] });
  };

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setConfig({
      ...config,
      locations: config.locations.map(loc => loc.id === id ? { ...loc, ...updates } : loc)
    });
  };

  const removeLocation = (id: string) => {
    setConfig({
      ...config,
      locations: config.locations.filter(loc => loc.id !== id)
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-bold text-primary uppercase tracking-tight">Punti Vendita</h2>
          <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Gestisci la rete di distribuzione</p>
        </div>
        <button
          onClick={addLocation}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-noir transition-all uppercase font-heading text-[10px] tracking-widest font-bold"
        >
          <Plus className="w-4 h-4" /> Aggiungi
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {config.locations.map((loc) => (
          <div key={loc.id} className="bg-white/5 border border-white/10 p-6 group hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Nome</label>
                  <input
                    type="text"
                    value={loc.name}
                    onChange={(e) => updateLocation(loc.id, { name: e.target.value.toUpperCase() })}
                    className="w-full bg-transparent border-b border-white/10 py-2 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Città</label>
                  <input
                    type="text"
                    value={loc.city}
                    onChange={(e) => updateLocation(loc.id, { city: e.target.value.toUpperCase() })}
                    className="w-full bg-transparent border-b border-white/10 py-2 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Tipo</label>
                  <select
                    value={loc.type}
                    onChange={(e) => updateLocation(loc.id, { type: e.target.value as Location['type'] })}
                    className="w-full bg-transparent border-b border-white/10 py-2 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                  >
                    <option value="RETAIL" className="bg-noir text-white">RETAIL</option>
                    <option value="HORECA" className="bg-noir text-white">HORECA</option>
                    <option value="OFFICIAL" className="bg-noir text-white">OFFICIAL</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <Switch 
                  active={loc.active} 
                  onChange={(val) => updateLocation(loc.id, { active: val })} 
                />
                <button 
                  onClick={() => removeLocation(loc.id)}
                  className="p-2 text-white/20 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label className="font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold">Indirizzo Completo</label>
              <input
                type="text"
                value={loc.address}
                onChange={(e) => updateLocation(loc.id, { address: e.target.value.toUpperCase() })}
                className="w-full bg-transparent border-b border-white/10 py-2 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                placeholder="VIA ..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ControlRoomPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(\"promo\");
  const [config, setConfig] = useState<CMSConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPromoCalendar, setShowPromoCalendar] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push(\"/control-room/login\");
      return;
    }

    fetch(\"/api/cms/config\")
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      });
  }, [user, router]);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      const res = await fetch(\"/api/cms/config\", {
        method: \"POST\",
        headers: { \"Content-Type\": \"application/json\" },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        // Show success toast or feedback
      }
    } finally {
      setSaving(false);
    }
  };

  if (!user || loading || !config) return null;

  const tabs = [
    { id: \"promo\", label: \"Promozione\", icon: Tag },
    { id: \"visit\", label: \"Visite\", icon: Calendar },
    { id: \"find-us\", label: \"Punti Vendita\", icon: MapPin },
    { id: \"settings\", label: \"Impostazioni\", icon: Settings },
  ];

  return (
    <div className=\"min-h-screen bg-noir text-white font-sans selection:bg-primary selection:text-noir p-8 md:p-12 lg:p-24\">
      <header className=\"max-w-4xl flex items-center justify-between mb-16\">
        <div className=\"flex items-center gap-6\">
          <div className=\"w-12 h-12 bg-primary flex items-center justify-center rounded-sm\">
            <Settings className=\"text-noir w-6 h-6\" />
          </div>
          <div>
            <h1 className=\"font-heading text-3xl font-black uppercase tracking-tighter\">Control Room</h1>
            <p className=\"font-heading text-[10px] tracking-[0.5em] text-white/40 uppercase font-bold\">Murgia Liquori CMS v1.0</p>
          </div>
        </div>

        <div className=\"flex items-center gap-4\">
          <button 
            onClick={handleSave}
            disabled={saving}
            className=\"flex items-center gap-2 px-6 py-3 bg-white text-noir hover:bg-primary transition-all uppercase font-heading text-[10px] tracking-widest font-black disabled:opacity-50\"
          >
            {saving ? \"Salvataggio...\" : <><Save className=\"w-4 h-4\" /> Salva Cambiamenti</>}
          </button>
          <button 
            onClick={logout}
            className=\"p-3 border border-white/10 hover:border-white/40 transition-colors\"
          >
            <LogOut className=\"w-5 h-5 text-white/40\" />
          </button>
        </div>
      </header>

      <nav className=\"flex gap-8 mb-16 border-b border-white/5\">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 pb-6 font-heading text-[10px] tracking-[0.3em] uppercase font-bold transition-all relative ${
              activeTab === tab.id ? 'text-primary' : 'text-white/20 hover:text-white/60'
            }`}
          >
            <tab.icon className=\"w-4 h-4\" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId=\"activeTab\"
                className=\"absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(202,152,82,0.5)]\" 
              />
            )}
          </button>
        ))}
      </nav>

      <main className=\"max-w-4xl py-12\">
        <AnimatePresence mode=\"wait\">
          {activeTab === \"promo\" && (
            <motion.section
              key=\"promo\"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className=\"space-y-12\"
            >
              <div className=\"flex items-center justify-between border-b border-white/10 pb-8\">
                <div className=\"space-y-1\">
                  <h2 className=\"font-heading text-2xl font-bold text-primary uppercase tracking-tight\">Promozione</h2>
                  <p className=\"font-heading text-[10px] tracking-widest text-white/40 uppercase\">Configura il banner di sconto</p>
                </div>
                <Switch
                  active={config.promo.active}
                  onChange={(val) => setConfig({ ...config, promo: { ...config.promo, active: val } })}
                />
              </div>

              <div className=\"grid grid-cols-1 md:grid-cols-2 gap-16\">
                <div className=\"space-y-8\">
                  <div className=\"space-y-2\">
                    <label className=\"font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold flex items-center gap-2\">
                      <Tag className=\"w-3 h-3\" /> Codice Voucher
                    </label>
                    <input
                      type=\"text\"
                      value={config.promo.code}
                      onChange={(e) => setConfig({ ...config, promo: { ...config.promo, code: e.target.value.toUpperCase() } })}
                      className=\"w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-lg text-white focus:border-primary outline-none transition-colors\"
                      placeholder=\"ES: MURGIA10\"
                    />
                  </div>
                  <div className=\"space-y-2\">
                    <label className=\"font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold\">Sconto (%)</label>
                    <input
                      type=\"number\"
                      value={config.promo.discount}
                      onChange={(e) => setConfig({ ...config, promo: { ...config.promo, discount: parseInt(e.target.value) } })}
                      className=\"w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-lg text-white focus:border-primary outline-none transition-colors\"
                    />
                  </div>
                </div>

                <div className=\"space-y-8\">
                  <div className=\"space-y-4\">
                    <label className=\"font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold flex items-center gap-2\">
                      <Calendar className=\"w-3 h-3\" /> Data Scadenza
                    </label>

                    <div className=\"relative\">
                      <button
                        onClick={() => setShowPromoCalendar(!showPromoCalendar)}
                        className=\"w-full flex items-center justify-between bg-white/5 border-b-2 border-white/10 p-4 font-sans text-lg hover:border-primary transition-colors text-left\"
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
                            className=\"absolute top-full left-0 z-50 mt-4 shadow-2xl\"
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
              <div className=\"mt-16 p-8 bg-white/[0.03] border border-white/5 rounded-sm space-y-12\">
                <div className=\"space-y-1\">
                  <h3 className=\"font-heading text-lg font-bold text-primary uppercase tracking-tight\">Testi Localizzati</h3>
                  <p className=\"font-heading text-[9px] tracking-widest text-white/40 uppercase\">Personalizza i messaggi del banner per ogni lingua</p>
                </div>

                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-16\">
                  {['it', 'en'].map((lang) => (
                    <div key={`promo-lang-${lang}`} className=\"space-y-8\">
                      <h4 className=\"font-heading text-xs tracking-[0.4em] text-primary uppercase font-bold opacity-60\">
                        Versione {lang.toUpperCase()}
                      </h4>

                      <div className=\"space-y-4\">
                        <div className=\"space-y-2\">
                          <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold\">Descrizione Breve</label>
                          <input
                            type=\"text\"
                            value={config.promo.texts?.[lang]?.description || \"\"}
                            onChange={(e) => {
                              const newTexts = { ...config.promo.texts };
                              newTexts[lang] = { ...newTexts[lang], description: e.target.value.toUpperCase() };
                              setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                            }}
                            className=\"w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase\"
                          />
                        </div>

                        <div className=\"space-y-2\">
                          <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold\">Descrizione Estesa</label>
                          <textarea
                            value={config.promo.texts?.[lang]?.fullDescription || \"\"}
                            onChange={(e) => {
                              const newTexts = { ...config.promo.texts };
                              newTexts[lang] = { ...newTexts[lang], fullDescription: e.target.value.toUpperCase() };
                              setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                            }}
                            className=\"w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase h-20 resize-none\"
                          />
                        </div>

                        <div className=\"grid grid-cols-2 gap-4\">
                          <div className=\"space-y-2\">
                            <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold\">Testo CTA</label>
                            <input
                              type=\"text\"
                              value={config.promo.texts?.[lang]?.cta || \"\"}
                              onChange={(e) => {
                                const newTexts = { ...config.promo.texts };
                                newTexts[lang] = { ...newTexts[lang], cta: e.target.value.toUpperCase() };
                                setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                              }}
                              className=\"w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase\"
                            />
                          </div>
                          <div className=\"space-y-2\">
                            <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold\">Messaggio Successo</label>
                            <input
                              type=\"text\"
                              value={config.promo.texts?.[lang]?.successMsg || \"\"}
                              onChange={(e) => {
                                const newTexts = { ...config.promo.texts };
                                newTexts[lang] = { ...newTexts[lang], successMsg: e.target.value.toUpperCase() };
                                setConfig({ ...config, promo: { ...config.promo, texts: newTexts } });
                              }}
                              className=\"w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase\"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === \"visit\" && (
            <motion.section
              key=\"visit\"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className=\"space-y-12\"
            >
              <div className=\"flex items-center justify-between border-b border-white/10 pb-8\">
                <div className=\"space-y-1\">
                  <h2 className=\"font-heading text-2xl font-bold text-primary uppercase tracking-tight\">Visit Us</h2>
                  <p className=\"font-heading text-[10px] tracking-widest text-white/40 uppercase\">Pianificazione Prossima Visita</p>
                </div>
                <Switch
                  active={config.visits?.[0]?.active !== false}
                  onChange={(val) => {
                    const newVisits = [...(config.visits || [])];
                    if (!newVisits[0]) newVisits[0] = { date: \"2024-05-18\", active: true };
                    newVisits[0].active = val;
                    setConfig({ ...config, visits: newVisits });
                  }}
                />
              </div>

              <div className=\"flex flex-col lg:flex-row gap-12 items-start\">
                <div className=\"flex-1 space-y-4\">
                  <label className=\"font-heading text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold flex items-center gap-2\">
                    <Calendar className=\"w-3 h-3\" /> Seleziona Giorno Visita
                  </label>

                  <DatePicker
                    value={config.visits?.[0]?.date || \"2024-05-18\"}
                    onChange={(date) => {
                      const newVisits = [...(config.visits || [])];
                      if (!newVisits[0]) newVisits[0] = { date: \"2024-05-18\", active: true };
                      newVisits[0].date = date;
                      setConfig({ ...config, visits: newVisits });
                    }}
                  />
                </div>

                <div className=\"lg:w-80 p-8 bg-white/[0.05] space-y-4 self-stretch flex flex-col justify-center\">
                  <p className=\"font-heading text-[10px] tracking-widest text-white/40 uppercase\">Anteprima Live:</p>
                  <div className=\"flex flex-col items-center\">
                    <span className=\"font-heading text-sm uppercase font-bold text-primary tracking-widest\">
                      {new Date(config.visits?.[0]?.date || \"2024-05-18\").toLocaleDateString('it-IT', { weekday: 'short' })}
                    </span>
                    <span className=\"font-heading text-7xl uppercase font-black text-white leading-none\">
                      {new Date(config.visits?.[0]?.date || \"2024-05-18\").getDate()}
                    </span>
                    <span className=\"font-heading text-lg uppercase font-bold text-white/40 tracking-[0.4em]\">
                      {new Date(config.visits?.[0]?.date || \"2024-05-18\").toLocaleDateString('it-IT', { month: 'short' })}
                    </span>
                  </div>

                  <div className=\"pt-4 border-t border-white/5\">
                    <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold block mb-2 text-center\">Prezzo Visita (&euro;)</label>
                    <input
                      type=\"number\"
                      value={config.visits?.[0]?.price || 0}
                      onChange={(e) => {
                        const newVisits = [...(config.visits || [])];
                        if (!newVisits[0]) newVisits[0] = { date: \"2024-05-18\", active: true };
                        newVisits[0].price = parseInt(e.target.value);
                        setConfig({ ...config, visits: newVisits });
                      }}
                      className=\"w-full bg-noir border border-white/10 p-2 font-sans text-center text-lg text-primary focus:border-primary outline-none transition-colors\"
                    />
                  </div>
                </div>
              </div>

              {/* Multilingual Contents Ritual (Visit) */}
              <div className=\"mt-16 p-8 bg-white/[0.03] border border-white/5 rounded-sm space-y-12\">
                <div className=\"space-y-1\">
                  <h3 className=\"font-heading text-lg font-bold text-primary uppercase tracking-tight\">Testi Esperienza</h3>
                  <p className=\"font-heading text-[9px] tracking-widest text-white/40 uppercase\">Gestisci i contenuti della sidebar \"Prenota Visita\"</p>
                </div>

                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-16\">
                  {['it', 'en'].map((lang) => (
                    <div key={`visit-lang-${lang}`} className=\"space-y-8\">
                      <h4 className=\"font-heading text-xs tracking-[0.4em] text-primary uppercase font-bold opacity-60\">
                        Versione {lang.toUpperCase()}
                      </h4>

                      <div className=\"space-y-4\">
                        <div className=\"space-y-2\">
                          <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold\">Titolo</label>
                          <input
                            type=\"text\"
                            value={config.visits?.[0]?.texts?.[lang]?.title || \"\"}
                            onChange={(e) => {
                              const newVisits = [...(config.visits || [])];
                              if (!newVisits[0]) newVisits[0] = { date: \"2024-05-18\", active: true };
                              if (!newVisits[0].texts) newVisits[0].texts = { it: { title: \"\", subtitle: \"\", cta: \"\" }, en: { title: \"\", subtitle: \"\", cta: \"\" } };
                              newVisits[0].texts[lang] = { ...newVisits[0].texts[lang], title: e.target.value.toUpperCase() };
                              setConfig({ ...config, visits: newVisits });
                            }}
                            className=\"w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase\"
                          />
                        </div>

                        <div className=\"space-y-2\">
                          <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold\">Sottotitolo</label>
                          <textarea
                            value={config.visits?.[0]?.texts?.[lang]?.subtitle || \"\"}
                            onChange={(e) => {
                              const newVisits = [...(config.visits || [])];
                              if (!newVisits[0]) newVisits[0] = { date: \"2024-05-18\", active: true };
                              if (!newVisits[0].texts) newVisits[0].texts = { it: { title: \"\", subtitle: \"\", cta: \"\" }, en: { title: \"\", subtitle: \"\", cta: \"\" } };
                              newVisits[0].texts[lang] = { ...newVisits[0].texts[lang], subtitle: e.target.value.toUpperCase() };
                              setConfig({ ...config, visits: newVisits });
                            }}
                            className=\"w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase h-20 resize-none\"
                          />
                        </div>

                        <div className=\"space-y-2\">
                          <label className=\"font-heading text-[9px] tracking-widest text-white/20 uppercase font-bold\">Testo CTA</label>
                          <input
                            type=\"text\"
                            value={config.visits?.[0]?.texts?.[lang]?.cta || \"\"}
                            onChange={(e) => {
                              const newVisits = [...(config.visits || [])];
                              if (!newVisits[0]) newVisits[0] = { date: \"2024-05-18\", active: true };
                              if (!newVisits[0].texts) newVisits[0].texts = { it: { title: \"\", subtitle: \"\", cta: \"\" }, en: { title: \"\", subtitle: \"\", cta: \"\" } };
                              newVisits[0].texts[lang] = { ...newVisits[0].texts[lang], cta: e.target.value.toUpperCase() };
                              setConfig({ ...config, visits: newVisits });
                            }}
                            className=\"w-full bg-white/5 border-b border-white/10 p-3 font-sans text-sm text-white focus:border-primary outline-none transition-colors uppercase\"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === \"find-us\" && (
            <motion.section
              key=\"find-us\"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className=\"space-y-12\"
            >
              <LocationsManager config={config} setConfig={setConfig} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
