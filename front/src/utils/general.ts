export enum EStateGeneric {
  IDLE = "idle",
  SUCCEEDED = "succeeded",
  PENDING = "pending",
  FAILED = "failed",
}

export enum EGenericButtonType {
  PRIMARY = "PRIMARY",
  CLOSE = "CLOSE",
}

export const rateGen = (rating) => {
  const
    scores = [0, 20, 40, 50, 60, 70, 80, 90, 96, 100],
    max = scores[rating],
    min = scores[rating - 1],
    seed = Math.abs(
      Math.sqrt(
        -1 * Math.log(1 - Math.random())
      )
      *
      Math.cos(1 * Math.PI * Math.random())
    )
  return Math.floor(seed * (max - min + 1) + min)
}
export function filterWines(wines, filters) {
  return wines.filter(wine => {
    return filters.filter(filter => {
      return filterByWinery(wine, filter) || filterByRegion(wine, filter) || filterByVintage(wine, filter) || filterByScore(wine, filter) || filterByPrice(wine, filter);
    }).length === filters.length;
  });
}
const filterByRegion = (wine, filter) => {
  switch (filter.region) {
    case 'all-region':
      return wine.region
    case filter.region:
      return wine.region === filter.region
  }
}

const filterByWinery = (wine, filter) => {
  switch (filter.winery) {
    case 'all-winery':
      return wine.winery
    case filter.winery:
      return wine.winery === filter.winery
  }
}

const filterByVintage = (wine, filter) => {
  switch (filter.vintage) {
    case '2010-Present':
      return wine.year > 2009
    case '2000-2009':
      return wine.year > 1999 && wine.year < 2010
    case '1990-1999':
      return wine.year > 1989 && wine.year < 2000
    case '1980-1989':
      return wine.year > 1979 && wine.year < 1990
    case '1970-1979':
      return wine.year > 1969 && wine.year < 1980
    case '1960-1969':
      return wine.year > 1959 && wine.year < 1970
    case '1959-older':
      return wine.year < 1959
    case 'all-vintage':
      return wine.year
  }
}

const filterByScore = (wine, filter) => {
  switch (filter.score) {
    case '100':
      return wine.rating === 100
    case '99-97':
      return wine.rating < 100 && wine.rating >= 97
    case '96-94':
      return wine.rating < 97 && wine.rating >= 94
    case '93-91':
      return wine.rating < 94 && wine.rating >= 91
    case 'all-score':
      return wine.rating
  }
}
const filterByPrice = (wine, filter) => {
  switch (filter.price) {
    case '100-200':
      return wine.price < 201 && wine.price >= 100
    case '50-99':
      return wine.price < 100 && wine.price >= 50
    case '30-49':
      return wine.price < 50 && wine.price >= 30
    case '20-29':
      return wine.price < 30 && wine.price >= 20
    case '16-19':
      return wine.price < 20 && wine.price >= 16
    case '10-15':
      return wine.price < 16 && wine.price >= 10
    case '6-9':
      return wine.price < 10 && wine.price >= 6
    case 'all-price':
      return wine.price
  }
}