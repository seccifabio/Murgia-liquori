"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "murgia-consent-given";

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (consent) {
        try {
          const { type } = JSON.parse(consent);
          setHasConsent(type === "all");
        } catch (e) {
          setHasConsent(false);
        }
      }
    };

    // Check on mount
    checkConsent();

    // Listen for custom consent events or storage changes
    const handleConsentUpdate = () => checkConsent();
    window.addEventListener("murgia-consent-updated", handleConsentUpdate);
    window.addEventListener("storage", handleConsentUpdate);

    return () => {
      window.removeEventListener("murgia-consent-updated", handleConsentUpdate);
      window.removeEventListener("storage", handleConsentUpdate);
    };
  }, []);

  if (!gaId || !hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
