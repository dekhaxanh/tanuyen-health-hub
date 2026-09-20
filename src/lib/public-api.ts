export type Setting = {
  id?: number;
  ma_cai_dat: string;
  ten_hien_thi: string;
  gia_tri: string;
  loai?: string;
  nhom?: string;
};

export type MenuItem = {
  id: number;
  ten_menu: string;
  link: string;
  parent_id?: number | null;
  vi_tri?: string;
  thu_tu?: number;
  hien_thi?: number;
};

export type Specialty = {
  id: number;
  ten_chuyen_khoa: string;
  slug: string;
  mo_ta?: string;
  hinh_anh?: string;
};

export type Doctor = {
  id: number;
  ten: string;
  slug?: string;
  chuyen_khoa_id?: number;
  ten_chuyen_khoa?: string;
  chuc_danh?: string;
  hoc_vi?: string;
  sdt?: string;
  gia_kham?: number;
  anh?: string;
  hinh_anh?: string;
  mo_ta?: string;
  [key: string]: unknown;
};

export type Service = {
  id: number;
  ten_dich_vu?: string;
  name?: string;
  slug: string;
  mo_ta?: string;
  description?: string;
  anh?: string;
  gia?: number;
};

export type Banner = {
  id: number;
  anh?: string;
  tieu_de?: string;
  mo_ta?: string;
  link?: string;
};

export type News = {
  id: number;
  tieu_de?: string;
  slug?: string;
  noi_dung?: string;
  anh?: string;
  created_at?: string;
};

export type StaffStat = {
  so: number;
  label: string;
};

export type AllData = {
  settings: Setting[];
  menu: MenuItem[];
  chuyenkhoa: Specialty[];
  bacsi: Doctor[];
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export function assetUrl(value?: string) {
  if (!value) return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80";
  if (value.startsWith("http") || value.startsWith("/")) return value.startsWith("/") ? `${API_URL}${value}` : value;
  return `${API_URL}/uploads/${value}`;
}

export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error ?? "Không thể tải dữ liệu");
  return response.json() as Promise<T>;
}

export const getAll = () => fetchJson<AllData>("/api/all");
export const getBanners = () => fetchJson<{ data: Banner[] }>("/api/banner?limit=10");
export const getServices = () => fetchJson<{ data: Service[] }>("/api/dich-vu?limit=100");
export const getNews = () => fetchJson<{ data: News[] }>("/api/tin-tuc?limit=3&sort=created_at&direction=desc");
export const getStaffStats = () => fetchJson<StaffStat[]>("/api/thong-ke-doi-ngu");
export const getSpecialties = () => fetchJson<{ data: Specialty[] }>("/api/chuyen-khoa?limit=100");
export const getDoctors = (search = "") => fetchJson<{ data: Doctor[] }>(`/api/bac-si?limit=100${search ? `&search=${encodeURIComponent(search)}` : ""}`);
export const getDoctor = (id: string) => fetchJson<Doctor>(`/api/bac-si/${id}`);
export const getService = (slug: string) => fetchJson<{ data: Service[] }>(`/api/dich-vu?slug=${encodeURIComponent(slug)}&limit=1`);
export const getSpecialty = (slug: string) => fetchJson<{ data: Specialty[] }>(`/api/chuyen-khoa?slug=${encodeURIComponent(slug)}&limit=1`);
export const getNewsArticle = (slug: string) => fetchJson<{ data: News[] }>(`/api/tin-tuc?slug=${encodeURIComponent(slug)}&limit=1`);
export const createAppointment = (payload: Record<string, unknown>) => fetchJson("/api/dat-lich", { method: "POST", body: JSON.stringify(payload) });
export const createContact = (payload: Record<string, unknown>) => fetchJson("/api/lien-he", { method: "POST", body: JSON.stringify(payload) });

export function settingsMap(settings: Setting[]) {
  return Object.fromEntries(settings.map((setting) => [setting.ma_cai_dat, setting.gia_tri]));
}
