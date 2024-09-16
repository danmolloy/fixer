import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CallInput, {
  CallInputProps,
  venueOptions,
} from '../../../../app/event/create/callInput';
import { mockCall } from '../../../../__mocks__/models/call';
import { Formik } from 'formik';
import { formatDate } from '../../../../app/event/create/form';

describe('<CallInput />', () => {
  const mockProps: CallInputProps = {
    index: Math.ceil(Math.random()) * 10,
    id: 2,
    remove: jest.fn(),
    propsValueVenue: 'venue-value',
    setVenue: jest.fn(),
    call: {
      ...mockCall,
      startTime: formatDate('2024-07-16T09:18:03.269Z'),
      endTime: formatDate('2024-07-16T12:18:03.269Z'),
    },
  };
  beforeEach(() => {
    render(
      <Formik onSubmit={() => {}} initialValues={{}}>
        {(props) => <CallInput {...mockProps} />}
      </Formik>
    );
  });
  it('<CallInput /> renders', () => {
    const callInput = screen.getByTestId(`call-${mockProps.index}-input-div`);
    expect(callInput).toBeInTheDocument();
  });
  it('call number is in the document', () => {
    const title = screen.getByText(`Call ${mockProps.index + 1}`);
    expect(title).toBeInTheDocument();
  });
  it('if index > 0, remove btn is in the document and calls props.remove on click', () => {
    const removeBtn = screen.getByTestId(`calls-${mockProps.index}-delete`);
    expect(removeBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(removeBtn);
    });
    expect(mockProps.remove).toHaveBeenCalledWith(mockProps.index);
    expect(removeBtn).not.toHaveAttribute('disabled');
  });
  it('call start time input is in the document with label, name, type & value attrs', () => {
    const startTime = screen.getByLabelText('Start Time');
    expect(startTime).toBeInTheDocument();
    expect(startTime).toHaveAttribute(
      'name',
      `calls.${mockProps.index}.startTime`
    );
    expect(startTime).toHaveAttribute('type', `datetime-local`);
    expect(startTime).toHaveAttribute('value', '2024-07-16T09:18');
  });
  it('call end time input is in the document with label, name, type & value attrs', () => {
    const endTime = screen.getByLabelText('End Time');
    expect(endTime).toBeInTheDocument();
    expect(endTime).toHaveAttribute('name', `calls.${mockProps.index}.endTime`);
    expect(endTime).toHaveAttribute('type', `datetime-local`);
    expect(endTime).toHaveAttribute('value', '2024-07-16T12:18');
  });
  it('venue text input is in the document with label, name, type & value attrs', () => {
    const venue = screen.getByLabelText('Venue');
    expect(venue).toBeInTheDocument();
    expect(venue).toHaveAttribute('name', `calls.${mockProps.index}.venue`);
    expect(venue).toHaveAttribute('type', 'text');
  });
  it('call info input is in the document with label, optional indication, type, name & value attrs', () => {
    const callInfo = screen.getByLabelText('Call Information');
    expect(callInfo).toBeInTheDocument();
    expect(callInfo).toHaveAttribute('name', `calls.${mockProps.index}.info`);
    expect(callInfo).toHaveAttribute('type', 'text');
  });
});

describe('<CallInput />', () => {
  const mockProps: CallInputProps = {
    index: 0,
    id: 2,
    remove: jest.fn(),
    propsValueVenue: 'venue-value',
    setVenue: jest.fn(),
    call: {
      ...mockCall,
      startTime: formatDate(mockCall.startTime),
      endTime: formatDate(mockCall.startTime),
    },
  };
  beforeEach(() => {
    render(
      <Formik onSubmit={() => {}} initialValues={{}}>
        {(props) => <CallInput {...mockProps} />}
      </Formik>
    );
  });

  it('if index === 0, remove btn is not in the document', () => {
    const removeBtn = screen.getByTestId(`calls-${mockProps.index}-delete`);
    expect(removeBtn).toBeInTheDocument();
    expect(removeBtn).toHaveAttribute('disabled');
  });
});
