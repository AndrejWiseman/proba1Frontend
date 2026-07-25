import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import FontLinks from "../components/font-links"

const MovieTemplate = ({ data }) => {
  const movie = data.movie

  return (
    <Layout>
      <Link to="/" className="back-link">
        ← Nazad na sve filmove
      </Link>

      <article className="movie-detail">
        <div className="movie-detail__poster">
          {movie.poster ? (
            <img src={movie.poster} alt={`Poster za ${movie.title}`} />
          ) : (
            <div className="movie-detail__poster-placeholder">
              {movie.title.charAt(0)}
            </div>
          )}
        </div>

        <div className="movie-detail__info">
          <p className="movie-detail__year">{movie.releaseYear}</p>
          <h1>{movie.title}</h1>

          <div className="movie-detail__meta">
            {movie.rating && (
              <span className="badge badge--rating">★ {movie.rating}</span>
            )}
            {movie.durationMinutes && (
              <span className="badge">{movie.durationMinutes} min</span>
            )}
            {movie.genres &&
              movie.genres.map(genre => (
                <span className="badge" key={genre}>
                  {genre}
                </span>
              ))}
          </div>

          {movie.description && (
            <p className="movie-detail__description">{movie.description}</p>
          )}
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    movie(id: { eq: $id }) {
      title
      description
      genres
    }
  }
`

export const Head = ({ data }) => (
  <>
    <FontLinks />
    <title>{data.movie.title} | Filmovi</title>
    {data.movie.description && (
      <meta name="description" content={data.movie.description.slice(0, 160)} />
    )}
  </>
)

export default MovieTemplate
