"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Nav from "../../../component/dashboard/Dernier Simulation/Nav";
import carre from "@/public/icons/dernierSimulation/Forme du logementCarré-01.png";
import Navigation from "@/app/component/dashboard/Dernier Simulation/Navigation";

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
];
const FormeDuLogement = [
  { text: "Carré", img: carre },
  { text: "Rectangulaire", img: carre },
  { text: "Forme en L", img: carre },
  { text: "Forme en U", img: carre },
];
const Mitoyenneté = [
  { text: "Mitoyenne sur 2 côtés", img: carre },
  { text: "mitoyenne sur un côté", img: carre },
  { text: "Indépendante  (4 façades)", img: carre },
];
const NombreDeNiveauxHabitables = [
  { text: "1 niveau (rez)", img: carre },
  { text: "2 niveaux (rez+1)", img: carre },
  { text: "3 niveaux ou + (rez+2 ou plus)", img: carre },
];

function DemarerSimulation() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  // State button variables to useform
  const [selectedButton, setSelectedButton] = useState(null);
  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    setValue("Forme du logement", buttonId);
  };

  // State variables for Mitoyenneté
  const [selectedMitoyennete, setSelectedMitoyennete] = useState(null);
  const handleButtonMitoyennete = (buttonId) => {
    setSelectedMitoyennete(buttonId);
    setValue("Mitoyenneté de la maison", buttonId);
  };
  // State variables for NombreDeNiveauxHabitables
  const [
    SelectedNombreDeNiveauxHabitables,
    setSelectedNombreDeNiveauxHabitables,
  ] = useState(null);

  const handleButtonNombreDeNiveauxHabitables = (buttonId) => {
    setSelectedNombreDeNiveauxHabitables(buttonId);
    setValue("Nombre de niveaux habitables", buttonId);
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const processForm = (data) => {
    if (data["Vos murs sont-ils isolés ?"] === "Non") {
      // Exclude "Année Isolation Plancher bas" from the data object
      const { ["Année Isolation murs"]: _, ...filteredData } = data;
      data = filteredData;
    }
    if (data["Plancher bas isolé ?"] === "Non") {
      const { ["Année Isolation Plancher bas"]: _, ...filteredData } = data;
      data = filteredData;
    }
    if (data["Plancher haut isolé ?"] === "Non") {
      const { ["Année Isolation Plancher Haut"]: _, ...filteredData } = data;
      data = filteredData;
    }
    console.log(data);
    // reset();
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
              Données générales{" "}
            </h1>
            <div className="mt-10 gap-x-6 gap-y-8  ">
              <div className="flex flex-row sm:flex-col ">
                <div className=" w-full">
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
                      className=" bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:max-w-xs sm:text-sm sm:leading-6"
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

                <div className="w-full ">
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
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:max-w-xs sm:text-sm sm:leading-6"
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
              </div>

              <div className="mt-[3rem] ">
                <label
                  htmlFor="FormeLogement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Forme du logement
                </label>

                <ul className="flex justify-evenly mt-6">
                  {FormeDuLogement.map((option, index) => (
                    <li
                      key={index}
                      className={`text-center py-[12px] px-[8px] border border-solid border-mainBlue h-[125px] flex w-[200px] ${
                        selectedButton === option.text
                          ? "activeGreen"
                          : "bg-white"
                      } flex-column justify-evenly items-center rounded-[1rem] boxHover`}
                      onClick={() => handleButtonClick(option.text)}
                    >
                      {/* <Image src={option.img} alt={option.text} width={47} height={47} className="rounded-[20%]" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="59"
                        viewBox="0 0 51 59"
                      >
                        <g
                          id="Groupe_1794"
                          data-name="Groupe 1794"
                          transform="translate(-676 -808)"
                        >
                          <g
                            id="Group_2"
                            data-name="Group 2"
                            transform="translate(676 808)"
                          >
                            <path
                              id="Combined_Shape"
                              data-name="Combined Shape"
                              d="M0,59V21.2L25.5,0,36.975,9.539V6.713h5.95v7.773L51,21.2V59Z"
                              transform="translate(0 0)"
                              fill="#ebeced"
                            />
                            <g
                              id="Path_2"
                              data-name="Path 2"
                              transform="translate(3.905 4.628)"
                              fill="#ebeced"
                              stroke-miterlimit="10"
                            >
                              <path
                                d="M 42.53225708007812 50.14931488037109 L 0.7499985694885254 50.14931488037109 L 0.7499985694885254 18.07347106933594 L 21.64538383483887 0.9693096280097961 L 42.53225708007812 18.07337951660156 L 42.53225708007812 50.14931488037109 Z"
                                stroke="none"
                              />
                              <path
                                d="M 21.64528846740723 1.938602447509766 L 1.5 18.42877578735352 L 1.5 49.39930725097656 L 41.78225708007812 49.39930725097656 L 41.78225708007812 18.42859268188477 L 21.64528846740723 1.938602447509766 M 21.64547920227051 -3.814697265625e-06 L 43.28225708007812 17.71816635131836 L 43.28225708007812 50.89930725097656 L 0 50.89930725097656 L 0 17.71816635131836 L 21.64547920227051 -3.814697265625e-06 Z"
                                stroke="none"
                                fill="#fff"
                              />
                            </g>
                          </g>
                          <g
                            id="Rectangle_257"
                            data-name="Rectangle 257"
                            transform="translate(680 831)"
                            fill="#909da2"
                            stroke="#fff"
                            stroke-width="1.5"
                          >
                            <rect width="43" height="17" stroke="none" />
                            <rect
                              x="0.75"
                              y="0.75"
                              width="41.5"
                              height="15.5"
                              fill="none"
                            />
                          </g>
                          <g
                            id="Rectangle_259"
                            data-name="Rectangle 259"
                            transform="translate(680 844)"
                            fill="#909da2"
                            stroke="#fff"
                            stroke-width="1.5"
                          >
                            <rect width="43" height="19" stroke="none" />
                            <rect
                              x="0.75"
                              y="0.75"
                              width="41.5"
                              height="17.5"
                              fill="none"
                            />
                          </g>
                        </g>
                      </svg>
                      <p className="m-0">{option.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-[3rem] ">
                <label
                  htmlFor="FormeLogement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mitoyenneté de la maison
                </label>

                <ul className="flex justify-evenly mt-6">
                  {Mitoyenneté.map((option, index) => (
                    <li
                      key={index}
                      className={`text-center py-[12px] px-[8px] border border-solid border-mainBlue h-[125px] flex w-[200px] ${
                        selectedMitoyennete === option.text
                          ? "activeGreen"
                          : "bg-white"
                      } flex-column justify-evenly items-center rounded-[1rem] boxHover`}
                      onClick={() => handleButtonMitoyennete(option.text)}
                    >
                      {/* <Image src={option.img} alt={option.text} width={47} height={47} className="rounded-[20%]" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="59"
                        viewBox="0 0 51 59"
                      >
                        <g
                          id="Groupe_1794"
                          data-name="Groupe 1794"
                          transform="translate(-676 -808)"
                        >
                          <g
                            id="Group_2"
                            data-name="Group 2"
                            transform="translate(676 808)"
                          >
                            <path
                              id="Combined_Shape"
                              data-name="Combined Shape"
                              d="M0,59V21.2L25.5,0,36.975,9.539V6.713h5.95v7.773L51,21.2V59Z"
                              transform="translate(0 0)"
                              fill="#ebeced"
                            />
                            <g
                              id="Path_2"
                              data-name="Path 2"
                              transform="translate(3.905 4.628)"
                              fill="#ebeced"
                              stroke-miterlimit="10"
                            >
                              <path
                                d="M 42.53225708007812 50.14931488037109 L 0.7499985694885254 50.14931488037109 L 0.7499985694885254 18.07347106933594 L 21.64538383483887 0.9693096280097961 L 42.53225708007812 18.07337951660156 L 42.53225708007812 50.14931488037109 Z"
                                stroke="none"
                              />
                              <path
                                d="M 21.64528846740723 1.938602447509766 L 1.5 18.42877578735352 L 1.5 49.39930725097656 L 41.78225708007812 49.39930725097656 L 41.78225708007812 18.42859268188477 L 21.64528846740723 1.938602447509766 M 21.64547920227051 -3.814697265625e-06 L 43.28225708007812 17.71816635131836 L 43.28225708007812 50.89930725097656 L 0 50.89930725097656 L 0 17.71816635131836 L 21.64547920227051 -3.814697265625e-06 Z"
                                stroke="none"
                                fill="#fff"
                              />
                            </g>
                          </g>
                          <g
                            id="Rectangle_257"
                            data-name="Rectangle 257"
                            transform="translate(680 831)"
                            fill="#909da2"
                            stroke="#fff"
                            stroke-width="1.5"
                          >
                            <rect width="43" height="17" stroke="none" />
                            <rect
                              x="0.75"
                              y="0.75"
                              width="41.5"
                              height="15.5"
                              fill="none"
                            />
                          </g>
                          <g
                            id="Rectangle_259"
                            data-name="Rectangle 259"
                            transform="translate(680 844)"
                            fill="#909da2"
                            stroke="#fff"
                            stroke-width="1.5"
                          >
                            <rect width="43" height="19" stroke="none" />
                            <rect
                              x="0.75"
                              y="0.75"
                              width="41.5"
                              height="17.5"
                              fill="none"
                            />
                          </g>
                        </g>
                      </svg>
                      <p className="m-0">{option.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-[3rem] ">
                <label
                  htmlFor="FormeLogement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre de niveaux habitables{" "}
                </label>

                <ul className="flex justify-evenly mt-6">
                  {NombreDeNiveauxHabitables.map((option, index) => (
                    <li
                      key={index}
                      className={`py-[12px] text-center px-[8px] border border-solid border-mainBlue h-[125px] flex w-[200px] ${
                        SelectedNombreDeNiveauxHabitables === option.text
                          ? "activeGreen"
                          : "bg-white"
                      } flex-column justify-evenly items-center rounded-[1rem] boxHover`}
                      onClick={() =>
                        handleButtonNombreDeNiveauxHabitables(option.text)
                      }
                    >
                      {/* <Image src={option.img} alt={option.text} width={47} height={47} className="rounded-[20%]" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="59"
                        viewBox="0 0 51 59"
                      >
                        <g
                          id="Groupe_1794"
                          data-name="Groupe 1794"
                          transform="translate(-676 -808)"
                        >
                          <g
                            id="Group_2"
                            data-name="Group 2"
                            transform="translate(676 808)"
                          >
                            <path
                              id="Combined_Shape"
                              data-name="Combined Shape"
                              d="M0,59V21.2L25.5,0,36.975,9.539V6.713h5.95v7.773L51,21.2V59Z"
                              transform="translate(0 0)"
                              fill="#ebeced"
                            />
                            <g
                              id="Path_2"
                              data-name="Path 2"
                              transform="translate(3.905 4.628)"
                              fill="#ebeced"
                              stroke-miterlimit="10"
                            >
                              <path
                                d="M 42.53225708007812 50.14931488037109 L 0.7499985694885254 50.14931488037109 L 0.7499985694885254 18.07347106933594 L 21.64538383483887 0.9693096280097961 L 42.53225708007812 18.07337951660156 L 42.53225708007812 50.14931488037109 Z"
                                stroke="none"
                              />
                              <path
                                d="M 21.64528846740723 1.938602447509766 L 1.5 18.42877578735352 L 1.5 49.39930725097656 L 41.78225708007812 49.39930725097656 L 41.78225708007812 18.42859268188477 L 21.64528846740723 1.938602447509766 M 21.64547920227051 -3.814697265625e-06 L 43.28225708007812 17.71816635131836 L 43.28225708007812 50.89930725097656 L 0 50.89930725097656 L 0 17.71816635131836 L 21.64547920227051 -3.814697265625e-06 Z"
                                stroke="none"
                                fill="#fff"
                              />
                            </g>
                          </g>
                          <g
                            id="Rectangle_257"
                            data-name="Rectangle 257"
                            transform="translate(680 831)"
                            fill="#909da2"
                            stroke="#fff"
                            stroke-width="1.5"
                          >
                            <rect width="43" height="17" stroke="none" />
                            <rect
                              x="0.75"
                              y="0.75"
                              width="41.5"
                              height="15.5"
                              fill="none"
                            />
                          </g>
                          <g
                            id="Rectangle_259"
                            data-name="Rectangle 259"
                            transform="translate(680 844)"
                            fill="#909da2"
                            stroke="#fff"
                            stroke-width="1.5"
                          >
                            <rect width="43" height="19" stroke="none" />
                            <rect
                              x="0.75"
                              y="0.75"
                              width="41.5"
                              height="17.5"
                              fill="none"
                            />
                          </g>
                        </g>
                      </svg>
                      <p className="m-0">{option.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-[3rem] ">
                <div class="flex flex-col gap-6 w-72">
                  <div class="relative h-11 w-full min-w-[200px]">
                    <input
                      type="number"
                      id="SurfaceHabitable"
                      {...register("Surface habitable")}
                      placeholder=" Surface habitable"
                      class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:mainBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label
                      htmlFor="FormeLogement"
                      class="block text-sm font-medium leading-6 text-black after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-mainBlue after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:mainBlue peer-focus:after:scale-x-100 peer-focus:after:border-mainBlue peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                      {" "}
                      Surface habitable
                    </label>
                  </div>
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
              Enveloppe thermique
            </h1>
            {/* Murs */}
            <div className="gap-x-6 gap-y-8">
              <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                Murs
              </h2>
              <div className="flex flex-col sm:flex-row px-[1rem] justify-between">
                <div className="sm:col-span-3 w-full">
                  <label
                    htmlFor="Vos murs sont-ils isolés ?"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Vos murs sont-ils isolés ?
                  </label>
                  <div className="mt-2">
                    <select
                      id="Vos murs sont-ils isolés ?"
                      {...register("Vos murs sont-ils isolés ?")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        ..
                      </option>
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                    {errors.mursEsole?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.mursEsole.message}
                      </p>
                    )}
                  </div>
                </div>
                {watch("Vos murs sont-ils isolés ?") === "Oui" && (
                  <div className="sm:col-span-3 w-full">
                    <label
                      htmlFor="Année Isolation murs"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Année d&apos;isolation
                    </label>
                    <div className="mt-2">
                      <select
                        id="Année Isolation murs"
                        {...register("Année Isolation murs")}
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
                      {errors.AnnéeIsolationMurs?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.AnnéeIsolationMurs.message}
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
              <div className="col-span-full px-[1rem]">
                <div className="flex">
                  <div className="mt-2 w-full">
                    <label
                      htmlFor="Type de plancher bas"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type de plancher bas{" "}
                    </label>
                    <select
                      id="Type de plancher bas"
                      {...register("Type de plancher bas")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        Choisissez
                      </option>
                      <option>sur vide sanitaire ou sous-sol</option>
                      <option>sur terre-plein</option>
                    </select>
                    {errors.TypeDeBlancherBas?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.TypeDeBlancherBas.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 w-full">
                    <label
                      htmlFor="Plancher bas isolé ?"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Plancher bas isolé ?{" "}
                    </label>
                    <select
                      id="Plancher bas isolé ?"
                      {...register("Plancher bas isolé ?")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        ..
                      </option>
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                    {errors.PlancherBasIsole?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.PlancherBasIsole.message}
                      </p>
                    )}
                  </div>
                </div>

                {watch("Plancher bas isolé ?") === "Oui" && (
                  <div className="sm:col-span-3 w-full mt-4">
                    <label
                      htmlFor="Année Isolation Plancher bas"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Année d&apos;isolation
                    </label>
                    <div className="mt-2">
                      <select
                        id="Année Isolation Plancher bas"
                        {...register("Année Isolation Plancher bas")}
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
                      {errors.AnnéeIsolationPlancherBasIsole?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.AnnéeIsolationPlancherBasIsole.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* plancher Haut */}
              <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                Plancher haut
              </h2>
              <div className="col-span-full px-[1rem]">
                <div className="flex">
                  <div className="mt-2 w-full">
                    <label
                      htmlFor="Nature plancher haut"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nature plancher haut
                    </label>
                    <select
                      id="Nature plancher haut"
                      {...register("Nature plancher haut")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        Choisissez
                      </option>
                      <option>Combles perdus (combles)</option>
                      <option>Combles aménagés (combles)</option>
                      <option>Toiture terrasse</option>
                    </select>
                    {errors.NaturePlancherHaut?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.NaturePlancherHaut.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 w-full">
                    <label
                      htmlFor="Plancher haut isolé ?"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Plancher haut isolé ?
                    </label>
                    <select
                      id="Plancher haut isolé ?"
                      {...register("Plancher haut isolé ?")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        ..
                      </option>
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                    {errors.PlancherHautIsolé?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.PlancherHautIsolé.message}
                      </p>
                    )}
                  </div>
                </div>

                {watch("Plancher haut isolé ?") === "Oui" && (
                  <div className="sm:col-span-3 w-full mt-4">
                    <label
                      htmlFor="Année Isolation Plancher Haut"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Année d&apos;isolation
                    </label>
                    <div className="mt-2">
                      <select
                        id="Année Isolation Plancher Haut"
                        {...register("Année Isolation Plancher Haut")}
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
                      {errors.AnnéeIsolationPlancherHaut?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.AnnéeIsolationPlancherHaut.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* plancher Haut */}
              <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                Vitrage
              </h2>
              <div className="col-span-full px-[1rem]">
                <div className="flex">
                  <div className="mt-2 w-full">
                    <label
                      htmlFor="Type de vitrage principal ?"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type de vitrage principal ?
                    </label>
                    <select
                      id="Type de vitrage principal ?"
                      {...register("Type de vitrage principal ?")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        Choisissez
                      </option>
                      <option>Simple vitrage</option>
                      <option>Double vitrage ancien</option>
                      <option>Double vitrage récent</option>
                      <option>Triple vitrage</option>
                    </select>
                    {errors.TypeDeVitragePrincipal?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.NaturePlancherHaut.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Enveloppe thermique
              </h1>
              {/* Murs */}
              <div className="gap-x-6 gap-y-8">
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Murs
                </h2>
                <div className="flex flex-col sm:flex-row px-[1rem] justify-between">
                  <div className="sm:col-span-3 w-full">
                    <label
                      htmlFor="Vos murs sont-ils isolés ?"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Vos murs sont-ils isolés ?
                    </label>
                    <div className="mt-2">
                      <select
                        id="Vos murs sont-ils isolés ?"
                        {...register("Vos murs sont-ils isolés ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          ..
                        </option>
                        <option>Oui</option>
                        <option>Non</option>
                      </select>
                      {errors.mursEsole?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.mursEsole.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {watch("Vos murs sont-ils isolés ?") === "Oui" && (
                    <div className="sm:col-span-3 w-full">
                      <label
                        htmlFor="Année Isolation murs"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Année d&apos;isolation
                      </label>
                      <div className="mt-2">
                        <select
                          id="Année Isolation murs"
                          {...register("Année Isolation murs")}
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
                        {errors.AnnéeIsolationMurs?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.AnnéeIsolationMurs.message}
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
                <div className="col-span-full px-[1rem]">
                  <div className="flex">
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Type de plancher bas"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type de plancher bas{" "}
                      </label>
                      <select
                        id="Type de plancher bas"
                        {...register("Type de plancher bas")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choisissez
                        </option>
                        <option>sur vide sanitaire ou sous-sol</option>
                        <option>sur terre-plein</option>
                      </select>
                      {errors.TypeDeBlancherBas?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.TypeDeBlancherBas.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Plancher bas isolé ?"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Plancher bas isolé ?{" "}
                      </label>
                      <select
                        id="Plancher bas isolé ?"
                        {...register("Plancher bas isolé ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          ..
                        </option>
                        <option>Oui</option>
                        <option>Non</option>
                      </select>
                      {errors.PlancherBasIsole?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.PlancherBasIsole.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {watch("Plancher bas isolé ?") === "Oui" && (
                    <div className="sm:col-span-3 w-full mt-4">
                      <label
                        htmlFor="Année Isolation Plancher bas"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Année d&apos;isolation
                      </label>
                      <div className="mt-2">
                        <select
                          id="Année Isolation Plancher bas"
                          {...register("Année Isolation Plancher bas")}
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
                        {errors.AnnéeIsolationPlancherBasIsole?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.AnnéeIsolationPlancherBasIsole.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* plancher Haut */}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Plancher haut
                </h2>
                <div className="col-span-full px-[1rem]">
                  <div className="flex">
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Nature plancher haut"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nature plancher haut
                      </label>
                      <select
                        id="Nature plancher haut"
                        {...register("Nature plancher haut")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choisissez
                        </option>
                        <option>Combles perdus (combles)</option>
                        <option>Combles aménagés (combles)</option>
                        <option>Toiture terrasse</option>
                      </select>
                      {errors.NaturePlancherHaut?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.NaturePlancherHaut.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Plancher haut isolé ?"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Plancher haut isolé ?
                      </label>
                      <select
                        id="Plancher haut isolé ?"
                        {...register("Plancher haut isolé ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          ..
                        </option>
                        <option>Oui</option>
                        <option>Non</option>
                      </select>
                      {errors.PlancherHautIsolé?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.PlancherHautIsolé.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {watch("Plancher haut isolé ?") === "Oui" && (
                    <div className="sm:col-span-3 w-full mt-4">
                      <label
                        htmlFor="Année Isolation Plancher Haut"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Année d&apos;isolation
                      </label>
                      <div className="mt-2">
                        <select
                          id="Année Isolation Plancher Haut"
                          {...register("Année Isolation Plancher Haut")}
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
                        {errors.AnnéeIsolationPlancherHaut?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.AnnéeIsolationPlancherHaut.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* plancher Haut */}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Vitrage
                </h2>
                <div className="col-span-full px-[1rem]">
                  <div className="flex">
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Type de vitrage principal ?"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type de vitrage principal ?
                      </label>
                      <select
                        id="Type de vitrage principal ?"
                        {...register("Type de vitrage principal ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choisissez
                        </option>
                        <option>Simple vitrage</option>
                        <option>Double vitrage ancien</option>
                        <option>Double vitrage récent</option>
                        <option>Triple vitrage</option>
                      </select>
                      {errors.TypeDeVitragePrincipal?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.NaturePlancherHaut.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Enveloppe thermique
              </h1>
              {/* Murs */}
              <div className="gap-x-6 gap-y-8">
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Murs
                </h2>
                <div className="flex flex-col sm:flex-row px-[1rem] justify-between">
                  <div className="sm:col-span-3 w-full">
                    <label
                      htmlFor="Vos murs sont-ils isolés ?"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Vos murs sont-ils isolés ?
                    </label>
                    <div className="mt-2">
                      <select
                        id="Vos murs sont-ils isolés ?"
                        {...register("Vos murs sont-ils isolés ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          ..
                        </option>
                        <option>Oui</option>
                        <option>Non</option>
                      </select>
                      {errors.mursEsole?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.mursEsole.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {watch("Vos murs sont-ils isolés ?") === "Oui" && (
                    <div className="sm:col-span-3 w-full">
                      <label
                        htmlFor="Année Isolation murs"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Année d&apos;isolation
                      </label>
                      <div className="mt-2">
                        <select
                          id="Année Isolation murs"
                          {...register("Année Isolation murs")}
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
                        {errors.AnnéeIsolationMurs?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.AnnéeIsolationMurs.message}
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
                <div className="col-span-full px-[1rem]">
                  <div className="flex">
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Type de plancher bas"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type de plancher bas{" "}
                      </label>
                      <select
                        id="Type de plancher bas"
                        {...register("Type de plancher bas")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choisissez
                        </option>
                        <option>sur vide sanitaire ou sous-sol</option>
                        <option>sur terre-plein</option>
                      </select>
                      {errors.TypeDeBlancherBas?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.TypeDeBlancherBas.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Plancher bas isolé ?"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Plancher bas isolé ?{" "}
                      </label>
                      <select
                        id="Plancher bas isolé ?"
                        {...register("Plancher bas isolé ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          ..
                        </option>
                        <option>Oui</option>
                        <option>Non</option>
                      </select>
                      {errors.PlancherBasIsole?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.PlancherBasIsole.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {watch("Plancher bas isolé ?") === "Oui" && (
                    <div className="sm:col-span-3 w-full mt-4">
                      <label
                        htmlFor="Année Isolation Plancher bas"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Année d&apos;isolation
                      </label>
                      <div className="mt-2">
                        <select
                          id="Année Isolation Plancher bas"
                          {...register("Année Isolation Plancher bas")}
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
                        {errors.AnnéeIsolationPlancherBasIsole?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.AnnéeIsolationPlancherBasIsole.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* plancher Haut */}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Plancher haut
                </h2>
                <div className="col-span-full px-[1rem]">
                  <div className="flex">
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Nature plancher haut"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nature plancher haut
                      </label>
                      <select
                        id="Nature plancher haut"
                        {...register("Nature plancher haut")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choisissez
                        </option>
                        <option>Combles perdus (combles)</option>
                        <option>Combles aménagés (combles)</option>
                        <option>Toiture terrasse</option>
                      </select>
                      {errors.NaturePlancherHaut?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.NaturePlancherHaut.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Plancher haut isolé ?"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Plancher haut isolé ?
                      </label>
                      <select
                        id="Plancher haut isolé ?"
                        {...register("Plancher haut isolé ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          ..
                        </option>
                        <option>Oui</option>
                        <option>Non</option>
                      </select>
                      {errors.PlancherHautIsolé?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.PlancherHautIsolé.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {watch("Plancher haut isolé ?") === "Oui" && (
                    <div className="sm:col-span-3 w-full mt-4">
                      <label
                        htmlFor="Année Isolation Plancher Haut"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Année d&apos;isolation
                      </label>
                      <div className="mt-2">
                        <select
                          id="Année Isolation Plancher Haut"
                          {...register("Année Isolation Plancher Haut")}
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
                        {errors.AnnéeIsolationPlancherHaut?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.AnnéeIsolationPlancherHaut.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* plancher Haut */}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Vitrage
                </h2>
                <div className="col-span-full px-[1rem]">
                  <div className="flex">
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="Type de vitrage principal ?"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type de vitrage principal ?
                      </label>
                      <select
                        id="Type de vitrage principal ?"
                        {...register("Type de vitrage principal ?")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choisissez
                        </option>
                        <option>Simple vitrage</option>
                        <option>Double vitrage ancien</option>
                        <option>Double vitrage récent</option>
                        <option>Triple vitrage</option>
                      </select>
                      {errors.TypeDeVitragePrincipal?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.NaturePlancherHaut.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </form>

      {/* Navigation */}
      <Navigation
        previousStep={previousStep}
        setPreviousStep={setPreviousStep}
        trigger={trigger}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
      />
    </section>
  );
}

export default DemarerSimulation;
