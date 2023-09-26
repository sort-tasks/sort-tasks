import { useState } from 'react';

import { Input } from 'components/form/Input';
import { Select } from 'components/form/Select';
import { Button } from 'components/form/Button';

import { useFindManyCategoryQuery } from 'generated-graphql/hooks';

type CreateNewTaskProps = {
  onSubmit: (form: { name: string; categoryId: string }) => Promise<void>;
};

export const CreateNewTask = ({ onSubmit }: CreateNewTaskProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    categoryId: '',
  });

  const { data, loading: loadingCategories, error } = useFindManyCategoryQuery();

  const categories = data?.findManyCategory?.data ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(form);
    setForm({
      name: '',
      categoryId: '',
    });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-dashed border-gray-700 mt-8 mb-8 pb-8">
      {error?.message && <p className="text-red-500">{error.message}</p>}
      <div className="flex space-x-1">
        <div className="flex-1">
          <Input
            type="text"
            name="name"
            placeholder="write your task here"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-44">
          <Select name="categoryId" disabled={loadingCategories} onChange={handleChange} required>
            {loadingCategories ? <option>loading</option> : <option>select category</option>}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <Button type="submit" disabled={submitting || loadingCategories}>
          {submitting ? 'loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
