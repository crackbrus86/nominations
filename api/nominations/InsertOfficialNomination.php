<?php
    include_once("../connect.php");
    $tb_nominations = $wpdb->get_blog_prefix()."nominations";

    $type = esc_sql($_POST["type"]);
    $surname = esc_sql($_POST["surname"]);
    $firstName = esc_sql($_POST["firstName"]);
    $team = esc_sql($_POST["team"]);
    $isOfficial = esc_sql($_POST["isOfficial"]);
    $duty = esc_sql($_POST["duty"]);
    $isReferee = esc_sql($_POST["isReferee"]);
    $refCategory = esc_sql($_POST["refCategory"]);
    $refRemark = esc_sql($_POST["refRemark"]);
    $competition = esc_sql($_POST["competition"]);
    $status = esc_sql($_POST["status"]);

    $sql = $wpdb->prepare("INSERT INTO $tb_nominations (type, surname, first_name, team, is_official, duty, is_referee, ref_category, ref_remark, competition, status) 
        VALUES (%s, %s, %s, %d, %s, %s, %s, %s, %s, %d, %s)", $type, $surname, $firstName, $team, $isOfficial, $duty, $isReferee, $refCategory,
        $refRemark, $competition, $status);
    if($wpdb->query($sql)) print_r("Nomination was saved");