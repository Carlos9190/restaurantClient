import { Link } from "react-router";

export default function Menu() {
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>

      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Add dish
      </Link>
    </>
  );
}
