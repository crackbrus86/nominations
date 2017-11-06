<?php
    include_once("../connect.php");
    if(current_user_can("edit_others_pages")){
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
        $id = esc_sql($_POST["id"]);
        
        $sql = $wpdb->prepare("SELECT id, type, surname, first_name AS firstName, birth_date AS birthDate, middle_name AS mName, gender, team,
        city, fst, club, school, level, coaches,
        division, weight_class AS weightClass, squat, benchpress, deadlift, total, reserve, competition, status FROM $tb_nominations WHERE id = %d", $id);
        $nomination = $wpdb->get_results($sql);
        $result = json_encode($nomination);
        print_r($result);        
    }