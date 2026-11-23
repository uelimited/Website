import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Projects is now the canonical project-discovery route. Query strings
      // pass through so old filtered links continue to work.
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/track-record", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
