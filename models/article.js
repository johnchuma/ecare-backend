"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User);
      Article.belongsTo(models.ArticleCategory);
      Article.hasMany(models.ArticleImage);
      Article.hasMany(models.ArticleLike);
      Article.hasMany(models.ArticleComment);
      Article.hasMany(models.ArticleBookmark);

      // define association here
    }
  }
  Article.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      articleCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },

    {
      sequelize,
      scopes: {
        checkIfILiked(userId) {
          return {
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "exists(select * from ArticleBookmarks as bookmark where bookmark.userId = userId and bookmark.articleId = Article.id)"
                  ),
                  "isBookmarked"
                ]
              ]
            }
          };
        }
      },
      modelName: "Article"
    }
  );
  return Article;
};
