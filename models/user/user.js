import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '사용자 이름',
                },
            },
            {
                modelName: 'User',
                tableName: 'users',
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
        db.User.hasMany(db.EmSupport);
    }
}
export default User;
