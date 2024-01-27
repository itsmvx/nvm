import { ReactNode } from "react";
import { Metadata } from "next";
import AccountProvider from "@/contexts/AccountProvider";
import { LBPPraktikum } from "@/lib/StaticImageAssets";

export const metadata: Metadata = {
    title: "SiBasprog",
    description: 'Sistem Informasi Laboratorium Bahasa Pemrograman ITATS',
};
export default function AccountLayout({ children }: { children: ReactNode }) {
    const accountLayoutStyles = {
        backgroundImage: `url(${LBPPraktikum.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };

    return (
        <AccountProvider>
            <main style={{ ...accountLayoutStyles }} className="relative flex w-full min-h-screen h-full items-center justify-center">
                <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center dark:bg-zinc-500/60"></div>
                { children }
            </main>
        </AccountProvider>
    );
}
