/** @type {import('next').NextConfig} */
const nextConfig = {
   basePath: "/beefleet",
   assetPrefix: "/beefleet",
   trailingSlash: true,

   rewrites: async () => {
      return [
         {
            source: "/api/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
         },
      ];
   },

   images: {
      domains: ["localhost"],
   },
};


export default nextConfig;
