<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{     
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $type = esc_sql($_POST["type"]);
        $surname = esc_sql($_POST["surname"]);
        $firstName = esc_sql($_POST["firstName"]);
        $middleName = esc_sql($_POST["middleName"]);
        $team = esc_sql($_POST["team"]);
        $isReferee = esc_sql($_POST["isReferee"]);
        $refCategory = esc_sql($_POST["refCategory"]);
        $refRemark = esc_sql($_POST["refRemark"]);
        $competition = esc_sql($_POST["competition"]);
        $status = esc_sql($_POST["status"]);

        $sql = $wpdb->prepare("INSERT INTO $tb_nominations (type, surname, first_name, team, is_official, duty, is_referee, ref_category, ref_remark, middle_name, competition, status) 
            VALUES (%s, %s, %s, %d, %s, %s, %s, %s, %s, %s, %d, %s)", $type, $surname, $firstName, $team, $isOfficial, $duty, $isReferee, $refCategory,
            $refRemark, $middleName, $competition, $status);
        if($wpdb->query($sql)) print_r("Nomination was saved");
    }