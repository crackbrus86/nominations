<?php
include_once("../connect.php");
if(current_user_can("edit_others_pages"))
{
    $json = file_get_contents('php://input');
    $event = json_decode($json);

    $tb_events = $wpdb->get_blog_prefix()."nom_events";
    $tb_competitions = $wpdb->get_blog_prefix()."competitions";

    $sql = $wpdb->prepare("UPDATE $tb_events 
        SET title       = %s,
            location    = %s,
            start_date  = %s,
            end_date    = %s,
            event_type  = %s,
            is_school   = %d,
            is_cup      = %d
        WHERE id = %d", 
            $event->title,
            $event->location,
            $event->start_date,
            $event->end_date,
            $event->event_type,
            $event->is_school,
            $event->is_cup,
            $event->id);
    $wpdb->query($sql);

    $sql = $wpdb->prepare("UPDATE $tb_competitions
        SET name = %s,
            location = %s,
            start_date = %s,
            end_date = %s,
            type = %d,
            is_jun = %s,
            is_cup = %s
        WHERE event_id = %d 
            AND gender = 'male'",
            $event->title_male,
            $event->location,
            $event->start_date,
            $event->end_date,
            $event->event_type_id,
            $event->is_school == 1 ? 'true' : 'false',
            $event->is_cup == 1 ? 'true' : 'false',
            $event->id);
    $wpdb->query($sql);

    $sql = $wpdb->prepare("UPDATE $tb_competitions
    SET name = %s,
        location = %s,
        start_date = %s,
        end_date = %s,
        type = %d,
        is_jun = %s,
        is_cup = %s
    WHERE event_id = %d 
        AND gender = 'female'",
        $event->title_female,
        $event->location,
        $event->start_date,
        $event->end_date,
        $event->event_type_id,
        $event->is_school == 1 ? 'true' : 'false',
        $event->is_cup == 1 ? 'true' : 'false',
        $event->id);
    $wpdb->query($sql);

    $response = new StdClass();
    $response->status = "Success";
    $response->message = "Змагання було успішно оновлене!";

    echo json_encode($response);
}else {
    header("HTTP/1.1 401 Unauthorized");
}