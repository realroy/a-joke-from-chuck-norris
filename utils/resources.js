import axios from 'axios'
import qs from 'qs'

export const API_ENDPOINT = 'http://api.icndb.com'

export const createJokesURL = (id, num) => {
  if (id) return `${API_ENDPOINT}/jokes/${id}`
  else if (num) return `${API_ENDPOINT}/jokes/random/${num}`
  return `${API_ENDPOINT}/jokes/random`
}

export const fetchJokes = async (id, num, filters) => {
  try {
    const url = createJokesURL(id, num)
    const q = filters ? qs.stringify(filters, { addQueryPrefix: true }) : ''
    const res = await axios.get(url.concat(q))
    const { data } = await res
    if (data.type !== 'success') throw new Error(JSON.stringify(data))
    const dataIsAnArray = Array.isArray(data.value)
    const jokes = dataIsAnArray ? data.value.map(({ joke }) => joke) : [data.value.joke]
    return jokes
  } catch (err) {
    return err
  }
}

export default fetchJokes