# Keyboard Shortcuts (Plugin for MantisBT)

Copyright (c) 2012 - 2015  - [Lars Berning](https://www.linkedin.com/in/larsberning)

Released under the [MIT license](http://opensource.org/licenses/MIT)


Future Work:
* Dynamically generate Help-Dialog
* Show usage-hint on the bottom of the screen
* More Keyboard Shortcuts


## Description

This plugin enhances Mantis to support Javascript based Keyboard Shortcuts. This simplifies the usage of Mantis as no mouse is needed for the common basic operations.


## Requirements

The plugin requires [MantisBT](http://www.mantisbt.org/) version 1.2.0 or higher.


## Installation

1. Download or clone a copy of the [plugin's code](https://github.com/lberning/mantisbt-KeyboardShortcuts).
2. Copy the plugin (the `KeyboardShortcuts/` directory) into your Mantis
   installation's `plugins/` directory.
3. While logged into your Mantis installation as an administrator, go to
   *Manage -> Manage Plugins*.
4. In the *Available Plugins* list, you'll find the *Keyboard Shortcuts* plugin;
   click the **Install** link.


## Usage

To see a help screen of all available keyboard shortcuts, press the *h*-Key, to remove the help screen again press esc or *h*.

Some of the most common Shortcuts are:

Shortcut       | Function
-------------- | -----------------------------
**g + m**      | Go to 'My View'
**g + v**      | Go to 'View Issues'
**g + c**      | Go to 'Change Log'
**g + r**      | Go to 'Roadmap'
**g + s**      | Go to 'Summary'
**s + ...**    | Switch to Project ... (see configuration below)
**r + r**      | Add relationship 'related to'
**r + p**      | Add relationship 'parent of'
**r + c**      | Add relationship 'child of'
**c**          | Create new Bug Report
**e**          | Edit Bug
**m**          | Move Bug
**Any Number** | Go To Bug with Number
**n**          | Jump to Note-Field
**h**          | Show Help
**Esc**        | Return Focus from Textfields


### Configuration

Currently configuration of the plugin is a bit rough. You would have to modify the file *keyboardshortcuts.js*.
In this file you can modify the object *SHORTCUTS* to your needs.

To configure the 'Switch to Project'-Feature, add the ID's of your MantisBT-Projects to the project-shortcuts. You can find these in MantisBT on the 'Manage -> Manage Projects' page if you look at the URL's of your projects.

Probably you might also want to modify the Help-Dialog ('hintArea') to your needs.

### Possible future enhancements
* Dynamically generated Help-Dialog
* Configuration via MantisBT Settings
* Show a usage-hint on the bottom of the screen
* More Keyboard Shortcuts