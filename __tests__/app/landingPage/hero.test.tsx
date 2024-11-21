import { render, screen } from '@testing-library/react';
import Hero from '../../../app/landingPage/hero';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('<Hero />', () => {
  beforeEach(() => {
    render(<Hero />);
  });
  it('<Hero /> is in the document', () => {
    const hero = screen.getByTestId('hero-div');
    expect(hero).toBeInTheDocument();
  });
  it('header text is in the document', () => {
    const hero = screen.getByTestId('hero-div');
    expect(hero.textContent).toMatch(
      /^Communication made simple for fixers and musicians./
    );
  });
  it('tagline is in the document', () => {
    const tagline = screen.getByTestId('tagline');
    expect(tagline.textContent).toMatch(
      /^Effortless fixing and seamless communications for orchestras and musicians.$/
    );
  });
  it("'learn more' link is in the document with expected href", () => {
    const learnMore = screen.getByText('Learn more');
    expect(learnMore).toBeInTheDocument();
    expect(learnMore).toHaveAttribute('href', '/about');
  });
  it('"start now" link is in the document with expected href attr', () => {
    const startLink = screen.getByText('Start now');
    expect(startLink).toBeInTheDocument();
    expect(startLink).toHaveAttribute('href', '/signup');
  });
});
