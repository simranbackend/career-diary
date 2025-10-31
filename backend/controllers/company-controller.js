const companyService = require('../services/company-service');

exports.addCompany = async (req, res) => {
	try {
		const data = await companyService.addCompany(req);
		if (data.status) return res.status(200).json(data);
		return res.status(400).json(data);
	} catch (error) {
		console.error('addCompany controller error', error);
		return res.status(500).json({ status: false, message: 'Internal server error' });
	}
};

exports.viewCompanies = async (req, res) => {
	try {
		const data = await companyService.viewCompanies(req);
		if (data.status) return res.status(200).json(data);
		return res.status(400).json(data);
	} catch (error) {
		console.error('viewCompanies controller error', error);
		return res.status(500).json({ status: false, message: 'Internal server error' });
	}
};

exports.editCompany = async (req, res) => {
	try {
		const data = await companyService.editCompany(req);
		if (data.status) return res.status(200).json(data);
		return res.status(400).json(data);
	} catch (error) {
		console.error('editCompany controller error', error);
		return res.status(500).json({ status: false, message: 'Internal server error' });
	}
};

exports.deleteCompany = async (req, res) => {
	try {
		const data = await companyService.deleteCompany(req);
		if (data.status) return res.status(200).json(data);
		return res.status(400).json(data);
	} catch (error) {
		console.error('deleteCompany controller error', error);
		return res.status(500).json({ status: false, message: 'Internal server error' });
	}
};
