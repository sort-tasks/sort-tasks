type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={`border px-4 py-2 mb-4 rounded-lg  text-black  outline-purple-500 border-gray-900 outline-1 w-full ${
        props.className ? ' ' + props.className : ''
      }`}
    />
  );
};
