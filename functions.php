<?php

// Version check
if ( version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

// Initial theme setup
function tokopedia_init() {
  load_theme_textdomain( 'tokopedia' );

  add_theme_support('title-tag');
  
  add_theme_support('post-thumbnails');
  
  register_nav_menus( array(
		'top'    => __( 'Top Menu', 'tokopedia' ),
		'social' => __( 'Social Links Menu', 'tokopedia' ),
	) );
}
add_action('after_setup_theme', 'tokopedia_init');

// Load script & stylesheet
function add_scripts() {
  wp_enqueue_style('style', get_stylesheet_uri());
  wp_enqueue_script('script', get_template_directory_uri().'/assets/js/core.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'add_scripts');


// Special links menu post type
function tokopedia_specials() {
  $args = array(
    'public'  => true,
    'label'   => 'Specials',
    'supports' => array('title', 'thumbnail', 'custom-fields')
  );
  register_post_type( 'specials', $args );
}
add_action( 'init', 'tokopedia_specials' );

