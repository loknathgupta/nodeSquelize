module.exports = (sequelize, dataType) => {
    let users = sequelize.define('users', {
        id: {
          type: dataType.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: dataType.STRING,
        email: {
            type: dataType.STRING,
            allowNull: false,
            unique :true
        },
        password: {
            type: dataType.STRING,
            allowNull: false,
        },
        dp:{
            type: dataType.STRING(500),
            comment :'The profile picture'
        },
        status: {
            type:   dataType.ENUM,
            allowNull: false,
            values: ['E', 'D', 'B']
        }
    });

    users.associate = (models) => {
        users.hasMany(models.comments, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });
    }
    return users;
}