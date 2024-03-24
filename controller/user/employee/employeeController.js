const db = require("../../../model/index");
const User = db.User;
const UserQualifications = db.UserQualifications;
const Booking = db.Booking;
const Payment = db.Payment;
const schedule = require("node-schedule");
const fs = require("fs");

exports.addQualifications = async (req, res) => {
  const userId = req.user[0].id;
  const qualifications = req.files.map((file) => {
    return process.env.BACKEND_URL + file.filename;
  });

  if (qualifications.length < 1) {
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
  });
  return res.status(200).json({
    message: "Qualifications uploaded successfully",
  });
};

exports.updateQualification = async (req, res) => {
  const userId = req.user[0].id;
  const {imgName} = req.body;

  if (!imgName) {
    return res.status(400).json({ error: "Image name is required" });
  }

  let userQualifications = await UserQualifications.findAll({
    where: { userId },
  });

  if (userQualifications.length == 0) {
    return res.status(404).json({
      message: "no data found",
    });
  }

    const qualification = userQualifications[0];

    if (qualification[imgName] === null) {
      qualification[imgName] =process.env.BACKEND_URL + req.file.filename; 
    }
     else {
      const oldImage = qualification[imgName];
      const lengthToCut = process.env.BACKEND_URL.length;
      const finalFilePathAfterCut = oldImage.slice(lengthToCut);
    
      if (req.file && req.file.filename) {
        fs.unlink("./uploads/" + finalFilePathAfterCut, (err) => {
          if (err) {
            console.log("error deleting file", err);
          } else {
            console.log("file deleted successfully");
          }
        });
        qualification[imgName] = process.env.BACKEND_URL + req.file.filename;
      }}
          
    await qualification.save();
    res.status(200).json({ message: `${imgName} updated successfully` });
  }



exports.deleteQualification = async (req, res) => {
  const userId = req.user[0].id;
  const {imgName} = req.body;

  if (!imgName) {
    return res.status(400).json({ error: 'Image name is required' });
  }

  const userQualifications = await UserQualifications.findAll({ where: { userId } });

  if (!userQualifications || userQualifications.length === 0) {
    return res.status(404).json({ error: 'User qualifications not found' });
  }

  const qualification = userQualifications[0];

    if (qualification[imgName] == null) {
      return res.status(404).json({
        message: `${imgName} not found`,
      });
    }else{
      const oldImage = qualification[imgName];
      const lengthToCut = process.env.BACKEND_URL.length;
      const finalFilePathAfterCut = oldImage.slice(lengthToCut);
      console.log(finalFilePathAfterCut)
        fs.unlink("./uploads/" + finalFilePathAfterCut, (err) => {
          if (err) {
            console.log("error deleting file", err);
          } else {
            console.log("file deleted successfully");
          }
        });
      
      qualification[imgName] = null;
      await qualification.save();
    }
  
  res.status(200).json({ message: ` ${imgName} deleted successfully` });
};


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
  const employeeId = req.user[0].id;

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

  if (employeeId != booking.employeeId) {
    return res.status(400).json({
      message: "You are not allowed to do this",
    });
  }

  if (booking.isAccepted != "Pending") {
    return res.status(404).json({
      message: "You have already settled this request",
    });
  }
  const startingDate = booking.workDay;
  // console.log(startingDate)

  //   // Current time
  // const currentTime = new Date();

  // // Add 1 minute to the current time
  // const targetTime = new Date(currentTime.getTime() + 2 * 60 * 1000);

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

exports.viewBookedRequests = async (req, res) => {
  const employeeId = req.user[0].id;
  console.log(employeeId);
  const bookings = await Booking.findAll({
    where: {
      employeeId,
      isAccepted: "Accepted",
    },
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
  if (bookings.length == 0) {
    return res.status(404).json({
      message: "No Bookings found",
    });
  }
  return res.status(200).json({
    data: bookings,
  });
};

exports.workCompletion = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  const employeeId = req.user[0].id;

  if (!bookingId) {
    return res.status(404).json({
      message: "Please provide id",
    });
  }

  const workFound = await Booking.findByPk(bookingId);

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

  if (employeeId != workFound.employeeId) {
    return res.status(400).json({
      message: "You are not allowed to do this",
    });
  }
  const updateStatus = await User.findByPk(employeeId);
  updateStatus.bookingStatus = "Available";
  updateStatus.save();

  //add the payment details to paymnet database
  const cashMoney = workFound.wagePerDay;
  const addedCharge = (5 / 100) * cashMoney;
  const totalCharge = cashMoney + addedCharge;

  if (status != "Done") {
    (workFound.isAccepted = "Concluded"), (workFound.workStatus = "Dropped");
    await workFound.save();
    return res.status(200).json({
      message: "Work has been left incomplete",
    });
  }

  workFound.isAccepted = "Concluded";
  workFound.workStatus = "Completed";
  await workFound.save();

  //add the payment details to paymnet database
  const paymentFound = await Payment.findAll({ where: { bookingId } });

  if (paymentFound.length == 0) {
    const payment = await Payment.create({
      bookingId: bookingId,
      payment: cashMoney,
      addedCharge,
      totalPayment: totalCharge,
    });

    if (payment) {
      return res.status(200).json({
        message:
          "Work has been completed. Waiting for the client for verification",
      });
    } else {
      return res.status(200).json({
        message: "Something went wrong",
      });
    }
  }
};
