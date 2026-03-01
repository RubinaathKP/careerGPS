import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Demo Account",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "demo" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock authentication - accept anything for the demo
                if (credentials?.username) {
                    return {
                        id: "user_123",
                        name: credentials.username,
                        email: `${credentials.username}@example.com`,
                    };
                }
                return null;
            }
        })
    ],
    // Removed custom pages so NextAuth uses the default login form
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
