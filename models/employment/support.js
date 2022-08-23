import { Model } from 'sequelize';

class EmSupport extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'EmSupport',
                tableName: 'emsupports',
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
        db.EmSupport.belongsTo(db.EmPost);
        db.EmSupport.belongsTo(db.User);
    }
}
export default EmSupport;
