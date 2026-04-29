"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { authenticate } from "@/actions/cms-actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await authenticate(formData);

    if (result.success) {
      // Mock session for now
      localStorage.setItem("murgia_token", "active_ritual");
      router.push("/control-room");
    } else {
      setError(result.error || "Access Denied");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-noir flex flex-col items-center justify-center p-6 selection:bg-primary selection:text-noir">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="space-y-4 text-center md:text-left">
          <h1 className="font-heading text-6xl md:text-8xl text-white uppercase italic font-black leading-none tracking-tighter">
            CONTROL <br/> <span className="text-primary">ROOM</span>
          </h1>
          <p className="font-heading text-xs tracking-[0.6em] text-white/40 uppercase">Accesso Riservato — Villacidro</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2 group">
              <label className="font-heading text-[10px] tracking-[0.4em] text-primary uppercase font-bold flex items-center gap-2">
                <User className="w-3 h-3" /> username
              </label>
              <input 
                name="username"
                type="text" 
                required
                suppressHydrationWarning={true}
                className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-2xl text-white focus:border-primary outline-none transition-colors uppercase italic font-black"
                placeholder="---"
              />
            </div>
            <div className="space-y-2 group relative">
              <label className="font-heading text-[10px] tracking-[0.4em] text-primary uppercase font-bold flex items-center gap-2">
                <Lock className="w-3 h-3" /> password
              </label>
              <div className="relative">
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  required
                  suppressHydrationWarning={true}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-2xl text-white focus:border-primary outline-none transition-colors italic font-black pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-primary transition-colors p-2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ x: -10 }} 
              animate={{ x: 0 }} 
              className="text-red-500 font-heading text-[10px] tracking-widest uppercase font-bold"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-noir py-6 font-heading text-xl uppercase italic font-black tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
          >
            {loading ? "VERIFICA IN CORSO..." : "INIZIA RITUALE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
