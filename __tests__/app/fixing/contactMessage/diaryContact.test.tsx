import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import DiaryContact, {
  DiaryContactProps,
} from '../../../../app/fixing/contactMessage/diaryContact';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';

describe('<DiaryContactProps />', () => {
  const mockProps: DiaryContactProps = {
    contact: { ...mockEnsembleContact, category: 'Extra' },
    setSelectContact: jest.fn(),
    disabled: false,
  };

  beforeEach(() => {
    render(
      <table>
        <tbody>
          <DiaryContact {...mockProps} />
        </tbody>
      </table>
    );
  });

  it('<DiaryContact /> renders', () => {
    const diaryContact = screen.getByTestId(
      `${mockProps.contact.id}-contact-tile`
    );
    expect(diaryContact).toBeInTheDocument();
  });

  it('contact category is in the document', () => {
    const diaryContact = screen.getByTestId(
      `${mockProps.contact.id}-contact-tile`
    );
    expect(diaryContact).toHaveTextContent('Extra');
  });

  it('displays contact name correctly', () => {
    const contactName = `${mockProps.contact.firstName} ${mockProps.contact.lastName}`;
    expect(screen.getByText(contactName)).toBeInTheDocument();
  });

  it('displays contact role correctly', () => {
    expect(screen.getByText(mockProps.contact.role)).toBeInTheDocument();
  });
});

describe('<DiaryContactProps />', () => {
  const mockProps: DiaryContactProps = {
    contact: { ...mockEnsembleContact, category: 'Extra' },
    setSelectContact: jest.fn(),
    disabled: true,
  };

  beforeEach(() => {
    render(
      <table>
        <tbody>
          <DiaryContact {...mockProps} />
        </tbody>
      </table>
    );
  });

  it("if disabled, it doesn't call setSelectContact", () => {
    const diaryContact = screen.getByTestId(
      `${mockProps.contact.id}-contact-tile`
    );
    fireEvent.click(diaryContact);
    expect(mockProps.setSelectContact).not.toHaveBeenCalled();
  });
});
