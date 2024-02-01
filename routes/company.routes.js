const Company = require("../models/Company.model");
const router = require("express").Router();

// GET - Reads all companies - /api/companies - FE: SignUp
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while getting the companies." });
  }
});

// GET - Reads one company - /api/companies/:companyId - FE: CompanyProfilePage
router.get("/:companyId", async (req, res) => {
  const { companyId } = req.params;
  try {
    const oneCompany = await Company.findById(companyId).populate("activities");
    res.status(200).json(oneCompany);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while getting the company." });
  }
});

// POST - Creates one company - /api/companies - FE: SignUpPage
router.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newCompany = await Company.create(payload);
    res.status(201).json(newCompany);
    console.log(newCompany)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while creating the company." });
  }
});

// PUT - Updates one company - /api/companies/:companyId - FE: CompanyProfilePage
router.put("/:companyId", async (req, res) => {
    try {
      const { companyId } = req.params;
      const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, {
        new: true,
      });
      if (!updatedCompany) {
        return res.status(404).json({ message: "Company not found." })
      }
      res.status(200).json(updatedCompany);
    } catch (error) {
      res.status(500).json({ message: "Failed to update the company information." });
    }
  });

// DELETE /companies/:companyId - Deletes a specific company by id - FE: CompanyProfilePage
router.delete("/:companyId", async (req, res) => {
    try {
      const { companyId } = req.params;
      const deletedCompany = await Company.findByIdAndDelete(companyId);
      if (!deletedCompany) {
        return res.status(404).json({ message: "Company not found." })
      }
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete company." });
    }
  });


module.exports = router;