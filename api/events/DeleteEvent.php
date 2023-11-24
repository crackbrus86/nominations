<?php
include_once('../connect.php');
if(current_user_can('edit_others_pages'))
{
    $json = file_get_contents('php://input');
    $contract = json_decode($json);

    $tb_events = $wpdb->get_blog_prefix()."nom_events";

    $sql = $wpdb->prepare("DELETE FROM $tb_events WHERE id = %d", $contract->id);
    $wpdb->query($sql);

    $tb_competitions = $wpdb->get_blog_prefix()."competitions";

    $sql = $wpdb->prepare("DELETE FROM $tb_competitions WHERE event_id = %d", $contract->id);
    $wpdb->query($sql);

    $response = new StdClass();
    $response->status = "Success";
    $response->message = "Змагання було успішно видалене!";

    echo json_encode($response);
    
}else {
    header("HTTP/1.1 401 Unauthorized");
}