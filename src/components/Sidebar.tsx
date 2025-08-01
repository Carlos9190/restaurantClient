import { Link, Outlet } from "react-router";

export default function Sidebar() {
  return (
    <div className="md:flex min-h-screen">
      <header className="bg-gray-800">
        <div className="p-6">
          <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
            Restaurant App
          </p>

          <p className="mt-3 text-gray-600">
            Manage your restaurant in the following options:
          </p>

          <nav className="mt-10">
            <Link
              to="/"
              className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            >
              Orders
            </Link>
            <Link
              to="/menu"
              className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            >
              Menu
            </Link>
          </nav>
        </div>
      </header>

      <section className="md:w-3/5 xl:w-4/5 p-6">
        <Outlet />
      </section>
    </div>
  );
}
