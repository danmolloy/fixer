import { act, fireEvent, render, screen } from '@testing-library/react';
import JoinEnsembleForm, {
  JoinEnsembleFormProps,
} from '../../../../app/ensembles/join/form';
import '@testing-library/jest-dom';
import axios from '../../../../__mocks__/axios';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: JoinEnsembleFormProps = {
  userId: 'mock-id',
};

describe('<JoinEnsembleForm />', () => {
  beforeEach(() => {
    render(<JoinEnsembleForm {...mockProps} />);
  });
  it('<JoinEnsembleForm /> renders', () => {
    const form = screen.getByTestId('join-form');
    expect(form).toBeInTheDocument();
  });
  it('accessCode input is in the document', () => {
    const codeInput = screen.getByLabelText('Access Code');
    expect(codeInput).toBeInTheDocument();
    expect(codeInput).toHaveAttribute('type', 'text');
    expect(codeInput).toHaveAttribute('name', 'accessCode');
  });
  it('Submit btn is in the document', () => {
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });
  it('err message renders when submit btn clicked without access code', async () => {
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).not.toHaveBeenCalled();
    const form = screen.getByTestId('join-form');
    expect(form.textContent).toMatch('Access code required');
  });
  it('if accessCode, submit btn calls axios.post() and redirects', async () => {
    const codeInput = screen.getByLabelText('Access Code');

    act(() => {
      fireEvent.change(codeInput, { target: { value: 'mock-code' } });
    });
    const submitBtn = screen.getByTestId('submit-btn');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('/ensembles/admin/api/join', {
      accessCode: 'mock-code',
      userId: 'mock-id',
    });
    expect(useRouter).toHaveBeenCalled();
  });
});
