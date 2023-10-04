import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "http://localhost:3000",
    },

});

export const config = {
    matcher: [
        "/home"
    ]
};