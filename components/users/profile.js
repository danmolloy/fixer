import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export default function UserProfile(props) {
  const { user } = props
  return (
    <div data-testid="user-profile-div" className="flex flex-col">
      <div className="profile-header" data-testid="profile-header">
        <h1>{user.name}</h1>
        <AiOutlineUser className="border-2 border-black rounded-full text-6xl" title={`${user.name}-image`}/>
        {/* <Image src={"https://www.fillmurray.com/200/300"} width={200} height={300} layout="fixed"/> */}

        <h3>{user.instrument}</h3>
      </div>
      <div className="profile-text" data-testid="profile-text">
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <ul>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum dolor sit amet</li>
        </ul>
      </div>
      <div className="profile-buttons-div">
        <button className="secondary-btn" data-testid="profile-contact-btn" onClick={() => alert("Function not implemented")}>
          Contact {user.name}
        </button>
        <Link href="/directory">
          <button className="primary-btn" >
            Directory
          </button>
        </Link>
      </div>
    </div>
  )
}