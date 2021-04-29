import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/access_now`
);

export const startDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.log('Cannot connect to database', err);
  }
};
