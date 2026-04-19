/**
 * API Base URL – ใช้ที่เดียวทั้งโปรเจกต์
 * - รัน local (npm run dev): ใช้ localhost:4000 อัตโนมัติ
 * - Build/Deploy: อ่านจาก .env (VITE_API_BASE_URL) หรือใช้ default
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:4000' : 'https://personal-block-server.vercel.app')
