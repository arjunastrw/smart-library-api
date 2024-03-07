import { DataTypes, Model } from "sequelize";
import sequelize from "../../Config/Database.js";

class Member extends Model {}

Member.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "Member",
    tableName: "member",
  }
);

export default Member;
