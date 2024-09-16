import { act, render, screen } from '@testing-library/react';
import AboutFeatures, { fixerFeatureList } from '../../../app/about/features';
import '@testing-library/jest-dom';

describe('<AboutFeatures />', () => {
  beforeEach(() => {
    render(<AboutFeatures />);
  });
  it('<AboutFeatures /> renders', () => {
    const aboutFeatures = screen.getByTestId('about-features');
    expect(aboutFeatures).toBeInTheDocument();
  });
  it('fixerFeatures list is in the document', () => {
    const aboutFeatures = screen.getByTestId('about-features');

    for (let i = 0; i < fixerFeatureList.length; i++) {
      expect(aboutFeatures.textContent).toMatch(fixerFeatureList[i].title);
      expect(aboutFeatures.textContent).toMatch(fixerFeatureList[i].blurb);
    }
  });
  it('matches snapshot', () => {
    const aboutFeatures = screen.getByTestId('about-features');
    expect(aboutFeatures).toMatchSnapshot();
  });
});
