<?php
    include_once("../connect.php");
    if(current_user_can("edit_others_pages")):   
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $type = stripslashes($_POST["type"]);
        $surname = stripslashes($_POST["surname"]);
        $firstName = stripslashes($_POST["firstName"]);
        $middleName = stripslashes($_POST["middleName"]);
        $team = stripslashes($_POST["team"]);
        $isReferee = stripslashes($_POST["isReferee"]);
        $refCategory = stripslashes($_POST["refCategory"]);
        $refRemark = stripslashes($_POST["refRemark"]);
        $competition = stripslashes($_POST["competition"]);
        $status = stripslashes($_POST["status"]);

        $sql = $wpdb->prepare("INSERT INTO $tb_nominations (type, surname, first_name, team, is_official, duty, is_referee, ref_category, ref_remark, middle_name, competition, status) 
            VALUES (%s, %s, %s, %d, %s, %s, %s, %s, %s, %s, %d, %s)", $type, $surname, $firstName, $team, $isOfficial, $duty, $isReferee, $refCategory,
            $refRemark, $middleName, $competition, $status);
        if($wpdb->query($sql)) print_r("Nomination was saved");
    endif;