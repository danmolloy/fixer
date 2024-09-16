import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SignInBtn from '../../../app/layout/signInBtn';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react');

describe('<SignInBtn />', () => {
  beforeEach(() => {
    render(<SignInBtn />);
  });
  it('<SignInBtn /> renders', () => {
    const signInBtn = screen.getByText('Sign In');
    expect(signInBtn).toBeInTheDocument();
  });
  it('calls signIn on click', async () => {
    const signInBtn = screen.getByText('Sign In');
    await act(async () => {
      fireEvent.click(signInBtn);
    });
    expect(signIn).toHaveBeenCalledWith('github', { redirectTo: '/' });
  });
});
