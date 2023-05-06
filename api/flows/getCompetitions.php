<?php
include_once("../connect.php");

$filter = esc_sql($_GET["filter"]);

$sql = $wpdb->prepare("SELECT 
    comps.id,
    comps.name,
    comps.gender,
    comps.start_date AS startsAt,
    comps.end_date AS endsAt,
    comps.type AS eventTypeId,
    comps.location AS location,
    comps.is_jun AS isForJuniors,
    comps.is_cup AS isACup,
    comp_types.name AS eventType,
    CASE WHEN NOW() > comps.end_date THEN 1 ELSE 0 END AS expired
FROM wp_competitions comps
JOIN wp_comp_types comp_types ON comp_types.id = comps.type
WHERE NOW() <= comps.end_date OR %s = 'all'
ORDER BY comps.start_date DESC", $filter);

$results = $wpdb->get_results($sql);
$response = json_encode($results);
print_r($response);