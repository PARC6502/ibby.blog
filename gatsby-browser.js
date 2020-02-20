// function nfogixAnalytics() {
//   console.log("analytics...")
//   const _paq = window._paq || []
//   _paq.push(['trackPageView'])
//   _paq.push(['enableLinkTracking'])
  
//   let u = "//nfogix.com/";
//   _paq.push(['setTrackerUrl', u + 'api/track']);
//   _paq.push(['setSiteId', '1dac0bd9-9a0b-45d4-900b-89429722b19f']);
//   let d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
//   g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u + 'js/nfogix.min.js'; s.parentNode.insertBefore(g, s);
// }

function GoatCounter({ path = "https://ibby.blog", referrer = '' }) {
  // Don't track pages fetched with the browser's prefetch algorithm.
  // See https://github.com/usefathom/fathom/issues/13
  if ('visibilityState' in document && document.visibilityState === 'prerender')
    return;
  
  // Don't track private networks.
  if (location.hostname.match(/(localhost$|^127\.|^10\.|^172\.16\.|^192\.168\.)/))
      return;
      
  
  let url = new URL("https://ibbydotblog.goatcounter.com/count")
  const { title } = document
  const size = [window.screen.width, window.screen.height, (window.devicePixelRatio || 1)]
  if (referrer === '' && document.referrer) referrer = document.referrer
  
  url.search = new URLSearchParams({ 
    p: path, 
    t: title, 
    r: referrer,
    s: size, 
  })
  fetch(url)
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
  const path = location ? location.pathname + location.search + location.hash : undefined
  const referrer = prevLocation ? prevLocation.pathname + prevLocation.search + prevLocation.hash : undefined
  setTimeout(() => GoatCounter({path, referrer}), 32)
}
