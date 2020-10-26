import App from "next/app";
import { useAuth } from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext);
	const { getSession } = useAuth();
	const session = await getSession(appContext.ctx);

	return { ...appProps, pageProps: { ...appProps.pageProps, session } };
};
export default MyApp;
