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
