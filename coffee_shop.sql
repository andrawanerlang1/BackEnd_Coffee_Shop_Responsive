-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Des 2020 pada 10.06
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee_shop`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `account_display_name` varchar(100) NOT NULL,
  `account_email` varchar(100) NOT NULL,
  `account_number` bigint(15) NOT NULL,
  `account_adress` varchar(400) NOT NULL,
  `account_first_name` varchar(100) NOT NULL,
  `account_last_name` varchar(100) NOT NULL,
  `account_gender` varchar(30) NOT NULL,
  `account_birthday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `account`
--

INSERT INTO `account` (`account_id`, `account_display_name`, `account_email`, `account_number`, `account_adress`, `account_first_name`, `account_last_name`, `account_gender`, `account_birthday`) VALUES
(1, 'Andra', 'andr7na@gmail.com', 88290056348, 'Bumi Lestari Blok H34 nomer 13', 'Andrawan', 'Erlang', 'male', '1998-03-10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'coffee'),
(2, 'non-coffee'),
(3, 'foods'),
(4, 'add-on');

-- --------------------------------------------------------

--
-- Struktur dari tabel `coupon`
--

CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL,
  `coupon_name` varchar(200) NOT NULL,
  `coupon_price` int(11) NOT NULL,
  `coupon_desc` varchar(400) NOT NULL,
  `size_id` int(11) NOT NULL,
  `deliver_id` int(11) NOT NULL,
  `coupon_discount` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `coupon_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `coupon`
--

INSERT INTO `coupon` (`coupon_id`, `coupon_name`, `coupon_price`, `coupon_desc`, `size_id`, `deliver_id`, `coupon_discount`, `start_date`, `end_date`, `coupon_code`) VALUES
(1, 'Cold Brews', 30000, 'Get 20% off for Cold Brew!!', 1, 7, 20, '2020-12-12', '2020-12-20', '4RK4D3M1'),
(4, 'Spaghetti Bolognese', 25000, 'Get spaghetti Bolognese for 10% off!', 2, 7, 10, '2020-12-01', '2020-12-29', '4ND124W4N');

-- --------------------------------------------------------

--
-- Struktur dari tabel `deliver`
--

CREATE TABLE `deliver` (
  `deliver_id` int(11) NOT NULL,
  `deliver_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `deliver`
--

INSERT INTO `deliver` (`deliver_id`, `deliver_type`) VALUES
(1, 'home only'),
(2, 'dine only'),
(3, 'take only'),
(4, 'home and dine'),
(5, 'home and take'),
(6, 'dine and take'),
(7, 'all delivery');

-- --------------------------------------------------------

--
-- Struktur dari tabel `end`
--

CREATE TABLE `end` (
  `end_id` int(11) NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `end`
--

INSERT INTO `end` (`end_id`, `end_time`) VALUES
(1, '13:00:00'),
(2, '18:00:00'),
(3, '21:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_subtotal` int(11) NOT NULL,
  `history_payment` varchar(30) NOT NULL,
  `account_id` int(11) NOT NULL,
  `history_status` int(11) NOT NULL DEFAULT 0,
  `history_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`history_id`, `history_subtotal`, `history_payment`, `account_id`, `history_status`, `history_created_at`) VALUES
(2, 90000, 'cash', 1, 1, '2020-12-11 03:21:35'),
(3, 190000, 'cash', 1, 0, '2020-12-13 12:00:00'),
(5, 50000, 'cash', 1, 0, '2020-12-14 04:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history_detail`
--

CREATE TABLE `history_detail` (
  `history_detail_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size_choice_id` int(11) NOT NULL,
  `deliver_id` int(11) NOT NULL,
  `history_detail_quantity` int(11) NOT NULL,
  `history_detail_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history_detail`
--

INSERT INTO `history_detail` (`history_detail_id`, `history_id`, `product_id`, `size_choice_id`, `deliver_id`, `history_detail_quantity`, `history_detail_total`) VALUES
(1, 2, 4, 2, 1, 2, 60000),
(2, 2, 2, 2, 1, 1, 30000),
(3, 6, 2, 2, 1, 1, 30000),
(4, 6, 2, 2, 1, 3, 70000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_desc` varchar(300) NOT NULL,
  `product_stock` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `deliver_id` int(11) NOT NULL,
  `start_id` int(11) NOT NULL,
  `end_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `fav` tinyint(1) DEFAULT 0,
  `product_created_at` date NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` date DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_desc`, `product_stock`, `size_id`, `deliver_id`, `start_id`, `end_id`, `category_id`, `fav`, `product_created_at`, `product_updated_at`, `product_image`, `product_status`) VALUES
(1, 'V-60 Manual', 20000, 'V60 method using java beans', 100, 1, 7, 1, 3, 1, 0, '2020-12-10', NULL, '', 1),
(2, 'V-60 Manual Premium', 30000, 'V60 method using premium blend', 100, 1, 7, 1, 3, 1, 1, '2020-12-10', NULL, '', 1),
(3, 'Creme de Latte', 0, 'Sweet coffee with milk and creme', 50, 0, 0, 0, 0, 0, 0, '2020-12-10', '2020-12-27', '', 1),
(4, 'Cold Brew', 25000, 'Manual coffee served cold', 100, 1, 7, 1, 3, 1, 1, '2020-12-10', NULL, '', 1),
(5, 'Avocado Smoothies', 23000, 'Blended avocado juices', 70, 1, 7, 2, 2, 2, 0, '2020-12-10', NULL, '', 1),
(6, 'Banana Smoothies', 23000, 'Blended banana juices', 70, 1, 7, 2, 2, 2, 0, '2020-12-10', NULL, '', 1),
(7, 'Choco Shake', 27000, 'Chocolate drink shaked', 70, 1, 7, 2, 2, 2, 1, '2020-12-10', NULL, '', 1),
(8, 'Summer Fried Rice', 35000, 'Fried rice with seafood toppings', 30, 2, 2, 3, 2, 3, 1, '2020-12-10', NULL, '', 1),
(9, 'Fruit Salad', 30000, 'Mixed fruit with caesar dressings', 30, 2, 5, 3, 2, 3, 0, '2020-12-10', NULL, '', 1),
(10, 'Bulgarian Sandwich', 28000, 'Cheese sandwich with eggs', 30, 2, 5, 3, 2, 3, 0, '2020-12-10', NULL, '', 1),
(11, 'French Fries', 20000, 'Fried fries with seasalt', 50, 2, 7, 2, 1, 4, 0, '2020-12-10', NULL, '', 1),
(12, 'Sausages', 20000, 'Fried sausages with ketchup', 50, 2, 7, 2, 1, 4, 0, '2020-12-10', NULL, '', 1),
(13, 'Vanilla Ice Cream', 25000, 'Ice cream vanilla with cone', 50, 2, 7, 2, 3, 4, 1, '2020-12-10', NULL, '', 1),
(16, 'v-60 ceramic cup', 27000, 'V-60 manual brew using ceramic cup', 90, 1, 7, 2, 3, 1, 1, '2020-12-10', NULL, '', 1),
(17, 'strawberry Smoothies', 25000, 'Blended strawberry juice', 50, 1, 7, 1, 3, 2, 0, '2020-12-10', NULL, '', 1),
(18, 'Mango Smoothies Hawaii', 30000, 'Blended mango with pineapple dressings', 50, 1, 7, 1, 3, 2, 1, '2020-12-10', NULL, '', 1),
(19, 'Mochacino', 30000, 'Sweet coffee with milk and creme', 50, 1, 7, 1, 2, 1, 0, '2020-12-10', NULL, '', 1),
(20, 'Japanese coffee', 25000, 'Manual cold brew with tokyo beans', 50, 1, 6, 1, 2, 1, 0, '2020-12-10', NULL, '', 1),
(25, 'Swedish coffee', 25000, 'Manual cold brew with sweeden beans', 50, 1, 6, 1, 2, 1, 0, '2020-12-10', NULL, '', 1),
(29, 'Japanese coffee Premium', 25000, 'Manual cold brew with tokyo beans premium quality', 50, 1, 6, 1, 2, 1, 1, '2020-12-21', NULL, '', 1),
(30, 'Japanese coffee', 25000, 'Manual cold brew with tokyo beans', 50, 1, 6, 1, 2, 1, 0, '2020-12-21', NULL, '', 1),
(31, 'Taco Mexician', 22000, 'Made with fresh tortillas, this is the best taco', 100, 2, 2, 1, 2, 3, 0, '2020-12-21', NULL, '', 1),
(34, 'Mie goreng', 10000, 'Digoreng dadakan nyoi', 100, 2, 4, 1, 2, 3, 0, '2020-12-21', NULL, '', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `size`
--

INSERT INTO `size` (`size_id`, `type`) VALUES
(1, 'size'),
(2, 'grams');

-- --------------------------------------------------------

--
-- Struktur dari tabel `size_choice`
--

CREATE TABLE `size_choice` (
  `size_choice_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `size_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `size_choice`
--

INSERT INTO `size_choice` (`size_choice_id`, `size_id`, `size_name`) VALUES
(1, 1, 'R'),
(2, 1, 'L'),
(3, 1, 'XL'),
(4, 2, '250 grams'),
(5, 2, '300 grams'),
(6, 2, '500 grams');

-- --------------------------------------------------------

--
-- Struktur dari tabel `start`
--

CREATE TABLE `start` (
  `start_id` int(11) NOT NULL,
  `start_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `start`
--

INSERT INTO `start` (`start_id`, `start_time`) VALUES
(1, '08:00:00'),
(2, '10:00:00'),
(3, '12:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_display_name` varchar(100) NOT NULL,
  `user_first_name` varchar(100) NOT NULL,
  `user_last_name` varchar(100) NOT NULL,
  `user_number` varchar(30) NOT NULL,
  `user_address` varchar(300) NOT NULL,
  `user_gender` varchar(20) NOT NULL,
  `user_birthday` date DEFAULT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL,
  `user_role` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_display_name`, `user_first_name`, `user_last_name`, `user_number`, `user_address`, `user_gender`, `user_birthday`, `user_created_at`, `user_updated_at`, `user_role`, `status`) VALUES
(1, 'Andrawan Erlang', 'andr7na@gmail.com', '$2b$10$j6S19eoduPuZBqpKgS9GXuj0W4y0fqTTbkorAFO7Y8vMrUno0PuMu', 'Andra', 'andrawan', 'erlang pradana', '088290056349', 'Bumi Lestari blok H-34', 'male', '1998-03-10', '2020-12-22 07:57:49', '2020-12-29 04:12:42', 1, 1),
(4, 'Andrawan Erlang', 'andr7na@yahoo.com', '$2b$10$bOkj9lJTMbCjelmVY.HQRuEKwXPdgHof4TaXNyWXXePLsZhb590Xq', 'Andra', 'andrawan', 'erlang', '088290056349', 'Bumi Lestari blok H-34', 'male', '1998-03-10', '2020-12-28 03:08:39', '0000-00-00 00:00:00', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indeks untuk tabel `deliver`
--
ALTER TABLE `deliver`
  ADD PRIMARY KEY (`deliver_id`);

--
-- Indeks untuk tabel `end`
--
ALTER TABLE `end`
  ADD PRIMARY KEY (`end_id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indeks untuk tabel `history_detail`
--
ALTER TABLE `history_detail`
  ADD PRIMARY KEY (`history_detail_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indeks untuk tabel `size_choice`
--
ALTER TABLE `size_choice`
  ADD PRIMARY KEY (`size_choice_id`);

--
-- Indeks untuk tabel `start`
--
ALTER TABLE `start`
  ADD PRIMARY KEY (`start_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `coupon`
--
ALTER TABLE `coupon`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `history_detail`
--
ALTER TABLE `history_detail`
  MODIFY `history_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
