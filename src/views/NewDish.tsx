import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import type { Dish } from "../types";

const initialValues: Dish = {
  name: "",
  price: "",
  category: "",
  image: "",
  description: "",
  available: false,
};

export default function NewDish() {
  // Context with firebase operations
  const firebase = useContext(FirebaseContext);

  // Redirection hook
  const navigate = useNavigate();

  // validation and reading data from form
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Dishes must have at least 3 characters")
        .required("Dish name is required"),
      price: Yup.number()
        .min(1, "Price must be greater than 0")
        .required("Dish price is required"),
      category: Yup.string().required("Dish category is required"),
      description: Yup.string()
        .min(10, "Dishes must have at least 10 characters")
        .required("Dish description is required"),
    }),
    onSubmit: async (dish) => {
      try {
        if (firebase) {
          dish.available = true;
          const productsRef = collection(firebase.db, "products");
          await addDoc(productsRef, dish);

          // Redirect
          navigate("/menu");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Add dish</h1>

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Dish name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">There was an error</p>
                <p>{formik.errors.name}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                min="0"
                placeholder="Dish price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            {formik.touched.price && formik.errors.price && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">There was an error</p>
                <p>{formik.errors.price}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              >
                <option value="">-- Select --</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="beverage">Beverages</option>
                <option value="dessert">Deserts</option>
                <option value="salad">Salads</option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">There was an error</p>
                <p>{formik.errors.category}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Image
              </label>
              <input
                id="image"
                type="file"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Dish description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-40"
              ></textarea>
            </div>
            {formik.touched.description && formik.errors.description && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">There was an error</p>
                <p>{formik.errors.description}</p>
              </div>
            )}

            <input
              type="submit"
              value="Add dish"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            />
          </form>
        </div>
      </div>
    </>
  );
}
