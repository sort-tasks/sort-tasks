import { useState } from 'react';

import { Button } from 'components/form/Button';
import { Input, InputGroup } from 'components/form/Input';

type RegisterProps = {
  onSubmit: (form: { firstName: string; lastName: string; email: string; password: string }) => void;
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
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="w-full sm:w-1/2">
          <InputGroup>
            <Input
              type="firstName"
              name="firstName"
              placeholder="first name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>
        <div className="w-full sm:w-1/2">
          <InputGroup>
            <Input
              type="lastName"
              name="lastName"
              placeholder="last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>
      </div>
      <InputGroup>
        <Input type="email" name="email" placeholder="email" value={form.email} onChange={handleChange} required />
      </InputGroup>
      <InputGroup>
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'loading...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};
