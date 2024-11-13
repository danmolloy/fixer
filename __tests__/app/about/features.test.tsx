import { act, render, screen } from '@testing-library/react';
import AboutFeatures from '../../../app/about/features';
import { featureList } from '../../../app/landingPage/features';
import '@testing-library/jest-dom';

describe('<AboutFeatures />', () => {
  beforeEach(() => {
    render(<AboutFeatures />);
  });
  it('<AboutFeatures /> renders', () => {
    const aboutFeatures = screen.getByTestId('about-features');
    expect(aboutFeatures).toBeInTheDocument();
  });
  it('features list is in the document', () => {
    const aboutFeatures = screen.getByTestId('about-features');

    for (let i = 0; i < featureList.length; i++) {
      expect(aboutFeatures.textContent).toMatch(featureList[i].title);
      expect(aboutFeatures.textContent).toMatch(featureList[i].blurb);
    }
  });
  it('matches snapshot', () => {
    const aboutFeatures = screen.getByTestId('about-features');
    expect(aboutFeatures).toMatchSnapshot();
  });
});
