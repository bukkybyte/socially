"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
    try {
        const {userId} = await auth();
        const user = await currentUser();
        if (!user || !userId) return;

        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: {clerkId: userId},
        });
        if (existingUser) return existingUser; // User already exists, no need to create a new one

        const dbUser = await prisma.user.create(
            {
                data: {
                    clerkId: userId,
                    name: `${user.firstName || ""} ${user.lastName || ""}`,
                    username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                    email: user.emailAddresses[0].emailAddress,
                    image: user.imageUrl,
                },
            }
        );
        return dbUser;
    } catch (error) {
        console.log("Error syncing user:", error);
    }
}