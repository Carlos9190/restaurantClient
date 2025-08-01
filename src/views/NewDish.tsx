export default function NewDish() {
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Add dish</h1>

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form action="">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>

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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>

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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-40"
              ></textarea>
            </div>

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
