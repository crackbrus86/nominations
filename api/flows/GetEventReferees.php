<?php
include_once("../connect.php");

if(current_user_can("edit_others_pages"))
{
    $event_id = $_GET['eventId'];
    $tb_competitions = $wpdb->get_blog_prefix() . "competitions";
    $tb_nominations = $wpdb->get_blog_prefix() . "nominations";
    $sql = $wpdb->prepare("SELECT 
            CONCAT(LOWER(nom.surname), '/', LOWER(nom.first_name), '/', LOWER(nom.middle_name), '/', nom.team) AS id,
            nom.surname, 
            nom.first_name, 
            nom.middle_name, 
            nom.team, 
            nom.ref_category, 
            GROUP_CONCAT(nom.ref_remark SEPARATOR ' ') AS ref_remark
        FROM $tb_competitions AS comp
        JOIN $tb_nominations AS nom ON nom.competition = comp.id AND nom.type = 'official'
        WHERE event_id = %d AND status = 'true'
        GROUP BY nom.surname, nom.first_name, nom.middle_name, nom.team, nom.ref_category", $event_id);
    $result = $wpdb->get_results($sql);

    $response = new StdClass();
    $response->status = "Success";
    $response->message = NULL;
    $response->data = $result;

    echo json_encode($response);
} else {
    header("HTTP/1.1 401 Unauthorized");
}