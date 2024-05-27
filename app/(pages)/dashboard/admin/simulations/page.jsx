import dynamic from "next/dynamic";
import React from "react";

const simTable = [
  {
    firstName: "name",
    lastName: "lastName",
    simName: "test",
    result: "test",
    date: "Jan 13, 2023 a 10h34",
  },
  {
    firstName: "name",
    lastName: "lastName",
    simName: "test",
    result: "test",
    date: "Jan 13, 2023 a 10h34",
  },
  {
    firstName: "name",
    lastName: "lastName",
    simName: "test",
    result: "test",
    date: "Jan 13, 2023 a 10h34",
  },
];

function Simulations() {
  return (
    <div>
      <div className="w-full h-[89%] flex   flex-col rounded-sm border border-stroke px-5 pb-2.5 pt-6 shadow-default   sm:px-7.5 xl:pb-1">
        <div className="w-full overflow-x-auto overflow-y-auto  bg-white rounded-xl border border-stroke px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 rounded-2xl">
              <tr className=" bg-gray-2 text-left dark:bg-meta-4">
                <th className="text-center px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Utilisateur
                </th>
                <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                  Nom de simulation
                </th>

                <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                  Résultat
                </th>

                <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {simTable.map((item, key) => (
                <tr key={key}>
                  <td className="text-center border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <p className=" text-black dark:text-white">
                      {" "}
                      {item.firstName} {item.lastName}{" "}
                    </p>
                  </td>

                  <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p> {item.simName} </p>
                  </td>

                  <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {" "}
                      {item.result}{" "}
                    </p>
                  </td>

                  <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.date}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Simulations), { ssr: false });
