import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export default function UserProfile(props) {
  const { user } = props
  return (
    <div data-testid="user-profile-div" className="flex flex-col w-full">
      <div className="flex flex-row rounded lg:w-1/2 border border-slate-400 shadow" data-testid="profile-header">
        <div className="rounded-md shadow overflow-hidden m-2">
          <Image src={"http://placebeard.it/200/200"} width={200} height={200} />
        </div>
        <div className="flex flex-col p-2">
          <h1 className="font-bold text-3xl">{user.name}</h1>
          <h3 className="text-gray-400 ">{user.instrument}</h3>
          <div className=" flex flex-col p-4">
        <Button variant="text" data-testid="profile-contact-btn" onClick={() => alert("Function not implemented")}>
          Contact {user.name}
        </Button>
        <Link href="/directory">
          <Button variant="outlined">
            Directory
          </Button>
        </Link>
      </div>
        </div>
        
        {/* <AiOutlineUser className="border-2 border-black rounded-full text-6xl" title={`${user.name}-image`}/> */}
      </div>
      <div className="profile-text" data-testid="profile-text">
        <div className="py-2">
        <h2 className="">Professional Work</h2>
          <ul className="p-2">
            <li>At vero eos et accusamus</li>
            <li>Iusto odio dignissimos ducimus qui </li>
            <li>Blanditiis praesentium voluptatum deleniti </li>
            <li>Atque corrupti quos dolores </li>
            <li>Quas molestias excepturi </li>
            <li>Sint occaecati cupiditate non provident </li>
            <li>Similique sunt in culpa qui </li>
            <li>Officia deserunt mollitia animi</li>
            <li>Id est laborum et dolorum fuga</li>
          </ul>
          </div>
          <div className="py-2">
        <h2>Education</h2>
        <ul className="p-2">
            <li>At vero eos et accusamus (2012-2013)</li>

            <li>Iusto odio dignissimos ducimus qui (2009-2011)</li>
        </ul>
        </div><div>
        <h2>Referees</h2>
        <ul>
            <li className="p-2">
              <h4>Roy Dereks</h4>
              <p>e: roy@dereks.com</p>
            </li>

            <li className="p-2">
              <h4>Brett Sturdy</h4>
              <p>e: brett@sturdy.com</p>
            </li>
        </ul>
        </div>
      </div>
    </div>
  )
}