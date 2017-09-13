<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{  
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
        $id = esc_sql($_POST["id"]);
        $type = esc_sql($_POST["type"]);
        $surname = esc_sql($_POST["surname"]);
        $firstName = esc_sql($_POST["firstName"]);
        $birthDate = esc_sql($_POST["birthDate"]);
        $gender = esc_sql($_POST["gender"]);
        $team = esc_sql($_POST["team"]);
        $division = esc_sql($_POST["division"]);
        $weightClass = esc_sql($_POST["weightClass"]);
        $squat = esc_sql($_POST["squat"]);
        $benchpress = esc_sql($_POST["benchpress"]);
        $deadlift = esc_sql($_POST["deadlift"]);
        $total = esc_sql($_POST["total"]);
        $reserve = esc_sql($_POST["reserve"]);
        $competition = esc_sql($_POST["competition"]);
        $city = esc_sql($_POST["city"]);
        $fst = esc_sql($_POST["fst"]);
        $club = esc_sql($_POST["club"]);
        $school = esc_sql($_POST["school"]);
        $level = esc_sql($_POST["level"]); 
        $coaches = esc_sql($_POST["coaches"]);                
        
        $sql = $wpdb->prepare("UPDATE $tb_nominations SET type = %s, surname = %s, first_name = %s, birth_date = %s, gender = %s, team = %d, 
        division = %s, weight_class = %d, squat = %f, benchpress = %f, deadlift = %f, total = %f, reserve = %s, competition = %d, city = %s,
        fst = %s, club = %s, school = %s, level = %d, coaches = %s WHERE id=%d", 
        $type, $surname, $firstName, $birthDate, $gender, $team, $division, $weightClass, $squat, $benchpress, $deadlift, $total, $reserve, 
        $competition, $city, $fst, $club, $school, $level, $coaches, $id);
        if($wpdb->query($sql)) print_r("Nomination was saved");        
    }