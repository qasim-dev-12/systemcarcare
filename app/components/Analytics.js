"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-HFQ1XCTXM3";
const ADS_ID = "AW-10827284217";
const WHATSAPP_CONVERSION_LABEL = "giuRCO7o17EdEPn97Koo";
const TEL_CONVERSION_LABEL = "3YNnCKDc17EdEPn97Koo";

export default function Analytics() {
  return (
    <>
      {/* strategy="beforeInteractive" is required (and only valid in the root
          layout) to get Next.js to inject these into <head> ahead of hydration,
          matching Google's "paste in every page's <head>" install instructions. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="ga-init" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
          gtag('config', '${ADS_ID}');
        `}
      </Script>
      <Script id="ga-conversions" strategy="afterInteractive">
        {`
          (function () {
            // Guards against the listener being attached twice (e.g. React
            // fast-refresh in dev) so one click never fires two conversions.
            if (window.__eaConversionTrackingInit) return;
            window.__eaConversionTrackingInit = true;

            function fireConversion(label) {
              if (typeof window.gtag !== 'function') return;
              window.gtag('event', 'conversion', { send_to: '${ADS_ID}/' + label });
            }

            function isWhatsAppHref(href) {
              return /^(?:https?:)?\\/\\/(?:www\\.)?(?:wa\\.me|api\\.whatsapp\\.com)\\//i.test(href);
            }

            document.addEventListener('click', function (e) {
              var link = e.target.closest('a[href]');
              if (!link) return;
              var href = link.getAttribute('href') || '';
              if (href.indexOf('tel:') === 0) {
                fireConversion('${TEL_CONVERSION_LABEL}');
              } else if (isWhatsAppHref(href)) {
                fireConversion('${WHATSAPP_CONVERSION_LABEL}');
              }
            });
          })();
        `}
      </Script>
    </>
  );
}
