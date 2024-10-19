import { Order } from "../types/order.type";

type TaskCardProps = {
  order: Order;
  buttonAction: (id: number) => void;
};

export default function TaskCard({ order, buttonAction }: TaskCardProps) {
  return (
    <div className=" shadow p-2">
      <div>
        <span>Order #</span>
        <span>{order.id}</span>
      </div>
    </div>
  );
}
