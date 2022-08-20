import { Contract } from 'web3-eth-contract/types';
import { parseSafe, serviceResponse } from '../utils';
import { initializeContract, web3 } from '../utils/contracts';
import contractABI from '../artifact/erc20.abi.json';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';
import { getTokenAddress } from '../classes/tokenDetails';
import { createTokenOperationBurn } from '../classes/tokenOperations';

dotenv.config();

export const burnTokenService = async (
  msg_id: string,
  msg_timestamp: number,
  amount: number,
  ref_id: string,
  wallet_address: string,
  token_id: string
) => {
  try {
    const tokenAddress = await getTokenAddress(token_id);
    const tokenContractAddress =
      (tokenAddress &&
        tokenAddress.data &&
        tokenAddress.data.dataValues &&
        tokenAddress.data.dataValues.token_address) ||
      '';

    web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || '');

    const contractInstance: Contract = initializeContract(
      tokenContractAddress || '',
      parseSafe(contractABI)
    );
    const response = await contractInstance.methods
      .burn(wallet_address, amount)
      .send({ from: process.env.SENDER_ADDRESS || '', gasLimit: 50000 });

    await createTokenOperationBurn(
      msg_id,
      amount,
      ref_id,
      wallet_address,
      token_id
    );

    return serviceResponse(true, {
      msg_id,
      msg_timestamp,
      amount,
      ref_id,
      wallet_address,
      token_id,
      response,
    });
  } catch (error: any) {
    logger.log('Error in burn token', error);
    return {
      status: false,
      data: {},
      error: error.message,
    };
  }
};
