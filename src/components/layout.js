import * as React from "react"
import { Link } from "gatsby"
import "../styles/global.css"

const Layout = ({ children }) => (
  <div className="site">
    <header className="site-header">
      <Link to="/" className="site-header__logo">
        Filmovi
      </Link>
    </header>
    <div className="sprocket-rule" />
    <main>{children}</main>
    <div className="sprocket-rule" />
    <footer className="site-footer">Katalog filmova — Django + Gatsby</footer>
  </div>
)

export default Layout
