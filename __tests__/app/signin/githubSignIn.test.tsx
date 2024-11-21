import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import GithubSignIn from '../../../app/signin/githubSignIn';

jest.mock('next-auth/react');

describe('<GithubSignIn />', () => {
  beforeEach(() => {
    render(<GithubSignIn />);
  });
  it('<GithubSignIn /> renders', () => {
    const signInBtn = screen.getByTestId('github-sign-in');
    expect(signInBtn.textContent).toMatch('GitHub');
    expect(signInBtn).toBeInTheDocument();
  });
  it('calls signIn on click', async () => {
    const signInBtn = screen.getByTestId('github-sign-in');
    await act(async () => {
      fireEvent.click(signInBtn);
    });
    expect(signIn).toHaveBeenCalledWith('github', { redirectTo: '/' });
  });
});
