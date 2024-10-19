import React, { ReactNode, useEffect, useState } from "react";
import OrdersJson from "../data/orders.json";
import { Order, OrderStatus } from "../types/order.type";
import TaskCard from "./TaskCard";

export const OrdersBoard: React.FC = () => {
  const orders: Order[] = OrdersJson as Order[];

  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [readyOrders, setReadyOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log(orders);
    differentiatingOrders();
  }, []);

  const differentiatingOrders = () => {
    orders.forEach((order: Order) => {
      switch (order.status) {
        case OrderStatus.New:
          setNewOrders((preOrder) => [...preOrder, order]);
          break;
        case OrderStatus.Active:
          setActiveOrders((preOrder) => [...preOrder, order]);
          break;
        case OrderStatus.Ready:
          setReadyOrders((preOrder) => [...preOrder, order]);
          break;
      }
    });
  };

  const setOrderActive = (id: number) => {
    console.log(id);
  };

  const setOrderReady = (id: number) => {
    console.log(id);
  };

  const setOrderComplete = (id: number) => {
    console.log(id);
  };

  return (
    <span style={{ margin: 24 }}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex flex-row gap-2">
            <span className="font-semibold mt-1">New</span>
            <div className="rounded-[100px] bg-red-500 w-6 h-6 text-white flex justify-center text-[15px]">
              {newOrders.length}
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-4">
            {newOrders.map((order: Order, index: number) => {
              return <TaskCard order={order} buttonAction={setOrderActive} />;
            })}
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-2">
            <span className="font-semibold mt-1">Active</span>
            <div className="rounded-[100px] bg-blue-500 w-6 h-6 text-white flex justify-center text-[15px]">
              {activeOrders.length}
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-4">
            {activeOrders.map((order: Order, index: number) => {
              return <TaskCard order={order} buttonAction={setOrderActive} />;
            })}
          </div>
        </div>
        <div>
          <div>
            <span className="font-semibold">Ready</span>
          </div>
          <div className="mt-2 flex flex-col gap-4">
            {readyOrders.map((order: Order, index: number) => {
              return <TaskCard order={order} buttonAction={setOrderActive} />;
            })}
          </div>
        </div>
      </div>
    </span>
  );
};
