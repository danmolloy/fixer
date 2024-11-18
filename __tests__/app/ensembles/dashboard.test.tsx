import EnsembleDashboard, {
  EnsembleDashboardProps,
} from '../../../app/ensembles/dashboard';
import '@testing-library/jest-dom';
import { fireEvent, act, screen, render } from '@testing-library/react';
import { mockEnsemble } from '../../../__mocks__/models/ensemble';
import { getBillingRoute } from '../../../app/billing/api/manage/lib';

jest.mock('../../../app/billing/api/manage/lib', () => ({
  getBillingRoute: jest.fn(() => ({
    data: {
      url: '/',
    },
  })),
}));

global.focus = jest.fn();

describe('<EnsembleDashboard />', () => {
  const mockProps: EnsembleDashboardProps = {
    ensemble: mockEnsemble,
  };
  beforeEach(() => {
    render(<EnsembleDashboard {...mockProps} />);
  });

  const openMenu = () => {
    const optionsBtn = screen.getByText('Options');
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
  };

  it('<EnsembleDashboard /> is in the document', () => {
    const ensembleDash = screen.getByTestId('ensemble-dashboard');
    expect(ensembleDash).toBeInTheDocument();
  });
  it('options btn is in the document and renders menu on click', () => {
    const optionsBtn = screen.getByText('Options');
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const optionsMenu = screen.getByTestId('options-menu');
    expect(optionsMenu).toBeInTheDocument();
  });
  it("option menu contains 'Create Contacts'", () => {
    openMenu();
    const createContacts = screen.getByText('Create Contacts');
    expect(createContacts).toBeInTheDocument();
    expect(createContacts).toHaveAttribute(
      'href',
      `/ensembles/${mockProps.ensemble.id}/contacts/import`
    );
  });
  it('"Invite Admin" link is in menu with expected href attr', () => {
    openMenu();
    const inviteAdmin = screen.getByText('Invite Admin');
    expect(inviteAdmin).toBeInTheDocument();
    expect(inviteAdmin).toHaveAttribute(
      'href',
      `/ensembles/${mockProps.ensemble.id}/admin/invite`
    );
  });
  it('"Edit Ensemble" link is in menu with expected href attr', () => {
    openMenu();
    const editEnsemble = screen.getByText('Edit Ensemble');
    expect(editEnsemble).toBeInTheDocument();
    expect(editEnsemble).toHaveAttribute(
      'href',
      `/ensembles/update/${mockProps.ensemble.id}`
    );
  });
  it('"Manage Subscription" link is in menu and calls getBillingRoute & window.location.href', () => {
    openMenu();
    const manageSub = screen.getByText('Manage Subscription');
    act(() => {
      fireEvent.click(manageSub);
    });
    expect(getBillingRoute).toHaveBeenCalled();
  });
});
