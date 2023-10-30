import "./Loader.scss";
function Loader({ height }) {
  return (
    <div
      className={`z-10 flex h-[${height}] items-center justify-center bg-black/20 backdrop-blur-xl`}
    >
      <div
        className={`animate-spin-slow h-40 w-40 rounded-lg bg-amber-400`}
      ></div>
    </div>
  );
}

export default Loader;
