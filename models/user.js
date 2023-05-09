"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post);
      User.hasMany(models.Article);
      User.hasMany(models.PostLike);
      User.hasMany(models.PostComment);
      User.hasMany(models.ArticleLike);
      User.hasMany(models.ArticleComment);
      User.hasMany(models.ArticleBookmark);
      User.hasMany(models.PostCommentReply);
      User.hasMany(models.Appointment);
      User.hasMany(models.Package);
      User.hasMany(models.Product);
      User.hasMany(models.Timetable);
      User.hasMany(models.ProductWishlist);
      User.hasMany(models.Order);

      User.hasMany(models.Follower, {
        as: "followee",
        foreignKey: "followee_id"
      });
      User.hasMany(models.Follower, {
        as: "follower",
        foreignKey: "follower_id"
      });
      User.belongsTo(models.Profession);
    }
  }
  User.init(
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
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Any gender"),
        allowNull: true
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      professionId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      hospital: {
        type: DataTypes.STRING,
        allowNull: true
      },
      licence: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM(
          "Patient",
          "Doctor",
          "Pharmacy",
          "Hospital",
          "Fire & Rescue",
          "Nurse"
        ),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      scopes: {
        followersCount() {
          return {
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "(select count (*) from Followers where followee_id = User.id)"
                  ),

                  "followers_count"
                ]
              ]
            }
          };
        },
        articlesCount() {
          return {
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "(select count (*) from Articles where userId = User.id)"
                  ),
                  "articles_count"
                ]
              ]
            }
          };
        },
        postsCount() {
          return {
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "(select count (*) from Posts where userId = User.id)"
                  ),
                  "posts_count"
                ]
              ]
            }
          };
        },
        checkIfIFollow(userId) {
          return {
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "(exists( select * from Followers where follower_id =" +
                      userId +
                      " and followee_id = User.id))"
                  ),
                  "following"
                ]
              ]
            }
          };
        }
      },
      modelName: "User"
    }
  );
  return User;
};
