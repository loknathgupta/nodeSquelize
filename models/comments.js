module.exports = (sequelize, type) => {
    let comments = sequelize.define('comments', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id : type.INTEGER,
        comment: type.STRING
    });
    comments.associate = (models) => {
      comments.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'CASCADE'
      });
    }
    return comments;
}