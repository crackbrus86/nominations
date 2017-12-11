<?php
include_once("../connect.php");
$tb_weight_categories = $wpdb->get_blog_prefix()."weight_categories";
$gender = esc_sql($_POST["gender"]);
$sql = $wpdb->prepare("SELECT id, name, division FROM $tb_weight_categories WHERE gender = %s", $gender);
$regions = $wpdb->get_results($sql);
$result = json_encode($regions);
print_r($result);