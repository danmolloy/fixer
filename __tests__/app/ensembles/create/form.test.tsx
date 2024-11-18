import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CreateEnsembleForm from '../../../../app/ensembles/create/form';
import axios from '../../../../__mocks__/axios';
import { getBillingRoute } from '../../../../app/billing/api/manage/lib';

jest.mock('../../../../app/billing/api/manage/lib', () => ({
  getBillingRoute: jest.fn(() => ({
    data: {
      url: '/',
    },
  })),
}));

jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<CreateEnsembleForm />', () => {
  beforeEach(() => {
    render(<CreateEnsembleForm userId='mock-id' />);
  });
  it('<CreateEnsembleForm /> renders', () => {
    const createForm = screen.getByTestId('create-ensemble-form');
    expect(createForm).toBeInTheDocument();
  });
  it('Ensemble (Organisation) Name text input is in the document with label, name & type attrs', () => {
    const nameInput = screen.getByLabelText('Organisation Name');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('name', 'name');
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toHaveRole('textbox');
  });

  it('add btn adds ensemble name input, remove btn removes ensemble name (except if length === 1)', async () => {
    const removeBtn = screen.getByText('Remove');
    expect(removeBtn).toBeInTheDocument();
    // Doesn't remove if just one name
    const nameOne = screen.getByTestId('ensembleNames[0]-input');
    expect(nameOne).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(removeBtn);
    });
    expect(nameOne).toBeInTheDocument();
    // Add Button adds
    const addBtn = screen.getByText('Add Name');
    expect(addBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(addBtn);
    });
    const nameTwo = screen.getByTestId('ensembleNames[1]-input');
    expect(nameTwo).toBeInTheDocument();
    // Remove button removes second name
    await act(async () => {
      fireEvent.click(removeBtn);
    });
    expect(nameTwo).not.toBeInTheDocument();
  });

  it('Ensemble Names array are in the document with label, initial val, expected name & type attrs', () => {
    const ensembleNamesLabel = screen.getByText('Ensemble Names');
    expect(ensembleNamesLabel).toBeInTheDocument();
    const ensembleName = screen.getByTestId(`ensembleNames[0]-input`);
    expect(ensembleName).toBeInTheDocument();
    expect(ensembleName).toHaveAttribute('value', '');
    expect(ensembleName).toHaveAttribute('type', 'text');
  });

  it('submit btn is in the document with expect text content and type attr', () => {
    const submitBtn = screen.getByText('Submit');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('type', 'submit');
    expect(submitBtn).toHaveRole('button');
  });
  it('appropriate err messages render if submit btn clicked without complete form', async () => {
    const submitBtn = screen.getByText('Submit');
    const createForm = screen.getByTestId('create-ensemble-form');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(createForm.textContent).toMatch('Organisation name required');
    expect(createForm.textContent).toMatch('Field cannot be left blank');
    expect(axios.post).not.toHaveBeenCalled();
  });
  it('if valid form, submit btn calls axios.post() and redirects', async () => {
    const nameInput = screen.getByLabelText('Organisation Name');
    const createForm = screen.getByTestId('create-ensemble-form');
    const ensembleName = screen.getByTestId(`ensembleNames[0]-input`);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'LSO' } });
    });
    await act(async () => {
      fireEvent.change(ensembleName, { target: { value: 'ensemble' } });
    });

    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('create/api', {
      ensembleNames: ['ensemble'],
      name: 'LSO',
      userId: 'mock-id',
    });
    expect(getBillingRoute).toHaveBeenCalled();
  });
});
