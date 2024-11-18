import EnsembleIndex, { EnsembleIndexProps } from '../../../app/ensembles';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockSection } from '../../../__mocks__/models/ensembleSection';
import { mockEnsembleContact } from '../../../__mocks__/models/ensembleContact';
import { mockEnsemble } from '../../../__mocks__/models/ensemble';
import { mockEnsembleAdmin } from '../../../__mocks__/models/ensembleAdmin';
import { mockUser } from '../../../__mocks__/models/user';
import { getBillingRoute } from '../../../app/billing/api/manage/lib';

jest.mock('../../../app/billing/api/manage/lib', () => ({
  getBillingRoute: jest.fn(() => ({
    data: {
      url: '/',
    },
  })),
}));
global.focus = jest.fn();

describe('<EnsembleIndex />', () => {

const mockProps: EnsembleIndexProps = {
  sections: [mockSection],
  ensemble: mockEnsemble,
  contacts: [
    {
      ...mockEnsembleContact,
      id: '1',
      firstName: 'Greg',
      lastName: 'Ievers',
      category: 'Member',
      section: mockSection,
    },
    {
      ...mockEnsembleContact,
      id: '2',
      firstName: 'Elliot',
      lastName: 'Gannon',
      category: 'Extra',
      section: mockSection,
    },
  ],
  admins: [
    {
      ...mockEnsembleAdmin,
      user: mockUser,
    },
  ],
};

  beforeEach(() => {
    render(<EnsembleIndex {...mockProps} />);
  });
  it('ensemble-index is in the document', () => {
    const ensembleIndex = screen.getByTestId('ensemble-index');
    expect(ensembleIndex).toBeInTheDocument();
  });
  it('ensemble name is in the document', () => {
    const ensembleName = screen.getByText(mockProps.ensemble.name);
    expect(ensembleName).toBeInTheDocument();
  });
  it('<EnsembleDashboard /> is in the document', () => {
    const ensembleDash = screen.getByTestId('ensemble-dashboard');
    expect(ensembleDash).toBeInTheDocument();
  });
  it("Alphabetical sort select sorts contact list", () => {
    const alphabeticalSort = screen.getByText("Name")
    waitFor(() => {
      fireEvent.click(alphabeticalSort);
    });
    for (let i = 0; i < mockProps.contacts.length; i ++) {
      const contactRows = screen.getAllByTestId("contact-card");
      const sortedContacts = mockProps.contacts.sort((a,b) => a.lastName.localeCompare(b.lastName));
      expect(contactRows[i].textContent).toMatch(sortedContacts[i].lastName);
    }
  })
  it("Section sort select sorts contact list", () => {
    const sectionSort = screen.getByText("Section");
    waitFor(() => {
      fireEvent.click(sectionSort);
    });
    for (let i = 0; i < mockProps.contacts.length; i ++) {
      const contactRows = screen.getAllByTestId("contact-card");
      const sortedContacts = mockProps.contacts.sort((a,b) => a.section.name.localeCompare(b.section.name));
      expect(contactRows[i].textContent).toMatch(sortedContacts[i].lastName);
    }
  })
  it("Position sort select sorts contact list", () => {
    const positionSort = screen.getByText("Position");
    waitFor(() => {
      fireEvent.click(positionSort);
    });
    for (let i = 0; i < mockProps.contacts.length; i ++) {
      const contactRows = screen.getAllByTestId("contact-card");
      const sortedContacts = mockProps.contacts.sort((a,b) => a.role.localeCompare(b.role));
      expect(contactRows[i].textContent).toMatch(sortedContacts[i].lastName);
    }
  })
  it("Category sort select sorts contact list", () => {
    const categorySort = screen.getByText("Category");
    waitFor(() => {
      fireEvent.click(categorySort);
    });
    for (let i = 0; i < mockProps.contacts.length; i ++) {
      const contactRows = screen.getAllByTestId("contact-card");
      const sortedContacts = mockProps.contacts.sort((a,b) => a.category!.localeCompare(b.category!));
      expect(contactRows[i].textContent).toMatch(sortedContacts[i].lastName);
    }
  })
  it("<CreateContactForm /> renders when Edit contact btn clicked", () => {
    const menuBtns = screen.getAllByText("Contact Options");
    waitFor(() => {
      fireEvent.click(menuBtns[0]);
    });
    const editBtn = screen.getByText("Edit");
    waitFor(() => {
      fireEvent.click(editBtn);
    })
    const createContactForm = screen.getByTestId('create-contact-form');
    expect(createContactForm).toBeInTheDocument();

  })
  it('<EnsembleManagement /> is in the document with all admins listed', () => {
    const ensembleManagement = screen.getByTestId('ensemble-management');
    expect(ensembleManagement).toBeInTheDocument();
  });
  it('<ContactsIndex /> is in the document with all contacts', () => {
    const contactsIndex = screen.getByTestId('contacts-index');
    expect(contactsIndex).toBeInTheDocument();
    for (let i = 0; i < mockProps.contacts.length; i++) {
      expect(contactsIndex.textContent).toMatch(
        `${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`
      );
    }
  });
});


describe('<EnsembleIndex />', () => {

const mockProps: EnsembleIndexProps = {
  sections: [],
  ensemble: {
    ...mockEnsemble,
    stripeSubscriptionId: null,
  },
  contacts: [],
  admins: [
    {
      ...mockEnsembleAdmin,
      user: mockUser,
    },
  ],
};

  beforeEach(() => {
    render(<EnsembleIndex {...mockProps} />);
  });
  
  it("if !stripeSub, Subscribe btn is in the document and calls getBillingRoute()", () => {
    const subscribeBtn = screen.getByText("Subscribe");
    expect(subscribeBtn).toBeInTheDocument();
    waitFor(() => {
      fireEvent.click(subscribeBtn);
    });
    expect(getBillingRoute).toHaveBeenCalled();
  })  
});

