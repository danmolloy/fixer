import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EnsembleManagement, {
  EnsembleManagementProps,
} from '../../../../app/ensembles/admin';
import { mockAdminWithUser } from '../../../../__mocks__/models/ensembleAdmin';

const mockProps: EnsembleManagementProps = {
  admins: [mockAdminWithUser],
  ensembleId: mockAdminWithUser.ensembleId,
};

describe('<EnsembleManagement />', () => {
  beforeEach(() => {
    render(<EnsembleManagement {...mockProps} />);
  });
  it('<EnsembleManagement /> renders', () => {
    const ensembleManagement = screen.getByTestId('ensemble-management');
    expect(ensembleManagement).toBeInTheDocument();
  });
  it('all expect admin tiles are in the document', () => {
    for (let i = 0; i < mockProps.admins.length; i++) {
      const adminTile = screen.getByTestId(
        `${mockProps.admins[i].id}-admin-tile`
      );
      expect(adminTile).toBeInTheDocument();
    }
  });
  it("'Invite Admin' link is in the document with expect href", () => {
    const invite = screen.getByText('Invite Admin');
    expect(invite).toBeInTheDocument();
    expect(invite).toHaveAttribute(
      'href',
      `/ensembles/${mockProps.ensembleId}/admin/invite`
    );
  });
});
