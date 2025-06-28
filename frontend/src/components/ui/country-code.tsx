import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json"; // This will now work after installing the package

countries.registerLocale(enLocale);

export const countryOptions = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({
  label: name,
  value: code,
}));
