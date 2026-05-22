import posthog from 'posthog-js'

const apiKey = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const apiHost = import.meta.env.VITE_POSTHOG_HOST as string | undefined

if (apiKey) {
  posthog.init(apiKey, {
    api_host: apiHost || 'https://us.i.posthog.com',
    // 'always' creates person profiles for anonymous users too, so we can
    // track drop-off by person across the experiment funnel.
    // Note: this may increase PostHog bill vs 'identified_only'.
    person_profiles: 'always',
    capture_pageview: false, // we fire these manually on step changes
  })

  // Identity bridging: when this app runs inside an iframe on WordPress,
  // the parent page passes its PostHog distinct_id as ?ph_id=...
  // so we can link the WordPress session → experiment session → app session.
  const phId = new URLSearchParams(window.location.search).get('ph_id')
  if (phId) {
    posthog.identify(phId)
  }
}

export default posthog
