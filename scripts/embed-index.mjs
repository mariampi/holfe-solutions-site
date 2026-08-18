import { readFile, writeFile } from "node:fs/promises";

// Keep the static pages served by Sites aligned with their editable source files.
const sitePages = ["index.html", "about.html", "booking.html", "contact.html", "payment.html", "rates.html", "services.html", "index-es.html", "sobre.html", "booking-es.html", "contact-es.html", "payment-es.html", "rates-es.html", "services-es.html"];

const englishFooter = `<a href="index.html">Home</a><a href="services.html">Services</a><a href="rates.html">Rates</a><a href="booking.html">Booking</a><a href="payment.html">Payment</a><a href="contact.html">Contact</a><a href="about.html">About</a><a href="mailto:info@holfesolutions.com">info@holfesolutions.com</a>`;
const spanishFooter = `<a href="index-es.html">Inicio</a><a href="services-es.html">Servicios</a><a href="rates-es.html">Tarifas</a><a href="booking-es.html">Reservas</a><a href="payment-es.html">Pagos</a><a href="contact-es.html">Contacto</a><a href="sobre.html">Sobre mí</a><a href="mailto:info@holfesolutions.com">info@holfesolutions.com</a>`;

for (const filename of sitePages) {
  const sourceFile = new URL(`../${filename}`, import.meta.url);
  const publicFile = new URL(`../public/${filename}`, import.meta.url);
  const sourceHtml = await readFile(sourceFile, "utf8");
  const footer = filename.includes("-es") || filename === "sobre.html" ? spanishFooter : englishFooter;
  const normalizedHtml = sourceHtml.replace(/(<div class="footer-links">)[\s\S]*?(<\/div>)/, `$1${footer}$2`);
  await writeFile(publicFile, normalizedHtml, "utf8");
}

await writeFile(new URL("../public/styles.css", import.meta.url), await readFile(new URL("../styles.css", import.meta.url)), "utf8");
await writeFile(new URL("../public/script.js", import.meta.url), await readFile(new URL("../script.js", import.meta.url)), "utf8");
await writeFile(new URL("../public/demos/index.html", import.meta.url), await readFile(new URL("../demos/index.html", import.meta.url)), "utf8");

const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
const match = html.match(/<body[^>]*>([\s\S]*?)<script\s+src=["']script\.js["'][^>]*><\/script>\s*<\/body>/i);

if (!match) {
  throw new Error("Could not extract the HolFe home page body.");
}

const source = `export const indexBody = ${JSON.stringify(match[1].trim())};\n`;
await writeFile(new URL("../app/index-body.js", import.meta.url), source, "utf8");
