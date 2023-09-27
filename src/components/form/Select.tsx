type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = (props: SelectProps) => {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-gray-900  px-4  py-2 text-black outline-1 outline-purple-500 ${
        props.className ? ' ' + props.className : ''
      }`}
    />
  );
};
