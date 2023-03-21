<?php

/*
Plugin Name: Disable Auth
Author: Janne Kemi
Version: 0.1
*/

add_filter('woocommerce_rest_check_permissions', 'dcwd_allow_rest_api_queries', 10, 4 ); 
function dcwd_allow_rest_api_queries( $permission, $context, $zero, $object ) {

return true;

}

?>