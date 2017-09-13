<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        $tb_weight_categories = $wpdb->get_blog_prefix()."weight_categories";
        $tb_levels = $wpdb->get_blog_prefix()."levels";
    
        $competition = esc_sql($_POST["competition"]);
        $gender = esc_sql($_POST["gender"]);
        $team = esc_sql($_POST["team"]);
        $type = esc_sql($_POST["type"]);
        
        $sql = $wpdb->prepare("SELECT $tb_nominations.id, $tb_nominations.surname, $tb_nominations.first_name AS name, $tb_nominations.birth_date AS born, 
        $tb_nominations.division, $tb_weight_categories.name AS wClass, $tb_nominations.weight_class AS wId, $tb_nominations.squat, $tb_nominations.benchpress,
        $tb_nominations.deadlift, $tb_nominations.total, $tb_nominations.reserve, $tb_nominations.status, $tb_nominations.city, $tb_nominations.fst, $tb_nominations.school,
        $tb_nominations.club, $tb_levels.name AS level, $tb_nominations.coaches
         FROM $tb_nominations JOIN $tb_weight_categories
         ON $tb_nominations.weight_class = $tb_weight_categories.id
         JOIN $tb_levels
         ON $tb_nominations.level = $tb_levels.id
         WHERE $tb_nominations.competition = %d AND $tb_nominations.gender = %s AND $tb_nominations.team = %d AND $tb_nominations.type = %s", $competition, $gender, $team, $type);
         $nominations = $wpdb->get_results($sql);
         $result = json_encode($nominations);
         print_r($result);
    }
