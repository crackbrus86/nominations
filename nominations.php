<?php
/*
Plugin Name: Nominations
Description: Nominations management
Version: 1.0
Author: Salivon Eugene
*/

define( 'RM__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
add_action("admin_menu", array("Nominations", "initSettings"));

wp_register_style('font-awesome', plugins_url( '/styles/font-awesome.min.css', __FILE__ ));
wp_enqueue_style( 'font-awesome');

class Nominations{
    function initSettings(){
        add_menu_page("Nominations", "Номінації", "manage_options", "nominations", array("Nominations", "nomEditor"));
    }

    function nomEditor(){
        wp_register_script( 'nom-settings', plugins_url( './js/settings-bundle.js', __FILE__ ) );
        wp_enqueue_script(  'nom-settings');   
        wp_register_style('style-settings', plugins_url( '/styles/style-settings.css', __FILE__ ));
        wp_enqueue_style( 'style-settings');             
        ?>
        <div class="container-fluid">
            <h2>Налаштування</h2>
            <div id="settings"></div>
        </div>        
        <?php
    }
}