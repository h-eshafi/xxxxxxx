// "use client";

// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { signOut } from "next-auth/react";
// //import images
// import profile from "@/../public/images/header/profile.jpg";
// import Image from "next/image";

// export function UserDropDown({ userInfo }) {
//   if (!userInfo.email || !userInfo.name) {
//     signOut();
//   }
//   const { name, email, photoUrl } = userInfo;

//   const [isOpen, setIsOpen] = useState(false);
//   const dropDownRef = useRef();

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (!dropDownRef.current?.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       window.addEventListener("mousedown", handleClick);
//     }

//     return () => window.removeEventListener("mousedown", handleClick);
//   }, [isOpen]);

//   return (
//     <div className="relative" ref={dropDownRef}>
//       <div
//         className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
//         onClick={() => setIsOpen((prev) => !prev)}
//         role="button"
//       >
//         <Image
//           width={100}
//           height={100}
//           src={photoUrl ? photoUrl : profile.src}
//           alt="profile"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div
//         className={`absolute top-[80px] right-0 px-4 py-5 w-[200px] bg-gray-800 text-white rounded-xl transition shadow-[0_5px_25px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:-top-[5px] before:right-[15px] before:w-[20px] before:h-[20px] before:bg-gray-800 before:rotate-[45deg] ${
//           isOpen ? "opacity-100" : "opacity-0 scale-[0.5] pointer-events-none"
//         }`}
//       >
//         <div className="flex flex-col items-center text-center">
//           <Image
//             width={100}
//             height={100}
//             src={photoUrl ? photoUrl : profile.src}
//             alt="logo"
//             className="mb-1 w-[65px] h-[65px] object-cover rounded-full"
//           />

//           <h3 className="font-medium capitalize">{name}</h3>
//           <span className="text-xs lowercase">{email}</span>

//           <Link href={`/profile?tab=info`} className="w-full">
//             <button
//               className="my-5 w-full h-[45px] bg-[rgba(255,255,255,0.1)] border border-white rounded-md shadow-md transition hover:shadow-xl"
//               onClick={() => setIsOpen(false)}
//             >
//               gérer le profil
//             </button>
//           </Link>

//           <span
//             className="transition cursor-pointer underline-offset-4 hover:underline "
//             onClick={() => signOut()}
//             role="button"
//           >
//             Se déconnecter
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
