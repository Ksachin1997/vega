'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Deposits', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      seq_no: Sequelize.INTEGER,
      error: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      txid: Sequelize.STRING(64),
      coin: Sequelize.STRING,
      reference_id: Sequelize.STRING(64),
      client_reference_id: Sequelize.STRING(64),
      status: Sequelize.ENUM('REQUESTED','REJECTED','FAILED','PROCESSED','DEPOSIT_REJECTED'),
      value: Sequelize.DOUBLE,
      tx_type: Sequelize.STRING,
      main_account_balance: Sequelize.DOUBLE,
      tx_fee: Sequelize.DOUBLE,
      tx_remarks: Sequelize.STRING,
      status_url: Sequelize.STRING,
      client_id: Sequelize.STRING,
      user_email: Sequelize.STRING,
      user_id: Sequelize.STRING,
      deposit_address: Sequelize.STRING,
      from_address: Sequelize.STRING,
      tx_desc: Sequelize.STRING,
      tx_sub_status: Sequelize.STRING,
      is_frozen: Sequelize.BOOLEAN,
      deposit_type: Sequelize.STRING,
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
     await queryInterface.dropTable('Deposits')
  }
};
