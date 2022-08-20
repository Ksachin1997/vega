import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TokenOperationsAttributes {
  id: number;
  msg_id?: string;
  tokenOperationType?: 'TRANSFER' | 'MINT' | 'BURN';
  transactionHash?: string;
  transactionStatus?: 'PENDING' | 'FAILED' | 'SUCCESS';
  wallet_address?: string;
  source_address?: string;
  destination_address?: string;
  token_id?: string;
  ref_id?: string;
  amount?: number;
  decimals?: number;
  isNewTokenMint?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TokenOperationsPk = 'id';
export type TokenOperationsId = TokenOperations[TokenOperationsPk];
export type TokenOperationsOptionalAttributes =
  | 'id'
  | 'msg_id'
  | 'tokenOperationType'
  | 'transactionHash'
  | 'transactionStatus'
  | 'wallet_address'
  | 'source_address'
  | 'destination_address'
  | 'token_id'
  | 'ref_id'
  | 'amount'
  | 'decimals'
  | 'isNewTokenMint'
  | 'createdAt'
  | 'updatedAt';
export type TokenOperationsCreationAttributes = Optional<
  TokenOperationsAttributes,
  TokenOperationsOptionalAttributes
>;

export class TokenOperations
  extends Model<TokenOperationsAttributes, TokenOperationsCreationAttributes>
  implements TokenOperationsAttributes
{
  id!: number;
  msg_id?: string;
  tokenOperationType?: 'TRANSFER' | 'MINT' | 'BURN';
  transactionHash?: string;
  transactionStatus?: 'PENDING' | 'FAILED' | 'SUCCESS';
  wallet_address?: string;
  source_address?: string;
  destination_address?: string;
  token_id?: string;
  ref_id?: string;
  amount?: number;
  decimals?: number;
  isNewTokenMint?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TokenOperations {
    return TokenOperations.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        msg_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tokenOperationType: {
          type: DataTypes.ENUM('TRANSFER', 'MINT', 'BURN'),
          allowNull: true,
        },
        transactionHash: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        transactionStatus: {
          type: DataTypes.ENUM('PENDING', 'FAILED', 'SUCCESS'),
          allowNull: true,
        },
        wallet_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        source_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        destination_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        token_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ref_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        amount: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        decimals: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        isNewTokenMint: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'TokenOperations',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'TokenOperations_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
  }
}
