export const Button = ({ children, ...props }: any) => {
  return (
    <button
      className="p-4 mr-4 hover:bg-green-200 transition-all bg-green-400 text-center font-['Poppins'] rounded-sm "
      {...props}
    >
      {children}
    </button>
  );
};
