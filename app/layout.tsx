"use client"

import {Inter} from "next/font/google";
import "./globals.css";
import 'sweetalert2/src/sweetalert2.scss';
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

/*export const metadata: Metadata = {
  title: "Web Quizz App",
  description: "Here is the description of the web quiz app ",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <head>
            <title>Quiz App</title>
        </head>
        <body className={inter.className}>
        <SessionProvider>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
