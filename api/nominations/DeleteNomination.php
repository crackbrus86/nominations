<?php
    include_once("../connect.php");
    include_once("../competitions/getStatus.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{ 
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        $id = esc_sql($_POST["id"]);
        $sql = $wpdb->prepare("SELECT competition FROM $tb_nominations WHERE id = %d", $id);
        $competition = $wpdb->get_var($sql);
        $statuses = getStatuses($competition);
        if($statuses->previous || $statuses->final || $statuses->weekBefore){
            $sql = $wpdb->prepare("DELETE FROM $tb_nominations WHERE id = %d", $id);
            if($wpdb->query($sql)) echo "Nomination was deleted";
        }else{
            print_r("Expired");
        }
    }