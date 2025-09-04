import AppBar from "@/components/mobile/app_bar/AppBar";
import OrderItem from "./OrderItem";
import CircleIcon from "@/components/mobile/CircleIcon";
import Image from "next/image";

export default function OrdersPage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* <StatusBar theme="light" /> */}

      <AppBar title="My orders">
        <CircleIcon>
          <Image
            src="/icons/filter_icon.svg"
            alt="Menu"
            width={16}
            height={16}
          />
        </CircleIcon>
      </AppBar>
      <div className="absolute top-[102px] left-0 w-full flex flex-col">
        <OrderItem
          imageType="apple"
          title="$100 Apple iTunes Gift Card • USA"
          price="4 200 MRU"
          status="Completed"
          statusType="success"
          date="June 10, 2025 20:12"
        />
        <OrderItem
          imageType="netflix"
          title="$25 Netflix Gift Card"
          price="700 MRU"
          status="Pending"
          statusType="warning"
          date="June 10, 2025 20:12"
        />
        <OrderItem
          imageType="netflix"
          title="$25 Netflix Gift Card"
          price="500 MRU"
          status="Refunded"
          statusType="danger"
          date="June 10, 2025 20:12"
        />
        <OrderItem
          imageType="playstation"
          title="$50 PlayStation Gift Card"
          price="2 300 MRU"
          status="Completed"
          statusType="success"
          date="June 10, 2025 20:12"
        />
        <OrderItem
          imageType="apple"
          title="$100 Apple iTunes Gift Card • USA"
          price="700 MRU"
          status="Completed"
          statusType="success"
          date="June 10, 2025 20:12"
        />
        <OrderItem
          imageType="netflix"
          title="$25 Netflix Gift Card"
          price="700 MRU"
          status="Completed"
          statusType="success"
          date="June 10, 2025 20:12"
        />
      </div>
    </div>
  );
}
