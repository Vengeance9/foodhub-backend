import { auth as betterAuth } from "../../lib/auth.js";

const getServerSession = async (req, res) => {
  const session = await betterAuth.api.getSession({
    headers: req.headers,
  });

  return res.status(200).json({
    success: true,
    session,
  });
};

export const sessionController = { getServerSession };
