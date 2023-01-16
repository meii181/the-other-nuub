-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2023 at 11:11 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `answer_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`answer_id`, `text`, `question_id`) VALUES
(1, '1 (Individual)', 1),
(2, 'Less than 10', 1),
(3, 'Between 10 and 50', 1),
(4, 'Between 50 and 100', 1),
(5, 'More than 100', 1),
(6, 'Simple Solution', 3),
(7, 'Strategic Tool', 3),
(8, 'Yes', 5),
(9, 'No', 5),
(10, 'Homepage', 6),
(11, 'Webshop', 6),
(12, 'Between 1-5 pages', 7),
(13, 'Between 5-10 pages', 7),
(14, 'More than 10 pages', 7),
(15, 'None', 7),
(16, 'Yes', 9),
(17, 'No', 9),
(18, 'Yes', 10),
(19, 'No', 10),
(20, 'Yes', 11),
(21, 'No', 11),
(22, 'Social Media Advertising/Management', 12),
(23, 'Implementation of Chat Bot', 12),
(24, 'Payment System', 12),
(25, 'Website Hosting', 12),
(26, 'Website Security', 12),
(27, 'Yes', 13),
(28, 'No', 13);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `full_name`, `email`, `phone_number`) VALUES
(1, 'Grecu Filoftea-Bianca', 'bianca@gmail.com', '53337377'),
(2, 'Grecu Filoftea-Bianca', 'biancagrecu090@gmail.com', '53337377'),
(3, 'Grecu Filoftea-Bianca', 'baba090@gmail.com', '53337377');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `contact_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type_of_inquiry` varchar(50) CHARACTER SET utf8 NOT NULL,
  `inquiry_description` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`contact_id`, `full_name`, `email`, `type_of_inquiry`, `inquiry_description`) VALUES
(17, 'Filoftea-Bianca Grecu', 'biancagrecu090@gmail.com', 'Appointment', 'Hi'),
(18, 'Marin-Cosmin Grecu ', 'cosi@gmail.com', 'Appointment', 'I want appointment'),
(19, 'Bianca Grecu', 'bia@gmail.com', 'Addressing a question', 'Yes?'),
(20, 'Filoftea-Bianca Grecu', 'bibilicu090@gmail.com', 'Addressing a question', 'ddddd'),
(21, 'Filoftea-Bianca Grecu', 'bianca090909@gmail.com', 'Addressing a question', 'ddddd'),
(22, 'Bianca', 'biabia123@gmail.com', 'Support/Assistance', 'I need help'),
(23, 'Aleksander Junge', 'ajunge123@gmail.com', 'Appointment', 'I would like a new homepage for my cat website.'),
(24, 'Bianca Grecu', 'bbbb@gmail.com', 'Addressing a question', 'What is SEO?'),
(25, 'Filoftea-Bianca Grecu', 'biababanca@gmail.com', 'Addressing a question', 'How can I integrate the website into other software?'),
(26, 'Filoftea-Bianca Grecu', 'babanca123@gmail.com', 'Adressering af et spørgsmål', 'Hej?'),
(27, 'Bianca', 'babanca@gmail.com', 'Aftale', 'Jeg vil gerne have en aftale'),
(28, 'Filoftea-Bianca Grecu', 'baba@gmail.com', 'Adressering af et spørgsmål', 'Yes?'),
(29, '', '', '', ''),
(30, 'Filoftea-Bianca Grecu', 'babahaha090@gmail.com', 'Addressing a question', 'aaaaa'),
(31, 'Marin-Cosmin Grecu ', 'cosicosi@gmail.com', 'Support/Assistance', 'qqqq'),
(32, 'Bianca', 'lala@gmail.com', 'Appointment', 'hhhhh'),
(33, 'Filoftea-Bianca Grecu', 'lala090@gmail.com', 'Addressing a question', 'Hi?');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `question_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `text`, `description`, `question_type`) VALUES
(1, 'How big is the company?', 'Choose down below the number of staff that are in your company', 'multiple_choice'),
(2, 'Would you like to make a short description about the company/you?', 'You can write down what you do, what are your goals, and what are you exactly looking for', 'input_field'),
(3, 'Which is your target goal for the website solution?', 'Please select if your website solution should work as a simple online representation, or it should be part of a bigger strategy', 'multiple_choice'),
(4, 'How much is your budget?', 'Write down the budget, annual or monthly', 'input_field'),
(5, 'Do you have a website?', 'Choose down below if you already have a website or not', 'true_false'),
(6, 'What kind of website would you like/is your current website?', 'Choose the type of the website, whether existent and needs a refreshment, or not', 'multiple_choice'),
(7, 'How many pages do you need for the website?', 'Choose the desired number of pages for your future website, choose \'None\' if you already have a website', 'multiple_choice'),
(8, 'What works well on the website, and what not and would like to get fixed?', 'Mention down below what would you like to have fixed to your website, choose \'None\' if you don\'t have a website', 'input_field'),
(9, 'Would you like to help you with integrating your web solution in the market?', 'For example, we can help you with search engine optimization to grow traffic to the website', 'true_false'),
(10, 'Would you like to help you with integrating your web solution with other software?', 'For example, if you wish to have a contact form to your website, or update the purchase system, having the website integrated with other software would be useful in this case', 'true_false'),
(11, 'Is your website responsive?', 'If not, we\'ll help you with offering a responsive design to the website', 'true_false'),
(12, 'What kind of additional services would you like to have implemented to the website?', 'Choose down whether what kind of services would you like to have implemented', 'multiple_choice'),
(13, 'Would you like to have the website available in english as well?', 'Choose whether you wish to have a second language for your website or not', 'true_false');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
