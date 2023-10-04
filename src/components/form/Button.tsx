import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
  outline?: boolean;
};

export const Button = ({ variant, outline, ...props }: ButtonProps) => {
  let variantClass = clsx(`interactive-bg-primary-container`);

  if (outline) {
    variantClass = clsx('interactive-bg-background border border-primary/30');
  }

  if (variant === 'secondary') {
    variantClass = clsx('interactive-bg-secondary-container');
  } else if (variant === 'tertiary') {
    variantClass = clsx('interactive- interactive-bg-inverse-surface-dark');
  }

  return (
    <button
      {...props}
      className={clsx(
        variantClass,
        'bg- inline-flex cursor-pointer items-center space-x-2 rounded-lg  px-4 py-2 font-medium shadow-primary/50 outline-none hover:shadow',
        props.className,
      )}
    />
  );
};
