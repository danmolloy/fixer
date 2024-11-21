import '@testing-library/jest-dom';
import TutorialIndex from '../../../../app/landingPage/tutorial';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { tutorialData } from '../../../../app/landingPage/tutorial/lib';

describe('<TutorialIndex />', () => {
  beforeEach(() => {
    render(<TutorialIndex />);
  });
  it('<TutorialIndex /> renders', () => {
    const tutorialIndex = screen.getByTestId('tutorial-index');
    expect(tutorialIndex).toBeInTheDocument();
  });
  it("'How it works' heading is in the document", () => {
    const tutorialIndex = screen.getByTestId('tutorial-index');

    expect(tutorialIndex.textContent).toMatch(/^How it works/);
  });
  it('starting with initial slide, right click and lett click renders next/previous slides', () => {
    const tutorialIndex = screen.getByTestId('tutorial-index');
    const rightBtn = screen.getByTestId('right-btn');
    const leftBtn = screen.getByTestId('left-btn');

    for (let i = 0; i < tutorialData.length; i++) {
      expect(tutorialIndex.textContent).toMatch(tutorialData[i].header);
      expect(tutorialIndex.textContent).toMatch(tutorialData[i].header);
      act(() => {
        fireEvent.click(rightBtn);
      });
    }
    act(() => {
      fireEvent.click(rightBtn);
    });
    for (let i = tutorialData.length - 1; i >= 0; i--) {
      expect(tutorialIndex.textContent).toMatch(tutorialData[i].header);
      expect(tutorialIndex.textContent).toMatch(tutorialData[i].header);
      act(() => {
        fireEvent.click(leftBtn);
      });
    }
  });
});
