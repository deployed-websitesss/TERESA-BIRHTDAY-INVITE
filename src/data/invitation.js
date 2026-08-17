/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 *  Every word, date and link on the invitation lives here.
 *  Anything marked  ⚠ CONFIRM  is a placeholder — replace it and the whole
 *  page updates. Nothing else needs to be touched.
 *
 *  Copy register: numerals for facts you act on (times, dates, berth,
 *  phone), words for the lyrical lines. Never both in the same breath.
 * ─────────────────────────────────────────────────────────────────────────
 */

const createWhatsAppLink = (message) =>
  `https://wa.me/971565703723?text=${encodeURIComponent(message)}`;

export const invitation = {
  meta: {
    title: "Teresa Calitis — 49, Off the Burj Al Arab",
    description:
      "An invitation to Teresa Calitis' 49th birthday, aboard a yacht off the Burj Al Arab, Dubai — Friday 4 September 2026, boarding 17:30.",
    themeColor: "#FBF8F3",
  },

  celebrant: {
    first: "Teresa",
    last: "Calitis",
    full: "Teresa Calitis",
    monogram: "TC",
  },

  hero: {
    folioLeft: "Dubai · The Invitation",
    folioRight: "No. XLIX",
    kicker: "You are cordially invited aboard",
    meta: ["Her 49th Birthday", "Friday 4 September 2026", "Dubai, off the Burj Al Arab"],
    scrollLabel: "The particulars",
    imageAlt: "", // decorative — the mood is carried by the text
  },

  // Vertical rail on the left edge (desktop only, decorative)
  folioRail: "Dubai · MMXXVI",

  // Copy shown on the gatefold overture (never hardcoded in the component)
  envelope: {
    eyebrow: "You are cordially invited aboard",
    addressee: "To our cherished guest",
    lockup: "Birthday Invitation",
    occasion: "Her 49th Birthday · A Night on the Gulf",
    date: "Friday 4 September 2026 · Dubai",
    action: "Tap to open",
    continueAction: "Tap to enter",
  },

  details: {
    index: "I",
    eyebrow: "The Particulars",
    titleTop: "One night,",
    titleEm: "one horizon",
    intro:
      "We slip out of Dubai Harbour at dusk, turn south past the Burj Al Arab, and hold there while the city lights come up. 40 places aboard, each one held by name.",
    entries: [
      {
        term: "The Date",
        value: "Friday 4 September 2026",
        note: "Sunset falls at 18:47 — we intend to be on the water for it.",
      },
      {
        term: "Boarding",
        value: "17:30",
        note: "We cast off at 18:00 sharp. The tender does not wait.",
      },
      {
        term: "The Marina",
        value: "Berth 00, Dubai Harbour Marina", // ⚠ CONFIRM berth
        note: "Al Sufouh, Dubai · Valet at the marina gate",
      },
      {
        term: "Attire",
        value: "All White",
        note: "Resort formal, in the old manner. Soft soles for the deck — heels stay ashore.",
      },
    ],
    figureAlt:
      "Polished brass cleat and coiled line on the teak deck of a yacht, the Dubai skyline burning gold behind it.",
    figureCaption: "Dubai Harbour, 18:12",

    order: {
      title: "Order of the Evening",
      lines: [
        { time: "17:30", event: "Boarding at Berth 00" },
        { time: "18:00", event: "We cast off for the Burj" },
        { time: "19:30", event: "Dinner served on the aft deck" },
        { time: "21:00", event: "49 candles, and the city behind them" },
        { time: "22:30", event: "We return alongside" },
      ],
    },

    arrival: {
      title: "Arrival & Parking",
      body: "Enter at the Dubai Harbour marina gate off King Salman Bin Abdulaziz Al Saud Street; valet takes the car there. Berth 00 is a 4 minute walk along the western pontoon. Taxis and Careem drop at the same gate — say Dubai Harbour Yacht Club.", // ⚠ CONFIRM
    },
  },

  quote: {
    text: "49 years, and the tide has never once run against her.",
    attribution: "The hosts",
  },

  countdown: {
    eyebrow: "The Waiting",
    titleTop: "We cast off in",
    // Boarding, 17:30 Gulf Standard Time (UTC+4)
    target: "2026-09-04T17:30:00+04:00",
    note: "Counting down to boarding at Berth 00 — Friday 4 September 2026, 17:30 Dubai time.",
    units: [
      { key: "days", label: "Days" },
      { key: "hours", label: "Hours" },
      { key: "minutes", label: "Minutes" },
      { key: "seconds", label: "Seconds" },
    ],
    live: "Tonight — the gangway is down",
    past: "She sailed. Thank you for being aboard.",
  },

  rsvp: {
    index: "II",
    eyebrow: "Répondez s’il vous plaît",
    titleTop: "Kindly reply by",
    titleEm: "25 August 2026",
    body: "There are 40 places aboard and they are held strictly by name. Confirm for yourself and one guest so the manifest may close in good time.",
primary: {
  label: "Accept with pleasure",
  href: createWhatsAppLink(`Hello,

I am delighted to accept the invitation to Teresa Calitis’ 49th birthday celebration on Friday, 4 September 2026. I will be there for boarding at 17:30.

Thank you for having me.`),
},
    secondary: {
      label: "Send regrets",
      href: "https://wa.me/971565703723?text=Hello%2C%20I%20am%20unable%20to%20attend%20Teresa%20Calitis%E2%80%99%2049th%20birthday%20celebration%20on%20Friday%2C%204%20September%202026.%20Thank%20you%20for%20thinking%20of%20me.",
    },
    contacts: [
      { term: "By WhatsApp", value: "+971 56 570 3723", href: "https://wa.me/971565703723" },
      { term: "By telephone", value: "+971 56 570 3723", href: "tel:+971565703723" },
    ],
    note: "Be at Berth 00 no later than 17:15 — the gangway comes up at 17:45.",
  },

  footer: {
    lines: ["In honour of Teresa Calitis", "Friday 4 September 2026", "Dubai · off the Burj Al Arab"],
    closing: "All white · By invitation only",
  },
};

export default invitation;
