"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Nav from "../../../../component/dashboard/Dernier Simulation/Nav";
import carre from "@/public/icons/dernierSimulation/ICON QuickAudit-01.png";
import rectangle from "@/public/icons/dernierSimulation/ICON QuickAudit-02.png";
import formaU from "@/public/icons/dernierSimulation/ICON QuickAudit-04.png";
import formaL from "@/public/icons/dernierSimulation/ICON QuickAudit-03.png";
import mitoyenne1 from "@/public/icons/dernierSimulation/Mitoyenne sur 2 côtés-05.png";
import mitoyenne2 from "@/public/icons/dernierSimulation/Mitoyenne sur 2 côtés-05.png";
import mitoyenne3 from "@/public/icons/dernierSimulation/Mitoyenne sur 2 côtés-05.png";
import niv1 from "@/public/icons/dernierSimulation/1 niveau -08.png";
import niv2 from "@/public/icons/dernierSimulation/2 niveau -09.png";
import niv3 from "@/public/icons/dernierSimulation/3 niveaux-10.png";
import Navigation from "@/app/component/dashboard/Dernier Simulation/Navigation";
import axios from "axios";

const steps = [
  {
    id: "Step 1",
    fields: [
      "CodeDepartement",
      "AnneConstruction",
      "FormeDuLogement",
      "SurfaceHabitable",
    ],
  },
  {
    id: "Step 2",
    fields: [
      "VosMursSontIlsIsoles",
      "TypeDuPlancherBas",
      "PlancherBasIsole",
      "AnneeIsolationPlancherBas",
      "NaturePlancherHaut",
      "PlancherHautIsole",
      "AnneeIsolationPlancherHaut",
      "TypeDeVitragePrincipal",
    ],
  },
  {
    id: "Step 3",
    fields: [
      "TypeDeVentilation",
      "TypeEnergieDeChauffage",
      "SystemeDeChauffage",
      "AvezvousUnSystemeDeChauffageDappoint",
      "TypeEnergieDeChauffageAppoint",
      "SystemeDeChauffageAppoint",
      "TypeDenergieDeProductionDEauChaudeSanitaire",
      "TypeDinstallationECS",
      "TypeDenergieDeProductionDEauChaudeSanitaire",
    ],
  },
  {
    id: "Step 4",
    fields: [
      "RevenuFiscalDeReferenceSaisieLibreCombienPersonnes",
      "ComposentVotreFoyerVousCompris",
      "VotreLogementEstConstruitDepuisAuMoins15Ans",
      "VotreLogementEstOccupeATitreDeResidence",
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
    setValue("FormeDuLogement", buttonId);
  };

  // State variables for Mitoyenneté
  const [selectedMitoyennete, setSelectedMitoyennete] = useState(null);
  const handleButtonMitoyennete = (buttonId) => {
    setSelectedMitoyennete(buttonId);
    setValue("MitoyenneteDeLaMaison", buttonId);
  };

  // State variables for NombreDeNiveauxHabitables
  const [
    SelectedNombreDeNiveauxHabitables,
    setSelectedNombreDeNiveauxHabitables,
  ] = useState(null);

  const handleButtonNombreDeNiveauxHabitables = (buttonId) => {
    setSelectedNombreDeNiveauxHabitables(buttonId);
    setValue("NombreDeNiveauxHabitables", buttonId);
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

  const processForm = async (data) => {
    console.log(data);
    if (data["VosMursSontIlsIsoles"] === "Non") {
      // Exclude "AnneeIsolationPlancherBas" from the data object
      const { ["AnneeIsolationmurs"]: _, ...filteredData } = data;
      data = filteredData;
    }
    if (data["PlancherBasIsole"] === "Non") {
      const { ["AnneeIsolationPlancherBas"]: _, ...filteredData } = data;
      data = filteredData;
    }
    if (data["PlancherHautIsole"] === "Non") {
      const { ["AnneeIsolationPlancherHaut"]: _, ...filteredData } = data;
      data = filteredData;
    }
    console.log(data);

    try {
      const response = await axios.post("http://127.0.0.1:8000/test/", data);
      console.log(response.data);
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error("There was a problem with the Axios request:", error);
    }
    // reset();
  };

  return (
    <section className=" relative -z-[3]  gap-[2rem] inset-0 flex flex-col justify-between ">
      <motion.div
        initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Nav steps={steps} currentStep={currentStep} />
      </motion.div>
      {/* Form */}
      <form
        className="-z-[3]"
        style={{ padding: "6rem 4rem 0rem" }}
        onSubmit={handleSubmit(processForm)}
      >
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
                      className=" bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg   focus:border-gray-700 block w-full p-2.5 sm:max-w-xs sm:text-sm sm:leading-6"
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
                      className="bg-white border border-[#b7b9cc] focus:border-gray-700  text-gray-900 text-sm rounded-lg block w-full p-2.5 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  FormeDuLogement
                </label>

                <ul className="flex justify-evenly mt-6">
                  {FormeDuLogement.map((option, index) => (
                    <li
                      key={index}
                      className={`text-center py-[12px] px-[8px] border border-solid border-[#e3e6f0] h-[125px] flex w-[200px] ${
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
                  MitoyenneteDeLaMaison
                </label>

                <ul className="flex justify-evenly mt-6">
                  {Mitoyenneté.map((option, index) => (
                    <li
                      key={index}
                      className={`text-center py-[12px] px-[8px] border border-solid border-[#e3e6f0] h-[125px] flex w-[200px] ${
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
                  NombreDeNiveauxHabitables{" "}
                </label>

                <ul className="flex justify-evenly mt-6">
                  {NombreDeNiveauxHabitables.map((option, index) => (
                    <li
                      key={index}
                      className={`py-[12px] text-center px-[8px] border border-solid border-[#e3e6f0] h-[125px] flex w-[200px] ${
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
                      min="0"
                      id="SurfaceHabitable"
                      {...register("SurfaceHabitable")}
                      placeholder=" SurfaceHabitable"
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:mainBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label
                      htmlFor="FormeLogement"
                      className="block text-sm font-medium leading-6 text-black after:content[' '] pointer-events-none absolute left-0  -top-[1rem] flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight transition-all after:absolute after:-bottom-[1rem] after:block after:w-full after:scale-x-0 after:border-b-2 after:border-mainBlue after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:mainBlue peer-focus:after:scale-x-100 peer-focus:after:border-mainBlue peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                      SurfaceHabitable
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
                    htmlFor="VosMursSontIlsIsoles"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    VosMursSontIlsIsoles
                  </label>
                  <div className="mt-2">
                    <select
                      id="VosMursSontIlsIsoles"
                      {...register("VosMursSontIlsIsoles")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("VosMursSontIlsIsoles") === ""}
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
                {watch("VosMursSontIlsIsoles") === "Oui" && (
                  <div className="sm:col-span-3 w-full">
                    <label
                      htmlFor="AnneeIsolationmurs"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Année d&apos;isolation
                    </label>
                    <div className="mt-2">
                      <select
                        id="AnneeIsolationmurs"
                        {...register("AnneeIsolationmurs")}
                        className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option
                          value=""
                          disabled={watch("AnneeIsolationmurs") === ""}
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
                      htmlFor="TypeDuPlancherBas"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      TypeDuPlancherBas{" "}
                    </label>
                    <select
                      id="TypeDuPlancherBas"
                      {...register("TypeDuPlancherBas")}
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
                      htmlFor="PlancherBasIsole"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      PlancherBasIsole{" "}
                    </label>
                    <select
                      id="PlancherBasIsole"
                      {...register("PlancherBasIsole")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("PlancherBasIsole") === ""}
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

                {watch("PlancherBasIsole") === "Oui" && (
                  <div className="sm:col-span-3 w-full mt-4">
                    <label
                      htmlFor="AnneeIsolationPlancherBas"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Année d&apos;isolation
                    </label>
                    <div className="mt-2">
                      <select
                        id="AnneeIsolationPlancherBas"
                        {...register("AnneeIsolationPlancherBas")}
                        className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option
                          value=""
                          disabled={watch("AnneeIsolationPlancherBas") === ""}
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
                      htmlFor="NaturePlancherHaut"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      NaturePlancherHaut
                    </label>
                    <select
                      id="NaturePlancherHaut"
                      {...register("NaturePlancherHaut")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("NaturePlancherHaut") === ""}
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
                      htmlFor="PlancherHautIsole"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      PlancherHautIsole
                    </label>
                    <select
                      id="PlancherHautIsole"
                      {...register("PlancherHautIsole")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("PlancherHautIsole") === ""}
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

                {watch("PlancherHautIsole") === "Oui" && (
                  <div className="sm:col-span-3 w-full mt-4">
                    <label
                      htmlFor="AnneeIsolationPlancherHaut"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Année d&apos;isolation
                    </label>
                    <div className="mt-2">
                      <select
                        id="AnneeIsolationPlancherHaut"
                        {...register("AnneeIsolationPlancherHaut")}
                        className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option
                          value=""
                          disabled={watch("AnneeIsolationPlancherHaut") === ""}
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
                      htmlFor="TypeDeVitragePrincipal"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      TypeDeVitragePrincipal
                    </label>
                    <select
                      id="TypeDeVitragePrincipal"
                      {...register("TypeDeVitragePrincipal")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("TypeDeVitragePrincipal") === ""}
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
                    htmlFor="TypeDeVentilation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    TypeDeVentilation
                  </label>
                  <div className="mt-2">
                    <select
                      id="TypeDeVentilation"
                      {...register("TypeDeVentilation")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("TypeDeVentilation") === ""}
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
                      htmlFor="TypeEnergieDeChauffage"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type d&apos;énergie de chauffage
                    </label>
                    <select
                      id="TypeEnergieDeChauffage"
                      {...register("TypeEnergieDeChauffage")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={watch("TypeEnergieDeChauffage") === ""}
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

                  {watch("TypeEnergieDeChauffage") === "Gaz" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="SystemeDeChauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="SystemeDeChauffage"
                          {...register("SystemeDeChauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("SystemeDeChauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chaudière gaz classique</option>
                          <option>Chaudière gaz Basse</option>
                          <option>Température</option>
                          <option>Chaudière gaz récente à condensation</option>
                        </select>
                        {errors && errors["SystemeDeChauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["SystemeDeChauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeEnergieDeChauffage") === "Fioul" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="SystemeDeChauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="SystemeDeChauffage"
                          {...register("SystemeDeChauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("SystemeDeChauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chaudière fioul</option>
                          <option>Poêle fioul</option>
                        </select>
                        {errors && errors["SystemeDeChauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["SystemeDeChauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeEnergieDeChauffage") === "Bois" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="SystemeDeChauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="SystemeDeChauffage"
                          {...register("SystemeDeChauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("SystemeDeChauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chaudière bois ancienne</option>
                          <option>Chaudière bois récente</option>
                          <option>Poêle à granulés</option>
                        </select>
                        {errors && errors["SystemeDeChauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["SystemeDeChauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeEnergieDeChauffage") === "Electrique" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="SystemeDeChauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="SystemeDeChauffage"
                          {...register("SystemeDeChauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("SystemeDeChauffage") === ""}
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
                        {errors && errors["SystemeDeChauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["SystemeDeChauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeEnergieDeChauffage") === "GPL" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="SystemeDeChauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="SystemeDeChauffage"
                          {...register("SystemeDeChauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("SystemeDeChauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Poêle GPL</option>
                        </select>
                        {errors && errors["SystemeDeChauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["SystemeDeChauffage"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeEnergieDeChauffage") === "Solaire" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="SystemeDeChauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="SystemeDeChauffage"
                          {...register("SystemeDeChauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("SystemeDeChauffage") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chauffage solaire</option>
                        </select>
                        {errors && errors["SystemeDeChauffage"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["SystemeDeChauffage"].message}
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
                      htmlFor="AvezvousUnSystemeDeChauffageDappoint"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Avez-vous un système de chauffage d&apos;appoint?
                    </label>
                    <select
                      id="AvezvousUnSystemeDeChauffageDappoint"
                      {...register("AvezvousUnSystemeDeChauffageDappoint")}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={
                          watch("AvezvousUnSystemeDeChauffageDappoint") === ""
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
                  {watch("AvezvousUnSystemeDeChauffageDappoint") === "Oui" && (
                    <div className="col-span-full flex">
                      <div className=" mt-2 w-full">
                        <label
                          htmlFor="TypeEnergieDeChauffageAppoint"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Type d&apos;énergie de chauffage
                        </label>
                        <select
                          id="TypeEnergieDeChauffageAppoint"
                          {...register("TypeEnergieDeChauffageAppoint")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={
                              watch("TypeEnergieDeChauffageAppoint") === ""
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

                      {watch("TypeEnergieDeChauffageAppoint") === "Gaz" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="SystemeDeChauffageAppoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="SystemeDeChauffageAppoint"
                              {...register("SystemeDeChauffageAppoint")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("SystemeDeChauffageAppoint") === ""
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
                            {errors && errors["SystemeDeChauffageAppoint"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["SystemeDeChauffageAppoint"].message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {watch("TypeEnergieDeChauffageAppoint") === "Fioul" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="SystemeDeChauffageAppoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="SystemeDeChauffageAppoint"
                              {...register("SystemeDeChauffageAppoint")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("SystemeDeChauffageAppoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Chaudière fioul</option>
                              <option>Poêle fioul</option>
                            </select>
                            {errors && errors["SystemeDeChauffageAppoint"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["SystemeDeChauffageAppoint"].message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {watch("TypeEnergieDeChauffageAppoint") === "Bois" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="SystemeDeChauffageAppoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="SystemeDeChauffageAppoint"
                              {...register("SystemeDeChauffageAppoint")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("SystemeDeChauffageAppoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Chaudière bois ancienne</option>
                              <option>Chaudière bois récente</option>
                              <option>Poêle à granulés</option>
                            </select>
                            {errors && errors["SystemeDeChauffageAppoint"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["SystemeDeChauffageAppoint"].message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {watch("TypeEnergieDeChauffageAppoint") ===
                        "Electrique" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="SystemeDeChauffageAppoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="SystemeDeChauffageAppoint"
                              {...register("SystemeDeChauffageAppoint")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("SystemeDeChauffageAppoint") === ""
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
                            {errors && errors["SystemeDeChauffageAppoint"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["SystemeDeChauffageAppoint"].message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {watch("TypeEnergieDeChauffageAppoint") === "GPL" && (
                        <div className="sm:col-span-3  mt-2 w-full">
                          <label
                            htmlFor="SystemeDeChauffageAppoint"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Système de chauffage
                          </label>
                          <div className="mt-2">
                            <select
                              id="SystemeDeChauffageAppoint"
                              {...register("SystemeDeChauffageAppoint")}
                              className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option
                                value=""
                                disabled={
                                  watch("SystemeDeChauffageAppoint") === ""
                                }
                              >
                                Sélectionnez une réponse
                              </option>
                              <option>Poêle GPL</option>
                            </select>
                            {errors && errors["SystemeDeChauffageAppoint"] && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors["SystemeDeChauffageAppoint"].message}
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
                      htmlFor="TypeDenergieDeProductionDEauChaudeSanitaire"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type d&apos;énergie de production d&apos;Eau chaude
                      sanitaire
                    </label>
                    <select
                      id="TypeDenergieDeProductionDEauChaudeSanitaire"
                      {...register(
                        "TypeDenergieDeProductionDEauChaudeSanitaire"
                      )}
                      className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        value=""
                        disabled={
                          watch(
                            "TypeDenergieDeProductionDEauChaudeSanitaire"
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
                  {watch("TypeDenergieDeProductionDEauChaudeSanitaire") ===
                    "Gaz" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="TypeDinstallationECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="TypeDinstallationECS"
                          {...register("TypeDinstallationECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("TypeDinstallationECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Chauffe-eau gaz ancien</option>
                          <option>Chauffe-eau gaz récent</option>
                          <option>Chauffe-eau électrique</option>
                          <option>Chauffe-eau</option>
                        </select>
                        {errors && errors["TypeDinstallationECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["TypeDinstallationECS"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeDenergieDeProductionDEauChaudeSanitaire") ===
                    "Electrique" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="TypeDinstallationECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="TypeDinstallationECS"
                          {...register("TypeDinstallationECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("TypeDinstallationECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>thermodynamique</option>
                        </select>
                        {errors && errors["TypeDinstallationECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["TypeDinstallationECS"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeDenergieDeProductionDEauChaudeSanitaire") ===
                    "Système de chauffage" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="TypeDinstallationECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="TypeDinstallationECS"
                          {...register("TypeDinstallationECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("TypeDinstallationECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Le système de chauffage</option>
                        </select>
                        {errors && errors["TypeDinstallationECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["TypeDinstallationECS"].message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {watch("TypeDenergieDeProductionDEauChaudeSanitaire") ===
                    "Solaire" && (
                    <div className="sm:col-span-3  mt-2 w-full">
                      <label
                        htmlFor="TypeDinstallationECS"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type d&apos;installation ECS
                      </label>
                      <div className="mt-2">
                        <select
                          id="TypeDinstallationECS"
                          {...register("TypeDinstallationECS")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            disabled={watch("TypeDinstallationECS") === ""}
                          >
                            Sélectionnez une réponse
                          </option>
                          <option>Solaire avec appoint électrique</option>
                          <option>Solaire avec appoint gaz</option>
                        </select>
                        {errors && errors["TypeDinstallationECS"] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors["TypeDinstallationECS"].message}
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
                        min="0"
                        id="RevenuFiscalDeReferenceSaisieLibreCombienPersonnes"
                        {...register(
                          "RevenuFiscalDeReferenceSaisieLibreCombienPersonnes"
                        )}
                        placeholder=" Saisie libre"
                        class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:mainBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label
                        htmlFor="RevenuFiscalDeReferenceSaisieLibreCombienPersonnes"
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
                        min="0"
                        id="ComposentVotreFoyerVousCompris"
                        {...register("ComposentVotreFoyerVousCompris")}
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
                      htmlFor="VotreLogementEstConstruitDepuisAuMoins15Ans"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      VotreLogementEstConstruitDepuisAuMoins15Ans
                    </label>
                    <select
                      id="VotreLogementEstConstruitDepuisAuMoins15Ans"
                      {...register(
                        "VotreLogementEstConstruitDepuisAuMoins15Ans"
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
                      htmlFor="VotreLogementEstOccupeATitreDeResidence"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      VotreLogementEstOccupeATitreDeResidence
                    </label>
                    <select
                      id="VotreLogementEstOccupeATitreDeResidence"
                      {...register("VotreLogementEstOccupeATitreDeResidence")}
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
