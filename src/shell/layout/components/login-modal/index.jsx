import { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useMutation } from "@apollo/client";

import {
  isLoggedInState,
  loggingInErrorsState,
  userRoleState,
} from "@atoms/user/index.js";

import { LOGIN_MUTATION } from "@mutations/login/index.js";

export default function LoginModal() {
  let [isOpen, setIsOpen] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [loggingInErrors, setLogginInErrors] =
    useRecoilState(loggingInErrorsState);
  const setUserRole = useSetRecoilState(userRoleState);

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async ({ username, password }) => {
    setLogginInErrors({ hasErrors: false, message: "" });
    try {
      const { data } = await login({
        variables: {
          username,
          password,
        },
      });
      const { token, user } = data.login;
      localStorage.setItem("auth_token", token);
      setIsLoggedIn(true);
      setUserRole(user.role);
      closeModal();
    } catch (err) {
      setLogginInErrors({ hasErrors: true, message: err.toString() });
      console.log(err);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Login
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className={`flex flex-col`}
                    >
                      <label htmlFor="username" className={`py-2`}>
                        Username:
                      </label>
                      <input
                        className={`my-2 rounded-sm p-1 ring-2 ring-gray-300 focus:outline-amber-300`}
                        type="text"
                        id="username"
                        {...register("username", {
                          required: "Insert the username",
                        })}
                      />
                      {errors.username && (
                        <span>{errors.username.message}</span>
                      )}
                      <label htmlFor="password" className={`py-2`}>
                        Password:
                      </label>
                      <input
                        className={`my-2 rounded-sm p-1 ring-2 ring-gray-300 focus:outline-amber-300`}
                        type="password"
                        id="password"
                        {...register("password", {
                          required: "Insert the password",
                        })}
                      />
                      {errors.password && (
                        <span>{errors.password.message}</span>
                      )}
                      <button
                        type="submit"
                        className="mt-4 inline-flex w-32 justify-center rounded-md border
                        border-transparent bg-amber-300 px-4 py-2 text-sm font-medium text-amber-900
                        hover:bg-amber-500 focus:outline-none focus-visible:ring-2
                        focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                  {loggingInErrors.hasErrors && (
                    <p className={`p-4 text-center text-red-600`}>
                      {loggingInErrors.message}
                    </p>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
