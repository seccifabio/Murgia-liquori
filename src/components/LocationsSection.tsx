"use client";

import { useState, useMemo, useEffect } from "react";
import { MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { sendPartnerRequest } from "@/app/actions/partner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

const LOCATIONS = [
  { name: "LA BOTTEGA DI TOMMY", city: "Alghero", address: "Via Gilbert Ferret, 76", map: "https://g.page/enoteca-la-bottega-di-tommy?share" },
  { name: "ENOTECA LA CANTINETTA", city: "Assemini", address: "Via Sardegna, 32", map: "https://goo.gl/maps/sXVoMsSrw2dnAFhW6" },
  { name: "PANETTERIA PISCEDDA G.PAOLO", city: "Assemini", address: "Corso America, 15", map: "https://goo.gl/maps/4oFhcmpoKwj1wapp7" },
  { name: "ENOTECA E SAPORI", city: "Cagliari", address: "Via G. Benedetta, 30", map: "https://goo.gl/maps/mnwvQw6rtEMNbWu7A" },
  { name: "ENOTECA CAGLIARITANA", city: "Cagliari", address: "Via Rovereto 8", map: "https://goo.gl/maps/RqEzCjRQM5fChhHfA" },
  { name: "ENOTECA SHARDANA", city: "Cagliari", address: "Via della Pineta, 26", map: "https://goo.gl/maps/LT3zchvqwRAdD9KZ9" },
  { name: "ENOTECA WINE SHOP", city: "Cagliari", address: "Via Sardegna, 82", map: "https://goo.gl/maps/H2mjSoDMsPTUkSUV8" },
  { name: "LIQUORVINI S.R.L.", city: "Cagliari", address: "Viale Trieste, 51", map: "https://goo.gl/maps/kVkB5xkA182f6gPB6" },
  { name: "BALENTES", city: "Carbonia", address: "Corso Iglesias, 34", map: "https://goo.gl/maps/DNKHWZj6YNswJjJw7" },
  { name: "BACCO DI SARDEGNA", city: "Domusnovas", address: "Via della Libertà, 8", map: "https://goo.gl/maps/aDp5tFHs6w9AaYmj6" },
  { name: "ENOTECA IL CHICCO D’UVA", city: "Domusnovas", address: "Via S. Pellico, 18", map: "https://g.page/EnotecaIlChiccoDuva?share" },
  { name: "LA VECCHIA BOTTE", city: "Guspini", address: "Via Gramsci, 42", map: "https://goo.gl/maps/yhiL5krk29a9YpZz9" },
  { name: "L’OASI DI BACCO", city: "Gonnosfanadiga", address: "Via Cagliari, 3", map: "https://goo.gl/maps/BGCFeTnbzVTc5m2q7" },
  { name: "PANETTERIA GARAU", city: "Macomer", address: "Viale A. Gramsci, 12", map: "https://goo.gl/maps/dhAtE2e6R8bM4mvR6" },
  { name: "NON SOLO CAFFE’", city: "Mogoro", address: "Via Gramsci, 291", map: "https://goo.gl/maps/Z8S1fvevykNE2gbS7" },
  { name: "SAS TAPAS", city: "Olbia", address: "Corso Umberto I, 17", map: "https://goo.gl/maps/uovzXjDZLUdtXBxN8" },
  { name: "VINERIA ENOROSEI", city: "Orosei", address: "Via San Giacomo, 52", map: "https://g.page/vineria-enorosei?share" },
  { name: "LA BOTTIGLIERIA", city: "Quartu Sant'Elena", address: "via Dante, 23", map: "https://goo.gl/maps/M2bptfruAbBxGhYP7" },
  { name: "PANIFICIO CALABRO’", city: "Sant’Antioco", address: "Corso Vittorio Emanuele, 138", map: "https://goo.gl/maps/uSJQYBkKQpWp1rnE8" },
  { name: "TIPICO DA GOMEZ", city: "San Gavino", address: "Via Dante 39A", map: "https://goo.gl/maps/as6EL5uKAg8JC4UaA" },
  { name: "ALIMENTARI MANGATIA", city: "Sassari", address: "Via Università, 68", map: "https://goo.gl/maps/2A4mJyef8YQPm5zT7" },
  { name: "CANTINA 7 BOTTI", city: "Sassari", address: "Via Sicilia, 27", map: "https://goo.gl/maps/gT8PkRZpu28iPebH9" },
  { name: "ENOTECA PAOLI", city: "Sassari", address: "Via Pasquale Paoli, 49", map: "https://goo.gl/maps/6PQ394Pm3vivAMK58" },
  { name: "BARRIQUE", city: "Serramanna", address: "Via Roma, 13", map: "https://goo.gl/maps/3i2u26PBAmD6AwbB6" },
  { name: "VINUM DI BOASSA", city: "Sinnai", address: "Via Giardini, 20", map: "https://goo.gl/maps/8ztYgZK7V1jATYz2A" },
  { name: "MACELLERIA DI CONGIA FRANCESCO", city: "Vallermosa", address: "Via I Maggio, 26", map: "https://goo.gl/maps/BqSoSCKV2XJGiQda8" },
  { name: "PANIFICIO FRANCESCO CINISU", city: "Villacidro", address: "Via Nazionale, 193", map: "https://goo.gl/maps/VHSFaywGsfwS7KBe9" },
  { name: "L’ORTOFRUTTA di PONTIS D.", city: "Villacidro", address: "Via Parrocchia, 24/B", map: "https://goo.gl/maps/9nGHWL11oYBHCKBd6" },
  { name: "ENOTECA LA VECCHIA BOTTE", city: "Villacidro", address: "Via Nazionale, 213", map: "https://goo.gl/maps/ARDwBhRZj6pm8r6GA" },
  { name: "TABACCHINO SALIS", city: "Villacidro", address: "Via Nazionale, 240", map: "https://goo.gl/maps/NQih3KcVENTJiSARA" },
  { name: "DA GIOVANNA E VITTORIO", city: "Villacidro", address: "Via Roma, 109", map: "https://g.page/ristorante-pizzeria-da-giovanna?share" },
  { name: "ALIMENTARI PIRAS", city: "Uras", address: "Via A. Gramsci, 64", map: "https://goo.gl/maps/ECfvGV1Yk2sb9w4w5" },
];

export default function LocationsSection() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [activeCity, setActiveCity] = useState("Alghero");
  const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false);
  const [shopType, setShopType] = useState("bar");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const cities = useMemo(() => Array.from(new Set(LOCATIONS.map(l => l.city))).sort(), []);
  const filtered = LOCATIONS.filter(loc => loc.city === activeCity);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  if (!mounted) return <div className="min-h-screen bg-primary" />;

  const shopTypes = ["bar", "pub", "ristorante", "enoteca", "negozio"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await sendPartnerRequest({ ...formData, shopType });
      setIsSent(true);
      // Reset form after 5 seconds to allow new entry
      setTimeout(() => {
        setIsSent(false);
        setIsPartnerFormOpen(false);
        setFormData({ name: "", city: "", phone: "", email: "", message: "" });
      }, 5000);
    } catch (err: any) {
      setError(err.message || t.common.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="locations-directory"
      className="relative z-[2000] bg-primary pt-40 pb-40 px-6 min-h-screen text-noir isolation-auto"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        
        {/* Header */}
        <motion.header variants={itemVariants} className="mb-20 text-center md:text-left">
          <h2 className="text-noir font-heading text-6xl md:text-9xl uppercase tracking-tighter leading-tight">
            {t.locations.title} <span className="italic block md:inline">{t.locations.titleAccent}</span>
          </h2>
        </motion.header>

        {/* Town Chips Navigation - DESKTOP */}
        <motion.div variants={itemVariants} className="hidden md:flex flex-wrap gap-2 mb-16 justify-start">
          {cities.map((city) => (
            <button
              key={city}
              id={`chip-${city.toLowerCase().replace(" ", "-")}`}
              onClick={() => setActiveCity(city)}
              className={`px-6 py-2 rounded-full border border-noir/10 font-heading text-[10px] tracking-widest uppercase transition-colors pointer-events-auto
                ${activeCity === city 
                  ? "bg-noir border-noir text-primary" 
                  : "bg-transparent text-noir/70 hover:text-noir"
                }`}
            >
              {city}
            </button>
          ))}
        </motion.div>

        {/* Town Dropdown - MOBILE NATIVE INTEGRATION */}
        <motion.div variants={itemVariants} className="block md:hidden mb-12 relative">
          <label className="block text-noir/40 font-heading text-[10px] tracking-[0.3em] uppercase mb-4 ml-1">{t.locations.selectCity}</label>
          <div className="relative">
            <select
              value={activeCity}
              onChange={(e) => setActiveCity(e.target.value)}
              className="w-full bg-transparent border-2 border-noir p-5 pr-12 font-heading text-lg tracking-widest uppercase appearance-none focus:outline-none rounded-none text-noir pointer-events-auto"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-primary text-noir">
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-noir" />
            </div>
          </div>
        </motion.div>

        {/* Location List */}
        <motion.div variants={itemVariants} className="space-y-12">
          {filtered.map((loc, i) => (
            <div 
              key={`${loc.name}-${loc.city}-${i}`}
              className="border-b border-noir/10 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="pointer-events-auto">
                <span className="text-black text-[10px] tracking-[0.3em] font-heading uppercase block mb-2">
                  {loc.city}
                </span>
                <h4 className="text-black font-heading text-2xl md:text-3xl uppercase tracking-tight mb-2 leading-none">
                  {loc.name}
                </h4>
                <p className="text-black text-xs font-body tracking-[0.1em] uppercase">
                  {loc.address}
                </p>
              </div>

              <a 
                href={loc.map} 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 text-black font-heading text-[10px] tracking-[0.2em] uppercase hover:underline transition-all pointer-events-auto"
              >
                {t.locations.viewMap} <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* Partner Sovereign Section - With Conditional Form Overlap */}
      <motion.div 
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full min-h-screen bg-noir flex flex-col items-center justify-center gap-12 text-center z-50 mt-32 relative overflow-hidden py-32"
      >
        <AnimatePresence mode="wait">
          {!isPartnerFormOpen ? (
            <motion.div 
              key="partner-intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12 flex flex-col items-center"
            >
              <div className="space-y-6 max-w-6xl px-6">
                <h3 className="text-primary font-heading text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter leading-[0.85]">
                  {t.locations.partner.title} <br/> <span className="text-white italic">{t.locations.partner.titleAccent}</span>
                </h3>
                <p className="text-white/50 font-body text-base md:text-xl uppercase tracking-[0.3em] max-w-3xl mx-auto leading-relaxed pt-8">
                  {t.locations.partner.description}
                </p>
              </div>
              
              <button 
                onClick={() => setIsPartnerFormOpen(true)}
                className="group relative px-10 py-7 md:px-24 md:py-8 w-[85%] max-w-[300px] md:max-w-none md:w-auto overflow-hidden bg-primary text-black font-heading uppercase text-sm tracking-[0.4em] transition-all transform hover:scale-105 active:scale-95 pointer-events-auto mx-auto md:mx-0"
              >
                <span className="relative z-10">{t.locations.partner.cta}</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="partner-form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl px-6"
            >
              <div className="mb-12 border-b border-white/5 pb-8 space-y-8">
                <button 
                  onClick={() => setIsPartnerFormOpen(false)}
                  className="text-white/40 hover:text-white font-heading text-[10px] tracking-widest uppercase border border-white/10 px-6 py-3 hover:bg-white/5 transition-all block"
                >
                  {t.locations.partner.back}
                </button>
                <h4 className="text-primary font-heading text-4xl uppercase tracking-tighter">{t.locations.partner.formTitle}</h4>
              </div>

              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 flex flex-col items-center gap-6"
                >
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                  <div className="space-y-4">
                    <h4 className="text-white font-heading text-4xl uppercase tracking-tighter">{t.locations.partner.successTitle}</h4>
                    <p className="text-white/40 font-body text-sm uppercase tracking-widest leading-relaxed">
                      {t.locations.partner.successText}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-2">
                    <label className="text-white/60 font-heading text-[10px] tracking-widest uppercase ml-1">{t.locations.partner.fields.name}</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 p-5 font-heading text-white focus:border-primary outline-none transition-all uppercase tracking-widest text-sm" 
                      placeholder={t.locations.partner.fields.placeholderName} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white/60 font-heading text-[10px] tracking-widest uppercase ml-1">{t.locations.partner.fields.city}</label>
                    <input 
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 p-5 font-heading text-white focus:border-primary outline-none transition-all uppercase tracking-widest text-sm" 
                      placeholder={t.locations.partner.fields.placeholderCity} 
                    />
                  </div>

                  <div className="space-y-4 md:col-span-2 py-4">
                    <label className="text-white/60 font-heading text-[10px] tracking-widest uppercase ml-1">{t.locations.partner.fields.type}</label>
                    
                    {/* Desktop Chips */}
                    <div className="hidden md:flex flex-wrap gap-3">
                      {shopTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setShopType(type)}
                          className={`px-6 py-3 border font-heading text-[10px] tracking-widest uppercase transition-all ${
                            shopType === type 
                              ? "bg-primary border-primary text-noir" 
                              : "bg-transparent border-white/20 text-white/60 hover:border-white/40"
                          }`}
                        >
                          {(t.locations.partner.fields.types as any)[type] || type}
                        </button>
                      ))}
                    </div>

                    {/* Mobile Dropdown */}
                    <div className="block md:hidden relative">
                      <select 
                        value={shopType}
                        onChange={(e) => setShopType(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-5 pr-12 font-heading text-white focus:border-primary outline-none transition-all uppercase tracking-widest text-sm appearance-none rounded-none"
                      >
                        {shopTypes.map((type) => (
                          <option key={type} value={type} className="bg-noir text-white">{(t.locations.partner.fields.types as any)[type] || type}</option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-white/40" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 font-heading text-[10px] tracking-widest uppercase ml-1">{t.locations.partner.fields.phone}</label>
                    <input 
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      className="w-full bg-white/5 border border-white/10 p-5 font-heading text-white focus:border-primary outline-none transition-all uppercase tracking-widest text-sm" 
                      placeholder="+39 000 0000000" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 font-heading text-[10px] tracking-widest uppercase ml-1">{t.locations.partner.fields.email}</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 p-5 font-heading text-white focus:border-primary outline-none transition-all uppercase tracking-widest text-sm" 
                      placeholder="EMAIL@PARTNER.IT" 
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-white/60 font-heading text-[10px] tracking-widest uppercase ml-1">{t.locations.partner.fields.message}</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4} 
                      className="w-full bg-white/5 border border-white/10 p-5 font-heading text-white focus:border-primary outline-none transition-all uppercase tracking-widest text-sm resize-none" 
                      placeholder={t.locations.partner.fields.placeholderMessage} 
                    />
                  </div>

                  {error && (
                    <div className="md:col-span-2 text-red-500 font-heading text-[10px] tracking-widest uppercase">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 pt-8 flex justify-center md:justify-start">
                    <button 
                      disabled={isSubmitting}
                      className={`w-[85%] max-w-[300px] md:max-w-none md:w-auto group relative py-7 md:py-8 px-10 md:px-24 overflow-hidden bg-primary text-black font-heading uppercase text-sm tracking-[0.5em] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 ${isSubmitting ? "opacity-70" : ""}`}
                    >
                      <span className="relative z-10 text-xs md:text-sm">
                        {isSubmitting ? t.common.sending : t.locations.partner.fields.submit}
                      </span>
                      {isSubmitting && <Loader2 className="w-5 h-5 animate-spin relative z-10" />}
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!isPartnerFormOpen && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/40">
            <div className="w-20 h-px bg-white/40" />
            <span className="font-heading text-[10px] tracking-[0.8em] uppercase">{t.locations.partner.ritual}</span>
            <div className="w-20 h-px bg-white/40" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
