import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { socialMedia } from '../../../app/layout/footer';
import Footer, { footerMenuLinks } from '../../../app/layout/footer';
import { mockSession } from '../../../__mocks__/session';
import { signIn, signOut } from 'next-auth/react';
jest.mock('@auth/prisma-adapter');
jest.mock('next-auth/react');

describe('<Footer />', () => {
  const mockProps = {
    session: null,
  };
  beforeEach(() => {
    render(<Footer {...mockProps} />);
  });
  it('<Footer /> renders', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('all footerMenuLinks are in the document with href and text', () => {
    for (let i = 0; i < footerMenuLinks.length; i++) {
      const link = screen.getByText(footerMenuLinks[i].name);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', footerMenuLinks[i].link);
    }
  });
  it('all socialMedia links are in the document with text', () => {
    for (let i = 0; i < socialMedia.length; i++) {
      const social = screen.getByTestId(socialMedia[i].id);
      expect(social).toBeInTheDocument();
    }
  });
  it('company name in the document', () => {
    const companyName = screen.getByText('2024 Gig Fix Limited');
    expect(companyName).toBeInTheDocument();
  });
  it('if !session, signIn btn is in the document and calls signIn on click', async () => {
    const signInBtn = screen.getByText('Sign In');
    expect(signInBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(signInBtn);
    });
    expect(signIn).toHaveBeenCalledWith('github', { redirectTo: '/' });
  });
});

describe('<Footer />', () => {
  const mockProps = {
    session: mockSession,
  };
  beforeEach(() => {
    render(<Footer {...mockProps} />);
  });
  it('if session, social media, company name & links are in the document', () => {
    for (let i = 0; i < socialMedia.length; i++) {
      const social = screen.getByTestId(socialMedia[i].id);
      expect(social).toBeInTheDocument();
    }
    for (let i = 0; i < footerMenuLinks.length; i++) {
      const link = screen.getByText(footerMenuLinks[i].name);
      expect(link).toBeInTheDocument();
    }
    const companyName = screen.getByText('2024 Gig Fix Limited');
    expect(companyName).toBeInTheDocument();
  });
  it('if session, signOut btn is in the document and calls signOut on click', async () => {
    const signOutBtn = screen.getByText('Sign out');
    expect(signOutBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(signOutBtn);
    });
    expect(signOut).toHaveBeenCalled();
  });
});
