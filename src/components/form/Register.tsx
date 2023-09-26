import { useState } from 'react';

import { Input } from 'components/form/Input';
import { Button } from 'components/form/Button';

type RegisterProps = {
  onSubmit: (form: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
};

export const Register = ({ onSubmit }: RegisterProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <Input
            type="firstName"
            name="firstName"
            placeholder="first name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/2">
          <Input
            type="lastName"
            name="lastName"
            placeholder="last name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <Input
        type="email"
        name="email"
        placeholder="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'loading...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};
