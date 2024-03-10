<?php
    include_once("../connect.php");

    $competition = esc_sql($_POST["competition"]);
    $type = esc_sql($_POST["type"]);
    $isReferee = "true";

    $sql = $wpdb->prepare("SELECT 
            wn.id, 
            wn.status, 
            wn.surname, 
            wn.first_name AS firstName, 
            wn.middle_name AS middleName, 
            team,
            wn.ref_category AS refCategory, 
            wn.ref_remark AS refRemark, 
            wn.comment 
        FROM `wp_competitions` wc
        JOIN `wp_competitions` wc2 ON wc2.event_id = wc.event_id
        JOIN `wp_nominations` wn ON wn.competition = wc2.id AND wn.type = %s AND wn.is_referee = %s
        WHERE wc.id = %d ", $type, $isReferee, $competition);

    $nominations = $wpdb->get_results($sql);
    $result = json_encode($nominations);
    print_r($result);
        