import ProtectedLayout from "../layout/ProtectedLayout";

const account = ({ session }) => {
	return (
		<ProtectedLayout session={session}>
			<h1>My Account</h1>
		</ProtectedLayout>
	);
};

export default account;
