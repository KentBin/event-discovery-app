export type EventItem = {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  temperature: string;
  category: string;
  description: string;
};

export const events: EventItem[] = [
  {
    id: 1,
    title:
      "Lễ hội Thành Tuyên – Khi Sắc Màu Không Lời Kể...",
    image: "/events/event-1.jpg",
    date: "19–29/09/2026",
    location: "Tuyên Quang",
    temperature: "+34",
    category: "Lễ hội",
    description:
      "Lễ hội Thành Tuyên là một trong những sự kiện văn hóa nổi bật của tỉnh Tuyên Quang, mang đến không khí Trung thu rực rỡ với những mô hình đèn khổng lồ, hoạt động diễu hành và nhiều chương trình nghệ thuật đặc sắc.",
  },
  {
    id: 2,
    title: "Festival Thăng Long - Hà Nội",
    image: "/events/event-2.jpg",
    date: "Dự kiến 11/2026",
    location: "Hà Nội",
    temperature: "+34",
    category: "Lễ hội",
    description:
      "Festival Thăng Long - Hà Nội là không gian tôn vinh những giá trị văn hóa, lịch sử và nghệ thuật của Thủ đô, với nhiều hoạt động biểu diễn, triển lãm và trải nghiệm dành cho người dân và du khách.",
  },
  {
    id: 3,
    title:
      "Hội An Lên Đèn — Một Đêm Phố Cổ Ngập Sắc Màu",
    image: "/events/event-3.jpg",
    date: "Dự kiến 09/2026",
    location: "Đà Nẵng",
    temperature: "+34",
    category: "Lễ hội",
    description:
      "Sự kiện mang đến một không gian lung linh cho phố cổ Hội An với ánh đèn, hoạt động văn hóa truyền thống và những trải nghiệm đặc trưng của một trong những điểm đến di sản nổi tiếng của Việt Nam.",
  },
  {
    id: 4,
    title:
      "Mường Lò Vào Hội — Say Trong Điệu Xòe Tây Bắc",
    image: "/events/event-4.jpg",
    date: "25/09–20/10/2026",
    location: "Lào Cai",
    temperature: "+34",
    category: "Lễ hội",
    description:
      "Lễ hội tái hiện không gian văn hóa đặc sắc của vùng Tây Bắc với những điệu múa truyền thống, âm nhạc dân gian và các hoạt động cộng đồng mang đậm bản sắc văn hóa địa phương.",
  },
  {
    id: 5,
    title:
      "Lam Kinh Hào Khí — Vang Vọng Một Thời Đại Việt",
    image: "/events/event-5.jpg",
    date: "02/10/2026",
    location: "Thanh Hóa",
    temperature: "+34",
    category: "Lễ hội",
    description:
      "Sự kiện là dịp để tôn vinh những giá trị lịch sử và văn hóa gắn liền với khu di tích Lam Kinh, thông qua các hoạt động tưởng niệm, biểu diễn nghệ thuật và trải nghiệm văn hóa truyền thống.",
  },
  {
    id: 6,
    title:
      "Bày Núi Đáy Sông — Hội Đua Thuyền Trên Dòng Sông",
    image: "/events/event-6.jpg",
    date: "24/07/2026–24/09/2026",
    location: "Lào Cai",
    temperature: "+34",
    category: "Lễ hội",
    description:
      "Hội đua thuyền mang đến không khí sôi động trên dòng sông với sự tham gia của các đội thi địa phương, kết hợp cùng nhiều hoạt động văn hóa và trải nghiệm dành cho người dân và du khách.",
  },
];