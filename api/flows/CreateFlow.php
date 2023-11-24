<?php
    include_once("../connect.php");

    if(current_user_can("edit_others_pages"))
    {
        $json = file_get_contents("php://input");
        $flow = json_decode($json);

        //Get last sort_order for flows of current event
        $tb_flows = $wpdb->get_blog_prefix() . "nom_flows";
        $sql = $wpdb->prepare("SELECT IFNULL(MAX(sort_order), 0) AS max_sort_order FROM $tb_flows WHERE event_id = %d", $flow->event_id);
        $result = $wpdb->get_row($sql);

        $next_sort_order = ++$result->max_sort_order;
        
        //insert flow
        $sql = $wpdb->prepare("INSERT INTO $tb_flows (event_id, day_of_flow, sort_order)
            VALUES(%d, %s, %d)", $flow->event_id, $flow->day_of_flow, $next_sort_order);
        $wpdb->query($sql);

        $flow_id = $wpdb->insert_id;

        //insert flow weight classes
        $tb_flow_weight_classes = $wpdb->get_blog_prefix() . "nom_flow_weight_classes";

        foreach($flow->weight_classes as $weight_class)
        {
            $sql = $wpdb->prepare("INSERT INTO $tb_flow_weight_classes (flow_id, division_id, weight_class_id)
            VALUES (%d, %d, %d)", $flow_id, $weight_class->divisionId, $weight_class->weightClassId);
            $wpdb->query($sql);
        }

        $response = new StdClass();
        $response->status = "Success";
        $response->message = "Потік був успішно створений!";

        echo json_encode($response);
    } else {
        header("HTTP/1.1 401 Unauthorized");
    }