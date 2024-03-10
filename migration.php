<?php
require_once("../../../wp-load.php");
global $wpdb;
$charset_collate = $wpdb->get_charset_collate();
require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

$prefix = $wpdb->get_blog_prefix() . "nom_";

// 03/10/2024 Updated referee schedule flow
// $referee_busy_table = $prefix . "referee_busy";

// $sql = "CREATE TABLE IF NOT EXISTS $referee_busy_table (
//     id INT NOT NULL AUTO_INCREMENT,
//     event_id INT NOT NULL,
//     division_id INT NOT NULL,
//     weight_class_id INT NOT NULL,
//     nomination_id INT NOT NULL,
//     PRIMARY KEY(id)
// ) $charset_collate";

// dbDelta($sql);

// 01/18/2024 added column comment to nominations

// $competitionsTableName = $wpdb->get_blog_prefix() . "nominations";

// $sql = "ALTER TABLE $competitionsTableName ADD comment VARCHAR(350) DEFAULT NULL";
// $wpdb->query($sql);

// 09/23/2023 created flows entities

// $flowsTableName = $prefix . "flows";

// $sql = "CREATE TABLE IF NOT EXISTS $flowsTableName (
//     flow_id     INT NOT NULL AUTO_INCREMENT,
//     event_id    INT NOT NULL,
//     day_of_flow DATETIME NOT NULL,
//     sort_order  INT NOT NULL,
//     PRIMARY KEY(flow_id)
// ) $charset_collate";

// dbDelta($sql);

// $flowWeightClassesTableName = $prefix . "flow_weight_classes";

// $sql = "CREATE TABLE IF NOT EXISTS $flowWeightClassesTableName (
//     flow_weight_class_id    INT NOT NULL AUTO_INCREMENT,
//     flow_id                 INT NOT NULL,
//     division_id             INT NOT NULL,
//     weight_class_id         INT NOT NULL,
//     PRIMARY KEY(flow_weight_class_id)
// ) $charset_collate";

// dbDelta($sql);

// $flowRefereeRecordsTableName = $prefix . "flow_referee_records";

// $sql = "CREATE TABLE IF NOT EXISTS $flowRefereeRecordsTableName (
//     flow_referee_record_id  INT NOT NULL AUTO_INCREMENT,
//     flow_id                 INT NOT NULL,
//     referee_id              VARCHAR(350) NOT NULL,
//     referee_status          INT NULL,
//     PRIMARY KEY(flow_referee_record_id)
// ) $charset_collate";

// dbDelta($sql);

// 6/11/2023 created event entity
// $eventsTableName = $prefix . "events";

// $sql = "CREATE TABLE IF NOT EXISTS $eventsTableName (
//     id INT NOT NULL AUTO_INCREMENT,
//     title VARCHAR(300) NOT NULL,
//     location VARCHAR(50) NOT NULL,
//     start_date DATETIME NOT NULL,
//     end_date DATETIME NOT NULL,
//     event_type VARCHAR(20) NOT NULL,
//     is_school TINYINT(1) NOT NULL,
//     is_cup TINYINT(1) NOT NULL,
//     PRIMARY KEY(id)
// ) $charset_collate";

// dbDelta($sql);

// $competitionsTableName = $wpdb->get_blog_prefix() . "competitions";

// $sql = "ALTER TABLE $competitionsTableName ADD event_id INT DEFAULT NULL";
// $wpdb->query($sql);

// $eventTypeTableName = $prefix . "event_type";

// $sql = "CREATE TABLE IF NOT EXISTS $eventTypeTableName (
//     id INT NOT NULL,
//     event_type VARCHAR(20) NOT NULL,
//     name VARCHAR(50) NOT NULL,
//     PRIMARY KEY(id)
// ) $charset_collate";

// dbDelta($sql);

// $sql = "INSERT INTO $eventTypeTableName (id, event_type, name)
//         VALUES (1, 'POWERLIFTING', 'пауерліфтинг'),
//             (2, 'BENCH_PRESS', 'жим лежачи'),
//             (3, 'POWERLIFTING_CLASSIC', 'класичний пауерліфтинг'),
//             (4, 'BENCH_PRESS_CLASSIC', 'класичний жим лежачи')";

// $wpdb->query($sql);

echo "Migration is done";
?>