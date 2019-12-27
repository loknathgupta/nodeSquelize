module.exports = (sequelize, dataType) => {
    let comments = sequelize.define('comments', {
        id: {
          type: dataType.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id : dataType.INTEGER,
        comment: dataType.STRING
    });
    comments.associate = (models) => {
      comments.belongsTo(models.users, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'CASCADE'
      });
    }
    return comments;
}