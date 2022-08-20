import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export const web3: Web3 = new Web3(
  new Web3.providers.HttpProvider(
    process.env.INFURA_URL ||
      'https://rinkeby.infura.io/v3/7bdf1770880d450dae1c70b7b1c9ed2e'
  )
);

export const initializeContract = (
  contractAddress: string,
  contractABI: AbiItem[]
) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
