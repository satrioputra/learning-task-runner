<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="<?php bloginfo('description'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>

<body>
<!--[if lt IE 7]>
    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->
  <header class="site-header" role="banner">
  <div class="container is-relative">
    <a href="#">
      <div class="site-logo">
        <h1 class="visually-hidden">Tokopedia</h1>
      </div>
    </a>
    <button class="site-nav-mobile-button">&#9776;</button>
    <nav class="site-nav-top">
      <ul class="page-nav">
      <div class="menu-title">Menu<span class="menu-close">X</span></div>
      <?php wp_nav_menu(array(
        'theme_location' => 'top',
        'container' => false,
        'items_wrap' => '<span id="%1$s" >%3$s</span>'
      )); ?>
      <li class="menu-item-has-children">
          <a href="#">Special For You</a>
          <ul class="sub-menu clearfix">
            <div class="menu-item-child-list">
              <?php 
              $specials = new WP_QUery(array(
                'post_type'       => 'specials',
                'posts_per_page'  => '4'
              ));
              $links = get_post_custom($post->ID);
              if ($specials->have_posts()) : while ($specials->have_posts()) : $specials->the_post();
              ?>
              <li><a href="#" 
                data-img-0="<?php the_field('image0'); ?>" 
                data-url-0="<?php the_field('link0'); ?>"
                data-img-1="<?php the_field('image1'); ?>"
                data-url-1="<?php the_field('link1'); ?>"
                data-img-2="<?php the_field('image2'); ?>"
                data-url-2="<?php the_field('link2'); ?>"
                data-img-3="<?php the_field('image3'); ?>"
                data-url-3="<?php the_field('link3'); ?>"><?php the_title(); ?></a>
              </li>
            <?php endwhile; endif; wp_reset_query(); ?>
            </div>
            <div class="menu-item-child-content clearfix">
              <a class="item-link" href="#"><img class="item-image" src="#" alt=""></a>
              <a class="item-link" href="#"><img class="item-image" src="#" alt=""></a>
              <a class="item-link" href="#"><img class="item-image" src="#" alt=""></a>
              <a class="item-link" href="#"><img class="item-image" src="#" alt=""></a>
            </div>
          </ul>
        </li>
        <li class="menu-item-has-children">
          <a class="main-nav" href="#"></a>
          <ul class="main-nav-child">
            <div class="icon-wrapper">
              <li>
                <a href="#">
                  <div class="icon jubel-icon"></div>
                  <span>Jual Beli Online</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <div class="icon official-icon"></div>
                  <span>Official Store</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <div class="icon digital-icon"></div>
                  <span>Produk Digital</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <div class="icon kereta-icon"></div>
                  <span>Tiket Kereta</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <div class="icon donasi-icon"></div>
                  <span>Donasi</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <div class="icon bantuan-icon"></div>
                  <span>Bantuan</span>
                </a>
              </li>
            </div>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</header>
<div class="overlay"></div>