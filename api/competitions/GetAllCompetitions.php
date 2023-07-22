<?php
include_once("../connect.php");
$tb_competitions = $wpdb->get_blog_prefix()."competitions";
//$tb_comp_types = $wpdb->get_blog_prefix()."comp_types";
$tb_comp_types = $wpdb->get_blog_prefix()."nom_event_type";
$sql = $wpdb->prepare("SELECT $tb_competitions.id AS id, $tb_competitions.name AS name, $tb_competitions.location AS location,
$tb_competitions.start_date AS startDate, $tb_competitions.end_date AS endDate, $tb_competitions.type AS typeId, $tb_comp_types.name AS typeName, 
$tb_competitions.is_jun AS isJun, $tb_competitions.is_cup AS isCup FROM $tb_competitions JOIN
$tb_comp_types ON $tb_competitions.type = $tb_comp_types.id ORDER BY startDate", "");
$competitions = $wpdb->get_results($sql);
$result = json_encode($competitions);
print_r($result);
