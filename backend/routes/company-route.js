const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company-controller');
const auth = require('../middlewares/auth');

router.post('/add', auth, companyController.addCompany);
router.get('/view', auth, companyController.viewCompanies);
router.put('/edit', auth, companyController.editCompany);
router.delete('/delete', auth, companyController.deleteCompany);

module.exports = router;