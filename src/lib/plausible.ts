import { init, track } from '@plausible-analytics/tracker';

const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const apiHost = import.meta.env.VITE_PLAUSIBLE_API_HOST;

interface PlausibleTracker {
  trackPageview: (options?: any) => void;
  trackEvent: (eventName: string, options?: any) => void;
}

let tracker: PlausibleTracker;

if (domain) {
  try {
    const endpoint = apiHost 
      ? (apiHost.endsWith('/api/event') ? apiHost : `${apiHost}/api/event`)
      : undefined;

    init({
      domain,
      endpoint,
      autoCapturePageviews: true, // Automatically captures pageviews
    });
    
    tracker = {
      trackPageview: (opts) => track('pageview', opts),
      trackEvent: (name, opts) => track(name, opts),
    };
    
    console.log(`[Plausible] Initialized successfully for domain: ${domain}`);
  } catch (err) {
    console.error('[Plausible] Failed to initialize tracker:', err);
    tracker = createMockTracker();
  }
} else {
  // If no domain is configured, fall back to mock so that the app runs without error
  tracker = createMockTracker();
}

function createMockTracker(): PlausibleTracker {
  return {
    trackPageview: (opts) => {
      if (import.meta.env.DEV) {
        console.log('[Plausible Mock] Pageview tracked:', opts);
      }
    },
    trackEvent: (name, opts) => {
      if (import.meta.env.DEV) {
        console.log(`[Plausible Mock] Event tracked: "${name}"`, opts);
      }
    },
  };
}

export default tracker;
