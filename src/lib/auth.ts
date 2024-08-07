import { prisma } from "@/src/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import {deleteSession} from "@/src/actions/session";
import {signOut} from "next-auth/react";
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider(    {
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                    include: {
                        access: {
                            where: {
                                startDate: { gte: new Date() },
                                endDate: { lt: new Date() },
                            },
                            select: {
                                startDate: true,
                                endDate: true,
                            },
                        },
                    }
                });

                if (!user || !(await compare(credentials.password, user.password))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    access: user.access,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token,user }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    access: token.access
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    access: u.acces,
                };
            }
            return token;
        },
    },
    secret: process.env.AUTH_SECRET,
};


export const signOutDeleteSession = async () => {
    await deleteSession()
    await signOut({callbackUrl: '/'})
}
