"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/icons/dernierSimulation/QuickAudit-04.png";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { InputError } from "@/app/component/ui/InputError";
import { InputPassword } from "@/app/component/ui/InputPassword";
import Link from "next/link";

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

  const { data: session } = useSession();
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
        <div className="rounded-2xl flex lg:w-1/2 bg-cover justify-center items-center bg-[#1e00b9]">
          <Image alt="logo" src={logo} width={400} height={400} />
        </div>

        {isLogin === true ? (
          <>
            {/* // login */}
            <form
              onSubmit={handleSubmit(handleLog)}
              className="w-full px-14 py-10 lg:w-1/2"
            >
              <p className=" text-heading font-[600] text-2xl mb-6 text-gray-600 text-center md:text-2xl ">
                Connexion
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-full"></span>
              </div>
              {/* email & pass */}
              <div className="mt-12">
                {/* email */}
                <div className="mb-5">
                  <label
                    htmlFor="Email"
                    className="font-medium mb-4 block text-md text-gray-900"
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
                {/* password */}
                <div className="mb-5">
                  <label
                    htmlFor="Password"
                    className="font-medium mb-4 block text-md  text-gray-900 dark:text-white"
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
                  Connexion
                </button>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="border-b w-full"></span>
              </div>

              <div className="pt-5 flex flex-col text-slate-600 gap-1 md:text-base text-sm">
                <p className="m-0"> Vous n'êtes pas membre de Quickaudit?</p>
                <Link
                  href="https://energyz.fr/"
                  target="_blank"
                  className="underline w-fit hover:text-slate-700 duration-300"
                >
                  en savoir plus sur nous
                </Link>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* // singup */}
            <form
              onSubmit={handleSubmit(handlereq)}
              className=" overflow-y-scroll w-full px-14 py-10 lg:w-1/2"
            >
              <p className=" text-heading font-[600] text-2xl mb-6 text-gray-600 text-center md:text-2xl">
                S&apos;inscrire
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-full "></span>
              </div>
              {/* email & pass */}
              <div className="mt-4">
                {/* last name */}
                <div className="mb-5">
                  <label
                    htmlFor="lastName"
                    className={`font-medium mb-4 block text-md  text-gray-900 `}
                  >
                    Nom
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Merci de remplir ce champ",
                    })}
                    type="text"
                    id="lastName"
                    placeholder="Entrer votre nom"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                      errors.lastName && "border-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.lastName && (
                    <InputError message={`${errors.lastName.message}`} />
                  )}
                </div>

                {/* first name */}
                <div className="mb-5">
                  <label
                    htmlFor="firstName"
                    className={`font-medium  mb-4 block text-md  text-gray-900 `}
                  >
                    Prénom
                  </label>
                  <input
                    {...register("firstName", {
                      required: "Merci de remplir ce champ",
                    })}
                    type="text"
                    id="firstName"
                    placeholder="Entrez votre prénom"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                      errors.firstName && "border-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.firstName && (
                    <InputError message={`${errors.firstName.message}`} />
                  )}
                </div>

                {/* email */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className=" font-medium mb-4 block text-md text-gray-900 "
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

                {/* password */}
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className={`font-medium mb-4 block text-md  text-gray-900 `}
                  >
                    Mot de passe
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
                    placeholder="Mot de passe"
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
                    className="font-medium mb-4 block text-md  text-gray-900 dark:text-white"
                  >
                    Confirmer le mot de passe
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
                    placeholder="Confirmer votre mot de passe"
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
                    htmlFor="phone"
                    className={`font-medium mb-4 block text-md text-gray-900`}
                  >
                    Numéro de téléphone :
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 19 18"
                      >
                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                      </svg>
                    </div>
                    <input
                      {...register("phone", {
                        required: "Merci de remplir ce champ",
                        pattern: {
                          value: /^\d{6,}$/, // Minimum of 6 digits
                          message:
                            "Le numéro de téléphone doit contenir au moins 6 chiffres.",
                        },
                      })}
                      type="tel"
                      id="phone"
                      placeholder="33 7 60 50 60 60"
                      aria-describedby="helper-text-explanation"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${
                        errors.phone && "border-red-500 focus:outline-red-500"
                      }`}
                    />
                  </div>

                  {errors.phone && (
                    <InputError message={`${errors.phone.message}`} />
                  )}
                </div>

                {/* address */}
                <div className="mb-5">
                  <label
                    htmlFor="address"
                    className={`font-medium mb-4 block text-md text-gray-900`}
                  >
                    Adresse
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
              <div className="mt-8 flex items-center justify-between">
                <span className="border-b w-full"></span>
              </div>
              <div className="mt-4 flex items-center gap-2 ">
                <span className="text-black font-medium text-sm m-0">
                  Vous avez un compte.
                </span>

                <button
                  onClick={() => {
                    setIsLogin(true);
                    clearLoginError();
                  }}
                  className=" text-sm font-medium text-[#B1B0B8] hover:underline"
                  type="button"
                >
                  Connexion
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
