import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const inputClass = clsx(
  'w-full rounded-lg border border-gray-900 bg-white  px-4  py-2 text-black outline-1 outline-purple-500',
);

export const Input = (props: InputProps) => {
  return <input {...props} className={clsx(inputClass, props.className)} />;
};
