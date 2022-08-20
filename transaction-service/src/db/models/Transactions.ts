import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TransactionsAttributes {
  id: number;
  seq_no?: number;
  error: boolean;
  txid?: string;
  coin?: string;
  reference_id?: string;
  client_reference_id?: string;
  status?:
    | 'REQUESTED'
    | 'REJECTED'
    | 'FAILED'
    | 'PROCESSED'
    | 'DEPOSIT_REJECTED';
  value?: number;
  tx_type?: string;
  main_account_balance?: number;
  tx_fee?: number;
  tx_remarks?: string;
  status_url?: string;
  client_id?: string;
  user_email?: string;
  user_id?: string;
  deposit_address?: string;
  from_address?: string;
  tx_desc?: string;
  tx_sub_status?: string;
  is_frozen?: boolean;
  deposit_type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TransactionsPk = 'id';
export type TransactionsId = Transactions[TransactionsPk];
export type TransactionsOptionalAttributes =
  | 'id'
  | 'seq_no'
  | 'txid'
  | 'coin'
  | 'reference_id'
  | 'client_reference_id'
  | 'status'
  | 'value'
  | 'tx_type'
  | 'main_account_balance'
  | 'tx_fee'
  | 'tx_remarks'
  | 'status_url'
  | 'client_id'
  | 'user_email'
  | 'user_id'
  | 'deposit_address'
  | 'from_address'
  | 'tx_desc'
  | 'tx_sub_status'
  | 'is_frozen'
  | 'deposit_type'
  | 'createdAt'
  | 'updatedAt';
export type TransactionsCreationAttributes = Optional<
  TransactionsAttributes,
  TransactionsOptionalAttributes
>;

export class Transactions
  extends Model<TransactionsAttributes, TransactionsCreationAttributes>
  implements TransactionsAttributes
{
  id!: number;
  seq_no?: number;
  error!: boolean;
  txid?: string;
  coin?: string;
  reference_id?: string;
  client_reference_id?: string;
  status?:
    | 'REQUESTED'
    | 'REJECTED'
    | 'FAILED'
    | 'PROCESSED'
    | 'DEPOSIT_REJECTED';
  value?: number;
  tx_type?: string;
  main_account_balance?: number;
  tx_fee?: number;
  tx_remarks?: string;
  status_url?: string;
  client_id?: string;
  user_email?: string;
  user_id?: string;
  deposit_address?: string;
  from_address?: string;
  tx_desc?: string;
  tx_sub_status?: string;
  is_frozen?: boolean;
  deposit_type?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Transactions {
    return Transactions.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        seq_no: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        error: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        txid: {
          type: DataTypes.STRING(64),
          allowNull: true,
        },
        coin: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        reference_id: {
          type: DataTypes.STRING(64),
          allowNull: true,
        },
        client_reference_id: {
          type: DataTypes.STRING(64),
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM(
            'REQUESTED',
            'REJECTED',
            'FAILED',
            'PROCESSED',
            'DEPOSIT_REJECTED'
          ),
          allowNull: true,
        },
        value: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        tx_type: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        main_account_balance: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        tx_fee: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        tx_remarks: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        status_url: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        client_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        user_email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        user_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        deposit_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        from_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tx_desc: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tx_sub_status: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        is_frozen: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        deposit_type: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'Transactions',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'Transactions_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
  }
}
