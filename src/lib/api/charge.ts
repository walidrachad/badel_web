// ---- Types for just what you need ----
export type GiftCard = {
  id: number;
  name: string;
  output: string | null;
  output_fr: string | null;
  output_ar: string | null;
  amount: string; // "8400.00"
  amount_after_fee: string; // "9600.00"
  in_stock: 0 | 1;
  country: string | null;
  category_id: number;
  display_type: string | null;
  display_value: string | null;
  display_order: number | null;
};

export type Category = {
  id: number;
  name: string;
  name_fr: string | null;
  name_ar: string | null;
  description: string | null;
  description_fr: string | null;
  description_ar: string | null;
  image_path: string | null;
  small_image: string | null;
  desclaimer: string | null;
  desclaimer_fr: string | null;
  desclaimer_ar: string | null;
  in_stock: 0 | 1;
  type: "country" | "none" | string;
  order: number;
  giftcards: GiftCard[];
};

export type GroupItem = {
  id: number;
  type: "group";
  order: number;
  name: string;
  name_fr: string | null;
  name_ar: string | null;
  image_path: string | null;
  categories: Category[];
};

export type ChargeItem = GroupItem | Category;

import { http } from "@/lib/http";

export async function getChargePageItems(): Promise<any[]> {
  // const res = await http.get<{
  //   status: boolean;
  //   data: ChargeItem[];
  //   recent_categories?: unknown;
  //   message?: string;
  // }>("/api/v3/charge-page-items");

  // Return ONLY the array
  // return res.data.data ?? [];
  return mockGroupItems;
}

export const mockGroupItems: GroupItem[] = [
  {
    id: 1,
    type: "group",
    order: 1,
    name: "Entertainment",
    name_fr: "Divertissement",
    name_ar: "الترفيه",
    image_path: "/images/demo/frame_275.png",
    categories: [
      {
        id: 101,
        name: "Streaming Services",
        name_fr: "Services de streaming",
        name_ar: "خدمات البث",
        description: "Popular platforms for movies, shows, and music.",
        description_fr: "Plateformes populaires pour films, séries et musique.",
        description_ar: "منصات شهيرة للأفلام والمسلسلات والموسيقى.",
        image_path: "/images/demo/frame_275.png",
        small_image: "/images/demo/frame_275.png",
        desclaimer: "Valid for selected regions only.",
        desclaimer_fr: "Valable uniquement pour certaines régions.",
        desclaimer_ar: "صالح لمناطق محددة فقط.",
        in_stock: 1,
        type: "none",
        order: 1,
        giftcards: [
          {
            id: 1001,
            name: "Netflix Gift Card",
            output: "Netflix Gift Card Code",
            output_fr: "Code de carte cadeau Netflix",
            output_ar: "رمز بطاقة هدية نيتفليكس",
            amount: "8400.00",
            amount_after_fee: "9600.00",
            in_stock: 1,
            country: "US",
            category_id: 101,
            display_type: "value",
            display_value: "$84",
            display_order: 1,
          },
          {
            id: 1002,
            name: "Spotify Premium",
            output: "Spotify Premium Code",
            output_fr: "Code Premium Spotify",
            output_ar: "رمز سبوتيفاي بريميوم",
            amount: "2500.00",
            amount_after_fee: "2800.00",
            in_stock: 1,
            country: "FR",
            category_id: 101,
            display_type: "value",
            display_value: "€25",
            display_order: 2,
          },
        ],
      },
      {
        id: 102,
        name: "Gaming",
        name_fr: "Jeux vidéo",
        name_ar: "الألعاب",
        description: "Gift cards for popular gaming platforms.",
        description_fr: "Cartes cadeaux pour plateformes de jeux populaires.",
        description_ar: "بطاقات هدايا لمنصات الألعاب الشهيرة.",
        image_path: "/images/demo/frame_275.png",
        small_image: "/images/demo/frame_275.png",
        desclaimer: null,
        desclaimer_fr: null,
        desclaimer_ar: null,
        in_stock: 1,
        type: "none",
        order: 2,
        giftcards: [
          {
            id: 2001,
            name: "PlayStation Store",
            output: "PSN Wallet Code",
            output_fr: "Code portefeuille PSN",
            output_ar: "رمز محفظة بلاي ستيشن",
            amount: "5000.00",
            amount_after_fee: "5500.00",
            in_stock: 1,
            country: "US",
            category_id: 102,
            display_type: "value",
            display_value: "$50",
            display_order: 1,
          },
          {
            id: 2002,
            name: "Xbox Live",
            output: "Xbox Live Credit",
            output_fr: "Crédit Xbox Live",
            output_ar: "رصيد إكس بوكس لايف",
            amount: "10000.00",
            amount_after_fee: "11000.00",
            in_stock: 0,
            country: "UK",
            category_id: 102,
            display_type: "value",
            display_value: "£100",
            display_order: 2,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    type: "group",
    order: 2,
    name: "Shopping",
    name_fr: "Achats",
    name_ar: "التسوق",
    image_path: "/images/demo/frame_275.png",
    categories: [
      {
        id: 201,
        name: "E-commerce",
        name_fr: "E-commerce",
        name_ar: "التجارة الإلكترونية",
        description: "Cards for online shopping platforms.",
        description_fr: "Cartes pour plateformes de shopping en ligne.",
        description_ar: "بطاقات لمنصات التسوق عبر الإنترنت.",
        image_path: "/images/demo/frame_275.png",
        small_image: "/images/demo/frame_275.png",
        desclaimer: "Check the website for usage restrictions.",
        desclaimer_fr: "Vérifiez le site pour les restrictions d'utilisation.",
        desclaimer_ar: "تحقق من الموقع لمعرفة القيود.",
        in_stock: 1,
        type: "country",
        order: 1,
        giftcards: [
          {
            id: 3001,
            name: "Amazon Gift Card",
            output: "Amazon Voucher Code",
            output_fr: "Code chèque-cadeau Amazon",
            output_ar: "رمز قسيمة أمازون",
            amount: "15000.00",
            amount_after_fee: "16000.00",
            in_stock: 1,
            country: "US",
            category_id: 201,
            display_type: "value",
            display_value: "$150",
            display_order: 1,
          },
        ],
      },
    ],
  },
];
