<?php
    if (!empty($_POST)) {
        var_dump($_POST);
        exit;
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Basic Sodium Cropper</title>
        <link rel="stylesheet" href="./vendor/bootstrap.min.css">
        <link rel="stylesheet" href="./vendor/cropper.min.css">
        <link rel="stylesheet" href="./build/sodium-cropper.min.css">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <form action="" method="POST" enctype="multipart/form-data">
                        <div class="sodium-cropper" data-config='{
                            "prefix"      : "primary_image",
                            "elements"    : {
                                "remove":         ".remove",
                                "preview":        ".preview",
                                "fileInput":      ".file-input",
                                "fileLabel":      ".file-label"
                            },
                            "cropper"     : {
                                "aspectRatio":    1,
                                "responsive":     true,
                                "movable":        false,
                                "zoomable":       true,
                                "rotatable":      false,
                                "scalable":       false
                            }
                        }'>
                            <img class="preview">
                            <input id="primary_image" name="primary_image" type="file" class="file-input">
                            <label for="primary_image" class="file-label">Select a file...</label>
                            <a href="#" class="btn btn-danger remove">Remove</a>
                        </div>

                        <input class="btn btn-primary" type="submit" value="Submit">
                    </form>
                </div>
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <form action="" method="POST" enctype="multipart/form-data">
                        <div class="sodium-cropper" data-config='{
                            "prefix"      : "secondary_image",
                            "elements"    : {
                                "remove":         ".remove",
                                "preview":        ".preview",
                                "fileInput":      ".file-input",
                                "fileLabel":      ".file-label"
                            },
                            "cropper"     : {
                                "aspectRatio":    1,
                                "responsive":     true,
                                "movable":        false,
                                "zoomable":       true,
                                "rotatable":      false,
                                "scalable":       false
                            }
                        }'>
                            <img class="preview">
                            <input id="secondary_image" name="secondary_image" type="file" class="file-input">
                            <label for="secondary_image" class="file-label">Select a file...</label>
                            <a href="#" class="btn btn-danger remove">Remove</a>
                        </div>

                        <input class="btn btn-primary" type="submit" value="Submit">
                    </form>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="./vendor/jquery.min.js"></script>
        <script type="text/javascript" src="./vendor/bootstrap.min.js"></script>
        <script type="text/javascript" src="./vendor/cropper.min.js"></script>
        <script type="text/javascript" src="./build/sodium-cropper.min.js"></script>
        <script>
            $(document).ready(function(){
                $('.sodium-cropper').sodiumCropper();
            });
        </script>
    </body>
</html>
