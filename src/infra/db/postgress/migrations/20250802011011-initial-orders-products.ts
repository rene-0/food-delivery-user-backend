import { DataTypes, QueryInterface } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('OrderProducts', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        references: {
          model: 'Orders', // nome da tabela, não o nome do modelo
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        references: {
          model: 'Products', // nome da tabela, não o nome do modelo
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('OrderProducts')
  },
}
