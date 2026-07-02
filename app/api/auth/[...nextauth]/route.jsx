import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
export const authOptions={
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text",placeholder:"user name or email"},
                password: { label: "Password", type: "password",placeholder:"password" }
            },
            async authorize(credentials, req) {
                const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com', }

                return user;
            }
        })
        
    ],
    secret: process.env.NEXTAUTH_SECRET,
    Session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        SignUp: "/auth/signup",
        error: "/auth/error", 
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: null // Will disable the new account creation screen
    },
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 