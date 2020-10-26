import Router from "next/router";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ProtectedLayout = ({ session, children }) => {
	const router = useRouter();
	if (typeof window === "undefined" && !session?.isAuthenticated) {
		return null;
	}
	if (typeof window !== "undefined" && !session?.isAuthenticated) {
		Cookies.set("redirectTo", router.route);
		console.log({ router });
		router.push(`/signin`);

		return null;
	}

	return (
		<div>
			<h1>This is a protected Route</h1>
			{children}
		</div>
	);
};

export default ProtectedLayout;
