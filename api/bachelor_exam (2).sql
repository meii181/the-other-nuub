-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 10:36 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bachelor_exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `contact_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `inquiry_description` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`contact_id`, `full_name`, `email`, `inquiry_description`) VALUES
(2, 'Filo', 'biabia@gmail.com', 'Hi there'),
(3, 'Bia', 'babanca@gmail.com', 'Hi'),
(4, 'Filoftea-Bianca ', 'myangeldankouzo00@gmail.com', 'I would like to speak about an issue to my project.'),
(5, 'Filoftea-Bianca', 'biancagrecu090@gmail.com', 'Hi there, I would like an appointment');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int(11) NOT NULL,
  `meeting_date` date NOT NULL,
  `meeting_time` time NOT NULL,
  `meeting_description` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meeting_id`, `meeting_date`, `meeting_time`, `meeting_description`, `user_id`) VALUES
(27, '0000-00-00', '14:30:00', 'Hi, I\'m booking an appointment as I would like to work with you on a brand new website, which will consist of our business image representation, we\'re looking forward to meeting you and discuss this exciting project.', 42),
(30, '0000-00-00', '14:00:00', 'Hi, I\'m booking an appointment as I would like to work with you on a brand new website, which will consist of our business image representation, we\'re looking forward to meeting you and discuss this exciting project.', 42),
(32, '0000-00-00', '14:00:00', 'Hi, I\'m booking an appointment as I would like to work with you on a brand new website, which will consist of our business image representation, we\'re looking forward to meeting you and discuss this exciting project.', 42),
(33, '0000-00-00', '14:00:00', 'Hi, I\'m booking an appointment as I would like to work with you on a brand new website, which will consist of our business image representation, we\'re looking forward to meeting you and discuss this exciting project.', 42),
(34, '0000-00-00', '14:00:00', 'Hi, I\'m booking an appointment as I would like to work with you on a brand new website, which will consist of our business image representation, we\'re looking forward to meeting you and discuss this exciting project.', 42),
(35, '0000-00-00', '14:00:00', 'Hi, I\'m booking an appointment as I would like to work with you on a brand new website, which will consist of our business image representation, we\'re looking forward to meeting you and discuss this exciting project.', 42);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `forgot_password` varchar(32) NOT NULL,
  `token` varchar(32) NOT NULL,
  `verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `company`, `email`, `phone_number`, `password`, `forgot_password`, `token`, `verified`) VALUES
(41, 'Grecu', 'Filoftea', 'JustEat', 'biancagrecu090@gmail.com', '53337377', '$2y$10$e5204FY.8oui9zlj7YW0jOqIwJ5PgVCcL4I0UeOwxsJbjqkEwB/Ba', '9f923368f1d33c562462ca352bc427df', 'dc592f813a79f3a13cc9fd94c304b433', 1),
(42, 'Grecu', 'Cosmin', 'RIA', 'myangeldankouzo00@gmail.com', '34526354', '$2y$10$sucbqLGuz5ractSn5pMkqO0czjIibpeENPTyNzjyL0m4sofFadBuy', '49435ed1ccd42d9c54e5ca8488c7e098', '7cc488c11badc868b2f788b19d4483f7', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`),
  ADD KEY `FK_user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
