var vCardsJS = require("vcards-js");

//create a new vCard
var vCard = vCardsJS();

export default function getVCardString(req, res) {
  const body = req.body;
  //set properties
  vCard.firstName = body.firstName;
  vCard.lastName = body.lastName;
  vCard.company = body.company;
  vCard.workPhone = body.phone;
  vCard.email = body.email;

  res.status(200).json({ vcard: vCard.getFormattedString() });
}
