/**
 * Corrosion
 * By VisionMise
 * OxideMod Plugin for Rust
 *
 * Copyright 2015 VisionMise@kuhlonline.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */



/**
 * Plugin Attributes
 */
var title               = 'corrosionweb';
var version             = V(0,1,1);
var author              = 'VisionMise';
var resourceId          = 0;



/**
 * Default Configuration for Plugin
 */
var defaultConfig       = {

    'configVersion':    '1.0',
    'settings':         {
    }
};


/*******************************************************************************\
|               *** DO NOT EDIT ANYTHING BELOW THIS LINE !!! ***                |
\*******************************************************************************/

var $ = function(context) {

	var self 		= this;

	this.context 	= {};

	this.init 		= function(context) {
		this.context = context;
		return this;
	};

	this.object 	= function() {
		if (!this.context) return {};

		var baseObject  = {
            "Title":        this.context.name,
            "Version":      this.context.version,
            "ResourceId":   this.context.resourceId,
            "Author":       this.context.author,
            "self":         this.context
        };

        for (var hook in this.context.hook) {
            baseObject[hook]    = this.context.hook[hook];
        }

        return baseObject;
	};

	this.console 	= function(textStr) {
		if (this.context && this.context.name) {
			print('[' + this.context.name + '] ' + textStr);
		} else {
			print(textStr);
		}

		return this;
	};

	this.broadcast 	= function() {
		return this;
	};

	this.data 		= function() {
		if (!this.context) return false;
		return this.context.data.GetData(this.context.name);
	};

	this.save 		= function() {
		if (!this.context) return false;
		this.context.data.SaveData(this.context.name);
		return this;
	};

	this.config 	= function() {
		if (!this.context) return false;
		return this.context.Config.Settings;
	};

	this.plugin 	= function() {
		if (!this.context) return false;
		return this.context.Plugin;
	};

	this.rust 		= function() {
		if (!this.context) return false;
		return this.context.rust;
	};

	this.consoleCommand = function(command, callback) {
		if (!this.context) return false;
		this.context.AddConsoleCommand(this.context.name + '.' + command, this.context.Plugin, callback);
		return this;
	};

	this.chatCommand 	= function(command, callback) {
		if (!this.context) return false;
		this.context.AddChatCommand(command, this.context.Plugin, callback);
		return this;
	};

	this.request 		= function(url, data, callback) {

		var type 	= (data) ? 'POST' : 'GET';

		if (type == 'GET') {
			this.context.webrequests.EnqueueGet(url, callback.bind(this.context), this.context.plugin);
		} else if (type == 'POST') {
			this.context.webrequests.EnqueuePost(url + '?' + data, callback.bind(this.context), this.context.plugin);
		}

	};

	return this.init(context);
}

var corrosionPlugin = function(pluginName, author, version, resourceId) {

	var self 		= this;

	this.name 		= pluginName;
	this.author 	= author;
	this.version 	= version;
	this.resourceId = resourceId;
	this.hook 		= {};

	this.dataObj 	= {};
	this.rustObj 	= {};

	this.hook.Init = function() {
		self.dataObj 	= data;
		self.rustObj 	= rust;

		$(self).console("Started");
	};

	this.hook.OnServerInitialized = function() {
		$(self).console("Initialized");
	};

	this.hook.OnPlayerInit = function(player) {
		$(self).console(player.name + " Connected");
	};

};

var plugin 			= new corrosionPlugin(title, author, version, resourceId);
var corrosionweb 	= $(plugin).object();