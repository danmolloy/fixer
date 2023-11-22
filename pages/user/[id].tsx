import UserProfile from "../../components/users/profile";
import { useRouter } from "next/router";
import useSWR from "swr";
import IsLoadingProfile from "../../components/users/isLoadingProfile";
import LayoutIndex from "../../components/layout";
import { useSession } from "next-auth/react";
import SignIn from "../../components/layout/signIn";
import LoadingLayout from "../../components/layout/loading";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/user/${id}` : null, fetcher)
  const { data: session, status } = useSession()

  if (isLoading) {
    return <LoadingLayout />
  }

  if (error) {
    return <p>Error</p>
  }

  
  return (
    <LayoutIndex >
      {session 
      ? <UserProfile user={data}/> 
      : <SignIn />}
    </LayoutIndex>
  )
}

// Don't forget to have 404's when you make this page dynamic