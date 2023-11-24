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
    $isCup = stripslashes($_POST["isCup"]);
    $eventId = stripslashes($_POST["eventId"]);

    $result = $wpdb->update(
        $tb_competitions,
        array(
            'name' => $name,
            'location' => $location,
            'gender' => $gender,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'type' => $typeId,
            'is_jun' => $isJun,
            'is_cup' => $isCup,
            'event_id' => !$eventId ? NULL : $eventId
        ),
        array(
            'id' => $id
        )
    );

    if($result !== false) print_r("Competition was updated");
endif;