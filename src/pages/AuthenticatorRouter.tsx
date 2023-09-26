import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Types from 'generated-graphql/types';
import { useMeLazyQuery, useLoginMutation, useRegisterMutation } from 'generated-graphql/hooks';

import { Login } from 'components/form/Login';
import { Register } from 'components/form/Register';

export const AuthenticatorRouter = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [checkingAuthenticator, setCheckingAuthenticator] = useState(true);
  const [user, setUser] = useState<Pick<
    Types.User,
    'id' | 'firstName' | 'lastName' | 'email'
  > | null>(null);
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

  const handleRegister = async (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
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
      <main className="max-w-screen-sm mx-auto">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-5xl animate-pulse">loading...</h1>
        </div>
      </main>
    );
  }

  if (isLogged && user) {
    return (
      <>
        <header className=" bg-gray-100 bg-opacity-10">
          <div className="max-w-screen-sm mx-auto py-4 mb-4 flex justify-between">
            <h1 className="text-xl font-bold">Sort Tasks</h1>
            <h2 className="text-base font-bold">Hello, {user.firstName} 👋</h2>
          </div>
        </header>
        {children}
      </>
    );
  }

  return (
    <main className="max-w-screen-sm mx-auto">
      <div className="flex space-x-8 pt-36">
        <div className="border-y border-gray-700 px-6 py-8  bg-gray-400   bg-opacity-10  sm:rounded-xl sm:border-x w-1/2">
          <h2 className="text-xl font-bold my-2 sm:bg-transparent bg-gray-500 bg-opacity-10  text-center mb-6">
            Login
          </h2>
          <Login onSubmit={handleLogin} />
        </div>
        <div className="border-y border-gray-700 px-6 py-8   bg-gray-400   bg-opacity-10  sm:rounded-xl sm:border-x  w-1/2">
          <h2 className="text-xl font-bold  sm:bg-transparent bg-gray-500 bg-opacity-10 text-center  mb-6">
            Register
          </h2>
          <Register onSubmit={handleRegister} />
        </div>
      </div>
    </main>
  );
};
