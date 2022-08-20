import { serviceResponse } from '../utils';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';
import axios from 'axios';
import { getTokenAddress } from '../classes/tokenDetails';
import {
  createTokenOperationTransfer,
  updateTrxStatus,
} from '../classes/tokenOperations';

dotenv.config();

export const moveTokenService = async (
  msg_id: string,
  msg_timestamp: number,
  amount: number,
  ref_id: string,
  source_address: string,
  destination_address: string,
  token_id: string
) => {
  try {
    const transferUrl =
      process.env.TRANSFER_URL || 'http://localhost:4002/transfer';

    const tokenAddress = await getTokenAddress(token_id);
    const tokenContractAddress =
      (tokenAddress &&
        tokenAddress.data &&
        tokenAddress.data.dataValues &&
        tokenAddress.data.dataValues.token_address) ||
      '';

    const transferResponse = await axios.post(transferUrl, {
      tokenAddress: tokenContractAddress,
      senderAddress: source_address,
      receiverAddress: destination_address,
      tokenAmount: amount,
      callbackUrl:
        process.env.CALLBACK_URL ||
        'http://localhost:4000/update/transferStatus',
    });

    const trxHash =
      transferResponse && transferResponse.data && transferResponse.data.data
        ? transferResponse.data.data
        : '';

    await createTokenOperationTransfer(
      msg_id,
      amount,
      ref_id,
      source_address,
      destination_address,
      token_id,
      trxHash
    );

    return serviceResponse(true, {
      msg_id,
      msg_timestamp,
      amount,
      ref_id,
      destination_address,
      source_address,
      token_id,
    });
  } catch (error: any) {
    logger.log('Error in move token', error);
    return {
      status: false,
      data: {},
      error: error.message,
    };
  }
};

export const updateTrxService = async (trxHash: string, trxStatus: string) => {
  try {
    await updateTrxStatus(trxHash, trxStatus);

    return serviceResponse(true, 'updated successfully');
  } catch (error: any) {
    logger.log('Error in updating transaction status', error);
    return {
      status: false,
      data: {},
      error: error.message,
    };
  }
};
