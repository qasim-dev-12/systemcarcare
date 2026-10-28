/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/car-body-kit-abu-dhabi", destination: "/car-body-kit-dubai", permanent: true },
      { source: "/car-exterior-detailing-dubai", destination: "/car-interior-detailing-dubai", permanent: true },
      { source: "/car-exterior-detailing-abu-dhabi", destination: "/car-interior-detailing-dubai", permanent: true },
      { source: "/car-interior-detailing-abu-dhabi", destination: "/car-interior-detailing-dubai", permanent: true },
      { source: "/car-major-services-in-abu-dhabi", destination: "/car-major-services-in-dubai", permanent: true },
      { source: "/car-rust-proofing-abu-dhabi", destination: "/car-rust-proofing-dubai", permanent: true },
      { source: "/car-window-tint-abu-dhabi", destination: "/car-window-tint-dubai", permanent: true },
      { source: "/car-wrapping-abu-dhabi", destination: "/car-wrapping-dubai", permanent: true },
      { source: "/ceramic-coating-abu-dhabi", destination: "/ceramic-coating-dubai", permanent: true },
      { source: "/graphene-coating-abu-dhabi", destination: "/graphene-coating-dubai", permanent: true },
      { source: "/paintless-dent-repair-abu-dhabi", destination: "/paintless-dent-repair-dubai", permanent: true },
      { source: "/peelable-car-paint-abu-dhabi", destination: "/peelable-car-paint-dubai", permanent: true },
      { source: "/car-upholstery-mussafah", destination: "/car-upholstery-dubai", permanent: true },
      { source: "/bmw/bmw-repair-abu-dhabi", destination: "/bmw/bmw-repair-dubai", permanent: true },
      { source: "/detailing/paint-protection-film", destination: "/paint-protection-film-dubai", permanent: true },
      { source: "/detailing/car-dechroming-chrome-delete", destination: "/car-dechroming-chrome-delete-dubai", permanent: true },
      { source: "/paint-protection-film", destination: "/paint-protection-film-dubai", permanent: true },
      { source: "/car-dechroming-chrome-delete", destination: "/car-dechroming-chrome-delete-dubai", permanent: true },
      { source: "/car-paint-and-scratch-remover", destination: "/car-paint-and-scratch-remover-dubai", permanent: true },
      { source: "/car-service/car-smart-painting", destination: "/car-service/car-smart-painting-dubai", permanent: true },
      { source: "/services/paintless-dent-removal", destination: "/services/paintless-dent-removal-dubai", permanent: true },
    ];
  },
};

export default nextConfig;
