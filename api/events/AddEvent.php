<?php
include_once('../connect.php');
if(current_user_can('edit_others_pages'))
{
    $json = file_get_contents('php://input');
    $event = json_decode($json);

    $tb_events = $wpdb->get_blog_prefix()."nom_events";
    $tb_competitions = $wpdb->get_blog_prefix()."competitions";

    $sql = $wpdb->prepare("INSERT INTO $tb_events (title, location, start_date, end_date, event_type, is_school, is_cup)
        VALUES  (%s, %s, %s, %s, %s, %d, %d)", $event->title, $event->location, $event->start_date, $event->end_date, $event->event_type, 
        $event->is_school, $event->is_cup);

    $wpdb->query($sql);

    $event_id = $wpdb->insert_id;
    
    //insert gender competitions
    if(!!$event->title_male && !!$event->title_female)
    {
        $sql = $wpdb->prepare("INSERT INTO $tb_competitions (name, location, gender, start_date, end_date, type, is_jun, is_cup, event_id) VALUES (%s, %s, %s, %s, %s, %d, %s, %s, %d)", 
        $event->title_male, $event->location, 'male', $event->start_date, $event->end_date, $event->event_type_id, $event->is_school == 1 ? 'true' : 'false', $event->is_cup == 1 ? 'true' : 'false', $event_id);
    
        $wpdb->query($sql);
    
        $sql = $wpdb->prepare("INSERT INTO $tb_competitions (name, location, gender, start_date, end_date, type, is_jun, is_cup, event_id) VALUES (%s, %s, %s, %s, %s, %d, %s, %s, %d)", 
        $event->title_female, $event->location, 'female', $event->start_date, $event->end_date, $event->event_type_id, $event->is_school == 1 ? 'true' : 'false', $event->is_cup == 1 ? 'true' : 'false', $event_id);
    
        $wpdb->query($sql);
    }

    $response = new StdClass();
    $response->status = "Success";
    $response->message = "Змагання було успішно створене!";

    echo json_encode($response);
    
}else {
    header("HTTP/1.1 401 Unauthorized");
}

function fix_string($string)
{
    return trim(stripslashes($string));
}