import { dbModels } from '../utils/dbModels';
import { createLogObject, logger } from '../utils/logger';
import dotenv from 'dotenv';
import { classResponse } from '../utils';
dotenv.config();

/**
 * DB calls only
 */
export const createHotWallet = async (
  walletAddress: string,
  tokenId: string,
  client_Id: string
) => {
  try {
    const dbResponse = await dbModels.GeneratedHotWallet.create({
      generatedAddress: walletAddress,
      coin: tokenId,
      clientId: client_Id,
    });

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject('Error in creating Hot Wallet', 'createHotWallet', {
        err,
      })
    );
  }
};

export const getHotWalletAddressForClient = async (
  tokenId: string,
  client_Id: string
) => {
  try {
    const dbResponse = await dbModels.GeneratedHotWallet.findAll({
      where: {
        clientId: client_Id,
        coin: tokenId,
      },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject(
        'Error in fetching hot wallet address for client',
        'getHotWalletAddressForClient',
        { err }
      )
    );
  }
};
