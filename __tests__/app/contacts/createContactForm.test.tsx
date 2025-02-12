import '@testing-library/jest-dom';
import {
  render,
  screen,
  act,
  fireEvent,
} from '@testing-library/react';
import CreateContactForm, {
  CreateContactFormProps,
  CreateEnsembleContactForm,
} from '../../../app/contacts/createContactForm';
import { mockEnsemble } from '../../../__mocks__/models/ensemble';
import { mockSection } from '../../../__mocks__/models/ensembleSection';
import axios from '../../../__mocks__/axios';
import { EnsembleContact, EnsembleSection } from '@prisma/client';
import { mockEnsembleContact } from '../../../__mocks__/models/ensembleContact';
import { sectionNamesArr } from '../../../app/ensembles/create/api/functions';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<CreateContactForm />', () => {
  const mockContact: CreateEnsembleContactForm = {
    firstName: 'Roy',
    ensembleId: '',
    lastName: 'Dereks',
    section: 'Double Bass',
    role: 'Principal',
    email: 'roy@dereks.com',
    phone: '+12345689',
    category: 'Member',
  };
  const mockProps: CreateContactFormProps = {
    ensembleId: mockEnsemble.id,
    sections: [mockSection],
    closeForm: jest.fn(),
  };
  beforeEach(() => {
    render(<CreateContactForm {...mockProps} />);
  });
  it('<CreateContactForm /> is in the document', () => {
    const createContactForm = screen.getByTestId('create-contact-form');
    expect(createContactForm).toBeInTheDocument();
  });
  it("title 'Create Contact' is in the document", () => {
    const formTitle = screen.getByText('Create Contact');
    expect(formTitle).toBeInTheDocument();
  });
  it('first name input is in the document with expected label, name, value and type attrs', () => {
    const firstNameInput = screen.getByLabelText('First Name');
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute('name', 'firstName');
    expect(firstNameInput).toHaveAttribute('type', 'text');
    expect(firstNameInput).toHaveAttribute('value', '');
  });
  it('last name input is in the document with expected, label, name, value and type attrs', () => {
    const lastNameInput = screen.getByLabelText('Last Name');
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute('name', 'lastName');
    expect(lastNameInput).toHaveAttribute('type', 'text');
    expect(lastNameInput).toHaveAttribute('value', '');
  });
  it('email input is in the document with expected, label, name, value and type attrs', () => {
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('value', '');
  });
  it('phone input is in the document with expected, label, name, value and type attrs', () => {
    const phoneInput = screen.getByLabelText('Phone');
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('name', 'phone');
    expect(phoneInput).toHaveAttribute('type', 'phone');
    expect(phoneInput).toHaveAttribute('value', '');
  });
  it('role input is in the document with expected, label, name and type attrs & options', () => {
    const roleInput = screen.getByLabelText('Role');
    expect(roleInput).toBeInTheDocument();
    expect(roleInput).toHaveAttribute('name', 'role');
    expect(roleInput).toHaveAttribute('type', 'text');
    expect(roleInput).toHaveAttribute('value', '');
  });
  it('category input is in the document with expected, label, name and type attrs & options', () => {
    const categoryInput = screen.getByLabelText('Category');
    expect(categoryInput).toBeInTheDocument();
    expect(categoryInput).toHaveAttribute('name', 'category');
    expect(categoryInput).toHaveAttribute('type', 'text');
    expect(categoryInput).toHaveAttribute('value', '');
  });
  it('section select is in the document with expected, label, name and type attrs & options', () => {
    const sectionSelect = screen.getByLabelText('Section Select');
    expect(sectionSelect).toBeInTheDocument();
    expect(sectionSelect).toHaveAttribute('name', 'section');
    const sectionBlank = screen.getByTestId('section-blank');
    expect(sectionBlank).toBeInTheDocument();
    expect(sectionBlank).toHaveAttribute('value', '');
    for (let i = 0; i < mockProps.sections.length; i++) {
      expect(sectionSelect.textContent).toMatch(mockProps.sections[i].name);
      const section = screen.getByTestId(`section-option-${mockProps.sections[i].id}`)
      expect(section).toBeInTheDocument();
      expect(section.textContent).toMatch(mockProps.sections[i].name);
      expect(section).toHaveAttribute('value', mockProps.sections[i].id);
    }
  });
  it('submit btn is in the document', () => {
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeInTheDocument();
  });
  it('all expected errs are shown if submit btn pressed without valid fields', async () => {
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).not.toHaveBeenCalled();
    const firstNameErr = screen.getByTestId('firstName-error');
    expect(firstNameErr.textContent).toMatch('first name required');

    const lastNameErr = screen.getByTestId('lastName-error');
    expect(lastNameErr.textContent).toMatch('last name required');

    const email = screen.getByTestId('email-error');
    expect(email.textContent).toMatch('email required');

    const phoneErr = screen.getByTestId('phone-error');
    expect(phoneErr.textContent).toMatch('phone number required');

    const sectionErr = screen.getByTestId('section-error');
    expect(sectionErr.textContent).toMatch('section required');

    const roleErr = screen.getByTestId('role-error');
    expect(roleErr.textContent).toMatch('role required');

    const categoryErr = screen.getByTestId('category-error');
    expect(categoryErr.textContent).toMatch('category required');
  });
  it('on click, submit btn calls axios.post() with expected attrs if all fields valid', async () => {
    const firstNameInput = screen.getByLabelText('First Name');
    await act(async () => {
      await fireEvent.change(firstNameInput, {
        target: { value: mockContact.firstName },
      });
    });
    const lastNameInput = screen.getByLabelText('Last Name');
    await act(async () => {
      await fireEvent.change(lastNameInput, {
        target: { value: mockContact.lastName },
      });
    });
    const sectionInput = screen.getByLabelText('Section Select');
    await act(async () => {
      await fireEvent.change(sectionInput, {
        target: { value: mockProps.sections[0].id },
      });
    });
    const roleInput = screen.getByLabelText('Role');
    await act(async () => {
      await fireEvent.change(roleInput, {
        target: { value: mockContact.role },
      });
    });
    const category = screen.getByLabelText('Category');
    await act(async () => {
      await fireEvent.change(category, {
        target: { value: mockContact.category },
      });
    });
    const emailInput = screen.getByLabelText('Email');
    await act(async () => {
      await fireEvent.change(emailInput, {
        target: { value: mockContact.email },
      });
    });
    const phoneInput = screen.getByLabelText('Phone');
    await act(async () => {
      await fireEvent.change(phoneInput, {
        target: { value: mockContact.phone },
      });
    });

    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    const createContactForm = screen.getByTestId('create-contact-form');
    expect(axios.post).toHaveBeenCalledWith('/contacts/api/create', {
      ...mockContact,
      section: mockProps.sections[0].id,
      ensembleId: mockProps.ensembleId,
    });
  });
});

describe('<CreateContactForm />', () => {
  const mockContact: EnsembleContact & { section: EnsembleSection } = {
    ...mockEnsembleContact,
    phoneNumber: '+447479011111',
    section: mockSection,
  };
  const mockProps: CreateContactFormProps = {
    ensembleId: mockEnsemble.id,
    sections: [mockSection],
    closeForm: jest.fn(),
    contact: {
      ...mockContact,
      phoneNumber: '+447479011111',
    },
  };
  beforeEach(() => {
    render(<CreateContactForm {...mockProps} />);
  });
  it('closeForm() is called on close btn click', () => {
    const closeBtn = screen.getByTestId('close-btn');
    expect(closeBtn.textContent).toMatch('Close');

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(mockProps.closeForm).toHaveBeenCalled();
  });
  it('axios.post() is called with expected args when form passed contact props to update', async () => {
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(axios.post).toHaveBeenCalledWith('/contacts/api/update', {
      contactId: mockContact.id,
      updatedData: {
        category: mockContact.category,
        email: mockContact.email,
        phone: mockContact.phoneNumber,
        firstName: mockContact.firstName,
        lastName: mockContact.lastName,
        role: mockContact.role,
        section: mockContact.section.id,
        ensembleId: mockProps.ensembleId,
      },
    });
  });
});
