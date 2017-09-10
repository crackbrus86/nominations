<?php
    include_once("../connect.php");
    $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
    $competition = esc_sql($_POST["competition"]);
    $type = esc_sql($_POST["type"]);
    $isOfficial = "true";

    $sql = $wpdb->prepare("SELECT id, surname, first_name AS firstName, team, duty FROM $tb_nominations WHERE 
        competition = %d AND type = %s AND is_official = %s", $competition, $type, $isOfficial);
    $nominations = $wpdb->get_results($sql);
    $result = json_encode($nominations);
    print_r($result);