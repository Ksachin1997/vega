import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils';
import { burnTokenService } from '../services/burnToken';

export const burnToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body = {} } = req;
  const { msg_id, msg_timestamp, amount, ref_id, wallet_address, token_id } =
    body;

  const response = await burnTokenService(
    msg_id,
    msg_timestamp,
    amount,
    ref_id,
    wallet_address,
    token_id
  );

  if (!response?.status) {
    return sendResponse(res, false, {}, response?.error);
  }
  return sendResponse(res, true, response.data);
};
