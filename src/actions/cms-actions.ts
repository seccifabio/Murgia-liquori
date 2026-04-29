"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

import { redis } from "@/lib/redis";

const CONFIG_PATH = path.join(process.cwd(), "src/data/cms-config.json");
const REDIS_KEY = "murgia_cms_config";

export async function getCMSConfig() {
  noStore();
  console.log("CMS: Attempting to fetch config...");

  // 1. Try Redis first (Production Store)
  if (redis) {
    try {
      const cached = await redis.get(REDIS_KEY);
      if (cached) {
        console.log("CMS: Fetched from Redis successfully");
        return JSON.parse(cached);
      }
      console.log("CMS: Redis key empty, falling back to FS");
    } catch (e) {
      console.error("CMS: Redis Read Failed:", e);
    }
  } else {
    console.warn("CMS: Redis client not initialized (check REDIS_URL)");
  }

  // 2. Fallback to Filesystem (Local Prototype)
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    const parsed = JSON.parse(data);
    
    // Seed Redis if it's empty but we have local data
    if (redis && parsed) {
      await redis.set(REDIS_KEY, JSON.stringify(parsed));
    }
    
    return parsed;
  } catch (error) {
    console.error("Failed to read CMS config:", error);
    return {
      promo: { active: true, code: "MURGIA1882", discount: 10, expiryDate: "2026-05-31" },
      visit: { active: true, nextDate: "2026-05-04", displayMonth: "Maggio" }
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
