import { apiGenric, apiGlobalErrors } from 'config'

export default (request, dispatch) => {
  let error = {
    status: '',
    message: '',
    messageType: '',
  }

  if (request.body && request.body.error && request.body.error !== '') {
    error = {
      status: request.body.statusCode ? request.body.statueCode : request.status ? request.status : 0,
      message: request.body.message ? request.body.message : '',
      messageType: apiGenric.bad,
    }

    return
  }

  const getErrorFromJSON = apiGenric[`error${request.status}`]

  if (getErrorFromJSON) {
    error.message = getErrorFromJSON
  } else {
    const getErrorType = String(request.status).charAt(0)

    switch (getErrorType) {
      case '4':
        error.status = request.status
        error.message = apiGlobalErrors.error4
        break
      case '5':
        error.status = request.status
        error.message = apiGlobalErrors.error5
        break
      default:
        error.status = 0
        error.message = 'opps'
        return
    }
  }

  // Check
  if (error.message) {
    console.error(error.message)
    return
  }

  return request
}
