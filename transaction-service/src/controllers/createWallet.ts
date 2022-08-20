import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils';
import { createWalletService } from '../services/createWallet';

export const createWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body = {} } = req;
  const { msg_id = '', account_id = '', type = '', msg_timestamp = 0 } = body;

  const response = await createWalletService(
    msg_id,
    account_id,
    type,
    msg_timestamp
  );

  if (!response?.status) {
    return sendResponse(res, false, {}, response?.error);
  }
  return sendResponse(res, true, response.data);
};
