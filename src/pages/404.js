import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import FontLinks from "../components/font-links"

const NotFoundPage = () => (
  <Layout>
    <section className="hero">
      <h1>404</h1>
      <p>Ova stranica ne postoji.</p>
    </section>
    <p style={{ textAlign: "center" }}>
      <Link to="/" className="back-link">
        ← Nazad na pocetnu
      </Link>
    </p>
  </Layout>
)

export const Head = () => (
  <>
    <FontLinks />
    <title>404 — Stranica nije pronadjena</title>
  </>
)

export default NotFoundPage
