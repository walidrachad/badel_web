// Types + fake data ---------------------------------------------

export enum OrderStatus {
  Completed = "completed",
  Pending = "pending",
  Canceled = "canceled",
}

export type Order = {
  id: string;
  title: string; // e.g. "$100 Apple iTunes Gift Card • USA"
  image: string;
  amountMRU: number; // price in MRU
  status: OrderStatus;
  createdAt: string; // ISO string
};

// helper for dates
const iso = (y: number, m: number, d: number, hh = 20, mm = 12) =>
  new Date(Date.UTC(y, m - 1, d, hh, mm)).toISOString();

export const ORDERS: Order[] = [
  {
    id: "ord_1001",
    title: "$100 Apple iTunes Gift Card • USA",
    image: "/images/demo/frame_275_2.png",
    amountMRU: 4200,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1002",
    title: "$25 Netflix Gift Card",
    image: "/images/demo/frame_275.png",
    amountMRU: 700,
    status: OrderStatus.Pending,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1003",
    title: "$25 Netflix Gift Card",
    image: "/images/demo/image_1.png",
    amountMRU: 500,
    status: OrderStatus.Canceled,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1004",
    title: "$50 PlayStation Gift Card",
    image: "/images/demo/frame_275_3.png",
    amountMRU: 2300,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1001",
    title: "$100 Apple iTunes Gift Card • USA",
    image: "/images/demo/frame_275_2.png",
    amountMRU: 4200,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1002",
    title: "$25 Netflix Gift Card",
    image: "/images/demo/frame_275.png",
    amountMRU: 700,
    status: OrderStatus.Pending,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1003",
    title: "$25 Netflix Gift Card",
    image: "/images/demo/image_1.png",
    amountMRU: 500,
    status: OrderStatus.Canceled,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1004",
    title: "$50 PlayStation Gift Card",
    image: "/images/demo/frame_275_3.png",
    amountMRU: 2300,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
];
