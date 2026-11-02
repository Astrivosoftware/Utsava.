import { DM_Serif_Display, Kaushan_Script, Poppins, Shadows_Into_Light } from "next/font/google";

// Headings (Avigea-style bold serif)
export const fontDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Accent script (Holiday-style)
export const fontScript = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

// Body + UI
export const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Handwritten notes
export const fontHand = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});
