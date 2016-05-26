/*!
 * jQuery Modalnotifier plug-in v1.0.1 - 2016-05-25T21:30Z
 * http://PlainMacaron.com/Controls/, http://PlainMacaron.com/Download/
 *
 * This customizable jQuery plug-in allows a web developer to specify a target that will 
 * trigger a specified event in order to display a modal dialog window.
 * Copyright (C) 2016 Plain Macaron
 *
 * Modalnotifier is released under the GNU General Public License, Version 2 (or later).
 *
 * Modalnotifier is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software Foundation;
 * either version 2 of the License, or (at your option) any later version.
 *
 * Modalnotifier is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA.
 * http://PlainMacaron.com/Permission/
 *
 * Please, contact us if you have any questions or feedback about this plug-in.
 * http://PlainMacaron.com/Contact/, support@plainmacaron.com
 *
 * This plug-in has the following dependencies: jQuery v1.5 or higher and jQuery UI v1.7 or 
 * higher.
 *
 * This plug-in was developed by Ryan E. Anderson.
 *
 */

; (function ( $, window, document, undefined ) {
    $.widget( "plainmacaron.modalnotifier", {
        defaultElement: "<div>",
        options: {
            action: "../php/track_event.php",
            ajax: null,
            backgroundColor: "#acddea",
            buttonContainerClass: "ui-notification-button-container",
            buttonContainerIdentifier: "notification-button-container",
            buttonContainerWidth: "100%",
            closeButtonBackgroundColor: "transparent",
            closeButtonBorderColor: "transparent",
            closeButtonBorderStyle: "dotted",
            closeButtonBorderWidth: "1px",
            closeButtonClass: "ui-notification-close-button",
            closeButtonColor: "#283437",
            closeButtonFontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            closeButtonFontSize: "1.0em",
            closeButtonIdentifier: "notification-close-button",
            closeButtonLink: "#ui-modal-notifier",
            closeButtonMouseenterBorderColor: "#283437",
            closeButtonMouseenterBorderStyle: "dotted",
            closeButtonMouseenterBorderWidth: "1px",
            closeButtonMouseenterTextDecoration: "none",
            closeButtonTextDecoration: "none",
            closeButtonTitle: "Close the notification.",
            closeButtonValue: "Close",
            color: "#283437",
            containerClass: "ui-modal-notifier-container",
            containerIdentifier: "ui-modal-notifier",
            containerWidth: null,
            displayStyle: 1,
            failureCallback: $.noop,
            failureText: "An error occurred.",
            iconClass: "ui-notification-close-icon",
            iconHeight: "16px",
            iconWidth: "16px",
            imagePath: "../png/Close-Icon.png",
            maskClass: "ui-notification-mask",
            maskIdentifier: "notification-mask",
            method: "POST",
            notificationText: "This is the modal notifier control.",
            notificationTextClass: "ui-notification-message",
            notificationTextFontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            notificationTextIdentifier: "notification-message",
            notificationTextLineHeight: "1.4em",
            successCallback: $.noop,
            targetClass: null,
            targetEvent: null,
            targetIdentifier: null,
            targetLocationIdentifier: null,
            targetStructure: null
        },
        version: "1.0.1",

        _create: function () {
            var buttonContainer;
            var closeButton;
            var container;
            var element;
            var event;
            var notificationText;
            var options;
            var self;
            var targetElement;

            event = {};

            self = this;
            element = self.element;
            options = self.options;

            container = $("<div />");
            buttonContainer = $("<div />");
            closeButton = $("<a />");
            notificationText = $("<p />");

            container.attr( "id", options.containerIdentifier )
                     .addClass( options.containerClass )
                     .css({
                         backgroundColor: options.backgroundColor,
                         color: options.color,
                         width: options.containerWidth
                     });

            buttonContainer.attr( "id", options.buttonContainerIdentifier )
                           .addClass( options.buttonContainerClass )
                           .css({
                               width: options.buttonContainerWidth
                           });

            closeButton.attr( "id", options.closeButtonIdentifier )
                       .attr( "href", options.closeButtonLink )
                       .attr( "title", options.closeButtonTitle )
                       .addClass( options.closeButtonClass )
                       .css({
                           borderColor: options.closeButtonBorderColor,
                           borderStyle: options.closeButtonBorderStyle,
                           borderWidth: options.closeButtonBorderWidth,
                           textDecoration: options.closeButtonTextDecoration
                       });

            if ( options.imagePath !== null && options.imagePath !== "" ) {
                var icon;

                icon = $("<img />");

                icon.attr( "src", options.imagePath )
                    .attr( "alt", "Close the notifier." )
                    .addClass( options.iconClass )
                    .css({
                        width: options.iconWidth,
                        height: options.iconHeight
                    });

                icon.appendTo( closeButton );
            } else {
                closeButton.css({
                               backgroundColor: options.closeButtonBackgroundColor,
                               color: options.closeButtonColor,
                               fontFamily: options.closeButtonFontFamily,
                               fontSize: options.closeButtonFontSize
                           })
                           .text( options.closeButtonValue );
            }

            notificationText.attr( "id", options.notificationTextIdentifier )
                            .addClass( options.notificationTextClass )
                            .css({
                                fontFamily: options.notificationTextFontFamily,
                                lineHeight: options.notificationTextLineHeight
                            })
                            .text( options.notificationText );

            if ( options.displayStyle !== null ) {
                if ( options.displayStyle === 1 || options.displayStyle === 2 || options.displayStyle === 3 ) {
                    buttonContainer.appendTo( container );
                    closeButton.appendTo( buttonContainer );
                    notificationText.appendTo( container );
                } else {
                    notificationText.appendTo( container );
                    buttonContainer.appendTo( container );
                    closeButton.appendTo( buttonContainer );
                }

                if ( options.displayStyle === 4 || options.displayStyle === 3 ) {
                    buttonContainer.css({
                        textAlign: "left"
                    });
                } else if ( options.displayStyle === 5 || options.displayStyle === 2 ) {
                    buttonContainer.css({
                        textAlign: "center"
                    });
                } else {
                    buttonContainer.css({
                        textAlign: "right"
                    });
                }
            }

            self._on( closeButton, {
                click: self._closeButtonClickEventHandler,
                mouseleave: self._closeButtonMouseleaveEventHandler,
                mouseenter: self._closeButtonMouseenterEventHandler
            });

            if ( options.targetIdentifier !== null && options.targetLocationIdentifier !== null && options.targetStructure !== null ) {
                var elementStructure;
                var firstElement;
                var firstElementIdentifier;
                var targetLocation;

                elementStructure = $($.parseHTML(options.targetStructure));

                firstElement = elementStructure.first();
                firstElementIdentifier = firstElement.attr( "id" );

                if ( typeof firstElementIdentifier === "undefined" || firstElementIdentifier === "" ) {
                    firstElement.attr( "id", options.targetIdentifier );
                }

                if ( options.targetClass !== null && !firstElement.hasClass( options.targetClass ) ) {
                    firstElement.addClass( options.targetClass );
                }

                targetLocation = $("#" + options.targetLocationIdentifier);

                elementStructure.appendTo( targetLocation );
            }

            if ( options.targetEvent !== null && options.targetIdentifier !== null ) {
                event[options.targetEvent] = self._targetEventHandler;

                self._on( $("#" + options.targetIdentifier), event );
            }

            container.prependTo( element );

            targetElement = $("body").find(element)[0];

            if ( typeof targetElement === "undefined" && element.prop( "tagName" ) !== "BODY" ) {
                element.prependTo( "body" );
            }
        },

        _destroy: function () {
            var container;
            var element;
            var options;
            var self;

            self = this;
            element = self.element;
            options = self.options;

            container = element.children( "#" + options.containerIdentifier );

            self._off( $("#" + options.closeButtonIdentifier), "click" );
            self._off( $("#" + options.closeButtonIdentifier), "mouseenter" );
            self._off( $("#" + options.closeButtonIdentifier), "mouseleave" );
            self._off( $("#" + options.targetIdentifier), options.targetEvent );

            container.next()
                     .remove();

            element.children( container )
                   .remove();
        },

        _closeButtonClickEventHandler: function ( event ) {
            var container;
            var element;
            var mask;
            var options;
            var self;

            self = this;
            element = self.element;
            options = self.options;

            container = element.children( "#" + options.containerIdentifier );
            mask = element.children( "#" + options.maskIdentifier );

            mask.fadeOut( "fast", function () {
                $(this).remove();

                event.preventDefault();
            });

            container.fadeOut( "fast" );
        },

        _closeButtonMouseenterEventHandler: function ( event ) {
            var anchor;
            var options;
            var self;

            self = this;
            options = self.options;

            anchor = $("#" + options.closeButtonIdentifier);

            anchor.css({
                borderColor: options.closeButtonMouseenterBorderColor,
                borderStyle: options.closeButtonMouseenterBorderStyle,
                borderWidth: options.closeButtonMouseenterBorderWidth,
                textDecoration: options.closeButtonMouseenterTextDecoration
            });
        },

        _closeButtonMouseleaveEventHandler: function ( event ) {
            var anchor;
            var options;
            var self;

            self = this;
            options = self.options;

            anchor = $("#" + options.closeButtonIdentifier);

            anchor.css({
                borderColor: options.closeButtonBorderColor,
                borderStyle: options.closeButtonBorderStyle,
                borderWidth: options.closeButtonBorderWidth,
                textDecoration: options.closeButtonTextDecoration
            });
        },

        _failureCallback: function ( control, callback) {
            return function ( jqXHR, textStatus, errorThrown ) {
                if ( typeof callback === "function" && callback != $.noop ) {
                    return callback( control, jqXHR, textStatus, errorThrown );
                } else {
                    var element;
                    var failureText;
                    var mask;
                    var notification;
                    var options;

                    mask = $("<div />");

                    element = control.element;
                    options = control.options;

                    notification = element.children( "#" + options.containerIdentifier );
                    
                    failureText = notification.children( "#" + options.notificationTextIdentifier );

                    failureText.text( options.failureText + " The following error message was returned: " + errorThrown.message );

                    mask.attr( "id", options.maskIdentifier )
                        .addClass( options.maskClass );

                    element.prepend( mask );

                    mask.fadeIn( "fast" );

                    notification.fadeIn( "fast" );
                }
            };
        },

        _setOption: function ( key, value ) {
            var container;
            var element;
            var options;
            var self;

            self = this;
            element = self.element;
            options = self.options;

            container = element.children( "#" + options.containerIdentifier );

            switch ( key ) {
                case "backgroundColor":
                    container.css({
                        backgroundColor: value
                    });

                    break;
                case "buttonContainerClass":
                    container.find( "div" )
                             .addClass( value );

                    break;
                case "buttonContainerIdentifier":
                    container.find( "div" )
                             .attr( "id", value );

                    break;
                case "buttonContainerWidth":
                    container.find( "div" )
                             .css({
                                 width: value
                             });

                    break;
                case "closeButtonBackgroundColor":
                    if ( options.imagePath === null || options.imagePath === "" ) {
                        container.find( "div" )
                                 .find( "a" )
                                 .css({
                                     backgroundColor: value
                                 });
                    }

                    break;
                case "closeButtonBorderColor":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 borderColor: value
                             });

                    break;
                case "closeButtonBorderStyle":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 borderStyle: value
                             });

                    break;
                case "closeButtonBorderWidth":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 borderWidth: value
                             });

                    break;
                case "closeButtonClass":
                    container.find( "div" )
                             .find( "a" )
                             .addClass( value );

                    break;
                case "closeButtonColor":
                    if ( options.imagePath === null || options.imagePath === "" ) {
                        container.find( "div" )
                                 .find( "a" )
                                 .css({
                                     color: value
                                 });
                    }

                    break;
                case "closeButtonFontFamily":
                    if ( options.imagePath === null || options.imagePath === "" ) {
                        container.find( "div" )
                                 .find( "a" )
                                 .css({
                                     fontFamily: value
                                 });
                    }

                    break;
                case "closeButtonFontSize":
                    if ( options.imagePath === null || options.imagePath === "" ) {
                        container.find( "div" )
                                 .find( "a" )
                                 .css({
                                     fontSize: value
                                 });
                    }

                    break;
                case "closeButtonIdentifier":
                    container.find( "div" )
                             .find( "a" )
                             .attr( "id", value );

                    break;
                case "closeButtonLink":
                    container.find( "div" )
                             .find( "a" )
                             .attr( "href", value );

                    break;
                case "closeButtonMouseenterBorderColor":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 borderColor: value
                             });

                    break;
                case "closeButtonMouseenterBorderStyle":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 borderStyle: value
                             });

                    break;
                case "closeButtonMouseenterBorderWidth":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 borderWidth: value
                             });

                    break;
                case "closeButtonMouseenterTextDecoration":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 textDecoration: value
                             });

                    break;
                case "closeButtonTextDecoration":
                    container.find( "div" )
                             .find( "a" )
                             .css({
                                 textDecoration: value
                             });

                    break;
                case "closeButtonTitle":
                    container.find( "div" )
                             .find( "a" )
                             .attr( "title", value );

                    break;
                case "closeButtonValue":
                    if ( options.imagePath === null || options.imagePath === "" ) {
                        container.find( "div" )
                                 .find( "a" )
                                 .text( value );
                    }

                    break;
                case "color":
                    container.css({
                        color: value
                    });

                    break;
                case "containerClass":
                    container.removeClass()
                             .addClass( value );

                    break;
                case "containerIdentifier":
                    container.attr( "id", value );

                    break;
                case "containerWidth":
                    container.css({
                        width: value
                    });

                    break;
                case "displayStyle":
                    var buttonContainer;
                    var closeButton;
                    var notificationText;

                    buttonContainer = $("#" + options.buttonContainerIdentifier).detach();
                    closeButton = $("#" + options.closeButtonIdentifier).detach();
                    notificationText = container.children( "#" + options.notificationTextIdentifier ).detach();

                    if ( value !== null ) {
                        if ( value === 1 || value === 2 || value === 3 ) {
                            buttonContainer.appendTo( container );
                            closeButton.appendTo( buttonContainer );
                            notificationText.appendTo( container );
                        } else {
                            notificationText.appendTo( container );
                            buttonContainer.appendTo( container );
                            closeButton.appendTo( buttonContainer );
                        }

                        if ( value === 4 || value === 3 ) {
                            buttonContainer.css({
                                textAlign: "left"
                            });
                        } else if ( value === 5 || value === 2 ) {
                            buttonContainer.css({
                                textAlign: "center"
                            });
                        } else {
                            buttonContainer.css({
                                textAlign: "right"
                            });
                        }
                    }

                    break;
                case "failureText":
                    container.find( "p" )
                             .text( value );

                    break;
                case "iconClass":
                    container.find( "div" )
                             .find( "a" )
                             .find( "img" )
                             .removeClass()
                             .addClass( value );

                    break;
                case "iconHeight":
                    container.find( "div" )
                             .find( "a" )
                             .find( "img" )
                             .css({
                                 height: value
                             });

                    break;
                case "iconWidth":
                    container.find( "div" )
                             .find( "a" )
                             .find( "img" )
                             .css({
                                 width: value
                             });

                    break;
                case "imagePath":
                    container.find( "div" )
                             .find( "a" )
                             .find( "img" )
                             .attr( "src", value );

                    break;
                case "notificationText":
                    container.find( "p" )
                             .text( value );

                    break;
                case "notificationTextClass":
                    container.find( "p" )
                             .removeClass()
                             .addClass( value );

                    break;
                case "notificationTextFontFamily":
                    container.find( "p" )
                             .css({
                                 fontFamily: value
                             });

                    break;
                case "notificationTextIdentifier":
                    container.find( "p" )
                             .attr( "id", value );

                    break;
                case "notificationTextLineHeight":
                    container.find( "p" )
                             .css({
                                 lineHeight: value
                             });

                    break;
                case "targetClass":
                    if ( value !== null && options.targetIdentifier !== null ) {
                        var firstElement;

                        firstElement = $("#" + options.targetIdentifier);

                        firstElement.addClass( value );
                    }

                    break;
                case "targetEvent":
                    if ( value !== null && options.targetIdentifier !== null ) {
                        var event;

                        event = {};
      
                        self._off( $("#" + options.targetIdentifier), options.targetEvent );

                        event[value] = self._targetEventHandler;

                        self._on( $("#" + options.targetIdentifier), event );
                    }

                    break;
                case "targetIdentifier":
                    if ( options.targetEvent !== null && options.targetIdentifier !== null && value !== null ) {
                        var targetEvent;
                        var targetFirstElement;

                        targetEvent = {};

                        targetFirstElement = $("#" + options.targetIdentifier);

                        self._off( $("#" + options.targetIdentifier), options.targetEvent );

                        targetFirstElement.attr( "id", value );

                        targetEvent[options.targetEvent] = self._targetEventHandler;

                        self._on( $("#" + value), targetEvent );
                    }

                    break;
                case "targetLocationIdentifier":
                    if ( options.targetEvent !== null && options.targetIdentifier !== null && value !== null && options.targetStructure !== null ) {
                        var locationElementStructure;
                        var locationEvent;
                        var locationFirstElement;
                        var locationFirstElementIdentifier;
                        var targetLocation;

                        locationEvent = {};

                        self._off( $("#" + options.targetIdentifier), options.targetEvent );

                        $("#" + options.targetIdentifier).removeAttr( "id" );

                        targetLocation = $("#" + value);
                        locationElementStructure = $($.parseHTML(options.targetStructure));

                        locationFirstElement = locationElementStructure.first();
                        locationFirstElementIdentifier = locationFirstElement.attr( "id" );

                        if ( typeof locationFirstElementIdentifier === "undefined" || locationFirstElementIdentifier === "" ) {
                            locationFirstElement.attr( "id", options.targetIdentifier );
                        }

                        if ( options.targetClass !== null && !locationFirstElement.hasClass( options.targetClass ) ) {
                            locationFirstElement.addClass( options.targetClass );
                        }

                        locationElementStructure.appendTo( targetLocation );

                        locationEvent[options.targetEvent] = self._targetEventHandler;

                        self._on( $("#" + options.targetIdentifier), locationEvent );
                    }

                    break;
                case "targetStructure":
                    if ( options.targetIdentifier !== null && value !== null ) {
                        var currentTarget;        
                        var elementStructure;
                        var structureFirstElement;
                        var firstElementIdentifier;

                        currentTarget = $("#" + options.targetIdentifier);
                        elementStructure = $(value);

                        currentTarget.empty();

                        structureFirstElement = currentTarget.first();
                        firstElementIdentifier = structureFirstElement.attr( "id" );

                        if ( typeof firstElementIdentifier === "undefined" || firstElementIdentifier === "" ) {
                            structureFirstElement.attr( "id", options.targetIdentifier );
                        }

                        if ( options.targetClass !== null && !structureFirstElement.hasClass( options.targetClass ) ) {
                            structureFirstElement.addClass( options.targetClass );
                        }

                        elementStructure.appendTo( currentTarget );
                    }

                    break;
                default: break;
            }

            $.Widget.prototype
                    ._setOption
                    .apply( self, arguments );
        },

        _successCallback: function ( control, callback ) {
            return function ( data, textStatus, jqXHR ) {
                if ( typeof callback === "function" && callback != $.noop ) {
                    return callback( control, data, textStatus, jqXHR );
                } else {
                    var element;
                    var mask;
                    var notification;
                    var options;

                    mask = $("<div />");

                    element = control.element;
                    options = control.options;

                    notification = element.children( "#" + options.containerIdentifier );

                    mask.attr( "id", options.maskIdentifier )
                        .addClass( options.maskClass );

                    element.prepend( mask );

                    mask.fadeIn( "fast" );

                    notification.fadeIn( "fast" );
                }
            };
        },

        _targetEventHandler: function ( event ) {
            var ajax;
            var failureCallback;
            var successCallback;
            var options;
            var request;
            var self;

            if ( event.type === "submit" ) {
                event.preventDefault();
            }

            self = this;
            options = self.options;

            ajax = options.ajax;

            if ( ajax === null ) {
                var eventData;

                eventData = {
                    eventName: event.type,
                    targetName: options.targetIdentifier
                };

                ajax = {
                    type: options.method,
                    url: options.action,
                    data: eventData,
                    dataType: "json"
                };
            }

            request = $.ajax( ajax );

	    failureCallback = self._failureCallback;
            successCallback = self._successCallback;

            request.done( successCallback( self, options.successCallback ) )
                   .fail( failureCallback( self, options.failureCallback ) );
        },

        destroy: function () {
            var self;

            self = this;

            self._destroy();
        }

    });

})( jQuery, window, document );