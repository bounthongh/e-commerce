-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 17, 2020 at 11:24 AM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `markets`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings_bkg`
--

DROP TABLE IF EXISTS `bookings_bkg`;
CREATE TABLE IF NOT EXISTS `bookings_bkg` (
  `BKG_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CRT_ID` int(11) NOT NULL,
  `DRP_ID` int(11) DEFAULT NULL,
  `BKG_PAID` tinyint(1) NOT NULL DEFAULT '0',
  `BKG_DELIVERED` tinyint(1) NOT NULL DEFAULT '0',
  `BKG_DELIVERY` enum('HOME','MARKET','DROPOFF','') NOT NULL DEFAULT 'HOME',
  `BKG_DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`BKG_ID`),
  KEY `FK_BKG_CRT` (`CRT_ID`),
  KEY `FK_BKG_DRP` (`DRP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `carts_crt`
--

DROP TABLE IF EXISTS `carts_crt`;
CREATE TABLE IF NOT EXISTS `carts_crt` (
  `CRT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CUS_ID` int(11) NOT NULL,
  `CRT_IS_ACTIVE` tinyint(1) NOT NULL DEFAULT '1',
  `CRT_CREATION_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`CRT_ID`),
  KEY `FK_CRT_CUS` (`CUS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `carts_x_products_cxp`
--

DROP TABLE IF EXISTS `carts_x_products_cxp`;
CREATE TABLE IF NOT EXISTS `carts_x_products_cxp` (
  `CXP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CRT_ID` int(11) NOT NULL,
  `PDT_ID` int(11) NOT NULL,
  `CXP_QTY` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`CXP_ID`),
  KEY `FK_CXP_PDT` (`PDT_ID`),
  KEY `FK_CXP_CRT` (`CRT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Triggers `carts_x_products_cxp`
--
DROP TRIGGER IF EXISTS `updateProductQuantity`;
DELIMITER $$
CREATE TRIGGER `updateProductQuantity` AFTER INSERT ON `carts_x_products_cxp` FOR EACH ROW BEGIN
  UPDATE products_pdt
    SET products_pdt.PDT_QUANTITY = products_pdt.PDT_QUANTITY - NEW.CXP_QTY
    WHERE `PDT_ID` = NEW.PDT_ID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customers_cus`
--

DROP TABLE IF EXISTS `customers_cus`;
CREATE TABLE IF NOT EXISTS `customers_cus` (
  `CUS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USR_ID` int(11) NOT NULL,
  `MKT_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`CUS_ID`),
  KEY `FK_CUS_USR` (`USR_ID`),
  KEY `FK_CUS_MKT` (`MKT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dropoff_drp`
--

DROP TABLE IF EXISTS `dropoff_drp`;
CREATE TABLE IF NOT EXISTS `dropoff_drp` (
  `DRP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DRP_ADDRESS` varchar(255) NOT NULL DEFAULT '',
  `DRP_ZIP_CODE` varchar(10) NOT NULL DEFAULT '',
  `DRP_CITY` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`DRP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `markets_mkt`
--

DROP TABLE IF EXISTS `markets_mkt`;
CREATE TABLE IF NOT EXISTS `markets_mkt` (
  `MKT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `MKT_NAME` varchar(255) NOT NULL DEFAULT '',
  `MKT_ADDRESS` varchar(255) NOT NULL DEFAULT '',
  `MKT_ZIP_CODE` varchar(10) NOT NULL DEFAULT '',
  `MKT_CITY` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`MKT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `markets_x_vendors_mxv`
--

DROP TABLE IF EXISTS `markets_x_vendors_mxv`;
CREATE TABLE IF NOT EXISTS `markets_x_vendors_mxv` (
  `MXV_ID` int(11) NOT NULL AUTO_INCREMENT,
  `MKT_ID` int(11) NOT NULL,
  `VDR_ID` int(11) NOT NULL,
  PRIMARY KEY (`MXV_ID`),
  KEY `FK_MXV_VDR` (`VDR_ID`),
  KEY `FK_MXV_MKT` (`MKT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products_pdt`
--

DROP TABLE IF EXISTS `products_pdt`;
CREATE TABLE IF NOT EXISTS `products_pdt` (
  `PDT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `VDR_ID` int(11) NOT NULL,
  `PDT_NAME` varchar(255) NOT NULL DEFAULT '',
  `PDT_PRICE` decimal(10,2) NOT NULL DEFAULT '0.00',
  `PDT_QUANTITY` decimal(10,2) NOT NULL DEFAULT '0.00',
  `PDT_UNIT` varchar(20) DEFAULT NULL,
  `PDT_IMAGE` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`PDT_ID`),
  KEY `FK_PDT_VDR` (`VDR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_usr`
--

DROP TABLE IF EXISTS `users_usr`;
CREATE TABLE IF NOT EXISTS `users_usr` (
  `USR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USR_IS_ADMIN` tinyint(1) NOT NULL DEFAULT '0',
  `USR_LOGIN` varchar(255) NOT NULL,
  `USR_PASSWORD` varchar(255) NOT NULL,
  `USR_FIRST_NAME` varchar(255) NOT NULL,
  `USR_LAST_NAME` varchar(255) NOT NULL,
  `USR_ADDRESS` varchar(255) NOT NULL,
  `USR_ZIP_CODE` varchar(10) NOT NULL,
  `USR_CITY` varchar(255) NOT NULL,
  `USR_PHONE_NUMBER` varchar(20) NOT NULL,
  PRIMARY KEY (`USR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vendors_vdr`
--

DROP TABLE IF EXISTS `vendors_vdr`;
CREATE TABLE IF NOT EXISTS `vendors_vdr` (
  `VDR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USR_ID` int(11) NOT NULL,
  `VDR_NAME` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`VDR_ID`),
  KEY `FK_VDR_USR` (`USR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings_bkg`
--
ALTER TABLE `bookings_bkg`
  ADD CONSTRAINT `FK_BKG_CRT` FOREIGN KEY (`CRT_ID`) REFERENCES `carts_crt` (`CRT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_BKG_DRP` FOREIGN KEY (`DRP_ID`) REFERENCES `dropoff_drp` (`DRP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `carts_crt`
--
ALTER TABLE `carts_crt`
  ADD CONSTRAINT `FK_CRT_CUS` FOREIGN KEY (`CUS_ID`) REFERENCES `customers_cus` (`CUS_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `carts_x_products_cxp`
--
ALTER TABLE `carts_x_products_cxp`
  ADD CONSTRAINT `FK_CXP_CRT` FOREIGN KEY (`CRT_ID`) REFERENCES `carts_crt` (`CRT_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_CXP_PDT` FOREIGN KEY (`PDT_ID`) REFERENCES `products_pdt` (`PDT_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customers_cus`
--
ALTER TABLE `customers_cus`
  ADD CONSTRAINT `FK_CUS_MKT` FOREIGN KEY (`MKT_ID`) REFERENCES `markets_mkt` (`MKT_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_CUS_USR` FOREIGN KEY (`USR_ID`) REFERENCES `users_usr` (`USR_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `markets_x_vendors_mxv`
--
ALTER TABLE `markets_x_vendors_mxv`
  ADD CONSTRAINT `FK_MXV_MKT` FOREIGN KEY (`MKT_ID`) REFERENCES `markets_mkt` (`MKT_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_MXV_VDR` FOREIGN KEY (`VDR_ID`) REFERENCES `vendors_vdr` (`VDR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products_pdt`
--
ALTER TABLE `products_pdt`
  ADD CONSTRAINT `FK_PDT_VDR` FOREIGN KEY (`VDR_ID`) REFERENCES `vendors_vdr` (`VDR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `vendors_vdr`
--
ALTER TABLE `vendors_vdr`
  ADD CONSTRAINT `FK_VDR_USR` FOREIGN KEY (`USR_ID`) REFERENCES `users_usr` (`USR_ID`) ON DELETE CASCADE ON UPDATE CASCADE;


  insert into `markets_mkt` values(null,'le marché de ivry', 'rue du marché' , '94200', 'ivry-sur-seine')

  `MKT_NAME` varchar(255) NOT NULL DEFAULT '',
  `MKT_ADDRESS` varchar(255) NOT NULL DEFAULT '',
  `MKT_ZIP_CODE` varchar(10) NOT NULL DEFAULT '',
  `MKT_CITY` varchar(255) NOT NULL DEFAULT '',
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
