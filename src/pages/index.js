import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import FontLinks from "../components/font-links"

const IndexPage = ({ data }) => {
  const movies = data.allMovie.nodes

  return (
    <Layout>
      <section className="hero">
        <h1>Filmovi</h1>
        <p>
          {movies.length} {movies.length === 1 ? "film" : "filmova"} u bazi
        </p>
      </section>

      {movies.length === 0 ? (
        <p className="empty-state">
          Jos uvijek nema dodanih filmova. Otvori Django admin i dodaj prvi
          film, pa ponovo pokreni build.
        </p>
      ) : (
        <ul className="movie-grid">
          {movies.map(movie => (
            <li key={movie.id} className="movie-card">
              <Link to={`/filmovi/${movie.slug}/`}>
                <div className="movie-card__poster">
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={`Poster za ${movie.title}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="movie-card__poster-placeholder">
                      {movie.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="movie-card__body">
                  <h2>{movie.title}</h2>
                  <p className="movie-card__year">{movie.releaseYear}</p>
                  {movie.rating && (
                    <p className="movie-card__rating">★ {movie.rating}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMovie {
      nodes {
        id
        title
        slug

      }
    }
  }
`

export const Head = () => (
  <>
    <FontLinks />
    <title>Filmovi</title>
    <meta name="description" content="Katalog filmova sa ocjenama i zanrovima." />
  </>
)

export default IndexPage
