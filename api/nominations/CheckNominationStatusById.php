<?php
    include_once("../connect.php");
    if(empty($_SESSION["regionObj"])){
        echo "None";
    }else{
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $id = esc_sql($_POST["id"]);
        $status = esc_sql($_POST["status"]);

        $sql = $wpdb->prepare("UPDATE $tb_nominations SET status = %s WHERE id = %d", $status, $id);
        if($wpdb->query($sql)) echo "Status was changed";
    }