import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // `/projects` and `/track-record` merged into the unified `/work` hub.
      // Literal sources match only the index paths — `/projects/[slug]` case
      // studies are untouched. Query strings pass through automatically.
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/track-record", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
