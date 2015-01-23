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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});

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
