import { redirect } from "next/navigation";

const HomePage = async () => {
    return redirect('/not-found');
};

export default HomePage;
