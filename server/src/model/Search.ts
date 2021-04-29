import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const Search = sequelize.define('Search', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  term: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedItem: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  timeSinceFirstLoad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
