<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_regions = $wpdb->get_blog_prefix()."regions";

    $name = stripslashes($_POST["name"]);
    $login = stripslashes($_POST["login"]);
    $token = stripslashes($_POST["token"]);
    $email = stripslashes($_POST["email"]);
    $shortName = stripslashes($_POST["short_name"]);

    $sql = $wpdb->prepare("INSERT INTO $tb_regions (name, login, token, email, short_name) VALUES (%s, %s, %s, %s, %s)", $name, $login, $token, $email, $shortName);
    if($wpdb->query($sql)) print_r("Region was created");
endif;