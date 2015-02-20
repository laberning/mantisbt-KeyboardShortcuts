<?php
/*
* Copyright (c) 2012 - 2015 Lars Berning <lars.berning@teambits.de> 
* Released under the MIT license
*/
 
class KeyboardShortcutsPlugin extends MantisPlugin {
 
  function register() {
    $this->name        = 'Keyboard Shortcuts';
    $this->description = 'Enables keyboard shortcuts in Mantis';
 
    $this->version     = '0.2';
    $this->requires    = array(
      'MantisCore'       => '1.2.0',
    );
 
    $this->author      = 'Lars Berning, teambits GmbH';
    $this->contact     = 'lars.berning@teambits.de';
    $this->url         = 'http://www.teambits.de';
  }
 
  function init() {
    plugin_event_hook( 'EVENT_LAYOUT_RESOURCES', 'embed_resources' );
  }
 
  /**
   * Handle the EVENT_LAYOUT_RSOURCES callback to embed needed ressources.
   */
  function embed_resources() {
    echo "\t", '<link rel="stylesheet" type="text/css" href="', plugin_file( 'keyboardshortcuts.css' ), '" />', "\n";
    echo "\t", '<script type="text/javascript" src="', plugin_file( 'keyboardshortcuts.js' ), '"></script>', "\n";
 }
 
}
?>
