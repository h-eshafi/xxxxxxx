import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/icons/dernierSimulation/QuickAudit-04.png";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

async function SideBar() {
  const session = await getServerSession(authOption);
  console.log("session ", session);
  console.log("side bar ==", session?.user?.role);

  return (
    <ul
      style={{ position: "sticky", top: "0", bottom: "0" }}
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a className="d-flex align-items-center justify-content-center h-[93px]">
        <div className="w-14rem">
          <Image src={logo} className="h-full w-full" alt="logo" />
        </div>
      </a>

      <li className="nav-item active">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Tableau de bord</span>
      </li>

      <hr className="sidebar-divider" />

      {session?.user?.role === "Member" && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href="/dashboard/member/DemarerSimulation"
            >
              <span>Démarrer la simulation</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href="/dashboard/member/Historique"
            >
              <span>Historique</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href="/dashboard/member/Profile"
            >
              <span>Profile</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href="/dashboard/member/paiement"
            >
              <span>Abonnement</span>
            </Link>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
        </>
      )}
      {session?.user?.role === "admin" && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href="/dashboard/admin/simulations"
            >
              <span>Simulations</span>
            </Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link collapsed" href="/dashboard/admin/users">
              <span>users</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href="/dashboard/admin/paiement"
            >
              <span>paiement</span>
            </Link>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />
        </>
      )}
    </ul>
  );
}
export default dynamic(() => Promise.resolve(SideBar), { ssr: false });
