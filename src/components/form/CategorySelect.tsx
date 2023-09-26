import clsx from 'clsx';
import { useState } from 'react';

import { Input } from 'components/form/Input';
import { useFindManyCategoryQuery } from 'generated-graphql/hooks';
import * as Types from 'generated-graphql/types';

type CategorySelectProps = {
  onChange: (categoryId: string) => void;
};

export const CategorySelect = ({ onChange }: CategorySelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [categoryTerm, setCategoryTerm] = useState('');

  const { data, loading, error } = useFindManyCategoryQuery();

  const handleCategoryTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryTerm(event.target.value);
  };

  const categories = data?.findManyCategory?.data ?? [];

  const categoryFilteredByTerm = categories.filter((category) => {
    const nameRegex = new RegExp(categoryTerm, 'i');
    return nameRegex.test(category.name);
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

  return (
    <div className="relative">
      {error?.message && <p className="text-red-500">{error.message}</p>}
      {!isFocused ? (
        <div
          className="border px-4 py-2 rounded-lg bg-white h-[42px] text-black  outline-purple-500 border-gray-900 outline-1 w-full"
          role="search"
          onClick={handleOnFocus}
        >
          {!categoryTerm ? <p className="text-gray-500">Select a category</p> : categoryTerm}
        </div>
      ) : (
        <Input
          type="text"
          placeholder="Select a category"
          defaultValue=""
          onChange={handleCategoryTermChange}
          autoFocus
        />
      )}
      <div
        className={clsx({
          hidden: !isFocused,
          block: isFocused,
        })}
      >
        {loading && <p>Loading...</p>}
        <div className="absolute top-full bg-[#423847] py-4 rounded-lg  shadow-black shadow-xl mt-2">
          {!loading && categoryFilteredByTerm.length === 0 && <p className="px-4 py-2">No categories found.</p>}
          {categoryFilteredByTerm.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={handleCategorySelect(category)}
              className="px-4 py-2 w-full text-left bg-transparent hover:bg-black hover:bg-opacity-10"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
