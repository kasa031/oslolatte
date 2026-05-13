import type { Dict } from '../translationLeaf.ts';
import { leaf } from '../translationLeaf.ts';

export const en: Dict = {
  common: leaf({
    bannerStrong: 'Our flag is out — we’re open right now.',
    bannerRest: 'Welcome up to Thereses gate.',
    notFoundTitle: 'Page not found',
    notFoundLead: 'The link may be outdated, or the address might be mistyped.',
    notFoundHome: 'Home (order)',
    notFoundContact: 'Contact',
    notFoundSide: 'About us',
    siteLastUpdated: 'Site content last updated: {date}.',
    footerCredit: 'Website developed by Ms.Tery.',
    themeAria: 'Colour theme (light or dark)',
    themeLight: 'Light mode',
    themeDark: 'Dark mode',
    themeLightShort: 'L',
    themeDarkShort: 'D',
  }),
  skip: leaf({
    home: 'Skip to order form',
    side: 'Skip to content',
  }),
  home: leaf({
    navAria: 'More on the site',
    navOmOss: 'About us',
    heroEyebrow: 'Est. 2026 · Thereses gate · Oslo',
    heroTitle: 'Order OsloLatte or OsloKakao — from our family in Thereses gate',
    heroLead:
      'We’re a small Oslo family behind the cup: fill in the form and we’ll confirm as soon as we can. You’ll find the menu, calendar and more under the tabs — we suggest starting with ',
    heroLeadLink: 'About us',
    heroLeadEnd: '.',
    orderSr: 'Order',
    qrTitle: 'QR for Telegram ordering',
    qrCaption:
      'Scan with your phone — opens our Telegram order channel (the same channel as when you submit the form).',
    qrAlt: 'QR code that opens OsloLatte’s Telegram order channel',
    footerCopyright: '© {year} OsloLatte · Est. 2026 · ',
    footerContact: 'Contact',
    footerCalendar: 'Calendar',
    shareAria: 'Share OsloLatte’s website link (if your browser supports sharing)',
    shareLabel: 'Share OsloLatte',
    orderHowTitle: 'How to order',
    orderHow1: 'Fill in name, phone and allergies (required).',
    orderHow2:
      'Choose your drink and quantity — add your preferred pickup time in the message field if you like.',
    orderHow3:
      'Press «Send order to us» — the message goes to our internal Telegram group for orders.',
    orderHow4:
      'We’ll confirm as soon as we can. If you have questions, you’ll find us under Contact.',
    preLaunchBanner:
      'We haven’t opened yet and aren’t taking orders through the website right now. When we open and how we’ll run things, we’ll let you know in good time — the exact opening date stays private for now.',
  }),
  side: leaf({
    navAria: 'Submenu',
    omOss: 'About',
    meny: 'Menu',
    kalender: 'Calendar',
    bestill: 'Order',
    kontakt: 'Contact',
    footerTag: '© {year} OsloLatte · Est. 2026 · Family business · Oslo · Thereses gate · ',
    footerContact: 'Contact',
    footerHomeOrder: 'Order on the home page',
    panelLoading: 'Loading content…',
  }),
  panels: {
    omOss: leaf({
      title: 'About us',
      subtitle: 'An Oslo family in Thereses gate — two adults, two kids, and the cup between us.',
      p1: 'OsloLatte (Est. 2026) began here at the top of Thereses gate because we wanted a signature you won’t find on a mall shelf. We’re Oslo locals — two adults and two children — and we live where we serve: everything in your cup or glass is blended by us in our kitchen. We love tech and coffee; not to collect “authenticity” points, but because great coffee and cocoa deserve to be done properly when flavour comes first.',
      p2: 'Bislettbekken runs beneath our feet — a quiet reminder that the city was here long before us. We’re a small family business with work and daily life under one roof: room for craft and for the city’s pulse around us — without letting that come at the expense of what happens in our kitchen. The recipe is ours because it’s the heart of what we do — not a prop. We don’t publish the full ingredient list for everyone to copy; what you get instead is steam from the kettle, aroma before you lift the cup, and a signature you can carry into the street.',
      p3: 'We dedicate OsloLatte to our sweet, gentle Maia — a boxer girl who was our family’s firstborn in every way that matters. She died five years ago, but she lives on with us. She was dark brindle, like a beautiful cup with something good inside.',
      gateAlt: 'Thereses gate in Oslo — street scene where OsloLatte is based',
      gateCaption: 'Thereses gate — where we live and serve, at the top of the street.',
      maiaAlt: 'Maia — our family boxer, the dedication behind OsloLatte',
      slideshowAria: 'Photos from Thereses gate',
      slideAlt: 'Image {current} of {total} — Thereses gate',
      slideshowPrev: 'Previous image',
      slideshowNext: 'Next image',
      slideshowDots: 'Choose image',
      slideshowHint:
        'Use the arrows, keyboard (← → Home End), or dots to change photos — one at a time.',
      tipBefore: 'Ready to order? ',
      tipHome: 'Go to the home page',
      tipMid: ' or ',
      tipOrder: 'order here',
      tipEnd: '.',
    }),
    meny: leaf({
      loading: 'Loading menu …',
      mastheadEyebrow: 'Thereses gate · Oslo · Est. 2026',
      mastheadTagline: 'Signature coffee & cocoa — warm in the cup, chilled in the glass',
      logoAlt: 'OsloLatte — coffee and cocoa from Bolteløkka',
      logoRibbon: 'Coffee · Cocoa · Bolteløkka',
      title: 'Menu',
      sloganLine: 'Butter in my brain',
      sloganSub: 'Signature · Thereses gate',
      intro:
        'At the top of Thereses gate in Bolteløkka — a few minutes from central Oslo, in a neighbourhood known for cafés, small shops and everyday street life — we make OsloLatte and OsloKakao in our own kitchen. OsloLatte is signature coffee with body, warm spice and a finish that stays with you. OsloKakao is rich, chocolate-forward cocoa, full-flavoured and easy to share with children. Winter or summer: the same quality and ingredients, served at a different temperature.',
      winterH3: 'Winter · steam, glow & silky body',
      summerH3: 'Summer · same flavour, melting cold on ice',
      latteWinterName: 'OsloLatte',
      latteWinterBadge: 'Warm signature · full & aromatic',
      latteWinterDesc:
        'OsloLatte unfolds in waves: first the steam — pure comfort — then the signature blend lands with depth and a sweetness that stays on the tongue. It’s rich without being heavy, aromatic in that fresh-brew way that reminds you of butter melting somewhere nearby. Cinnamon and cardamom wrap around the cup like a blanket; a careful touch of sugar ties it together without tipping into “dessert sweet”. This is the cup that parks itself in your mind.',
      latteWinterComposeLabel: 'What builds the flavour',
      latteWinterCompose: 'Coffee · milk · cream · butter · cinnamon · cardamom · sugar',
      kakaoWinterName: 'OsloKakao',
      kakaoWinterBadge: 'No coffee · cocoa powder leads',
      kakaoWinterDesc:
        'No espresso here — just chocolate powder carrying the whole story: deep, round, a little indulgent. We build texture with cream and butter until it feels almost unfairly silky, while cinnamon and cardamom lift it beyond “just sweet”. A whisper of sugar keeps kids hooked and adults lingering over the glass. Low on caffeine, high on cosiness.',
      kakaoWinterComposeLabel: 'What builds the flavour',
      kakaoWinterCompose:
        'Chocolate powder · hot water · cream · butter · cinnamon · cardamom · sugar — no coffee in the cup',
      latteSummerName: 'OsloLatte iced',
      latteSummerBadge: 'Iced signature · Thereses gate in summer light',
      latteSummerDesc:
        'Same heart as the warm classic — just chilled and poured over ice that cracks softly in the glass. You still get that full body and spice dancing cold and clear, perfect when the Oslo summer sun is high and you want something that feels substantial in your hand. Long aromatic finish as the cubes melt and the glass begins to frost.',
      latteSummerComposeLabel: 'What builds the flavour',
      latteSummerCompose: 'Coffee · milk · cream · butter · cinnamon · cardamom · sugar · ice',
      kakaoSummerName: 'OsloKakao iced',
      kakaoSummerBadge: 'Summer-soft · playful on ice',
      kakaoSummerDesc:
        'Chocolate powder meets summer ice that chatters against the glass — still family-friendly. Cream and butter give the silky body that lifts us above “cold chocolate milk”, while the spices turn every sip into a little escape from the heat. Steps, park bench or sofa — it travels.',
      kakaoSummerComposeLabel: 'What builds the flavour',
      kakaoSummerCompose:
        'Chocolate powder · cold water · cream · butter · cinnamon · cardamom · sugar · ice — no coffee in the glass',
      capWinter: 'Winter — let it steam before you sip',
      capSummer: 'Summer — same dream, new temperature',
      allergyH3: 'Allergies & safety',
      allergyLead:
        'Always tell us about intolerances and allergies when you order. Our signature drinks are dairy-based — below are allergens we often need to consider (not a full ingredient declaration, but a basis for a safe conversation).',
      allergyChipsLabel: 'Allergens to be aware of',
      allergyChip1: 'Lactose',
      allergyChip2: 'Milk protein',
      allergyChip3: 'Soya (may be present as traces)',
      allergyTraceNote:
        'Traces of other allergens from our supply chain cannot always be ruled out. For strict elimination needs or anaphylaxis — contact us before ordering.',
      allergyAction:
        'Enter allergies and dietary needs in your order. Then we know you’ve read this and can reply specifically about what works for you.',
      allergyP2:
        'The full formulation is part of our signature and isn’t published on the website. We’re available for a clear, honest conversation about what matters to you.',
      imgWinterAlt: 'Winter menu — OsloLatte and OsloKakao',
      imgSummerAlt: 'Summer menu — OsloLatte and OsloKakao',
      flipHint: 'Tap the menu card to switch between the winter and summer versions.',
      flipAriaWinter: 'Menu card showing winter. Activate to flip to summer.',
      flipAriaSummer: 'Menu card showing summer. Activate to flip to winter.',
    }),
    priser: leaf({
      title: 'Prices',
      intro: 'When you order, we confirm the total amount before payment.',
      imgAlt:
        'Price list: OsloLatte and OsloKakao, warm and iced — 40 kroner per drink. Text and figures as on the printed card.',
      latte: 'OsloLatte',
      kakao: 'OsloKakao',
      latteIce: 'OsloLatte iced',
      kakaoIce: 'OsloKakao iced',
      price: '40 kr',
    }),
    kalender: leaf({
      title: 'Opening hours & calendar',
      p1: 'When we’re open, you’ll see it: a flag in the window facing Thereses gate means your cup is ready. If you still can’t spot us, we keep the calendar below updated — so you don’t have to guess whether we’re around.',
      p1PreLaunch:
        'We’re not open to guests yet. The calendar below shows every day as closed for now — we’ll update it once we have set hours or special opening days.',
      p2Before: 'You’ll find us at the top of ',
      p2Street: 'Thereses gate',
      p2After: '. When the flag is flying, you’re warmly welcome to come up or step inside.',
    }),
    bestill: leaf({
      title: 'Order',
      p1: 'Your order comes straight to us: say what you’d like, roughly when you want to pick up, and add allergies or questions. Only our family replies — we’ll get back to you as quickly as we can.',
      twoWaysTitle: 'Two ways to order',
      option1Title: 'Use the form',
      option1Body:
        'Fill in the form on the left and add your mobile number. It helps if you’ve installed the Telegram app so we can keep the conversation there after your order is sent.',
      option2Title: 'Telegram with QR',
      option2Body:
        'Scan the QR code on the right and place your order directly in our Telegram ordering channel (the same channel as the form).',
    }),
    kontakt: leaf({
      title: 'Contact',
      intro:
        'Questions before you order, or just want to say hello? Reach us with a tap or a call.',
      email: 'Email:',
      phone: 'Phone:',
      whatsapp: 'WhatsApp:',
      whatsappChat: 'Open WhatsApp chat',
      privacyH3: 'Privacy',
      privacyP1:
        'When you use the order form, we only store what you send — name, contact details, allergies and message — to confirm your order and serve you safely. The same details are sent as a notification to our internal Telegram group for operations. We keep the details only as long as needed to fulfil the order and any brief follow-up.',
      privacyP2:
        'We don’t use the information for anything else. To see what we’ve stored, or to ask us to delete your details, use the same email or phone as above.',
      privacyCookies:
        'Cookies: we don’t use analytics or marketing cookies on this site — including Google Analytics or similar tracking. Fonts are served from this site (no Google Fonts request). Your language choice (NO/ENG) is stored only in your browser so it’s remembered next time — no profiling.',
      faqTitle: 'Quick answers (FAQ)',
      faq1q: 'Allergies and safe service?',
      faq1a:
        'Always list allergies and dietary needs in the order form. We read them before we confirm — if anything is unclear, we’ll call rather than guess.',
      faq2q: 'How do we pay?',
      faq2a:
        'We agree the amount once your order is confirmed. You’ll find Vipps under Contact when it’s configured; otherwise we keep it simple manually.',
      faq3q: 'Can we cancel?',
      faq3a:
        'Call or message as soon as plans change — we’re a small team and appreciate clear notice.',
      faq4q: 'Parking?',
      faq4a:
        'Thereses gate is central in Oslo — public transport is a good option. On-street parking varies; always check local signs.',
    }),
  },
  order: leaf({
    noteDisabled:
      'Online ordering isn’t enabled in this build (order API not configured). Call us to place an order:',
    noteTelegram:
      'When you press «Send order to us», your order is sent as a notification to our internal Telegram group.',
    notePausedPreLaunch:
      'We’re not taking orders yet (pre-opening). The form stays closed until we open. Questions? Use the Contact page or call us.',
    devNeedApiUrl: 'Dev: Fill in .env (see .env.example), then run: npm run dev:all',
    name: 'Name',
    phone: 'Phone',
    requiredMark: 'Required field',
    email: 'Email (optional)',
    drink: 'Drink',
    qty: 'Quantity',
    allergy: 'Allergies & dietary needs (see also Menu)',
    allergyPh: 'e.g. milk protein, lactose — or “no known allergies”',
    notes: 'When do you want to pick up? Anything else?',
    notesPh: 'For example day, time, or questions for us',
    pickupLabel: 'Preferred pickup window (guide only)',
    pickupNone: 'No preference — we’ll agree in messages',
    pickupWeekdayAm: 'Prefer weekday morning',
    pickupWeekdayPm: 'Prefer weekday afternoon/evening',
    pickupWeekend: 'Prefer weekend',
    pickupFlexCall: 'Flexible — please call me first',
    errorTooFast:
      'Please wait a moment before sending (the form was submitted very quickly). Try again in a second or two.',
    submit: 'Send order to us',
    drinkOslolatteVarm: 'OsloLatte — winter, warm',
    drinkOslokakaoVarm: 'OsloKakao — winter, warm',
    drinkOslolatteIs: 'OsloLatte iced — summer',
    drinkOslokakaoIs: 'OsloKakao iced — summer',
    submitting: 'Sending…',
    telegramOk: 'Sent — we’ve received your order in Telegram.',
    telegramError: 'Couldn’t send right now. Try again in a moment, or call us.',
    errorMissingEnv:
      'Telegram isn’t configured on the server (missing token or chat ID). Locally: add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to .env in the project root and run «npm run dev:all» (starts both API and site — not just «npm run dev»). On Netlify: same variable names under Environment variables + redeploy.',
    errorPreviewDisabled:
      'This preview site can’t submit orders (so we don’t hit your real Telegram group). Use the production URL or test locally with «npm run dev:all». Developers: set ORDER_PREVIEW_TELEGRAM=1 in Netlify only with a test bot and test chat.',
    errorIdempotencyConflict:
      'The same idempotency key was reused with different data. Refresh the page and submit one order at a time.',
    errorCors:
      'Your browser blocked this request (CORS). Please order from the official OsloLatte site, or call us.',
    errorTelegramRejected:
      'Telegram rejected the message. Make sure the bot is in the group and the chat ID is correct (or use the group @username).',
    errorTelegramChatNotFound:
      'Telegram can’t find this chat. Check TELEGRAM_CHAT_ID in Netlify (ID from getUpdates, or the group @username) and that the bot is a member.',
    errorTelegramBlocked:
      'Telegram blocked the send (the bot can’t post there). Re-add the bot to the group or start a private chat with the bot and try again.',
    errorTelegramKicked:
      'The bot was removed from the group. Add it back to your orders group and make sure it can post.',
    errorTelegramTooLong:
      'The message is too long for Telegram. Shorten the notes field and try again.',
    errorTelegramTimeout:
      'Telegram didn’t respond in time (network timeout). Try again shortly or call us.',
    errorPayloadTooLarge: 'The request was too large. Shorten your text and try again.',
    errorInvalidForm:
      'The server rejected something in the form. Make sure quantity is 1–50 and the allergy field is filled in.',
    errorFieldTooLong: 'One or more fields are too long. Shorten the text and try again.',
    errorNetworkDev:
      'Couldn’t reach the order API. Locally: run «npm run dev:all» so Netlify functions are up (usually port 9888) and .env has VITE_ORDER_API_URL=/api/order. Check that nothing blocks localhost.',
    errorNetworkProd:
      'Couldn’t reach the server right now. Try again in a moment or call us — it may be network or a temporary hosting issue.',
    errorServerOrNetlify:
      'The server returned an error. Confirm the Netlify function deployed and Telegram variables are set (Site → Environment variables).',
    errorApiGotHtml:
      'We didn’t get a valid API response (often HTML from the home page). Check your Netlify deploy and /api/order. Call us if you need help.',
    errorApiNotFound:
      'Order endpoint not found (404). Make sure the site runs on Netlify with functions enabled and the latest deploy finished.',
    errorApiUnexpected: 'Unexpected response from the server. Try again or call us.',
    errorRateLimit:
      'Too many orders from this connection in a short time. Please wait half a minute and try again, or call us.',
  }),
  vipps: leaf({
    title: 'Pay easily with Vipps',
    intro:
      'Once we’ve confirmed your order and you’ve agreed on the amount, you can pay here — quick and safe, with the same Vipps you use for everything else.',
    btn: 'Pay with Vipps',
    manualPrefix: 'Vipps us at:',
    manualOnly: ' — open the app and send the amount we agreed.',
    manualAlt: ' — alternative if the link above doesn’t open.',
    fineprint:
      'Payment uses a payment link or manual Vipps — simple options without a full web shop setup.',
    devHint:
      'Dev note: Set VIPPS_PAYMENT_LINK and/or VIPPS_RECIPIENT_MOBILE in src/config/vipps.ts to show the Vipps block. It stays hidden in production until configured.',
  }),
  calendar: leaf({
    prev: 'Previous month',
    next: 'Next month',
    legendOpen: 'Open (planned)',
    legendClosed: 'Closed',
    legendSpecial: 'Special day',
    hint: 'We update the calendar as soon as we know when we can welcome you. If you see our flag from the street or the window, your cup is ready — come up to Thereses gate.',
    hintPreLaunch:
      'Every day is marked closed for now. We’ll update the calendar once we have regular hours or special opening days.',
    statusOpen: 'Open (planned)',
    statusClosed: 'Closed',
    statusSpecial: 'Special',
    statusNeutral: 'Not set',
  }),
  seo: leaf({
    titleHome: 'OsloLatte — Family from Oslo',
    descHome:
      'Signature drinks from Oslo: OsloLatte and OsloKakao from Thereses gate. Order with us.',
    titleOmOss: 'About us — OsloLatte',
    descOmOss: 'Family business, story and the taste behind the cup.',
    titleMeny: 'Menu — OsloLatte',
    descMeny:
      'OsloLatte and OsloKakao — warm or iced, with or without milk. The price list is at the bottom of the menu page.',
    titleKalender: 'Opening & calendar — OsloLatte',
    descKalender: 'Planned days and special weekends in Thereses gate.',
    titleBestill: 'Order — OsloLatte',
    descBestill: 'Send your order from the website — we’ll confirm as soon as we can.',
    titleKontakt: 'Contact — OsloLatte',
    descKontakt: 'Call, email or WhatsApp — we reply as soon as we can.',
    titleNotFound: 'Page not found — OsloLatte',
    descNotFound: 'Go to the home page or contact OsloLatte.',
  }),
  errorUi: leaf({
    boundaryTitle: 'Something went wrong',
    boundaryBody:
      'We couldn’t show this page. You can try again, or go to the home page and continue from there.',
    boundaryRetry: 'Try again',
    boundaryHome: 'Home',
  }),
  lang: leaf({
    aria: 'Language',
    nb: 'Show Norwegian',
    en: 'Show English',
  }),
};
