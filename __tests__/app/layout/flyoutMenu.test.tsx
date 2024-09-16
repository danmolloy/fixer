import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import FlyOutMenu, { ExternalMenuProps } from '../../../app/layout/flyoutMenu';
import {
  externalMenuLinks,
  sessionMenuLinks,
} from '../../../app/layout/menuLinks';
import { signIn } from 'next-auth/react';
import { signOut } from '../../../app/auth';
import { mockSession } from '../../../__mocks__/session';

jest.mock('@auth/prisma-adapter');
jest.mock('next-auth/react');

describe('<FlyOutMenu />', () => {
  const mockProps: ExternalMenuProps = {
    session: null,
  };
  beforeEach(() => {
    render(<FlyOutMenu {...mockProps} />);
  });
  it('<FlyOutMenu /> renders', () => {
    const flyout = screen.getByTestId('external-menu');
    expect(flyout).toBeInTheDocument();
  });
  it('if no session, all external menu links are in the document with expected href & text', () => {
    for (let i = 0; i < externalMenuLinks.length; i++) {
      const menuLink = screen.getByTestId(externalMenuLinks[i].id);
      expect(menuLink).toBeInTheDocument();
      expect(menuLink.textContent).toMatch(externalMenuLinks[i].name);
      expect(menuLink).toHaveAttribute('href', externalMenuLinks[i].link);
    }
  });
  it('if no session, sign in btn is in the document & calls signIn() on click', () => {
    const signInBtn = screen.getByTestId('sign-in-btn');
    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn.textContent).toMatch('Sign in');
    act(() => {
      fireEvent.click(signInBtn);
    });
    expect(signIn).toHaveBeenCalledWith('github');
  });
  it('if !session, ensembles is not in the document', () => {
    const flyout = screen.getByTestId('external-menu');
    expect(flyout.textContent).not.toMatch('Ensembles');
  });
});

describe('<FlyOutMenu />', () => {
  const mockProps: ExternalMenuProps = {
    session: {
      ...mockSession,
    },
  };
  beforeEach(() => {
    render(<FlyOutMenu {...mockProps} />);
  });
  it('<FlyOutMenu /> renders', () => {
    const flyout = screen.getByTestId('external-menu');
    expect(flyout).toBeInTheDocument();
  });
  it('if session, join ensemble link is in the document with expected href', () => {
    const joinLink = screen.getByText('Join Ensemble');
    expect(joinLink).toBeInTheDocument();
    expect(joinLink).toHaveAttribute('href', 'ensembles/join/');
  });
  it('if session, create ensemble link is in the document with expected href', () => {
    const createLink = screen.getByText('Create Ensemble');
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute('href', 'ensembles/create/');
  });
  it('if session, all ensembles are in the document with href', () => {
    for (let i = 0; i < mockProps.session!.user.admins.length; i++) {
      const ensemble = screen.getByText(
        mockProps.session!.user.admins[i].ensemble.name
      );
      expect(ensemble).toBeInTheDocument();
      expect(ensemble).toHaveAttribute(
        'href',
        `ensembles/${mockProps.session!.user.admins[i].ensemble.id}/`
      );
    }
  });
  it('if session, all session menu links are in the document with expected href & text', () => {
    for (let i = 0; i < sessionMenuLinks.length; i++) {
      const menuLink = screen.getByTestId(sessionMenuLinks[i].id);
      expect(menuLink).toBeInTheDocument();
      expect(menuLink.textContent).toMatch(sessionMenuLinks[i].name);
      expect(menuLink).toHaveAttribute('href', sessionMenuLinks[i].link);
    }
  });
  it('if session, sign out btn is in the document', async () => {
    const signOutBtn = screen.getByTestId('sign-out-btn');
    expect(signOutBtn).toBeInTheDocument();
    expect(signOutBtn.textContent).toMatch('Sign out');
    await act(async () => {
      fireEvent.click(signOutBtn);
    });
    expect(signOut).toHaveBeenCalled();
  });
});
