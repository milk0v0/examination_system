import Vue from "vue";
import message from "@/components/message";

let messageConstructor = Vue.extend(message);
let instance;


const Message = function (options) {
  typeof options === 'string' && (options = {
    type: 'success',
    msg: options,
  });

  instance = new messageConstructor({ data: options });

  instance.$mount();
  document.body.appendChild(instance.$el);

  return instance;
};

export default Message;