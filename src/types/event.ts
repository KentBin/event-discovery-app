export type EventItem = {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  temperature: string;
};

export const events: EventItem[] = [
  {
    id: 1,
    title: "Lễ hội Thành Tuyên – Khi Sắc Màu Không Lời Kể...",
    image: "/events/event-1.jpg",
    date: "19–29/09/2026",
    location: "Tuyên Quang",
    temperature: "+34",
  },
  {
    id: 2,
    title: "Festival Thăng Long - Hà Nội",
    image: "/events/event-2.jpg",
    date: "Dự kiến 11/2026",
    location: "Hà Nội",
    temperature: "+34",
  },
  {
    id: 3,
    title: "Hội An Lên Đèn — Một Đêm Phố Cổ Ngập Sắc Màu",
    image: "/events/event-3.jpg",
    date: "Dự kiến 09/2026",
    location: "Hội An",
    temperature: "+34",
  },
  {
    id: 4,
    title: "Mường Lò Vào Hội — Say Trong Điệu Xòe Tây Bắc",
    image: "/events/event-4.jpg",
    date: "25/09–20/10/2026",
    location: "Lào Cai",
    temperature: "+34",
  },
  {
    id: 5,
    title: "Lam Kinh Hào Khí — Vang Vọng Một Thời Đại Việt",
    image: "/events/event-5.jpg",
    date: "02/10/2026",
    location: "Thanh Hóa",
    temperature: "+34",
  },
  {
    id: 6,
    title: "Bày Núi Đáy Sông — Hội Đua Thuyền Trên Dòng Sông",
    image: "/events/event-6.jpg",
    date: "24/07/2026–24/09/2026",
    location: "Lào Cai",
    temperature: "+34",
  },
];