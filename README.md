# GigFix

## Overview

GigFix is a specialized communications tool designed to optimize the workflow for orchestra management. It enhances communication between the management team and musicians by automating musician bookings, centralizing gig information and promptly relaying updated information to the relevant parties.

This is an ongoing project which will hopefully soon be available for commercial use.

## Features

- **Team Accounts**: Create and manage a management team with varying levels of access. Suitable for teams that use freelance staff for projects.
- **Musician Address Book**: Import and maintain a comprehensive address book of musicians.
- **Event Summary**: View all gig details, overview of the orchestra list and booking status of each instrument.
- **Automated Communications**: Send automated email/SMS offers, check availability, and book an entire orchestra of a bespoke size. All musicians are notified via email/SMS when gig information changes.
- **Flexible Bookings**: Book a varying number of players for each rehearsal, state their role, send them personal messages.
- **Event Creation**: Generate detailed gig pages that display all relevant information for involved parties.
- **Responsive Calendar**: View events in a visually appealing calendar with day, week, month, and year views, optimized for all screen sizes.
- **Attractive Landing Page**: A modern web app utilizing NextJS and Tailwind CSS.
- **Responsive Design**: Suitable pages for all screen sizes.
- **Stripe Subscription Payments**: Usage-based payments billed monthly.

## Technologies Used

- NextJS 15
- TypeScript
- Tailwind CSS
- Formik & Yup
- Auth.js
- Prisma & PostgresQL
- Jest, React Testing Library & Playwright
- Stripe
- Twilio SMS & SendGrid

## Technical Overview

- **Robust Forms** built with Formik to perform database queries. Rigourously tested to provide a seamless experience, complete with Yup validation, error messages and feedback.
- **Concise Data Display**: HTML tables, thorough list filtering and sorting functions across various object arrays, ensuring clear and efficient presentation of complex data types.
- **Attractive Interface** built with Tailwind CSS, based on Tailwind's components.
- **Responsive Design** built with a mobile-first philosophy. The website has a number if features unique to mobile view.
- **Relational Database**: Efficient management of CRUD operations with Prisma ORM and PostgreSQL, supporting one-to-many and many-to-many relationships.

## Testing

Unit tests with Jest and React Testing Library achieve a high code coverage threshold (87.56% Stmts, 88.25% lines), focusing on maintaining a consistent UI and critical logic. An array of Jest matchers (such as .toBe(), .toEqual() and .toBeInTheDocument()) are leveraged for effective assertions. Predictable UI output is maintained with snapshot tests for all components. Test suites are regularly reviewed to ensure failures are swiftly captured, and the site continues to be manually tested across a variety of screen sizes.
As this is an ongoing project, tests continue to be written and erased. End-to-end tests are beginning to be written with Playwright.

## Accessibility

The site is continuously tested for accessibility with the aim of an inclusive experience for all users. It has been built adhere to Web Content Accessibility Guidelines (WCAG) 2.0 conformance standards, levering tools such as WebAIM WCAG checklist, Google Lighthouse, ESLint (including `eslint-plugin-jsx-a11y` extension) and Chrome DevTools.

## Credits

The entire project has been designed and built by Daniel Molloy.
