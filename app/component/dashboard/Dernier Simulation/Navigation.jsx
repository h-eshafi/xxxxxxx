import React from "react";
import { toast, Bounce } from "react-toastify";

function Navigation({
  setPreviousStep,
  setCurrentStep,
  currentStep,
  steps,
  watch,
  trigger,
}) {
  const next = async () => {
    // Check if all required fields are filled
    const currentFields = steps[currentStep].fields;
    const filled = currentFields.every((field) => {
      // Check if the current field is "AnneeIsolationmurs"
      // and if the user selected "Non" for "VosMursSontIlsIsoles
      if (
        // Skip checking "AnneeIsolationmurs" when "Non" is selected
        // and consider it as filled
        // Step 2
        (field === "AnneeIsolationmurs" &&
          watch("VosMursSontIlsIsoles") === "Non") ||
        (field === "AnneeIsolationPlancherBas" &&
          watch("PlancherBasIsole") === "Non") ||
        (field === "AnneeIsolationPlancherHaut" &&
          watch("PlancherHautIsole") === "Non") ||
        // Step 3
        (field === "TypeEnergieDeChauffageAppoint" &&
          watch("AvezvousUnSystemeDeChauffageDappoint") === "Non") ||
        (field === "SystemeDeChauffageAppoint" &&
          watch("AvezvousUnSystemeDeChauffageDappoint") === "Non")
      ) {
        // For other fields or when "Non" is not selected,
        // check if the current field has been filled using watch(field)
        return true;
      }
      return watch(field);
    });
    console.log(filled);
    console.log(`Form data: Step ${currentStep + 1}`, watch()); // Log the currently registered form values

    if (!filled) {
      // If any required field is not filled, return without proceeding
      toast.warn("Assurez-vous de répondre à chaque question.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log("fill all field");
      return;
    }

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 1) {
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
    <div className="" style={{ padding: "1rem 5rem 3rem" }}>
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
  );
}

export default Navigation;
