import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface GeneratedHotWalletAttributes {
  id: number;
  generatedAddress?: string;
  clientId?: string;
  coin?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GeneratedHotWalletPk = 'id';
export type GeneratedHotWalletId = GeneratedHotWallet[GeneratedHotWalletPk];
export type GeneratedHotWalletOptionalAttributes =
  | 'id'
  | 'generatedAddress'
  | 'clientId'
  | 'coin'
  | 'createdAt'
  | 'updatedAt';
export type GeneratedHotWalletCreationAttributes = Optional<
  GeneratedHotWalletAttributes,
  GeneratedHotWalletOptionalAttributes
>;

export class GeneratedHotWallet
  extends Model<
    GeneratedHotWalletAttributes,
    GeneratedHotWalletCreationAttributes
  >
  implements GeneratedHotWalletAttributes
{
  id!: number;
  generatedAddress?: string;
  clientId?: string;
  coin?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof GeneratedHotWallet {
    return GeneratedHotWallet.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        generatedAddress: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        clientId: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        coin: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'GeneratedHotWallet',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'GeneratedHotWallet_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
  }
}
