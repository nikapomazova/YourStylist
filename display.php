<?php
$uid = $_GET['ufolder']; // id is passed in

// Define the folder where images are stored
$dir = "uploads/$uid/";

// Check if the directory exists
if (is_dir($dir)) {
    // Get all images with the supported extensions
    $images = glob($dir . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);

    // Check if any images were found
    if (count($images) > 0) {
        foreach ($images as $image) {
            // Displaying the images with the appropriate styling
            // Assuming the images are accessible via a public URL
            // Make sure the path matches the public URL structure
            $imageURL = '/uploads/' . $uid . '/' . basename($image);
            echo '<img src="' . $imageURL . '" class="rounded-image" alt="Image">';
        }
    } else {
        echo "No images found in this folder.";
    }
} else {
    echo "Directory does not exist.";
}
?>
