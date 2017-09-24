<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_competitions = $wpdb->get_blog_prefix()."competitions";

    $name = stripslashes($_POST["name"]);
    $location = stripslashes($_POST["location"]);
    $gender = stripslashes($_POST["gender"]);
    $startDate = stripslashes($_POST["startDate"]);
    $endDate = stripslashes($_POST["endDate"]);
    $typeId = stripslashes($_POST["typeId"]);
    $isJun = stripslashes($_POST["isJun"]);

    $sql = $wpdb->prepare("INSERT INTO $tb_competitions (name, location, gender, start_date, end_date, type, is_jun) VALUES (%s, %s, %s, %s, %s, %d, %s)", 
    $name, $location, $gender, $startDate, $endDate, $typeId, $isJun);
    if($wpdb->query($sql)) print_r("Competition was created");
endif;