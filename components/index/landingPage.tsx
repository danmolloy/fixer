import { useSession, signIn, signOut } from "next-auth/react"
import Header from "../layout/header"
import { Button } from "@mui/material"
import Layout from "../layout/layout"
import React from "react"


export default function LandingPage() {

  return (
      <div>
      <div className="w-full flex h-48 flex-col items-center justify-center shadow">
      <p className="text-lg font-light p-2">
        Fixer handles booking musicians and improves communication between players and managers.
      </p>
      <Button variant="outlined">Get Started</Button>

      </div>
      
      <div className=" p-4">
      <h2 className="font-nunito font-bold py-2 text-blue-700">Meet Fixer</h2>
      <p className="font-light">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
      </div>

      <div className=" p-4">
      <h2 className="font-nunito font-bold py-2 text-blue-700">Fix an orchestra in seconds</h2>
      <p className="font-light">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
      </div>
      <div className=" p-4">
      <h2 className="font-nunito font-bold py-2 text-blue-700">A modern diary</h2>
      <p className="font-light">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
      </div>
      <div className="p-4 self-center bg-slate-100 shadow rounded flex flex-col justify-evenly items-start w-4/5 my-2">
        <h2 className="font-nunito font-bold text-slate-800">Get started</h2>
        <p className="py-4">
          Sed ut perspiciatis unde omnis iste natuserror sit voluptatem accusantium doloremque laudantium.
        </p>
        <Button variant="outlined">Ipsum</Button>
      </div>
      </div>
  )
}