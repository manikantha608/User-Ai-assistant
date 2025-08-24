import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imagekit.js";
import openai from "../configs/openai.js";

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

    // Get AI response
    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    // Push AI reply
    chat.messages.push(reply);

    // Save chat updates
    await chat.save();

    // Update user credits (example: -1 per message)
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    // Send response AFTER saving
    return res.json({ success: true, reply });
  } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

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