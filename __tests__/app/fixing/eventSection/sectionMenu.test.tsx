import '@testing-library/jest-dom';
import SectionMenu, {
  SectionMenuProps,
} from '../../../../app/fixing/eventSection/sectionMenu';
import { act, fireEvent, render, screen } from '@testing-library/react';

global.focus = jest.fn();

const mockProps: SectionMenuProps = {
  addToList: jest.fn(),
  editSection: jest.fn(),
};

describe('<SectionMenu />', () => {
  beforeEach(() => {
    render(<SectionMenu {...mockProps} />);
  });
  it('<SectionMenu /> renders without crashing', () => {
    const sectionMenu = screen.getByTestId('section-menu');
    expect(sectionMenu).toBeInTheDocument();
  });
  it('Options btn is in the document and renders menu on click', () => {
    const optionsBtn = screen.getByTestId('options-btn');
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const optionsDiv = screen.getByTestId('options-div');
    expect(optionsDiv).toBeInTheDocument();
  });
  it('Edit Section btn is in the document and calls editSection() on click', () => {
    const optionsBtn = screen.getByTestId('options-btn');
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const editSection = screen.getByText('Edit Section');
    expect(editSection).toBeInTheDocument();
    act(() => {
      fireEvent.click(editSection);
    });
    expect(mockProps.editSection).toHaveBeenCalled();
  });
  it('Add to List btn is in the document and calls addToList() on click', () => {
    const optionsBtn = screen.getByTestId('options-btn');
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const addToList = screen.getByText('Add to List');
    expect(addToList).toBeInTheDocument();
    act(() => {
      fireEvent.click(addToList);
    });
    expect(mockProps.addToList).toHaveBeenCalled();
  });
});
