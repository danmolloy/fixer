import { redirect } from "next/navigation";
import { auth, signIn } from "../auth"; 
import { IoLogoGithub } from "react-icons/io";

export default async function SignIn() {
  const session = await auth()

  if (session) {
    redirect("/");
  }

  return (
    <div data-testid="sign-in-index">
      <h1 className="text-xl">Sign in to your account</h1>
      <form
            action={async () => {
              "use server"
              await signIn("github")
            }}
          >
            <button data-testid="sign-in-btn" className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light" type="submit">Sign in</button>
          </form>
    </div>
  )
}