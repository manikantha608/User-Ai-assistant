import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imagekit.js";
import openai from "../configs/openai.js";
import FAQ from "../models/FAQ.js";
import Document from "../models/Document.js";

//Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    let reply;

    // 🔎 Step 1: Check FAQ
    const faq = await FAQ.findOne({ $text: { $search: prompt } });
    if (faq) {
      reply = {
        role: "assistant",
        content: faq.answer,
        timestamp: Date.now(),
        isImage: false,
      };
    }

    // 🔎 Step 2: Check Documents if FAQ not found
    if (!reply) {
      const doc = await Document.findOne({ $text: { $search: prompt } });
      if (doc) {
        reply = {
          role: "assistant",
          content: doc.content,
          timestamp: Date.now(),
          isImage: false,
        };
      }
    }

    // 🔎 Step 3: Fallback to AI
    if (!reply) {
      const { choices } = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          { role: "system", content: "You are a support assistant. Use company FAQs & Docs if relevant." },
          { role: "user", content: prompt },
        ],
      });

      reply = {
        ...choices[0].message,
        timestamp: Date.now(),
        isImage: false,
      };
    }

    // Push AI or FAQ/Doc reply
    chat.messages.push(reply);

    // Save chat updates
    await chat.save();

    // Update user credits (example: -1 per message)
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    return res.json({ success: true, reply });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Image Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { prompt, chatId } = req.body
        //Find chat
        const chat = await Chat.findOne({ userId, _id: chatId })

        //push user message
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false })

        //Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt)

        //Construct ImageKit AI generation URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/selfAsistant/${Date.now()}.png?tr=w-800,h-800`;

        //Trigger generation by fetching from ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, { responseType: "arraybuffer" })

        //Convert to Base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`

        //Upload to ImageKit Media Library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "selfAsistant"
        })

        const reply = {
            role: "assistant", content: uploadResponse.url
            , timestamp: Date.now(), isImage: true
        }
        // res.json({ success: true, reply })

        chat.messages.push(reply)
        await chat.save()
        res.json({ success: true, reply })

        // await User.updateOne({_id:userId})


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}