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
  const [registerError, setRegisterError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
        setRegisterError(error?.response?.data?.message);
      });
  };

  const clearLoginError = () => {
    setLoginError("");
  };

  const password = watch("password", "");

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <div className="h-[93vh] w-[100vw] flex bg-white rounded-3xl shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-[80rem]">
        {/* image */}
        <div className="flex lg:w-1/2 bg-cover justify-center items-center bg-[#1e00b9]">
          <Image alt="logo" src={logo} width={400} height={400} />
        </div>

        {isLogin === true ? (
          <>
            {/* // login */}
            <form
              onSubmit={handleSubmit(handleLog)}
              className="w-full p-16 lg:w-1/2 overflow-y-scroll"
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
              className=" overflow-y-scroll w-full p-16 lg:w-1/2"
            >
              <p className="text-xl text-gray-600 text-center">Register</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-full "></span>
              </div>
              {/* email & pass */}
              <div className="mt-4">
                {/* email */}
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
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                      errors.email && "border-red-500 focus:outline-red-500"
                    }`}
                    placeholder="name@ex.com"
                  />
                  {errors.email && (
                    <InputError message={`${errors.email.message}`} />
                  )}
                </div>

                {/* first name */}
                <div className="mb-5">
                  <label
                    htmlFor="firstName"
                    className={`font-semibold mb-4 block text-md  text-gray-900 `}
                  >
                    First Name
                  </label>
                  <input
                    {...register("firstName", {
                      required: "Merci de remplir ce champ",
                    })}
                    type="text"
                    id="firstName"
                    placeholder="firstName"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                      errors.firstName && "border-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.firstName && (
                    <InputError message={`${errors.firstName.message}`} />
                  )}
                </div>

                {/* last name */}
                <div className="mb-5">
                  <label
                    htmlFor="lastName"
                    className={`font-semibold mb-4 block text-md  text-gray-900 `}
                  >
                    Last Name
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Merci de remplir ce champ",
                    })}
                    type="text"
                    id="lastName"
                    placeholder="lastName"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                      errors.lastName && "border-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.lastName && (
                    <InputError message={`${errors.lastName.message}`} />
                  )}
                </div>

                {/* password */}
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className={`font-semibold mb-4 block text-md  text-gray-900 `}
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Merci de remplir ce champ",
                      minLength: {
                        value: 8,
                        message:
                          "Le mot de passe doit comporter au moins 8 caractères",
                      },
                    })}
                    type="password"
                    id="password"
                    placeholder="password"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                      errors.password && "border-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.password && (
                    <InputError message={`${errors.password.message}`} />
                  )}
                </div>

                {/*Confirm password */}
                <div className="mb-5">
                  <label
                    htmlFor="confirmPassword"
                    className="font-semibold mb-4 block text-md  text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Merci de remplir ce champ",
                      validate: (value) =>
                        value === password ||
                        "Les mots de passe doivent correspondre",
                    })}
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmer mot de passe"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                      errors.confirmPassword &&
                      "border-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <InputError message={`${errors.confirmPassword.message}`} />
                  )}
                </div>

                {/* phone number */}
                <div className="mb-5">
                  <label
                    htmlFor="phoneNumber"
                    className={`font-semibold mb-4 block text-md text-gray-900`}
                  >
                    Phone number:
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 19 18"
                      >
                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                      </svg>
                    </div>
                    <input
                      {...register("phoneNumber", {
                        required: "Merci de remplir ce champ",
                        pattern: {
                          value: /^\d{6,}$/, // Minimum of 6 digits
                          message:
                            "Le numéro de téléphone doit contenir au moins 6 chiffres.",
                        },
                      })}
                      type="tel"
                      id="phoneNumber"
                      aria-describedby="helper-text-explanation"
                      class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${
                        errors.phoneNumber &&
                        "border-red-500 focus:outline-red-500"
                      }`}
                    />
                  </div>

                  {errors.phoneNumber && (
                    <InputError message={`${errors.phoneNumber.message}`} />
                  )}
                </div>

                {/* address */}
                <div className="mb-5">
                  <label
                    htmlFor="address"
                    className={`font-semibold mb-4 block text-md text-gray-900`}
                  >
                    Address
                  </label>
                  <textarea
                    {...register("address", {
                      required: "Merci de remplir ce champ",
                    })}
                    id="address"
                    placeholder="Address"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                      errors.address && "border-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.address && (
                    <InputError message={`${errors.address.message}`} />
                  )}
                </div>
              </div>

              {registerError !== "" && (
                <p className="-mt-12 pt-8 text-red-500 font-medium text-sm">
                  {registerError}
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
