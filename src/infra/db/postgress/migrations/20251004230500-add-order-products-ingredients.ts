import { DataTypes, QueryInterface } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('OrderProductsIngredients', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      orderProductId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'OrderProducts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ingredientId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'Ingredients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('OrderProductsIngredients')
  },
}
