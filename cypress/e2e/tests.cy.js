import { cypressAdd, login } from "../support/commands";

const eventObj = {
	id: 1,
	createdAt: "2018-06-12T19:30",
	updatedAt: "2018-06-12T19:30",
	ensembleName: "BBCSO",
  concertProgram: "Brahms",
  calls: [{
		startTime: "2018-06-12T19:30",
  	endTime: "2018-06-12T22:30",
  	venue: "MV",
	}],
  dressCode: "Blacks",
  fee: "400",
  additionalInfo: undefined,
  fixer: {
		email: "danielmolloy_6@icloud.com",
	}
}

before(() => {
	cy.login();
	cy.visit("/");
	cy.wait("@session");
})


describe("Cypress before hook logs in", () => {
	it("should provide a valid session", () => {
		cy.get(".layout").should("exist").then(() => {
			cy.log("Cypress login successful");
		});
	});
});

describe("Dashboard", () => {
	before(() => {
		cy.log("Before called")
		cy.login();
		cy.visit("/");
		cy.wait("@session");
	})
	it(".tile-list contains exactly three children", () => {
		cy.get(".tile-list").should("exist")
		const tiles = cy.get(".tile-list").children()
		tiles.should('have.length', 3)

	})
	it("Fix Event tile exists", () => {
		const fixLink = cy.get("#create-event-link")
		fixLink.should('exist')

	})
	it("Search Directory tile exists", () => {
		const directoryLink = cy.get("#directory-link")
		directoryLink.should('exist')

	})
	it("Upcoming Events tile exists", () => {
		const upcomingEventsLink = cy.get("#upcoming-events-link")
		upcomingEventsLink.should('exist')
	})
})

describe("Fixing Form", () => {
	before(() => {
		cy.login();
		cy.visit("/");
		cy.wait("@session");
	})
	it("'/event/create' gets Create Event page", () => {
		cy.visit("/event/create")
		cy.get("#fixing-form").should("exist")
	})
	it("Ensemble has radio options, including 'other' option/text input", () => {
		cy.get(".ensemble-radio-option").should("exist")
		cy.get("#other-ensemble-input").should("exist")
	})
	it("Concert Program input exists", () => {
		cy.get("#concert-program-input").should("exist")
	})
	it("'#calls-array' has one child element which is 'Call 1'", () => {
		const callsArr = cy.get("#calls-array")
		callsArr.should("exist")
		callsArr.should('have.length', 1)
	})
	it("'Call 1' Start Time exists and is datetime-local input", () => {
		cy.get(".start-time-input").should('exist')
	})
	it("'Call 1' End Time exists and is datetime-local input", () => {
		cy.get(".end-time-input").should('exist')
	})
	it("'Call 1' Venue input exists", () => {
		cy.get(".call-venue").should('exist')
	})
	//it("Contains a dropdown menu for 'Venue'", () => {})
	it("'Add Call' button exists", () => {
		cy.get(".add-call-btn").should('exist')
	})
	it("Add Call button exists and adds element labelled 'Call 2'", () => {
		const callsArr = cy.get("#calls-array")
		callsArr.contains("Call 1")
		callsArr.not("contains", "Call 2")
		cy.get(".add-call-btn").click()
		cy.get("#calls-array").should("contain", "Call 2")
	})
	it('Dress Code text input exists', () => {
		cy.get("#dress-code-input").should('exist')
	})
	it("Fee text input exists", () => {
		cy.get("#fee-input").should('exist')
	})
	it('Addional Info text input exists', () => {
		cy.get('#additional-info-input').should('exist')
	})
	it('Create Event button exists', () => {
		cy.get('#create-event-btn').should('exist')
	})
	it('Create Event button', () => {
		cy.log()
		cy.get('#create-event-btn').click()
		cy.intercept('POST', '/api/event/create', {
			statusCode: 200,
			body: eventObj,
		})
		
	})
})