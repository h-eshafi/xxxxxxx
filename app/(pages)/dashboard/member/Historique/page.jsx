import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FcPrint } from "react-icons/fc";
import Image from "next/image";
import imglog from "@/public/icons/dernierSimulation/1 niveau -08.png";

const packageData = [
  {
    NumeroSimulations: "1",
    date: "Jan 13, 2023 a 10h34",
    CodeDepartement: 32,
  },
  {
    NumeroSimulations: "2",
    date: "Jan 13, 2023 a 10h34",
    CodeDepartement: 32,
  },
  {
    NumeroSimulations: "3",
    date: "Jan 13, 2023 a 10h34",
    CodeDepartement: 32,
  },
  {
    NumeroSimulations: "4",
    date: "Jan 13, 2023 a 10h34",
    CodeDepartement: 32,
  },
  {
    NumeroSimulations: "5",
    date: "Jan 13, 2023 a 10h34",
    CodeDepartement: 32,
  },
];

function Historique() {
  return (
    <div className="w-full h-[89%] flex   flex-col rounded-sm border border-stroke px-5 pb-2.5 pt-6 shadow-default   sm:px-7.5 xl:pb-1">
      <div className="w-full overflow-x-auto overflow-y-auto  bg-white rounded-xl border border-stroke px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 rounded-2xl">
            <tr className=" bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                N°
              </th>

              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Code du département
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Logement
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Résultats
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.NumeroSimulations}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.date}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>{item.CodeDepartement}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <Image width={30} height={30} alt="logement" src={imglog} />
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>test</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <FaEye style={{ fontSize: "20px", color: "#279b37" }} />
                    </button>
                    <button className="hover:text-primary">
                      <FiEdit style={{ fontSize: "20px", color: "#037ef3" }} />
                    </button>
                    <button className="hover:text-primary">
                      <FcPrint style={{ fontSize: "20px", color: "#0000ff" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historique;
