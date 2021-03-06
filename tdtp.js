"use strict";
/// <reference types="minecraft-scripting-types-server" />
//------------------------------------------------------------------------------//
//                          Transdimenstion Teleport                            //
//                               script for BDSX                                //
//                              (tdtp.ts/tdtp.js)                               //
//                         by randommouse/madeofstown                           //
//------------------------------------------------------------------------------//
//                                Use/Function:                                 //
//                     Teleport Players Across Dimensions                       //
//------------------------------------------------------------------------------//
//                          Required Custom Scripts:                            //
//                         plyerlist.ts/playerlist.js                           //
//                         Recommended Custom Scripts:                          //
//                              index.ts/index.js                               //
//------------------------------------------------------------------------------//
//                   Thansks to P Jai Rjlin and their work @                    //
// https://github.com/Rjlintkh/bdsx-scripts/blob/main/scripts/minecraftFunctions.ts  //
//------------------------------------------------------------------------------//
Object.defineProperty(exports, "__esModule", { value: true });
exports.tdTeleport = exports.changeDimension = void 0;
const bdsx_1 = require("bdsx");
const playerlist_1 = require("./playerlist");
const core_1 = require("bdsx/core");
const packets_1 = require("bdsx/bds/packets");
let system = server.registerSystem(0, 0);
exports.changeDimension = core_1.makefunc.js(bdsx_1.NativeModule.get(null).add(0xCD3FF0), bdsx_1.RawTypeId.Void, null, bdsx_1.Actor, bdsx_1.RawTypeId.Int32, bdsx_1.RawTypeId.Boolean);
// EXPORTED tdTeleport function
function tdTeleport(playerName, dimId /* 0=overworld, 1=nether, 2=end */, x, y, z) {
    let netId = playerlist_1.connectionList.nXNet.get(playerName);
    let actor = netId.getActor();
    exports.changeDimension(actor, dimId, false);
    setTimeout(function () {
        system.executeCommand(`execute ${playerName} ~ ~ ~ tp @s ${x} ${y} ${z}`, () => { });
        let update = packets_1.SetTitlePacket.create();
        update.sendTo(netId, 0);
        update.dispose();
    }, 500);
    return 0;
}
exports.tdTeleport = tdTeleport;
// Hooking '/tdtp <dimId:{0=overworld, 1=nether, 2=end}> <xPos> <yPos> <zPos>' command  
bdsx_1.command.hook.on((command, originName) => {
    if (command.startsWith('/tdtp')) {
        let cmdData = command.split(' ');
        let dimId = parseInt(cmdData[1]);
        let xPos = cmdData[2];
        let yPos = cmdData[3];
        let zPos = cmdData[4];
        console.log('[COMMAND HOOK] /tdtp ' + dimId + ' ' + xPos + ' ' + yPos + ' ' + zPos + ' @' + originName);
        tdTeleport(originName, dimId, xPos, yPos, zPos);
        return 0;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRkdHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUEwRDtBQUMxRCxrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRix1RkFBdUY7QUFDdkYsa0ZBQWtGOzs7QUFFbEYsK0JBQStEO0FBQy9ELDZDQUE4QztBQUM5QyxvQ0FBcUM7QUFDckMsOENBQWtEO0FBR2xELElBQUksTUFBTSxHQUFRLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLFFBQUEsZUFBZSxHQUFHLGVBQVEsQ0FBQyxFQUFFLENBQUMsbUJBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFDLGdCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsZ0JBQVMsQ0FBQyxLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVqSiwrQkFBK0I7QUFDL0IsU0FBZ0IsVUFBVSxDQUFDLFVBQWtCLEVBQUUsS0FBYSxDQUFBLGtDQUFrQyxFQUFFLENBQU0sRUFBRSxDQUFNLEVBQUUsQ0FBTTtJQUNsSCxJQUFJLEtBQUssR0FBRywyQkFBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLHVCQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUVyQyxVQUFVLENBQUM7UUFDUCxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsVUFBVSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLE1BQU0sR0FBRyx3QkFBYyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3ZCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDUixPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFaRCxnQ0FZQztBQUdELHdGQUF3RjtBQUN4RixjQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRTtJQUNwQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3hHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLENBQUM7S0FDWjtBQUNMLENBQUMsQ0FBQyxDQUFDIn0=