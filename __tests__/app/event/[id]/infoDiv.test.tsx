import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InfoDiv, { InfoDivProps } from '../../../../app/event/[id]/infoDiv';

describe('<InfoDiv />', () => {
  const mockProps: InfoDivProps = {
    id: 'mock-id',
    className: '',
    title: 'mock-title',
    value: 'mock-value',
  };
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <InfoDiv {...mockProps} />
        </tbody>
      </table>
    );
  });
  it('<InfoDiv /> renders', () => {
    const infoDiv = screen.getByTestId(mockProps.id);
    expect(infoDiv).toBeInTheDocument();
  });
  it('title is in the document', () => {
    const infoDiv = screen.getByTestId(mockProps.id);
    expect(infoDiv).toBeInTheDocument();
    expect(infoDiv.textContent).toMatch(mockProps.title);
  });
  it('value is in the document', () => {
    const infoDiv = screen.getByTestId(mockProps.id);
    expect(infoDiv).toBeInTheDocument();
    expect(infoDiv.textContent).toMatch(mockProps.value!);
  });
});

describe('<InfoDiv />', () => {
  const mockProps: InfoDivProps = {
    id: 'mock-id',
    className: '',
    title: 'mock-title',
  };
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <InfoDiv {...mockProps} />
        </tbody>
      </table>
    );
  });
  it('<InfoDiv /> renders if no value passed', () => {
    const infoDiv = screen.getByTestId(mockProps.id);
    expect(infoDiv).toBeInTheDocument();
    expect(infoDiv.textContent).toMatch(mockProps.title);
    expect(infoDiv.textContent).toMatch('Not specified');
  });
});
