<?php
    if(isset($_SESSION["regionObj"]) && !isset($_GET["logout"])){
        echo "<a href='/enter-as-regional-officer/?logout=".$_SESSION["regionObj"]->id."' id='nom-out'>Вийти</a> <span id='nom-name'>Ви увійшли як область(місто)[".$_SESSION["regionObj"]->name."]</span>";
    }else{
        echo "<a href='/enter-as-regional-officer/' id='nom-auth-button'>Увійти</a>";
    }