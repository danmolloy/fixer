import { AiOutlineMail } from "react-icons/ai"
import { BiDetail } from "react-icons/bi"
import { FaQuestion } from "react-icons/fa"
import { FiUserPlus } from "react-icons/fi"
import { IoCreateOutline, IoHomeOutline } from "react-icons/io5"
import { MdOutlineManageAccounts } from "react-icons/md"
import { RiCalendar2Line } from "react-icons/ri"

export const externalMenuLinks: {
  name: string,
  link: string, 
  id: string
  icon: React.ReactNode
}[] = [
  {
    name: "About",
    link: "/about",
    id: "about-link",
    icon: <BiDetail />

  },
  {
    name: "FAQ",
    link: "/faq",
    id: "faq-link",
    icon: <FaQuestion />

  },
  {
    name: "Contact",
    link: "/contact",
    id: "contact-link",
    icon: <AiOutlineMail />
  },
  {
    name: "Home",
    link: "/",
    id: "home-link",
    icon: <IoHomeOutline />
  },
] 

export const sessionMenuLinks: {
  name: string
  link: string
  id: string,
  icon: React.ReactNode
}[] = [
  {
    name: "Calendar",
    link: "/",
    id: "calendar-link",
    icon: <RiCalendar2Line />
  },
  {
    name: "Ensembles",
    link: "/ensembles",
    id: "ensembles-link",
    icon: <FiUserPlus />
  },
  {
    name: "Create Event",
    link: "/event/create",
    id: "create-event-link",
    icon: <IoCreateOutline />

  },
  {
    name: "Your Account",
    link: "/user/update",
    id: "your-details-link",
    icon: <MdOutlineManageAccounts />
  },
/*   {
    name: "Notifications",
    link: "/notifications",
    id: "notificatons-link",
    icon: <AiOutlineBell />
  }, */
]