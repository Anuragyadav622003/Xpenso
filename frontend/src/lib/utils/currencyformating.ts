// countryCurrency.ts

export const countryToCurrency: Record<string, string> = {
  AF: "AFN", AL: "ALL", DZ: "DZD", AS: "USD", AD: "EUR",
  AO: "AOA", AI: "XCD", AQ: "USD", AG: "XCD", AR: "ARS",
  AM: "AMD", AW: "AWG", AU: "AUD", AT: "EUR", AZ: "AZN",
  BS: "BSD", BH: "BHD", BD: "BDT", BB: "BBD", BY: "BYN",
  BE: "EUR", BZ: "BZD", BJ: "XOF", BM: "BMD", BT: "BTN",
  BO: "BOB", BA: "BAM", BW: "BWP", BR: "BRL", BN: "BND",
  BG: "BGN", BF: "XOF", BI: "BIF", KH: "KHR", CM: "XAF",
  CA: "CAD", CV: "CVE", KY: "KYD", CF: "XAF", TD: "XAF",
  CL: "CLP", CN: "CNY", CO: "COP", KM: "KMF", CG: "XAF",
  CD: "CDF", CR: "CRC", HR: "HRK", CU: "CUP", CY: "EUR",
  CZ: "CZK", DK: "DKK", DJ: "DJF", DM: "XCD", DO: "DOP",
  EC: "USD", EG: "EGP", SV: "USD", GQ: "XAF", ER: "ERN",
  EE: "EUR", SZ: "SZL", ET: "ETB", FJ: "FJD", FI: "EUR",
  FR: "EUR", GA: "XAF", GM: "GMD", GE: "GEL", DE: "EUR",
  GH: "GHS", GR: "EUR", GD: "XCD", GT: "GTQ", GN: "GNF",
  GW: "XOF", GY: "GYD", HT: "HTG", HN: "HNL", HU: "HUF",
  IS: "ISK", IN: "INR", ID: "IDR", IR: "IRR", IQ: "IQD",
  IE: "EUR", IL: "ILS", IT: "EUR", CI: "XOF", JM: "JMD",
  JP: "JPY", JO: "JOD", KZ: "KZT", KE: "KES", KI: "AUD",
  KP: "KPW", KR: "KRW", KW: "KWD", KG: "KGS", LA: "LAK",
  LV: "EUR", LB: "LBP", LS: "LSL", LR: "LRD", LY: "LYD",
  LI: "CHF", LT: "EUR", LU: "EUR", MG: "MGA", MW: "MWK",
  MY: "MYR", MV: "MVR", ML: "XOF", MT: "EUR", MH: "USD",
  MR: "MRU", MU: "MUR", MX: "MXN", FM: "USD", MD: "MDL",
  MC: "EUR", MN: "MNT", ME: "EUR", MA: "MAD", MZ: "MZN",
  MM: "MMK", NA: "NAD", NR: "AUD", NP: "NPR", NL: "EUR",
  NZ: "NZD", NI: "NIO", NE: "XOF", NG: "NGN", MK: "MKD",
  NO: "NOK", OM: "OMR", PK: "PKR", PW: "USD", PS: "ILS",
  PA: "PAB", PG: "PGK", PY: "PYG", PE: "PEN", PH: "PHP",
  PL: "PLN", PT: "EUR", QA: "QAR", RO: "RON", RU: "RUB",
  RW: "RWF", KN: "XCD", LC: "XCD", VC: "XCD", WS: "WST",
  SM: "EUR", ST: "STN", SA: "SAR", SN: "XOF", RS: "RSD",
  SC: "SCR", SL: "SLL", SG: "SGD", SK: "EUR", SI: "EUR",
  SB: "SBD", SO: "SOS", ZA: "ZAR", SS: "SSP", ES: "EUR",
  LK: "LKR", SD: "SDG", SR: "SRD", SE: "SEK", CH: "CHF",
  SY: "SYP", TW: "TWD", TJ: "TJS", TZ: "TZS", TH: "THB",
  TL: "USD", TG: "XOF", TO: "TOP", TT: "TTD", TN: "TND",
  TR: "TRY", TM: "TMT", TV: "AUD", UG: "UGX", UA: "UAH",
  AE: "AED", GB: "GBP", US: "USD", UY: "UYU", UZ: "UZS",
  VU: "VUV", VA: "EUR", VE: "VES", VN: "VND", YE: "YER",
  ZM: "ZMW", ZW: "ZWL"
};



// export function formatCurrency(amount: number, countryCode?: string): string {
//   const currency = countryToCurrency[countryCode?.toUpperCase() || "IN"] || "INR";
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency,
//   }).format(amount);
// }



export function formatCurrency(amount: number): string {
  try {
    const storedUser = localStorage.getItem("user");
    let countryCode = "IN"; // default

    if (storedUser) {
      const user = JSON.parse(storedUser);
      countryCode = user?.countryCode?.toUpperCase() || "IN";
    }

    const currency = countryToCurrency[countryCode] || "INR";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  } catch (error) {
    // fallback to INR if error occurs
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  }
}
