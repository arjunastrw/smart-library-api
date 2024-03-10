import { DataTypes, Model } from "sequelize";
import sequelize from "../../Config/Database.js";

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

export default Loan;
