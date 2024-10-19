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
    differentiatingOrders();
  }, []);

  const differentiatingOrders = () => {
    orders.forEach((order: Order) => {
      switch (order.status) {
        case OrderStatus.New:
          setNewOrders((preOrders) => [...preOrders, order]);
          break;
        case OrderStatus.Active:
          setActiveOrders((preOrders) => [...preOrders, order]);
          break;
        case OrderStatus.Ready:
          setReadyOrders((preOrders) => [...preOrders, order]);
          break;
      }
    });
  };

  const setOrderActive = (id: number) => {
    const processingOrder = orders.find((order) => order.id === id);

    if (processingOrder != null) {
      const tempNewOrders: Order[] = [...newOrders];
      const updatedNewOrders: Order[] = tempNewOrders.filter(
        (order) => order.id !== id
      );
      setNewOrders(updatedNewOrders);

      setActiveOrders((preOrders) => [...preOrders, processingOrder]);

      // Need to update backend with API also
    }
  };

  const setOrderReady = (id: number) => {
    const processingOrder = orders.find((order) => order.id === id);

    if (processingOrder != null) {
      const tempActiveOrders: Order[] = [...activeOrders];
      const updatedActiveOrders: Order[] = tempActiveOrders.filter(
        (order) => order.id !== id
      );
      setActiveOrders(updatedActiveOrders);

      setReadyOrders((preOrders) => [...preOrders, processingOrder]);

      // Need to update backend with API also
    }
  };

  const setOrderComplete = (id: number) => {
    const tempOrders: Order[] = [...readyOrders];
    const updatedOrders: Order[] = tempOrders.filter(
      (order) => order.id !== id
    );
    setReadyOrders(updatedOrders);

    // Need to update backend with API also
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
              return (
                <TaskCard
                  order={order}
                  buttonTitle="Approve"
                  buttonAction={setOrderActive}
                  keyValue={order.id}
                />
              );
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
              return (
                <TaskCard
                  order={order}
                  buttonTitle="Ready"
                  buttonAction={setOrderReady}
                  keyValue={order.id}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div>
            <span className="font-semibold">Ready</span>
          </div>
          <div className="mt-2 flex flex-col gap-4">
            {readyOrders.map((order: Order, index: number) => {
              return (
                <TaskCard
                  order={order}
                  buttonTitle="Complete"
                  buttonAction={setOrderComplete}
                  keyValue={order.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </span>
  );
};
