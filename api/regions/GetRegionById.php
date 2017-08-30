<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_regions = $wpdb->get_blog_prefix()."regions";
    $id = esc_sql($_POST["id"]);
    $sql = $wpdb->prepare("SELECT * FROM $tb_regions WHERE id = %d", $id);
    $regions = $wpdb->get_results($sql);
    $result = json_encode($regions);
    print_r($result);
endif;