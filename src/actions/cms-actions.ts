"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

import { redis } from "@/lib/redis";
import { MARKETING_MANIFEST } from "@/manifest/marketing";
import { VISIT_MANIFEST } from "@/manifest/visit";

const CONFIG_PATH = path.join(process.cwd(), "src/data/cms-config.json");
const REDIS_KEY = "murgia_cms_config";

const STATIC_LOCATIONS = [
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

export async function getCMSConfig() {
  noStore();
  console.log("CMS: Attempting to fetch config...");

  // 1. Try Redis first (Production Store)
  if (redis) {
    try {
      const cached = await redis.get(REDIS_KEY);
      if (cached) {
        console.log("CMS: Fetched from Redis successfully");
        let parsed = JSON.parse(cached);
        
        // Migration Ritual (Redis): Transform legacy 'visit' to 'visits' array
        if (parsed.visit && !parsed.visits) {
          console.log("CMS: Migrating legacy 'visit' in Redis");
          parsed.visits = [{
            date: parsed.visit.nextDate || "2026-05-04",
            active: parsed.visit.active ?? true
          }];
          delete parsed.visit;
          await redis.set(REDIS_KEY, JSON.stringify(parsed));
        }

        // Migration Ritual (Redis): Add 'locations' if missing
        if (!parsed.locations) {
          console.log("CMS: Migrating locations to Redis");
          parsed.locations = STATIC_LOCATIONS;
          await redis.set(REDIS_KEY, JSON.stringify(parsed));
        }

        // Migration Ritual (Banner Texts): Add 'texts' to promo if missing
        if (!parsed.promo.texts) {
          console.log("CMS: Migrating promo texts to Redis");
          parsed.promo.texts = {
            it: { ...MARKETING_MANIFEST.promo.it },
            en: { ...MARKETING_MANIFEST.promo.en }
          };
          await redis.set(REDIS_KEY, JSON.stringify(parsed));
        }

        // Migration Ritual (Visit Texts): Add 'texts' and 'price' to visits if missing
        if (parsed.visits?.[0] && !parsed.visits[0].texts) {
          console.log("CMS: Migrating visit texts and price to Redis");
          parsed.visits[0].texts = {
            it: { title: VISIT_MANIFEST.it.title, subtitle: VISIT_MANIFEST.it.subtitle, cta: VISIT_MANIFEST.it.cta },
            en: { title: VISIT_MANIFEST.en.title, subtitle: VISIT_MANIFEST.en.subtitle, cta: VISIT_MANIFEST.en.cta }
          };
          parsed.visits[0].price = VISIT_MANIFEST.price;
          await redis.set(REDIS_KEY, JSON.stringify(parsed));
        }
        
        return parsed;
      }
      console.log("CMS: Redis key empty, falling back to FS");
    } catch (e) {
      console.error("CMS: Redis Read Failed:", e);
    }
  }

  // 2. Fallback to Filesystem (Local Prototype)
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    let parsed = JSON.parse(data);
    
    // Migration Ritual: Transform legacy 'visit' to 'visits' array
    if (parsed.visit && !parsed.visits) {
      parsed.visits = [{
        date: parsed.visit.nextDate || "2026-05-04",
        active: parsed.visit.active ?? true
      }];
      delete parsed.visit;
    }

    // Migration Ritual: Add 'locations' if missing
    if (!parsed.locations) {
      parsed.locations = STATIC_LOCATIONS;
    }

    // Seed Redis if it's empty but we have local data
    if (redis && parsed) {
      await redis.set(REDIS_KEY, JSON.stringify(parsed));
    }
    
    return parsed;
  } catch (error) {
    console.error("Failed to read CMS config:", error);
    return {
      promo: { 
        active: true, 
        code: "MURGIA1882", 
        discount: 10, 
        expiryDate: "2026-05-31",
        texts: {
          it: { ...MARKETING_MANIFEST.promo.it },
          en: { ...MARKETING_MANIFEST.promo.en }
        }
      },
      visits: [{ 
        active: true, 
        date: "2026-05-04",
        texts: {
          it: { title: VISIT_MANIFEST.it.title, subtitle: VISIT_MANIFEST.it.subtitle, cta: VISIT_MANIFEST.it.cta },
          en: { title: VISIT_MANIFEST.en.title, subtitle: VISIT_MANIFEST.en.subtitle, cta: VISIT_MANIFEST.en.cta }
        },
        price: VISIT_MANIFEST.price
      }],
      locations: STATIC_LOCATIONS
    };
  }
}

export async function updateCMSConfig(newData: any) {
  noStore();
  console.log("CMS: Attempting to update config...");
  try {
    // 1. Update Redis
    if (redis) {
      await redis.set(REDIS_KEY, JSON.stringify(newData));
      console.log("CMS: Redis update successful");
    }

    // 2. Update Local (for Dev Consistency)
    try {
      await fs.writeFile(CONFIG_PATH, JSON.stringify(newData, null, 2), "utf-8");
      console.log("CMS: Local FS update successful");
    } catch (e) {
      console.warn("CMS: Local FS Sync skipped (Production):", e);
    }

    revalidatePath("/");
    revalidatePath("/visit-us");
    revalidatePath("/control-room");
    return { success: true };
  } catch (error) {
    console.error("Failed to update CMS config:", error);
    return { success: false, error: "Alchemical Sync Failed" };
  }
}

// Simple Static Auth Logic
export async function authenticate(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username?.toString().toLowerCase() === "sandrone" && password === "tipiacelaminchia") {
    // In a real app, set a secure cookie here. 
    // For this prototype, we'll return success.
    return { success: true };
  }
  
  return { success: false, error: "Credenziali Invalide" };
}
