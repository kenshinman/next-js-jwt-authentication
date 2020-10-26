import { signIn, csrfToken } from "next-auth/client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

const Signin = () => {
	const { logIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await logIn({ email, password });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					name="email"
				/>
			</div>
			<div>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
				/>
			</div>
			<div>
				<button type="submit">{loading ? "loading..." : "Login"} </button>
			</div>

			<Link href="/">
				<a>Home</a>
			</Link>
		</form>
	);
};

Signin.getInitialProps = async (context) => {
	return {
		csrfToken: await csrfToken(context),
	};
};

export default Signin;
