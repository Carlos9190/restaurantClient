import { useContext, useRef } from "react";
import { FirebaseContext } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import type { Dish } from "../types";

type DishCardProps = {
  dish: Dish;
};

export default function DishCard({ dish }: DishCardProps) {
  // Ref to access to each value directly
  const existRef = useRef<HTMLSelectElement | null>(null);

  // Firebase context to send updated date on DB
  const firebase = useContext(FirebaseContext);

  const { id, name, category, available, price, description } = dish;

  // update dish availability
  const updateAvailability = async () => {
    const existence = existRef.current?.value === "true";

    try {
      if (firebase && firebase.db) {
        const docRef = doc(firebase.db, "products", id);

        await updateDoc(docRef, {
          available: existence,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex items-center">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={`../../public/${category}.avif`} alt={`${name} image`} />

            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">Availability</span>

                <select
                  ref={existRef}
                  value={available.toString()}
                  onChange={() => updateAvailability()}
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
                >
                  <option value="true">Available</option>
                  <option value="false">Not available</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
            <p className="text-gray-600 mb-4">
              Category:{" "}
              <span className="text-gray-700 font-bold uppercase">
                {category}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-600 mb-4">
              Price:{" "}
              <span className="text-gray-700 font-bold uppercase">
                ${price}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
