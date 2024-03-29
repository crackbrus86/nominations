<?php
/*
Plugin Name: Nominations
Description: Nominations management
Version: 1.0
Author: Salivon Eugene
*/

define( 'RM__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
add_action("admin_menu", array("Nominations", "initSettings"));

wp_register_style('font-awesome', plugins_url( '/styles/font-awesome.min.css?v='.time(), __FILE__ ));
wp_enqueue_style( 'font-awesome');
wp_register_style('style-auth', plugins_url( '/styles/style-auth.css?v='.time(), __FILE__ ));
wp_enqueue_style( 'style-auth');

add_action( 'init', 'do_session_start' ); 

function do_session_start() { 
    if ( !session_id() ) session_start(); 
}

function logInReg(){
    if(file_exists(RM__PLUGIN_DIR."/php/login.button.php")){
        require_once(RM__PLUGIN_DIR."/php/login.button.php");
    }
}
add_shortcode('LogRegIn', 'logInReg');

function logInForm(){
    if(file_exists(RM__PLUGIN_DIR."/php/login.form.php")){
        require_once(RM__PLUGIN_DIR."/php/login.form.php");
    }
}
add_shortcode('LogRegFr', 'logInForm');

function nomMngButton(){
    if(file_exists(RM__PLUGIN_DIR."/php/nom.mng.button.php")){
        require_once(RM__PLUGIN_DIR."/php/nom.mng.button.php");
    }
    if(file_exists(RM__PLUGIN_DIR."/php/nom.membership.button.php")){
        require_once(RM__PLUGIN_DIR."/php/nom.membership.button.php");
    }
}
add_shortcode('NomMngBtn', 'nomMngButton');

function nominationsMgm(){
    if(isset($_SESSION["regionObj"])){ 
        wp_register_script( 'jq', plugins_url( '/js/scripts/jquery-3.2.1.min.js?v='.time(), __FILE__ ) );
        wp_enqueue_script(  'jq');      
        wp_register_script( 'resize', plugins_url( '/js/scripts/colResizable-1.6.js?v='.time(), __FILE__ ) );
        wp_enqueue_script(  'resize');                 
        wp_register_script( 'nominations-mgr-bundle', plugins_url( './js/dist/nominations-mgr-bundle.js?v='.time(), __FILE__ ) );
        wp_enqueue_script(  'nominations-mgr-bundle');          
    ?>
    <div id="nm-app" data-rel="<?php echo $_SESSION['regionObj']->id ?>"></div>
    <?php
    }else{
        echo "<script>window.location.replace('".get_home_url()."')</script>";
    }
}
add_shortcode('NomMgm', 'nominationsMgm');

function nomGrid(){
    wp_register_script( 'jq', plugins_url( '/js/scripts/jquery-3.2.1.min.js?v='.time(), __FILE__ ) );
    wp_enqueue_script(  'jq');   
    wp_register_script( 'print', plugins_url( '/js/scripts/jQuery.print.js?v='.time(), __FILE__ ) );
    wp_enqueue_script(  'print');   
    wp_register_script( 'FileSaver', plugins_url( '/js/scripts/FileSaver.min.js?v='.time(), __FILE__ ) );
    wp_enqueue_script(  'FileSaver'); 
    wp_register_script( 'wordexport', plugins_url( '/js/scripts/jquery.wordexport.js?v='.time(), __FILE__ ) );
    wp_enqueue_script(  'wordexport');          
    wp_register_script( 'resize', plugins_url( '/js/scripts/colResizable-1.6.js?v='.time(), __FILE__ ) );
    wp_enqueue_script(  'resize');      
    wp_register_script( 'nominations-bundle', plugins_url( '/js/dist/nominations-bundle.js?v='.time(), __FILE__ ) );
    wp_enqueue_script(  'nominations-bundle');     
    ?>
    <div id="nom-app"></div>
    <?php
}
add_shortcode('NomGrid', 'nomGrid');

class Nominations{
    function initSettings(){
        add_menu_page("Nominations", "Номінації", "manage_options", "nominations", array("Nominations", "nomEditor"));
        add_submenu_page("nominations", "Управління номінаціями", "Управління", "manage_options", "nominations-admin", array("Nominations", "nomAdmin"));
        add_submenu_page("nominations", "Управління змаганнями", "Змагання", "manage_options", "event-editor", array("Nominations", "eventEditor"));
        add_submenu_page("nominations", "Управління потоками", "Потоки", "manage_options", "flow-editor", array("Nominations", "flowEditor"));
    }

    function nomEditor(){
        wp_register_script( 'nom-settings', plugins_url( './js/dist/settings-bundle.js?v='.time(), __FILE__ ) );
        wp_enqueue_script(  'nom-settings');   
        wp_register_style('style-settings', plugins_url( '/styles/style-settings.css?v='.time(), __FILE__ ));
        wp_enqueue_style( 'style-settings');             
        ?>
        <div class="container-fluid">
            <h2>Налаштування</h2>
            <div id="settings"></div>
        </div>        
        <?php
    }

    function nomAdmin(){
        wp_register_script( 'resize', plugins_url( '/js/scripts/colResizable-1.6.js?v='.time(), __FILE__ ) );
        wp_enqueue_script(  'resize');           
        wp_register_style('style-front', plugins_url( '/styles/style-front.css?v='.time(), __FILE__ ));
        wp_enqueue_style( 'style-front'); 
        wp_register_style('style-adm', plugins_url( '/styles/style-adm.css?v='.time(), __FILE__ ));
        wp_enqueue_style( 'style-adm');                   
        wp_register_script( 'nom-adm', plugins_url( './js/dist/nominations-adm-bundle.js?v='.time(), __FILE__ ) );
        wp_enqueue_script(  'nom-adm');         
        ?>
        <div class="container-fluid">
            <h2>Управління номінаціями</h2>
            <div id="nom-adm"></div>
        </div>         
        <?php
    }

    function flowEditor(){
        wp_register_script( 'flow-editor', plugins_url( './js/dist/flow-editor-bundle.js?v='.time(), __FILE__ ) );
        wp_enqueue_script('flow-editor');  
        wp_register_style('bootstrap', plugins_url('/styles/css/bootstrap.min.css?v=' . time(), __FILE__));
        wp_enqueue_style('bootstrap');
        ?>
        <div class="container-fluid">
            <h2>Потоки</h2>
            <div id="flow-editor"></div>
        </div>
        <?php
    }

    function eventEditor() {
        wp_register_script( 'event-editor', plugins_url( './js/dist/event-editor-bundle.js?v='.time(), __FILE__ ) );
        wp_enqueue_script('event-editor');  
        wp_register_style('bootstrap', plugins_url('/styles/css/bootstrap.min.css?v=' . time(), __FILE__));
        wp_enqueue_style('bootstrap');
        ?>
        <div class="container-fluid">
            <h2>Змагання</h2>
            <div id="event-editor"></div>
        </div>
        <?php
    }
}