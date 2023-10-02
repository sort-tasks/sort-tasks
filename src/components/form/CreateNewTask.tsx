import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from 'components/form/Button';
import { CategorySelect } from 'components/form/CategorySelect';
import { Input } from 'components/form/Input';

type CreateNewTaskProps = {
  onSubmit: (form: { title: string; categoryId: string }) => Promise<void>;
};

export const CreateNewTask = ({ onSubmit }: CreateNewTaskProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    categoryId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    console.log(categoryId);
    setForm({
      ...form,
      categoryId,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.categoryId) {
      toast.error('Please fill all fields');
      return;
    }

    setSubmitting(true);
    await onSubmit(form);
    setForm({
      ...form,
      title: '',
    });
    setSubmitting(false);
  };

  console.log(form.categoryId);

  return (
    <form onSubmit={handleSubmit} className="px-4 py-8">
      <div className="flex space-x-1">
        <div className="flex-1">
          <Input
            type="text"
            name="title"
            placeholder="write your task here"
            value={form.title}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div className="w-44">
          <CategorySelect categoryId={form.categoryId} onChange={handleCategoryChange} disabled={submitting} />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
