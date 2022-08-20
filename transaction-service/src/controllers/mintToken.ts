import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils';
import { mintTokenService } from '../services/mintToken';

export const mintToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body = {} } = req;
  const {
    msg_id,
    msg_timestamp,
    amount,
    ref_id,
    decimals,
    create_new,
    wallet_address,
    token_id,
  } = body;

  const response = await mintTokenService(
    msg_id,
    msg_timestamp,
    amount,
    ref_id,
    decimals,
    create_new,
    wallet_address,
    token_id
  );

  if (!response?.status) {
    return sendResponse(res, false, {}, response?.error);
  }
  return sendResponse(res, true, response.data);
};
