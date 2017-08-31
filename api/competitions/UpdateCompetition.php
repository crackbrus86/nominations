<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_competitions = $wpdb->get_blog_prefix()."competitions";

    $id = esc_sql($_POST["id"]);
    $name = esc_sql($_POST["name"]);
    $location = esc_sql($_POST["location"]);
    $gender = esc_sql($_POST["gender"]);
    $startDate = esc_sql($_POST["startDate"]);
    $endDate = esc_sql($_POST["endDate"]);
    $typeId = esc_sql($_POST["typeId"]);

    $sql = $wpdb->prepare("UPDATE $tb_competitions SET name = %s, location = %s, gender = %s, start_date = %s, end_date = %s, type = %d WHERE id = %d", 
    $name, $location, $gender, $startDate, $endDate, $typeId, $id);
    if($wpdb->query($sql)) print_r("Competition was updated");
endif;