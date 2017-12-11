<?php
    if(isset($_SESSION["regionObj"]) && !isset($_GET["logout"])){
        echo "<div id='nom-mng'><a href='/nominations-management/'>Управління номінаціями</a></div>";
    }