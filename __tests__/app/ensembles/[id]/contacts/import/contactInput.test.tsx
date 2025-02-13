import '@testing-library/jest-dom';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import ContactInput, {
  ContactInputProps,
} from '../../../../../../app/ensembles/[id]/contacts/import/contactInput';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { mockSection } from '../../../../../../__mocks__/models/ensembleSection';
import axios from '../../../../../../__mocks__/axios';
import { useRouter } from 'next/navigation';
import { sectionNamesArr } from '../../../../../../app/ensembles/create/api/functions';

jest.mock('next/navigation');
jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<ContactInput />', () => {
  const mockProps: ContactInputProps = {
    sections: [mockSection],
    contacts: [
      {
        firstName: mockEnsembleContact.firstName,
        lastName: mockEnsembleContact.lastName,
        email: mockEnsembleContact.email!,
        phoneNumber: "+445504281329",
        sectionId: mockSection.id,
        role: mockEnsembleContact.role,
        category: mockEnsembleContact.category!,
      },
    ],
    ensembleId: mockEnsembleContact.ensembleId,
  };
  beforeEach(() => {
    render(<ContactInput {...mockProps} />);
  });
  it('<ContactInput /> renders', () => {
    const contactInputForm = screen.getByTestId('contact-form-div');
    expect(contactInputForm).toBeInTheDocument();
  });
  it('table header has First Name, Last Name, Email, Phone Number, Role, Section, Category and one blank cell', () => {
    const tableHead = screen.getByTestId('table-head-row');
    expect(tableHead.children.length).toBe(8);
    expect(tableHead.children[0]).toHaveTextContent('First Name');
    expect(tableHead.children[1]).toHaveTextContent('Last Name');
    expect(tableHead.children[2]).toHaveTextContent('Email');
    expect(tableHead.children[3]).toHaveTextContent('Phone Number');
    expect(tableHead.children[4]).toHaveTextContent('Role');
    expect(tableHead.children[5]).toHaveTextContent('Section');
    expect(tableHead.children[6]).toHaveTextContent('Category');
    expect(tableHead.children[7]).toHaveTextContent('');
  });
  it('initial values are set correctly from props', () => {
    for (let i = 0; i < mockProps.contacts.length; i++) {
      const firstName = screen.getByTestId(`contacts.${i}.firstName`);
      expect(firstName).toHaveValue(mockProps.contacts[i].firstName);
      const lastName = screen.getByTestId(`contacts.${i}.lastName`);
      expect(lastName).toHaveValue(mockProps.contacts[i].lastName);
      const email = screen.getByTestId(`contacts.${i}.email`);
      expect(email).toHaveValue(mockProps.contacts[i].email);
      const phoneNumber = screen.getByTestId(`contacts.${i}.phoneNumber`);
      expect(phoneNumber).toHaveValue(mockProps.contacts[i].phoneNumber);
      const role = screen.getByTestId(`contacts.${i}.role`);
      expect(role).toHaveValue(mockProps.contacts[i].role);
      const sectionId = screen.getByTestId(`contacts.${i}.sectionId`);
      expect(sectionId).toHaveValue(mockProps.contacts[i].sectionId);
      const category = screen.getByTestId(`contacts.${i}.category`);
      expect(category).toHaveValue(mockProps.contacts[i].category);
    }
  });
  it('add row btn adds new contact entry row', () => {
    const addRowBtn = screen.getByText('Add Row');
    expect(addRowBtn).toBeInTheDocument();
    const tableBody = screen.getByTestId('table-body');
    expect(tableBody.children.length).toBe(mockProps.contacts.length);
    waitFor(() => {
      fireEvent.click(addRowBtn);
    });
    expect(tableBody.children.length).toBe(mockProps.contacts.length + 1);
  });
  it('remove row btn removes last row & is disbaled if contacts.length == 1', async () => {
  
    const disabledRemoveBtn = screen.getByTestId(`contacts.0.remove`);
    
    expect(disabledRemoveBtn).toBeDisabled();
  });
  it('sectionName select field renders all instrumentSections', () => {
    const sectionName = screen.getByTestId(`contacts.${0}.sectionId`);
    expect(sectionName.children[0].textContent).toMatch('select');
    expect(sectionName.children[0]).toHaveValue('');
    for (let i = 0; i < mockProps.sections.length; i++) {
      const instrument = screen.getByText(mockProps.sections[i].name);
      expect(instrument).toBeInTheDocument();
      expect(instrument).toHaveValue(mockProps.sections[i].id);
    }
  });
  it('submit btn calls axios.post and useRouter on successful submit', async () => {
    const submitBtn = screen.getByText('Submit');

    await waitFor(async () => {
      await fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('/contacts/api/create/import', {
      values: {
        contacts: mockProps.contacts,
        ensembleId: mockProps.ensembleId,
      },
    });
    expect(useRouter).toHaveBeenCalled();
  });
});

describe('<ContactInput />', () => {
  const mockProps: ContactInputProps = {
    sections: [mockSection],
    contacts: [{
      firstName: mockEnsembleContact.firstName,
        lastName: mockEnsembleContact.lastName,
        email: '',
        phoneNumber: "",
        sectionId: mockSection.id,
        role: mockEnsembleContact.role,
        category: "",
    }],
    ensembleId: mockEnsembleContact.ensembleId,
  };
  beforeEach(() => {
    render(<ContactInput {...mockProps} />);
  });

  //it('validation errs (incl phoneNum regex) render on unsuccessful submit', async () => {});
  //it("Remove row btn removes row", () => {})
});
