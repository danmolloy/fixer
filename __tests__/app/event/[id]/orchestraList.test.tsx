import '@testing-library/jest-dom';
import OrchestraList, {
  OrchestraListProps,
  pdfOptions,
} from '../../../../app/event/[id]/orchestraList';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import html2pdf from 'html2pdf.js';
import React, { act } from 'react';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';
import { mockContactEventCall } from '../../../../__mocks__/models/ContactEventCall';
import { mockCall } from '../../../../__mocks__/models/call';

HTMLCanvasElement.prototype.getContext = jest.fn();
global.focus = jest.fn();
jest.mock('html2pdf.js', () => {
  return jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    save: jest.fn(),
  }));
});

describe('<OrchestraList />', () => {
  const mockProps: OrchestraListProps = {
    sections: [
      {
        ...mockEventSection,
        orchestration: [mockOrchestration],
        contacts: [{
          ...mockContactMessage,
          eventCalls: [{
            ...mockContactEventCall,
            call: mockCall
          }],
          contact: mockEnsembleContact
        }],
        ensembleSection: mockSection
      },
    ],
  };
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />);
  });
  it('<OrchestraList /> renders', () => {
    const orchestraList = screen.getByTestId('orchestra-list');
    expect(orchestraList).toBeInTheDocument();
  });

  it('booked musicians names are in respective sections, with TBC for all empty seats', () => {
    const orchestraList = screen.getByTestId('orchestra-list');
    mockProps.sections.forEach(section => {
      const sectionDiv = screen.getByTestId(`${section.id}-section`)
      for (let i = 0; i < section.contacts.length; i ++) {
        const name = `${section.contacts[i].contact.firstName} ${section.contacts[i].contact.lastName}`
        if (section.contacts[i].eventCalls.map(c => c.status).includes("ACCEPTED")) {
          expect(sectionDiv.textContent).toMatch(name);
        } else {
          expect(orchestraList.textContent).not.toMatch(name);
        }
      }
      const numBooked = section.contacts.filter(contact => contact.eventCalls.map(call => call.status).includes("ACCEPTED")).length
      const numRequired = section.orchestration.sort((a, b) => b.numRequired - a.numRequired)[0].numRequired

      if (numRequired - numBooked > 0) {
        const tbcSeats = screen.getAllByTestId(`${section.id}-tbc`)
        expect(tbcSeats).toHaveLength(numRequired - numBooked)
      }
    })
  });
  it('print list btn is in the document and calls html2pdf on click', () => {
    const optionsBtn = screen.getByText("Options");
    act(() => {
      fireEvent.click(optionsBtn);
    })
    const mockOrchListElement = document.createElement('div');
    jest
      .spyOn(React, 'useRef')
      .mockReturnValue({ current: mockOrchListElement });

    const printBtn = screen.getByText('Print List');
    expect(printBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(printBtn);
    });
    expect(html2pdf).toHaveBeenCalled();
    //expect(html2pdf().from).toHaveBeenCalledWith(mockOrchListElement);
    //expect(html2pdf().set).toHaveBeenCalledWith(pdfOptions);
    //expect(html2pdf().save).toHaveBeenCalled();
  });
});

describe('<OrchestraList />', () => {
  const mockProps: OrchestraListProps = {
    sections: [
    ],
  };
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />);
  });

  it('if !contacts, helpful msg is displayed', () => {
    const helpMsg = screen.getByTestId('help-msg');
    expect(helpMsg).toBeInTheDocument();
    expect(helpMsg.textContent).toMatch('No calls made.');
    expect(helpMsg.textContent).toMatch(
      'To get started, fix sections in the Fixing tab.'
    );
  });
});
