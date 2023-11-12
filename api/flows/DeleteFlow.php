<?php
    include_once("../connect.php");

    if(current_user_can("edit_others_pages"))
    {
        $json = file_get_contents("php://input");
        $flow = json_decode($json);

        //delete flow weight classes
        $tb_flow_weight_classes = $wpdb->get_blog_prefix() . "nom_flow_weight_classes";
        $sql = $wpdb->prepare("DELETE FROM $tb_flow_weight_classes WHERE flow_id = %d", $flow->flowId);
        $wpdb->query($sql);

        //delete flow referee records
        $tb_flow_referee_records = $wpdb->get_blog_prefix() . "nom_flow_referee_records";
        $sql = $wpdb->prepare("DELETE FROM $tb_flow_referee_records WHERE flow_id = %d", $flow->flowId);
        $wpdb->query($sql);

        //delete flow
        $tb_flows = $wpdb->get_blog_prefix() . "nom_flows";
        $sql = $wpdb->prepare("DELETE FROM $tb_flows WHERE flow_id = %d", $flow->flowId);
        $wpdb->query($sql);

        $response = new StdClass();
        $response->status = "Success";
        $response->message = "Потік був успішно видалений!";

        echo json_encode($response);
    } else {
        header("HTTP/1.1 401 Unauthorized");
    }