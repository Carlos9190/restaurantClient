import { useState, useContext } from "react";
import { FirebaseContext } from "../firebase";
import type { OrderSent } from "../types";
import { doc, updateDoc } from "firebase/firestore";

type OrderCardProps = {
  order: OrderSent;
};

export default function OrderCard({ order }: OrderCardProps) {
  const [estimatedTime, setestimatedTime] = useState(0);

  const firebase = useContext(FirebaseContext);

  // Set estimated time
  const setTime = async (id: OrderSent["id"]) => {
    try {
      if (firebase && firebase.db) {
        const docRef = doc(firebase.db, "orders", id);

        await updateDoc(docRef, {
          time: estimatedTime,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Complete order state
  const completeOrder = async (id: OrderSent["id"]) => {
    try {
      if (firebase && firebase.db) {
        const docRef = doc(firebase.db, "orders", id);

        await updateDoc(docRef, {
          completed: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md border-white">
        <h1 className="text-yellow-600 text-lg font-bold">{order.id}</h1>
        {order.order.map((dishes) => (
          <p className="text-gray-600" key={dishes.id}>
            {dishes.quantity} {dishes.name}
          </p>
        ))}

        <p className="text-gray-700 font-bold">Total: ${order.total}</p>

        {!order.time ? (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Estimated wait time
            </label>

            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              min="1"
              max="20"
              placeholder="20 minutes"
              value={estimatedTime}
              onChange={(e) => setestimatedTime(parseInt(e.target.value))}
            />

            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-fit mt-5 p-2 text-white uppercase font-bold rounded"
              onClick={() => setTime(order.id)}
            >
              Set time
            </button>
          </div>
        ) : (
          <p className="text-gray-700">
            Estimated wait time: {""}
            <span className="font-bold">{order.time} minutes</span>
          </p>
        )}

        {!order.completed && order.time > 0 && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => completeOrder(order.id)}
          >
            Mark as ready
          </button>
        )}
      </div>
    </div>
  );
}
