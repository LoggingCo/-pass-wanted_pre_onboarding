import Sequelize, { Model } from 'sequelize';

class Company extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    unique: true,
                    comment: '회사명',
                },
                contry: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '국가',
                },
                region: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '지역',
                },
            },
            {
                modelName: 'Company',
                tableName: 'companys',
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
        db.Company.hasMany(db.EmPost);
    }
}
export default Company;
