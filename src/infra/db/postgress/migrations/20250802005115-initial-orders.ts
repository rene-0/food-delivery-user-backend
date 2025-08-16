import { DataTypes, QueryInterface } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Orders', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('canceled', 'pending', 'accepted', 'done'),
        allowNull: false,
      },
      productId: {
        type: DataTypes.BIGINT,
        autoIncrement: false,
        allowNull: false,
        references: {
          model: 'Users', // nome da tabela, não o nome do modelo
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
    await queryInterface.dropTable('Orders')
  },
}
