<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_competitions = $wpdb->get_blog_prefix()."competitions";

    $id = stripslashes($_POST["id"]);
    $name = stripslashes($_POST["name"]);
    $location = stripslashes($_POST["location"]);
    $gender = stripslashes($_POST["gender"]);
    $startDate = stripslashes($_POST["startDate"]);
    $endDate = stripslashes($_POST["endDate"]);
    $typeId = stripslashes($_POST["typeId"]);
    $isJun = stripslashes($_POST["isJun"]);

    $sql = $wpdb->prepare("UPDATE $tb_competitions SET name = %s, location = %s, gender = %s, start_date = %s, end_date = %s, type = %d, is_jun = %s WHERE id = %d", 
    $name, $location, $gender, $startDate, $endDate, $typeId, $isJun, $id);
    if($wpdb->query($sql)) print_r("Competition was updated");
endif;