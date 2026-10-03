import re

with open("src/app/control-room/page.tsx", "r") as f:
    content = f.read()

# Add Media section
media_section = """
        {/* Media Ritual (Video & Images) */}
        <motion.section 
          id="media"
          className="pt-24 min-h-[50vh]"
        >
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-8 gap-8">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="font-heading text-3xl font-bold text-primary uppercase tracking-tight">Media & Assets</h2>
                <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Video e Immagini Dinamiche</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              <div className="space-y-2">
                <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold">Homepage Video URL</label>
                <input
                  type="text"
                  value={config.videos?.hero || ""}
                  onChange={(e) => setConfig({ ...config, videos: { ...config.videos, hero: e.target.value } })}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold">Prodotto Giallo Video URL</label>
                <input
                  type="text"
                  value={config.videos?.giallo || ""}
                  onChange={(e) => setConfig({ ...config, videos: { ...config.videos, giallo: e.target.value } })}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold">Prodotto Bianco Video URL</label>
                <input
                  type="text"
                  value={config.videos?.bianco || ""}
                  onChange={(e) => setConfig({ ...config, videos: { ...config.videos, bianco: e.target.value } })}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold">Prodotto Sbagliata Video URL</label>
                <input
                  type="text"
                  value={config.videos?.sbagliata || ""}
                  onChange={(e) => setConfig({ ...config, videos: { ...config.videos, sbagliata: e.target.value } })}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold">La Storia - YouTube ID</label>
                <input
                  type="text"
                  value={config.videos?.storiaYoutubeId || ""}
                  onChange={(e) => setConfig({ ...config, videos: { ...config.videos, storiaYoutubeId: e.target.value } })}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold">La Storia - Immagine Header URL</label>
                <input
                  type="text"
                  value={config.images?.storiaHero || ""}
                  onChange={(e) => setConfig({ ...config, images: { ...config.images, storiaHero: e.target.value } })}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-heading text-[10px] tracking-widest text-white/40 uppercase font-bold">Laboratorio - Immagine Preparazione URL</label>
                <input
                  type="text"
                  value={config.images?.preparazioneLab || ""}
                  onChange={(e) => setConfig({ ...config, images: { ...config.images, preparazioneLab: e.target.value } })}
                  className="w-full bg-white/5 border-b-2 border-white/10 p-4 font-sans text-sm text-white focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Global Save Button */}
"""
content = re.sub(r'(\s*</div>\n\s*\{/\* Global Save Button \*/\})', media_section, content)

with open("src/app/control-room/page.tsx", "w") as f:
    f.write(content)
