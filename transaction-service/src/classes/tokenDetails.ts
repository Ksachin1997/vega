import { dbModels } from '../utils/dbModels';
import { createLogObject, logger } from '../utils/logger';
import dotenv from 'dotenv';
import { classResponse } from '../utils';
dotenv.config();

/**
 * DB calls only
 */
export const getTokenAddress = async (tokenId: string) => {
  try {
    const dbResponse = await dbModels.TokenDetails.findOne({
      where: {
        token_id: tokenId,
      },
      attributes: ['token_address'],
    });

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject('Error in getting token address', 'getTokenAddress', {
        err,
      })
    );
  }
};

export const getTokenBlockChain = async (tokenId: string) => {
  try {
    const dbResponse = await dbModels.TokenDetails.findOne({
      where: {
        token_id: tokenId,
      },
      attributes: ['blockChain'],
    });

    return classResponse(true, dbResponse, '');
  } catch (err) {
    logger.error(
      createLogObject(
        'Error in getting token blockChain',
        'getTokenBlockChain',
        {
          err,
        }
      )
    );
  }
};
