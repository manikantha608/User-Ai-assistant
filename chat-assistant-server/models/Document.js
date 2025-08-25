import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  title: String,
  content: String, // plain extracted text
});

// create text index on title + content
DocumentSchema.index({ title: "text", content: "text" });
export default mongoose.model("Document", DocumentSchema);