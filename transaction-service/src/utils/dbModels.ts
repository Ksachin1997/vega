import { sequelize } from '../config/sequelize';
import { initModels } from '../db/models/init-models';

export const dbModels = initModels(sequelize);
