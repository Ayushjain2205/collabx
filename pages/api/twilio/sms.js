import { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Initialize Twilio client with your account SID and auth token
    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send SMS message
    const response = await client.messages.create({
      to: req.body.to, // Recipient phone number
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
      body: req.body.body, // SMS body
    });

    console.log(response);

    // Return success response
    res.status(200).json({ message: "SMS sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
};

export default handler;
