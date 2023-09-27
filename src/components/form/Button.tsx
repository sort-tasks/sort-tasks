type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`cursor-pointer rounded-lg border-2 border-t-0 border-purple-600 bg-purple-700  px-4 py-2 text-white  hover:border-purple-700 hover:bg-purple-600 active:border-purple-900 active:bg-purple-900 ${
        props.className ? ' ' + props.className : ''
      }`}
    />
  );
};
