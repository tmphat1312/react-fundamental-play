export interface IMovie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface IDetailedMovie extends IMovie {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface IWatchedMovie extends IMovie {
  runtime: number
  imdbRating: number
  userRating: number
}
