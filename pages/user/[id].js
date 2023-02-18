import UserProfile from "../../components/users/profile";
import Layout from '../../components/layout/layout'

const dummyData = {
  "id":"cl5jlqw1e0057t6u07993b5w1",
  "name":"Roy Dereks",
  "email":"Daphne38@gmail.com",
  "emailVerified":null,
  "image":null,
  "instrument":"Trombone",
  "profileInfo":null,
  "isFixer":null,
}


export default function UserPage() {
  return (
    <Layout pageTitle={null}>
      <UserProfile user={dummyData}/>
    </Layout>
  )
}

// Don't forget to have 404's when you make this page dynamic