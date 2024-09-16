import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import UpdateSectionForm, {
  UpdateSectionFormProps,
} from '../../../../app/ensembles/section/edit';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';
import { instrumentSections } from '../../../../app/contacts/lib';
import axios from '../../../../__mocks__/axios';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: UpdateSectionFormProps = {
  section: {
    ...mockSection,
    contacts: [
      {
        ...mockEnsembleContact,
        id: '4',
        role: 'principal',
        category: '1a',
        indexNumber: 2,
      },
      {
        ...mockEnsembleContact,
        id: '3',
        role: 'tutti',
        category: '1a',
        indexNumber: 2,
      },
      {
        ...mockEnsembleContact,
        id: '2',
        role: 'tutti',
        indexNumber: 2,
      },
      {
        ...mockEnsembleContact,
        id: '1',
        role: 'tutti',
        indexNumber: 1,
      },
    ],
  },
};

describe('<UpdateSectionForm />', () => {
  beforeEach(() => {
    render(<UpdateSectionForm {...mockProps} />);
  });
  it('<UpdateSectionForm /> renders', () => {
    const updateForm = screen.getByTestId('update-section-form');
    expect(updateForm).toBeInTheDocument();
  });
  it("'Edit Section' header is in the document", () => {
    const header = screen.getByText('Edit Section');
    expect(header).toBeInTheDocument();
  });
  it('section select is in the document with expected label, name & type attrs & all instrument sections', () => {
    const sectionSelect = screen.getByLabelText('Section Name');
    expect(sectionSelect).toBeInTheDocument();
    expect(sectionSelect).toHaveAttribute('name', 'name');
    expect(sectionSelect).toHaveRole('combobox');
    const blankOption = screen.getByText('Select section name');
    expect(blankOption).toBeInTheDocument();
    expect(blankOption).toHaveValue('');
    for (let i = 0; i < instrumentSections.length; i++) {
      const option = screen.getByText(instrumentSections[i].name);
      expect(option).toBeInTheDocument();
      expect(option).toHaveValue(instrumentSections[i].name);
      expect(sectionSelect.textContent).toMatch(instrumentSections[i].name);
    }
  });
  it('contacts field is in the document', () => {
    const contactsField = screen.getByTestId('contacts-array');
    expect(contactsField).toBeInTheDocument();
  });
  it('all contacts are in the document with indexNum, role, category, full name, up btn & down btn', async () => {
    for (let i = 0; i < mockProps.section.contacts.length; i++) {
      const contact = screen.getByTestId(
        `${mockProps.section.contacts[i].id}-contact`
      );
      expect(contact).toBeInTheDocument();
      const indexNum = screen.getByTestId(
        `${mockProps.section.contacts[i].id}-indexNum`
      );
      expect(indexNum.textContent).toMatch(
        String(mockProps.section.contacts[i].indexNumber)
      );
      expect(contact.textContent).toMatch(mockProps.section.contacts[i].role);
      expect(contact.textContent).toMatch(
        mockProps.section.contacts[i].category!
      );
      expect(contact.textContent).toMatch(
        `${mockProps.section.contacts[i].firstName} ${mockProps.section.contacts[i].lastName}`
      );
      const contactUp = screen.getByTestId(
        `${mockProps.section.contacts[i].id}-up`
      );
      const contactDown = screen.getByTestId(
        `${mockProps.section.contacts[i].id}-down`
      );
      expect(contactUp).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(contactUp);
      });
      expect(indexNum.textContent).toMatch(
        String(mockProps.section.contacts[i].indexNumber - 1)
      );
      expect(contactDown).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(contactDown);
      });
      expect(indexNum.textContent).toMatch(
        String(mockProps.section.contacts[i].indexNumber)
      );
    }
  });
  it('contacts are sorted lastName < indexNum < role < category', () => {
    const names = screen.getAllByTestId('contact-name');
    const sortedContacts = mockProps.section.contacts
      .sort((a, b) => a.lastName.localeCompare(b.lastName))
      .sort((a, b) => a.indexNumber - b.indexNumber)
      .sort((a, b) => a.role.localeCompare(b.role))
      .sort((a, b) => a.category!.localeCompare(b.category!));
    for (let i = 0; i < names.length; i++) {
      const name = `${sortedContacts[i].firstName} ${sortedContacts[i].lastName}`;
      expect(names[i].textContent).toMatch(name);
    }
  });
  it('submit btn is in the document with expected text, role & type', () => {
    const submitBtn = screen.getByText('Submit');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('type', 'submit');
  });
  it('submit btn calls axios.post & useRouter on click', async () => {
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('/ensembles/section/api/edit', {
      contacts: mockProps.section.contacts,
      id: mockProps.section.id,
      name: mockProps.section.name,
    });
    expect(useRouter).toHaveBeenCalled();
  });
});
