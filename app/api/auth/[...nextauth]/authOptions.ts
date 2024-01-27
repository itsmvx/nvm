import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60, // 4 hours
        updateAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        CredentialsProvider({
            credentials: {
                npm: { label: "NPM", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { npm, password } = credentials ?? {};
                if (!npm || !password) {
                    throw new Error("Missing username or password");
                }
                let existUser;
                try {
                    existUser = await prisma.praktikan.findUnique({
                        where: {
                            npm: npm
                        }
                    });
                } catch (error) {
                    return null;
                }
                if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
                    return null;
                }
                return {
                    id: existUser.id,
                    name: existUser.name,
                    npm: existUser.npm,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,

                };
            }
            return token;
        },
        async session({ session, token }) {
            if ( token.fullname ) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        fullname: token.fullname,
                        username: token.username,
                        email: token.email,
                        images: token.images,
                        role: token.role
                    }
                };
            }
            return session;
        },

    }
};
