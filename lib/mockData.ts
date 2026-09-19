import heroOne from "../src/assets/hospital-hero-01.jpg";
import heroTwo from "../src/assets/hospital-hero-02.jpg";
import heroThree from "../src/assets/hospital-hero-03.jpg";
import doctorsGrid from "../src/assets/doctors-grid.jpg";

export type Banner = {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

export type Service = {
  id: number;
  icon: "heart" | "baby" | "bone" | "scan" | "flask" | "ambulance";
  name: string;
  description: string;
};

export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  image: string;
  imagePosition: string;
};

export const banners: Banner[] = [
  {
    id: 1,
    image: heroOne,
    eyebrow: "Tận tâm từ những điều nhỏ nhất",
    title: "Chăm sóc sức khỏe tận tâm",
    description: "Đồng hành cùng bạn và gia đình bằng chuyên môn vững vàng, quy trình an toàn và sự thấu hiểu.",
  },
  {
    id: 2,
    image: heroTwo,
    eyebrow: "Chăm sóc toàn diện cho mọi gia đình",
    title: "An tâm trong từng lần thăm khám",
    description: "Đội ngũ y bác sĩ giàu kinh nghiệm, luôn lắng nghe để đưa ra hướng chăm sóc phù hợp nhất.",
  },
  {
    id: 3,
    image: heroThree,
    eyebrow: "Chẩn đoán chính xác · Điều trị hiệu quả",
    title: "Công nghệ hiện đại vì sức khỏe bạn",
    description: "Hệ thống thiết bị đồng bộ hỗ trợ chẩn đoán nhanh chóng, chính xác và an toàn.",
  },
];

export const services: Service[] = [
  { id: 1, icon: "heart", name: "Khám Nội tổng quát", description: "Tầm soát, chẩn đoán và điều trị các bệnh lý nội khoa thường gặp." },
  { id: 2, icon: "baby", name: "Nhi khoa", description: "Chăm sóc sức khỏe toàn diện cho trẻ từ sơ sinh đến tuổi trưởng thành." },
  { id: 3, icon: "bone", name: "Cơ xương khớp", description: "Điều trị đau khớp, chấn thương và phục hồi chức năng vận động." },
  { id: 4, icon: "scan", name: "Chẩn đoán hình ảnh", description: "Siêu âm, X-quang và các kỹ thuật chẩn đoán với thiết bị hiện đại." },
  { id: 5, icon: "flask", name: "Xét nghiệm", description: "Kết quả nhanh, chính xác với quy trình kiểm soát chất lượng nghiêm ngặt." },
  { id: 6, icon: "ambulance", name: "Cấp cứu 24/7", description: "Tiếp nhận và xử trí kịp thời các trường hợp cấp cứu suốt ngày đêm." },
];

export const doctors: Doctor[] = [
  { id: 1, name: "BS.CKI Nguyễn Thị Minh Anh", specialty: "Nội tổng quát", image: doctorsGrid, imagePosition: "0% 0%" },
  { id: 2, name: "BS.CKII Trần Quốc Hưng", specialty: "Tim mạch", image: doctorsGrid, imagePosition: "100% 0%" },
  { id: 3, name: "ThS.BS Lê Hoàng Nam", specialty: "Chấn thương chỉnh hình", image: doctorsGrid, imagePosition: "0% 100%" },
  { id: 4, name: "BS.CKI Phạm Ngọc Mai", specialty: "Nhi khoa", image: doctorsGrid, imagePosition: "100% 100%" },
];
