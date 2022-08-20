import { Response } from 'express';

/**
 * Data clean up function
 * @param data Data to be parsed
 * @returns cleaned data
 */
export const parseSafe = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

/**
 * Format the response that is to be sent to the user
 * @param res Express response object used to send the response to the user
 * @param status boolean to check if response is a success response
 * @param data response data sent to the user
 * @param error encountered while processing the request, if any
 * @returns formatted response to be sent to the user
 */
export const sendResponse = (
  res: Response,
  status: boolean,
  data: any,
  error: string | object = ''
) => {
  if (typeof error !== 'string') {
    error = JSON.stringify(error);
  }

  return res.json({ status, data, error });
};

/**
 * Format service response
 * @param status boolean to check if it is a success response
 * @param data returned by the service after the computation
 * @param error encountered during the computation, if any
 * @returns formatted service response
 */
export const serviceResponse = (
  status: boolean,
  data: any,
  error: string | object = ''
) => {
  if (typeof error !== 'string') {
    error = JSON.stringify(error);
  }

  return { status, data, error };
};

/**
 * Format class response
 * @param status boolean DB call success status
 * @param data returned by the database
 * @param error encountered during the DB call, if any
 * @returns formatted class response
 */
export const classResponse = (
  status: boolean,
  data: any,
  error: string | object = ''
) => {
  if (typeof error !== 'string') {
    error = JSON.stringify(error);
  }

  return { status, data, error };
};
