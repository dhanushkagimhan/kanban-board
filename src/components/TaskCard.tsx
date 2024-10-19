import { Order } from "../types/order.type";

type TaskCardProps = {
  order: Order;
  buttonTitle: string;
  buttonAction: (id: number) => void;
  keyValue: number;
};

export default function TaskCard({
  order,
  buttonTitle,
  buttonAction,
  keyValue,
}: TaskCardProps) {
  const getItemCounts = (): number => {
    let count: number = 0;

    order.items.forEach((item) => (count += item.quantity));

    return count;
  };

  const getPrice = () => {
    let price: number = 0;

    order.items.forEach((item) => {
      const unitTotalPrice: number = item.price * item.quantity;
      price += unitTotalPrice;
    });

    return price;
  };

  return (
    <div
      className="shadow p-4 hover:shadow-lg border border-1 border-slate-200 rounded"
      key={keyValue}
    >
      <div>
        <span className="text-slate-400 text-[14px]">Order #{order.id}</span>
      </div>
      <div>
        <span className="text-[16px]">
          {order.space.name} from {order.pricelist.name}
        </span>
      </div>
      <div>
        <span className="text-slate-400 text-[14px]">
          {getItemCounts()} items • €{getPrice()}
        </span>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <div>
          <span className="font-semibold">{order.location}</span>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={() => buttonAction(order.id)}
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}
