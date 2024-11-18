import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SignOutBtn from '../../../app/layout/signOutBtn';
import { signOut } from '../../../app/auth';

jest.mock('../../../app/auth', () => ({
  signOut: jest.fn()
}));

describe('<SignOutBtn />', () => {
  beforeEach(() => {
    render(<SignOutBtn />);
  });
  it('<SignOutBtn /> renders', () => {
    const signOutBtn = screen.getByText('Sign Out');
    expect(signOutBtn).toBeInTheDocument();
  });
  it('calls signOut on click', async () => {
    const signOutBtn = screen.getByText('Sign Out');
    await act(async () => {
      fireEvent.click(signOutBtn);
    });
    expect(signOut).toHaveBeenCalled();
  });
});
