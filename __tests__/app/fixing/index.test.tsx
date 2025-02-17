import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import FixingIndex, { FixingIndexProps } from '../../../app/fixing';
import { mockCall } from '../../../__mocks__/models/call';
import { mockSection } from '../../../__mocks__/models/ensembleSection';
import { mockEventSection } from '../../../__mocks__/models/eventSection';
import { mockContactMessage } from '../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../__mocks__/models/ensembleContact';
import { mockEnsemble } from '../../../__mocks__/models/ensemble';
import { mockOrchestration } from '../../../__mocks__/models/orchestration';
import { mockContactEventCall } from '../../../__mocks__/models/ContactEventCall';
import { getBillingRoute } from '../../../app/billing/api/manage/lib'; 

jest.mock('../../../app/billing/api/manage/lib', () => ({
  getBillingRoute: jest.fn()
}))

global.alert = jest.fn();

const mockProps: FixingIndexProps = {
  eventId: 1,
  ensemble: mockEnsemble,
  ensembleSections: [mockSection],
  eventSections: [
    {
      ...mockEventSection,
      orchestration: [mockOrchestration],
      contacts: [
        {
          ...mockContactMessage,
          contact: mockEnsembleContact,
          eventCalls: [{
            ...mockContactEventCall,
            call: mockCall
          }]
        },
      ],
      ensembleSection: {
        ...mockSection,
        contacts: [mockEnsembleContact],
      },
    },
  ],
  eventCalls: [mockCall],
};

describe('<FixingIndex />', () => {
  beforeEach(() => {
    render(<FixingIndex {...mockProps} />);
  });
  it('<FixingIndex /> renders', () => {
    const fixingIndex = screen.getByTestId('fixing-index');
    expect(fixingIndex).toBeInTheDocument();
  });
  it("<FixingMenu /> is in the document", () => {
    const fixingMenu = screen.getByTestId("fixing-menu");
    expect(fixingMenu).toBeInTheDocument();
  })
  it('all event sections are in the document', () => {
    for (let i = 0; i < mockProps.eventSections.length; i++) {
      const eventSection = screen.getByTestId(
        `${mockProps.eventSections[i].id}-event-section`
      );
      expect(eventSection).toBeInTheDocument();
    }
  });
});

describe('<FixingIndex />', () => {
  let localMockProps: FixingIndexProps = {
    ...mockProps,
    eventSections: [],
  };
  beforeEach(() => {
    render(<FixingIndex {...localMockProps} />);
  });
  it("helpful text if !eventSections & createBtn hasn't been clicked", () => {
    const fixingIndex = screen.getByTestId('fixing-index');
    expect(fixingIndex).toHaveTextContent('No event sections.');
    expect(fixingIndex).toHaveTextContent(
      'Create a section to get started.'
    );
    const createBtn = screen.getByText('Create Section');
    act(() => {
      fireEvent.click(createBtn);
    });
    expect(fixingIndex).not.toHaveTextContent('No event sections.');
    expect(fixingIndex).not.toHaveTextContent(
      'Create a section to get started.'
    );
  });
  it('create btn is in the document and renders <CreateEventSection /> on click', async () => {
    const createBtn = screen.getByText('Create Section');
    expect(createBtn).toBeInTheDocument();
    expect(createBtn).toHaveRole('button');
    act(() => {
      fireEvent.click(createBtn);
    });
    const createForm = screen.getByTestId('create-event-section');
    expect(createForm).toBeInTheDocument();
  });
});

describe('<FixingIndex />', () => {
  let localMockProps: FixingIndexProps = {
    ...mockProps,
    ensemble: {
      ...mockProps.ensemble,
      stripeSubscriptionId: null
    }
  };
  beforeEach(() => {
    render(<FixingIndex {...localMockProps} />);
  });
  it("if !subscription, there is helpful text", () => {
    const helpText = screen.getByText("You must subscribe to book players.")
    expect(helpText).toBeInTheDocument();
  });
  it("if !subscription, there is subscribe btn", () => { 
    const subscribeBtn = screen.getByText("Subscribe")
    expect(subscribeBtn).toBeInTheDocument();
  });
});
