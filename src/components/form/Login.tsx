import { useState } from 'react';

import { Button } from 'components/form/Button';
import { Input, InputGroup } from 'components/form/Input';

type LoginProps = {
  onSubmit: (form: { email: string; password: string }) => void;
};

export const Login = ({ onSubmit }: LoginProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleOnSubmit} className="">
      <InputGroup>
        <Input type="email" placeholder="email" name="email" value={form.email} onChange={handleChange} required />
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
          {submitting ? 'loading...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};
