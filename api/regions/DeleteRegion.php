<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_regions = $wpdb->get_blog_prefix()."regions";
    $id = esc_sql($_POST["id"]);
    $sql = $wpdb->prepare("DELETE FROM $tb_regions WHERE id = %s", $id);
    if($wpdb->query($sql)) print_r("Region was created");
endif;