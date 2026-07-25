require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

const fetch = require("node-fetch")

const API_URL = process.env.GATSBY_API_URL || "https://filmovita.vercel.app"

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Movie implements Node {
      djangoId: Int
      title: String!
      slug: String!
      description: String
      releaseYear: Int
      genres: [String]
      poster: String
      rating: String
      durationMinutes: Int
    }
  `)
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode } = actions

  let url = `${API_URL}/movies/`
  const movies = []

  reporter.info(`Povlacim filmove sa ${API_URL}/movies/ ...`)

  while (url) {
    let res
    try {
      res = await fetch(url)
    } catch (err) {
      reporter.panicOnBuild(
        `Ne mogu da se povezem na Django API na ${API_URL}. ` +
          `Provjeri da li backend radi i da li je GATSBY_API_URL tacno postavljen.`,
        err
      )
      return
    }

    if (!res.ok) {
      reporter.panicOnBuild(
        `Django API je vratio gresku ${res.status} ${res.statusText} za ${url}`
      )
      return
    }

    const data = await res.json()

    // Podrzavamo oba oblika odgovora:
    // - obicna lista: [ {...}, {...} ]
    // - DRF paginacija: { count, next, previous, results: [...] }
    if (Array.isArray(data)) {
      movies.push(...data)
      url = null
    } else {
      movies.push(...(data.results || []))
      url = data.next
    }
  }

  reporter.info(`Pronadjeno ${movies.length} filmova.`)

  movies.forEach(movie => {
    const {
      id: djangoId,
      release_year: releaseYear,
      duration_minutes: durationMinutes,
      genres,
      ...rest
    } = movie

    createNode({
      ...rest,
      djangoId,
      releaseYear,
      durationMinutes,
      genres: (genres || []).map(genre =>
        typeof genre === "string" ? genre : genre.name
      ),
      id: createNodeId(`movie-${djangoId}`),
      parent: null,
      children: [],
      internal: {
        type: `Movie`,
        content: JSON.stringify(movie),
        contentDigest: createContentDigest(movie),
      },
    })
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMovie {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Greska pri gradjenju stranica za filmove`, result.errors)
    return
  }

  const movieTemplate = require.resolve(`./src/templates/movie.js`)

  result.data.allMovie.nodes.forEach(movie => {
    createPage({
      path: `/filmovi/${movie.slug}/`,
      component: movieTemplate,
      context: { id: movie.id },
    })
  })
}