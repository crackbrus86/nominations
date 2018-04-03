<?php
include_once("../connect.php");
$tb_regions = $wpdb->get_blog_prefix()."regions";
$sql = $wpdb->prepare("SELECT id, name, short_name AS shortName FROM $tb_regions", "");
$regions = $wpdb->get_results($sql);
$result = json_encode($regions);
print_r($result);
