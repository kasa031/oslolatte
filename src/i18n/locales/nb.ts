import type { Dict } from '../translationLeaf.ts';
import { leaf } from '../translationLeaf.ts';

export const nb: Dict = {
  common: leaf({
    bannerStrong: 'Flagget er ute — vi har åpent akkurat nå.',
    bannerRest: 'Velkommen opp i Thereses gate.',
    notFoundTitle: 'Siden finnes ikke',
    notFoundLead: 'Lenken kan være utdatert, eller adressen er skrevet feil.',
    notFoundHome: 'Til forsiden (bestill)',
    notFoundContact: 'Kontakt',
    notFoundSide: 'Om oss',
    siteLastUpdated: 'Siste innholdsoppdatering på nett: {date}.',
    footerCredit: 'Nettsted utviklet av Ms.Tery.',
    themeAria: 'Fargetema (lys eller mørk)',
    themeLight: 'Lys modus',
    themeDark: 'Mørk modus',
    themeLightShort: 'L',
    themeDarkShort: 'M',
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
      'Vi er en liten Oslo-familie bak koppen: fyll ut skjemaet, så bekrefter vi så raskt vi kan. Meny, kalender og mer finner du under fanene — les gjerne ',
    heroLeadLink: 'Om oss',
    heroLeadEnd: '.',
    orderSr: 'Bestilling',
    qrTitle: 'QR til Telegram-bestilling',
    qrCaption:
      'Skann med telefonen — du åpner vår Telegram for bestilling (samme kanal som når du sender skjemaet).',
    qrAlt: 'QR-kode som åpner OsloLatte sin Telegram-bestilling',
    footerCopyright: '© {year} OsloLatte · Est. 2026 · ',
    footerContact: 'Kontakt',
    footerCalendar: 'Kalender',
    shareAria: 'Del nettadressen til OsloLatte (hvis nettleseren støtter deling)',
    shareLabel: 'Del OsloLatte',
    orderHowTitle: 'Slik bestiller du',
    orderHow1: 'Fyll inn navn, telefon og allergier (obligatorisk felt).',
    orderHow2: 'Velg drikk og antall — skriv gjerne ønsket hentetidspunkt i meldingsfeltet.',
    orderHow3:
      'Trykk «Send bestilling til oss» — beskjeden går til vår interne Telegram-gruppe for bestillinger.',
    orderHow4: 'Vi bekrefter så snart vi kan. Har du spørsmål, finner du oss under Kontakt.',
    preLaunchBanner:
      'Vi har ikke åpnet ennå og tar ikke imot bestillinger via nettsiden. Når vi åpner og hvordan, sier vi fra i god tid — selve åpningsdatoen holdes hemmelig inntil videre.',
  }),
  side: leaf({
    navAria: 'Undermeny',
    omOss: 'Om oss',
    meny: 'Meny',
    kalender: 'Kalender',
    bestill: 'Bestill',
    kontakt: 'Kontakt',
    footerTag: '© {year} OsloLatte · Est. 2026 · Familiebedrift · Oslo · Thereses gate · ',
    footerContact: 'Kontakt',
    footerHomeOrder: 'Bestill på forsiden',
    panelLoading: 'Laster innhold …',
  }),
  panels: {
    omOss: leaf({
      title: 'Om oss',
      subtitle: 'Oslo-familie i Thereses gate — to voksne, to barn, og koppen mellom oss.',
      p1: 'OsloLatte (Est. 2026) ble til her oppe i Thereses gate fordi vi ville ha en signatur som ikke står på kjøpesenterhylla. Vi er fra Oslo — to voksne og to barn — og bor der vi serverer: alt som havner i koppen eller glasset, blander vi selv. Vi elsker IT og kaffe; ikke for å score på «autentisitet», men fordi god kaffe og kakao fortjener å bli gjort skikkelig når smaken ikke skal spare på noe.',
      p2: 'Under beina våre renner Bislettbekken — en stille påminnelse om at byen har ligget her lenge før oss. Vi er en liten familiebedrift med arbeid og hverdag under samme tak: rom for håndverk og for det pulserende livet rundt oss — uten at det går på bekostning av det som skjer på kjøkkenet. Oppskriften er vår fordi den er selve hjertet i det vi gjør — ikke som rekvisitt. Den fulle ingredienslista legger vi ikke ut i vinduet; det du får i stedet er damp fra kjelen, lukt som treffer før du løfter koppen, og en signatur du kan ta med deg ut i gatebildet.',
      p3: 'Vi dedikerer OsloLatte til vår snille, gode Maia — en boxerjente som var familiens førstefødte. Hun døde for fem år siden, men lever fortsatt videre hos oss. Hun var mørk brindle, som en herlig kopp med noe godt i.',
      gateAlt: 'Thereses gate i Oslo — gatemiljø der OsloLatte holder til',
      gateCaption: 'Thereses gate — der vi bor og serverer, øverst i gaten.',
      maiaAlt: 'Maia — familiens boxer, dedikasjonen bak OsloLatte',
      slideshowAria: 'Bilder fra Thereses gate',
      slideAlt: 'Bilde {current} av {total} — Thereses gate',
      slideshowPrev: 'Forrige bilde',
      slideshowNext: 'Neste bilde',
      slideshowDots: 'Velg bilde',
      slideshowHint: 'Pilene, tastatur (← → Home End) eller prikkene bytter bilde — ett av gangen.',
      tipBefore: 'Klar til å bestille? ',
      tipHome: 'Gå til forsiden',
      tipMid: ' eller til ',
      tipOrder: 'bestilling her',
      tipEnd: '.',
    }),
    meny: leaf({
      loading: 'Laster meny …',
      mastheadEyebrow: 'Thereses gate · Oslo · Est. 2026',
      mastheadTagline: 'Signaturkaffe & kakao — varmt i koppen og kjølt i glasset',
      logoAlt: 'OsloLatte — kaffe og kakao fra Bolteløkka',
      logoRibbon: 'Kaffe · Kakao · Bolteløkka',
      title: 'Meny',
      sloganLine: 'Butter in my brain',
      sloganSub: 'Signatur · Thereses gate',
      intro:
        'Øverst i Thereses gate på Bolteløkka — få minutter fra sentrum, i et nabolag kjent for kafeer, små forretninger og hverdagsliv — lager vi OsloLatte og OsloKakao på eget kjøkken. OsloLatte er signaturkaffe med fylde, varme krydder og ettersmak som sitter. OsloKakao er mørk, sjokoladeledd kakao, like tydelig i smak og trygg å dele med barn. Vinter eller sommer: samme kvalitet og råvarer, bare ulik temperatur.',
      winterH3: 'Vinter · damp, glød og silkemyk kropp',
      summerH3: 'Sommer · samme smak, kjølig og klar på is',
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
      latteSummerCompose: 'Kaffe · melk · fløte · smør · kanel · kardemomme · sukker · isbiter',
      kakaoSummerName: 'OsloKakao is',
      kakaoSummerBadge: 'Sommer-mild · leken på is',
      kakaoSummerDesc:
        'Sjokoladepulveret får sommerselskap av is som småknitrer mot glasset — fortsatt familievennlig. Fløte og smør gir den silkemyke kroppen som skiller oss fra «bare kald sjokolademelk», mens krydderne gjør hver slurk til en liten pause fra heten. Ta den med på trappen, i parken eller hjem til sofaen.',
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
      imgWinterAlt: 'Vintermeny — OsloLatte og OsloKakao',
      imgSummerAlt: 'Sommermeny — OsloLatte og OsloKakao',
      flipHint: 'Trykk på menykortet for å bytte mellom vinter- og sommervariant.',
      flipAriaWinter: 'Menykort med vintermeny. Aktiver for å snu og vise sommermeny.',
      flipAriaSummer: 'Menykort med sommermeny. Aktiver for å snu og vise vintermeny.',
    }),
    priser: leaf({
      title: 'Priser',
      intro: 'Når du bestiller, bekrefter vi totalbeløp før eventuell betaling.',
      imgAlt:
        'Prisliste: OsloLatte og OsloKakao, varmt og på is — 40 kroner per drikk. Tekst og tall som på trykt kort.',
      latte: 'OsloLatte',
      kakao: 'OsloKakao',
      latteIce: 'OsloLatte på is',
      kakaoIce: 'OsloKakao på is',
      price: '40 kr',
    }),
    kalender: leaf({
      title: 'Åpent og kalender',
      p1: 'Når vi har åpent, er vi synlige: et flagg i vinduet mot Thereses gate betyr at koppen er klar. Kan du ikke se oss likevel, finner du oppdaterte tider i kalenderen under — da slipper du å gjette på om vi er til stede.',
      p1PreLaunch:
        'Vi er ikke åpnet for gjester ennå. Kalenderen under viser alle dager som stengt inntil videre — den oppdateres når vi har konkrete tider eller spesialdager.',
      p2Before: 'Du finner oss øverst i ',
      p2Street: 'Thereses gate',
      p2After: '. Når flagget vaier, er du hjertelig velkommen opp eller innom.',
    }),
    bestill: leaf({
      title: 'Bestilling',
      p1: 'Bestillingen går rett til oss: skriv hva du ønsker, omtrent når du vil hente, og legg ved allergier eller spørsmål. Bare familien svarer — vi gjør vårt beste for å svare raskt.',
      twoWaysTitle: 'To måter å bestille på',
      option1Title: 'Skjema på siden',
      option1Body:
        'Fyll ut skjemaet til venstre og legg inn mobilnummer. Det er en fordel om du har lastet ned Telegram-appen, slik at vi enkelt kan holde kommunikasjonen der etter at bestillingen er sendt inn.',
      option2Title: 'Telegram med QR',
      option2Body:
        'Skann QR-koden til høyre og legg inn bestillingen direkte i vår Telegram for bestilling (samme kanal som skjemaet).',
    }),
    kontakt: leaf({
      title: 'Kontakt',
      intro:
        'Har du spørsmål før du bestiller, eller vil du bare si hei? Du når oss med et tastetrykk eller en telefon.',
      email: 'E-post:',
      phone: 'Telefon:',
      whatsapp: 'WhatsApp:',
      whatsappChat: 'Åpne WhatsApp-chat',
      privacyH3: 'Personvern',
      privacyP1:
        'Når du bruker bestillingsskjemaet, lagrer vi bare det du selv sender inn — navn, kontakt, allergier og melding — for å kunne bekrefte bestillingen og ivareta trygg servering. Det samme innholdet sendes som varsel til vår interne Telegram-gruppe for drift. Vi beholder ikke opplysningene lenger enn nødvendig for å levere bestillingen og svare på eventuelle oppfølgingsspørsmål.',
      privacyP2:
        'Vi bruker ikke informasjonen til annet enn dette. Vil du vite hva vi har lagret, eller vil du at vi sletter opplysningene, tar du kontakt på samme e-post eller telefon som over.',
      privacyCookies:
        'Informasjonskapsler: vi bruker ikke analyseverktøy eller markedsføringscookies på denne siden — heller ikke Google Analytics eller annen «tracking». Skrifter lastes fra egen nettside (ingen Google Fonts-forespørsel). Språkvalg (NO/ENG) lagres kun lokalt i nettleseren din slik at valget huskes neste gang — ingen personlig profilering.',
      faqTitle: 'Korte svar (FAQ)',
      faq1q: 'Allergier og «trygg servering»?',
      faq1a:
        'Skriv alltid allergier og mathensyn i bestillingsskjemaet. Vi leser det før vi bekrefter — ved tvil ringer vi heller enn å gjette.',
      faq2q: 'Hvordan betaler vi?',
      faq2a:
        'Vi avtaler beløp når bestillingen er bekreftet. Under Kontakt finner du Vipps når det er satt opp; ellers avtaler vi enkelt manuelt.',
      faq3q: 'Kan vi avbestille?',
      faq3a:
        'Ring eller skriv så snart du kan hvis planene endrer seg — vi er en liten drift og setter pris på tydelig beskjed.',
      faq4q: 'Parkering?',
      faq4a:
        'Thereses gate ligger sentralt i Oslo — bruk offentlig transport om du kan. Gateparkering varierer; sjekk skilter i området.',
    }),
  },
  order: leaf({
    noteDisabled:
      'Nettbestilling er ikke aktivert i denne versjonen av siden (mangler oppsett mot bestillings-API). Ring oss for å bestille:',
    noteTelegram:
      'Når du trykker «Send bestilling til oss», går bestillingen som varsel til vår interne Telegram-gruppe.',
    notePausedPreLaunch:
      'Vi tar ikke imot bestillinger ennå (før åpning). Skjemaet er stengt til vi har åpnet. Har du spørsmål, bruk Kontakt-siden eller ring oss.',
    devNeedApiUrl:
      'Utviklermodus: Fyll .env (se .env.example), deretter én kommando: npm run dev:all',
    name: 'Navn',
    phone: 'Telefon',
    requiredMark: 'Obligatorisk felt',
    email: 'E-post (valgfritt)',
    drink: 'Drikk',
    qty: 'Antall',
    allergy: 'Allergier og mathensyn (se også under Meny)',
    allergyPh: 'F.eks. melkeprotein, laktose — eller «ingen kjente allergier»',
    notes: 'Når vil du hente? Andre ønsker?',
    notesPh: 'For eksempel dag, tidspunkt, eller spørsmål til oss',
    pickupLabel: 'Foretrukket tid for henting (veiledende)',
    pickupNone: 'Ingen særskilt — vi avtaler i melding',
    pickupWeekdayAm: 'Helst ukedag formiddag',
    pickupWeekdayPm: 'Helst ukedag ettermiddag/kveld',
    pickupWeekend: 'Helst helg',
    pickupFlexCall: 'Fleksibel — ring meg først',
    errorTooFast:
      'Vent gjerne et øyeblikk før du sender (skjemaet ble sendt veldig raskt). Prøv igjen om et sekund eller to.',
    submit: 'Send bestilling til oss',
    drinkOslolatteVarm: 'OsloLatte — vinter, varm',
    drinkOslokakaoVarm: 'OsloKakao — vinter, varm',
    drinkOslolatteIs: 'OsloLatte is — sommer',
    drinkOslokakaoIs: 'OsloKakao is — sommer',
    submitting: 'Sender …',
    telegramOk: 'Sendt — vi har mottatt bestillingen i Telegram.',
    telegramError: 'Klarte ikke å sende akkurat nå. Prøv igjen om litt, eller ring oss.',
    errorMissingEnv:
      'Telegram er ikke konfigurert på serveren (mangler token eller chat-id). Lokalt: legg TELEGRAM_BOT_TOKEN og TELEGRAM_CHAT_ID i .env i prosjektroten og kjør «npm run dev:all» (starter både API og nettside — ikke bare «npm run dev»). På Netlify: Environment variables med samme navn + ny deploy.',
    errorPreviewDisabled:
      'Denne forhåndsversjonen av nettsiden kan ikke sende ordre (unngår feil mot ekte Telegram-gruppe). Test på produksjons-URL eller lokalt med «npm run dev:all». Utviklere: sett ORDER_PREVIEW_TELEGRAM=1 i Netlify kun sammen med test-token og egen test-chat.',
    errorIdempotencyConflict:
      'Samme bestillingsnøkkel ble brukt med endret innhold. Oppdater siden og send én bestilling om gangen.',
    errorCors:
      'Nettleseren tillot ikke sending fra denne adressen (CORS). Sjekk at du bestiller fra den offisielle OsloLatte-siden, eller kontakt oss på telefon.',
    errorTelegramRejected:
      'Telegram godtok ikke meldingen. Sjekk at boten er medlem av gruppa og at chat-id stemmer (eller bruk @brukernavn til gruppa).',
    errorTelegramChatNotFound:
      'Telegram finner ikke denne chatten. Sjekk TELEGRAM_CHAT_ID i Netlify (tall fra getUpdates, eller @gruppebrukernavn) og at boten ligger i gruppa.',
    errorTelegramBlocked:
      'Telegram blokkerte sending (boten har ikke tilgang). Legg boten inn i gruppa igjen, eller start en privat chat med boten og prøv på nytt.',
    errorTelegramKicked:
      'Boten er fjernet fra gruppa. Legg den inn i bestillingsgruppa på nytt, og sjekk at den kan sende meldinger.',
    errorTelegramTooLong:
      'Meldingen ble for lang for Telegram. Kort ned tekst i meldingsfeltet og prøv igjen.',
    errorTelegramTimeout:
      'Telegram svarte ikke i tide (nettverks-timeout). Prøv igjen om litt, eller ring oss.',
    errorPayloadTooLarge: 'Forespørselen var for stor. Kort ned teksten og prøv igjen.',
    errorInvalidForm:
      'Noe i skjemaet ble avvist av serveren. Sjekk at antall er 1–50 og at allergifeltet er fylt ut.',
    errorFieldTooLong: 'Ett eller flere felt er for lange. Kort ned teksten og prøv igjen.',
    errorNetworkDev:
      'Fikk ikke kontakt med bestillings-API. Lokalt: kjør «npm run dev:all» slik at Netlify-functions kjører (typisk port 9888) og at .env har VITE_ORDER_API_URL=/api/order. Sjekk også at ingen brannmur blokkerer localhost.',
    errorNetworkProd:
      'Fikk ikke kontakt med serveren akkurat nå. Prøv igjen om litt, eller ring oss — det kan være nettverk eller midlertidig feil hos drift.',
    errorServerOrNetlify:
      'Serveren svarte med feil. Sjekk at Netlify-funksjonen er deployet og at Telegram-variabler er satt (Site → Environment variables).',
    errorApiGotHtml:
      'Vi fikk ikke ekte svar fra bestillings-API (ofte HTML fra forsiden). Sjekk Netlify deploy og at /api/order er tilgjengelig. Ring oss ved behov.',
    errorApiNotFound:
      'Fant ikke bestillingsadressen (404). Kontroller at siden kjører på Netlify med functions, og at nyeste deploy er gjennomført.',
    errorApiUnexpected: 'Uventet svar fra serveren. Prøv igjen, eller ring oss.',
    errorRateLimit:
      'Det kom mange bestillinger fra samme tilkobling på kort tid. Vent et halvt minutt og prøv igjen, eller ring oss.',
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
      'Betaling skjer via betalingslenke eller manuell Vipps — enkle alternativer uten full nettbutikkløsning.',
    devHint:
      'Utviklermerknad: Legg inn VIPPS_PAYMENT_LINK og/eller VIPPS_RECIPIENT_MOBILE i src/config/vipps.ts for å vise Vipps-blokken. Den skjules i produksjon til noe er fylt inn.',
  }),
  calendar: leaf({
    prev: 'Forrige måned',
    next: 'Neste måned',
    legendOpen: 'Åpent (planlagt)',
    legendClosed: 'Stengt',
    legendSpecial: 'Spesialdag',
    hint: 'Kalenderen oppdateres etter hvert som vi vet når vi kan ta imot dere. Ser du flagget vårt fra gaten eller vinduet, er koppen klar — kom opp i Thereses gate.',
    hintPreLaunch:
      'Alle dager er markert som stengt inntil videre. Kalenderen oppdateres når vi har faste tider eller spesielle åpningsdager.',
    statusOpen: 'Åpent planlagt',
    statusClosed: 'Stengt',
    statusSpecial: 'Spesial',
    statusNeutral: 'Ikke lagt inn',
  }),
  seo: leaf({
    titleHome: 'OsloLatte — Familie fra Oslo',
    descHome: 'Signaturdrikk fra Oslo: OsloLatte og OsloKakao fra Thereses gate. Bestill hos oss.',
    titleOmOss: 'Om oss — OsloLatte',
    descOmOss: 'Familiebedrift, historie og smaken bak koppen.',
    titleMeny: 'Meny — OsloLatte',
    descMeny:
      'OsloLatte og OsloKakao — varmt eller på is, med eller uten melk. Prislisten ligger nederst på meny-siden.',
    titleKalender: 'Åpning & kalender — OsloLatte',
    descKalender: 'Planlagte dager og spesialhelger i Thereses gate.',
    titleBestill: 'Bestill — OsloLatte',
    descBestill: 'Send bestilling fra nettsiden — vi bekrefter så raskt vi kan.',
    titleKontakt: 'Kontakt — OsloLatte',
    descKontakt: 'Ring, skriv eller WhatsApp — vi svarer så snart vi kan.',
    titleNotFound: 'Siden finnes ikke — OsloLatte',
    descNotFound: 'Gå til forsiden eller ta kontakt med OsloLatte.',
  }),
  errorUi: leaf({
    boundaryTitle: 'Noe gikk galt',
    boundaryBody:
      'Vi klarte ikke å vise denne siden. Du kan prøve igjen, eller gå til forsiden og fortsette derfra.',
    boundaryRetry: 'Prøv igjen',
    boundaryHome: 'Til forsiden',
  }),
  lang: leaf({
    aria: 'Språk',
    nb: 'Vis norsk',
    en: 'Vis engelsk',
  }),
};
