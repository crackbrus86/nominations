<?php
    include_once("../connect.php");
    if(current_user_can("edit_others_pages")):
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $id = esc_sql($_POST["id"]);
        $sql = $wpdb->prepare("DELETE FROM $tb_nominations WHERE id = %d", $id);
        if($wpdb->query($sql)) echo "Nomination was deleted";
    endif;