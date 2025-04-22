"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "@heroui/modal";
import { COFFEE, NONCOFFEE, TEA, FOODS, DESSERT } from "./data/menu";

export default function CafePOSPage() {
  const [orders, setOrders] = useState<
    Record<
      string,
      { name: string; price: number; type?: string; quantity: number }
    >
  >({});
  // const [paymentType, setPaymentType] = useState("");
  // const [showModal, setShowModal] = useState(false);
  // const [history, setHistory] = useState<
  //   {
  //     orders: {
  //       name: string;
  //       price: number;
  //       type?: string;
  //       quantity: number;
  //     }[];
  //     paymentType: string;
  //     total: number;
  //   }[]
  // >([]);

  const addItem = (item: { name: string; price: number; type?: string }) => {
    const key = `${item.name}_${item.type ?? ""}`;
    setOrders((prev) => ({
      ...prev,
      [key]: prev[key]
        ? { ...prev[key], quantity: prev[key].quantity + 1 }
        : { ...item, quantity: 1 },
    }));
  };

  const removeItem = (key: string) => {
    setOrders((prev) => {
      if (!prev[key]) return prev;
      if (prev[key].quantity <= 1) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [key]: { ...prev[key], quantity: prev[key].quantity - 1 },
      };
    });
  };
  const total = Object.values(orders).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // const confirmOrder = () => {
  //   setHistory([
  //     ...history,
  //     { orders: Object.values(orders), paymentType, total },
  //   ]);
  //   setOrders({});
  //   setPaymentType("");
  //   setShowModal(false);
  // };

  const renderMenuSection = (
    id: string,
    title: string,
    items: { name: string; price: number; type?: string }[]
  ) => (
    <div className={`my-4`}>
      <h2 className="text-lg font-semibold my-4 text-black">{title}</h2>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, idx) => (
          <Button
            key={idx}
            onPress={() => addItem(item)}
            radius="lg"
            className={`cursor-pointer text-black ${
              item.type === "ice"
                ? "bg-blue-200"
                : item.type === "hot"
                ? "bg-red-200"
                : "bg-green-300"
            }`}
          >
            <div className="p-4 flex flex-col items-center gap-2 rounded">
              <div className="font-semibold">{item.name}</div>
              <div>{item.price.toLocaleString()}원</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-4 p-4 mx-auto bg-white pb-72">
      <div className="sticky top-0 z-50 bg-white">
        <div className="flex flex-row justify-start items-center">
          <Image
            src="/icon.png"
            alt="urbanplant"
            width={50}
            height={50}
            // className="mx-auto"
          />

          <div className="text-2xl font-bold text-black">카페 POS</div>
        </div>
        <div className="rounded-sm font-bold px-2 flex gap-4 justify-between overflow-x-auto py-2 bg-green-700">
          <a href="#coffee">
            <Button variant="light">☕ 커피</Button>
          </a>
          <a href="#noncoffee">
            <Button variant="light">🧃 논커피 음료</Button>
          </a>
          <a href="#tea">
            <Button variant="light">🍵 차</Button>
          </a>
          <a href="#food">
            <Button variant="light">🍽 식사</Button>
          </a>
          <a href="#dessert">
            <Button variant="light">🍰 디저트</Button>
          </a>
        </div>
      </div>
      <section id="coffee" className="scroll-mt-24">
        {renderMenuSection("coffee", "☕ 커피", COFFEE)}
      </section>
      <section id="noncoffee" className="scroll-mt-24">
        {renderMenuSection("noncoffee", "🧃 논커피 음료", NONCOFFEE)}
      </section>
      <section id="tea" className="scroll-mt-24">
        {renderMenuSection("tea", "🍵 차", TEA)}
      </section>
      <section id="food" className="scroll-mt-24">
        {renderMenuSection("food", "🍽 식사", FOODS)}
      </section>
      <section id="dessert" className="scroll-mt-24">
        {renderMenuSection("dessert", "🍰 디저트", DESSERT)}
      </section>
      <div className="fixed bottom-0 left-0 right-0 bg-black p-4 pb-8 shadow-lg">
        <div>
          <div className="flex justify-between flex-row text-white">
            <div className="text-lg font-bold items-center flex">주문 내역</div>
            <div className="text-right">
              <Button
                onPress={() => setOrders({})}
                className="rounded-sm bg-green-100 text-black p-2"
              >
                Reset
              </Button>
            </div>
          </div>
          {Object.entries(orders).map(([key, item], idx) => (
            <div key={idx} className="flex items-center gap-2 py-1">
              <Button
                radius="full"
                onPress={() => removeItem(key)}
                className=" bg-yellow-400 py-1 px-3 font-bold text-black rounded-full"
              >
                -
              </Button>
              {item.type === "ice" || item.type === "hot" ? (
                <div
                  className={`text-xs px-2 py-1 rounded text-white ${
                    item.type === "ice" ? "bg-blue-500" : "bg-red-500"
                  }`}
                >
                  {item.type.toUpperCase()}
                </div>
              ) : null}
              <div className="flex-1 text-white">
                {item.name} (x{item.quantity})
              </div>
              <div className="text-white">
                {(item.price * item.quantity).toLocaleString()}원
              </div>
            </div>
          ))}
          <div className="text-right font-bold mt-2 text-white text-xl">
            합계: {total.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
}
