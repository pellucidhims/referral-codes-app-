const Loader = ({size = "16", color = "blue"}:{size?: string, color?: string}) => {
  return (
    <div className={`w-${size} h-${size} border-4 border-${color}-300 border-t-transparent rounded-full animate-spin`} />
  );
};

export default Loader;
