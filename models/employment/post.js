import Sequelize, { Model } from 'sequelize';

class EmPost extends Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    comment: '채용내용',
                },
                skills: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '채용스킬',
                },
                position: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    comment: '포지션',
                },
                compensation: {
                    type: Sequelize.INTEGER,
                    comment: '채용보상금',
                    defaultValue: 0,
                },
            },
            {
                modelName: 'EmPost',
                tableName: 'emposts',
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
        db.EmPost.hasMany(db.EmSupport);
        db.EmPost.belongsTo(db.Company);
    }
}
export default EmPost;
