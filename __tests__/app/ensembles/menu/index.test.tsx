import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import EnsemblesMenu, {
  EnsemblesMenuProps,
} from '../../../../app/ensembles/menu';
import { mockEnsemble } from '../../../../__mocks__/models/ensemble';
import { mockEnsembleAdmin } from '../../../../__mocks__/models/ensembleAdmin';

global.focus = jest.fn();

describe('<EnsemblesMenu />', () => {
  const mockProps: EnsemblesMenuProps = {
    ensemblesAdmins: [
      {
        ...mockEnsembleAdmin,
        ensemble: mockEnsemble,
      },
    ],
  };
  beforeEach(() => {
    render(<EnsemblesMenu {...mockProps} />);
  });
  it('ensembles-btn is in the document on click', () => {
    const menuBtn = screen.getByTestId('ensembles-btn');
    expect(menuBtn).toBeInTheDocument();
  });
  it('ensembles-menu is in the document with "Ensembles" text content', () => {
    const menuBtn = screen.getByTestId('ensembles-btn');
    expect(menuBtn).toHaveTextContent('Ensembles');
    act(() => {
      fireEvent.click(menuBtn);
    });
    const menu = screen.getByTestId('ensembles-menu');
    expect(menu).toBeInTheDocument();
  });
  it('join ensemble link is in the document with expected href', () => {
    const menuBtn = screen.getByTestId('ensembles-btn');
    act(() => {
      fireEvent.click(menuBtn);
    });
    const joinLink = screen.getByTestId('join-link');
    expect(joinLink).toBeInTheDocument();
    expect(joinLink).toHaveTextContent('Join Ensemble');
    expect(joinLink).toHaveAttribute('href', '/ensembles/join');
  });
  it('create ensemble link is in the document with expected href', () => {
    const menuBtn = screen.getByTestId('ensembles-btn');
    act(() => {
      fireEvent.click(menuBtn);
    });
    const createLink = screen.getByTestId('create-link');
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveTextContent('Create Ensemble');
    expect(createLink).toHaveAttribute('href', '/ensembles/create');
  });
  it('all ensembles are in the document with text content & href', () => {
    const menuBtn = screen.getByTestId('ensembles-btn');
    act(() => {
      fireEvent.click(menuBtn);
    });
    for (let i = 0; i < mockProps.ensemblesAdmins.length; i++) {
      const ensemble = screen.getByText(
        mockProps.ensemblesAdmins[i].ensemble.name
      );
      expect(ensemble).toBeInTheDocument();
      expect(ensemble).toHaveAttribute(
        'href',
        `/ensembles/${mockProps.ensemblesAdmins[i].ensemble.id}`
      );
    }
  });
});

describe('<EnsemblesMenu />', () => {
  const mockProps: EnsemblesMenuProps = {
    ensemblesAdmins: [],
  };
  beforeEach(() => {
    render(<EnsemblesMenu {...mockProps} />);
  });

  it('if !ensembles, it states so', () => {
    const menuBtn = screen.getByTestId('ensembles-btn');
    act(() => {
      fireEvent.click(menuBtn);
    });
    const helpText = screen.getByText('No Ensembles');
    expect(helpText).toBeInTheDocument();
  });
});
