"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function InputPassword({
  name,
  register,
  validate,
  error,
  ...inputProps
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...inputProps}
        type={showPassword ? "text" : "password"}
        className={`pl-3 w-full h-[45px] border rounded-md  ${
          error && "border-red-500 focus:outline-red-500"
        }`}
        {...register(name, validate)}
      />

      <div className="absolute top-0 right-0 flex justify-end h-full rounded-r-md overflow-hidden">
        <div
          role="button"
          className="w-[40px] h-full grid place-content-center cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <FaEyeSlash className="text-xl text-gray-500" />
          ) : (
            <FaEye className="text-xl text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}
