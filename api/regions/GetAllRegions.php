<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_regions = $wpdb->get_blog_prefix()."regions";
    $sql = $wpdb->prepare("SELECT * FROM $tb_regions", "");
    $regions = $wpdb->get_results($sql);
    $result = json_encode($regions);
    print_r($result);
endif;