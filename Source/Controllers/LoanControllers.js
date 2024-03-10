import Loan from "../Models/LoanModels.js";
import Member from "../Models/MemberModels.js";
import sequelize from "sequelize";

// function get All loan
export const getAllLoan = async (req, res) => {
  try {
    const response = await Loan.findAll({
      attributes: ["id", "memberCode", "bookCode", "loanDate"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function get All loan by id member
export const getLoanByID = async (req, res) => {
  try {
    const id = req.params.id;
    const loan = await Loan.findOne({ where: { id: id } });
    if (!loan) {
      return res.status(404).json({ msg: "Data Not Found" });
    }
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function create loan
export const createLoan = async (req, res) => {
  const { memberCode, bookCode, loanDate } = req.body;
  if (!memberCode || !bookCode || !loanDate) {
    return res
      .status(400)
      .json({ msg: "Member Code, Book Code and Loan Date are required" });
  }
  try {
    const existingLoan = await Loan.findOne({
      where: { memberCode: memberCode, bookCode: bookCode },
    });
    if (existingLoan) {
      return res.status(400).json({ msg: "Loan already exists" });
    }

    const loanDateToUse = loanDate || Date.now();
    await Loan.create({
      memberCode: memberCode,
      bookCode: bookCode,
      loanDate: loanDateToUse,
    });
    res.status(201).json({ msg: "Loan Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const countBooksBorrowedByMember = async (req, res) => {
  try {
    const membersWithBooksCount = await Member.findAll({
      attributes: ["code", "name"],
      include: [
        {
          model: Loan,
          attributes: [
            [
              sequelize.fn("COUNT", sequelize.col("Loan.id")),
              "total_books_borrowed",
            ],
          ],
          as: "loan",
        },
      ],
      group: ["Member.code", "Member.name"],
    });

    res.status(200).json(membersWithBooksCount);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function update return loan
export const updateReturnDateAndPenaltyStatus = async (req, res) => {
  try {
    const loan = await Loan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!loan) {
      return res.status(404).json({ message: "Data not found" });
    }

    loan.returnDate = req.body.returnDate || loan.returnDate;
    if (req.body.penaltyStatus !== undefined) {
      loan.penaltyStatus = req.body.penaltyStatus;
    }

    await loan.save();

    return res.status(200).json({
      message: "Return date and penalty status updated successfully",
      loan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Please Contact Support", error });
  }
};
