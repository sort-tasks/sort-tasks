import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { PopperOverMenu } from 'components/PopperOverMenu';
import { inputClass } from 'components/form/Input';
import { useFindManyCategoryQuery } from 'generated-graphql/hooks';
import * as Types from 'generated-graphql/types';

type CategorySelectProps = {
  disabled?: boolean;
  categoryId?: string;
  onChange: (categoryId: string) => void;
};

export const CategorySelect = ({ categoryId, onChange, disabled }: CategorySelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [categoryTerm, setCategoryTerm] = useState('');

  const { data, loading, error } = useFindManyCategoryQuery();

  const categories = data?.findManyCategory?.data ?? [];

  useEffect(() => {
    if (categoryId && data?.findManyCategory?.data?.length) {
      const category = data.findManyCategory.data.find((category) => category.id === categoryId);

      if (category) {
        setCategoryTerm(category.name);
      }
    }
  }, [categoryId, data?.findManyCategory?.data, setCategoryTerm]);

  const categoryFilteredByTerm = categories.filter((category) => {
    const nameRegex = new RegExp(categoryTerm, 'i');
    return nameRegex.test(category.name) || nameRegex.test(category.ordering.toString());
  });

  const handleOnFocus = () => {
    setIsFocused(true);
    setCategoryTerm('');
  };

  const handleCategorySelect = (category: Types.CategoryFragment) => () => {
    setCategoryTerm(category.name);

    onChange(category.id);
    setIsFocused(false);
  };

  const handleClickOutside = () => {
    setIsFocused(false);

    if (categoryId && data?.findManyCategory?.data?.length) {
      const category = data.findManyCategory.data.find((category) => category.id === categoryId);

      if (category) {
        setCategoryTerm(category.name);
      }
    }
  };

  const Menu = (
    <div
      className={clsx('w-56', {
        hidden: !isFocused,
        block: isFocused,
      })}
    >
      {loading && <p>Loading...</p>}
      <div className="bg-surface-variant absolute top-full mt-2 rounded-lg  py-4 shadow-xl shadow-black">
        {!loading && categoryFilteredByTerm.length === 0 && <p className="px-4 py-2">No categories found.</p>}
        {categoryFilteredByTerm.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={handleCategorySelect(category)}
            className="w-full bg-transparent px-4 py-2 text-left   hover:bg-black/10"
          >
            <span className="text-on-surface-variant/50">{category.ordering} / </span>{' '}
            <span className="text-on-surface-variant">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {error?.message && <p className="text-red-500">{error.message}</p>}
      <PopperOverMenu dropdown={Menu} onClickOutside={handleClickOutside}>
        <input
          className={clsx(inputClass, 'h-[46px]')}
          disabled={disabled}
          onFocus={handleOnFocus}
          value={categoryTerm}
          onChange={(e) => setCategoryTerm(e.target.value)}
          placeholder="Select a category"
        />
      </PopperOverMenu>
    </div>
  );
};
