<?php
include_once('../connect.php');
if(current_user_can('edit_others_pages'))
{
    $tb_events = $wpdb->get_blog_prefix()."nom_events";

    $result = $wpdb->get_results("SELECT id, title, location, start_date, end_date, event_type, is_school, is_cup FROM $tb_events");
    
    $response = new StdClass();
    $response->status = "Success";
    $response->message = NULL;
    $response->data = array_map("mapEvent", $result);

    echo json_encode($response);
}

function mapEvent($event)
{
    $event->is_school = ($event->is_school == 1);
    $event->is_cup = ($event->is_cup == 1);
    return $event;
}