<?php
include_once('../connect.php');

$tb_event_types = $wpdb->get_blog_prefix()."nom_event_type";

$result = $wpdb->get_results("SELECT id, event_type AS eventType, name FROM $tb_event_types");

$response = new StdClass();
$response->status = "Success";
$response->message = NULL;
$response->data = $result;

echo json_encode($response);