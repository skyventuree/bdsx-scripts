"use strict";
/// <reference types="minecraft-scripting-types-server" />
//------------------------------------------------------------------------------//
//                         Player Initialization Hook                           //
//                               script for BDSX                                //
//                        (playerinit.ts/playerinit.js)                         //
//                         by randommouse/madeofstown                           //
//------------------------------------------------------------------------------//
//                                Use/Function:                                 //
//           Run functions, commands and other things after a player            //
//                  has joined an initialized onto the server                   //
//------------------------------------------------------------------------------//
//                          Required Custom Scripts:                            //
//                        playerlist.ts/playerlist.js                           //
//                             forms.ts/forms.js                                //
//------------------------------------------------------------------------------//
Object.defineProperty(exports, "__esModule", { value: true });
const bdsx_1 = require("bdsx");
const playerlist_1 = require("./playerlist");
// import { transferServer } from "./transferserver";
// import { testForm } from "./forms/forms";
// let system = server.registerSystem(0, 0);
// Test for player Initialization
bdsx_1.netevent.after(bdsx_1.PacketId.SetLocalPlayerAsInitialized).on((_ptr, networkIdentifier, _packetId) => {
    if (networkIdentifier) {
        let username = playerlist_1.connectionList.nXNet.get(networkIdentifier);
        // Player Initialization Console Logging
        console.log(`[SCRIPT INFO] ${username} INITIALIZED`);
        // Teleport Player to World Spawn
        // system.executeCommand(`/tp ${username} 0 100 0`, () => {});
        // Send Test Form to Player
        // testForm(networkIdentifier);
        // Transfer Player to Another Server
        // transferServer(networkIdentifier, 'stonecraft.rndmm.us', 19132);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXllcmluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUEwRDtBQUMxRCxrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGOztBQUVsRiwrQkFBMEM7QUFDMUMsNkNBQThDO0FBQzlDLHFEQUFxRDtBQUNyRCw0Q0FBNEM7QUFHNUMsNENBQTRDO0FBRTVDLGlDQUFpQztBQUNqQyxlQUFRLENBQUMsS0FBSyxDQUFDLGVBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUMzRixJQUFJLGlCQUFpQixFQUFFO1FBQ25CLElBQUksUUFBUSxHQUFHLDJCQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBRTFELHdDQUF3QztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixRQUFRLGNBQWMsQ0FBQyxDQUFDO1FBRXJELGlDQUFpQztRQUNqQyw4REFBOEQ7UUFFOUQsMkJBQTJCO1FBQzNCLCtCQUErQjtRQUUvQixvQ0FBb0M7UUFDcEMsbUVBQW1FO0tBRXRFO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==