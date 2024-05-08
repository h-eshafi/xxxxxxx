"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Nav from "../../../component/dashboard/Dernier Simulation/Nav";
import carre from "@/public/icons/dernierSimulation/ICON QuickAudit-01.png";
import rectangle from "@/public/icons/dernierSimulation/ICON QuickAudit-02.png";
import formaU from "@/public/icons/dernierSimulation/ICON QuickAudit-04.png";
import formaL from "@/public/icons/dernierSimulation/ICON QuickAudit-03.png";
import mitoyenne1 from "@/public/icons/dernierSimulation/Mitoyenne sur 2 côtés-05.png";
import mitoyenne2 from "@/public/icons/dernierSimulation/ mitoyenne sur un côté-06.png";
import mitoyenne3 from "@/public/icons/dernierSimulation/Indépendante (4 façades)-07.png";
import niv1 from "@/public/icons/dernierSimulation/1 niveau -08.png";
import niv2 from "@/public/icons/dernierSimulation/2 niveau -09.png";
import niv3 from "@/public/icons/dernierSimulation/ 3 niveaux-10.png";
import Navigation from "@/app/component/dashboard/Dernier Simulation/Navigation";

const steps = [
  {
    id: "Step 1",
    fields: [
      "CodeDepartement",
      "AnneConstruction",
      "Forme du logement",
      "Surface habitable",
    ],
  },
  {
    id: "Step 2",
    fields: [
      "Vos murs sont-ils isolés ?",
      "Type de plancher bas",
      "Plancher bas isolé ?",
      "Année Isolation Plancher bas",
      "Nature plancher haut",
      "Plancher haut isolé ?",
      "Année Isolation Plancher Haut",
      "Type de vitrage principal ?",
    ],
  },
  {
    id: "Step 3",
    fields: [
      "Type de ventilation",
      "Type Energie de chauffage",
      "Systeme de chauffage",
      "Avezvous un systeme de chauffage dappoint?",
      "Type Energie de chauffage appoint",
      "Systeme de chauffage appoint",
      "Type denergie de production dEau chaude sanitaire",
      "Type dinstallation ECS",
      "Type denergie de production dEau chaude sanitaire",
    ],
  },
  {
    id: "Step 4",
    fields: [
      "Revenu fiscal de référence Saisie libre Combien de personnes",
      "composent votre foyer vous compris ?",
      "Votre logement est construit depuis au moins 15 ans ?",
      "Votre logement est occupé à titre de résidence",
    ],
  },
];
const FormeDuLogement = [
  { text: "Carré", img: carre },
  { text: "Rectangulaire", img: rectangle },
  { text: "Forme en L", img: formaL },
  { text: "Forme en U", img: formaU },
];
const Mitoyenneté = [
  { text: "Mitoyenne sur 2 côtés", img: mitoyenne1 },
  { text: "mitoyenne sur un côté", img: mitoyenne2 },
  { text: "Indépendante  (4 façades)", img: mitoyenne3 },
];
const NombreDeNiveauxHabitables = [
  { text: "1 niveau (rez)", img: niv1 },
  { text: "2 niveaux (rez+1)", img: niv2 },
  { text: "3 niveaux ou + (rez+2 ou plus)", img: niv3 },
];

function DemarerSimulation() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  // State button variables to logement
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
    console.log(trigger);
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
                      className=" bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("CodeDepartement") === ""}
                      >
                        Sélectionnez une réponse
                      </option>
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
                      <option
                        value=""
                        disabled={watch("AnneConstruction") === ""}
                      >
                        Sélectionnez une réponse
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
                      <Image
                        src={option.img}
                        alt={option.text}
                        width={47}
                        height={47}
                        className="rounded-[20%]"
                      />

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
                      <Image
                        src={option.img}
                        alt={option.text}
                        width={47}
                        height={47}
                        className="rounded-[20%]"
                      />

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
                      <Image
                        src={option.img}
                        alt={option.text}
                        width={47}
                        height={47}
                        className="rounded-[20%]"
                      />

                      <p className="m-0">{option.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-[3rem] ">
                <div className="flex flex-col gap-6 w-[40%]">
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      type="number"
                      id="SurfaceHabitable"
                      {...register("Surface habitable")}
                      placeholder=" Surface habitable"
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:mainBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label
                      htmlFor="FormeLogement"
                      className="block text-sm font-medium leading-6 text-black after:content[' '] pointer-events-none absolute left-0  -top-[1rem] flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight transition-all after:absolute after:-bottom-[1rem] after:block after:w-full after:scale-x-0 after:border-b-2 after:border-mainBlue after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:mainBlue peer-focus:after:scale-x-100 peer-focus:after:border-mainBlue peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
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
              Systèmes énergétiques
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
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("Vos murs sont-ils isolés ?") === ""}
                      >
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
                        className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option
                          value=""
                          disabled={watch("Année Isolation murs") === ""}
                        >
                          Sélectionnez une réponse
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
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled>Sélectionnez une réponse</option>
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
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("Plancher bas isolé ?") === ""}
                      >
                        Sélectionnez une réponse{" "}
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
                        className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option
                          value=""
                          disabled={
                            watch("Année Isolation Plancher bas") === ""
                          }
                        >
                          Sélectionnez une réponse
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
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("Nature plancher haut") === ""}
                      >
                        Sélectionnez une réponse
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
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("Plancher haut isolé ?") === ""}
                      >
                        Sélectionnez une réponse
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
                        className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option
                          value=""
                          disabled={
                            watch("Année Isolation Plancher Haut") === ""
                          }
                        >
                          Sélectionnez une réponse
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

              {/* Vitrage */}
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
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("Type de vitrage principal ?") === ""}
                      >
                        Sélectionnez une réponse
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

              <div className="gap-x-6 gap-y-8">
                {/* Ventilation */}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Ventilation
                </h2>
                <div className="sm:col-span-3 w-full px-[1rem]">
                  <label
                    htmlFor="Type de ventilation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type de ventilation
                  </label>
                  <div className="mt-2">
                    <select
                      id="Type de ventilation"
                      {...register("Type de ventilation")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("Type de ventilation") === ""}
                      >
                        ...
                      </option>
                      <option>Ventilation par ouverture des fenêtres</option>
                      <option>
                        Ventilation mécanique auto-réglable avant 1982
                      </option>
                      <option>
                        Ventilation mécanique auto-réglable après 1982
                      </option>
                      <option>
                        Ventilation mécanique à extraction hygroréglable
                      </option>
                      <option>
                        Ventilation mécanique double flux avec échangeur
                      </option>
                      <option>
                        Ventilation mécanique double flux sans échangeur
                      </option>
                    </select>
                    {errors.Typedeventilation?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.Typedeventilation.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Chauffage */}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Chauffage
                </h2>
                <div className="col-span-full px-[1rem] flex ">
                  <div className=" mt-2 w-full">
                    <label
                      htmlFor="Type Energie de chauffage"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type d&apos;énergie de chauffage
                    </label>
                    <select
                      id="Type Energie de chauffage"
                      {...register("Type Energie de chauffage")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("Type Energie de chauffage") === ""}
                      >
                        Sélectionnez une réponse
                      </option>
                      <option>Gaz</option>
                      <option>Fioul</option>
                      <option>Bois</option>
                      <option>Electrique</option>
                      <option>GPL</option>
                      <option>Solaire</option>
                    </select>
                    {errors.NaturePlancherHaut?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.NaturePlancherHaut.message}
                      </p>
                    )}
                  </div>

                  {watch("Type Energie de chauffage") === "Gaz" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Systeme de chauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="Systeme de chauffage"
                          {...register("Systeme de chauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Systeme de chauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chaudière gaz classique</option>
                          <option>Chaudière gaz Basse</option>
                          <option>Température</option>
                          <option>Chaudière gaz récente à condensation</option>
                        </select>
                        {errors && errors["Systeme de chauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Systeme de chauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("Type Energie de chauffage") === "Fioul" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Systeme de chauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="Systeme de chauffage"
                          {...register("Systeme de chauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Systeme de chauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chaudière fioul</option>
                          <option>Poêle fioul</option>
                        </select>
                        {errors && errors["Systeme de chauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Systeme de chauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("Type Energie de chauffage") === "Bois" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Systeme de chauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="Systeme de chauffage"
                          {...register("Systeme de chauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Systeme de chauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chaudière bois ancienne</option>
                          <option>Chaudière bois récente</option>
                          <option>Poêle à granulés</option>
                        </select>
                        {errors && errors["Systeme de chauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Systeme de chauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("Type Energie de chauffage") === "Electrique" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Systeme de chauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="Systeme de chauffage"
                          {...register("Systeme de chauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Systeme de chauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Convecteur électriquee</option>
                          <option>Panneau rayonnant électrique</option>
                          <option>PAC air/air</option>
                          <option>PAC air/eau</option>
                          <option>PAC eau/eau</option>
                          <option>PAC Géothermie</option>
                        </select>
                        {errors && errors["Systeme de chauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Systeme de chauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("Type Energie de chauffage") === "GPL" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Systeme de chauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="Systeme de chauffage"
                          {...register("Systeme de chauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Systeme de chauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Poêle GPL</option>
                        </select>
                        {errors && errors["Systeme de chauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Systeme de chauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("Type Energie de chauffage") === "Solaire" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Systeme de chauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="Systeme de chauffage"
                          {...register("Systeme de chauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Systeme de chauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chauffage solaire</option>
                        </select>
                        {errors && errors["Systeme de chauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Systeme de chauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Chauffage d'appoint */}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Chauffage d&apos;appoint
                </h2>
                <div className="col-span-full px-[1rem] flex flex-col gap-5">
                  <div className=" mt-2 w-full">
                    <label
                      htmlFor="Avez-vous un systeme de chauffage dappoint?"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Avez-vous un système de chauffage d&apos;appoint?
                    </label>
                    <select
                      id="Avezvous un systeme de chauffage dappoint?"
                      {...register(
                        "Avezvous un systeme de chauffage dappoint?"
                      )}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={
                          watch(
                            "Avezvous un systeme de chauffage dappoint?"
                          ) === ""
                        }
                      >
                        Sélectionnez une réponse
                      </option>
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                    {errors.NaturePlancherHaut?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.NaturePlancherHaut.message}
                      </p>
                    )}
                  </div>
                  {watch("Avezvous un systeme de chauffage dappoint?") ===
                    "Oui" && (
                    <div className="col-span-full flex">
                      <div className=" mt-2 w-full">
                        <label
                          htmlFor="Type Energie de chauffage appoint"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Type d&apos;énergie de chauffage
                        </label>
                        <select
                          id="Type Energie de chauffage appoint"
                          {...register("Type Energie de chauffage appoint")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={
                              watch("Type Energie de chauffage appoint") === ""
                            }
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Gaz</option>
                          <option>Fioul</option>
                          <option>Bois</option>
                          <option>Electrique</option>
                          <option>GPL</option>
                        </select>
                        {errors.NaturePlancherHautappoint?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.NaturePlancherHautappoint.message}
                          </p>
                        )}
                      </div>

                      {watch("Type Energie de chauffage appoint") === "Gaz" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="Systeme de chauffage appoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="Systeme de chauffage appoint"
                              {...register("Systeme de chauffage appoint")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("Systeme de chauffage appoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Chaudière gaz classique</option>
                              <option>Chaudière gaz Basse</option>
                              <option>Température</option>
                              <option>
                                Chaudière gaz récente à condensation
                              </option>
                            </select>
                            {errors &&
                              errors["Systeme de chauffage appoint"] && (
                                <p className="mt-2 text-sm text-red-400">
                                  {
                                    errors["Systeme de chauffage appoint"]
                                      .message
                                  }
                                </p>
                              )}
                          </div>
                        </div>
                      )}
                      {watch("Type Energie de chauffage appoint") ===
                        "Fioul" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="Systeme de chauffage appoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="Systeme de chauffage appoint"
                              {...register("Systeme de chauffage appoint")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("Systeme de chauffage appoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Chaudière fioul</option>
                              <option>Poêle fioul</option>
                            </select>
                            {errors &&
                              errors["Systeme de chauffage appoint"] && (
                                <p className="mt-2 text-sm text-red-400">
                                  {
                                    errors["Systeme de chauffage appoint"]
                                      .message
                                  }
                                </p>
                              )}
                          </div>
                        </div>
                      )}
                      {watch("Type Energie de chauffage appoint") ===
                        "Bois" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="Systeme de chauffage appoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="Systeme de chauffage appoint"
                              {...register("Systeme de chauffage")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("Systeme de chauffage appoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Chaudière bois ancienne</option>
                              <option>Chaudière bois récente</option>
                              <option>Poêle à granulés</option>
                            </select>
                            {errors && errors["Systeme de chauffage"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["Systeme de chauffage"].message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {watch("Type Energie de chauffage appoint") ===
                        "Electrique" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="Systeme de chauffage"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="Systeme de chauffage"
                              {...register("Systeme de chauffage")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("Systeme de chauffage appoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Convecteur électriquee</option>
                              <option>Panneau rayonnant électrique</option>
                              <option>PAC air/air</option>
                              <option>PAC air/eau</option>
                              <option>PAC eau/eau</option>
                              <option>PAC Géothermie</option>
                            </select>
                            {errors && errors["Systeme de chauffage"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["Systeme de chauffage"].message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {watch("Type Energie de chauffage appoint") === "GPL" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="Systeme de chauffage"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="Systeme de chauffage"
                              {...register("Systeme de chauffage")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("Systeme de chauffage appoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Poêle GPL</option>
                            </select>
                            {errors && errors["Systeme de chauffage"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["Systeme de chauffage"].message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Eau chaude sanitaire*/}
                <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                  Eau chaude sanitaire
                </h2>
                <div className="col-span-full px-[1rem] flex  gap-5 ">
                  <div className=" mt-2 w-full">
                    <label
                      htmlFor="Type denergie de production dEau chaude sanitaire"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type d&apos;énergie de production d&apos;Eau chaude
                      sanitaire
                    </label>
                    <select
                      id="Type denergie de production dEau chaude sanitaire"
                      {...register(
                        "Type denergie de production dEau chaude sanitaire"
                      )}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={
                          watch(
                            "Type denergie de production dEau chaude sanitaire"
                          ) === ""
                        }
                      >
                        Sélectionnez une réponse
                      </option>
                      <option>Gaz</option>
                      <option>Electrique</option>
                      <option>Système de chauffage</option>
                      <option>Solaire</option>
                    </select>
                    {errors.dNaturePlancherHaut?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.dNaturePlancherHaut.message}
                      </p>
                    )}
                  </div>
                  {watch(
                    "Type denergie de production dEau chaude sanitaire"
                  ) === "Gaz" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Type dinstallation ECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="Type dinstallation ECS"
                          {...register("Type dinstallation ECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Type dinstallation ECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chauffe-eau gaz ancien</option>
                          <option>Chauffe-eau gaz récent</option>
                          <option>Chauffe-eau électrique</option>
                          <option>Chauffe-eau</option>
                        </select>
                        {errors && errors["Type dinstallation ECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Type dinstallation ECS"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch(
                    "Type denergie de production dEau chaude sanitaire"
                  ) === "Electrique" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Type dinstallation ECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="Type dinstallation ECS"
                          {...register("Type dinstallation ECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Type dinstallation ECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>thermodynamique</option>
                        </select>
                        {errors && errors["Type dinstallation ECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Type dinstallation ECS"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch(
                    "Type denergie de production dEau chaude sanitaire"
                  ) === "Système de chauffage" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Type dinstallation ECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="Type dinstallation ECS"
                          {...register("Type dinstallation ECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Type dinstallation ECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Le système de chauffage</option>
                        </select>
                        {errors && errors["Type dinstallation ECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Type dinstallation ECS"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch(
                    "Type denergie de production dEau chaude sanitaire"
                  ) === "Solaire" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="Type dinstallation ECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="Type dinstallation ECS"
                          {...register("Type dinstallation ECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("Type dinstallation ECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Solaire avec appoint électrique</option>
                          <option>Solaire avec appoint gaz</option>
                        </select>
                        {errors && errors["Type dinstallation ECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["Type dinstallation ECS"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}{" "}
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
              {/*Mon foyer*/}
              <h2 className="text-base font-semibold leading-7 text-gray-700 mt-8">
                Mon foyer
              </h2>
              <div className="col-span-full px-[1rem] flex  gap-5">
                <div className="mt-[3rem]  flex gap-10 flex-col w-full">
                  <div class="flex flex-col gap-6 w-[40%]">
                    <div class="relative h-11 w-full min-w-[200px]">
                      <input
                        type="number"
                        id="Revenu fiscal de référence Saisie libre Combien de personnes"
                        {...register(
                          "Revenu fiscal de référence Saisie libre Combien de personnes"
                        )}
                        placeholder=" Saisie libre"
                        class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:mainBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label
                        htmlFor="Revenu fiscal de référence Saisie libre Combien de personnes"
                        class="block text-sm font-medium leading-6 text-black after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-mainBlue after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:mainBlue peer-focus:after:scale-x-100 peer-focus:after:border-mainBlue peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        Revenu fiscal de référence Saisie libre Combien de
                        personnes
                      </label>
                    </div>
                  </div>
                  <div class="flex flex-col gap-6 w-[40%]">
                    <div class="relative h-11 w-full min-w-[200px]">
                      <input
                        type="number"
                        id="composent votre foyer vous compris ?"
                        {...register("composent votre foyer vous compris ?")}
                        placeholder=" Saisie libre"
                        class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:mainBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label
                        htmlFor="composent votre foyer, vous compris ?"
                        class="block text-sm font-medium leading-6 text-black after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-mainBlue after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:mainBlue peer-focus:after:scale-x-100 peer-focus:after:border-mainBlue peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        composent votre foyer, vous compris ?
                      </label>
                    </div>
                  </div>

                  <div className="mt-2 w-full">
                    <label
                      htmlFor="Votre logement est construit depuis au moins 15 ans ?"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Votre logement est construit depuis au moins 15 ans ?
                    </label>
                    <select
                      id="Votre logement est construit depuis au moins 15 ans ?"
                      {...register(
                        "Votre logement est construit depuis au moins 15 ans ?"
                      )}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        Sélectionnez une réponse{" "}
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

                  <div className="mt-2 w-full">
                    <label
                      htmlFor="Votre logement est occupé à titre de résidence"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Votre logement est occupé à titre de résidence
                    </label>
                    <select
                      id="Votre logement est occupé à titre de résidence"
                      {...register(
                        "Votre logement est occupé à titre de résidence"
                      )}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled selected>
                        Sélectionnez une réponse{" "}
                      </option>
                      <option>Principale</option>
                      <option>Secondaire</option>
                    </select>
                    {errors.PlancherBasIsole?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.PlancherBasIsole.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  VOIR LES RÉSULTATS
                </button>
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
        watch={watch}
      />
    </section>
  );
}

export default DemarerSimulation;
