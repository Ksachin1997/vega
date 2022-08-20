import { serviceResponse } from '../utils';
import { logger } from '../utils/logger';
import Web3 from 'web3';
import axios from 'axios';
import { getTokenAddress, getTokenBlockChain } from '../classes/tokenDetails';
import {
  getHotWalletAddressForClient,
  createHotWallet,
} from '../classes/generatedHotWallet';

export const createHotWalletService = async (
  clientId: string,
  coin: string,
  isNew: boolean
) => {
  try {
    const tokenAddress = await getTokenAddress(coin);
    const tokenContractAddress =
      (tokenAddress &&
        tokenAddress.data &&
        tokenAddress.data.dataValues &&
        tokenAddress.data.dataValues.token_address) ||
      '';

    const tokenChain = await getTokenBlockChain(coin);
    const tokenBlockChain =
      (tokenChain &&
        tokenChain.data &&
        tokenChain.data.dataValues &&
        tokenChain.data.dataValues.blockChain) ||
      '';

    const blockScannerUrl = process.env.BLOCKSCANNER_URL || '';

    const result = {
      depositFee: 0.0,
      address: '',
      is_created: true,
    };

    if (isNew) {
      const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546');
      const accounts = web3.eth.accounts.create();

      result.address = accounts && accounts.address ? accounts.address : '';

      await createHotWallet(result.address, coin, clientId);
    } else {
      const hotWalletAddress = await getHotWalletAddressForClient(
        coin,
        clientId
      );

      const address =
        (hotWalletAddress &&
          hotWalletAddress.data &&
          hotWalletAddress.data.length > 0 &&
          hotWalletAddress.data[0].dataValues &&
          hotWalletAddress.data[0].dataValues.generatedAddress) ||
        '';

      result.address = address;
      result.is_created = false;
    }

    await axios.post(blockScannerUrl, {
      topic:
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      address: result.address,
      contractAddress: tokenContractAddress,
      blockChain: tokenBlockChain,
    });

    return serviceResponse(true, result);
  } catch (error: any) {
    logger.log('Error in create hot wallet', error);
    return {
      status: false,
      data: {},
      error: error.message,
    };
  }
};
