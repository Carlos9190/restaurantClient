import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import OrderCard from "../components/OrderCard";
import type { OrderSent } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<OrderSent[]>();

  // firebase context
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const getOrders = () => {
      // Consult Firebase
      if (firebase && firebase.db) {
        const productsRef = query(
          collection(firebase.db, "orders"),
          where("completed", "==", false)
        );

        // List on real time
        const unsubscribe = onSnapshot(productsRef, (snapshot) => {
          let orders = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              time: data.time,
              completed: data.completed,
              total: data.total,
              order: data.order,
              createdAt: data.createdAt,
            } as OrderSent;
          });

          setOrders(orders);
        });

        return () => unsubscribe();
      }
    };
    getOrders();
  }, []);

  if (orders)
    return (
      <>
        <h1 className="text-3xl font-light mb-4">Orders</h1>

        <div className="sm:flex sm:flex-wrap -mx-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </>
    );
}
