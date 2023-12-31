import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Login } from 'components/form/Login';
import { Register } from 'components/form/Register';
import { useLoginMutation, useMeLazyQuery, useRegisterMutation } from 'generated-graphql/hooks';
import * as Types from 'generated-graphql/types';

export const AuthenticatorRouter = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [checkingAuthenticator, setCheckingAuthenticator] = useState(true);
  const [user, setUser] = useState<Pick<Types.User, 'id' | 'firstName' | 'lastName' | 'email'> | null>(null);
  const [me] = useMeLazyQuery();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { data } = await me();

        if (data?.me) {
          setIsLogged(true);
          setUser(data.me);
        }
      } catch {
        toast.error('something went wrong');
      }
      setCheckingAuthenticator(false);
    };
    checkAuthentication();
  }, [me]);

  const handleLogin = async (input: { email: string; password: string }) => {
    try {
      const { data } = await login({
        variables: {
          input,
        },
      });

      if (data?.authLogin?.token && data?.authLogin?.user) {
        window.localStorage.setItem('token', data.authLogin.token);
        setUser(data.authLogin.user);
        setIsLogged(true);
      } else {
        throw new Error('the login failed');
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('something went wrong');
        return;
      }

      toast.error(error.message);
    }
  };

  const handleRegister = async (input: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      const { data } = await register({
        variables: {
          input,
        },
      });

      if (data?.authRegister) {
        toast.success('Successfully registered! Try login now.');
      } else {
        throw new Error('the register failed');
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('something went wrong');
        return;
      }

      toast.error(error.message);
    }
  };

  if (checkingAuthenticator) {
    return (
      <main className="mx-auto max-w-screen-sm">
        <div className="flex h-screen items-center justify-center">
          <h1 className="animate-pulse text-5xl">loading...</h1>
        </div>
      </main>
    );
  }

  if (isLogged && user) {
    return (
      <>
        <header className="mb-4 bg-on-background/10">
          <div className="mx-auto flex max-w-screen-sm justify-between px-4 py-4">
            <h1 className="text-xl font-bold">Sort Tasks</h1>
            <h2 className="text-base font-bold">Hello, {user.firstName} 👋</h2>
          </div>
        </header>
        {children}
      </>
    );
  }

  return (
    <main className="mx-auto sm:max-w-screen-sm md:max-w-screen-md">
      <h1 className="my-14 text-center text-4xl font-bold">Sort Tasks</h1>
      <div className="flex flex-col space-y-8 pt-3 md:flex-row md:space-x-8 md:space-y-0">
        <div className="w-full bg-on-background bg-opacity-10 px-6 py-8 text-on-background sm:rounded-xl md:w-1/2">
          <div className="mx-auto max-w-md">
            <h2 className="my-2 mb-6 text-center text-xl font-bold">Login</h2>
            <Login onSubmit={handleLogin} />
          </div>
        </div>
        <div className="w-full bg-on-background bg-opacity-10 px-6 py-8 text-on-background  sm:rounded-xl  md:w-1/2">
          <div className="mx-auto max-w-md">
            <h2 className="mb-6 bg-opacity-10 text-center text-xl font-bold  ">Register</h2>
            <Register onSubmit={handleRegister} />
          </div>
        </div>
      </div>
    </main>
  );
};
