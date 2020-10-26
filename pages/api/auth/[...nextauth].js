import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const options = {
	// Configure one or more authentication providers
	providers: [
		Providers.Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const user = {
					email: credentials.email,
					jwt:
						"adsfadsfadsfasdfasdfasdfasdfasdfasdfafasdfasdfsdfsdfsdfsdfgsdfg",
					image: "https://loremflickr.com/200/200",
				};

				if (user) {
					return user;
				} else {
					return Promise.resolve(null);
				}
			},
			callbacks: {
				signIn: async (user, account, profile) => {
					console.log({ user, account, profile });
					if (user.token) {
						console.log("there is token", user.token);
					} else {
						console.log("there is no token");
					}
					return true;
				},

				session: async (session, token) => {
					console.log({ session, token });
					session.accessToken = "token.accessToken";
					return session;
				},

				redirect: async (url, baseUrl) => {
					return baseUrl;
				},
			},
		}),
	],
};

export default (req, res) => NextAuth(req, res, options);
