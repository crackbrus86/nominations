<?php
/*
Plugin Name: Nominations
Description: Nominations management
Version: 1.0
Author: Salivon Eugene
*/

define( 'RM__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
add_action("admin_menu", array("Nominations", "initSettings"));

class Nominations{
    function initSettings(){
        add_menu_page("Nominations", "Номінації", "manage_options", "nominations", array("Nominations", "nomEditor"));
    }

    function nomEditor(){
        wp_register_script( 'nom-settings', plugins_url( './js/bundle.js', __FILE__ ) );
        wp_enqueue_script(  'nom-settings');        
        ?>
        <div class="container-fluid">
            <h2>Налаштування</h2>
        </div>        
        <?php
    }
}