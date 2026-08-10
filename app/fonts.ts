import localFont from "next/font/local";

export const lineSeed = localFont({
    src: [
        {
            path: "../public/font/LINESeedSansTH_W_Rg.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/font/LINESeedSansTH_W_Bd.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/font/LINESeedSansTH_W_XBd.woff2",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-line-seed",
});