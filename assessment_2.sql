-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 12, 2022 at 12:29 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `CSC_40082`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessment_2`
--

CREATE TABLE `assessment_2` (
  `ID` int(11) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `temperature` decimal(11,0) NOT NULL,
  `time_searched` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assessment_2`
--

INSERT INTO `assessment_2` (`ID`, `city_name`, `temperature`, `time_searched`, `description`, `icon`) VALUES
(7, 'London', '0', 1670765815, 'Fog', '50d'),
(9, 'Paris', '0', 1670766258, 'Clouds', '03d'),
(11, 'Seoul', '-3', 1670766022, 'Clear', '01n'),
(12, 'Manchester', '1', 1670766554, 'Clouds', '04d'),
(30, 'London', '0', 1670767127, 'Fog', '50d'),
(33, 'Seoul', '-3', 1670767250, 'Clear', '01n'),
(44, 'London', '0', 1670768320, 'Fog', '50d'),
(49, 'Manchester', '-2', 1670806735, 'Clear', '01n'),
(54, 'Seoul', '0', 1670806718, 'Clear', '01d'),
(81, 'Paris', '-1', 1670844044, 'Clouds', '04d'),
(82, 'Paris', '-1', 1670844044, 'Clouds', '04d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessment_2`
--
ALTER TABLE `assessment_2`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessment_2`
--
ALTER TABLE `assessment_2`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
