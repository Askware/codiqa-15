/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
	Puship.PushipAppId = "opOG9OULTQDF07y"; // Replace this with your Puship Application ID
	
	Puship.EnableLog=true; // Enable/Disable the Puship internal logger (default is false)
	
	if (Puship.Common.GetCurrentOs()==Puship.OS.ANDROID){
		var GCMCode = "986287798235"; // Replace this with your google senderID
		Puship.GCM.Register(GCMCode,
		{
			successCallback: function (pushipresult){
				navigator.notification.alert("device registed");
			},
			failCallback: function (pushipresult){
				navigator.notification.alert("error during registration: "+ JSON.stringify(pushipresult));
			}
		});
	} else if (Puship.Common.GetCurrentOs()==Puship.OS.IOS){
		Puship.APNS.Register(
		{
			successCallback: function (pushipresult){
				navigator.notification.alert("device registed");
			},
			failCallback: function (pushipresult){
				navigator.notification.alert("error during registration: "+ JSON.stringify(pushipresult));
			}
		});
	} else if (Puship.Common.GetCurrentOs()==Puship.OS.WP){
		Puship.WP.Register(
		{
			successCallback: function (pushipresult){
				navigator.notification.alert("device registered with DeviceId:" + pushipresult.DeviceId);
			},
			failCallback: function (pushipresult){
				navigator.notification.alert("error during registration: "+ JSON.stringify(pushipresult));
			}
		});
	} else {
		Console.log("Not supported platform");
	}
	
	Puship.Common.OnPushReceived(function(event) {
		
		console.log('push received');
		
		try
		{
	            console.log("Push received");
	            alert("Message: " + event.notification.Alert);
	            alert("Sound: " + event.notification.Sound);
	            alert("Badge: " + event.notification.Badge);
	            console.log("Param1: " + event.notification.Param1);
	            console.log("Param2: " + event.notification.Param2);
	            console.log("Param3: " + event.notification.Param3);
	            console.log("Param4: " + event.notification.Param4);
	            console.log("Param5: " + event.notification.Param5);
		}
		catch(err)
		{
			console.warn("Cannot display alert in background");
		}
	});
		
    }
};
