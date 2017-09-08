<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $competition = esc_sql($_POST["competition"]);
        $team = esc_sql($_POST["team"]);
        $type = esc_sql($_POST["type"]);
        
        $isReferee = "true";

        $sql = $wpdb->prepare("SELECT id, surname, first_name AS firstName, ref_category AS refCategory, ref_remark AS refRemark FROM $tb_nominations WHERE competition = %d AND
        team = %d AND type = %s AND is_referee = %s", $competition, $team, $type, $isReferee);
        $nominations = $wpdb->get_results($sql);
        $result = json_encode($nominations);
        print_r($result);        
    }