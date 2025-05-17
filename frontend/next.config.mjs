/** @type {import('next').NextConfig} */
const nextConfig = {
   basePath: "/beefleet",
   assetPrefix: "/beefleet",
   trailingSlash: true,

   rewrites: async () => {
      return [
         {
            source: "/api/:path*",
            destination: "http://bee-fleet-datahub:5004/api/:path*",
         },
      ];
   },

   images: {
      domains: ["localhost", "hublast.com", "bee-fleet-datahub"],
   },
};


export default nextConfig;
