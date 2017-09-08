<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $id = esc_sql($_POST["id"]);

        $sql = $wpdb->prepare("SELECT id, type, surname, first_name AS firstName, team, is_official AS isOfficial, 
        duty, is_referee AS isReferee, ref_category AS refCategory, ref_remark AS refRemark, competition, status FROM $tb_nominations WHERE id = %d", $id);
        $nomination = $wpdb->get_results($sql);
        $result = json_encode($nomination);
        print_r($result);        
    }