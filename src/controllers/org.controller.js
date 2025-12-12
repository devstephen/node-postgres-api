const OrganizationModel = require('../models/org.model');

async function createOrganization(req, res) {
  try {
    const user = req.user;

    if (!user)
      return res.status(401).json({ meessage: 'You must be logged in' });

    const { name, sector } = req.body;
    const newOrg = await OrganizationModel.create(name, sector, user.id);
    res
      .status(201)
      .json({ message: 'Organization created successfully', newOrg });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

async function getOrganizations(req, res) {
  try {
    const orgs = await OrganizationModel.findAll();
    res.status(200).json(orgs);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}


module.exports = {
    createOrganization,
    getOrganizations
}