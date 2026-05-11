/**
 * Vipps uten egen server: opprett «betalingslenke» i portal.vippsmobilepay.com og lim inn full URL under.
 * Da åpner kunden Vipps / betaling i nettleser eller app.
 *
 * Dokumentasjon om betalingslenker:
 * https://vippsmobilepay.com/no/online/payment-links
 */

/** Sett til false for å skjule hele Vipps-blokken på nettsiden. */
export const VIPPS_ENABLED = true;

/**
 * Full https-adresse til betalingslenke fra Vipps-portalen (anbefalt).
 * Eksempel: 'https://...' — tom streng til dere har opprettet lenke.
 */
export const VIPPS_PAYMENT_LINK = '';

/**
 * Valgfritt reserve: norsk mobil (8 siffer, uten landskode) som kunder kan søke opp i Vipps
 * når dere ikke bruker lenke ennå. Eksempel: '91234567'. Tom = ikke vis nummer-raden.
 */
export const VIPPS_RECIPIENT_MOBILE = '41352444';
