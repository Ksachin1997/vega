import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TokenDetailsAttributes {
  id: number;
  token_address?: string;
  token_id?: string;
  officialSite?: string;
  token_name?: string;
  blockChain?: string;
  decimals?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TokenDetailsPk = 'id';
export type TokenDetailsId = TokenDetails[TokenDetailsPk];
export type TokenDetailsOptionalAttributes =
  | 'id'
  | 'token_address'
  | 'token_id'
  | 'officialSite'
  | 'token_name'
  | 'blockChain'
  | 'decimals'
  | 'createdAt'
  | 'updatedAt';
export type TokenDetailsCreationAttributes = Optional<
  TokenDetailsAttributes,
  TokenDetailsOptionalAttributes
>;

export class TokenDetails
  extends Model<TokenDetailsAttributes, TokenDetailsCreationAttributes>
  implements TokenDetailsAttributes
{
  id!: number;
  token_address?: string;
  token_id?: string;
  officialSite?: string;
  token_name?: string;
  blockChain?: string;
  decimals?: number;
  createdAt?: Date;
  updatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TokenDetails {
    return TokenDetails.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        token_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        token_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        officialSite: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        token_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        blockChain: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        decimals: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'TokenDetails',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'TokenDetails_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
  }
}
