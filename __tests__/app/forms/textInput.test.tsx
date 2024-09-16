import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput, { TextInputProps } from '../../../app/forms/textInput';
import React from 'react';
import { Formik } from 'formik';

const mockProps: TextInputProps = {
  name: 'mockName',
  id: 'mockId',
  label: 'mockLabel',
  asHtml: 'input',
  min: '1',
  max: '2',
  optional: false,
};

/* Tested at parent level for err messages */

describe('<TextInput />', () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => <TextInput {...mockProps} />}
      </Formik>
    );
  });
  it('text-input is in the document with label', () => {
    const textInput = screen.getByLabelText(mockProps.label);
    expect(textInput).toBeInTheDocument();
  });
  it('text-input has expected id, name, min and max attrs', () => {
    const textInput = screen.getByLabelText(mockProps.label);
    expect(textInput).toHaveAttribute('id', mockProps.id);
    expect(textInput).toHaveAttribute('name', mockProps.name);
    expect(textInput).toHaveAttribute('min', mockProps.min);
  });
});

describe('<TextInput />', () => {
  beforeEach(() => {
    const mockProps: TextInputProps = {
      name: 'mockName',
      id: 'mockId',
      label: 'mockLabel',
      asHtml: 'input',
      min: '1',
      max: '2',
      optional: true,
    };
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => <TextInput {...mockProps} />}
      </Formik>
    );
  });
  it('states if input is optional', () => {
    const textInputDiv = screen.getByTestId(`${mockProps.id}-div`);
    expect(textInputDiv.textContent).toMatch('Optional');
  });
});
