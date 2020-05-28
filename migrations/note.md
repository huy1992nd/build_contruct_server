CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('1','2','3','4','5') COLLATE utf8_unicode_ci DEFAULT '1',
  `data` json DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
