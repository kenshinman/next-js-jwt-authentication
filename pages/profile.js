import { useAuth } from "../hooks/useAuth";
import ProtectedLayout from "../layout/ProtectedLayout";

const Profile = ({ session }) => {
	return (
		<ProtectedLayout session={session}>
			<div>Hello You {session?.user?.name}</div>

			<button onClick={() => useAuth().logOut()}>Logout</button>
		</ProtectedLayout>
	);
};

export default Profile;
