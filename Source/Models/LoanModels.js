import { DataTypes, Model } from "sequelize";
import sequelize from "../../Config/Database.js";
import Book from "../Models/BooksModels.js";
import Member from "../Models/MemberModels.js";

class Loan extends Model {}

Loan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    memberCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    penalty_status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "Loan",
    tableName: "loan",
  }
);

// Definisikan hubungan antara Loan dengan Member
Loan.belongsTo(Member, {
  foreignKey: "memberCode",
  targetKey: "code",
  as: "member",
});

// Definisikan hubungan antara Loan dengan Book
Loan.belongsTo(Book, { foreignKey: "bookCode", targetKey: "code", as: "book" });

export default Loan;
