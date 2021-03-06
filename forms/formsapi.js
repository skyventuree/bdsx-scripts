"use strict";
/// <reference types="minecraft-scripting-types-server" />
//------------------------------------------------------------------------------//
//                         Form Send and Response API                           //
//                               script for BDSX                                //
//                          (formsapi.ts/formsapi.js)                           //
//                         by randommouse/madeofstown                           //
//------------------------------------------------------------------------------//
//                                Use/Function:                                 //
//                   Build and Send FormUI Evnts to Players                     //
//                    Examples found in forms.ts/forms.js                       //
//------------------------------------------------------------------------------//
//                          Required Custom Scripts:                            //
//                                    None                                      //
//------------------------------------------------------------------------------//
//            Thansks to P Jai Rjlin and their original forms API @             //
//      https://github.com/Rjlintkh/bdsx-scripts/blob/main/scripts/forms.js     //
//------------------------------------------------------------------------------//
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendModalForm = exports.CustomForm = exports.ModalForm = exports.SimpleForm = void 0;
const bdsx_1 = require("bdsx");
const packets_1 = require("bdsx/bds/packets");
class SimpleForm {
    constructor(title = "", content = "") {
        this.type = "form";
        this.title = title;
        this.content = content;
        this.buttons = [];
    }
    addButton(text, imageType = null, imagePath = "") {
        let content = {
            text: text
        };
        if (imageType !== null) {
            content.image = {
                type: imageType,
                data: imagePath
            };
        }
        this.buttons.push(content);
    }
}
exports.SimpleForm = SimpleForm;
class ModalForm {
    constructor(title = "", content = "") {
        this.type = "modal";
        this.title = title;
        this.content = content;
        this.button1 = "";
        this.button2 = "";
    }
    setLeftButton(text) {
        this.button1 = text;
    }
    setRightButton(text) {
        this.button2 = text;
    }
}
exports.ModalForm = ModalForm;
class CustomForm {
    constructor(title = "") {
        this.type = "custom_form";
        this.title = title;
        this.content = [];
    }
    addLabel(text) {
        let content = {
            type: "label",
            text: text
        };
        this.content.push(content);
    }
    addToggle(text, _default = null) {
        let content = {
            type: "toggle",
            text: text
        };
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
    addSlider(text, min, max, step = null, _default = null) {
        let content = {
            type: "slider",
            text: text,
            min: min,
            max: max
        };
        if (step !== null) {
            content.step = step;
        }
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
    addStepSlider(text, steps = null, defaultIndex = null) {
        let content = {
            type: "step_slider",
            text: text,
        };
        if (steps !== null) {
            content.step = steps;
        }
        if (defaultIndex !== null) {
            content.default = defaultIndex;
        }
        this.content.push(content);
    }
    addDropdown(text, options, _default = null) {
        let content = {
            type: "dropdown",
            text: text,
            options: options
        };
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
    addInput(text, placeholder = "", _default = null) {
        let content = {
            type: "input",
            text: text,
            placeholder: placeholder
        };
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
}
exports.CustomForm = CustomForm;
const formCallback = {};
function sendModalForm(networkIdentifier, form, callback = function () { }) {
    let formId = Math.floor(Math.random() * 2147483647) + 1;
    let packet = packets_1.ModalFormRequestPacket.create();
    packet.id = formId;
    packet.content = JSON.stringify(form);
    packet.sendTo(networkIdentifier, 0);
    packet.dispose();
    setTimeout(function () {
        let update = packets_1.SetTitlePacket.create();
        update.sendTo(networkIdentifier, 0);
        update.dispose();
    }, 100);
    formCallback[formId] = callback;
}
exports.sendModalForm = sendModalForm;
bdsx_1.netevent.raw(bdsx_1.PacketId.ModalFormResponse).on((ptr, _size, networkIdentifier) => {
    ptr.move(1);
    let data = {};
    data.formId = ptr.readVarUint();
    data.formData = JSON.parse(ptr.readVarString());
    console.log(data);
    if (formCallback[data.formId]) {
        formCallback[data.formId](data, networkIdentifier);
        delete formCallback[data.formId];
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXNhcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3Jtc2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMERBQTBEO0FBQzFELGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixrRkFBa0Y7QUFDbEYsa0ZBQWtGO0FBQ2xGLGtGQUFrRjs7O0FBR2xGLCtCQUE0RDtBQUM1RCw4Q0FBeUU7QUFDekUsTUFBYSxVQUFVO0lBRW5CLFlBQVksS0FBSyxHQUFFLEVBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRTtRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQVksRUFBRSxZQUFtQyxJQUFJLEVBQUUsU0FBUyxHQUFHLEVBQUU7UUFDM0UsSUFBSSxPQUFPLEdBQXlCO1lBQ2hDLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNGLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUNwQixPQUFPLENBQUMsS0FBSyxHQUFHO2dCQUNaLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxTQUFTO2FBQ2xCLENBQUE7U0FDSjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQXBCRCxnQ0FvQkM7QUFFRCxNQUFhLFNBQVM7SUFFbEIsWUFBWSxLQUFLLEdB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