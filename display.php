<?php
$uid = $_GET['ufolder']; // Get user ID (folder name)

$dir = "uploads/$uid/";  // Directory with images

// Get all image files with specific extensions (jpg, jpeg, png, gif)
$images = glob($dir . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);

if (count($images) > 0) {
    // Loop through the images and display them
    foreach ($images as $image) {
        echo '<img src="' . $image . '" class="rounded-image">';  // Display each image
    }
} else {
    echo "No images found.";
}
?>
