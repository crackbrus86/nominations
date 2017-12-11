<?php
    include_once("../connect.php");
    if(current_user_can("edit_others_pages")):
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $id = esc_sql($_POST["id"]);
        $status = esc_sql($_POST["status"]);

        $sql = $wpdb->prepare("UPDATE $tb_nominations SET status = %s WHERE id = %d", $status, $id);
        if($wpdb->query($sql)) echo "Status was changed";
    endif;