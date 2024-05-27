import dynamic from "next/dynamic";
import Link from "next/link";

const packageData = [
  {
    nom: "name",
    prenom: "lastname",
    phone: "03 066 666 666",
    email: "test@test.com",
    credits: 0,
    date: "Jan 13, 2023 a 10h34",
    role: "Admin",
    result: "test",

    email_verification: true,
  },
  {
    nom: "name",
    prenom: "lastname",
    phone: "03 066 666 666",
    email: "test@test.com",
    credits: 4,
    result: "test",

    date: "Jan 13, 2023 a 10h34",
    role: "Member",
    email_verification: true,
  },
  {
    nom: "name",
    prenom: "lastname",
    phone: "03 066 666 666",
    email: "test@test.com",
    credits: 2,
    result: "test",

    date: "Jan 13, 2023 a 10h34",
    role: "Member",
    email_verification: true,
  },
  {
    nom: "name",
    prenom: "lastname",
    result: "test",
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
        <div className=" flex justify-between items-centers">
          <p className="text-2xl font-medium px-4 py-3">Membres (4) </p>
          <Link
            href="/dashboard/admin/new"
            className="flex justify-center items-center py-2 px-5 me-2 mb-2 text-sm font-medium text-mainBlue focus:outline-none h-[45px]  rounded-2xl border border-gray-200 bg-slate-50 hover:bg-slate-100 hover:to-blue-800 "
          >
            <span className="text-2xl pr-2">+</span>
            <span className="">Ajouter un membre</span>
          </Link>
        </div>

        <table className="w-full table-auto">
          <thead className="bg-gray-50 rounded-2xl">
            <tr className=" bg-gray-2 text-left dark:bg-meta-4">
              <th className="text-center px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nom
              </th>

              <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                Prénom
              </th>

              <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>

              <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                Numéro de téléphone
              </th>

              <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                Role
              </th>

              <th className="text-center min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Crédits
              </th>

              <th className="text-center min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((item, key) => (
              <tr key={key}>
                <td className="text-center  border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className=" text-black dark:text-white">{item.nom}</p>
                </td>

                <td className="text-center border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className=" text-black dark:text-white">{item.prenom}</p>
                </td>

                <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.email}</p>
                </td>

                <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>{item.phone}</p>
                </td>

                <td className="text-center  border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <select name="" id="">
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </td>

                <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>{item.credits}</p>
                </td>

                <td className="flex border-b gap-3 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <Link
                    className="text-base text-blue-600 hover:underline"
                    href="#"
                  >
                    <span>modifier</span>
                  </Link>
                  <Link
                    className="  text-base text-red-500 hover:text-red-600 hover:underline "
                    href="#"
                  >
                    <span>supprimer</span>
                  </Link>
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
