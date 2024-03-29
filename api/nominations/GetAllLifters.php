<?php
    include_once("../connect.php");
    $tb_nominations = $wpdb->get_blog_prefix()."nominations";
    $tb_weight_categories = $wpdb->get_blog_prefix()."weight_categories";
    $tb_levels = $wpdb->get_blog_prefix()."levels";
    $competition = esc_sql($_POST["competition"]);
    $gender = esc_sql($_POST["gender"]);
    $type = esc_sql($_POST["type"]);
        
    $sql = $wpdb->prepare("SELECT $tb_nominations.id, $tb_nominations.status, $tb_nominations.surname, $tb_nominations.first_name AS name, $tb_nominations.birth_date AS born, $tb_nominations.team as team, 
        $tb_nominations.division, NULL AS wClass, $tb_nominations.weight_class AS wId, $tb_nominations.squat, $tb_nominations.benchpress,
        $tb_nominations.deadlift, $tb_nominations.total, $tb_nominations.personally, $tb_nominations.city, $tb_nominations.fst, $tb_nominations.school,
        $tb_nominations.club, $tb_levels.name AS level, $tb_nominations.coaches, $tb_nominations.middle_name AS mName, $tb_nominations.outOfContest,
        $tb_nominations.comment
         FROM $tb_nominations
         JOIN $tb_levels
         ON $tb_nominations.level = $tb_levels.id         
         WHERE $tb_nominations.competition = %d AND $tb_nominations.gender = %s AND $tb_nominations.type = %s", $competition, $gender, $type);
    $nominations = $wpdb->get_results($sql);
    $result = json_encode($nominations);
    print_r($result);
