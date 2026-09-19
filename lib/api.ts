import { banners, doctors, services, type Banner, type Doctor, type Service } from "./mockData";

export async function getBanners(): Promise<Banner[]> {
  return banners;
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return services.find((service) => service.slug === slug);
}

export async function getDoctors(): Promise<Doctor[]> {
  return doctors;
}
