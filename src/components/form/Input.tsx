import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const inputClass = clsx(
  'interactive-bg-background w-full rounded-md border border-on-surface/30 px-4 py-3 text-sm font-medium text-on-background outline-0',
);

export const Input = (props: InputProps) => {
  return <input {...props} className={clsx(inputClass, props.className)} />;
};

export const InputGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};
