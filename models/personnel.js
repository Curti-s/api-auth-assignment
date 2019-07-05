/* jshint indent: 1 */
const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  let Personnel = sequelize.define(
    "personnel",
    {
      personnel_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      personnel_onames: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      personnel_fname: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      personnel_email: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      personnel_phone: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      personnel_password: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "e10adc3949ba59abbe56e057f20f883e"
      },
      personnel_status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: "1"
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true
      },
      personnel_type_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: "1"
      },
      reset_password: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: "1"
      }
    },
    {
      tablename: "personnel",
      timestamps: false
    }
  );

  Personnel.beforeCreate(async (personnel, options) => {
    return (personnel.personnel_password = await bcrypt.hash(
      personnel.personnel_password,
      bcrypt.genSalt(10)
    ));
  });

  Personnel.prototype.comparePassword = async candidatePassword => {
    return await bcrypt.compare(candidatePassword, this.personnel_password);
  };

  return Personnel;
};
