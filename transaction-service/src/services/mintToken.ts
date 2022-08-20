import { Contract } from 'web3-eth-contract/types';
import { parseSafe, serviceResponse } from '../utils';
import { initializeContract, web3 } from '../utils/contracts';
import contractABI from '../artifact/erc20.abi.json';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';
import { getTokenAddress } from '../classes/tokenDetails';
import { createTokenOperationMint } from '../classes/tokenOperations';

dotenv.config();

export const mintTokenService = async (
  msg_id: string,
  msg_timestamp: number,
  amount: number,
  ref_id: string,
  decimals: number,
  create_new: boolean,
  wallet_address: string,
  token_id: string
) => {
  console.log(process.env.PRIVATE_KEY, 'env');

  web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || '');

  let contractInstance: Contract;
  try {
    const tokenAddress = await getTokenAddress(token_id);
    const tokenContractAddress =
      (tokenAddress &&
        tokenAddress.data &&
        tokenAddress.data.dataValues &&
        tokenAddress.data.dataValues.token_address) ||
      '';
    contractInstance = initializeContract(
      tokenContractAddress,
      parseSafe(contractABI)
    );
    const response = await contractInstance.methods
      .mint(wallet_address, amount)
      .send({ from: process.env.SENDER_ADDRESS || '', gasLimit: 50000 });

    await createTokenOperationMint(
      msg_id,
      amount,
      ref_id,
      wallet_address,
      token_id,
      decimals,
      create_new
    );

    return serviceResponse(true, {
      msg_id,
      msg_timestamp,
      amount,
      ref_id,
      decimals,
      create_new,
      wallet_address,
      token_id,
      response,
    });
  } catch (error: any) {
    console.log(error, 'tt');
    logger.log('Error in mint token', error);
    return {
      status: false,
      data: {},
      error: error.message,
    };
  }
};
