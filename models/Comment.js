const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

<<<<<<< HEAD:models/Posts.js
class Project extends Model { }
=======
class Comment extends Model { }
>>>>>>> b3c72136611a4f5996688eb997b21234741bbe9a:models/Comment.js

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
<<<<<<< HEAD:models/Posts.js
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_text: {
=======
    comment_text: {
>>>>>>> b3c72136611a4f5996688eb997b21234741bbe9a:models/Comment.js
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
<<<<<<< HEAD:models/Posts.js

=======
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
>>>>>>> b3c72136611a4f5996688eb997b21234741bbe9a:models/Comment.js
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
