export type Locale = 'nb' | 'en';

type Dict = Record<string, unknown>;

function leaf(strings: Record<string, string>): Dict {
  return strings as unknown as Dict;
}

/** Nested nb/en — samme struktur */
export const translations: Record<Locale, Dict> = {
  nb: {
    common: leaf({
      bannerStrong: 'Flagget er ute — vi har åpent akkurat nå.',
      bannerRest: 'Velkommen opp i Thereses gate.',
    }),
    skip: leaf({
      home: 'Hopp til bestilling',
      side: 'Hopp til innhold',
    }),
    home: leaf({
      navAria: 'Mer på nettsiden',
      navOmOss: 'Om oss',
      heroEyebrow: 'Est. 2026 · Thereses gate · Oslo',
      heroTitle: 'Bestill OsloLatte eller OsloKakao — fra oss i Thereses gate',
      heroLead:
        'Vi er en liten Oslo-familie bak koppen: fyll ut skjemaet, så bekrefter vi så fort vi kan. Meny, kalender og mer ligger i fanene — les gjerne ',
      heroLeadLink: 'Om oss',
      heroLeadEnd: '.',
      orderSr: 'Bestilling',
      qrTitle: 'QR til nettsiden',
      qrCaption: 'Skann med telefonen — du kommer rett til bestilling.',
      qrAlt: 'QR-kode til OsloLatte-bestilling på nett',
      footerCopyright: '© {year} OsloLatte · Est. 2026 · ',
      footerContact: 'Kontakt',
      footerCalendar: 'Kalender',
    }),
    side: leaf({
      navAria: 'Undermeny',
      omOss: 'Om oss',
      meny: 'Meny',
      kalender: 'Kalender',
      bestill: 'Bestill',
      kontakt: 'Kontakt',
      footerTag:
        '© {year} OsloLatte · Est. 2026 · Familiebedrift · Oslo · Thereses gate · ',
      footerContact: 'Kontakt',
      footerHomeOrder: 'Bestill på forsiden',
    }),
    panels: {
      omOss: leaf({
        title: 'Om oss',
        subtitle: 'Oslo-familie i Thereses gate — to voksne, to barn, og koppen mellom oss.',
        p1:
          'OsloLatte (Est. 2026) ble til her oppe i Thereses gate fordi vi ville ha en signatur som ikke står på kjøpesenterhylla. Vi er fra Oslo — to voksne og to barn — og bor der vi serverer: alt som havner i koppen eller glasset, blander vi selv. Vi elsker IT og kaffe; ikke for å score på «autentisitet», men fordi god kaffe og kakao fortjener å bli gjort skikkelig når smaken ikke skal spare på noe.',
        p2:
          'Under beina våre renner Bislettbekken — en stille påminnelse om at byen har ligget her lenge før oss. Ellers treffer du oss på sykkel og joggesko, og vi sier sjelden nei til en ordentlig fest. Skuespill, musikk og kunst henger med i bagasjen. Oppskriften er vår fordi den er selve hjertet i det vi gjør — ikke som rekvisitt. Den fulle ingredienslista legger vi ikke ut i vinduet; det du får i stedet er damp fra kjelen, lukt som treffer før du løfter koppen, og en signatur du kan ta med deg ut i gatebildet.',
        p3:
          'Vi dedikerer OsloLatte til vår snille, gode Maia — en boxerjente som var familiens førstefødte. Hun døde for fem år siden, men lever fortsatt videre hos oss. Hun var mørk brindle, som en herlig kopp med noe godt i.',
        gateAlt: 'Thereses gate i Oslo — gatemiljø der OsloLatte holder til',
        gateCaption: 'Thereses gate — der vi bor og serverer, øverst i gaten.',
        tipBefore: 'Klar til å bestille? ',
        tipHome: 'Gå til forsiden',
        tipMid: ' eller til ',
        tipOrder: 'bestilling her',
        tipEnd: '.',
      }),
      meny: leaf({
        mastheadEyebrow: 'Thereses gate · Oslo · Est. 2026',
        mastheadTagline: 'Signaturkaffe & kakao — varmt i koppen og kjølt i glasset',
        logoAlt: 'OsloLatte — kaffe og kakao fra Bolteløkka',
        logoRibbon: 'Kaffe · Kakao · Bolteløkka',
        title: 'Meny',
        sloganLine: 'Butter in my brain',
        sloganSub: 'Rennende signatur · Thereses gate',
        intro:
          'Fra kjøkkenet vårt i Thereses gate kommer koppen som dufter før du rekker å løfte den: aromatisk, fyldig og lagvis som favorittpladen din. OsloLatte er signaturkaffe med kropp og ettersmak som blir værende; OsloKakao er mørk sjokoladeglede der sjokoladepulveret er helten — ikke kaffe i glasset. Om det er damp eller isbit som topper, er DNA-et det samme: Bolteløkka-magi du vil ha på tunga lenge etter siste slurk.',
        winterH3: 'Vinter · damp, glød og silkemyk kropp',
        summerH3: 'Sommer · samme smak, sunklende kald på is',
        latteWinterName: 'OsloLatte',
        latteWinterBadge: 'Varm signatur · fyldig & aromatisk',
        latteWinterDesc:
          'OsloLatte åpner seg som tre lag på én gang: først kommer dampen — ren trøst — så treffer signaturblandingen med dybde og sødme som holder seg på tunga. Det er fyldig uten å bli tungt; aromatisk på den måten som minner om nytraktet kaffe i et kjøkken der noen nettopp har smeltet smør. Kanel og kardemomme snurrer rundt som et teppe rundt koppen; et pent snev av sukker binder alt uten å gjøre det «søtt og pusete». Dette er koppen du tar med deg i hodet.',
        latteWinterComposeLabel: 'Smakens byggesteiner',
        latteWinterCompose: 'Kaffe · melk · fløte · smør · kanel · kardemomme · sukker',
        kakaoWinterName: 'OsloKakao',
        kakaoWinterBadge: 'Uten kaffe · sjokoladepulver i førersetet',
        kakaoWinterDesc:
          'Her er ingen kaffe — bare sjokoladepulver som bærer hele historien: dyp, rund og litt rampete. Vi bygger teksturen med fløte og smør til noe som føles silkemykt og nesten «forbudt godt», mens kanel og kardemomme løfter det opp fra bare «søtt» til ordentlig voksen kose. Et lite sting av sukker gjør at barna elsker den og de voksne blir stående med glasset litt lenger enn de tenkte. Mild i koffein, rik i liv.',
        kakaoWinterComposeLabel: 'Smakens byggesteiner',
        kakaoWinterCompose:
          'Sjokoladepulver · varmt vann · fløte · smør · kanel · kardemomme · sukker — ikke kaffe i koppen',
        latteSummerName: 'OsloLatte is',
        latteSummerBadge: 'Iskald signatur · Thereses gate i sommerlys',
        latteSummerDesc:
          'Samme hjerte som den varme klassikeren — bare senket i temperatur og servert på knitrende is. Du får fortsatt den fyldige karakteren og krydderet som danser kaldt og klart, perfekt når Oslo-sola steiker og du vil ha noe som føles «substantielt» i hånda. Lang, aromatisk finish mens isen smelter og koppen begynner å dugge.',
        latteSummerComposeLabel: 'Smakens byggesteiner',
        latteSummerCompose:
          'Kaffe · melk · fløte · smør · kanel · kardemomme · sukker · isbiter',
        kakaoSummerName: 'OsloKakao is',
        kakaoSummerBadge: 'Sommer-mild · leken på is',
        kakaoSummerDesc:
          'Sjokoladepulveret får sommerselskap av is som småknitrer mot glasset — fortsatt uten kaffe, fortsatt familievennlig. Fløte og smør gir den silkemyke kroppen som skiller oss fra «bare kald sjokolademelk», mens krydderne gjør hver slurk til en liten pause fra heten. Ta den med på trappen, i parken eller hjem til sofaen.',
        kakaoSummerComposeLabel: 'Smakens byggesteiner',
        kakaoSummerCompose:
          'Sjokoladepulver · kaldt vann · fløte · smør · kanel · kardemomme · sukker · isbiter — ikke kaffe i glasset',
        capWinter: 'Vinter — la koppen ryke litt før du drikker',
        capSummer: 'Sommer — samme drøm, ny temperatur',
        allergyH3: 'Allergier og trygghet',
        allergyLead:
          'Oppgi alltid intoleranser og allergier ved bestilling. Signaturdrikkene våre bygger på meieriprodukter — under ser du allergener vi ofte må ta hensyn til (ikke en full ingrediensliste, men utgangspunkt for trygg dialog).',
        allergyChipsLabel: 'Relevante allergener',
        allergyChip1: 'Laktose',
        allergyChip2: 'Melkeprotein',
        allergyChip3: 'Soja (kan forekomme som spor)',
        allergyTraceNote:
          'Spor av andre allergener fra leverandørkjeden kan ikke alltid utelukkes. Ved behov for streng eliminasjonsdiett eller anafylaksi — ta kontakt før du bestiller.',
        allergyAction:
          'Skriv inn allergier og mathensyn i bestillingen. Da vet vi at du har lest dette, og vi kan svare konkret på hva som passer.',
        allergyP2:
          'Full formuleringsliste er en del av vår signatur og vises ikke på nettsiden. Vi er tilgjengelige for en ryddig og ærlig dialog om det som er viktig for deg.',
        imgWinterAlt: 'Vintermeny OsloLatte',
        imgSummerAlt: 'Sommermeny OsloLatte',
        flipHint: 'Trykk på menyen for å snu den — som en papirlapp i vinden. Andre siden er den andre årstiden.',
        flipAriaWinter:
          'Menykort med vintermeny. Aktiver for å snu og vise sommermeny.',
        flipAriaSummer:
          'Menykort med sommermeny. Aktiver for å snu og vise vintermeny.',
      }),
      kalender: leaf({
        title: 'Åpent og kalender',
        p1:
          'Vi er helgevante og synlige når vi har åpent: et flagg i vinduet og ut mot Thereses gate er tegnet på at koppen er klar. Får du ikke øye på oss likevel, holder vi kalenderen under oppdatert — så du slipper å lure på om døren er åpen.',
        p2Before: 'Du finner oss øverst i ',
        p2Street: 'Thereses gate',
        p2After:
          '. Når flagget vaier, er du hjertelig velkommen opp eller inn.',
      }),
      bestill: leaf({
        title: 'Bestilling',
        p1:
          'Her går bestillingen rett til oss — skriv hva du vil ha, omtrent når du vil hente, og legg ved allergier eller spørsmål. Det er bare oss i familien som svarer, men vi gjør det så raskt vi kan.',
        tip: 'Tipset: den raskeste veien er alltid ',
        tipHome: 'forsiden',
        tipEnd: ', der skjemaet står først.',
      }),
      kontakt: leaf({
        title: 'Kontakt',
        intro:
          'Har du spørsmål før du bestiller, eller vil du bare si hei? Vi er ett tastetrykk eller et ring unna.',
        email: 'E-post:',
        phone: 'Telefon:',
        whatsapp: 'WhatsApp:',
        whatsappChat: 'Åpne WhatsApp-chat',
        privacyH3: 'Personvern',
        privacyP1:
          'Når du bruker bestillingsskjemaet, lagrer vi bare det du selv sender inn — navn, kontakt, allergier og melding — for å kunne bekrefte ordren og ivareta trygg servering.',
        privacyP2:
          'Vi bruker ikke informasjonen til annet enn det. Vil du vite hva vi har lagret, eller vil du at vi sletter det, tar du kontakt på samme e-post eller telefon som over.',
        privacyCookies:
          'Informasjonskapsler: vi bruker ikke analyseverktøy eller markedsføringscookies på denne siden — heller ikke Google Analytics eller annen «tracking». Språkvalg (NO/ENG) lagres kun lokalt i nettleseren din slik at valget huskes neste gang — ingen personlig profilering.',
      }),
    },
    order: leaf({
      note:
        'Trykk på knappen under når du er klar — da åpnes e-post med alt du har fylt inn, klar til å sendes til oss. Har du ikke e-post på telefonen, kan du ringe i stedet.',
      name: 'Navn',
      phone: 'Telefon',
      email: 'E-post (valgfritt)',
      drink: 'Drikk',
      qty: 'Antall',
      allergy:
        'Allergier og mathensyn (se også under Meny)',
      allergyPh: 'F.eks. melkeprotein, laktose — eller «ingen kjente allergier»',
      notes: 'Når vil du hente? Andre ønsker?',
      notesPh: 'For eksempel dag, tidspunkt, eller spørsmål til oss',
      submit: 'Send bestilling til oss',
      hint:
        'Åpnet ikke e-post? Sjekk at du har en e-postapp, eller ring oss — vi vil gjerne ta imot bestillingen din uansett.',
      mailSubject: 'Bestilling OsloLatte — ',
      mailCustomer: 'kunde',
      mailName: 'Navn:',
      mailPhone: 'Telefon:',
      mailEmail: 'E-post:',
      mailDrink: 'Ønsket drikk:',
      mailAllergies: 'Allergier og hensyn:',
      mailAllergiesNone: '(ingen oppgitt)',
      mailMsg: 'Melding:',
      mailMsgNone: '(ingen)',
      drinkOslolatteVarm: 'OsloLatte — vinter, varm',
      drinkOslokakaoVarm: 'OsloKakao — vinter, varm (uten kaffe)',
      drinkOslolatteIs: 'OsloLatte is — sommer',
      drinkOslokakaoIs: 'OsloKakao is — sommer',
      noteTelegram:
        'Trykk send — da går bestillingen direkte til oss (Telegram). Telefon er nok til at vi kan ringe deg tilbake; e-post er valgfritt. Fungerer det ikke, bruk «Åpne e-post» under.',
      submitting: 'Sender …',
      telegramOk: 'Sendt — vi har fått beskjed.',
      telegramError:
        'Klarte ikke å sende akkurat nå. Bruk «Åpne e-post» under eller ring oss.',
      errorMissingEnv:
        'Serveren mangler Telegram-oppsett (token eller chat-id). Sjekk miljøvariabler på Netlify eller .env lokalt, og deploy på nytt etter endring.',
      errorTelegramRejected:
        'Telegram godtok ikke meldingen. Sjekk at boten er medlem av gruppa og at chat-id stemmer (eller bruk @brukernavn til gruppa).',
      errorTelegramChatNotFound:
        'Telegram finner ikke denne chatten. Sjekk TELEGRAM_CHAT_ID i Netlify (tall fra getUpdates, eller @gruppebrukernavn) og at boten ligger i gruppa.',
      errorTelegramBlocked:
        'Telegram blokkerte sending (boten har ikke tilgang). Legg boten inn i gruppa igjen, eller start en privat chat med boten og prøv på nytt.',
      errorTelegramKicked:
        'Boten er fjernet fra gruppa. Legg den inn på nytt hos «Bestillinger» og sjekk at den kan sende meldinger.',
      errorTelegramTooLong:
        'Meldingen ble for lang for Telegram. Kort ned tekst i meldingsfeltet og prøv igjen.',
      errorInvalidForm:
        'Noe i skjemaet ble avvist av serveren. Sjekk at antall er 1–50 og at allergifeltet er fylt ut.',
      errorNetwork:
        'Fikk ikke kontakt med serveren. Sjekk nett, prøv igjen, eller bruk «Åpne e-post» under.',
      errorServerOrNetlify:
        'Serveren svarte med feil. Sjekk at Netlify-funksjonen er deployet og at Telegram-variabler er satt (Site → Environment variables).',
      errorApiGotHtml:
        'Vi fikk ikke ekte svar fra bestillings-API (ofte HTML fra forsiden). Da mangler Netlify-funksjonen eller /api/order er ikke riktig deployet. Bruk «Åpne e-post» under eller ring oss.',
      errorApiNotFound:
        'Fant ikke bestillingsadressen (404). Kontroller at siden kjører på Netlify med functions, og at nyeste deploy er gjennomført.',
      errorApiUnexpected:
        'Uventet svar fra serveren. Prøv igjen, eller bruk «Åpne e-post» under.',
      openMail: 'Åpne e-post med bestillingen',
      devMailtoOnly:
        'Utviklermodus: «Send bestilling» åpner e-post fordi VITE_ORDER_API_URL ikke er satt. Legg inn i .env (se .env.example), kjør npm run order:check-env, deretter «npm run dev:netlify», eller sett variabelen på Netlify og trigger ny deploy.',
    }),
    vipps: leaf({
      title: 'Betal enkelt med Vipps',
      intro:
        'Når vi har bekreftet bestillingen og dere er enige om beløp, kan du betale her — raskt og trygt, med samme Vipps du bruker til alt annet.',
      btn: 'Betal med Vipps',
      manualPrefix: 'Vipps til oss:',
      manualOnly: ' — åpne appen og send beløpet vi har avtalt.',
      manualAlt: ' — alternativ om lenken over ikke åpner.',
      fineprint:
        'Vi bruker betalingslenke eller manuell overføring — begge er enkle måter å ta betalt uten stor nettbutikk på.',
      devHint:
        'Utviklermerknad: Legg inn VIPPS_PAYMENT_LINK og/eller VIPPS_RECIPIENT_MOBILE i src/config/vipps.ts for å vise Vipps-blokken. Den skjules i produksjon til noe er fylt inn.',
    }),
    calendar: leaf({
      prev: 'Forrige måned',
      next: 'Neste måned',
      legendOpen: 'Åpent (planlagt)',
      legendClosed: 'Stengt',
      legendSpecial: 'Spesialdag',
      hint:
        'Kalenderen oppdateres etter hvert som vi vet når vi kan ta imot dere. Ser du flagget vårt fra gaten eller vinduet, er koppen klar — kom opp i Thereses gate.',
      statusOpen: 'Åpent planlagt',
      statusClosed: 'Stengt',
      statusSpecial: 'Spesial',
      statusNeutral: 'Ikke lagt inn',
    }),
    lang: leaf({
      aria: 'Språk',
      nb: 'Vis norsk',
      en: 'Vis engelsk',
    }),
  },
  en: {
    common: leaf({
      bannerStrong: 'Our flag is out — we’re open right now.',
      bannerRest: 'Welcome up to Thereses gate.',
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
        'We’re a small Oslo family behind the cup: fill in the form and we’ll confirm as soon as we can. You’ll find the menu, calendar and more under their tabs — start with ',
      heroLeadLink: 'About us',
      heroLeadEnd: '.',
      orderSr: 'Order',
      qrTitle: 'QR to the website',
      qrCaption: 'Scan with your phone — jump straight to ordering.',
      qrAlt: 'QR code linking to OsloLatte online ordering',
      footerCopyright: '© {year} OsloLatte · Est. 2026 · ',
      footerContact: 'Contact',
      footerCalendar: 'Calendar',
    }),
    side: leaf({
      navAria: 'Submenu',
      omOss: 'About',
      meny: 'Menu',
      kalender: 'Calendar',
      bestill: 'Order',
      kontakt: 'Contact',
      footerTag:
        '© {year} OsloLatte · Est. 2026 · Family business · Oslo · Thereses gate · ',
      footerContact: 'Contact',
      footerHomeOrder: 'Order on the home page',
    }),
    panels: {
      omOss: leaf({
        title: 'About us',
        subtitle: 'An Oslo family in Thereses gate — two adults, two kids, and the cup between us.',
        p1:
          'OsloLatte (Est. 2026) began here at the top of Thereses gate because we wanted a signature you won’t find on a mall shelf. We’re Oslo locals — two adults and two children — and we live where we serve: everything in your cup or glass is blended by us in our kitchen. We love tech and coffee; not to collect “authenticity” points, but because great coffee and cocoa deserve to be done properly when flavour comes first.',
        p2:
          'Bislettbekken runs beneath our feet — a quiet reminder that the city was here long before us. You’ll find us on bikes and running shoes, and we rarely turn down a proper party. Theatre, music and art travel with us too. The recipe is ours because it’s the heart of what we do — not a prop. We don’t publish the full ingredient list for everyone to copy; what you get instead is steam from the kettle, aroma before you lift the cup, and a signature you can carry into the street.',
        p3:
          'We dedicate OsloLatte to our sweet, gentle Maia — a boxer girl who was our family’s firstborn in every way that matters. She died five years ago, but she lives on with us. She was dark brindle, like a beautiful cup with something good inside.',
        gateAlt: 'Thereses gate in Oslo — street scene where OsloLatte is based',
        gateCaption: 'Thereses gate — where we live and serve, at the top of the street.',
        tipBefore: 'Ready to order? ',
        tipHome: 'Go to the home page',
        tipMid: ' or ',
        tipOrder: 'order here',
        tipEnd: '.',
      }),
      meny: leaf({
        mastheadEyebrow: 'Thereses gate · Oslo · Est. 2026',
        mastheadTagline: 'Signature coffee & cocoa — warm in the cup, chilled in the glass',
        logoAlt: 'OsloLatte — coffee and cocoa from Bolteløkka',
        logoRibbon: 'Coffee · Cocoa · Bolteløkka',
        title: 'Menu',
        sloganLine: 'Butter in my brain',
        sloganSub: 'Pouring signature · Thereses gate',
        intro:
          'From our kitchen in Thereses gate comes the cup that hits your nose before you lift it: aromatic, full-bodied, layered like your favourite slow album. OsloLatte is signature coffee with weight and a finish that lingers; OsloKakao is dark cocoa pleasure where chocolate powder leads — no coffee in the glass. Steam or ice on top, the DNA stays the same: Bolteløkka magic you’ll still taste long after the last sip.',
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
        latteSummerCompose:
          'Coffee · milk · cream · butter · cinnamon · cardamom · sugar · ice',
        kakaoSummerName: 'OsloKakao iced',
        kakaoSummerBadge: 'Summer-soft · playful on ice',
        kakaoSummerDesc:
          'Chocolate powder meets summer ice that chatters against the glass — still no coffee, still family-friendly. Cream and butter give the silky body that lifts us above “cold chocolate milk”, while the spices turn every sip into a little escape from the heat. Steps, park bench or sofa — it travels.',
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
        imgWinterAlt: 'OsloLatte winter menu',
        imgSummerAlt: 'OsloLatte summer menu',
        flipHint:
          'Tap the menu to flip it — like paper caught in the breeze. The other side is the other season.',
        flipAriaWinter: 'Menu card showing winter. Activate to flip to summer.',
        flipAriaSummer: 'Menu card showing summer. Activate to flip to winter.',
      }),
      kalender: leaf({
        title: 'Opening hours & calendar',
        p1:
          'We’re weekend-focused and visible when we’re open: a flag in the window and facing Thereses gate means your cup is ready. If you still don’t spot us, we keep the calendar below updated — so you don’t have to guess whether the door is open.',
        p2Before: 'You’ll find us at the top of ',
        p2Street: 'Thereses gate',
        p2After: '. When the flag is flying, you’re warmly welcome up or in.',
      }),
      bestill: leaf({
        title: 'Order',
        p1:
          'Send your order straight to us — say what you’d like, roughly when you want to pick up, and add allergies or questions. It’s just us answering from Thereses gate, but we’ll reply as fast as we can.',
        tip: 'Tip: the fastest route is always the ',
        tipHome: 'home page',
        tipEnd: ', where the form comes first.',
      }),
      kontakt: leaf({
        title: 'Contact',
        intro:
          'Questions before you order, or just want to say hi? We’re one tap or one call away.',
        email: 'Email:',
        phone: 'Phone:',
        whatsapp: 'WhatsApp:',
        whatsappChat: 'Open WhatsApp chat',
        privacyH3: 'Privacy',
        privacyP1:
          'When you use the order form, we only store what you send — name, contact details, allergies and message — to confirm your order and serve you safely.',
        privacyP2:
          'We don’t use the information for anything else. To see what we’ve stored, or to ask us to delete it, use the same email or phone as above.',
        privacyCookies:
          'Cookies: we don’t use analytics or marketing cookies on this site — including Google Analytics or similar tracking. Your language choice (NO/ENG) is stored only in your browser so it’s remembered next time — no profiling.',
      }),
    },
    order: leaf({
      note:
        'When you’re ready, press the button below — your email app opens with everything filled in, ready to send. If you don’t have email on your phone, you can call us instead.',
      name: 'Name',
      phone: 'Phone',
      email: 'Email (optional)',
      drink: 'Drink',
      qty: 'Quantity',
      allergy: 'Allergies & dietary needs (see also Menu)',
      allergyPh: 'e.g. milk protein, lactose — or “no known allergies”',
      notes: 'When do you want to pick up? Anything else?',
      notesPh: 'For example day, time, or questions for us',
      submit: 'Send order to us',
      hint:
        'Email didn’t open? Make sure you have a mail app, or call us — we’re happy to take your order either way.',
      mailSubject: 'OsloLatte order — ',
      mailCustomer: 'customer',
      mailName: 'Name:',
      mailPhone: 'Phone:',
      mailEmail: 'Email:',
      mailDrink: 'Drink:',
      mailAllergies: 'Allergies & notes:',
      mailAllergiesNone: '(none given)',
      mailMsg: 'Message:',
      mailMsgNone: '(none)',
      drinkOslolatteVarm: 'OsloLatte — winter, warm',
      drinkOslokakaoVarm: 'OsloKakao — winter, warm (no coffee)',
      drinkOslolatteIs: 'OsloLatte iced — summer',
      drinkOslokakaoIs: 'OsloKakao iced — summer',
      noteTelegram:
        'Press send — your order goes straight to us (Telegram). Phone is enough for us to call you back; email is optional. If that fails, use «Open email» below.',
      submitting: 'Sending…',
      telegramOk: 'Sent — we’ve got it.',
      telegramError: 'Couldn’t send right now. Use «Open email» below or call us.',
      errorMissingEnv:
        'The server is missing Telegram configuration (token or chat ID). Check environment variables on Netlify or your local .env, then redeploy.',
      errorTelegramRejected:
        'Telegram rejected the message. Make sure the bot is in the group and the chat ID is correct (or use the group @username).',
      errorTelegramChatNotFound:
        'Telegram can’t find this chat. Check TELEGRAM_CHAT_ID in Netlify (ID from getUpdates, or the group @username) and that the bot is a member.',
      errorTelegramBlocked:
        'Telegram blocked the send (the bot can’t post there). Re-add the bot to the group or start a private chat with the bot and try again.',
      errorTelegramKicked:
        'The bot was removed from the group. Add it back to your orders group and ensure it can post.',
      errorTelegramTooLong:
        'The message is too long for Telegram. Shorten the notes field and try again.',
      errorInvalidForm:
        'The server rejected something in the form. Make sure quantity is 1–50 and the allergy field is filled in.',
      errorNetwork:
        'Couldn’t reach the server. Check your connection, try again, or use «Open email» below.',
      errorServerOrNetlify:
        'The server returned an error. Confirm the Netlify function deployed and Telegram variables are set (Site → Environment variables).',
      errorApiGotHtml:
        'We didn’t get a real API response (often HTML from the home page). The Netlify function may be missing or /api/order isn’t deployed correctly. Use «Open email» below or call us.',
      errorApiNotFound:
        'Order endpoint not found (404). Make sure the site runs on Netlify with functions enabled and the latest deploy finished.',
      errorApiUnexpected:
        'Unexpected response from the server. Try again or use «Open email» below.',
      openMail: 'Open email with your order',
      devMailtoOnly:
        'Dev mode: «Send order» opens email because VITE_ORDER_API_URL is not set. Add it to .env (see .env.example), run npm run order:check-env, then «npm run dev:netlify», or set it on Netlify and trigger a new deploy.',
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
        'We use a payment link or manual transfer — both are simple ways to get paid without running a full web shop.',
      devHint:
        'Dev note: Set VIPPS_PAYMENT_LINK and/or VIPPS_RECIPIENT_MOBILE in src/config/vipps.ts to show the Vipps block. It stays hidden in production until configured.',
    }),
    calendar: leaf({
      prev: 'Previous month',
      next: 'Next month',
      legendOpen: 'Open (planned)',
      legendClosed: 'Closed',
      legendSpecial: 'Special day',
      hint:
        'We update the calendar as soon as we know when we can welcome you. If you see our flag from the street or the window, your cup is ready — come up to Thereses gate.',
      statusOpen: 'Open (planned)',
      statusClosed: 'Closed',
      statusSpecial: 'Special',
      statusNeutral: 'Not set',
    }),
    lang: leaf({
      aria: 'Language',
      nb: 'Show Norwegian',
      en: 'Show English',
    }),
  },
};
