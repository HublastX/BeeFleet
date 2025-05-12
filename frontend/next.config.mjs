/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["localhost", "hublast.com"],
   },
   basePath: process.env.NODE_ENV === "production" ? "/beefleet" : "",
};

export default nextConfig;
