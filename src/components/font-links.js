import * as React from "react"

/**
 * Fontovi za "bioskopsku marku" temu:
 * - Anton: gusto, veliko slovo za naslove (kao na filmskim plakatima)
 * - Space Mono: monospace za meta podatke (godina, trajanje, ocjena)
 * Ucitavaju se preko <link>, ne uticu na build (samo na klijentu).
 */
const FontLinks = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link
      href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </>
)

export default FontLinks
