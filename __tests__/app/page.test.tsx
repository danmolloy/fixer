import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../app/page';
import { prismaMock } from '../../__mocks__/singleton';
import { mockUser } from '../../__mocks__/models/user';
import { mockSession } from '../../__mocks__/session';
import { auth } from '../../app/auth';
import { mockCall } from '../../__mocks__/models/call';
import { mockEvent } from '../../__mocks__/models/event';
import { mockEnsemble } from '../../__mocks__/models/ensemble';
import { redirect } from 'next/navigation';

jest.mock('@auth/prisma-adapter');
jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}))

const mockUserCalendar = {
  ...mockUser,
  calls: [
    {
      ...mockCall,
      event: {
        ...mockEvent,
        ensemble: mockEnsemble,
      },
    },
  ],
  events: [
    {
      ...mockEvent,
      calls: [mockCall],
    },
  ],
};

describe('<Page />', () => {
  beforeEach(async () => {
    (auth as jest.Mock).mockReturnValueOnce(null);
    render(await Page());
  });
  it('if !session, <LandingPage /> is in the document', () => {
    const landingPage = screen.getByTestId('landing-page');
    expect(landingPage).toBeInTheDocument();
  });
});

describe('<Page />', () => {
  beforeEach(async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(mockUserCalendar);
    render(await Page());
  });
  it('if session, <CalendarIndex /> is in the document', () => {
    const calendarIndex = screen.getByTestId('calendar-index');
    expect(calendarIndex).toBeInTheDocument();
  });
});

describe('<Page />', () => {
  beforeEach(async () => {
    render(await Page());
  });
  it('if session && !data, calendar-loading is in the document', () => {
    const calendarLoading = screen.getByTestId('calendar-loading');
    expect(calendarLoading).toBeInTheDocument();
  });
});
