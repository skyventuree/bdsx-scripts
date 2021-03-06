"use strict";
/// <reference types="minecraft-scripting-types-server" />
/*
 *  *   *   *   *   *   *   *   *
 *  BDSX2 SCRIPT - index.ts     *
 *  by randommouse/madeofstown  *
 *  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
 *  USE/FUNCTION:                                                       *
 *  *   Set the console window name and call other custom scripts.      *
 *  *   Create ./scripts/ folder and place inside with other custom     *
 *  *   scripts to be loaded.                                           *
 *  *   ADD "import './scripts';" TO ./index.ts                         *
 *  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const bdsx_1 = require("bdsx");
// Set Console Window Name  *   *   *   *
let windowName = "BDSX Session";
//  *   *   *   *   *   *   *   *   *   *
const kernel32 = bdsx_1.NativeModule.load('Kernel32.dll');
const user32 = bdsx_1.NativeModule.load('User32.dll');
const GetConsoleWindow = kernel32.getFunction('GetConsoleWindow', bdsx_1.VoidPointer);
const SetWindowText = user32.getFunction('SetWindowTextW', bdsx_1.RawTypeId.Void, null, bdsx_1.VoidPointer, bdsx_1.RawTypeId.StringUtf16);
const wnd = GetConsoleWindow();
SetWindowText(wnd, windowName);
// IMPORT playerlist script
require("./playerlist");
// IMPORT playerinit scrip
require("./playerinit");
//IMPORT transferserver script
require("./transferserver");
//IMPORT tdtp (Transdimentional Teleport) script
require("./tdtp");
require("./home");
require("./tellraw");
require("./sudo");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMERBQTBEO0FBQzFEOzs7Ozs7Ozs7OztHQVdHOztBQUVILCtCQUE0RDtBQUc1RCx5Q0FBeUM7QUFDekMsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFBO0FBQy9CLHlDQUF5QztBQUV6QyxNQUFNLFFBQVEsR0FBRyxtQkFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNuRCxNQUFNLE1BQU0sR0FBRyxtQkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsa0JBQVcsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGtCQUFXLEVBQUUsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNySCxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO0FBQy9CLGFBQWEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFHL0IsMkJBQTJCO0FBQzNCLHdCQUFzQjtBQUV0QiwwQkFBMEI7QUFDMUIsd0JBQXNCO0FBRXRCLDhCQUE4QjtBQUM5Qiw0QkFBMEI7QUFFMUIsZ0RBQWdEO0FBQ2hELGtCQUFnQjtBQUVoQixrQkFBZ0I7QUFFaEIscUJBQW1CO0FBRW5CLGtCQUFnQiJ9