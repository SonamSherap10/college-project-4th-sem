-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2024 at 06:47 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fix_at_your_fingertips`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `job` varchar(255) NOT NULL,
  `jobDescription` varchar(255) NOT NULL,
  `workDay` datetime NOT NULL,
  `province` enum('Koshi','Madhes','Bagmati','Gandaki','Lumbini','Karnali','Sudurpashchim') NOT NULL,
  `district` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isAccepted` enum('Pending','Accepted','Declined','Concluded') DEFAULT 'Pending',
  `workStatus` enum('Pending','InProgress','Completed','Dropped') DEFAULT 'Pending',
  `wagePerDay` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `completedIn` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `pidx` varchar(255) DEFAULT NULL,
  `payment` int(11) DEFAULT NULL,
  `addedCharge` int(11) DEFAULT NULL,
  `totalPayment` int(11) DEFAULT NULL,
  `paymentStatus` enum('Completed','Pending','Refunded','Expired','User canceled') DEFAULT 'Pending',
  `paymentMethod` enum('Khalti','COD') DEFAULT 'COD',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `overallRating` int(11) DEFAULT 0,
  `rating` int(11) DEFAULT 0,
  `completedJobs` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userqualifications`
--

CREATE TABLE `userqualifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `image4` varchar(255) DEFAULT NULL,
  `image5` varchar(255) DEFAULT NULL,
  `image6` varchar(255) DEFAULT NULL,
  `image7` varchar(255) DEFAULT NULL,
  `image8` varchar(255) DEFAULT NULL,
  `image9` varchar(255) DEFAULT NULL,
  `image10` varchar(255) DEFAULT NULL,
  `image11` varchar(255) DEFAULT NULL,
  `image12` varchar(255) DEFAULT NULL,
  `image13` varchar(255) DEFAULT NULL,
  `image14` varchar(255) DEFAULT NULL,
  `image15` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Client','Employee','Admin') DEFAULT 'Client',
  `jobTitle` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `province` enum('Koshi','Madhes','Bagmati','Gandaki','Lumbini','Karnali','Sudurpashchim') NOT NULL,
  `district` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `Wage` int(11) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT 0,
  `bookingStatus` enum('Available','Booked') DEFAULT 'Available',
  `otp` int(11) DEFAULT NULL,
  `isOtpVerified` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `jobTitle`, `phoneNumber`, `province`, `district`, `city`, `profilePicture`, `description`, `Wage`, `isVerified`, `bookingStatus`, `otp`, `isOtpVerified`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$VBu4afW5UX0JJrC7IMsv4O/wkvPgJligY317hynWanLSHUmspkdAq', 'Admin', 'null', '984204646', '', 'null', 'null', NULL, NULL, NULL, 1, 'Available', NULL, 0, '2024-06-17 03:36:25', '2024-06-17 03:36:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cusid_fk` (`customerId`),
  ADD KEY `emp_fk` (`employeeId`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bookingId` (`bookingId`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `empId` (`empId`);

--
-- Indexes for table `userqualifications`
--
ALTER TABLE `userqualifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userqualifications`
--
ALTER TABLE `userqualifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `cusid_fk` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `emp_fk` FOREIGN KEY (`employeeId`) REFERENCES `users` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `bookingId_fk` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `empId_fk` FOREIGN KEY (`empId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userqualifications`
--
ALTER TABLE `userqualifications`
  ADD CONSTRAINT `userid_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
