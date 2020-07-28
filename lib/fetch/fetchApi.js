import config from 'config'
import errorHandling from './errorHandling'

const whenMatchedForceAPIBodyToBeObject = [302, 404]

async function FetchApi({ dispatch = () => {}, postType = 'pages', body = {}, method = 'GET', headers = {}, url }) {
  try {
    // Build up the object that is passed to fetch api
    const fetchObject = {
      url: `${config.url}${url}`,
      fetchApiProperties: {
        method,
        mode: 'cors',
        headers: {
          ...headers,
        },
      },
    }
    if (method !== 'GET') fetchObject.fetchApiProperties.body = JSON.stringify(body)

    // Make API call
    const response = await fetch(fetchObject.url, fetchObject.fetchApiProperties)

    const originalResponseStatus = response
    // Safely handle any requests that aren't in json so we don't get caught in a promise hole
    const responseBody = whenMatchedForceAPIBodyToBeObject.includes(originalResponseStatus.status)
      ? {}
      : await response.json()

    const responseObject = {
      status: originalResponseStatus.status,
      headers: originalResponseStatus.headers ? originalResponseStatus.headers : null,
      body: responseBody,
    }

    if (!response.ok) {
      throw responseObject
    }

    return responseObject.body
  } catch (response) {
    console.error('response', response)
    errorHandling(response, dispatch)
    return response
  }
}

export default FetchApi
