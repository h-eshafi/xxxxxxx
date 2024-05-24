"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
//import images
// import profile from "@/../public/images/header/profile.jpg";
import Image from "next/image";

export function UserDropDown({ userInfo }) {
  // if (!userInfo.email || !userInfo.firstName) {
  //   signOut();
  // }
  const { firstName, lastName, image, email } = userInfo;

  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!dropDownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClick);
    }

    return () => window.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropDownRef}>
      <div
        className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer flex justify-center items-center"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
      >
        {/* <Image
          width={100}
          height={100}
          src={photoUrl ? photoUrl : profile.src}
          alt="profile"
          className="w-full h-full object-cover"
        /> */}
        <CgProfile size={35} />
      </div>

      <div
        className={`absolute top-[80px] right-0 px-4 py-5 w-[200px] bg-mainBlue text-white rounded-xl transition shadow-[0_5px_25px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:-top-[5px] before:right-[15px] before:w-[20px] before:h-[20px] before:bg-mainBlue before:-z-10 before:rotate-[45deg] ${
          isOpen ? "opacity-100" : "opacity-0 scale-[0.5] pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          {/* <Image
            width={100}
            height={100}
            src={photoUrl ? photoUrl : profile.src}
            alt="logo"
            className="mb-1 w-[65px] h-[65px] object-cover rounded-full"
          /> */}

          <h3 className="font-medium capitalize">{firstName}</h3>
          <span className="text-xs lowercase">{email}</span>

          <Link href="#" className="w-full">
            <button
              className="my-5 w-full h-[45px] bg-[rgba(255,255,255,0.1)] border border-white rounded-md shadow-md transition hover:shadow-xl text-white"
              onClick={() => setIsOpen(false)}
            >
              gérer le profil
            </button>
          </Link>

          <span
            className="transition cursor-pointer underline-offset-4 hover:underline "
            onClick={() => signOut()}
            role="button"
          >
            Se déconnecter
          </span>
        </div>
      </div>
    </div>
  );
}
