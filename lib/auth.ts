import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          let user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            const hashedPassword = await bcrypt.hash(credentials.password as string, 10);
            user = await prisma.user.create({
              data: {
                email: credentials.email as string,
                password: hashedPassword,
                name: (credentials.email as string).split("@")[0],
                role: "CUSTOMER",
              }
            });
          } else {
            const valid = await bcrypt.compare(credentials.password as string, user.password);
            if (!valid) return null;
          }

          return { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role 
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
  pages: { signIn: "/login" },
});

