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
  signup: async (req, res, next) => {
    try {
      // find if personnel is available
      await Personnel.findOne({
        where: { personnel_phone: req.body.phone_number }
      }).then(personnel => {
        if (personnel) {
          return res.status(403).json({ error: { number: "Number in use" } });
        }
      });

      // create new Personnel
      await Personnel.create({
        personnel_phone: req.body.phone_number,
        personnel_fname: req.body.name,
        personnel_password: req.body.password,
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
    try {
      const personnel = req.body;
      // generate token
      return await res.status(200).json({ personnel, accessToken: token });
    } catch (error) {
      console.log(error);
    }
  }
};
