import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import AppendedContactRow, {
  AppendedContactRowProps,
} from '../../../../../../app/fixing/contactMessage/form/appendedContacts/contactRow';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { mockCall } from '../../../../../../__mocks__/models/call';
import { Formik } from 'formik';

global.focus = jest.fn();
global.prompt = jest.fn().mockReturnValue('mock prompt text');
global.alert = jest.fn();

const mockProps: AppendedContactRowProps = {
  contact: {
    contactId: mockEnsembleContact.id,
    contactMessageId:
      Math.random() > 0.5 ? Math.ceil(Math.random() * 10) : undefined,
    name: `${mockEnsembleContact.firstName} ${mockEnsembleContact.lastName}`,
    playerMessage: 'Additional porterage for your stool',
    calls: [mockCall.id],
    autoAccepted: Math.random() > 0.5 ? true : false,
  },
  type:
    Math.random() > 0.6
      ? 'AUTOBOOK'
      : Math.random() > 0.3
        ? 'BOOKING'
        : 'AVAILABILITY',
  index: 0,
  eventCalls: [mockCall],
  addPlayerMessage: jest.fn(),
  remove: jest.fn(),
  swap: jest.fn(),
  numContacts: Math.ceil(Math.random() * 10) + 10,
  currentCallCount: Math.ceil(Math.random() * 10),
};

describe('<AppendedContactRow />', () => {
  beforeEach(() => {
    render(
      <Formik
        onSubmit={() => {}}
        initialValues={{
          contacts: [
            {
              position: 'tubular bells',
            },
          ],
        }}
      >
        <table>
          <tbody>
            <AppendedContactRow {...mockProps} />
          </tbody>
        </table>
      </Formik>
    );
  });
  it('<AppendedContactRow /> renders', () => {
    const appendedContact = screen.getByTestId('appended-contact');
    expect(appendedContact).toBeInTheDocument();
  });
  it('contact name is in the document', () => {
    const appendedContact = screen.getByTestId('appended-contact');
    const contactName = `${mockProps.contact.name}`;
    expect(appendedContact.textContent).toMatch(contactName);
  });
  it('position text input is in the document with expected initial val', () => {
    const positionInput = screen.getByTestId('position-input');
    expect(positionInput).toBeInTheDocument();
    expect(positionInput).toHaveAttribute(
      'name',
      `contacts[${mockProps.index}]position`
    );
    expect(positionInput).toHaveValue('tubular bells');
  });

  it('options btn is in the document and renders menu on click', () => {
    const optionsBtn = screen.getByTestId('options-btn');
    expect(optionsBtn).toBeInTheDocument();
    expect(optionsBtn.textContent).toMatch('Options');
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const options = screen.getByTestId('options-menu');
    expect(options).toBeInTheDocument();
  });
  it('indicates if there is a playerMessage', () => {
    const playerMsg = screen.getByTestId('player-message');
    expect(playerMsg).toBeInTheDocument();
    expect(playerMsg.textContent).toMatch('Player Message');
    act(() => {
      fireEvent.click(playerMsg);
    });
    expect(global.alert).toHaveBeenCalledWith(
      `Your message to ${mockProps.contact.name}: \n\n${mockProps.contact.playerMessage}`
    );
  });
  it('all event call checkboxes are in the document with checked, type, value & name attrs', () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      const eventCall = screen.getByTestId(
        `${mockProps.eventCalls[i].id}-field`
      );
      expect(eventCall).toBeInTheDocument();
      expect(eventCall).toHaveAttribute('type', 'checkbox');
      expect(eventCall).toHaveAttribute(
        'name',
        `contacts[${mockProps.index}]calls`
      );
      //expect(eventCall).toHaveFormValues(Number(mockProps.eventCalls[i].id));
      if (
        mockProps.contact.calls
          .map((j) => Number(j))
          .includes(Number(mockProps.eventCalls[i].id))
      ) {
        expect(eventCall).toBeChecked();
      }
    }
  });
});

describe('<AppendedContactRow /> Options', () => {
  const mockProps: AppendedContactRowProps = {
    contact: {
      contactId: mockEnsembleContact.id,
      contactMessageId:
        Math.random() > 0.5 ? Math.ceil(Math.random() * 10) : undefined,
      name: `${mockEnsembleContact.firstName} ${mockEnsembleContact.lastName}`,
      playerMessage: Math.random() > 0.5 ? 'mock message' : null,
      calls: [mockCall.id],
      autoAccepted: Math.random() > 0.5 ? true : false,
    },
    type:
      Math.random() > 0.6
        ? 'AUTOBOOK'
        : Math.random() > 0.3
          ? 'BOOKING'
          : 'AVAILABILITY',
    index: 1,
    eventCalls: [mockCall],
    addPlayerMessage: jest.fn(),
    remove: jest.fn(),
    swap: jest.fn(),
    numContacts: 2,
    currentCallCount: Math.ceil(Math.random() * 10),
  };
  beforeEach(() => {
    render(
      <Formik
        onSubmit={() => {}}
        initialValues={{
          contacts: [
            {
              position: 'tubular bells',
            },
          ],
        }}
      >
        <table>
          <tbody>
            <AppendedContactRow {...mockProps} />
          </tbody>
        </table>
      </Formik>
    );
    const optionsBtn = screen.getByTestId('options-btn');
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const options = screen.getByTestId('options-menu');
    expect(options).toBeInTheDocument();
  });
  it('moveDown btn is disabled if contact is in bottom position', () => {
    const moveDownBtn = screen.getByText('Move Down');
    expect(moveDownBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(moveDownBtn);
    });
    expect(mockProps.swap).not.toHaveBeenCalled();
  });
  it("moveUp btn is in the menu calls 'swap(index, index - 1)' on click", () => {
    const moveUpBtn = screen.getByText('Move Up');
    expect(moveUpBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(moveUpBtn);
    });
    expect(mockProps.swap).toHaveBeenCalledWith(
      mockProps.index,
      mockProps.index - 1
    );
  });
  it('add msg btn is in the menu and calls handleAddMessage() on click', () => {
    const addMsgBtn = screen.getByText('Add Message');
    expect(addMsgBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addMsgBtn);
    });
    expect(global.prompt).toHaveBeenCalledWith(
      'What message would you like to add to this player?'
    );
    expect(mockProps.addPlayerMessage).toHaveBeenCalledWith(
      mockProps.index,
      'mock prompt text'
    );
  });
  it('it remove btn is in menu and calls remove() on click', () => {
    const removeBtn = screen.getByText('Remove');
    expect(removeBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(removeBtn);
    });
    expect(mockProps.remove).toHaveBeenCalled();
  });
});

describe('<AppendedContactRow /> Options', () => {
  const mockProps: AppendedContactRowProps = {
    contact: {
      contactId: mockEnsembleContact.id,
      contactMessageId:
        Math.random() > 0.5 ? Math.ceil(Math.random() * 10) : undefined,
      name: `${mockEnsembleContact.firstName} ${mockEnsembleContact.lastName}`,
      playerMessage: Math.random() > 0.5 ? 'mock message' : null,
      calls: [mockCall.id],
      autoAccepted: Math.random() > 0.5 ? true : false,
    },
    type:
      Math.random() > 0.6
        ? 'AUTOBOOK'
        : Math.random() > 0.3
          ? 'BOOKING'
          : 'AVAILABILITY',
    index: 0,
    eventCalls: [mockCall],
    addPlayerMessage: jest.fn(),
    remove: jest.fn(),
    swap: jest.fn(),
    numContacts: 2,
    currentCallCount: Math.ceil(Math.random() * 10),
  };
  beforeEach(() => {
    render(
      <Formik
        onSubmit={() => {}}
        initialValues={{
          contacts: [
            {
              position: 'tubular bells',
            },
          ],
        }}
      >
        <table>
          <tbody>
            <AppendedContactRow {...mockProps} />
          </tbody>
        </table>
      </Formik>
    );
    const optionsBtn = screen.getByTestId('options-btn');
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const options = screen.getByTestId('options-menu');
    expect(options).toBeInTheDocument();
  });
  it('moveUp btn is disabled if contact is in position 0', () => {
    const moveUpBtn = screen.getByText('Move Up');
    expect(moveUpBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(moveUpBtn);
    });
    expect(mockProps.swap).not.toHaveBeenCalled();
  });
  it("moveDown btn is in the documentand calls 'swap(index, index + 1)' on click", () => {
    const moveDownBtn = screen.getByText('Move Down');
    expect(moveDownBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(moveDownBtn);
    });
    expect(mockProps.swap).toHaveBeenCalledWith(
      mockProps.index,
      mockProps.index + 1
    );
  });
});

describe('<AppendedContactRow />', () => {
  const mockProps: AppendedContactRowProps = {
    contact: {
      contactId: mockEnsembleContact.id,
      contactMessageId:
        Math.random() > 0.5 ? Math.ceil(Math.random() * 10) : undefined,
      name: `${mockEnsembleContact.firstName} ${mockEnsembleContact.lastName}`,
      playerMessage: Math.random() > 0.5 ? 'mock message' : null,
      calls: [mockCall.id],
      autoAccepted: Math.random() > 0.5 ? true : false,
    },
    type: Math.random() > 0.5 ? 'AUTOBOOK' : 'BOOKING',
    index: Math.ceil(Math.random() * 10),
    eventCalls: [mockCall],
    addPlayerMessage: jest.fn(),
    remove: jest.fn(),
    swap: jest.fn(),
    numContacts: Math.ceil(Math.random() * 10) + 10,
    currentCallCount: Math.ceil(Math.random() * 10),
  };
  beforeEach(() => {
    render(
      <Formik onSubmit={() => {}} initialValues={{}}>
        <table>
          <tbody>
            <AppendedContactRow {...mockProps} />
          </tbody>
        </table>
      </Formik>
    );
  });
  it('if !AVAILABILITY, queue number is in the document', () => {
    const queueNum = screen.getByTestId('queue-num');
    expect(queueNum.textContent).toMatch(
      String(mockProps.currentCallCount + mockProps.index + 1)
    );
  });
  it('if !AVAILABILITY, autoAccept checkbox is in the document with expected attrs', () => {
    const autoAccept = screen.getByTestId('auto-accept-checkbox');
    expect(autoAccept).toBeInTheDocument();
    expect(autoAccept).toHaveAttribute('type', 'checkbox');
    expect(autoAccept).toHaveAttribute(
      'name',
      `contacts[${mockProps.index}]autoAccepted`
    );
    if (mockProps.contact.autoAccepted === true) {
      expect(autoAccept).toBeChecked();
    }
  });
});
