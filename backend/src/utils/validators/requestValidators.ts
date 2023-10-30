/* eslint-disable @typescript-eslint/no-invalid-void-type */
// libraries
import type { Request, Response, NextFunction } from 'express'
import type { Result, ValidationError } from 'express-validator'
import { validationResult } from 'express-validator'

const validateParams = (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors: Result<ValidationError> = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('** failed with validation errors')
    console.log(`** error ${JSON.stringify(errors.array({ onlyFirstError: true }))}`)
    console.log('** rejected request with 422')
    res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
  } else {
    next()
  }
}

export default validateParams
