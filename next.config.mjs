/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/manifesto',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/labs',
        destination: '/playground',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/cv',
        destination: '/resume',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
