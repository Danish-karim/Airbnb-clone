import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: any = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
