import { serviceResponse } from '../utils';
import { logger } from '../utils/logger';
import Web3 from 'web3';

export const createWalletService = async (
  msgId: string,
  accountId: string,
  type: string,
  msgTimestamp: number
) => {
  try {
    const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546');
    const accounts = web3.eth.accounts.create();
    return serviceResponse(true, {
      msg_id: msgId,
      wallet_address: accounts.address,
      msg_timestamp: new Date().getTime(),
    });
  } catch (error) {
    logger.log('Error in wallet address creation', error);
  }
};
