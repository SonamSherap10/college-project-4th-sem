module.exports = (sequelize, Sequelize) => {
  const UserQualifications = sequelize.define('UserQualifications', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    image1: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image4: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image5: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image6: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image7: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image8: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image9: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image10: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image11: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image12: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image13: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image14: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image15: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return UserQualifications;
};
