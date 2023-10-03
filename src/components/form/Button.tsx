import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'interactive-bg-primary inline-flex cursor-pointer items-center space-x-2 rounded-lg border-0 px-4 py-2 font-medium shadow-primary/50 hover:shadow',
        props.className,
      )}
    />
  );
};
