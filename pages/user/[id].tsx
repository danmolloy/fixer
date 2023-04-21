import UserProfile from "../../components/users/profile";
import Layout from '../../components/layout/layout'
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/user/${id}` : null, fetcher)


  
  return (
    <Layout pageTitle={null}>
      {data && <UserProfile user={data}/>}
    </Layout>
  )
}

// Don't forget to have 404's when you make this page dynamic