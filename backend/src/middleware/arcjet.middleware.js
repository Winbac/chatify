import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decesion = await aj.protect(req);

    if (decesion.isDenied()) {
      if (decesion.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded, Please try again later." });
      } else if (decesion.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        });
      }
    }

    // check for spoofed bots
    if (decesion.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }
  } catch (error) {
    console.log("Arcject Protection Error", error);
    next();
  }
};
