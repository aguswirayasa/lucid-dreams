const loading = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="col-span-12 md:col-span-6 text-white grid gap-3">
        <h1 className="bg-gray-300 w-96 h-14 lg:w-[500] lg:h-20 animate-pulse"></h1>
        <p className=" text-sm md:text-xl font-normal max-w-xl text-justify bg-gray-300 w-96 h-20 lg:w-[500] lg:h-28 animate-pulse"></p>

        <button className="bg-gray-300 text-xl font- uppercase rounded-sm text-black w-2/5 py-2 px-3 animate-pulse"></button>
      </div>
      <div className="col-span-6 hidden md:grid place-items-center place-content-center">
        <div
          className="hidden md:block rounded-full bg-gray-300 animate-pulse"
          style={{ width: 500, height: 500 }}
        ></div>
      </div>
    </div>
  );
};

export default loading;
