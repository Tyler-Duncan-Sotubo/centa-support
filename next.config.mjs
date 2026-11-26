import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root, as the dashboard does: a stray lockfile in the
  // home directory otherwise makes Turbopack take the whole home folder as
  // the project.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },

  // Images are served as they are; there are only a few, already sized.
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      // The old Docusaurus "Start here" page; the home page does that job now.
      { source: "/intro", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
