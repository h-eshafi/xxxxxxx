import { Inter } from "next/font/google";
import "./globals.css";
import Console from "./component/ui/Conslole";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/providers/auth-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuickAudit",
  description: "QuickAudit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-ful bg-white">
      <AuthProvider>
        <body className={`${inter.className} h-full `}>
          <ToastContainer />
          {children}
          <Console />
        </body>
      </AuthProvider>
    </html>
  );
}
