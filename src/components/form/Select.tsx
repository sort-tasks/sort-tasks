type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = (props: SelectProps) => {
  return (
    <select
      {...props}
      className={`border px-4 py-2 rounded-lg  text-black  outline-purple-500 border-gray-900 outline-1 w-full ${
        props.className ? ' ' + props.className : ''
      }`}
    />
  );
};
