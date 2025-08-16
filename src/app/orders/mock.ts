// Types + fake data ---------------------------------------------

export enum OrderStatus {
  Completed = "completed",
  Pending = "pending",
  Canceled = "canceled",
}

export type Brand = "apple" | "netflix" | "playstation";

export type Order = {
  id: string;
  title: string; // e.g. "$100 Apple iTunes Gift Card • USA"
  brand: Brand;
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
    brand: "apple",
    amountMRU: 4200,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1002",
    title: "$25 Netflix Gift Card",
    brand: "netflix",
    amountMRU: 700,
    status: OrderStatus.Pending,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1003",
    title: "$25 Netflix Gift Card",
    brand: "netflix",
    amountMRU: 500,
    status: OrderStatus.Canceled,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1004",
    title: "$50 PlayStation Gift Card",
    brand: "playstation",
    amountMRU: 2300,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1005",
    title: "$100 Apple iTunes Gift Card • USA",
    brand: "apple",
    amountMRU: 700,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1001",
    title: "$100 Apple iTunes Gift Card • USA",
    brand: "apple",
    amountMRU: 4200,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1002",
    title: "$25 Netflix Gift Card",
    brand: "netflix",
    amountMRU: 700,
    status: OrderStatus.Pending,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1003",
    title: "$25 Netflix Gift Card",
    brand: "netflix",
    amountMRU: 500,
    status: OrderStatus.Canceled,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1004",
    title: "$50 PlayStation Gift Card",
    brand: "playstation",
    amountMRU: 2300,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
  {
    id: "ord_1005",
    title: "$100 Apple iTunes Gift Card • USA",
    brand: "apple",
    amountMRU: 700,
    status: OrderStatus.Completed,
    createdAt: iso(2025, 6, 10),
  },
];
