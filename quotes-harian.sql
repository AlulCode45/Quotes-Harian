-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2023 at 03:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quotes-harian`
--

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quote_text` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `user_id`, `quote_text`, `author`, `created_at`) VALUES
(1, 6, 'Hidup bukanlah masalah yang harus dipecahkan, tetapi realitas yang harus dijalani.', 'Søren Kierkegaard', '2023-07-07 11:46:22'),
(2, 6, 'Kehidupan bukanlah menunggu badai berlalu, tetapi belajar bagaimana kita dapat menari di tengah hujan.', 'Rabindranath Tagore', '2023-07-07 11:46:22'),
(3, 6, 'Hidup bukanlah tentang menemukan diri sendiri, tetapi tentang menciptakan diri sendiri.', 'George Bernard Shaw', '2023-07-07 11:46:22'),
(4, 6, 'Kehidupan adalah perjalanan yang harus dijalani, tidak peduli seburuk apa pun jalan dan penginapannya.', 'Oliver Goldsmith', '2023-07-07 11:46:22'),
(5, 6, 'Kehidupan adalah seperti mengendarai sepeda. Untuk menjaga keseimbangan, kita harus tetap bergerak.', 'Albert Einstein', '2023-07-07 11:46:22'),
(6, 12, 'Hidup adalah anugerah yang indah, jangan sia-siakan setiap momen yang diberikan.', 'Unknown', '2023-07-07 11:46:22'),
(7, 12, 'Nikmati setiap saat dalam hidup, karena waktu tidak akan pernah kembali.', 'Unknown', '2023-07-07 11:46:22'),
(8, 12, 'Jadikan setiap hari sebagai kesempatan untuk belajar, tumbuh, dan mencapai potensi terbaik kita.', 'Unknown', '2023-07-07 11:46:22'),
(9, 12, 'Hidup adalah petualangan terbesar yang bisa kita ambil adalah menjalani kehidupan impian kita.', 'Oprah Winfrey', '2023-07-07 11:46:22'),
(10, 12, 'Hidup bukanlah tentang menunggu badai berlalu, tetapi tentang belajar bagaimana menari di tengah badai.', 'Vivian Greene', '2023-07-07 11:46:22'),
(17, 6, 'Lorem is good', 'AlulGud', '2023-07-07 12:15:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `token`) VALUES
(6, 'Muhammad Khoyron', 'AlulCode', '$2b$10$4Ms5V97fWF3fyyNo7/wNWeV1JFJVahmf5XMm5D3U2JyhBcJoMTTdW', '.{{8&Yc.Z,9aGclJH8l,VZ%gu,HnZZDUH.ZA{1Jnrh#UG{q9ID~4H681{1sa+C'),
(12, 'Lea Ohyeah', 'leasehat', '$2b$10$dJtDsO3weCRSb4MbAtm.q.MCGtGQC4/ojSOrhWEQnaaLw2KJhqkQq', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
