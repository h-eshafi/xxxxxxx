import Image from "next/image";
import React from "react";
import logo from "@/public/icons/dernierSimulation/QuickAudit-04.png";
import Link from "next/link";

function Login() {
  return (
    <div className="py-6">
      <div className="h-[90vh] w-[100vw] flex bg-white rounded-3xl shadow-lg overflow-hidden mx-auto max-w-sm           lg:max-w-6xl">
        {/* image */}
        <div className="flex  lg:w-1/2 bg-cover  justify-center items-center bg-[#1e00b9]">
          <Image alt="logo" src={logo} width={400} height={400} />
        </div>
        {/* form */}
        <div className="w-full p-16 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Login</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-full "></span>
          </div>
          <div className="mt-4">
            <div className="mb-5">
              <label
                for="email"
                className=" font-semibold mb-4 block text-md text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@ex.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                for="password"
                className="font-semibold mb-4 block text-md customLabel  text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          {/* button */}
          <div className="mt-8 w-full flex justify-center items-cente text-center">
            <Link
              className="bg-[#1e00b9] w-[250px] text-white font-bold py-2 px-4  rounded hover:bg-mainBlue"
              href="/dashboard/DemarerSimulation"
            >
              Login
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-black font-medium text-sm m-0"></span>
            Don’t have an account yet?
            <Link
              href="#"
              className="text-sm font-medium text-[#B1B0B8] hover:underline"
            >
              Sign up now
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
