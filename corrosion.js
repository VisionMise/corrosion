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

var title               = 'corrosion';
var version             = V(0,1,1);
var author              = 'VisionMise';
var resourceId          = 0;



var defaultConfig       = {

    'version':          '1.0',
    'settings':         {

    },

    'resources':        {
        'errors':       {
            100:        'Unknown Error'
        }
    }

};



/**
 * [oxidePlugin description]
 * @param  {[type]} pluginNameStr [description]
 * @param  {[type]} author        [description]
 * @param  {[type]} version       [description]
 * @param  {[type]} resourceId    [description]
 * @return {[type]}               [description]
 */
var oxidePlugin     = function(pluginNameStr, author, version, resourceId) {

    var self                    = this;

    this.name                   = pluginNameStr;
    this.author                 = author;
    this.version                = version;
    this.resourceId             = (!resourceId) ? 0 : resourceId;
    this.hooks                  = {};
    
    this.construct                  = function() {

        this
            .printStartup()
            .initConfig()
            .initData()
        ;

        return this;
    };

    this.printStartup               = function() {
        this.call_hook('Init', function() {
            $(self).console("Started");
        });

        return this;
    };

    this.initConfig                 = function() {

        this.call_hook('LoadDefaultConfig', function() {
            this.Config     = defaultConfig;
            this.SaveConfig();
        });

        return this;
    };

    this.initData                   = function() {

        this.call_hook('OnServerInitialized', function() {
            var jsonData        = data.GetData(self.name);
            jsonData['version'] = self.version;
            data.SaveData(self.name)
        });

        return this;
    };

    this.call_object                 = function() {
        var baseObject  = {
            "Title":        this.name,
            "Version":      this.version,
            "ResourceId":   this.resourceId,
            "Author":       this.author,
            "self":         self
        };

        for (var hook in this.hooks) {
            baseObject[hook]    = this.hooks[hook];
        }

        return baseObject;
    };

    this.call_hook                   = function(hook, callback) {
        this.hooks[hook]    = callback;
        return this;
    };

    return this.construct();
};

var $                               = function(input) {

    this.context                = {};

    this.construct                  = function(input) {
        this.context            = input;
        return this;
    };

    this.console                    = function(text) {
        if (this.context && this.context.name) {
            print('[' + this.context.name + '] ' + text);
        } else {
            print(text);
        }

        return this;
    };

    this.broadcast                  = function(text) {

    };

    /** Call Functions */
        this.hook                   = function(eventName, callback) {
            if (!this.context)      return false;
            this.context.call_hook(eventName, callback);
            return this;
        };

        this.object                 = function() {
            if (!this.context)      return false;
            return this.context.call_object();
        };

    return this.construct(input);
};

var oxide       = new oxidePlugin(title, author, version, resourceId);
var corrosion   = $(oxide).object();

























