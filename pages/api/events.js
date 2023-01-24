// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const eventData = [
  {
    name: "NSO Cheltenham Dep",
    fixer: "Dan Molloy",
    id: "1",
    eventInfo: {
      message: "Cheltenham town hall \nWednesday 25 May\n2.00-5.30 rehearsal; 7.30 concert\nDress: All smart concert blacks\nProgramme:\nTCHAIKOVSKY ROMEO AND JULIET OVERTURE\nSHOSTAKOVITCH PIANO CONCERTO no 1 (John Lenehan and Simon Munday)\nTCHAIKOVSKY SYMPHONY NO 5\nConductor: Rimma Sushanskaya"
    },
    callLists: [
      {
        name: "Bass Dep",
        id: 3,
        players: [
          {name: "Ed Parr", status: "Unread"}, 
          {name: "Rory Dempsey", status: "Unread"}, 
          {name: "Noah Dempsey", status: "Read"},
          {name: "Kai Russell", status: "Unread"},
          {name: "Matt Hurl", status: "Declined"},
          {name: "Fiona Kelly", status: "Unread"},
        ],
        callOrder: 'CallAll',
        numToBook: 1,
        completed: 'false'
      },
    ]
  }, 
  {
    name: "Cork Pops Care Home",
    fixer: "Dan Molloy",
    id: "2",
    eventInfo: {
      ensemble: "Cork Pops Orchestra",
      program: "Dvorak String Serenade",
      rehearsals: [
        {
          id: 1,
          startTime: 1000,
          endTime: 1300,
          date: "27 May 2022",
          venue: "Cork Care Home"
        }
      ],
      performances: [
        {
          id: 2,
          startTime: 1430,
          date: "27 May 2022",
          venue: "Cork Care Home"
        }
      ],
      dress: "Smart/Long Blacks",
      fee: "£250.00",
      info: "Message me for parking. Payment made within 14 days."
    },
    callLists: [
      {
        name: "1st Violins",
        id: 32,
        players: [
          {name: "Ed Parr", status: "Declined"}, 
          {name: "Rory Dempsey", status: "Booked"}, 
          {name: "Noah Dempsey", status: "Booked"},
          {name: "Kai Russell", status: "Booked"},
          {name: "Matt Hurl", status: "Unread"},
          {name: "Fiona Kelly", status: "Queued"},
        ],
        callOrder: 'Random',
        numToBook: 4,
        completed: 'false'
      },
      {
        name: "2nd Violins",
        id: 33,
        players: [
          {name: "Ed Parr", status: "Declined"}, 
          {name: "Rory Dempsey", status: "Booked"}, 
          {name: "Noah Dempsey", status: "Booked"},
          {name: "Kai Russell", status: "Booked"},
          {name: "Matt Hurl", status: "Unread"},
          {name: "Fiona Kelly", status: "Queued"},
        ],
        callOrder: 'Random',
        numToBook: 4,
        completed: 'false'
      },
      {
      name: "Cellos",
      id: 12,
      players: [
        {name: "Eoghan Kelly", status: "Booked"}, 
        {name: "Jorge Romero", status: "Declined"}, 
        {name: "Gerry Kelly", status: "Declined"},
        {name: "Aiden Larter", status: "Unread"},
        {name: "Evelyn Grant", status: "Read"},
        {name: "Rose Romero", status: "Queued"},
      ],
      callOrder: 'Ordered',
      numToBook: 3, 
      completed: 'false'
    
      },
      {
        name: "Basses",
        id: 13,
        players: [
          {name: "Dan Molloy", status: "Booked"}, 
          {name: "Jorge Romero", status: "Booked"}, 
        ],
        callOrder: 'Ordered',
        numToBook: 2,
        completed: 'true'
        },
    ]
  }, 
  {
    name: "Firkin Band",
    fixer: "Eoghan Kelly",
    id: "3",
    eventInfo: {
      message: "Sunday 5 May \n1400-1700 \nFox & Firkin, Ladywell \n£100 + free pizza"
    },
    callLists: [
      {
        name: "Trombone Section",
        id: 3,
        players: [
          {name: "Dan Molloy", status: "Booked"}, 
          {name: "Rory Dempsey", status: "Unread"}, 
          {name: "Noah Dempsey", status: "Read"},
          {name: "Kai Russell", status: "Unread"},
          {name: "Matt Hurl", status: "Declined"},
          {name: "Fiona Kelly", status: "Unread"},
        ],
        callOrder: 'Ordered',
        numToBook: 4,
        completed: 'false'
      },
    ]
  }, 
]

export default function handler(req, res) {
  res.status(200).json({ events: eventData })
}
