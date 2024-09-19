import SignUp from '../../public/images/sign_up.svg';
import Team from '../../public/images/team.svg';
import Contacts from '../../public/images/people_search.svg';
import Calendar from "../../public/images/calendar.svg";
import Coffee from "../../public/images/coffee_friends.svg";
import Inbox from "../../public/images/inbox.svg";

export type TutorialStep = {
  step: number;
  header: string;
  body: string;
  svg: string
}

export const tutorialData: TutorialStep[] = [
  {
    step: 1,
    header: "Create an Account",
    body: `Sign up for GigFix using GitHub (it's free).`,
    svg: SignUp
  },
  {
    step: 2,
    header: "Set Up Your Organization",
    body: `Enter the name of your organization and any orchestras it operates under. Once done, choose the payment plan that suits you.`,
    svg: Team
  },
  {
    step: 3,
    header: "Invite Team Members & Populate the Address Book",
    body: `Invite your admin team to join the organization's account and import a spreadsheet of your musicians.`,
    svg: Contacts

  },
  {
    step: 4,
    header: "Add Events to the Calendar",
    body: "Create events in the system to serve as the single source of truth for both musicians and management.",
    svg: Calendar
  
  },
  {
    step: 5,
    header: "Book Musicians",
    body: "Select musicians from your address book to offer gigs to. We'll handle the details and notify you of their responses.",
    svg: Coffee
  },
  {
    step: 6,
    header: "Manage Your Schedule",
    body: "Stay organized with the calendar interface. Update the gig details and we'll instantly alert everyone of any changes.",
    svg: Inbox
  },
]