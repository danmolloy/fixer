import '@testing-library/jest-dom';
import ImportForm, {
  ImportFormProps,
} from '../../../../../../app/ensembles/[id]/contacts/import/form';
import { mockEnsemble } from '../../../../../../__mocks__/models/ensemble';
import { mockSection } from '../../../../../../__mocks__/models/ensembleSection';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Papa from 'papaparse';
const csvHeaders = [
  'First Name,Last Name,Email,Phone Number,Section,Role,Category',
  'Brett,Sturdy,brett@sturdy.com,07055281329,Double Bass,Tutti,Extra',
  'Gregory,Ievers,greg@ievers.com,07414281850,Viola,Principal,Member',
];
jest.mock('papaparse');
const mockParse = jest.spyOn(Papa, 'parse');

const mockProps: ImportFormProps = {
  environment: "",
  ensemble: {
    ...mockEnsemble,
    sections: [mockSection],
  },
};

describe('<ImportForm />', () => {
  beforeEach(() => {
    render(<ImportForm {...mockProps} />);
  });
  it('<ImportForm /> renders', () => {
    const importForm = screen.getByTestId('import-form');
    expect(importForm).toBeInTheDocument();
  });
  it("'Add Contacts' header is in the document", () => {
    const heading = screen.getAllByRole('heading');
    expect(heading[0].textContent).toMatch('Add Contacts');
  });
  it('Ent manually btn is in the document and renders an empty table on click', async () => {
    const addManually = screen.getByText('Enter manually');
    expect(addManually).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(addManually);
    });
    const inputForm = screen.getByTestId('contact-input-form');
    expect(inputForm).toBeInTheDocument();
    const tableBody = screen.getByTestId('table-body');
    const regex =
      /^selectFluteOboeClarinetBassoonHornTrumpetTromboneTubaTimpaniPercussionOrganPianoViolin 1Violin 2ViolaCelloDouble Bass$/;
    expect(tableBody.textContent).toMatch(regex);
  });
  it("'Import Spreadsheet' option is in the table with label and type='file' attr", () => {
    const importHeader = screen.getByText('Import Spreadsheet');
    expect(importHeader).toBeInTheDocument();
    const input = screen.getByTestId('spreadsheet-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
  });
  it('file input calls papaparse', async () => {
    const fileInput = screen.getByTestId('spreadsheet-input');
    await waitFor(async () => {
      const file = new File(['dummy content'], 'test.csv', {
        type: 'text/csv',
      });
      await fireEvent.change(fileInput, { target: { files: [file] } });
    });
    expect(mockParse).toHaveBeenCalled();
  });
  //it("import success renders table with values", () => {})
  //it("err message if file cannot be read", () => {});
  //it("download spreadsheet btn downloads a spreadsheet in expected format", () => {})
});
