import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string; // Add the id property here
            name?: string | null;
            email?: string | null;
            image?: string | null;
            access?: {
                startDate: Date,
                endDate: Date,
            } | null
        };
    }

    interface User {
        id: string; // Add the id property for the User object as well
        name?: string | null;
        email?: string | null;
        image?: string | null;
        /*access?: {
            startDate: Date,
            endDate: Date,
        } | null*/
    }
}
