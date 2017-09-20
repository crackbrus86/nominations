<?php
include_once("../connect.php");
if(current_user_can('edit_others_pages')):
    $tb_regions = $wpdb->get_blog_prefix()."regions";

    $id = stripslashes($_POST["id"]);
    $name = stripslashes($_POST["name"]);
    $login = stripslashes($_POST["login"]);
    $token = stripslashes($_POST["token"]);
    $email = stripslashes($_POST["email"]);

    $sql = $wpdb->prepare("UPDATE $tb_regions SET name = %s, login = %s, token = %s, email = %s WHERE id = %d", $name, $login, $token, $email, $id);
    if($wpdb->query($sql)) print_r("Region was updated");
endif;