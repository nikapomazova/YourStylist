<?php
$uid = $_GET['ufolder']; //id is passed in

$dir = "uploads/$uid/";

$images = glob($dir . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);

foreach ($images as $image) {
    echo '<img src="' . $image . '" class="rounded-image">'; //displaying the images with the styling
}
?>
