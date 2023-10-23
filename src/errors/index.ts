const error: any[] = []

interface ErrorInput {
  title: string | null
  detail: string | string[] | null
}

error[400] = function (obj: ErrorInput) {
  return {
    statusCode: 400,
    errorType: 'Bad Request',
    title: obj.title,
    detail: obj.detail
  }
}

error[401] = function (obj: ErrorInput) {
  return {
    statusCode: 401,
    errorType: 'Unauthorized',
    title: obj.title,
    detail: obj.detail
  }
}

error[403] = function (obj: ErrorInput) {
  return {
    statusCode: 403,
    errorType: 'Forbidden',
    title: obj.title,
    detail: obj.detail
  }
}

error[404] = function (obj: ErrorInput) {
  return {
    statusCode: 404,
    errorType: 'Not Found',
    title: obj.title,
    detail: obj.detail
  }
}

export default error
