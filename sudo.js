"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bdsx_1 = require("bdsx");
const tellraw_1 = require("./tellraw");
bdsx_1.command.hook.on((cmd, origin) => {
    if (cmd.startsWith("/sudo")) {
        let param = cmd.split(' ').slice(1);
        let playerName = param[0];
        let textc = param.slice(1).join(' ');
        if (textc.startsWith("/")) {
            server.executeCommand(`execute {playerName} ~ ~ ~ {textc}`, res => {
                console.log(res);
            });
        }
        else {
            tellraw_1.tellraw("@a", `<{playerName}> {textc}`);
        }
    }
    return 0;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vkby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1ZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBbUU7QUFDbkUsdUNBQW9DO0FBRXBDLGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBVyxFQUFFLE1BQVcsRUFBRSxFQUFFO0lBQ3pDLElBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4QixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxjQUFjLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7U0FDTDthQUFNO1lBQ0gsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztTQUN2QztLQUNSO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQSJ9