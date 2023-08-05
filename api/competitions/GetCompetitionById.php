<?php
include_once("../connect.php");
$tb_competitions = $wpdb->get_blog_prefix()."competitions";
$id = esc_sql($_POST["id"]);
$sql = $wpdb->prepare("SELECT $tb_competitions.id AS id, $tb_competitions.name AS name, $tb_competitions.location AS location,
$tb_competitions.start_date AS startDate, $tb_competitions.end_date AS endDate, $tb_competitions.type AS typeId,
$tb_competitions.gender AS gender, $tb_competitions.is_jun AS isJun, $tb_competitions.is_cup AS isCup, $tb_competitions.event_id AS eventId 
FROM $tb_competitions WHERE id = %d", $id);
$competition = $wpdb->get_results($sql);
$result = json_encode($competition);
print_r($result);