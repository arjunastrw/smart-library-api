import Loan from "../Source/Models/LoanModels.js";
import {
  createLoan,
  getAllLoan,
  getLoanByID,
  updateReturnDateAndPenaltyStatus,
} from "../Source/Controllers/LoanControllers.js";

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../Source/Models/LoanModels.js", () => ({
  // function get All Loan
  findAll: jest.fn(),
  // function get Loan by ID
  findOne: jest.fn(),
  // function create Loan
  create: jest.fn(),
  // function update Return Date and Penalty Status
  update: jest.fn(),
}));

// unit test get all loan
describe("getAllLoan function", () => {
  // Get All Loan Success
  test("return all loans success", async () => {
    const mockLoans = [
      {
        id: 1,
        memberCode: "001",
        bookCode: "001",
        loanDate: "2024-01-01",
        penalty_status: 0,
      },
      {
        id: 2,
        memberCode: "002",
        bookCode: "002",
        loanDate: "2024-01-02",
        penalty_status: 0,
      },
    ];
    Loan.findAll.mockResolvedValue(mockLoans);

    await getAllLoan({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockLoans);
  });

  test("return all loans failed", async () => {
    const mockError = new Error("Failed to fetch loans");
    Loan.findAll.mockRejectedValue(mockError);
    await getAllLoan({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError.message });
  });
});
