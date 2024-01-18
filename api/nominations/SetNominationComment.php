<?php
    include_once("../connect.php");
    if(current_user_can("edit_others_pages")):
        $tb_nominations = $wpdb->get_blog_prefix()."nominations";

        $id = esc_sql($_POST["id"]);
        $comment = esc_sql($_POST["comment"]);

        $sql = $wpdb->prepare("UPDATE $tb_nominations SET comment = %s WHERE id = %d", $comment, $id);
        if($wpdb->query($sql)) echo "Comment was updated";
    endif;