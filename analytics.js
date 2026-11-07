/* ==========================================================================
   Google Analytics 4 (property noororientalrugs.com, ID G-X26TYP7R4L)
   Loaded on every public page after the gtag.js library. Besides page views,
   it records the actions that are real leads:
     - generate_lead       contact form sent (fired from app.js on success)
     - click_to_call       a tel: link tapped
     - click_to_email      a mailto: link clicked
   Mark these three as key events in GA: Admin > Data display > Events.
   ========================================================================== */
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-X26TYP7R4L');

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!link) return;
    const href = link.getAttribute('href');
    const isPhone = href.startsWith('tel:');
    gtag('event', isPhone ? 'click_to_call' : 'click_to_email', {
        link_url: href,
        link_text: link.textContent.trim().slice(0, 100),
        page_location: window.location.href
    });
});
