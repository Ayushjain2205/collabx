import { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Initialize Twilio client with your account SID and auth token
    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send WhatsApp message
    const response = await client.messages.create({
      to: `whatsapp:${req.body.to}`, // Recipient phone number in WhatsApp format
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // Twilio phone number in WhatsApp format
      body: req.body.body, // WhatsApp body
    });

    console.log(response);

    // Return success response
    res.status(200).json({ message: "WhatsApp message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send WhatsApp message" });
  }
};

export default handler;
