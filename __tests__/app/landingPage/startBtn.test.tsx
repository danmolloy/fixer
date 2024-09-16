import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import StartBtn from '../../../app/landingPage/startBtn';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('<StartBtn />', () => {
  beforeEach(() => {
    render(<StartBtn />);
  });
  it('<StartBtn /> is in the document with expect text content', () => {
    const startBtn = screen.getByTestId('start-btn');
    expect(startBtn).toBeInTheDocument();
    expect(startBtn.textContent).toMatch(/^Start now$/);
  });
  it("calls signIn('github', { redirectTo: '/' }) on click", () => {
    const startBtn = screen.getByTestId('start-btn');
    act(() => {
      fireEvent.click(startBtn);
    });
    expect(signIn).toHaveBeenCalledWith('github', { redirectTo: '/' });
  });
});
