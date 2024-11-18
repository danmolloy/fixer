import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import ContactsIndex, {
  ContactsIndexProps,
} from '../../../app/contacts/contactsList';
import { mockEnsembleContact } from '../../../__mocks__/models/ensembleContact';
import { mockSection } from '../../../__mocks__/models/ensembleSection';
import { mockEnsemble } from '../../../__mocks__/models/ensemble';

describe('<ContactsIndex />', () => {
  const mockProps: ContactsIndexProps = {
    contacts: [
      { ...mockEnsembleContact, category: 'Extra', section: mockSection },
    ],
    sections: [
      {
        ...mockSection,
        contacts: [{ ...mockEnsembleContact, category: 'Extra' }],
      },
    ],
    ensembleId: mockEnsemble.id,
    editContact: jest.fn(),
    setSortedContacts: jest.fn(),
    sortContacts: 'Alphabetical',
    filterContacts: ['Extra', 'Member'],
  };
  beforeEach(() => {
    render(<ContactsIndex {...mockProps} />);
  });
  it('contacts-index is in the document', () => {
    const contactsIndex = screen.getByTestId('contacts-index');
    expect(contactsIndex).toBeInTheDocument();
  });
  it("'Musicians' header is in the document", () => {
    const header = screen.getByRole('heading');
    expect(header).toHaveTextContent('Musicians');
  });
  it('all contacts are in the document', () => {
    const contactsIndex = screen.getByTestId('contacts-index');

    for (let i = 0; i < mockProps.contacts.length; i++) {
      const contactName = `${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`;
      expect(contactsIndex.textContent).toMatch(contactName);
    }
  });
  it("'Name' btn calls setSortedContacts('Alphabetical') on click", () => {
    const nameBtn = screen.getByText('Name');
    act(() => fireEvent.click(nameBtn));
    expect(mockProps.setSortedContacts).toHaveBeenCalledWith('Alphabetical');
  });
  it("'Section' btn calls setSortedContacts('Section') on click", () => {
    const sectionBtn = screen.getByText('Section');
    act(() => fireEvent.click(sectionBtn));
    expect(mockProps.setSortedContacts).toHaveBeenCalledWith('Section');
  });
  it("'Position' btn calls setSortedContacts('Position') on click", () => {
    const positionBtn = screen.getByText('Position');
    act(() => fireEvent.click(positionBtn));
    expect(mockProps.setSortedContacts).toHaveBeenCalledWith('Position');
  });
  it("'Category' btn calls setSortedContacts('Category') on click", () => {
    const categoryBtn = screen.getByText('Category');
    act(() => fireEvent.click(categoryBtn));
    expect(mockProps.setSortedContacts).toHaveBeenCalledWith('Category');
  });
});

describe('<ContactsIndex />', () => {
  const mockProps: ContactsIndexProps = {
    contacts: [],
    sections: [{ ...mockSection, contacts: [mockEnsembleContact] }],
    ensembleId: mockEnsemble.id,
    editContact: jest.fn(),
    setSortedContacts: jest.fn(),
    sortContacts: 'Alphabetical',
    filterContacts: ['Extra', 'Member'],
  };
  beforeEach(() => {
    render(<ContactsIndex {...mockProps} />);
  });
  it('helpful message if there are no contacts', () => {
    const contactsIndex = screen.getByTestId('contacts-index');
    expect(contactsIndex.textContent).toMatch('No contacts');
  });
});
