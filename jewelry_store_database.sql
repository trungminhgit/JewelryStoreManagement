-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2024 at 01:11 PM
-- Generation Time: Aug 30, 2024 at 02:01 PM
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
-- Database: `jewelry_store_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `categoty_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `categoty_name`) VALUES
(1, 'Nhẫn'),
(2, 'Dây chuyền'),
(3, 'Vòng '),
(4, 'Lắc'),
(5, 'Bông tai');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `description`, `create_date`, `user_id`, `product_id`) VALUES
(2, 'Sản phẩm đẹp, giá cả hợp lý.', '2024-08-29 19:29:37', 20, 1),
(3, 'Sản phẩm rất tốt, sẽ quay lại ủng hộ.', '2024-08-29 19:30:49', 19, 1);

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `material_id` int(11) NOT NULL,
  `material_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`material_id`, `material_name`) VALUES
(1, 'Vàng'),
(2, 'Bạc'),
(3, 'Platinum');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `product_image` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `price`, `description`, `product_image`, `category_id`, `material_id`) VALUES
(1, 'Nhẫn vàng SJC', 2000000, 'Nhẫn cưới trong bộ sưu tập Thu - Đông', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724661671/fxnhu75xt6mmmlpnbrxm.png', 1, 1),
(2, 'Vòng vàng SJC', 3000000, 'Vòng tay thiết kế Jewelrey', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724662469/w9y9rwitllqrg8imulle.png', 3, 1),
(3, 'Dây chuyền WNC', 5000000, 'Dây chuyền trong bộ sưu tập Tết 2024', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724662566/xisr0mlnt3y1v4dwiwpj.png', 2, 1),
(4, 'Vòng tay CIRILA', 1000000, 'Vòng tay bạc thiết kế CIRILA', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724662679/rgf2agnlrd9omf8mfcrh.png', 3, 2),
(5, 'Lắc tay SILVER ', 1000000, 'Lắc tay thiết kế Jewelry', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724662827/wlnqjkky6l0brncnwxdo.png', 4, 2),
(6, 'Bông tai Platinum MBL', 1500000, 'Bông tai Platinum thuộc bộ sưu tập Xuân - Hè ', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724666749/oy21ubzvqr6hu2cih85d.png', 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `receipt_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`receipt_id`, `create_date`, `user_id`) VALUES
(2, '2024-08-29 14:43:22', 18),
(3, '2024-08-29 14:52:46', 20),
(4, '2024-08-29 14:54:52', 20);

-- --------------------------------------------------------

--
-- Table structure for table `receipt_detail`
--

CREATE TABLE `receipt_detail` (
  `receipt_detail_id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `receipt_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `receipt_detail`
--

INSERT INTO `receipt_detail` (`receipt_detail_id`, `price`, `quantity`, `product_id`, `receipt_id`) VALUES
(1, 4000000, 2, 1, 2),
(2, 3000000, 1, 2, 2),
(3, 5000000, 1, 3, 2),
(4, 4000000, 2, 1, 3),
(5, 3000000, 1, 2, 3),
(6, 5000000, 1, 3, 3),
(7, 2000000, 2, 4, 4),
(8, 3000000, 3, 5, 4),
(9, 1500000, 1, 6, 4);


-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `first_name`, `last_name`, `email`, `phone`, `avatar`, `create_date`, `update_date`, `role_id`) VALUES
(1, 'dangtrungminh', '$2a$12$wT6UpG5HsJ1lbPvzDmDuw.RkOxlJYT6DUzJy7q4EYsYhXeL0ZEKjO', 'Minh', 'Tran van', 'tranvanminh@gmail.com', '1234567890', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724342853/am7tgtdyffzlri2vqxjk.png', '2024-08-22 23:07:34', '2024-08-27 17:52:46', 2),
(18, 'admin', '$2a$12$wT6UpG5HsJ1lbPvzDmDuw.RkOxlJYT6DUzJy7q4EYsYhXeL0ZEKjO', 'Admin', 'Admin', 'admin@gmail.com', '0123456789', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724342853/am7tgtdyffzlri2vqxjk.png', '2024-08-22 23:07:34', '2024-08-22 23:07:34', 1),
(19, 'user1', '$2a$12$wT6UpG5HsJ1lbPvzDmDuw.RkOxlJYT6DUzJy7q4EYsYhXeL0ZEKjO', 'User1', 'User1', 'user1@gmail.com', '0123456789', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724342853/am7tgtdyffzlri2vqxjk.png', '2024-08-22 23:07:34', '2024-08-22 23:07:34', 2),
(20, 'dangtrunglong', '$2a$10$6hfR4IEnUnTTDdgAzhGKfup9JKepC0Dx8jPwQVDNXj2MupyUk2Qhq', 'Long', 'Dang Trung', 'dangtrunglon@gmail.com', '1234567890', 'https://res.cloudinary.com/dchkh7d18/image/upload/v1724756296/xuzunub2u6upzekhmust.png', '2024-08-27 17:25:14', '2024-08-27 17:58:17', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `FK_COMMENT_USER` (`user_id`),
  ADD KEY `FK_COMMENT_PRODUCT` (`product_id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`material_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FK_PRODUCT_CATEGORY` (`category_id`),
  ADD KEY `FK_PRODUCT_MATERIAL` (`material_id`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`receipt_id`),
  ADD KEY `FK_RECEIPT_USER` (`user_id`);

--
-- Indexes for table `receipt_detail`
--
ALTER TABLE `receipt_detail`
  ADD PRIMARY KEY (`receipt_detail_id`),
  ADD KEY `FK_RECEIPTDETAIL_PRODUCT` (`product_id`),
  ADD KEY `FK_RECEIPTDETAIL_RECEIPT` (`receipt_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_USER_ROLE` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `receipt`
--
ALTER TABLE `receipt`
  MODIFY `receipt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `receipt_detail`
--
ALTER TABLE `receipt_detail`
  MODIFY `receipt_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_COMMENT_PRODUCT` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_COMMENT_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_PRODUCT_CATEGORY` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_PRODUCT_MATERIAL` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `FK_RECEIPT_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receipt_detail`
--
ALTER TABLE `receipt_detail`
  ADD CONSTRAINT `FK_RECEIPTDETAIL_PRODUCT` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_RECEIPTDETAIL_RECEIPT` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`receipt_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_USER_ROLE` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
