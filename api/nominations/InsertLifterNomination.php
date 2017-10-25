<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{    
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
        $type = stripslashes($_POST["type"]);
        $surname = stripslashes($_POST["surname"]);
        $firstName = stripslashes($_POST["firstName"]);
        $mName = stripslashes($_POST["mName"]);
        $birthDate = stripslashes($_POST["birthDate"]);
        $gender = stripslashes($_POST["gender"]);
        $team = stripslashes($_POST["team"]);
        $city = stripslashes($_POST["city"]);
        $fst = stripslashes($_POST["fst"]);
        $club = stripslashes($_POST["club"]);
        $school = stripslashes($_POST["school"]);
        $level = stripslashes($_POST["level"]);        
        $division = stripslashes($_POST["division"]);
        $weightClass = stripslashes($_POST["weightClass"]);
        $squat = stripslashes($_POST["squat"]);
        $benchpress = stripslashes($_POST["benchpress"]);
        $deadlift = stripslashes($_POST["deadlift"]);
        $total = stripslashes($_POST["total"]);
        $reserve = stripslashes($_POST["reserve"]);
        $competition = stripslashes($_POST["competition"]);
        $coaches = stripslashes($_POST["coaches"]);
        $status = stripslashes($_POST["status"]);  
            
        $sql = $wpdb->prepare("INSERT INTO $tb_nominations (type, surname, first_name, birth_date, gender, team, division, weight_class,
            squat, benchpress, deadlift, total, reserve, competition, status, city, fst, club, school, level, coaches, middle_name) VALUES 
            (%s, %s, %s, %s, %s, %d, %s, %d, %f, %f, %f, %f, %s, %d, %s, %s, %s, %s, %s, %d, %s, %s)", $type, $surname, $firstName,
            $birthDate, $gender, $team, $division, $weightClass, $squat, $benchpress, $deadlift, $total, $reserve, $competition, $status,
            $city, $fst, $club, $school, $level, $coaches, $mName);
        if($wpdb->query($sql)) print_r("Nomination was saved");
    }