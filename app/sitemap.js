const BASE_URL = "https://systemxcarcare.com";

const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/car-paint-and-scratch-remover", priority: 0.8, changeFrequency: "monthly" },
  { path: "/car-service/car-smart-painting", priority: 0.8, changeFrequency: "monthly" },
  { path: "/paintless-dent-repair-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/paintless-dent-removal", priority: 0.7, changeFrequency: "monthly" },
  { path: "/detailing/paint-protection-film", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ceramic-coating-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/graphene-coating-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/car-window-tint-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/residential-window-tinting-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/office-window-tinting-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/car-interior-detailing-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/car-upholstery-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/car-wrapping-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/detailing/car-dechroming-chrome-delete", priority: 0.7, changeFrequency: "monthly" },
  { path: "/car-body-kit-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/car-rust-proofing-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/peelable-car-paint-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/bmw/bmw-repair-dubai", priority: 0.6, changeFrequency: "monthly" },
  { path: "/car-major-services-in-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/5-reasons-why-car-service-is-important", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap() {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
