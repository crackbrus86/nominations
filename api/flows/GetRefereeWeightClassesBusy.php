<?php
include_once("../connect.php");

if(current_user_can("edit_others_pages"))
{
    $event_id = $_GET['eventId'];

    $sql = $wpdb->prepare("SELECT 
        rbs.division_id, 
        rbs.weight_class_id, 
        CONCAT(LOWER(nom.surname), '/', LOWER(nom.first_name), '/', LOWER(nom.middle_name), '/', nom.team)AS id
    FROM `wp_nom_referee_busy` AS rbs 
    JOIN `wp_competitions` AS comp ON comp.id = rbs.event_id
    JOIN `wp_nom_events` AS evnt ON evnt.id = comp.event_id
    JOIN `wp_nominations` AS nom ON nom.id = rbs.nomination_id
    WHERE evnt.id = %d", $event_id);

    $result = $wpdb->get_results($sql);

    $response = new StdClass();
    $response->status = "Success";
    $response->message = NULL;
    $response->data = $result;

    echo json_encode($response);
} else {
    header("HTTP/1.1 401 Unauthorized");
}