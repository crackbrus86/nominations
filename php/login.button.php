<?php
    if(isset($_SESSION["regionObj"]) && !isset($_GET["logout"])){
        echo "<a href='/login/?logout=".$_SESSION["regionObj"]->id."'>Вийти</a> [".$_SESSION["regionObj"]->name."]";
    }else{
        echo "<a href='/login/'>Увійти</a>";
    }