import React from "react";
import profileimg from "@/public/icons/profile/testProfil.png";
import Image from "next/image";

const user = {
  name: "Sofia Rivers",
  FistName: "Sofia ",
  LastName: " Rivers",
  avatar: profileimg,
  jobTitle: "Senior Developer",
  PhoneNumber: "",
  country: "Fc",
  city: "Côte-d'Or, Dijon",
  timezone: "GTM-7",
};

function Profile() {
  return (
    <>
      <div className="-z-[1] flex justify-center items-center flex-col h-[89%]">
        {/* <h4 className="w-full px-4">Profile</h4> */}
        {/* profile */}
        <div className="flex flex-col md:flex-row gap-4 p-8 w-full">
          <div className="w-full md:w-[40%] flex border-[1px] gap-3 justify-between h-[319px] flex-col items-center  bg-white rounded-3xl shadow-md pt-5">
            <div className="flex items-center justify-center flex-col gap-4">
              <Image
                src={user.avatar}
                alt="User Avatar"
                className="rounded-full w-[5.5rem] h-[5.5rem]"
              />
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-lg font-semibold">{user.name}</h5>
                <p className="text-sm text-gray-600">
                  {user.city} {user.country}
                </p>
                <p className="text-sm text-gray-600">{user.timezone}</p>
              </div>
            </div>

            <div className="border-t-[1px] border-b-softGray w-full ">
              <button className="py-4 w-full hover:bg-[#3b82f654] text-mainBlue  text-gray-q00 px-4 rounded-bl-3xl rounded-br-3xl flex justify-center items-center">
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>charger une photo</span>
              </button>
            </div>
          </div>

          {/* form */}

          <form className="  w-full md:w-[60%] rounded-3xl bg-white shadow-md p-4 flex flex-col justify-between border-softGray border-[1px]">
            <p className=" text-gray-700 font-normal p-4 text-base m-0">
              Les informations peuvent être modifiées
            </p>
            <hr />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col gap-6 md:gap-0">
                <div class="bg-white p-0 md:p-4 rounded-lg flex flex-col md:flex-row  gap-6 md:gap-3">
                  <div class="relative bg-inherit  w-full">
                    <input
                      type="text"
                      value={user.FistName}
                      id="First name"
                      name="First name"
                      class="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2 ring-gray-400 focus:ring-mainBlue focus:outline-none focus:border-rose-600"
                      placeholder="First name*"
                    />
                    <label
                      for="First name"
                      class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-mainBlue peer-focus:text-sm transition-all"
                    >
                      First name*
                    </label>
                  </div>
                  <div class="relative bg-inherit  w-full">
                    <input
                      type="text"
                      value={user.LastName}
                      id="Last name"
                      name="Last name"
                      class="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2 ring-gray-400 focus:ring-mainBlue focus:outline-none focus:border-rose-600"
                      placeholder="First name*"
                    />
                    <label
                      for="Last name"
                      class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-mainBlue peer-focus:text-sm transition-all"
                    >
                      Last name*
                    </label>
                  </div>
                </div>

                <div class="bg-white p-0 md:p-4 rounded-lg flex flex-col md:flex-row    gap-6 md:gap-3">
                  <div class="relative bg-inherit  w-full">
                    <input
                      type="text"
                      id="Numéro de téléphone"
                      name="Numéro de téléphone"
                      class="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2 ring-gray-400 focus:ring-mainBlue focus:outline-none focus:border-rose-600"
                      placeholder="Numéro de téléphone*"
                    />
                    <label
                      for="Numéro de téléphone"
                      class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-mainBlue peer-focus:text-sm transition-all"
                    >
                      Numéro de téléphone*
                    </label>
                  </div>

                  <div class="relative bg-inherit  w-full">
                    <input
                      type="text"
                      id="Email"
                      name="Email"
                      class="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2 ring-gray-400 focus:ring-mainBlue focus:outline-none focus:border-rose-600"
                      placeholder="First name*"
                    />
                    <label
                      for="Email"
                      class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-mainBlue peer-focus:text-sm transition-all"
                    >
                      Email*
                    </label>
                  </div>
                </div>

                <div class="bg-white p-0 md:p-4 rounded-lg flex flex-col md:flex-row gap-6 md:gap-3">
                  <div class="relative bg-inherit w-full">
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      class="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2 ring-gray-400 focus:ring-mainBlue focus:outline-none focus:border-rose-600"
                      placeholder="adresse*"
                    />
                    <label
                      for="adresse"
                      class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-mainBlue peer-focus:text-sm transition-all"
                    >
                      adresse*
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full flex justify-end px-3">
              <button
                type="button"
                class="focus:outline-none text-white bg-mainBlue hover:bg-[#2c53c5ab] focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
// adresse /  email / firstName / id / lastName / phone number /
