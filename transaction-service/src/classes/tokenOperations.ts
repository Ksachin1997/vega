import { dbModels } from '../utils/dbModels';
import { createLogObject, logger } from '../utils/logger';
import dotenv from 'dotenv';
import { classResponse } from '../utils';
dotenv.config();

/**
 * DB calls only
 */
export const createTokenOperationTransfer = async (
  msgId: string,
  value: number,
  refId: string,
  sourceAddress: string,
  destinationAddress: string,
  tokenId: string,
  trxHash: string
) => {
  try {
    const dbResponse = await dbModels.TokenOperations.create({
      msg_id: msgId,
      amount: value,
      ref_id: refId,
      source_address: sourceAddress,
      destination_address: destinationAddress,
      token_id: tokenId,
      tokenOperationType: 'TRANSFER',
      transactionHash: trxHash,
      transactionStatus: 'PENDING',
    });

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject(
        'Error in creating token opration',
        'createTokenOperation',
        { err }
      )
    );
  }
};

export const createTokenOperationBurn = async (
  msgId: string,
  value: number,
  refId: string,
  walletAddress: string,
  tokenId: string
) => {
  try {
    const dbResponse = await dbModels.TokenOperations.create({
      msg_id: msgId,
      amount: value,
      ref_id: refId,
      wallet_address: walletAddress,
      token_id: tokenId,
      tokenOperationType: 'BURN',
    });

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject('Error in burn token opration', 'createTokenOperation', {
        err,
      })
    );
  }
};

export const createTokenOperationMint = async (
  msgId: string,
  value: number,
  refId: string,
  walletAddress: string,
  tokenId: string,
  decimal: number,
  create_new: boolean
) => {
  try {
    const dbResponse = await dbModels.TokenOperations.create({
      msg_id: msgId,
      amount: value,
      ref_id: refId,
      wallet_address: walletAddress,
      token_id: tokenId,
      decimals: decimal,
      isNewTokenMint: create_new,
      tokenOperationType: 'MINT',
    });

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject('Error in mint token opration', 'createTokenOperation', {
        err,
      })
    );
  }
};

export const updateTrxStatus = async (trxHash: string, trxStatus: string) => {
  try {
    const dbResponse = await dbModels.TokenOperations.update(
      {
        transactionStatus:
          trxStatus === 'FAILED' || trxStatus === 'SUCCESS'
            ? trxStatus
            : 'PENDING',
      },
      {
        where: {
          transactionHash: trxHash,
        },
      }
    );

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject(
        'Error in updating transaction status',
        'updateTrxStatus',
        { err }
      )
    );
  }
};
