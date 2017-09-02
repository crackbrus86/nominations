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
wp_register_style('style-auth', plugins_url( '/styles/style-auth.css', __FILE__ ));
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
}
add_shortcode('NomMngBtn', 'nomMngButton');

function nominationsMgm(){
    if(isset($_SESSION["regionObj"])){        
        wp_register_script( 'nominations-mgr-bundle', plugins_url( './js/nominations-mgr-bundle.js', __FILE__ ) );
        wp_enqueue_script(  'nominations-mgr-bundle');          
    ?>
    <div id="nm-app" data-rel="<?php echo $_SESSION['regionObj']->id ?>"></div>
    <?php
    }else{
        echo "<script>window.location.replace('".get_home_url()."')</script>";
    }
}
add_shortcode('NomMgm', 'nominationsMgm');

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