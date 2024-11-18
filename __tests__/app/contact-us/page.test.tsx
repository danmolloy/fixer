import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ContactPage from '../../../app/contact-us/page';

describe('<ContactInfo />', () => {
  beforeEach(() => {
    render(<ContactPage />);
  });
  it("'Contact' title is in the document", () => {
    const contactTitle = screen.getByText('Contact us');
    expect(contactTitle).toBeInTheDocument();
  });

  it('contact-page is in the document', () => {
    const contactPage = screen.getByTestId('contact-page');
    expect(contactPage).toBeInTheDocument();
  });
  it('contact-info is in the document', () => {
    const contactInfo = screen.getByTestId('contact-info');
    expect(contactInfo).toBeInTheDocument();
  });
  it('contact-form is in the document', () => {
    const contactForm = screen.getByTestId('contact-form');
    expect(contactForm).toBeInTheDocument();
  });
  it('matches snapshot', () => {
    const contactPage = screen.getByTestId('contact-page');
    expect(contactPage).toMatchSnapshot();
  });
});
