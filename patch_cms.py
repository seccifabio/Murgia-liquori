import re

with open("src/actions/cms-actions.ts", "r") as f:
    content = f.read()

# Add migration to Redis block
migration_code = """
        // Migration Ritual (Email): Add 'email' if missing
        if (!parsed.email) {
          console.log("CMS: Migrating email templates to Redis");
          parsed.email = MARKETING_MANIFEST.email;
          await redis.set(REDIS_KEY, JSON.stringify(parsed));
        }
        
        // Migration Ritual (Videos & Images)
        let needsSave = false;
        if (!parsed.videos) {
          parsed.videos = { hero: "/videos/hero.mp4", giallo: "/videos/giallo_product.mp4", bianco: "/videos/bianco.mp4", sbagliata: "/videos/sbagliata.mp4", storiaYoutubeId: "TpAl52rlf4s" };
          needsSave = true;
        }
        if (!parsed.images) {
          parsed.images = { storiaHero: "/images/storia/storia_origins_1882_1775937746086.png", preparazioneLab: "/images/storia/shipping_ritual_lab_preparing.png" };
          needsSave = true;
        }
        if (needsSave) {
          await redis.set(REDIS_KEY, JSON.stringify(parsed));
        }
"""
content = re.sub(r'(\s*// Migration Ritual \(Email\): Add \'email\' if missing.*?await redis\.set.*?})', migration_code, content, flags=re.DOTALL)


# Add migration to FS block
fs_migration = """
    // Migration Ritual: Add 'locations' if missing
    if (!parsed.locations) {
      parsed.locations = STATIC_LOCATIONS;
    }
    
    // Migration Ritual (Videos & Images)
    if (!parsed.videos) {
      parsed.videos = { hero: "/videos/hero.mp4", giallo: "/videos/giallo_product.mp4", bianco: "/videos/bianco.mp4", sbagliata: "/videos/sbagliata.mp4", storiaYoutubeId: "TpAl52rlf4s" };
    }
    if (!parsed.images) {
      parsed.images = { storiaHero: "/images/storia/storia_origins_1882_1775937746086.png", preparazioneLab: "/images/storia/shipping_ritual_lab_preparing.png" };
    }
"""
content = re.sub(r'(\s*// Migration Ritual: Add \'locations\' if missing.*?parsed\.locations = STATIC_LOCATIONS;\n\s*})', fs_migration, content, flags=re.DOTALL)


# Add to fallback object
fallback = """      email: MARKETING_MANIFEST.email,
      locations: STATIC_LOCATIONS,
      videos: { hero: "/videos/hero.mp4", giallo: "/videos/giallo_product.mp4", bianco: "/videos/bianco.mp4", sbagliata: "/videos/sbagliata.mp4", storiaYoutubeId: "TpAl52rlf4s" },
      images: { storiaHero: "/images/storia/storia_origins_1882_1775937746086.png", preparazioneLab: "/images/storia/shipping_ritual_lab_preparing.png" }
    };"""
content = re.sub(r'(\s*email: MARKETING_MANIFEST\.email,\n\s*locations: STATIC_LOCATIONS\n\s*};)', fallback, content)

with open("src/actions/cms-actions.ts", "w") as f:
    f.write(content)
