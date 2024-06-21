import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import NotificationsList, { NotificationsListProps } from "../../app/notifications/notificationsList"
import { mockPlayerCallNotification } from "../../__mocks__/models/playerCall"
import { DateTime } from "luxon"



describe("<NotificationsList />", () => {
  const mockProps: NotificationsListProps = {
    ensembleFilter: null,
    playerCalls: [
      {
      ...mockPlayerCallNotification,
      accepted: null,
      id: 1,
      },
      {
        ...mockPlayerCallNotification,
        eventSection: {
          ...mockPlayerCallNotification.eventSection,
          event: {
            ...mockPlayerCallNotification.eventSection.event,
            eventTitle: "Second Event"
          }
        },
        accepted: false,
        id: 2,
        },
  ],
    playerCallFilter: "action"
  }

  beforeEach(() => {
    render(<NotificationsList {...mockProps} />)
  })
  it("notifications-list is in the document", () => {
    const notificationsList = screen.getByTestId("notifications-list")
    expect(notificationsList).toBeInTheDocument()
  })
  it("if filter === action required, all messages require action", () => {
    const notificationsList = screen.getByTestId("notifications-list")

    for (let i = 0; i < mockProps.playerCalls.length; i ++) {
      if (mockProps.playerCalls[i].accepted === null) {
        const playerCallPreview = screen.getByTestId(`${mockProps.playerCalls[i].id}-preview`)
        expect(playerCallPreview).toBeInTheDocument()
      } else {
        expect(notificationsList.textContent).not.toMatch(mockProps.playerCalls[i].eventSection.event.eventTitle)
      }
    }
  })

  //it("if filter === sent, all messages are sent and authored by user", () => {})
  //it("if filter === unread, all messages are unread", () => {})
})

describe("<NotificationsList />", () => {
  const mockProps: NotificationsListProps = {
    ensembleFilter: null,

    playerCalls: [
      {
      ...mockPlayerCallNotification,
      accepted: null,
      id: 1,
      },
      {
        ...mockPlayerCallNotification,
        eventSection: {
          ...mockPlayerCallNotification.eventSection,
          event: {
            ...mockPlayerCallNotification.eventSection.event,
            eventTitle: "Second Event"
          }
        },
        accepted: false,
        id: 2,
        },
  ],
    playerCallFilter: null
  }

  beforeEach(() => {
    render(<NotificationsList {...mockProps} />)
  })

  it("if filter is null, all playerCalls are in the document", () => {
    for (let i = 0; i < mockProps.playerCalls.length; i ++) {
      const playerCallPreview = screen.getByTestId(`${mockProps.playerCalls[i].id}-preview`)
      expect(playerCallPreview).toBeInTheDocument()
    }
  })
})

describe("<NotificationsList />", () => {
  const mockProps: NotificationsListProps = {
    ensembleFilter: null,

    playerCalls: [
      {
      ...mockPlayerCallNotification,
      accepted: false,
      id: 1,
      calls: [{
        ...mockPlayerCallNotification.calls[0],
        endTime: DateTime.now().minus({days: 1}).toJSDate()
      }]
      },
      {
        ...mockPlayerCallNotification,
        calls: [{
          ...mockPlayerCallNotification.calls[0],
          endTime: DateTime.now().startOf("day").toJSDate()
        }],
        eventSection: {
          ...mockPlayerCallNotification.eventSection,
          event: {
            ...mockPlayerCallNotification.eventSection.event,
            eventTitle: "Second Event"
          }
        },
        accepted: true,
        id: 2,
        },
  ],
    playerCallFilter: "past"
  }

  beforeEach(() => {
    render(<NotificationsList {...mockProps} />)
  })

  it("if filter === past, all messages are from past projects", () => {
    const notificationsList = screen.getByTestId("notifications-list")

    for (let i = 0; i < mockProps.playerCalls.length; i ++) {
      const sortedCalls = mockProps.playerCalls[i].calls.sort((a, b) => Number(DateTime.fromJSDate(a.startTime)) - Number(DateTime.fromJSDate(b.startTime).toMillis))
      const endDate = DateTime.fromJSDate(sortedCalls[sortedCalls.length - 1].endTime)

      if (endDate < DateTime.now().startOf("day")) {
        expect(notificationsList.textContent).not.toMatch(mockProps.playerCalls[i].eventSection.event.eventTitle)
      } else {
        const playerCallPreview = screen.getByTestId(`${mockProps.playerCalls[i].id}-preview`)
        expect(playerCallPreview).toBeInTheDocument()
      }
    }
  })
})

describe("<NotificationsList />", () => {
  const mockProps: NotificationsListProps = {
    playerCalls: [{
      ...mockPlayerCallNotification,
      eventSection: {
        ...mockPlayerCallNotification.eventSection,
        event: {
          ...mockPlayerCallNotification.eventSection.event,
          ensembleId: "mockEnsembleId",
          eventTitle: "mockEventTitle"
        }
      }
    }, mockPlayerCallNotification],
    ensembleFilter: mockPlayerCallNotification.eventSection.event.ensembleId,
    playerCallFilter: null
  }

  beforeEach(() => {
    render(<NotificationsList {...mockProps} />)
  })

  it("if filter === [ensemble], all offers are from selected ensemble", () => {
    const notificationsList = screen.getByTestId("notifications-list")
    for (let i = 0; i < mockProps.playerCalls.length; i ++) {
      if (mockProps.playerCalls[i].eventSection.event.ensembleId === mockProps.ensembleFilter) {
        const playerCallPreview = screen.getByTestId(`${mockProps.playerCalls[i].id}-preview`)
        expect(playerCallPreview).toBeInTheDocument()
      } else {
        expect(notificationsList.textContent).not.toMatch(mockProps.playerCalls[i].eventSection.event.eventTitle)
      }
    }
  })
})

describe("<NotificationsList />", () => {
  const mockProps: NotificationsListProps = {
    playerCalls: [],
    playerCallFilter: null,
    ensembleFilter: null
  }
  beforeEach(() => {
    render(<NotificationsList {...mockProps} />)
  })
  it("if there are no messages, it states so", () => {
    const notificationsList = screen.getByTestId("notifications-list")
    expect(notificationsList.textContent).toMatch("You have no notifications.")
  })
})