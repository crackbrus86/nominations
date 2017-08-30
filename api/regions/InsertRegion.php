<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_regions = $wpdb->get_blog_prefix()."regions";

    $name = esc_sql($_POST["name"]);
    $login = esc_sql($_POST["login"]);
    $token = esc_sql($_POST["token"]);
    $email = esc_sql($_POST["email"]);

    $sql = $wpdb->prepare("INSERT INTO $tb_regions (name, login, token, email) VALUES (%s, %s, %s, %s)", $name, $login, $token, $email);
    if($wpdb->query($sql)) print_r("Region was created");
endif;