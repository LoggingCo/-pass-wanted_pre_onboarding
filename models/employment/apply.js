import { Model } from 'sequelize';

class EmApply extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'EmApply',
                tableName: 'emapplys',
                charset: 'utf8',
                collate: 'utf8_general_ci',
                timestamps: true,
                createdAt: true,
                updatedAt: false,
                paranoid: false,
                sequelize,
            },
        );
    }
    static associate(db) {
        db.EmApply.belongsTo(db.EmPost);
        db.EmApply.belongsTo(db.User);
    }
}
export default EmApply;
