<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_competitions = $wpdb->get_blog_prefix()."competitions";

    $name = esc_sql($_POST["name"]);
    $location = esc_sql($_POST["location"]);
    $gender = esc_sql($_POST["gender"]);
    $startDate = esc_sql($_POST["startDate"]);
    $endDate = esc_sql($_POST["endDate"]);
    $typeId = esc_sql($_POST["typeId"]);

    $sql = $wpdb->prepare("INSERT INTO $tb_competitions (name, location, gender, start_date, end_date, type) VALUES (%s, %s, %s, %s, %s, %d)", 
    $name, $location, $gender, $startDate, $endDate, $typeId);
    if($wpdb->query($sql)) print_r("Competition was created");
endif;