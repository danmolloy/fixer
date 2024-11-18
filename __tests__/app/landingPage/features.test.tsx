import LandingFeatures, {
  featureList,
} from '../../../app/landingPage/features';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<LandingFeatures />', () => {
  beforeEach(() => {
    render(<LandingFeatures />);
  });
  it('<LandingFeatures /> is in the document', () => {
    const features = screen.getByTestId('fixer-features');
    expect(features).toBeInTheDocument();
  });
  it('title and tagline are in the document', () => {
    const title = screen.getByText('Streamline your orchestra management');
    expect(title).toBeInTheDocument();
    const tagline = screen.getByText('Work faster');
    expect(tagline).toBeInTheDocument();
  });
  it('all featuresList titles & blurbs are in the document', () => {
    const features = screen.getByTestId('fixer-features');

    for (let i = 0; i < featureList.length; i++) {
      expect(features.textContent).toMatch(featureList[i].title);
      expect(features.textContent).toMatch(featureList[i].blurb);
    }
  });
});
