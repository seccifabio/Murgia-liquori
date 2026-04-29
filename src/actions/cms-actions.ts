"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const CONFIG_PATH = path.join(process.cwd(), "src/data/cms-config.json");

export async function getCMSConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read CMS config:", error);
    // Return default state if file missing
    return {
      promo: { active: true, code: "MURGIA1882", discount: 10, expiryDate: "2026-05-31" },
      visit: { active: true, nextDate: "2026-05-04", displayMonth: "Maggio" }
    };
  }
}

export async function updateCMSConfig(newData: any) {
  try {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(newData, null, 2), "utf-8");
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

  if (username === "Sandrone" && password === "tipiacelaminchia") {
    // In a real app, set a secure cookie here. 
    // For this prototype, we'll return success.
    return { success: true };
  }
  
  return { success: false, error: "Credenziali Invalide" };
}
