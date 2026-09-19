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
  slug: string;
  icon: "heart" | "baby" | "bone" | "scan" | "flask" | "ambulance";
  name: string;
  description: string;
  longDescription: string;
  benefits: string[];
  schedule: string;
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
  {
    id: 1,
    slug: "kham-noi-tong-quat",
    icon: "heart",
    name: "Khám Nội tổng quát",
    description: "Tầm soát, chẩn đoán và điều trị các bệnh lý nội khoa thường gặp.",
    longDescription: "Khoa Nội tổng quát tiếp nhận khám, tầm soát và điều trị các bệnh lý nội khoa phổ biến như tim mạch, hô hấp, tiêu hóa, tiểu đường và tăng huyết áp. Bác sĩ trực tiếp thăm khám, tư vấn lối sống và xây dựng phác đồ điều trị phù hợp cho từng người bệnh.",
    benefits: ["Khám sức khỏe tổng quát định kỳ", "Quản lý bệnh mạn tính lâu dài", "Tư vấn dinh dưỡng và lối sống", "Phối hợp chuyên khoa khi cần thiết"],
    schedule: "Thứ 2 – Thứ 7, 07:00 – 17:00",
  },
  {
    id: 2,
    slug: "nhi-khoa",
    icon: "baby",
    name: "Nhi khoa",
    description: "Chăm sóc sức khỏe toàn diện cho trẻ từ sơ sinh đến tuổi trưởng thành.",
    longDescription: "Khoa Nhi chăm sóc sức khỏe toàn diện cho trẻ em, từ khám bệnh thường gặp, theo dõi tăng trưởng đến tư vấn tiêm chủng. Không gian khám thân thiện giúp trẻ an tâm, phụ huynh được giải đáp kỹ mọi thắc mắc.",
    benefits: ["Khám và điều trị bệnh thường gặp ở trẻ", "Theo dõi tăng trưởng và dinh dưỡng", "Tư vấn lịch tiêm chủng đầy đủ", "Khám sức khỏe trước khi nhập học"],
    schedule: "Thứ 2 – Thứ 7, 07:00 – 17:00",
  },
  {
    id: 3,
    slug: "co-xuong-khop",
    icon: "bone",
    name: "Cơ xương khớp",
    description: "Điều trị đau khớp, chấn thương và phục hồi chức năng vận động.",
    longDescription: "Chuyên khoa Cơ xương khớp điều trị các bệnh lý đau khớp, thoái hóa, chấn thương thể thao và lao động. Người bệnh được tư vấn phục hồi chức năng để sớm trở lại sinh hoạt và vận động bình thường.",
    benefits: ["Điều trị đau khớp, thoái hóa khớp", "Xử trí chấn thương thể thao, lao động", "Phục hồi chức năng sau chấn thương", "Tư vấn phòng ngừa tái phát"],
    schedule: "Thứ 2 – Thứ 7, 07:00 – 17:00",
  },
  {
    id: 4,
    slug: "chan-doan-hinh-anh",
    icon: "scan",
    name: "Chẩn đoán hình ảnh",
    description: "Siêu âm, X-quang và các kỹ thuật chẩn đoán với thiết bị hiện đại.",
    longDescription: "Khoa Chẩn đoán hình ảnh trang bị hệ thống siêu âm, X-quang kỹ thuật số hiện đại, hỗ trợ bác sĩ điều trị chẩn đoán nhanh và chính xác. Kết quả được trả trong ngày với quy trình kiểm soát chất lượng chặt chẽ.",
    benefits: ["Siêu âm tổng quát và siêu âm chuyên sâu", "X-quang kỹ thuật số liều thấp", "Trả kết quả nhanh trong ngày", "Bác sĩ chẩn đoán giàu kinh nghiệm"],
    schedule: "Thứ 2 – Thứ 7, 07:00 – 17:00",
  },
  {
    id: 5,
    slug: "xet-nghiem",
    icon: "flask",
    name: "Xét nghiệm",
    description: "Kết quả nhanh, chính xác với quy trình kiểm soát chất lượng nghiêm ngặt.",
    longDescription: "Phòng Xét nghiệm thực hiện đa dạng các chỉ số huyết học, sinh hóa, miễn dịch phục vụ chẩn đoán và theo dõi điều trị. Quy trình lấy mẫu nhẹ nhàng, kết quả chính xác và được bảo mật tuyệt đối.",
    benefits: ["Xét nghiệm máu tổng quát", "Sinh hóa, đường huyết, mỡ máu", "Tầm soát viêm gan, miễn dịch", "Trả kết quả trực tiếp và tra cứu nhanh"],
    schedule: "Thứ 2 – Thứ 7, 07:00 – 17:00",
  },
  {
    id: 6,
    slug: "cap-cuu-24-7",
    icon: "ambulance",
    name: "Cấp cứu 24/7",
    description: "Tiếp nhận và xử trí kịp thời các trường hợp cấp cứu suốt ngày đêm.",
    longDescription: "Khoa Cấp cứu trực 24/7, sẵn sàng tiếp nhận và xử trí các trường hợp nguy kịch, tai nạn và cấp cứu đột ngột. Đội ngũ trực chuyên môn cao cùng phương tiện cấp cứu luôn trong tình trạng sẵn sàng.",
    benefits: ["Trực cấp cứu suốt ngày đêm", "Sơ cấp cứu và vận chuyển người bệnh", "Hồi sức tích cực kịp thời", "Phối hợp chuyển tuyến khi cần"],
    schedule: "Trực 24/7, kể cả lễ Tết",
  },
];

export const doctors: Doctor[] = [
  { id: 1, name: "BS.CKI Nguyễn Thị Minh Anh", specialty: "Nội tổng quát", image: doctorsGrid, imagePosition: "0% 0%" },
  { id: 2, name: "BS.CKII Trần Quốc Hưng", specialty: "Tim mạch", image: doctorsGrid, imagePosition: "100% 0%" },
  { id: 3, name: "ThS.BS Lê Hoàng Nam", specialty: "Chấn thương chỉnh hình", image: doctorsGrid, imagePosition: "0% 100%" },
  { id: 4, name: "BS.CKI Phạm Ngọc Mai", specialty: "Nhi khoa", image: doctorsGrid, imagePosition: "100% 100%" },
];
