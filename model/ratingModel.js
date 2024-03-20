module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define('Rating', {
    empId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    overallRating:{
      type: Sequelize.INTEGER,
    defaultValue : 0
    },
    rating:{
    type: Sequelize.INTEGER,
    defaultValue : 0
    },
    completedJobs:{
     type : Sequelize.INTEGER,
     defaultValue : 0
    }
  });

  return Rating;
};
