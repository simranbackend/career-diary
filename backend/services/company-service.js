const Company = require('../models/company-model');

exports.addCompany = async (req) => {
  try {
    const { name, domain, url, contact, applied = true, summary } = req.body;
    if (!name) {
      return { status: false, message: 'Company name is required.' };
    }

    const company = await Company.create({
      userId: req.user.id,
      name,
      domain,
      url,
      contact,
      applied,
      summary,
    });

    return { status: true, message: 'Company added successfully.', data: company };
  } catch (error) {
    console.error('Error in addCompany', error);
    return { status: false, message: 'Something went wrong. Please try again.' };
  }
};

exports.viewCompanies = async (req) => {
  try {
    const companies = await Company.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return { status: true, message: 'Companies fetched.', data: companies };
  } catch (error) {
    console.error('Error in viewCompanies', error);
    return { status: false, message: 'Something went wrong. Please try again.' };
  }
};

exports.editCompany = async (req) => {
  try {
    const { id, ...updates } = req.body;
    if (!id) return { status: false, message: 'Company id is required.' };

    const company = await Company.findOne({ _id: id, userId: req.user.id });
    if (!company) return { status: false, message: 'Company not found.' };

    Object.assign(company, updates);
    await company.save();

    return { status: true, message: 'Company updated successfully.', data: company };
  } catch (error) {
    console.error('Error in editCompany', error);
    return { status: false, message: 'Something went wrong. Please try again.' };
  }
};

exports.deleteCompany = async (req) => {
  try {
    const { id } = req.body;
    if (!id) return { status: false, message: 'Company id is required.' };

    const result = await Company.deleteOne({ _id: id, userId: req.user.id });
    if (result.deletedCount === 0) return { status: false, message: 'Company not found or not owned by user.' };

    return { status: true, message: 'Company deleted successfully.' };
  } catch (error) {
    console.error('Error in deleteCompany', error);
    return { status: false, message: 'Something went wrong. Please try again.' };
  }
};
