"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/icons/dernierSimulation/QuickAudit-04.png";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import axios from "axios";
import { InputError } from "@/app/component/ui/InputError";
import { InputPassword } from "@/app/component/ui/InputPassword";

function AuthPage() {
  const [loginError, setLoginError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("errors", errors);

  const { data: session, status } = useSession();
  console.log("login session", session);
  if (session && session?.user?.role === "admin") {
    return router.push("/dashboard/admin/users");
  }
  if (session && session?.user?.role === "Member") {
    return router.push("/dashboard/member/DemarerSimulation");
  }

  const handleLog = async (data) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.error) {
      setLoginError("L'email ou le mot de passe est incorrect.");
      console.log({ res });
      return;
    }
    router.refresh();
  };

  const handlereq = (data) => {
    axios
      .post("/api/register", data)
      .then((response) => {
        console.log("register created:", response.data);
        setIsLogin(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const clearLoginError = () => {
    setLoginError("");
  };
  return (
    <div className="py-6">
      <button onClick={() => signOut()}>Sign out</button>

      <div className="h-[90vh] w-[100vw] flex bg-white rounded-3xl shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-6xl">
        {/* image */}
        <div className="flex lg:w-1/2 bg-cover justify-center items-center bg-[#1e00b9]">
          <Image alt="logo" src={logo} width={400} height={400} />
        </div>

        {isLogin === true ? (
          <>
            {/* // login */}
            <form
              onSubmit={handleSubmit(handleLog)}
              className="w-full p-16 lg:w-1/2"
            >
              <p className="text-xl text-gray-600 text-center">Login</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-full"></span>
              </div>
              {/* email & pass */}
              <div className="mt-4">
                <div className="mb-5">
                  <label
                    htmlFor="Email"
                    className="font-semibold mb-4 block text-md text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Merci de remplir ce champ",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Veuillez entrer un email valide",
                      },
                    })}
                    className={`px-3 w-full h-[45px] border rounded-md ${
                      errors.email && "border-red-500 focus:outline-red-500"
                    }`}
                    placeholder="Entrer email"
                  />
                  {errors.email && (
                    <InputError message={`${errors.email.message}`} />
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="Password"
                    className="font-semibold mb-4 block text-md  text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <InputPassword
                    id="password"
                    name="password"
                    placeholder="Entrer mot de passe"
                    register={register}
                    validate={{ required: "Merci de remplir ce champ" }}
                    error={!!errors.password}
                  />

                  {errors.password && (
                    <InputError message={`${errors.password.message}`} />
                  )}
                </div>
              </div>
              {loginError !== "" && (
                <p className="  text-red-500 font-medium text-md sm:text-sm">
                  {loginError}
                </p>
              )}
              {/* button */}
              <div className="mt-8 w-full flex justify-center items-center text-center">
                <button
                  type="submit"
                  className="bg-[#1e00b9] w-[250px] text-white font-bold py-2 px-4 rounded hover:bg-mainBlue"
                >
                  Login
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-black font-medium text-sm m-0"></span>
                Don’t have an account yet?
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    clearLoginError();
                  }}
                  className="text-sm font-medium text-[#B1B0B8] hover:underline"
                >
                  Sign up now
                </button>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* // singup */}
            <form
              onSubmit={handleSubmit(handlereq)}
              className="w-full p-16 lg:w-1/2"
            >
              <p className="text-xl text-gray-600 text-center">Register</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-full "></span>
              </div>
              {/* email & pass */}
              <div className="mt-4">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className=" font-semibold mb-4 block text-md text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Merci de remplir ce champ",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Veuillez entrer un email valide",
                      },
                    })}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@ex.com"
                  />
                  {errors.email && (
                    <InputError message={`${errors.email.message}`} />
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="font-semibold mb-4 block text-md  text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.password && (
                    <span className="text-red-500">Password is required</span>
                  )}
                </div>
              </div>

              {loginError !== "" && (
                <p className="-mt-12 pt-8 text-red-500 font-medium text-sm">
                  {loginError}
                </p>
              )}
              {/* button */}
              <div className="mt-8 w-full flex justify-center items-center text-center">
                <button
                  type="submit"
                  className="bg-[#1e00b9] w-[250px] text-white font-bold py-2 px-4 rounded hover:bg-mainBlue"
                >
                  Register
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-black font-medium text-sm m-0"></span>
                You have an account
                <button
                  onClick={() => {
                    setIsLogin(true);
                    clearLoginError();
                  }}
                  className="text-sm font-medium text-[#B1B0B8] hover:underline"
                  type="button"
                >
                  Login
                </button>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
