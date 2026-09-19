# Tân Uyên Health Hub

Tạo website Bệnh Viện Đa Khoa Châu Thành Nam Tân Uyên bằng Next.js 14, TypeScript, Tailwind CSS, shadcn/ui.

YÊU CẦU BẮT BUỘC VỀ CODE (RẤT QUAN TRỌNG):
1. KHÔNG DÙNG SUPABASE, KHÔNG DÙNG PRISMA.
2. Tạo thư mục /lib/ chứa 2 file:
   - /lib/mockData.ts: chứa dữ liệu giả mẫu cho banners, services, doctors.
   - /lib/api.ts: chứa các hàm async getBanners(), getServices(), getDoctors(). Hiện tại các hàm này chỉ return dữ liệu từ mockData.ts. Tôi sẽ đổi sang gọi API MySQL sau.
3. Code component sạch, dễ chuyển sang MySQL.

YÊU CẦU GIAO DIỆN - CHỈ LÀM TRANG CHỦ TRƯỚC:
- Header: Logo BV, Menu (Trang chủ, Dịch vụ, Bác sĩ), Nút Đặt lịch khám màu xanh dương đậm nổi bật.
- Hero Banner: Slider 2-3 ảnh, có chữ "Chăm sóc sức khỏe tận tâm" và nút Đặt lịch ngay.
- Section 1 - Dịch vụ nổi bật: Hiển thị 6 dịch vụ từ hàm getServices(), dạng card có icon, tên, mô tả ngắn.
- Section 2 - Đội ngũ bác sĩ: Hiển thị 4 bác sĩ từ hàm getDoctors(), có ảnh tròn, tên, chuyên khoa.
- Footer: Địa chỉ Tân Uyên, Bình Dương, Hotline, Giờ làm việc.
- Giao diện hiện đại, màu chủ đạo xanh dương đậm y tế #0E6FFF, trắng, xanh lá đậm, responsive mobile.

Chỉ làm trang chủ và 2 section trên trước, không làm các trang khác.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/80a73b55-a90a-4bb7-be28-5cf7de14fd1a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
