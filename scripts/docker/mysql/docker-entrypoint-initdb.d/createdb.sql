CREATE DATABASE IF NOT EXISTS `myapi` COLLATE 'utf8_general_ci' ;
GRANT ALL ON `myapi`.* TO 'myapi'@'%' ;

FLUSH PRIVILEGES ;