import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FcPrint } from "react-icons/fc";
import Image from "next/image";
import imglog from "@/public/icons/dernierSimulation/1 niveau -08.png";
import dynamic from "next/dynamic";

const packageData = [
  {
    nom: "yassine",
    prenom: "test",
    phone: "03 066 666 666",
    email: "test@test.com",
    credits: 0,
    date: "Jan 13, 2023 a 10h34",
    role: "Member",
    email_verification: true,
  },
  {
    nom: "yassine",
    prenom: "test",
    phone: "03 066 666 666",
    email: "test@test.com",
    credits: 4,
    date: "Jan 13, 2023 a 10h34",
    role: "Member",
    email_verification: true,
  },
  {
    nom: "yassine",
    prenom: "test",
    phone: "03 066 666 666",
    email: "test@test.com",
    credits: 2,
    date: "Jan 13, 2023 a 10h34",
    role: "Member",
    email_verification: true,
  },
  {
    nom: "yassine",
    prenom: "test",
    phone: "03 066 666 666",
    email: "test@test.com",
    credits: 3,
    role: "Member",
    date: "Jan 13, 2023 a 10h34",
    email_verification: true,
  },
];

function Users() {
  return (
    <div className="w-full h-[89%] flex   flex-col rounded-sm border border-stroke px-5 pb-2.5 pt-6 shadow-default   sm:px-7.5 xl:pb-1">
      <div className="w-full overflow-x-auto overflow-y-auto  bg-white rounded-xl border border-stroke px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 rounded-2xl">
            <tr className=" bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nom
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Prénom
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                numéro de telephone
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Résultats
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                crédits
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.nom}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.prenom}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.email}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>{item.phone}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  test
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>{item.phone}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>{item.result}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">edit</div>
                  <div className="flex items-center space-x-3.5 text-red-500">
                    supprimer
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
export default dynamic(() => Promise.resolve(Users), { ssr: false });
