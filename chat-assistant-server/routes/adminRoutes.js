// routes/admin.js
import express from "express";
import FAQ from "../models/FAQ.js";
import Document from "../models/Document.js";
import multer from "multer";
// import pdfParse from "pdf-parse";
import { extractPdfText } from "../configs/pdfConverter.js";
import {isAdminUser} from "../middlewares/adminMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js"

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add FAQ
router.post("/faq", authMiddleware,isAdminUser, async (req, res) => {
  const faq = await FAQ.create(req.body); // {question, answer}
  res.json({ success: true, faq });
});

router.get("/faq-all", authMiddleware,isAdminUser, async (req, res) => {
  const faq = await FAQ.find( ); // {question, answer}
  res.json({ success: true, faq });
});


//get all document result
router.get("/doc-all", authMiddleware,isAdminUser, async (req, res) => {
  const documents = await Document.find( ); // {question, answer}
  res.json({ success: true, documents });
});

// Add Doc (text only for now)
router.post("/doc",authMiddleware,isAdminUser, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const pdfData = await extractPdfText(req.file.buffer);

    const doc = await Document.create({
      title: req.file.originalname,
      content: pdfData,
    });

    res.json({ success: true, doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;



