import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import Cookies from "js-cookie";
import Router from "next/router";

const isClient = typeof window !== "undefined";

/**
 * @function
 * @name useAuth
 * @description an authentication for NextJs. It helps authenticate both on the client and on the server side
 * @returns {object}
 */

export const useAuth = () => {
	/**
	 * @function
	 * @name useAuth
	 * @param {object} credentials
	 * @param  {string} credentials.email
	 * @param  {string} credentials.password
	 * @description a react hook for authenticating in next.js
	 */
	const logIn = async (credentials) => {
		const { email, password } = credentials;

		const login = new Promise((resolve, reject) => {
			const payload = {
				email,
				name: "Kehinde Orilogbon",
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
			};

			//do fake auth
			setTimeout(() => {
				resolve({
					user: { name: "kehinde Orilogbon", email },
					token: jwt.sign(payload, "mySecret"),
				});
			}, 2000);
		});

		const res = await login;
		setCurrentSession(res);
	};

	/**
	 * @function
	 * @name logOut
	 * @description clears user's session details and also the redirectTo cookie
	 */
	const logOut = async () => {
		Cookies.remove("token");
		Cookies.remove("user");
		Cookies.remove("redirectTo");
		Router.replace("/");
	};

	/**
	 * @function
	 * @name setCurrentSession
	 * @param {object} res the response data returned from your authentication endpoint should be an object
	 * @description Takes the user payload from login or register and sets the user payload
	 * cookie and token.
	 * Axios can also be configured here
	 *
	 */
	const setCurrentSession = (res) => {
		const { user, token } = res;
		Cookies.set("user", JSON.stringify(user));
		Cookies.set("token", token);
		const redirectTo = Cookies.get("redirectTo");
		if (redirectTo) {
			Router.push(redirectTo);
		} else {
			Router.push("/");
		}
	};

	/**
	 * @function
	 * @name getSession
	 * @param {object} ctx the app context passed from getServerSideProps
	 * It contains req, res, query, etc read here
	 * @description gets user's session both on client and server side.
	 * First on the client, it gets the cookies from the browser and on the server side, it extracts cookies from ctx.req.header.cookie
	 * After cookies are got and parsed, then it checks if the jwt valid using isValidToken().
	 * If token is valid, it appends the token and user payload to session and returns session
	 * @returns {object} session object
	 */
	const getSession = async (ctx) => {
		//on the server
		const session = {};

		let cookies = null;
		if (isClient) {
			cookies = Cookies.get();
		} else {
			cookies = cookie.parse(ctx.req.headers?.cookie || "");
		}
		const { token, user } = cookies;

		if (token && user && isValidToken(token)) {
			session.token = token;
			session.user = user ? JSON.parse(user) : null;
			session.isAuthenticated = true;
		}

		return session;
	};

	/**
	 * @function
	 * @name isValidToken
	 * @param {string} token
	 * @returns {boolean}
	 * @description returns `true` if token is valid and not expired, but `false` is expired or invalid
	 */
	const isValidToken = async (token) => {
		const payload = jwt.decode(token);
		if (payload) {
			const { exp } = payload;
			return exp * 1000 > Date.now();
		}
	};

	// useEffect(() => {}, []);

	return {
		logIn,
		logOut,
		isValidToken,
		getSession,
		// currentUser,
		// session,
		// setCurrentSession,
	};
};
