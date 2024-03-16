const db = require("../../model/index");
const User = db.User;
const UserQualifications = db.UserQualifications;
const Booking = db.Booking;
const schedule = require("node-schedule");

exports.addQualifications = async(req,res)=>{
 const userId = req.user[0].id
 const qualifications = req.files.map(file => {
  return process.env.BACKEND_URL + file.filename
})
if(qualifications.length <1){
  return res.status(404).json({
    message: "Please upload more qualifications to your name",
  });
}
 await UserQualifications.create({
  userId,
  image1: qualifications[0] || null,
  image2: qualifications[1] || null,
  image3: qualifications[2] || null,
  image4: qualifications[3] || null,
  image5: qualifications[4] || null,
  image6: qualifications[5] || null,
  image7: qualifications[6] || null,
  image8: qualifications[7] || null,
  image9: qualifications[8] || null,
  image10: qualifications[9] || null,
  image11: qualifications[10] || null,
  image12: qualifications[11] || null,
  image13: qualifications[12] || null,
  image14: qualifications[13] || null,
  image15: qualifications[14] || null,
})
 return res.status(200).json({
  message: "Qualifications uploaded successfully"
 })
}



exports.viewBookingRequest = async (req, res) => {
  const employeeId = req.user[0].id;
  const allBookings = await Booking.findAll({
    where: { employeeId, isAccepted: "Pending" },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "paymentStaus",
        "workStatus",
        "rating",
        "comment",
        "id",
        "employeeId",
      ],
    },
  });
  if (allBookings.length == 0) {
    return res.status(404).json({
      message: "No pending bookings found",
    });
  }
  return res.status(200).json({
    data: allBookings,
  });
};

exports.settleBookingRequest = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide booking id",
    });
  }
  const { willAccept } = req.body;
  const booking = await Booking.findByPk(id);
  if (!booking) {
    return res.status(404).json({
      message: "Booking not found",
    });
  }
  if(booking.isAccepted != "Pending") {
    return res.status(404).json({
      message: "You have already settled this request"
    });
  }
  const startingDate = booking.from;
  //   console.log(startingDate)

  //   // Current time
  // const currentTime = new Date();

  // // Add 1 minute to the current time
  // const targetTime = new Date(currentTime.getTime() + 1 * 60 * 1000);

  // console.log(targetTime ,"dajd");

  if (willAccept == "Accept") {
    await booking.update({ isAccepted: "Accepted" });
    async function updateStatus() {
      const Employee = await User.findAll({
        where: { id: booking.employeeId },
      });
      Employee[0].bookingStatus = "Booked";
      await Employee[0].save();

      booking.workStatus = "InProgress";
      await booking.save();
      console.log("nah id update");
    }
    schedule.scheduleJob(startingDate, updateStatus);

    return res.status(200).json({
      message: "You have been booked successfully",
    });
  }
  return res.status(404).json({
    message: "Booking not accepted",
  });
};

exports.viewBookedRequests = async(req,res)=>{
  const employeeId = req.user[0].id;
  console.log(employeeId)
  const bookings = await Booking.findAll({
    where:{
      employeeId,
      isAccepted : "Accepted"
    },
  attributes: { exclude: ['createdAt','updatedAt','paymentStaus','workStatus','rating','comment','id','employeeId'] }
  })
  if(bookings.length ==0){
    return res.status(404).json({
      message : "No Bookings found"
    })
  }
  return res.status(200).json({
    data : bookings
  })
}


exports.workCompletion = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  if (!bookingId) {
    return res.status(404).json({
      message: "Please provide id",
    });
  }
  
  const workFound = await Booking.findByPk(bookingId);
  
  const currentDate = new Date();
  const currentTime = new Date(currentDate.getTime());
  
  const date1 = new Date(currentTime);
  const date2 = new Date(workFound.from);
  const differenceInMilliseconds = date1 - date2;

  const workDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const cashMoney = workDays * workFound.wagePerDay;

  if (!workFound) {
    return res.status(404).json({
      message: "Work not found",
    });
  }

  if (workFound.workStatus != "InProgress") {
    return res.status(404).json({
      message: "Work is not in progress",
    });
  }

  if (status != "Done") {
    workFound.isAccepted = "Concluded",
    workFound.workStatus = "Dropped";
    await workFound.save();
    return res.status(200).json({
      message: "Work has been left incomplete",
    });
  }
  
 
  workFound.isAccepted = "Concluded";
  workFound.workStatus = "Completed";
  workFound.completedIn = currentTime;
  workFound.payment = cashMoney;
  await workFound.save();
  return res.status(200).json({
    message: "Work has been completed. Waiting for the client for verification",
  });
};
