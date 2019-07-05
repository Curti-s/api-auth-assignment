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
    // find user specified by phone_number
    let personnel = await Personnel.findOne({
      where: { personnel_phone: req.body.phone_number }
    });

    if (personnel) {
      return res.status(403).json({ error: { number: "Number is in use" } });
    }

    Personnel.create({
      personnel_phone: req.body.phone_number,
      personnel_password: req.body.password,
      personnel_fname: req.body.name,
      personnel_email: req.body.email
    })
      .then(newPersonnel => {
        let token = signToken(newPersonnel);
        return res.status(201).json({ newPersonnel, token: `Bearer ${token}` });
      })
      .catch(err => res.status(400).send({ err: err }));
  },
  login: async (req, res) => {
    // generate token
    let token = signToken(req.user);
    res.status(200).json({ token });
  }
};
