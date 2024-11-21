import '@testing-library/jest-dom';
import SentEmailList, {
  SentEmailListProps,
} from '../../../../../app/event/[id]/messages/sentList';
import { mockSentEmail } from '../../../../../__mocks__/models/sentEmail';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { DateTime } from 'luxon';

const mockProps: SentEmailListProps = {
  emails: [mockSentEmail],
};

describe('<SentEmailList', () => {
  beforeEach(() => {
    render(<SentEmailList {...mockProps} />);
  });
  it('<SentEmailList /> renders', () => {
    const emailList = screen.getByTestId('email-list');
    expect(emailList).toBeInTheDocument();
  });
  it('all emails previews are in the document with email, subject, status and date', () => {
    for (let i = 0; i < mockProps.emails.length; i++) {
      const emailPreview = screen.getByTestId(
        `${mockProps.emails[i].id}-preview`
      );
      expect(emailPreview).toBeInTheDocument();
      expect(emailPreview.textContent).toMatch(mockProps.emails[i].email);
      expect(emailPreview.textContent).toMatch(mockProps.emails[i].status);
      expect(emailPreview.textContent).toMatch(mockProps.emails[i].subject);
      expect(emailPreview.textContent).toMatch(
        DateTime.fromJSDate(mockProps.emails[i].timestamp).toFormat('f')
      );
    }
  });
  it('clicking an email preview shows/hides bodyText', () => {
    for (let i = 0; i < mockProps.emails.length; i++) {
      const emailPreview = screen.getByTestId(
        `${mockProps.emails[i].id}-preview`
      );
      act(() => {
        fireEvent.click(emailPreview);
      });
      const emailBody = screen.getByTestId(`${mockProps.emails[i].id}-body`);
      expect(emailBody).toBeInTheDocument();
      expect(emailBody.textContent).toMatch(mockProps.emails[i].bodyText);
    }
  });
});
