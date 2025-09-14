"use client";

import { Button } from "antd";

type Props = {
  onClick?: () => void;
};

export default function PurchaseButton({ onClick }: Props) {
  return (
    <Button
      type="primary"
      size="large"
      className="w-full h-14 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden group"
      style={{
        background:
          "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",
        border: "none",
        boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
      }}
      icon={
        <span className="text-xl group-hover:scale-110 transition-transform duration-300">
          🛒
        </span>
      }
      onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10 drop-shadow-sm">Mua ngay</span>
    </Button>
  );
}
