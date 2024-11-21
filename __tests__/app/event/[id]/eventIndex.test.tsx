import '@testing-library/jest-dom';
import EventInfoTable, {
  EventInfoTableProps,
} from '../../../../app/event/[id]/eventIndex';
import { mockEvent } from '../../../../__mocks__/models/event';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockUser } from '../../../../__mocks__/models/user';
import { mockEnsemble } from '../../../../__mocks__/models/ensemble';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import { render, screen } from '@testing-library/react';
//import html2pdf from 'html2pdf.js';

//jest.mock("html2pdf.js");
const mockProps: EventInfoTableProps = {
  event: {
    ...mockEvent,
    calls: [mockCall],
    fixer: mockUser,
  },
  calls: [mockCall],
  ensemble: {
    ...mockEnsemble,
    sections: [mockSection],
  },
  contacts: [
    {
      ...mockContactMessage,
      contact: mockEnsembleContact,
    },
  ],
  sections: [
    {
      ...mockEventSection,
      contacts: [
        {
          ...mockContactMessage,
          contact: mockEnsembleContact,
          calls: [mockCall],
        },
      ],
      ensembleSection: {
        ...mockSection,
        contacts: [mockEnsembleContact],
      },
    },
  ],
};

describe('<EventInfoTable />', () => {
  beforeEach(() => {
    render(<EventInfoTable {...mockProps} />);
  });
  it('<EventInfoTable /> renders', () => {
    const eventInfoTable = screen.getByTestId('event-info-table');
    expect(eventInfoTable).toBeInTheDocument();
  });
  it('<EventMenu /> is in the document', () => {
    //const eventMenu = screen.getB
  });
  it('html2pdf() is called on getRunningSheet() call', () => {});
  it('<EventHeader /> is in the document', () => {});
  it('<EventInfo /> is in the document', () => {});
  it('fixing view select is in the document with expected options', () => {});
  it("'Sent messages' link is in the document", () => {});
  it('<OrchestraList /> renders when selected', () => {});
  it('<FixingIndex /> renders when selected', () => {});
});
