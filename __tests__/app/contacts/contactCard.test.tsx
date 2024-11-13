import '@testing-library/jest-dom';
import ContactCard, {
  ContactCardProps,
} from '../../../app/contacts/contactCard';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { mockEnsembleContact } from '../../../__mocks__/models/ensembleContact';
import { mockSection } from '../../../__mocks__/models/ensembleSection';

global.focus = jest.fn();

const mockProps: ContactCardProps = {
  contact: {
    ...mockEnsembleContact,
    section: mockSection,
  },
  editContact: jest.fn(),
};

describe('<ContactCard />', () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <ContactCard {...mockProps} />
        </tbody>
      </table>
    );
  });
  it('contact-card is in the document', () => {
    const contactCard = screen.getByTestId('contact-card');
    expect(contactCard).toBeInTheDocument();
  });

  it('full name is in the document', () => {
    const fullName = screen.getByText(
      `${mockProps.contact.firstName} ${mockProps.contact.lastName}`
    );
    expect(fullName).toBeInTheDocument();
  });
  it("section name is in the document", () => {
    const sectionName = screen.getByText(
      `${mockProps.contact.section.name}`
    );
    expect(sectionName).toBeInTheDocument();
  })
  it("role is in the document", () => {
    const role = screen.getByText(mockProps.contact.role);
    expect(role).toBeInTheDocument();
  })
  it('category is in the document', () => {
    if (mockProps.contact.category) {
      const category = screen.getByText(mockProps.contact.category);
      expect(category).toBeInTheDocument();
    }
  });
  it('email address is in the document', () => {
    if (mockProps.contact.email) {
      const email = screen.getByText(mockProps.contact.email!);
      expect(email).toBeInTheDocument();
    }
  });
  it('phone number is in the document', () => {
    if (mockProps.contact.phoneNumber) {
      const phone = screen.getByText(mockProps.contact.phoneNumber!);
      expect(phone).toBeInTheDocument();
    }
  });
  it('options btn is in the document', () => {
    const optionsBtn = screen.getByText('Contact Options');
    expect(optionsBtn).toBeInTheDocument();
  });
  it('<ContactMenu /> renders on options btn click', () => {
    const optionsBtn = screen.getByText('Contact Options');
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const menu = screen.getByTestId('contact-options');
    expect(menu).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
    expect(menu).not.toBeInTheDocument();
  });
});
