import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import React from "react";
import dynamic from "next/dynamic";
import { UserDropDown } from "../ui/UserDropDown";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const getMember = async (id) => {
  try {
    const member = await prisma.user.findFirst({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        image: true,
        email: true,
        role: true,
      },
    });

    return member;
  } catch (e) {
    // return redirect("/AuthPage");
  }
};
async function TopBar() {
  const session = await getServerSession(authOption);
  console.log("session ", session);
  console.log("side bar ==", session?.user?.role);

  const { id } = session.user;
  console.log("id== ", id);
  const member = await getMember(id);
  console.log("member header", member);
  return (
    <nav
      className="z-30 w-full navbar navbar-expand navbar-light bg-white topbar static-top shadow"
      style={{ position: "sticky", top: "0" }}
    >
      {/* Sidebar Toggle (Topbar) */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      {/* Topbar Search */}
      <form className="d-none d-md-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control p-2 rounded-sm bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <FaSearch />
            </button>
          </div>
        </div>
      </form>
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - Alerts */}
        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <IoIosNotifications size={25} />
            <span className="badge badge-danger badge-counter">3+</span>
          </a>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <div className="nav-link dropdown-toggle">
            <UserDropDown userInfo={member} />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(TopBar), { ssr: false });
