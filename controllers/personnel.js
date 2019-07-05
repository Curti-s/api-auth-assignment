const JWT = require("jsonwebtoken");

const Personnel = require("../models").personnels;
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
  signup: async (req, res, next) => {
    // find user specified by phone_number
    let personnel = await Personnel.findAll({
      limit: 1,
      where: { personnel_phone: req.body.phone_number }
    });
    try {
      // find if personnel is available
      await Personnel.findOne({
        where: { personnel_phone: req.body.phone_number }
      })
        .then(personnel => {
          if (personnel) {
            return res.status(403).json({ error: { number: "Number in use" } });
          }
        })
        .catch(err => {
          console.log(err);
        });

      // create new Personnel
      await Personnel.create({
        personnel_phone: req.body.phone_number,
        personnel_password: req.body.password,
        personnel_fname: req.body.name,
        personnel_email: req.body.email
      })
        .then(newPersonnel => {
          let token = signToken(newPersonnel);
          return res
            .status(201)
            .json({ newPersonnel, token: `Bearer ${token}` });
        })
        .catch(err => {
          console.log(err);
          res.status(400).send({ err: err });
        });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    // generate token
    let token = signToken(req.user);
    res.status(200).json({ token });
  }
};
