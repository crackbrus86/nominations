<?php
    include_once("../connect.php");
    if(current_user_can("edit_others_pages")):
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";
        $tb_referee_busy = $wpdb->get_blog_prefix() . "nom_referee_busy";

        $id = esc_sql($_POST["id"]);

        $sql = $wpdb->prepare("DELETE FROM $tb_referee_busy WHERE nomination_id = %d", $id);
        $wpdb->query($sql);

        $sql = $wpdb->prepare("DELETE FROM $tb_nominations WHERE id = %d", $id);
        if($wpdb->query($sql)) echo "Nomination was deleted";
    endif;