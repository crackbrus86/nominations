<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_regions = $wpdb->get_blog_prefix()."regions";

    $id = esc_sql($_POST["id"]);
    $name = esc_sql($_POST["name"]);
    $login = esc_sql($_POST["login"]);
    $token = esc_sql($_POST["token"]);
    $email = esc_sql($_POST["email"]);

    $sql = $wpdb->prepare("UPDATE $tb_regions SET name = %s, login = %s, token = %s, email = %s WHERE id = %d", $name, $login, $token, $email, $id);
    if($wpdb->query($sql)) print_r("Region was updated");
endif;