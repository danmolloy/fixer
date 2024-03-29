import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import MemberTile, { MemberTileProps } from "../../../../components/fixing/instrument/players/memberTile"
import { mockEnsembleMemberWithUser } from "../../../../__mocks__/models/ensembleMember"

const mockProps: MemberTileProps = {
  member: mockEnsembleMemberWithUser,
  setSelectMember: jest.fn(),
  disabled: false
}

describe("<MemberTile />", () => {
  beforeEach(() => {
    render(<MemberTile {...mockProps} />)
  })
  it("member-tile is in the document", () => {
    const memberTile = screen.getByTestId(`${mockProps.member.id}-member-tile`)
    expect(memberTile).toBeInTheDocument()
  })
  it("member name is in the document", () => {
    const memberName = screen.getByText(`${mockProps.member.user.firstName} ${mockProps.member.user.lastName}`)
    expect(memberName).toBeInTheDocument()
  })
  it("select-btn is in the document and calls setSelect(musician)", () => {
    const selectBtn = screen.getByText("Select")
    expect(selectBtn).toBeInTheDocument()
    waitFor(() => fireEvent.click(selectBtn))
    expect(mockProps.setSelectMember).toHaveBeenCalledWith(mockProps.member.user.id)
  })
  it("tile states their section position, i.e. tutti, principal, extra", () => {
    const position = screen.getByText(mockProps.member.positionTitle)
    expect(position).toBeInTheDocument()
  })
  it("if disabled is false, select btn is not disabled", () => {
    const selectBtn = screen.getByText("Select")
    expect(selectBtn).toBeInTheDocument()
    expect(selectBtn).not.toHaveAttribute("disabled")
  })
})

describe("<MemberTile />", () => {
  const mockProps: MemberTileProps = {
    member: {
      ...mockEnsembleMemberWithUser,
      positionTitle: "Extra"
    },
    setSelectMember: jest.fn(),
    disabled: true
  }
  beforeEach(() => {
    render(<MemberTile {...mockProps}/>)
  })
  it('if extra, player profile link is in the document with expected href', () => {
    const profileLink = screen.getByTestId("profile-link")
    expect(profileLink).toBeInTheDocument()
    expect(profileLink).toHaveAttribute("href", `/user/${mockProps.member.user.id}`)
    expect(profileLink).toHaveAttribute("target", "_blank")

  })
  it("if extra player, member img is in the document", () => {
    const profileImg = screen.getByTitle(`${mockProps.member.user.firstName} ${mockProps.member.user.lastName} profile image`)
    expect(profileImg).toBeInTheDocument()
  })
  it("if disabled is true, select btn is disabled", () => {
    const selectBtn = screen.getByText("Select")
    expect(selectBtn).toBeInTheDocument()
    expect(selectBtn).toHaveAttribute("disabled")
  })
})