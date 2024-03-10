<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        $tb_nom_referee_busy = $wpdb->get_blog_prefix() . "nom_referee_busy";

        $id = esc_sql($_POST["id"]);

        $sql = $wpdb->prepare("SELECT id, type, surname, first_name AS firstName, middle_name AS middleName, team, is_referee AS isReferee, ref_category AS refCategory, ref_remark AS refRemark, competition, status FROM $tb_nominations WHERE id = %d", $id);
        $nominations = $wpdb->get_results($sql);
        
        foreach($nominations as $nomination)
        {
            $sql = $wpdb->prepare("SELECT id, event_id, division_id, weight_class_id, nomination_id FROM $tb_nom_referee_busy WHERE nomination_id = %d", $nomination->id);
            $weightClassBusy = $wpdb->get_results($sql);
    
            $nomination->wcBusy = $weightClassBusy;
        }

        $result = json_encode($nominations);
        print_r($result);        
    }