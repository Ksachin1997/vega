import type { Sequelize } from 'sequelize';
import { Deposits as _Deposits } from './Deposits';
import type {
  DepositsAttributes,
  DepositsCreationAttributes,
} from './Deposits';
import { GeneratedHotWallet as _GeneratedHotWallet } from './GeneratedHotWallet';
import type {
  GeneratedHotWalletAttributes,
  GeneratedHotWalletCreationAttributes,
} from './GeneratedHotWallet';
import { SequelizeMeta as _SequelizeMeta } from './SequelizeMeta';
import type {
  SequelizeMetaAttributes,
  SequelizeMetaCreationAttributes,
} from './SequelizeMeta';
import { TokenDetails as _TokenDetails } from './TokenDetails';
import type {
  TokenDetailsAttributes,
  TokenDetailsCreationAttributes,
} from './TokenDetails';
import { TokenOperations as _TokenOperations } from './TokenOperations';
import type {
  TokenOperationsAttributes,
  TokenOperationsCreationAttributes,
} from './TokenOperations';

export {
  _Deposits as Deposits,
  _GeneratedHotWallet as GeneratedHotWallet,
  _SequelizeMeta as SequelizeMeta,
  _TokenDetails as TokenDetails,
  _TokenOperations as TokenOperations,
};

export type {
  DepositsAttributes,
  DepositsCreationAttributes,
  GeneratedHotWalletAttributes,
  GeneratedHotWalletCreationAttributes,
  SequelizeMetaAttributes,
  SequelizeMetaCreationAttributes,
  TokenDetailsAttributes,
  TokenDetailsCreationAttributes,
  TokenOperationsAttributes,
  TokenOperationsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Deposits = _Deposits.initModel(sequelize);
  const GeneratedHotWallet = _GeneratedHotWallet.initModel(sequelize);
  const SequelizeMeta = _SequelizeMeta.initModel(sequelize);
  const TokenDetails = _TokenDetails.initModel(sequelize);
  const TokenOperations = _TokenOperations.initModel(sequelize);

  return {
    Deposits: Deposits,
    GeneratedHotWallet: GeneratedHotWallet,
    SequelizeMeta: SequelizeMeta,
    TokenDetails: TokenDetails,
    TokenOperations: TokenOperations,
  };
}
