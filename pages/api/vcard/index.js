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
  // I don't think capital letters would be an issue, but
  // since we are hidding them from the UI, let's also not
  // encode it with the capital letters as it will look weird
  vCard.email = body.email.toLowerCase();

  res.status(200).json({ vcard: vCard.getFormattedString() });
}
