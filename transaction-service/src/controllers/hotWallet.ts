import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils';
import { createHotWalletService } from '../services/hotWalletRequest';

export const createHotWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body = {}, query = {} } = req;
  const { clientId = '', coin = '' } = body;
  const { create_new = 'true' } = query;

  let isNew = true;

  if (create_new === 'false') isNew = false;

  const response = await createHotWalletService(clientId, coin, isNew);

  if (!response?.status) {
    return sendResponse(res, false, {}, response?.error);
  }
  return sendResponse(res, true, response.data);
};
