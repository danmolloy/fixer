import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import ContactMenu, {
  ContactMenuProps,
} from '../../../app/contacts/contactMenu';
import axios from '../../../__mocks__/axios';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: ContactMenuProps = {
  contactId: 'mockString',
  editContact: jest.fn(),
  setShowOptions: jest.fn(),
};

describe('<ContactMenu />', () => {
  beforeEach(() => {
    render(<ContactMenu {...mockProps} />);
  });
  it('<ContactMenu /> is in the document', () => {
    const contactMenu = screen.getByTestId('contact-options');
    expect(contactMenu).toBeInTheDocument();
  });
  it("'Edit' button calls editContact(contactId) on click", () => {
    const editBtn = screen.getByText('Edit');
    expect(editBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(editBtn);
    });
    expect(mockProps.editContact).toHaveBeenCalledWith(mockProps.contactId);
  });
  it("'Delete' button calls deleteContact(contactId) on click", async () => {
    const deleteBtn = screen.getByText('Delete');
    expect(deleteBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(deleteBtn);
    });
    expect(mockPost).toHaveBeenCalledWith('/contact/api/archive', {
      id: mockProps.contactId,
    });
  });
});
