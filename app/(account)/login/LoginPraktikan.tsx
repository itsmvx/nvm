'use client';
import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";
import { useAccountContext } from "@/hooks/useAccountContext";
import Image from "next/image";
import { LBPLogo } from "@/lib/StaticImageAssets";

export const LoginPraktikan = () => {
    const {
        formState,formDispatch,
        fetchDispatch
    } = useAccountContext();

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: {
            npm: string;
            password: string;
        } = {
            npm: formState.npm.value,
            password: formState.password.value
        };
        const res: Response = await fetch('/api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API_KEY': 'YOUR_API_KEY'
            },
            body: JSON.stringify(formData)
        });

        if (res.status === 500) {
            fetchDispatch({
                type: 'SET_FORM_SUBMIT_RESULT',
                payload: false
            });
        } else if (!res.ok) {
            fetchDispatch({
                type: 'SET_FORM_SUBMIT_RESULT',
                payload: false
            });
        }
        fetchDispatch({
            type: 'SET_FORM_SUBMIT_RESULT',
            payload: true
        });
    };
    return (
        <>
            <div className="w-full pl-10 flex items-center justify-evenly rounded-lg z-10">
                <div className="order-last basis-60 p-8 h-full flex flex-col items-center gap-y-7 text-black dark:text-white rounded-lg bg-zinc-50 dark:bg-neutral-950/80">
                    <section className="space-y-0.5 select-none">
                        <h1 className="font-medium text-3xl w-full text-center subpixel-antialiased">
                            {`Selamat Datang`}
                        </h1>
                        <p className="text-xs text-center">
                            di Laboratorium Bahasa Pemrograman
                        </p>
                    </section>
                    <form className="w-80 flex flex-col gap-y-3 text-black dark:text-white"
                          onSubmit={handleFormSubmit}>
                        <label
                            htmlFor="npm-input"
                            className="text-xs font-sans font-medium select-none">NPM
                        </label>
                        <input
                            id="npm-input"
                            className="py-1.5 text-sm font-semibold indent-2 outline-none border-[1px] border-zinc-600/50 rounded-[0.4rem] shadow-sm shadow-zinc-400/80 dark:shadow-none text-black"
                            type="text"
                            name="username"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                formDispatch({
                                    type: 'SET_NPM_VALUE',
                                    payload: event.target.value
                                });
                            }}
                        />
                        <label
                            htmlFor="password-input"
                            className="text-xs font-sans font-medium select-none">Password
                        </label>
                        <input
                            id="password-input"
                            type="password"
                            className="py-1.5 text-sm font-semibold indent-2 outline-none border-[1px] border-zinc-600/50 rounded-[0.4rem] shadow-sm shadow-zinc-400/80 dark:shadow-none text-black"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                formDispatch({
                                    type: 'SET_PASSWORD_VALUE',
                                    payload: event.target.value
                                });
                            }}
                        />
                        <button type="button" className="relative group ml-auto text-right text-xs font-medium">
                            <p>
                                Pertanyaan seputar login
                            </p>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-width duration-300 ease-in-out"></span>
                        </button>
                        <button
                            type="submit"
                            className="mt-5 w-full py-2 text-sm text-white bg-black rounded-md">
                            Masuk
                        </button>
                    </form>
                    <section className="w-80 flex flex-col gap-y-6">
                        <p className="text-center text-xs font-medium select-none">
                            Mengalami kendala login? Yuk tanya ke Aslab
                        </p>

                        <Link
                            href="/"
                            className="relative group mx-auto flex flex-row justify-between items-center"
                        >
                            <p className="uppercase text-sm tracking-wider font-medium">
                                Hubungi Aslab
                            </p>
                            <iconify-icon
                                icon="material-symbols-light:chevron-right"
                                width={25}
                            />
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-width duration-300 ease-in-out"></span>
                        </Link>
                    </section>
                </div>
                <Image
                    src={LBPLogo}
                    alt="logo-basprog"
                    width={300}
                    className="invert opacity-85"
                />
            </div>
        </>
    );
};
