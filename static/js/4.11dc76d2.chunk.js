(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{291:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__1Fc7h",dialogsItems:"Dialogs_dialogsItems__lkmAy",dialog:"Dialogs_dialog__3WCgH",messages:"Dialogs_messages__3rpty"}},292:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var n=t(48),s=t(0),i=t.n(s),l=t(10),r=t(16),c=function(e){return{isAuth:e.auth.isAuth}};function o(e){return Object(r.b)(c,{})((function(a){var t=a.isAuth,s=Object(n.a)(a,["isAuth"]);return t?i.a.createElement(e,s):i.a.createElement(l.a,{to:"/login"})}))}},298:function(e,a,t){"use strict";t.r(a);var n=t(9),s=t(127),i=t(0),l=t.n(i),r=t(291),c=t.n(r),o=t(20),m=function(e){var a="/dialogs/"+e.id;return l.a.createElement("div",{className:"".concat(c.a.dialog)},l.a.createElement(o.b,{to:a},l.a.createElement("span",null,e.name)))},u=function(e){return l.a.createElement("div",{className:c.a.message},e.message)},d=t(129),g=t(24),b=t(64),f=Object(b.a)(100),E=Object(d.a)({form:"dialogAddMessageForm"})((function(e){return l.a.createElement("form",{onSubmit:e.handleSubmit},l.a.createElement("div",null,Object(g.c)("write your message","newMessageBody",g.b,[b.b,f])),l.a.createElement("div",null,l.a.createElement("button",null,"Send message")))})),p=function(e){var a=e.dialogsPage.dialogs.map((function(e){return l.a.createElement(m,{name:e.name,id:e.id,key:e.id})})),t=e.dialogsPage.messages.map((function(e){return l.a.createElement(u,{message:e.message,id:e.id,key:e.id})}));return l.a.createElement("div",{className:c.a.dialogs},l.a.createElement("div",{className:c.a.dialogsItems},a),l.a.createElement("div",{className:c.a.messages},t),l.a.createElement(E,{onSubmit:function(a){e.sendMessage(a.newMessageBody)}}))},v=t(16),_=t(292),h=t(8);a.default=Object(h.d)(Object(v.b)((function(e){return{dialogsPage:e.dialogsPage}}),Object(n.a)({},s.b)),_.a)(p)}}]);
//# sourceMappingURL=4.11dc76d2.chunk.js.map