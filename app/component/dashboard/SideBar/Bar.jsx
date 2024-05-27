"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/dernierSimulation/QuickAudit-04.png";

function Bar({ session }) {
  const router = usePathname();

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

      <li className="nav-item">
        <a className="nav-link text-white " href="#">
          <span>Tableau de bord</span>
        </a>
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
      {/* admin */}
      {session?.user?.role === "admin" && (
        <>
          {/* simulation */}
          <li className="nav-item">
            <Link
              className={`nav-link  ${
                router === "/dashboard/admin/simulations" ? " text-white" : ""
              }`}
              href="/dashboard/admin/simulations"
            >
              <span>Simulations</span>
            </Link>
          </li>
          <hr className="sidebar-divider" />
          {/* users */}
          <li className="nav-item">
            <Link
              className={`nav-link  ${
                router === "/dashboard/admin/users" ? " text-white" : ""
              }  ${router === "/dashboard/admin/new" ? " text-white" : ""}`}
              href="/dashboard/admin/users"
            >
              <span>Membres</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />
          {/* paiement */}
          <li className="nav-item">
            <Link
              className={`nav-link  ${
                router === "/dashboard/admin/paiement" ? " text-white" : ""
              }`}
              href="/dashboard/admin/paiement"
            >
              <span>Paiement</span>
            </Link>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />
        </>
      )}
    </ul>
  );
}

export default Bar;
