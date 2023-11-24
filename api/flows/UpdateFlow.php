<?php
    include_once("../connect.php");

    if(current_user_can("edit_others_pages"))
    {
        $json = file_get_contents("php://input");
        $flow = json_decode($json);

        //insert flow weight classes
        $tb_flow_weight_classes = $wpdb->get_blog_prefix() . "nom_flow_weight_classes";

        $sql = $wpdb->prepare("DELETE FROM $tb_flow_weight_classes WHERE flow_id = %d", $flow->flowId);
        $wpdb->query($sql);

        foreach($flow->weight_classes as $weight_class)
        {
            $sql = $wpdb->prepare("INSERT INTO $tb_flow_weight_classes (flow_id, division_id, weight_class_id)
            VALUES (%d, %d, %d)", $flow->flowId, $weight_class->divisionId, $weight_class->weightClassId);
            $wpdb->query($sql);
        }

        $response = new StdClass();
        $response->status = "Success";
        $response->message = "Потік був успішно оновлений!";

        echo json_encode($response);
    } else {
        header("HTTP/1.1 401 Unauthorized");
    }