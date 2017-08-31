<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_competitions = $wpdb->get_blog_prefix()."competitions";
    $id = esc_sql($_POST["id"]);
    $sql = $wpdb->prepare("DELETE FROM $tb_competitions WHERE id = %d", $id);
    if($wpdb->query($sql)) print_r("Competition was removed");
endif;