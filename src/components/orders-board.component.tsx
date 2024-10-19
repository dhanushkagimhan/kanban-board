import React, { useEffect } from "react";
import OrdersJson from "../data/orders.json";
import { Order } from "../types/order.type";

export const OrdersBoard: React.FC = () => {
  const orders: Order[] = OrdersJson as Order[];

  useEffect(() => {
    console.log(orders);
  }, []);

  return (
    <span style={{ margin: 24 }}>
      Edit this component in /src/component/orders.board.component.tsx
    </span>
  );
};
