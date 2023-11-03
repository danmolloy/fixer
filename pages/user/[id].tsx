import UserProfile from "../../components/users/profile";
import { useRouter } from "next/router";
import useSWR from "swr";
import IsLoadingProfile from "../../components/users/isLoadingProfile";
import Loading from "../../components/index/loading";
import { useSession } from "next-auth/react";
import LandingPage from "../../components/externalSite/landingPage/landingPage";
import LayoutIndex from "../../components/layout";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/user/${id}` : null, fetcher)



  if (error) {
    return <p>Error</p>
  }

  
  return (
    <LayoutIndex pageTitle={null}>
      {isLoading 
      ? <IsLoadingProfile />
      : data 
      ? <UserProfile user={data}/>
      : <p>Error</p>}
    </LayoutIndex>
  )
}

// Don't forget to have 404's when you make this page dynamic