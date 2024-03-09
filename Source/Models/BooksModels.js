import { DataTypes, Model } from "sequelize";
import sequelize from "../../Config/Database.js";

class Books extends Model {}

Books.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loanDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("loanDate");
        if (rawValue) {
          // Format the date as dmy (day-month-year)
          const formattedDate = rawValue.toLocaleDateString("en-GB");
          return formattedDate;
        } else {
          return null;
        }
      },
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("returnDate");
        if (rawValue) {
          // Format the date as dmy (day-month-year)
          const formattedDate = rawValue.toLocaleDateString("en-GB");
          return formattedDate;
        } else {
          return null;
        }
      },
    },
    penaltyStatus: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "Books",
    tableName: "book",
  }
);

export default Books;
