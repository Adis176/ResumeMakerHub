
import ServerComponentExample from "../Components/serverComponentExample";
import ClientComponentExample from "../Components/clientComponentExample";
import { AuthProvider } from "./api/auth/authContext";
const page = () => {
  return (
    <AuthProvider>
      <main className="flex flex-grow flex-col items-center justify-center space-y-10">
        <ClientComponentExample />
        <ServerComponentExample />
      </main>
    </AuthProvider>
  )
}

export default page