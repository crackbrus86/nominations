<?php
include_once("../connect.php");
if(current_user_can("edit_others_pages"))
{
    $event_id = $_GET["event_id"];
    $tb_competitions = $wpdb->get_blog_prefix() . "competitions";

    $sql = $wpdb->prepare("SELECT id, name, gender FROM $tb_competitions WHERE event_id = %d", $event_id);
    $result = $wpdb->get_results($sql);

    $response = new StdClass();
    $response->status = "Success";
    $response->message = NULL;
    $response->data = $result;

    echo json_encode($response);
}else {
    header("HTTP/1.1 401 Unauthorized");
}