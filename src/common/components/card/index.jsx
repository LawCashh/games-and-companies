function Card({ className, children }) {
  return (
    <div
      className={`flex h-[400px] w-full cursor-pointer flex-col items-center justify-around rounded-lg bg-amber-300 text-black transition-all duration-300 hover:shadow-[0_0_20px_0_rgba(0,0,0,0.3)] ${className} `}
    >
      {children}
    </div>
  );
}

export default Card;
