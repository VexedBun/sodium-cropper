/*!
 * Sodium Cropper
 * Author: Kristian Cox
 * Description: A jQuery plugin that extends cropper, allowing for easy
 * integration with Sodium.
 * Version: 1.3.1
 */

if("undefined"==typeof jQuery)throw new Error("Please ensure jQuery is loaded before this.");

(function($){
    $.fn.sodiumCropper = function(config){
        "use strict";

        var version = '1.3.1';

        // Check if cropper plugin exists
        if (!$.fn.Cropper) {
            //TODO sort out cropper detection
            //console.error('Sodium Cropper: Please ensure the cropper plugin is loaded before this.');
            //return;
        }

        // Check if FileReader is supporter (IE9 and above)
        var canFileReader = true;
        if (!window.FileReader) {
            canFileReader = false;
            console.error('Sodium Cropper: FileReader is currently a requirement of this plugin (IE9+), backwards-compatibility may be added later.');
        }

        // Override default settings if supplied
        var settings = $.extend(true, {}, {
            prefix      : '',
            placeholder : false,
            elements    : {
                select:         '.select',
                remove:         '.remove',
                preview:        '.preview',
                fileInput:      '.file-input',
                fileLabel:      '.file-label'
            },
            cropper     : {
                aspectRatio:    16/9,
                responsive:     true,
                movable:        false,
                zoomable:       true,
                rotatable:      false,
                scalable:       false
            }
        }, config);

        return this.each(function() {

            var $element                = $(this);

            // Override settings on a per element basis with data-config
            var el_settings             = settings;

            if ($element.attr('data-config')) {
                el_settings = $.extend(true, {},settings, $element.data('config'));
            }

            var $btn_remove             = $element.find(el_settings.elements.remove);
            var $preview                = $element.find(el_settings.elements.preview);
            var $fileInput              = $element.find(el_settings.elements.fileInput);
            var $fileLabel              = $element.find(el_settings.elements.fileLabel);
            var $fileLabelText          = $fileLabel.text();

            $element.append('<input type="hidden" name="'+ el_settings.prefix + '[coordinates][x]">');
            $element.append('<input type="hidden" name="'+ el_settings.prefix + '[coordinates][y]">');
            $element.append('<input type="hidden" name="'+ el_settings.prefix + '[coordinates][w]">');
            $element.append('<input type="hidden" name="'+ el_settings.prefix + '[coordinates][h]">');

            var $crop_x                 = $element.find('input[name="'+ el_settings.prefix + '[coordinates][x]"]');
            var $crop_y                 = $element.find('input[name="'+ el_settings.prefix + '[coordinates][y]"]');
            var $crop_w                 = $element.find('input[name="'+ el_settings.prefix + '[coordinates][w]"]');
            var $crop_h                 = $element.find('input[name="'+ el_settings.prefix + '[coordinates][h]"]');

            $fileInput.on('change', function(e) {

                //Destroy the cropper instance
                $preview.attr('src', '');

                if ($preview.hasClass('is-cropper')) {
                    $preview.cropper('destroy');
                    $preview.removeClass('is-cropper');
                    $fileLabel.text($fileLabelText);
                }
                if (el_settings.placeholder) {
                    $preview.attr('src', el_settings.placeholder);
                }                

                if (this.files && this.files[0]) {

                    $fileLabel.text(this.files[0].name);
                    var reader = new FileReader();
                    reader.onload = function(el) {
                        $preview.attr('src', el.target.result);

                        var cropper_settings = $.extend(el_settings.cropper,{
                            crop: function(e) {
                                $crop_x.val(e.x);
                                $crop_y.val(e.y);
                                $crop_w.val(e.width);
                                $crop_h.val(e.height);
                            }
                        });

                        $preview.cropper(cropper_settings);
                        $preview.addClass('is-cropper');
                        $btn_remove.show();
                    };

                    reader.readAsDataURL(this.files[0]);
                }

                $element.find('input[type="hidden"][name="'+ el_settings.prefix + '"]').remove();
                $fileInput.attr('name', el_settings.prefix);
            });

            $btn_remove.on('click', function(e){
                e.preventDefault();

                //Destroy the cropper instance
                $preview.attr('src', '');
                
                if ($preview.hasClass('is-cropper')) {
                    $preview.cropper('destroy');
                    $preview.removeClass('is-cropper');
                }
                if (el_settings.placeholder) {
                    $preview.attr('src', el_settings.placeholder);
                }

                $fileLabel.text($fileLabelText);

                $crop_x.val('');
                $crop_y.val('');
                $crop_w.val('');
                $crop_h.val('');

                $fileInput.val('');
                $fileInput.removeAttr('name');
                $element.prepend('<input type="hidden" name="'+ el_settings.prefix + '">');

                $(this).hide();
            });
        });
    };
}(jQuery));