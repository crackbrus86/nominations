<?php
    if(isset($_POST["login"]) && isset($_POST["token"]) && !isset($_SESSION["regionObj"])){
        global $wpdb;
        $tb_regions = $wpdb->get_blog_prefix()."regions";
        $login = esc_sql($_POST["login"]);
        $token = esc_sql($_POST["token"]);
        $sql = $wpdb->prepare("SELECT * FROM $tb_regions WHERE login = %s AND token = %s", $login, $token);
        $result = $wpdb->get_row($sql);
        if($result) {
            $_SESSION["regionObj"] = $result;
            echo "<script>window.location.reload();</script>";           
        }
    }
    if(isset($_GET["logout"])){
        if($_SESSION["regionObj"]->id === $_GET["logout"]){
            unset($_SESSION["regionObj"]);
        }
    }
    if(isset($_SESSION["regionObj"])){
        echo "<p>Вітаємо, Ви авторизувалися як ".$_SESSION['regionObj']->name."</p>";
    }else{
        ?>
        <div id="nom-auth-form">
            <p>Авторизуйтеся в системі як представник команди</p>
            <form action="/enter-as-regional-officer/" method="post">
            <div><label>Логін</label>
            <input type="text" name="login" maxlength="20" /></div>
            <div><label>Токен</label>
            <input type="password" name="token" maxlength="20" /></div>
            <div><button type="submit">Увійти</button></div>
            </form>
        </div>
        <?php
    }