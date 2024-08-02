import { Session } from "next-auth";
import { mockUser } from "./models/user";
import { mockAdminWithEnsemble } from "./models/ensembleAdmin";
import { DateTime } from "luxon";

export const mockSession: Session = {
  user: {
    ...mockUser,
    lastName: undefined,
    firstName: undefined,
    email: undefined,
    name: `${mockUser.firstName} ${mockUser.lastName}`,
    admins: [{
      ...mockAdminWithEnsemble
    }]
  },
  expires: DateTime.now().plus({days: 1}).toString(),
}