 const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-64px)] p-4 sm:p-6 bg-black bg-opacity-50">
      {/* GIF container */}
      <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] flex justify-center items-center">
        <img
          src="/giphy.gif"
          alt="Loading..."
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Loader;