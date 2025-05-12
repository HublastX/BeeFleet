/** @type {import('next').NextConfig} */
const nextConfig = {
   rewrites: async () => {
      return [
         {
            source: "/api/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
         },
      ];
   },
};

export default nextConfig;
