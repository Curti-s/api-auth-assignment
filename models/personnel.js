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
      tableName: "personnel",
      timestamps: false,

      hooks: {}
    }
  );

  Personnel.beforeCreate(async function(personnel, done) {
    await bcrypt.genSalt(10, (err, salt) => {
      if (err) return err;
      bcrypt.hash(personnel.personnel_password, salt, null, (err, hash) => {
        if (err) return err;
        personnel.personnel_password = hash;
        console.log(personnel.personnel_password);
        return done;
      });
    });
  });

  Personnel.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.personnel_password);
  };

  return Personnel;
};
