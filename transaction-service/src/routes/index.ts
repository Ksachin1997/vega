import { createWallet } from '../controllers/createWallet';
import { mintToken } from '../controllers/mintToken';
import express from 'express';
import validate from '../middlewares/validation';
import {
  burnTokenSchema,
  createWalletSchema,
  hotWalletSchema,
  mintTokenSchema,
  moveTokenSchema,
  transactionBody,
} from '../middlewares/validation/schema';
import { moveToken, updateTransaction } from '../controllers/moveToken';
import { burnToken } from '../controllers/burnToken';
import { createHotWallet } from '../controllers/hotWallet';

const router: express.Router = express.Router();

router.post('/wallet/create', validate(createWalletSchema), createWallet);
router.post('/token/mint', validate(mintTokenSchema), mintToken);
router.post('/token/transfer', validate(moveTokenSchema), moveToken);
router.post('/token/burn', validate(burnTokenSchema), burnToken);
router.post(
  '/update/transferStatus',
  validate(transactionBody),
  updateTransaction
);
router.get('/wapi/chains/address', validate(hotWalletSchema), createHotWallet);

export default router;
