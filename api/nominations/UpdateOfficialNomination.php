<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{  
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
        $id = esc_sql($_POST["id"]);
        $type = esc_sql($_POST["type"]);
        $surname = esc_sql($_POST["surname"]);
        $firstName = esc_sql($_POST["firstName"]);
        $middleName = esc_sql($_POST["middleName"]);
        $team = esc_sql($_POST["team"]);
        $isReferee = esc_sql($_POST["isReferee"]);
        $refCategory = esc_sql($_POST["refCategory"]);
        $refRemark = esc_sql($_POST["refRemark"]);
        $competition = esc_sql($_POST["competition"]);        
        
        $sql = $wpdb->prepare("UPDATE $tb_nominations SET type = %s, surname = %s, first_name = %s, team = %d, 
        is_official = %s, duty = %s, is_referee = %s, ref_category = %s, ref_remark = %s, competition = %d, middle_name = %s WHERE id=%d", 
        $type, $surname, $firstName, $team, $isOfficial, $duty, $isReferee, $refCategory, $refRemark, $competition, $middleName, $id);
        if($wpdb->query($sql)) print_r("Nomination was saved");        
    }    