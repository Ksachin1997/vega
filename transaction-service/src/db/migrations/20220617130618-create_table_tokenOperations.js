'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('TokenOperations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      msg_id: Sequelize.STRING,
      tokenOperationType: Sequelize.ENUM('TRANSFER','MINT','BURN'),
      transactionHash: Sequelize.STRING,
      transactionStatus: Sequelize.ENUM('PENDING', 'FAILED', 'SUCCESS'),
      wallet_address: Sequelize.STRING,
      source_address: Sequelize.STRING,
      destination_address: Sequelize.STRING,
      token_id: Sequelize.STRING,
      ref_id: Sequelize.STRING,
      amount: Sequelize.DOUBLE,
      decimals: Sequelize.INTEGER,
      isNewTokenMint: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('TokenOperations')
  }
};
