type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-purple-700 text-white px-4 py-2 border-2 border-t-0  active:border-purple-900 border-purple-600 hover:bg-purple-600  hover:border-purple-700 cursor-pointer active:bg-purple-900 rounded-lg ${
        props.className ? ' ' + props.className : ''
      }`}
    />
  );
};
