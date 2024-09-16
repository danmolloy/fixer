import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SignOutBtn from '../../../app/layout/signOutBtn';
import { signOut } from 'next-auth/react';

jest.mock('next-auth/react');

describe('<SignOutBtn />', () => {
  beforeEach(() => {
    render(<SignOutBtn />);
  });
  it('<SignOutBtn /> renders', () => {
    const signOutBtn = screen.getByText('Sign out');
    expect(signOutBtn).toBeInTheDocument();
  });
  it('calls signOut on click', async () => {
    const signOutBtn = screen.getByText('Sign out');
    await act(async () => {
      fireEvent.click(signOutBtn);
    });
    expect(signOut).toHaveBeenCalled();
  });
});
