"use client";
import React from "react";
import { Container } from "../../ui/Container";
import { useForm } from "react-hook-form";
import { InputError } from "../../ui/InputError";
import Link from "next/link";

function MemberForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function processForm(data) {
    console.log(data);
  }
  return (
    <Container className="py-6">
      <form onSubmit={handleSubmit(processForm)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-0">
            <h2 className="text-2xl md:text-3xl font-medium  leading-7 text-gray-900 mt-3">
              Ajouter un membre
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              {/* name */}
              <div className="w-full">
                <label htmlFor="nom" className="pl-1.5 pb-3 font-medium">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  className={`px-3 w-full h-[45px] border rounded-md bg-white  border-gray-300 ${
                    errors.nom && "border-red-500 focus:outline-red-500"
                  }`}
                  placeholder="Entrez le nom "
                  {...register("nom", {
                    required: "Merci de remplir ce champ",
                  })}
                />
                {errors.prenom && (
                  <InputError message={errors?.prenom?.message} />
                )}
              </div>
              {/* prenom */}
              <div className="w-full">
                <label htmlFor="prenom" className="pl-1.5 pb-3 font-medium">
                  Prénom
                </label>
                <input
                  type="text"
                  id="Prenom"
                  className={`px-3 w-full h-[45px] border rounded-md bg-white border-gray-300 ${
                    errors.prenom && "border-red-500 focus:outline-red-500"
                  }`}
                  placeholder="Entrez le prénom"
                  {...register("prenom", {
                    required: "Merci de remplir ce champ",
                  })}
                />
                {errors.prenom && (
                  <InputError message={errors?.prenom?.message} />
                )}
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              {/* Email */}
              <div className="w-full ">
                <label htmlFor="email" className="pl-1.5 pb-3 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`px-3 w-full h-[45px] border border-gray-300  rounded-md bg-white ${
                    errors.email && "border-red-500 focus:outline-red-500"
                  }`}
                  placeholder="Entrez l'email"
                  {...register("email", {
                    required: "Merci de remplir ce champ",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Veuillez entrer un email valide",
                    },
                  })}
                />
                {errors.email && (
                  <InputError message={errors?.email?.message} />
                )}
              </div>

              {/* phone number */}
              <div className="w-full ">
                <label
                  htmlFor="phoneNumber"
                  className="pl-1.5 pb-3 font-medium"
                >
                  Numéro de téléphone
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
                    {...register("phoneNumber", {
                      required: "Merci de remplir ce champ",
                      pattern: {
                        value: /^\d{6,}$/, // Minimum of 6 digits
                        message:
                          "Le numéro de téléphone doit contenir au moins 6 chiffres.",
                      },
                    })}
                    type="tel"
                    placeholder="03 000 000 00"
                    id="phoneNumber"
                    aria-describedby="helper-text-explanation"
                    className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${
                      errors.phoneNumber &&
                      "border-red-500 focus:outline-red-500"
                    }`}
                  />
                </div>

                {errors.phoneNumber && (
                  <InputError message={`${errors.phoneNumber.message}`} />
                )}
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              {/* credits */}
              <div className="w-full">
                <label htmlFor="credits" className="pl-1.5 pb-3 font-medium">
                  Crédits
                </label>
                <div className="mt-2">
                  <input
                    {...register("credits", {
                      required: "Merci de remplir ce champ",
                    })}
                    type="number"
                    placeholder="Nombre de crédits"
                    min={0}
                    name="credits"
                    id="credits"
                    className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                      errors.address && "border-red-500 focus:outline-red-500"
                    }`}
                  />
                </div>
                {errors.credits && (
                  <InputError message={errors?.credits?.message} />
                )}
              </div>

              {/* role */}
              <div className="w-full ">
                <label htmlFor="role" className="pl-1.5 pb-3 font-medium">
                  Role
                </label>
                <div className="mt-2">
                  <select
                    {...register("role")}
                    defaultValue="User" // Set default value to "User"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </div>
              </div>

              {/* pack */}
              <div className="w-full flex flex-col">
                <label htmlFor="pack" className="pl-1.5 pb-3 font-medium">
                  Pack
                </label>
                <div className="mt-2">
                  <select
                    {...register("pack")}
                    placeholder="Pack"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              {/* adress */}
              <div className="w-full">
                <label htmlFor="address" className="pl-1.5 pb-3 font-medium">
                  Address
                </label>
                <textarea
                  {...register("address", {
                    required: "Merci de remplir ce champ",
                  })}
                  id="address"
                  placeholder="Address"
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.address && "border-red-500 focus:outline-red-500"
                  }`}
                />
                {errors.address && (
                  <InputError message={`${errors.address.message}`} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href="/dashboard/admin/users"
            className="w-[9rem] h-[2.7] text-center rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className=" w-[9rem] h-[2.7] rounded-md bg-mainBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ajouter{" "}
          </button>
        </div>
      </form>
    </Container>
  );
}
export default MemberForm;
