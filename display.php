<?php
$uid = $_GET['ufolder'];
$dir = "uploads/$uid/";

// Get image files
$images = glob($dir . "*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}", GLOB_BRACE);

// Convert full paths to just filenames
$imageFiles = [];

foreach ($images as $image) {
    $imageFiles[] = basename($image); // strips path, leaves "img1.jpg"
}

header('Content-Type: application/json');
echo json_encode($imageFiles);
?>