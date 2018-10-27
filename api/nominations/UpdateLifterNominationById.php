<?php
    include_once("../connect.php");
    include_once("../competitions/getStatus.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{  
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
        $id = stripslashes($_POST["id"]);
        $type = stripslashes($_POST["type"]);
        $surname = stripslashes($_POST["surname"]);
        $firstName = stripslashes($_POST["firstName"]);
        $birthDate = stripslashes($_POST["birthDate"]);
        $gender = stripslashes($_POST["gender"]);
        $team = stripslashes($_POST["team"]);
        $division = stripslashes($_POST["division"]);
        $weightClass = stripslashes($_POST["weightClass"]);
        $squat = stripslashes($_POST["squat"]);
        $benchpress = stripslashes($_POST["benchpress"]);
        $deadlift = stripslashes($_POST["deadlift"]);
        $total = stripslashes($_POST["total"]);
        $personally = stripslashes($_POST["personally"]);
        $competition = stripslashes($_POST["competition"]);
        $city = stripslashes($_POST["city"]);
        $fst = stripslashes($_POST["fst"]);
        $club = stripslashes($_POST["club"]);
        $school = stripslashes($_POST["school"]);
        $level = stripslashes($_POST["level"]); 
        $coaches = stripslashes($_POST["coaches"]); 
        $mName = stripslashes($_POST["mName"]);
        $outOfContest = stripslashes($_POST["outOfContest"]);
        
        $statuses = getStatuses($competition);
        if($statuses->previous || $statuses->final){
            $sql = $wpdb->prepare("UPDATE $tb_nominations SET type = %s, surname = %s, first_name = %s, birth_date = %s, gender = %s, team = %d, 
            division = %s, weight_class = %d, squat = %f, benchpress = %f, deadlift = %f, total = %f, personally = %d, competition = %d, city = %s,
            fst = %s, club = %s, school = %s, level = %d, coaches = %s, middle_name = %s, outOfContest = %d WHERE id=%d", 
            $type, $surname, $firstName, $birthDate, $gender, $team, $division, $weightClass, $squat, $benchpress, $deadlift, $total, $personally, 
            $competition, $city, $fst, $club, $school, $level, $coaches, $mName, $outOfContest, $id);
            if($wpdb->query($sql)) print_r("Nomination was saved");  
        }else{
            print_r("Expired");
        }      
    }