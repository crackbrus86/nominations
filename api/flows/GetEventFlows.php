<?php
include_once("../connect.php");

if(current_user_can("edit_others_pages"))
{
    $event_id = $_GET['eventId'];

    $tb_flows = $wpdb->get_blog_prefix() . "nom_flows";
    $sql = $wpdb->prepare("SELECT flow_id, day_of_flow, sort_order 
        FROM $tb_flows 
        WHERE event_id = %d
        ORDER BY sort_order", $event_id);
    $result = $wpdb->get_results($sql);
    
    $tb_flow_weight_classes = $wpdb->get_blog_prefix() . "nom_flow_weight_classes";
    $tb_flow_referee_records = $wpdb->get_blog_prefix() . "nom_flow_referee_records";
    foreach($result as $flow)
    {
        $sql = $wpdb->prepare("SELECT division_id, weight_class_id 
            FROM $tb_flow_weight_classes 
            WHERE flow_id = %d ORDER BY division_id, weight_class_id", $flow->flow_id);
        $weight_classes = $wpdb->get_results($sql);
        $flow->weight_classes = $weight_classes;

        $sql = $wpdb->prepare("SELECT referee_id, referee_status FROM $tb_flow_referee_records WHERE flow_id = %d", $flow->flow_id);
        $referees = $wpdb->get_results($sql);
        $flow->referees = $referees;
    }

    $response = new StdClass();
    $response->status = "Success";
    $response->message = NULL;
    $response->data = $result;

    echo json_encode($response);
} else {
    header("HTTP/1.1 401 Unauthorized");
}