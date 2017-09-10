<?php
    include_once("../connect.php");
    $tb_nominations = $wpdb->get_blog_prefix()."nominations";

    $competition = esc_sql($_POST["competition"]);
    $type = esc_sql($_POST["type"]);
    $isReferee = "true";

    $sql = $wpdb->prepare("SELECT id, surname, first_name AS firstName, team, ref_category AS refCategory, ref_remark AS refRemark 
    FROM $tb_nominations WHERE competition = %d AND type = %s AND is_referee = %s", $competition, $type, $isReferee);
    $nominations = $wpdb->get_results($sql);
    $result = json_encode($nominations);
    print_r($result);
        