import qs from 'qs'

const baseUrl = '/api'

type Request = (url: string, data?: any) => Promise<any>

export const get: Request = async (url, params) => {
  let queryString = qs.stringify(params)
  queryString = queryString ? `?${queryString}` : ''

  return fetch(`${baseUrl}${url}${queryString}`, {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }).then(response => response.json())
}

export const post: Request = (url, data) =>
  fetch(`${baseUrl}${url}`, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  })
