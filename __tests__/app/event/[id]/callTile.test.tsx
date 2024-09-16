import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CallTile from '../../../../app/event/[id]/callTile';
import React from 'react';
import { mockCall } from '../../../../__mocks__/models/call';
import { DateTime } from 'luxon';
import { Call } from '@prisma/client';

const mockProps: Call = {
  ...mockCall,
  startTime: new Date('2024-07-15T10:59:15.030Z'),
  endTime: new Date('2024-07-15T13:59:15.030Z'),
};

describe('CallTile component', () => {
  beforeEach(() => {
    render(<CallTile {...mockProps} />);
  });
  it('Renders', () => {
    const callTile = screen.getByTestId('call-tile-div');
    expect(callTile).toBeInTheDocument();
  });
  it('startTime is in the document', () => {
    const callTile = screen.getByTestId('call-tile-div');
    expect(callTile.textContent).toMatch(
      String(
        DateTime.fromJSDate(new Date(mockProps.startTime)).toFormat('HH:mm DD')
      )
    );
    expect(callTile.textContent).toMatch('11:59 Jul 15, 2024');
  });
  it('endTime is in the document', () => {
    const callTile = screen.getByTestId('call-tile-div');
    expect(callTile.textContent).toMatch(
      String(
        DateTime.fromJSDate(new Date(mockProps.endTime)).toFormat('HH:mm DD')
      )
    );
    expect(callTile.textContent).toMatch('14:59 Jul 15, 2024');
  });
  it('venue is in the document', () => {
    const callTile = screen.getByTestId('call-tile-div');
    expect(callTile.textContent).toMatch(mockCall.venue);
  });
});
