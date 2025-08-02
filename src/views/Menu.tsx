import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { FirebaseContext } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import DishCard from "../components/DishCard";
import type { Dish, Dishes } from "../types";

export default function Menu() {
  const [dishes, setDishes] = useState<Dishes>([]);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (firebase && firebase.db) {
      const productsRef = collection(firebase.db, "products");

      // List on real time
      const unsubscribe = onSnapshot(
        productsRef,
        (snapshot) => {
          const dishes = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              price: data.price,
              category: data.category,
              description: data.description,
              available: data.available,
            } as Dish;
          });

          // Set dishes on state
          setDishes(dishes);
        },
        (error) => {
          console.error(error);
        }
      );

      // Important: cleans listener when the component is off
      return () => unsubscribe();
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>

      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Add dish
      </Link>

      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </>
  );
}
