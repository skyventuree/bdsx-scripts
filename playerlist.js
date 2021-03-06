"use strict";
//------------------------------------------------------------------------------//
//                           Map NAME <--> NetworkID                            //
//                               script for BDSX                                //
//                        (playerlist.ts/playerlist.js)                         //
//                         by randommouse/madeofstown                           //
//------------------------------------------------------------------------------//
//                                Use/Function:                                 //
//                      Create a Map obect that contains:                       //
//           Name -> NetworkID AND NetworkID -> for each active player          // 
//                  (removes players from map when they leave)                  //
//------------------------------------------------------------------------------//
//                          Required Custom Scripts:                            //
//                        playerlist.ts/playerlist.js                           //
//                             forms.ts/forms.js                                //
//------------------------------------------------------------------------------//
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionList = void 0;
const bdsx_1 = require("bdsx");
exports.connectionList = {
    nXNet: new Map(),
    nXXid: new Map(),
    n2Ent: new Map() /* Name to Entity */
};
let system = server.registerSystem(0, 0);
//Read Login Packet and Add Player To Connection List
bdsx_1.netevent.after(bdsx_1.PacketId.Login).on((ptr, networkIdentifier, packetId) => {
    let ip = networkIdentifier.getAddress();
    // let actor = networkIdentifier.getActor();
    let cert = ptr.connreq.cert;
    let xuid = cert.getXuid();
    let username = cert.getId();
    if (username) {
        exports.connectionList.nXNet.set(username, networkIdentifier);
        exports.connectionList.nXNet.set(networkIdentifier, username);
        exports.connectionList.nXXid.set(username, xuid);
        exports.connectionList.nXXid.set(xuid, username);
        console.log(`[SCRIPT INFO] ${username}|${xuid} JOINED from ${ip}`);
        console.log(`[SCRIPT INFO] ${username} ADDED to CONNECTION LIST`);
        console.log(exports.connectionList.nXNet);
        console.log(exports.connectionList.nXXid);
    }
});
system.listenForEvent(ReceiveFromMinecraftServer.EntityCreated, ev => {
    const actor = bdsx_1.Actor.fromEntity(ev.data.entity);
    let entity = ev.data.entity;
    // console.log(entity)
    if (actor === null || actor === void 0 ? void 0 : actor.isPlayer()) {
        let playerName = system.getComponent(entity, MinecraftComponent.Nameable);
        // console.log(playerName?.data.name);
        exports.connectionList.n2Ent.set(playerName === null || playerName === void 0 ? void 0 : playerName.data.name, entity);
        console.log(exports.connectionList.n2Ent);
    }
});
//Read Disconnect Event and Remove Player From Connection List
bdsx_1.NetworkIdentifier.close.on(networkIdentifier => {
    let username = exports.connectionList.nXNet.get(networkIdentifier);
    let xuid = exports.connectionList.nXXid.get(username);
    exports.connectionList.nXNet.delete(networkIdentifier);
    exports.connectionList.nXNet.delete(username);
    exports.connectionList.nXXid.delete(username);
    exports.connectionList.nXXid.delete(xuid);
    exports.connectionList.n2Ent.delete(username);
    console.log(`[SCRIPT INFO] ${username} REMOVED from CONNECTION LIST`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVybGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXllcmxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsbUZBQW1GO0FBQ25GLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGOzs7QUFFbEYsK0JBQW9FO0FBR3ZELFFBQUEsY0FBYyxHQUFHO0lBQzFCLEtBQUssRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUNoQixLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUU7SUFDaEIsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUksb0JBQW9CO0NBQzNDLENBQUE7QUFFRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUV6QyxxREFBcUQ7QUFDckQsZUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxFQUFFO0lBQ25FLElBQUksRUFBRSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLDRDQUE0QztJQUM1QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLElBQUksUUFBUSxFQUFFO1FBQ1Ysc0JBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFB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