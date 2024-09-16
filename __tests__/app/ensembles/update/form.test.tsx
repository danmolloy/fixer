import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import UpdateEnsembleForm, {
  UpdateEnsembleProps,
} from '../../../../app/ensembles/update/form';
import { mockEnsemble } from '../../../../__mocks__/models/ensemble';
import axios from '../../../../__mocks__/axios';
import { useRouter } from 'next/navigation';

global.confirm = jest.fn(() => true);
let confirm = global.confirm;

jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<UpdateEnsembleform />', () => {
  const mockProps: UpdateEnsembleProps = {
    ensemble: { ...mockEnsemble, ensembleNames: ['LSO'] },
  };
  beforeEach(() => {
    render(<UpdateEnsembleForm {...mockProps} />);
  });
  it('<UpdateEnsembleform /> renders', () => {
    const updateForm = screen.getByTestId('update-ensemble-form');
    expect(updateForm).toBeInTheDocument();
  });
  it('Ensemble Name text input is in the document with label, name & type attrs', () => {
    const nameInput = screen.getByLabelText('Ensemble Name');
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
    const addBtn = screen.getByText('Add');
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
    for (let i = 0; i < mockProps.ensemble.ensembleNames.length; i++) {
      const ensembleName = screen.getByTestId(`ensembleNames[${i}]-input`);
      expect(ensembleName).toBeInTheDocument();
      expect(ensembleName).toHaveAttribute(
        'value',
        mockProps.ensemble.ensembleNames[i]
      );
      expect(ensembleName).toHaveAttribute('type', 'text');
    }
  });
  it('submit btn is in the document with expect text content and type attr', () => {
    const submitBtn = screen.getByText('Submit');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('type', 'submit');
    expect(submitBtn).toHaveRole('button');
  });
  it('if correct fields, axios.post() and router() are called on submit btn click', async () => {
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('update/api', {
      ensembleId: mockProps.ensemble.id,
      ensembleNames: mockProps.ensemble.ensembleNames,
      name: mockProps.ensemble.name,
    });
  });

  it('delete btn is in the document with expected text content', () => {
    const deleteBtn = screen.getByText('Delete');
    expect(deleteBtn).toBeInTheDocument();
    expect(deleteBtn).toHaveRole('button');
  });

  it('delete btn calls window.confirm, axios.post() and router() on click', () => {
    const deleteBtn = screen.getByText('Delete');
    act(() => {
      fireEvent.click(deleteBtn);
    });
    expect(confirm).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith('/ensembles/delete', {
      ensembleId: mockProps.ensemble.id,
    });
    expect(useRouter).toHaveBeenCalled();
  });
});

describe('<UpdateEnsembleform />', () => {
  const mockProps: UpdateEnsembleProps = {
    ensemble: { ...mockEnsemble, ensembleNames: [], name: '' },
  };
  beforeEach(() => {
    render(<UpdateEnsembleForm {...mockProps} />);
  });
  it('expected err messages render on submit btn click, & axios.post() is not called', async () => {
    const submitBtn = screen.getByText('Submit');
    const updateForm = screen.getByTestId('update-ensemble-form');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).not.toHaveBeenCalled();
    expect(updateForm.textContent).toMatch('Ensemble name required');
    expect(updateForm.textContent).toMatch(
      'You must provide at least one ensemble name.'
    );
  });
});
