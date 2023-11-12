<?php
include_once("../connect.php");

$filter = esc_sql($_GET["filter"]);

$tb_events =        $wpdb->get_blog_prefix() . "nom_events";
$tb_event_types =   $wpdb->get_blog_prefix() . "nom_event_type";

$sql = $wpdb->prepare("SELECT 
    eventT.id,
    eventT.title,
    eventT.start_date   AS startsAt,
    eventT.end_date     AS endsAt,
    eventT.event_type   AS eventTypeId,
    eventT.location     AS location,
    eventT.is_school    AS isForJuniors,
    eventT.is_cup       AS isACup,
    eventTypeT.name     AS eventType,
    CASE WHEN NOW() > eventT.end_date THEN 1 ELSE 0 END AS expired
FROM $tb_events eventT
JOIN $tb_event_types eventTypeT ON eventTypeT.event_type = eventT.event_type
WHERE NOW() <= eventT.end_date OR %s = 'all'
ORDER BY eventT.start_date DESC", $filter);

$result = $wpdb->get_results($sql);

$response = new StdClass();
$response->status = "Success";
$response->message = NULL;
$response->data = $result;

echo json_encode($response);