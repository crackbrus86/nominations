<?php
include_once("../connect.php");
$tb_regions = $wpdb->get_blog_prefix()."regions";
$sql = $wpdb->prepare("SELECT id, name, short_name AS shortName FROM $tb_regions", "");
$result = $wpdb->get_results($sql);

$response = new StdClass();
$response->status = "Success";
$response->message = NULL;
$response->data = $result;

echo json_encode($response);