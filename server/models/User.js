const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      // ID field: auto-incrementing primary key
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // Email field: required and must be unique
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      // Password field: required
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Verification code field: required and of type INTEGER
      verificationCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Add any additional options here
      tableName: "users",
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  return User;
};
