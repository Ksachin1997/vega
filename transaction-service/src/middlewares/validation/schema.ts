import Joi from 'joi';

/**
 * Joi schema used by the validation middleware
 */
export const createWalletSchema = Joi.object({
  msg_id: Joi.string().required(),
  account_id: Joi.string().required(),
  type: Joi.string().required(),
  msg_timestamp: Joi.number().required(),
});
export const mintTokenSchema = Joi.object({
  msg_id: Joi.string().required(),
  wallet_address: Joi.string().required(),
  token_id: Joi.string().required(),
  amount: Joi.number().required(),
  ref_id: Joi.string().required(),
  decimals: Joi.number().required(),
  create_new: Joi.boolean().required(),
  msg_timestamp: Joi.number().required(),
});
export const burnTokenSchema = Joi.object({
  msg_id: Joi.string().required(),
  wallet_address: Joi.string().required(),
  token_id: Joi.string().required(),
  amount: Joi.number().required(),
  ref_id: Joi.string().required(),
  msg_timestamp: Joi.number().required(),
});
export const moveTokenSchema = Joi.object({
  msg_id: Joi.string().required(),
  source_address: Joi.string().required(),
  destination_address: Joi.string().required(),
  msg_timestamp: Joi.number().required(),
  amount: Joi.number().required(),
  ref_id: Joi.string().required(),
  token_id: Joi.string().required(),
});

export const hotWalletSchema = Joi.object({
  clientId: Joi.string().required(),
  coin: Joi.string().required(),
});

export const transactionBody = Joi.object({
  transactionHash: Joi.string().required(),
  senderAddress: Joi.string().required(),
  receiverAddress: Joi.string().required(),
  tokenAmount: Joi.number().positive().integer(),
  statusIndex: Joi.string().required(),
});
