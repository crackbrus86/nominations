<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{    
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
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
        $status = esc_sql($_POST["status"]);  
            
        $sql = $wpdb->prepare("INSERT INTO $tb_nominations (type, surname, first_name, birth_date, gender, team, division, weight_class,
            squat, benchpress, deadlift, total, reserve, competition, status) VALUES (%s, %s, %s, %s, %s, %d, %s, %d, %f, %f, %f, %f, %s, %d, %s)", $type, $surname, $firstName,
            $birthDate, $gender, $team, $division, $weightClass, $squat, $benchpress, $deadlift, $total, $reserve, $competition, $status);
        if($wpdb->query($sql)) print_r("Nomination was saved");
    }