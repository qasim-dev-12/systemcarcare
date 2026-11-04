"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-HFQ1XCTXM3";

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');

          window.trackTelephoneConversion = function () {
            gtag('event', 'conversion', { send_to: 'AW-10827284217/3YNnCKDc17EdEPn97Koo' });
          };
          window.trackWhatsAppConversion = function () {
            gtag('event', 'conversion', { send_to: 'AW-10827284217/giuRCO7o17EdEPn97Koo' });
          };

          document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href]');
            if (!link) return;
            var href = link.getAttribute('href') || '';
            if (href.indexOf('tel:') === 0) {
              window.trackTelephoneConversion();
            } else if (href.indexOf('https://wa.me/') === 0 || href.indexOf('http://wa.me/') === 0) {
              window.trackWhatsAppConversion();
            }
          });
        `}
      </Script>
    </>
  );
}
