import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import GigStatus from '../../../../app/event/create/gigStatus';

describe('<GigStatus />', () => {
  beforeEach(() => {
    render(
      <Formik
        onSubmit={() => {}}
        initialValues={{
          confirmedOrOnHold: 'Confirmed',
        }}
      >
        {(props) => <GigStatus disabled={false} />}
      </Formik>
    );
  });
  it('<GigStatus /> renders', () => {
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
    expect(confirmed).toHaveAttribute('name', 'status');
    expect(confirmed).toHaveAttribute('value', 'CONFIRMED');
  });
  it('on hold option has label, name, value and type attrs', () => {
    const onHold = screen.getByLabelText('On Hold');
    expect(onHold).toBeInTheDocument();
    expect(onHold).toHaveAttribute('type', 'radio');
    expect(onHold).toHaveAttribute('name', 'status');
    expect(onHold).toHaveAttribute('value', 'ONHOLD');
  });
});
