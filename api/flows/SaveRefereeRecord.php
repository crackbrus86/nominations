<?php
    include_once("../connect.php");

    if(current_user_can("edit_others_pages"))
    {
        $json = file_get_contents("php://input");
        $refereeRecord = json_decode($json);

        $tb_flow_referee_records = $wpdb->get_blog_prefix() . "nom_flow_referee_records";
        $sql = $wpdb->prepare("DELETE FROM $tb_flow_referee_records WHERE flow_id = %d AND referee_id = %s", $refereeRecord->flowId, $refereeRecord->refereeId);
        $wpdb->query($sql);

        if($refereeRecord->refereeStatus != 1000)
        {
            $sql = $wpdb->prepare("INSERT INTO $tb_flow_referee_records (flow_id, referee_id, referee_status) 
                VALUES (%d, %s, %d)", $refereeRecord->flowId, $refereeRecord->refereeId, $refereeRecord->refereeStatus);
            $wpdb->query($sql);
        }

        $response = new StdClass();
        $response->status = "Success";
        $response->message = NULL;

        echo json_encode($response);
    } else {
        header("HTTP/1.1 401 Unauthorized");
    }