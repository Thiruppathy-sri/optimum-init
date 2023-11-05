import { GET } from "./api/users/route";
import StoreInitializer from "./components/StoreInitializer";
import NavigationTabs from "./components/tabs";
import { useStore } from "./store/store";
async function UsersData() {
  const result = await GET();
  return result.json();
}

export default async function Home() {
  const users = await UsersData();
  useStore.setState({ users: users });
  const userData: any = useStore.getState().users;

  return (
    <>
      <StoreInitializer users={userData} />
      <div className=" h-screen flex items-center justify-center max-w-md mx-auto">
        <div className="min-h-[500px] min-w-[400px]">
          {" "}
          <NavigationTabs />
        </div>
      </div>
    </>
  );
}
