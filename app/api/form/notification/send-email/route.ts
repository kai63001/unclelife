import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "user",
    pass: process.env.SMTP_PASSWORD || "password",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formId, email } = body;
    if (formId === null) {
      return NextResponse.json({ error: "No formId provided" });
    }
    if (email === null) {
      return NextResponse.json({ error: "No email provided" });
    }

    const { data, error } = await supabaseBypass
      .from("form")
      .select("notification")
      .eq("id", formId)
      .single();
    if (error) {
      return NextResponse.json({
        message: "error",
        error: error,
      });
    }

    const transporter = nodemailer.createTransport({
      ...smtpOptions,
    });
    let mailOptions: any = {
      from: {
        name: data?.notification?.respondentEmail?.senderName || "UncleLife",
        address: process.env.SMTP_FROM_EMAIL,
      },
      to: email,
      subject: data?.notification?.respondentEmail?.emailSubject,
      html: data?.notification?.respondentEmail?.emailContent,
    };
    if (!data?.notification?.respondentEmail?.enable) {
      return NextResponse.json({
        message: "error",
        error: "email not enabled",
      });
    }
    if (data?.notification?.respondentEmail?.replyTo.length > 0) {
      mailOptions = {
        ...mailOptions,
        replyTo: data?.notification?.respondentEmail?.replyTo,
      };
    }
    await transporter.sendMail(mailOptions);
    //   .then((info) => {
    //     console.log(info);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }
}
