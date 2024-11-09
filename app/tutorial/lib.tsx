import SignUp from '../../public/images/sign_up.svg';
import Team from '../../public/images/team.svg';
import Contacts from '../../public/images/people_search.svg';
import Calendar from '../../public/images/calendar.svg';
import Coffee from '../../public/images/coffee_friends.svg';
import Inbox from '../../public/images/inbox.svg';

export type TutorialStep = {
  step: number;
  header: string;
  body: string;
  svg: string;
};

export const tutorialData: TutorialStep[] = [
  {
    step: 1,
    header: 'Sign Up & Create an Organisation',
    body: `Use your GitHub account to sign up quickly. Add your organisation’s details in seconds.`,
    svg: SignUp,
  },
  {
    step: 2,
    header: 'Import Address Book & Invite Admin Team',
    body: `Easily import your musician address book with our spreadsheet template. Email invitations to your admin team for collaborative access.`,
    svg: Team,
  },
  {
    step: 3,
    header: 'Create an Event and Book Players',
    body: `Create an event in seconds, then define how many musicians you need. GigFix will contact and book them on your behalf.`,
    svg: Calendar,
  },
  {
    step: 4,
    header: 'Update the Gig',
    body: 'If details change, simply update the gig in our system. GigFix will automatically notify the musicians immediately.',
    svg: Inbox,
  },
  {
    step: 7,
    header: 'Let us handle the work',
    body: 'Make the most of the time we save you to stay on top of other tasks.',
    svg: Coffee,
  },
];
