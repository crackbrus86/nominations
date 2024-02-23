<?php
include_once("../connect.php");

if(current_user_can("edit_others_pages"))
{
    $event_id =     $_GET['eventId'];
    $referee = $_GET['referee'];

    $tb_flows = $wpdb->get_blog_prefix() . 'nom_flows';
    $sql = $wpdb->prepare("SELECT flow_id, day_of_flow, sort_order 
        FROM $tb_flows 
        WHERE event_id = %d
        ORDER BY sort_order", $event_id);
    $flows = $wpdb->get_results($sql);

    $tb_flow_weight_classes = $wpdb->get_blog_prefix() . "nom_flow_weight_classes";
    foreach($flows as $flow) 
    {
        $sql = $wpdb->prepare("SELECT division_id, weight_class_id 
            FROM $tb_flow_weight_classes 
            WHERE flow_id = %d ORDER BY division_id, weight_class_id", $flow->flow_id);
        $weight_classes = $wpdb->get_results($sql);
        $flow->weight_classes = $weight_classes;
    }

    $tb_flow_referee_records = $wpdb->get_blog_prefix() ."nom_flow_referee_records";

    foreach($flows as $flow)
    {
        $sql = $wpdb->prepare("SELECT flow_referee_record_id, referee_id, referee_status 
            FROM $tb_flow_referee_records
        WHERE flow_id = %d AND referee_status = 0 AND referee_id = %s", $flow->flow_id, $referee);
        $referee_records = $wpdb->get_results($sql);
        $flow->busy = count($referee_records) > 0 ? TRUE : FALSE;
    }

    $result = new StdClass();

    $tb_events = $wpdb->get_blog_prefix() ."nom_events";
    $sql = $wpdb->prepare("SELECT start_date, end_date FROM $tb_events WHERE id = %d", $event_id);
    $event = $wpdb->get_row($sql);

    $days = array();

    array_push($days, $event->start_date);
    while(array_search($event->end_date, $days) == FALSE)
    {
        $day = date_create(end($days));
        date_add($day, date_interval_create_from_date_string("1 day"));
        array_push($days, date_format($day, "Y-m-d H:i:s"));
    }

    $result->days = $days;

    $actual_flows = array_filter($flows, "is_flow_in_range");
    $output_actual_flows = array();
    foreach($actual_flows as $actual_flow)
    {
        array_push($output_actual_flows, $actual_flow);
    }
    $result->flows = $output_actual_flows;

    $response = new StdClass();
    $response->status = "Success";
    $response->message = NULL;
    $response->data = $result;

    echo json_encode($response);
} else {
    header("HTTP/1.1 401 Unauthorized");
}

function is_flow_in_range($flow)
{
    global $event;
    return (strtotime($event->start_date) <= strtotime($flow->day_of_flow)) 
        && (strtotime($flow->day_of_flow) <= strtotime($event->end_date));
}