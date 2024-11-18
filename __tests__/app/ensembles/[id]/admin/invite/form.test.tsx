import { render, screen, act, fireEvent } from '@testing-library/react';
import InviteAdminForm, {
  InviteAdminFormProps,
} from '../../../../../../app/ensembles/[id]/admin/invite/form';
import '@testing-library/jest-dom';
import axios from '../../../../../../__mocks__/axios';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });
const mockProps: InviteAdminFormProps = {
  ensembleId: 'mockId',
  userName: 'Roy Dereks',
};

describe('<InviteAdminForm />', () => {
  beforeEach(() => {
    render(<InviteAdminForm {...mockProps} />);
  });
  it('<InviteAdminForm /> is in the document', () => {
    const form = screen.getByTestId('invite-admin-form');
    expect(form).toBeInTheDocument();
  });
  it('Sender name is in the document', () => {
    const senderName = screen.getByText(`Sender: ${mockProps.userName}`);
    expect(senderName).toBeInTheDocument();
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
  it('access type radio group is in the document with label, Restricted & Full options', async () => {
    const radioGroup = screen.getByLabelText('Access Type');
    expect(radioGroup).toBeInTheDocument();
    expect(radioGroup.textContent).toMatch('Restricted');
    expect(radioGroup.textContent).toMatch('Full');

    const restrictedOption = screen.getByLabelText('Restricted');
    expect(restrictedOption).toHaveAttribute('type', 'radio');
    expect(restrictedOption).toHaveAttribute('name', 'accessType');
    expect(restrictedOption).toHaveAttribute('value', 'restricted');
    expect(restrictedOption).toHaveAttribute('checked');

    const fullOption = screen.getByLabelText('Full');
    expect(fullOption).toHaveAttribute('type', 'radio');
    expect(fullOption).toHaveAttribute('name', 'accessType');
    expect(fullOption).toHaveAttribute('value', 'full');
    expect(fullOption).not.toHaveAttribute('checked');
  });
  it('submit btn is in the document with label and expected type attr', () => {
    const submitBtn = screen.getByText('Submit');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('type', 'submit');
  });
  it('all expected errs are shown if submit btn pressed without valid fields', async () => {
    const submitBtn = screen.getByText('Submit');
    const form = screen.getByTestId('invite-admin-form');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(form.textContent).toMatch('First name required');
    expect(form.textContent).toMatch('Last name required');
    expect(form.textContent).toMatch('email required');
    expect(form.textContent).toMatch('position title required');
  });
  it('on click, submit btn calls axios.post() with expected attrs if all fields valid', async () => {
    const mockData = {
      ensembleId: mockProps.ensembleId,
      firstName: 'Oscar',
      lastName: 'Rodwell',
      email: 'oscar@tss.com.au',
      positionTitle: 'student',
      accessType: 'full',
      senderName: mockProps.userName,
    };
    const firstNameInput = screen.getByLabelText('First Name');
    await act(async () => {
      fireEvent.change(firstNameInput, {
        target: { value: mockData.firstName },
      });
    });
    const lastNameInput = screen.getByLabelText('Last Name');
    await act(async () => {
      fireEvent.change(lastNameInput, { target: { value: mockData.lastName } });
    });
    const emailInput = screen.getByLabelText('Email');
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: mockData.email } });
    });
    const fullAccess = screen.getByLabelText('Full');
    await act(async () => {
      fireEvent.click(fullAccess);
    });
    const positionInput = screen.getByLabelText('Position Title');
    await act(async () => {
      fireEvent.change(positionInput, {
        target: { value: mockData.positionTitle },
      });
    });

    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith(
      '/ensembles/admin/api/invite',
      mockData
    );
  });
});
