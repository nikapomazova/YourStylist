<?php

if ($_GET) {
 echo "We've got parameters \r\n";
  $ufolder = $_GET['ufolder'];
  $target_dir = "/var/www/html/uploads/{$ufolder}/";
 echo "Target dir is {$target_dir} \r\n";
  } else {
 echo "No parameters passed";
  $target_dir = "/var/www/html/uploads/";
  }
// Check if user directory exists
if (!is_dir("{$target_dir}")) {
   echo "Dir does not exist - creating";
   mkdir("{$target_dir}", 0777, true);
}

echo "point 1 ";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
echo "point 2 ";
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
echo "point 3 ";

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 5000000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
    header("Location: /Wardrobe.html");
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>
