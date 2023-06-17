import "./globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Private Chat",
  description: "This is a private chat application, that does not invigilate users and sell their data.",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper">{children}</div>
      </body>
    </html>
  );
}

