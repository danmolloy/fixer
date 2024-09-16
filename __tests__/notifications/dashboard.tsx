import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationsDashboard, {
  NotificationsDashProps,
} from '../../app/notifications/dashboard';
import { act } from 'react-dom/test-utils';

const mockProps: NotificationsDashProps = {
  playerCallFilter: jest.fn(),
  ensembleArray: [
    { name: 'lso', id: '1' },
    { name: 'rpo', id: '2' },
    { name: 'lpo', id: '3' },
  ],
  ensembleFilter: jest.fn(),
};

describe('<NotificationsDashboard />', () => {
  beforeEach(() => {
    render(<NotificationsDashboard {...mockProps} />);
  });
  it('<NotificationsDashboard /> is in the document', () => {
    const dashboard = screen.getByTestId('notifications-dashboard');
    expect(dashboard).toBeInTheDocument();
  });

  it('past messages filter btn is in the document', () => {
    const pastBtn = screen.getByText('Past Offers');
    expect(pastBtn).toBeInTheDocument();
  });
  it("filter by 'action required' is in the document", () => {
    const actionFilter = screen.getByText('Action Required');
    expect(actionFilter).toBeInTheDocument();
  });

  it("action filter btn calls playerCallFilter('action') on click", () => {
    const actionFilter = screen.getByText('Action Required');
    act(() => {
      fireEvent.click(actionFilter);
    });
    expect(mockProps.playerCallFilter).toHaveBeenCalledWith('action');
  });

  it("past messages btn calls playerCallFilter('past') on click", () => {
    const pastBtn = screen.getByText('Past Offers');
    act(() => {
      fireEvent.click(pastBtn);
    });
    expect(mockProps.playerCallFilter).toHaveBeenCalledWith('past');
  });

  it("ensemble filters are in the document and call ensembleFilter('ensemble') on click", () => {
    const ensembleFilterText = screen.getByText('Filter by ensemble');
    expect(ensembleFilterText).toBeInTheDocument();
    for (let i = 0; i < mockProps.ensembleArray.length; i++) {
      const ensembleFilter = screen.getByText(mockProps.ensembleArray[i].name);
      expect(ensembleFilter).toBeInTheDocument();
      act(() => {
        fireEvent.click(ensembleFilter);
      });
      expect(mockProps.ensembleFilter).toHaveBeenCalledWith(
        mockProps.ensembleArray[i].id
      );
    }
  });
  //it("page loads with inbox view as default", () => {})
  //it("show sent messages btn is in the document", () => {})
  //it("show sent messages btn shows sent view on click", () => {})

  //it("filter by unread btn is in the document", () => {})
  //it("unread filter filters expected messages on click", () => {})

  //it("show inbox tab is in the document", () => {})
  //it("show inbox renders inbox", () => {})
});
