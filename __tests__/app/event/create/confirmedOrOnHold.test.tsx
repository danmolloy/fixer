import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ConfirmedOrOnHold from '../../../../app/event/create/gigStatus';
import { Formik } from 'formik';
import GigStatus from '../../../../app/event/create/gigStatus';

describe('<ConfirmedOrOnHold />', () => {
  beforeEach(() => {
    render(
      <Formik
        onSubmit={() => {}}
        initialValues={{
          confirmedOrOnHold: 'Confirmed',
        }}
      >
        {(props) => <GigStatus />}
      </Formik>
    );
  });
  it('<ConfirmedOrOnHold /> renders', () => {
    const status = screen.getByTestId('status-div');
    expect(status).toBeInTheDocument();
  });
  it('radio group with label is in the document', () => {
    const radioGroup = screen.getByLabelText('Gig Status');
    expect(radioGroup).toBeInTheDocument();
    //expect(radioGroup).toHaveRole("group")
  });
  it('confirmed option has label, name, value and type attrs', () => {
    const confirmed = screen.getByLabelText('Confirmed');
    expect(confirmed).toBeInTheDocument();
    expect(confirmed).toHaveAttribute('type', 'radio');
    expect(confirmed).toHaveAttribute('name', 'confirmedOrOnHold');
    expect(confirmed).toHaveAttribute('value', 'Confirmed');
  });
  it('on hold option has label, name, value and type attrs', () => {
    const onHold = screen.getByLabelText('On Hold');
    expect(onHold).toBeInTheDocument();
    expect(onHold).toHaveAttribute('type', 'radio');
    expect(onHold).toHaveAttribute('name', 'confirmedOrOnHold');
    expect(onHold).toHaveAttribute('value', 'On Hold');
  });
});
