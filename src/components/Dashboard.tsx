import { useAuth } from "../context/AuthContext";
import { getUsernameFromEmail } from "../utils/string";
import PageLayout from "./layouts/PageLayout";

export default function Dashboard() {
    const { user } = useAuth();
    const userName = getUsernameFromEmail(user?.email)

    return (
        <PageLayout>
            <p>container - Dashboard</p>
        </PageLayout>
    )
}