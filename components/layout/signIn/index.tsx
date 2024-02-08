import { signIn } from "next-auth/react";
import { IoLogoGithub } from "react-icons/io";

export default function SignIn() {
  return (
    <div data-testid="sign-in-index">
      <div className="shadow border rounded flex flex-col p-4 mt-16">
      <h1 className="text-xl">Sign in to your account</h1>
      <p className="text-sm">Continue with</p>
      <div className="flex flex-col items-center justify-center my-2">
        <button className="hover:bg-gray-50 flex flex-row p-2 w-36 border rounded items-center justify-center" data-testid="github-btn" onClick={() => signIn("github")}>
          <div className="text-xl">
            <IoLogoGithub />

          </div>
          <p className="ml-2">GitHub</p>
        </button>
      </div>
      </div>
    </div>
  )
}