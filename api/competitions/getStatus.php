<?php
    include_once("../connect.php");

    function getStatuses($compId){
        global $wpdb;
        $tb_competitions = $wpdb->get_blog_prefix()."competitions";
        $sql = $wpdb->prepare("SELECT IF(CURDATE() <= DATE(start_date) - INTERVAL 16 Day, 1, 0 ) AS previous,
        IF(CURDATE() > DATE(start_date) - INTERVAL 16 Day AND CURDATE() <= DATE(start_date) - INTERVAL 10 Day, 1, 0 ) AS final,
        IF(CURDATE() > DATE(start_date) - INTERVAL 10 Day AND CURDATE() <= DATE(start_date) - INTERVAL 7 Day, 1, 0 ) AS weekBefore,
        IF(CURDATE() > DATE(start_date) - INTERVAL 7 Day AND CURDATE() <= DATE(start_date), 1, 0 ) AS meeting
        FROM $tb_competitions WHERE id = %d", $compId);
        $result = $wpdb->get_results($sql, OBJECT);
        return $result[0];
    }