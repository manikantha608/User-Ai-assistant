import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

FAQSchema.index({ question: "text", answer: "text" });

export default mongoose.model("FAQ", FAQSchema);