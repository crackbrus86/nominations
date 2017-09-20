<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{  
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        
        $id = stripslashes($_POST["id"]);
        $type = stripslashes($_POST["type"]);
        $surname = stripslashes($_POST["surname"]);
        $firstName = stripslashes($_POST["firstName"]);
        $middleName = stripslashes($_POST["middleName"]);
        $team = stripslashes($_POST["team"]);
        $isReferee = stripslashes($_POST["isReferee"]);
        $refCategory = stripslashes($_POST["refCategory"]);
        $refRemark = stripslashes($_POST["refRemark"]);
        $competition = stripslashes($_POST["competition"]);        
        
        $sql = $wpdb->prepare("UPDATE $tb_nominations SET type = %s, surname = %s, first_name = %s, team = %d, 
        is_official = %s, duty = %s, is_referee = %s, ref_category = %s, ref_remark = %s, competition = %d, middle_name = %s WHERE id=%d", 
        $type, $surname, $firstName, $team, $isOfficial, $duty, $isReferee, $refCategory, $refRemark, $competition, $middleName, $id);
        if($wpdb->query($sql)) print_r("Nomination was saved");        
    }    