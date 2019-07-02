const JWT = require("jsonwebtoken");

const Personnel = require("../models").personnel;
const { JWT_SECRET } = require("../config");

let signToken = person => {
  return JWT.sign(
    {
      iss: "kirimi",
      sub: person.personnel_id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDay() + 1)
    },
    JWT_SECRET
  );
};
module.exports = {
  signup(req, res) {
    let { phone_number } = req.body;

    if (!req.body.phone_number || !req.body.password) {
      return res.status(400).send({ error: "Missing username or password" });
    } else {
      Personnel.create({
        personnel_phone: req.body.phone_number,
        personnel_password: req.body.password,
        personnel_fname: req.body.name,
        personnel_email: req.body.email
      })
        .then(newPersonnel => {
          let token = signToken(newPersonnel);
          return res.status(201).json({ newPersonnel, token });
        })
        .catch(err => res.status(400).send({ err: err }));
    }
  },
  login(req, res) {
    Personnel.find({
      where: {
        phone_number: req.body.personnel_phone_number
      }
    }).then(personnel => {
      if (!personnel) {
        return res.status(401).json("Authentication failed.");
      }
      bcrypt.compare(
        req.body.personnel_password,
        personnel.personnel_password,
        function(err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.sign();
          }
        }
      );
    });
  }
};
