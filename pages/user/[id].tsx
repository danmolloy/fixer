import UserProfile from "../../components/users/profile";
import Layout from '../../components/layout/layout'
import { useRouter } from "next/router";
import useSWR from "swr";
import IsLoadingProfile from "../../components/users/isLoadingProfile";
import Loading from "../../components/index/loading";
import { useSession } from "next-auth/react";
import LandingPage from "../../components/landingPage/landingPage";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/user/${id}` : null, fetcher)
  const { data: session, status } = useSession()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>Error</p>
  }


  if (!session) {
    return (
      <Layout>
        <LandingPage />
      </Layout>
    )}

  
  return (
    <Layout pageTitle={null}>
      {isLoading 
      ? <IsLoadingProfile />
      : data 
      ? <UserProfile user={data}/>
      : <p>Error</p>}
    </Layout>
  )
}

// Don't forget to have 404's when you make this page dynamic