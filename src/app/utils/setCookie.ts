import { Response } from "express";

export const setCookie = (res: Response, tokenInfo: string) => {
  if (tokenInfo) {
    res.cookie("accessToken", tokenInfo, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};

// export const setCookie = (res: Response, tokenInfo: string) => {
//   if (!tokenInfo) return;

//   const isProduction = process.env.NODE_ENV === "production";

//   res.cookie("accessToken", tokenInfo, {
//     httpOnly: true,
//     secure: isProduction,     // ❗ Only secure cookies in production
//     sameSite: isProduction ? "none" : "lax",
//     path: "/",
//     maxAge: 15 * 60 * 1000,   // optional: 15 min
//   });
// };
