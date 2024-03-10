<?php
    include_once("../connect.php");
    if(current_user_can("edit_others_pages")):  
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        $tb_referee_busy = $wpdb->get_blog_prefix() . "nom_referee_busy";
        
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
        $wcBusy = $_POST["wcBusy"];

        $sql = $wpdb->prepare("DELETE FROM $tb_referee_busy WHERE nomination_id = %d", $id);
        $wpdb->query($sql);

        foreach($wcBusy as $wcRecord) 
        {
            $weightClassId = $wcRecord["weightClassId"];
            $divisionId = $wcRecord["divisionId"];
            $sql = $wpdb->prepare("INSERT INTO $tb_referee_busy (event_id, division_id, weight_class_id, nomination_id)
                VALUES (%d, %d, %d, %d)", $competition, $divisionId, $weightClassId, $id);

            $wpdb->query($sql);
        }
        
        $sql = $wpdb->prepare("UPDATE $tb_nominations SET type = %s, surname = %s, first_name = %s, team = %d, 
        is_official = %s, duty = %s, is_referee = %s, ref_category = %s, ref_remark = %s, competition = %d, middle_name = %s WHERE id=%d", 
        $type, $surname, $firstName, $team, $isOfficial, $duty, $isReferee, $refCategory, $refRemark, $competition, $middleName, $id);
        if($wpdb->query($sql)) print_r("Nomination was saved");        
    endif;    