import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils';
import { moveTokenService, updateTrxService } from '../services/moveToken';

export const moveToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body = {} } = req;
  const {
    msg_id,
    source_address,
    destination_address,
    msg_timestamp,
    amount,
    ref_id,
    token_id,
  } = body;

  const response = await moveTokenService(
    msg_id,
    msg_timestamp,
    amount,
    ref_id,
    source_address,
    destination_address,
    token_id
  );

  if (!response?.status) {
    return sendResponse(res, false, {}, response?.error);
  }
  return sendResponse(res, true, response.data);
};

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body = {} } = req;
  const { transactionHash, statusIndex } = body;

  const response = await updateTrxService(
    transactionHash,
    statusIndex.toUpperCase()
  );

  if (!response?.status) {
    return sendResponse(res, false, {}, response?.error);
  }
  return sendResponse(res, true, response.data);
};
