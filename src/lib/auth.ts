import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS,
  },
});


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  baseURL: process.env.BETTER_AUTH_URL!,
  redirectTo: process.env.APP_URL!,
  trustedOrigins: [process.env.APP_URL!, "http://localhost:3001"],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    //callbackUrl: `${process.env.APP_URL}`,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const modifiedUrl = new URL(url);
      modifiedUrl.searchParams.set("callbackURL", process.env.APP_URL!);

      
      //   const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      const info = await transporter.sendMail({
        from: `"FoodHub" <${process.env.APP_EMAIL}>`,
        to: `${user.email}`,

        subject: "Please verify your email!",
        text: `Hello,

Welcome! 👋
Thank you for creating an account with us.

To complete your registration, please verify your email address by clicking the link below:

${url}

If you didn’t create this account, you can safely ignore this email.

This verification link will expire for security reasons.

Best regards,
Mustakim Abtahi
Support Team`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding:24px; text-align:center; background:#2563eb; color:#ffffff; border-radius:8px 8px 0 0;">
              <h1 style="margin:0; font-size:22px;">Verify Your Email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px; color:#333333;">
              <p style="font-size:16px; margin:0 0 16px;">Hello 👋</p>

              <p style="font-size:15px; line-height:1.6; margin:0 0 20px;">
                Thank you for signing up! Please confirm your email address by clicking the button below.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${modifiedUrl.toString()}"> 
                   style="background:#2563eb; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-size:16px; display:inline-block;">
                  Verify Email Address
                </a>
              </div>

              <p style="font-size:14px; color:#555555; line-height:1.6;">
                If you did not create this account, you can safely ignore this email.
              </p>

              <p style="font-size:14px; color:#777777; margin-top:24px;">
                This link may expire for security reasons.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px; text-align:center; font-size:13px; color:#999999; background:#f9fafb; border-radius:0 0 8px 8px;">
              © 2026 Mustakim Abtahi · All rights reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`, // HTML body
      });
      console.log("Message sent: %s", info.messageId);
    },
  },
});
