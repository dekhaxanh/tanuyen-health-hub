# Trang chủ Bệnh Viện Đa Khoa Châu Thành Nam Tân Uyên

## Phạm vi
- Chỉ xây dựng trang chủ, không tạo các trang con.
- Header gồm logo, menu cuộn tới nội dung và nút đặt lịch nổi bật.
- Banner ảnh chuyển tự động với thông điệp “Chăm sóc sức khỏe tận tâm” và nút hành động.
- Khu vực 6 dịch vụ nổi bật lấy từ `getServices()`.
- Khu vực 4 bác sĩ lấy từ `getDoctors()`.
- Footer hiển thị địa chỉ, hotline và giờ làm việc.

## Hình ảnh và phong cách
- Dùng ảnh bệnh viện và chân dung bác sĩ đồng bộ, lưu trực tiếp trong dự án.
- Bảng màu xanh dương y tế `#0E6FFF`, trắng và xanh lá đậm; bố cục sáng, rõ ràng, chuyên nghiệp.
- Tối ưu cả màn hình máy tính và điện thoại, có menu mobile và chuyển động nhẹ.

## Kỹ thuật
- Giữ nền tảng hiện tại của dự án, dùng TypeScript và Tailwind CSS.
- Tạo `lib/mockData.ts` cho banners, services, doctors và `lib/api.ts` cho các hàm async `getBanners()`, `getServices()`, `getDoctors()`.
- Trang chỉ gọi qua lớp API để sau này có thể thay nguồn dữ liệu bằng API MySQL mà không đổi giao diện.
- Thêm metadata riêng cho trang chủ và kiểm tra hiển thị thực tế sau khi hoàn tất.
