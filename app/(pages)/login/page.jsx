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
            <div class="mb-5">
              <label
                for="email"
                class=" font-semibold mb-4 block text-lg text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@ex.com"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="password"
                placeholder="password"
                class="font-semibold mb-4 block text-lg customLabel  text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div class="flex items-start mb-5">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="remember"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          {/* button */}
          <div className="mt-8 w-full flex justify-center items-cente text-center">
            <Link
              className="bg-[#1e00b9] w-[250px] text-white font-bold py-2 px-4  rounded hover:bg-gray-600"
              href="/dashboard/DemarerSimulation"
            >
              Login
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-black font-medium text-sm m-0"></span>
            Don’t have an account yet?
            <a
              href="#"
              className="text-sm font-medium text-[#B1B0B8] hover:underline"
            >
              Sign up now
            </a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
