"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Nav from "../../module/dashboard/DernierSimulation/Nav";

const steps = [
  {
    id: "Step 1",
    name: "données générales",
    fields: ["Code du département", "lastName", "email"],
  },
  {
    id: "Step 2",
    name: "Enveloppe thermique",
    fields: ["country", "state", "city", "street", "zip"],
  },
  {
    id: "Step 3",
    name: "systèmes techniques",
    fields: ["country", "state", "city", "street", "zip"],
  },
  {
    id: "Step 4",
    name: "Mon foyer",
    fields: ["country", "state", "city", "street", "zip"],
  },
  { id: "Step 5", name: "Complete" },
];

function DemarerSimulation() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const processForm = (data) => {
    console.log(data);
    reset();
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep((step) => step + 1);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep((step) => step - 1);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="gap-[2rem] inset-0 flex flex-col justify-between p-[2rem]">
      <Nav steps={steps} currentStep={currentStep} />

      {/* Form */}
      <form className="px-[2rem]" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              données générales{" "}
            </h1>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className=" ">
                <label
                  htmlFor="CodeDepartement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Code du département
                </label>
                <div className="mt-2">
                  <select
                    id="CodeDepartement"
                    {...register("CodeDepartement")}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {[...Array(99).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                  {errors.CodeDepartement?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.CodeDepartement.message}
                    </p>
                  )}
                </div>
              </div>

              <div className=" ">
                <label
                  htmlFor="AnneConstruction"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Année de construction du logement
                </label>
                <div className="mt-2">
                  <select
                    id="AnneConstruction"
                    {...register("AnneConstruction")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled selected>
                      choose one item
                    </option>
                    <option>Avant 1975</option>
                    <option>de 1975 à 1977</option>
                    <option>de 1978 à 1982</option>
                    <option>de 1983 à 1988</option>
                    <option>de 1989 à 2000</option>
                    <option>de 2001 à 2005</option>
                    <option>de 2005 à 2012</option>
                    <option>à partir de 2012</option>
                  </select>
                  {errors.CodeDepartement?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.CodeDepartement.message}
                    </p>
                  )}
                </div>
              </div>

              <div className=" ">
                <label
                  htmlFor="FormeLogement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Forme du logement
                </label>
                <div className="mt-2">
                  <select
                    id="FormeLogement"
                    {...register("FormeLogement")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled selected>
                      choose one item
                    </option>
                    <option>Carré</option>
                    <option>Rectangulaire</option>
                    <option>Forme en L</option>
                    <option>Forme en U</option>
                  </select>
                  {errors.FormeLogement?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.FormeLogement.message}
                    </p>
                  )}
                </div>
              </div>

              <div className=" ">
                <label
                  htmlFor="Mitoyennete"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mitoyenneté de la maison{" "}
                </label>
                <div className="mt-2">
                  <select
                    id="Mitoyennete"
                    {...register("Mitoyennete")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled selected>
                      choose one item
                    </option>
                    <option>Mitoyenne sur 2 côtés</option>
                    <option>mitoyenne sur un côté</option>
                    <option>Indépendante (4 façades)</option>
                  </select>
                  {errors.Mitoyennete?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Mitoyennete.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="NiveauxHabitables"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre de niveaux habitables
                </label>
                <div className="mt-2">
                  <select
                    id="NiveauxHabitables"
                    {...register("NiveauxHabitables")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled selected>
                      choose one item
                    </option>
                    <option>1 niveau (rez)</option>
                    <option>2 niveaux (rez+1)</option>
                    <option>3 niveaux ou + (rez+2 ou plus)</option>
                  </select>
                  {errors.NiveauxHabitables?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.NiveauxHabitables.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="Surface"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Surface habitable{" "}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="Surface"
                    {...register("Surface")}
                    className="block w-[320px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.Surface?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Surface.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Mitoyenneté de la maison
            </h1>

            <h2 className="text-base font-semibold leading-7 text-gray-700 mt-10">
              Murs{" "}
            </h2>

            <div className="mt-6   gap-x-6 gap-y-8  ">
              <div className="flex flex-col sm:flex-row gap-[2rem] justify-between">
                <div className="sm:col-span-3 w-full">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Vos murs sont-ils isolés ?
                  </label>
                  <div className="mt-2">
                    <select
                      id="murs"
                      {...register("murs")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        ..
                      </option>
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                    {errors.murs?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.murs.message}
                      </p>
                    )}
                  </div>
                </div>
                {watch("murs") === "Oui" && (
                  <div className="sm:col-span-3 w-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Année d&apos;isolation
                    </label>
                    <div className="mt-2">
                      <select
                        id="name"
                        {...register("name")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choisissez
                        </option>
                        <option>Avant 1975</option>
                        <option>de 1975 à 1977</option>
                        <option>de 1978 à 1982</option>
                        <option>de 1983 à 1988</option>
                        <option>de 1989 à 2000</option>
                        <option>de 2001 à 2005</option>
                        <option>de 2005 à 2012</option>
                        <option>à partir de 2012</option>
                      </select>
                      {errors.name?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* plancher bas */}
              <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                Plancher bas
              </h2>
              <div className="col-span-full">
                <label
                  htmlFor="PlancherBas"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type de plancher bas{" "}
                </label>
                <div className="mt-2">
                  <select
                    id="PlancherBas"
                    {...register("PlancherBas")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled selected>
                      Choisissez
                    </option>
                    <option>sur vide sanitaire ou sous-sol</option>
                    <option>sur terre-plein</option>
                  </select>
                  {errors.PlancherBas?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.PlancherBas.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
        {currentStep === 3 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
        {currentStep === 4 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
            <button type="submit">submit</button>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default DemarerSimulation;
