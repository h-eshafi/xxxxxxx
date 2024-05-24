import SideBar from "@/app/component/dashboard/SideBar/SideBar";
import TopBar from "@/app/component/dashboard/TopBar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1 bg-bgSoft min-h-screen ">
        <SideBar />
      </div>
      <div className="w-full z-0 bg-[#f6f6f6]">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
