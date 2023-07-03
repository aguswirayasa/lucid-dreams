const loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-md cursor-pointer group animate-pulse"
        >
          <div className="bg-gray-300 h-40 w-full"></div>

          <div className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-90 p-4 transition-transform duration-300 transform-gpu translate-y-full group-hover:translate-y-0">
            <span className="flex justify-between items-center">
              <h3 className="text-xl text-teal-500 font-bold mb-2 bg-gray-300 h-6 w-3/4"></h3>
              <p className="text-xs text-white/50 font-semibold bg-gray-300 h-4 w-1/4"></p>
            </span>
            <ul>
              <li className="border-b-2 border-teal-600 my-2">
                <p className="text-sm text-white bg-gray-300 h-4 w-1/2"></p>
              </li>
              <li className="border-b-2 border-teal-600 my-2">
                <p className="text-sm text-white font-semibold bg-gray-300 h-4 w-1/4"></p>
                <p className="text-sm text-white bg-gray-300 h-4 w-full"></p>
              </li>
              <li className="border-b-2 border-teal-600 my-2">
                <p className="text-sm text-white font-semibold bg-gray-300 h-4 w-1/4"></p>
                <p className="text-sm text-white bg-gray-300 h-4 w-full"></p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default loading;
