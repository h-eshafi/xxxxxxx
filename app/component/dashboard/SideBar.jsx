import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/icons/dernierSimulation/QuickAudit-04.png";

function SideBar() {
  return (
    <ul
      style={{ position: "sticky", top: "0", bottom: "0" }}
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a className="d-flex align-items-center justify-content-center h-[93px]">
        <div className="w-14rem">
          <Image src={logo} className="h-full w-full" alt="logo" />
        </div>
      </a>

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}

      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="/dashboard/DemarerSimulation"
        >
          <span>Démarrer la simulation.</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      {/* Nav Item - Utilities Collapse Menu */}
      <li className="nav-item">
        <Link className="nav-link collapsed" href="/dashboard/Historique">
          <span>Historique</span>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <span>Profile</span>
        </a>
      </li>

      <hr className="sidebar-divider" />

      {/* Nav Item - Charts */}
      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <span>Payment</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default SideBar;
