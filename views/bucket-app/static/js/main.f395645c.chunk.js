(this["webpackJsonpbucketlist-app"]=this["webpackJsonpbucketlist-app"]||[]).push([[0],{112:function(t,e,a){t.exports=a(140)},117:function(t,e,a){},135:function(t,e,a){},140:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),s=a(11),o=a.n(s),c=(a(117),a(80)),i=a(13),u=a(101),d=Object(u.a)({palette:{primary:{main:"#00897b"},secondary:{main:"#c0ca33"},contrastThreshold:3,tonalOffset:.2,background:{paper:"#f4f4f4"}}}),l=a(195),f=a(17),h=a.n(f),b=a(31),p=a(25),m=a(26),k=a(51),v=a(104),g=a(102),O=a(4),j=a(7),S=a(16),y=a(94),E=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.filter((function(t){return"completed"===t.status})).length===t.length&&t.length>0},x=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.filter((function(t){return"pending"===t.status})).length===t.length&&t.length>0},_=function(){var t=Object(b.a)(h.a.mark((function t(e){var a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.ok){t.next=4;break}return t.abrupt("return",e.json());case 4:return t.prev=4,t.next=7,e.json();case 7:a=t.sent,t.next=13;break;case 10:t.prev=10,t.t0=t.catch(4),a=t.t0.toString();case 13:if(!Object(j.e)(a)){t.next=17;break}return t.abrupt("return",Promise.reject(a.error||a.message));case 17:Promise.reject(a||"HTTP-Error: "+a.status);case 18:case"end":return t.stop()}}),t,null,[[4,10]])})));return function(e){return t.apply(this,arguments)}}(),N=function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0,n=Object(y.a)(Object.entries(e).values());try{for(n.s();!(t=n.n()).done;){var r=Object(S.a)(t.value,2),s=r[0],o=r[1];a[s]&&(a[s]=o)}}catch(c){n.e(c)}finally{n.f()}return a},w=function(t){return{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(t)}},T=a(95);Object(T.a)({basename:"/bucket"});Object(O.d)({enforceActions:"never"});var C=function(){function t(e){var a=this,n=e.todo_id,r=e.title,s=e.status,o=e.created_at;Object(p.a)(this,t),this.todo_id="",this.status="",this.title="",this.created_at="",this.finished=!1,this.error="",Object(O.f)(this,{todo_id:O.g,status:O.g,title:O.g,error:O.g,finished:O.g,toggle:O.b,updateSubtask:O.b}),r&&n&&s&&o?(this.error="",this.todo_id=n,this.title=r,this.status=s,this.created_at=o):(this.error="new Subtask missing some props",Object(j.j)("[Subtask]",this.error)),"completed"===this.status&&(this.finished=!0),Object(O.h)(this,"status",(function(t){"completed"===t.newValue&&(a.finished=!0),Object(j.f)("[subtask]","is ".concat(t.newValue))}))}return Object(m.a)(t,[{key:"toggle",value:function(){this.finished=!this.finished,this.status=this.finished?"completed":"pending"}},{key:"updateSubtask",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e=Object(j.a)(e),Object(O.i)((function(){e.title&&(t.title=e.title),e.created_at&&(t.created_at=e.created_at),e.status&&(t.status=e.status)}))}}]),t}();Object(O.d)({enforceActions:"never"});var B=function(){function t(e){var a=this,n=e.id,r=e.title,s=e.status,o=e.created_at,c=e.subtasks;Object(p.a)(this,t),this.id="",this.status="",this.title="",this.created_at="",this.subtasks=[],this.finished=!1,this.error="",this.reopenStatus=!1,Object(O.f)(this,{id:O.g,status:O.g,title:O.g,subtasks:O.g,error:O.g,finished:O.g,toggle:O.b,onUpdate:O.b,reopenStatus:O.g}),r&&n&&s&&o?(this.error="",this.id=n,this.title=r,this.status=s,this.created_at=o,this.subtasks=(c||[]).length?Object(j.a)(c).map((function(t){return new C(t)})):[],this.subtasks.sort((function(t,e){return new Date(t.created_at).getTime()-new Date(e.created_at).getTime()}))):(this.error="new Bucket missing some props",Object(j.j)("[Bucket]",this.error)),"completed"===this.status&&(this.finished=!0,this.reopenStatus=!1),"completed"!==this.status||this.subtasks.length||(this.status="pending",this.finished=!1,this.reopenStatus=!1),Object(O.h)(this,"status",(function(t){a.reopenStatus||a.setSubTasksStatus(t.newValue)})),Object(O.h)(this,"subtasks",(function(t){E(t.newValue)?Object(O.i)((function(){a.status="completed",a.finished=!0,Object(j.f)("[tasksCompleted]","bucket is complete")})):x(t.newValue)&&Object(O.i)((function(){a.status="pending",a.finished=!1,Object(j.f)("[tasksPending]","bucket is pending")}))}))}return Object(m.a)(t,[{key:"toggle",value:function(){if(this.subtasks.length)return this.finished=!this.finished,this.status=this.finished?"completed":"pending",this.finished}},{key:"addSubtask",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e=Object(j.a)(e),Object(O.i)((function(){var a=new C(e);a.error?Object(j.j)("[addSubtask]","subtask not added"):t.subtasks.push(a)}))}},{key:"onUpdate",value:function(t,e,a){var n=this;"addSubtask"!==a||"subtask"!==e?"statusChange"===a&&"subtask"===e&&Object(O.i)((function(){if(n.setSubTasksStatus(t.status,t.todo_id),"completed"===n.status&&!E(n.subtasks))return n.reopenStatus=!0,n.status="pending",n.finished=!1,void(n.reopenStatus=!1);E(n.subtasks)&&(n.status="completed",n.finished=!0),x(n.subtasks)&&(n.status="pending",n.finished=!1)})):Object(O.i)((function(){"completed"===n.status&&(n.reopenStatus=!0,Object(j.c)(300).then((function(){n.finished=!1,n.status="pending",n.reopenStatus=!1})))}))}},{key:"setSubTasksStatus",value:function(t,e){var a=this;"completed"!==t&&"pending"!==t||Object(O.i)((function(){a.subtasks=a.subtasks.map((function(a){return void 0===e?(a.status=t,a.finished="completed"===t,a):(e===a.todo_id&&(a.status=t,a.finished="completed"===t),a)}))}))}}]),t}(),D=a(81);Object(O.d)({enforceActions:"never"});var U=function(){function t(e,a){var n=this,r=a.id,s=a.entity;Object(p.a)(this,t),this.todos=[],this.state="pending",this.id="",Object(O.f)(this,{id:O.g,state:O.g,todos:O.g,unfinishedCount:O.c,finishedCount:O.c,addNewBucket:O.b,addNewSubTask:O.b}),this.entity=s,this.id=r,"BucketStore"===this.entity&&(this.todos=e.map((function(t){return new B(t)})).filter((function(t){return!t.error})),this.state="ready"),"SubTaskStore"===this.entity&&(this.todos=e.map((function(t){return new C(t)})).filter((function(t){return!t.error})),this.state="ready"),Object(O.h)(this,"todos",(function(t){Object(j.f)("[".concat(n.entity,"][todos][updated]"))})),Object(O.h)(this,"state",(function(t){Object(j.f)("[".concat(n.entity,"][state]"),t.newValue)}))}return Object(m.a)(t,[{key:"unfinishedCount",get:function(){return this.todos.filter((function(t){return!t.finished})).length}},{key:"finishedCount",get:function(){return this.todos.filter((function(t){return t.finished})).length}},{key:"taskByID",value:function(t){if("SubTaskStore"===this.entity){var e=this.todos.find((function(e){return e.todo_id===t}));if(e instanceof C)return e}if("BucketStore"===this.entity){var a=this.todos.find((function(e){return e.id===t}));if(a instanceof B)return a}}},{key:"addNewBucket",value:function(t,e){var a=this,n=t.title;if("BucketStore"!==this.entity)throw new Error("not allowed performing task/addNewBucket on entity:".concat(this.entity));try{if(!n)return void Object(j.j)("Bucket not added, {title} missing");var r=new B(function(t){var e=t.title;return{id:Object(D.v4)(),title:e,status:"pending",created_at:new Date,subtasks:[]}}({title:n})),s=r.id;return Object(O.i)((function(){a.todos.push(r),Object(j.d)(e)&&e(r).then((function(t){a.todos.forEach((function(e,n){e.id===s&&(e=N(t,e),a.todos[n]=e,Object(j.f)("[addNewBucket][lazyUpdate][done]"))}))})).catch(j.h)})),r}catch(o){Object(j.h)(o)}}},{key:"addNewSubTask",value:function(t,e){var a=this,n=t.title;if("SubTaskStore"!==this.entity)throw new Error("not allowed performing task/addSubTask on entity:".concat(this.entity));try{if(!n)return void Object(j.j)("[addNewSubTask]","subtask not added, {title} missing");var r=new C(function(t){var e=t.title;return{todo_id:Object(D.v4)(),title:e,status:"pending",created_at:new Date}}({title:n})),s=r.todo_id;return Object(O.i)((function(){a.todos.push(r),Object(j.d)(e)&&e(r).then((function(t){a.todos.forEach((function(e){e.todo_id===s&&(e=N(t,e))}))})).catch(j.h)})),r}catch(o){Object(j.h)("[addSubTask]",o)}}}]),t}(),P="http://localhost:5000/bucket/api";var A={base:P,bucketList:function(){return"".concat(P,"/list")},createBucket:function(){return"".concat(P,"/create")},updateBucketStatus:function(t){return"".concat(P,"/").concat(t,"/update-status")},updateBucketOnlyStatus:function(t){return"".concat(P,"/").concat(t,"/bucket-only-update-status")},createSubtask:function(t){return"".concat(P,"/").concat(t,"/rel/subtask/create")},updateSubtaskStatus:function(t){return"".concat(P,"/rel/subtask/").concat(t,"/update-status")}};Object.freeze(A);var I=function(t){Object(v.a)(a,t);var e=Object(g.a)(a);function a(){var t;return Object(p.a)(this,a),t=e.call(this),Object(O.f)(Object(k.a)(t),{todoData:O.g,state:O.g,onUpdate:O.b,fetch_bucketListGet:O.b}),t.fetch_bucketListGet(),Object(O.h)(Object(k.a)(t),"todoData",(function(t){Object(j.f)("[todoData][updated]")})),t}return Object(m.a)(a,[{key:"onUpdate",value:function(){var t=Object(b.a)(h.a.mark((function t(){var e,a,n,r,s,o,c,i,u,d,l,f,p=this,m=arguments;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=m.length>0&&void 0!==m[0]?m[0]:{},a=m.length>1?m[1]:void 0,n=m.length>2?m[2]:void 0,r=m.length>3?m[3]:void 0,s=m.length>4?m[4]:void 0,o=m.length>5?m[5]:void 0,c=["homeComponent","bucket","subtask"],o||(o=function(){}),i=function(){var t=Object(b.a)(h.a.mark((function t(c){var i,u,d,l,f;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i={},t.t0=c,t.next="homeComponent"===t.t0?4:"bucket"===t.t0?10:"subtask"===t.t0?17:42;break;case 4:if("addBucket"!==r){t.next=9;break}return t.next=7,p.addBucket_and_fetch(e);case 7:t.sent?o(!0):i={fail:!0,message:"addBucket_and_fetch no completed"};case 9:return t.abrupt("break",43);case 10:if("statusChange"!==r){t.next=16;break}return t.next=14,p.fetch_updateBucketStatusPost({status:e.status},a);case 14:(u=t.sent)?p._updateBucket(u,a,s):i={fail:!0,message:"fetch_updateBucketStatusPost not complete"};case 16:return t.abrupt("break",43);case 17:if("statusChange"!==r){t.next=33;break}return t.next=20,p.fetch_updateSubtaskStatusPost({status:e.status},a);case 20:if(!(d=t.sent)){t.next=32;break}return p._updateSubtask(d,a,s),l=s.id,f=E(s.todos)?"completed":"pending",t.next=27,p.fetch_updateBucketOnlyStatus({status:f},l);case 27:if(t.sent){t.next=29;break}i={fail:!0,message:"fetch_updateSubtaskStatusPost > fetch_updateBucketOnlyStatus not complete"};case 29:o(!0),t.next=33;break;case 32:i={fail:!0,message:"fetch_updateSubtaskStatusPost not complete"};case 33:if("addSubtask"!==r){t.next=41;break}return t.next=36,p.addSubtask_and_fetch(e,s);case 36:if(!t.sent){t.next=40;break}o(!0),t.next=41;break;case 40:i={fail:!0,message:"addSubtask not complete"};case 41:return t.abrupt("break",43);case 42:i={fail:!0,message:"no entity matched for: ".concat(n)};case 43:return i||(i={pass:!0}),t.abrupt("return",i);case 45:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),u=0,d=c;case 10:if(!(u<d.length)){t.next=19;break}if((l=d[u])===n){t.next=14;break}return t.abrupt("continue",16);case 14:(f=i(l))&&f.fail&&Object(j.h)("[MobXStore][onUpdate]",f.message);case 16:u++,t.next=10;break;case 19:Object(j.f)("[MobXStore][onUpdate]","[data][id][entity][childStore][eventName][?onDone]");case 20:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"addBucket_and_fetch",value:function(){var t=Object(b.a)(h.a.mark((function t(e){var a,n,r=this;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.title,t.next=3,this.childStoresAvailable.bucketStore.promise;case 3:if(!(this.childstores.bucketStore instanceof U)){t.next=6;break}return n=this.childstores.bucketStore.addNewBucket({title:a},(function(t){var e=t.title;return r.fetch_createBucketPost({title:e}).then((function(t){return t||Promise.reject("addBucket,No data available")})).catch(j.h)})),t.abrupt("return",n);case 6:return t.abrupt("return",!1);case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"addSubtask_and_fetch",value:function(){var t=Object(b.a)(h.a.mark((function t(e,a){var n,r,s,o=this;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.title,!(a instanceof U&&"SubTaskStore"===a.entity)){t.next=5;break}return r=a.id,s=a.addNewSubTask({title:n},(function(t){var e=t.title;return o.fetch_createSubtaskPost({title:e},r).then((function(t){return t||Promise.reject("addSubtask, No data available")})).catch(j.h)})),t.abrupt("return",s);case 5:return t.abrupt("return",!1);case 6:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()}]),a}(function(){function t(){Object(p.a)(this,t),this.todoData=[],this.state="pending",this.childStoresAvailable={bucketStore:Object(j.i)()},this.childstores={bucketStore:null},Object(O.f)(this.childStoresAvailable,{bucketStore:O.g})}return Object(m.a)(t,[{key:"fetch_bucketListGet",value:function(){var t=this;return this.state="pending",this.todoData=[],Object(j.b)("[fetch]",A.bucketList()),fetch(A.bucketList(),{method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}}).then(_).then((function(e){var a=e.response;e.code;Object(O.i)((function(){t.todoData=a||[],t.todoData.sort((function(t,e){return new Date(e.created_at).getTime()-new Date(t.created_at).getTime()})),t.state="ready"}))})).catch((function(e){Object(O.i)((function(){-1!==["NO_TOKEN","NOT_AUTHENTICATED"].indexOf(e)?t.state="no_auth":t.state="error"})),Object(j.h)("[fetch_bucketListGet]",e)}))}},{key:"fetch_createBucketPost",value:function(t){var e=this,a=t.title;return Object(j.b)("[fetch]",A.createBucket()),fetch(A.createBucket(),w({title:a})).then(_).then((function(t){var a=t.response;t.code;return Object(O.i)((function(){e.todoData.push(a)})),a})).catch((function(t){Object(O.i)((function(){-1!==["NO_TOKEN","NOT_AUTHENTICATED"].indexOf(t)&&(e.state="no_auth")})),Object(j.h)("[fetch_createBucketPost]",t)}))}},{key:"fetch_createSubtaskPost",value:function(t,e){var a=this,n=t.title;return Object(j.b)("[fetch]",A.createSubtask(e)),fetch(A.createSubtask(e),w({title:n})).then(_).then((function(t){var n=t.response;t.code;return Object(O.i)((function(){a.todoData=(a.todoData||[]).map((function(t){return t.id===e&&(t=n),t})),a._addSubToBucket(n,e)})),n})).catch((function(t){Object(O.i)((function(){-1!==["NO_TOKEN","NOT_AUTHENTICATED"].indexOf(t)&&(a.state="no_auth")})),Object(j.h)("[fetch_createSubtaskPost]",t)}))}},{key:"fetch_updateBucketStatusPost",value:function(t,e){var a=this,n=t.status;return Object(j.b)("[fetch]",A.updateBucketStatus(e)),fetch(A.updateBucketStatus(e),w({status:n})).then(_).then((function(t){var n=t.response;t.code;return Object(O.i)((function(){a.todoData=a.todoData.map((function(t){return t.id===e&&(t=n),t}))})),n})).catch((function(t){Object(O.i)((function(){-1!==["NO_TOKEN","NOT_AUTHENTICATED"].indexOf(t)&&(a.state="no_auth")})),Object(j.h)("[fetch_updateBucketStatusPost]",t)}))}},{key:"fetch_updateBucketOnlyStatus",value:function(t,e){var a=this,n=t.status;return Object(j.b)("[fetch]",A.updateBucketOnlyStatus(e)),fetch(A.updateBucketOnlyStatus(e),w({status:n})).then(_).then((function(t){var n=t.response;t.code;return Object(O.i)((function(){a.todoData=a.todoData.map((function(t){return t.id===e&&Object.entries(n).forEach((function(e){var a=Object(S.a)(e,2),n=a[0],r=a[1];t[n]&&(t[n]=r)})),t}))})),n})).catch((function(t){Object(O.i)((function(){-1!==["NO_TOKEN","NOT_AUTHENTICATED"].indexOf(t)&&(a.state="no_auth")})),Object(j.h)("[fetch_updateBucketOnlyStatus]",t)}))}},{key:"fetch_updateSubtaskStatusPost",value:function(t,e){var a=this,n=t.status;return Object(j.b)("[fetch]",A.updateSubtaskStatus(e)),fetch(A.updateSubtaskStatus(e),w({status:n})).then(_).then((function(t){var n=t.response;t.code;return Object(O.i)((function(){a.todoData=a.todoData.map((function(t){return t.id===e&&(t=n),t}))})),n})).catch((function(t){Object(O.i)((function(){-1!==["NO_TOKEN","NOT_AUTHENTICATED"].indexOf(t)&&(a.state="no_auth")})),Object(j.h)("[updateSubtaskStatusPost]",t)}))}},{key:"_addSubToBucket",value:function(t,e){this.childstores.bucketStore instanceof U&&(this.childstores.bucketStore.todos=this.childstores.bucketStore.todos.map((function(a){return a.id===e&&a instanceof B&&a.addSubtask(t),a})))}},{key:"_updateBucket",value:function(t,e,a){a instanceof U&&(a.todos=a.todos.map((function(a){return a.id===e&&a instanceof B&&(a=N(t,a)),a})))}},{key:"_updateSubtask",value:function(t,e,a){a instanceof U&&(a.todos=a.todos.map((function(a){return a instanceof C&&a.todo_id===e&&a.updateSubtask(t),a})))}}]),t}()),H=a(181),L=a(183),z=a(185),G=a(55),V=a(142),K=a(97),F=a.n(K),J=a(96),M=a(200),R=a(98),X=a.n(R),Y=Object(H.a)((function(t){return{root:{flexGrow:1},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1}}}));var q=function(t){var e=t.mobxstore,a=r.a.useState(""),n=Object(S.a)(a,2),s=n[0],o=n[1];Object(J.delay)(3e3).then((function(){o("Johndoe")}));var c=Y();return r.a.createElement("div",{className:c.root},r.a.createElement(L.a,{position:"static"},r.a.createElement(z.a,null,r.a.createElement(V.a,{edge:"start",className:c.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(F.a,null)),r.a.createElement(G.a,{variant:"h6",className:c.title},"Bucket List"),s&&"ready"===e.state?r.a.createElement(M.a,{avatar:r.a.createElement(X.a,null),className:"nav-avatar",label:s,clickable:!0,variant:"outlined"}):null)))},Q=(a(135),a(37)),W=a(186),Z=a(197),$=Object(H.a)((function(t){return{root:{width:"100%","& > * + *":{marginTop:t.spacing(2)}}}}));function tt(t){var e=$(),a=t.type,n=t.value;return n?r.a.createElement("div",{className:e.root+" mx-1"},"error"===a?r.a.createElement(Z.a,{severity:"error"},n):"warning"===a?r.a.createElement(Z.a,{severity:"warning"},n):"info"===a?r.a.createElement(Z.a,{severity:"info"},n):"success"===a?r.a.createElement(Z.a,{severity:"success"},n):null):null}var et=function(t){return Object(Q.a)((function(e){var a=e.mobxstore;e.basename;return"no_auth"===a.state?r.a.createElement(i.a,{to:"/session-expired"}):"error"===a.state?r.a.createElement(tt,{type:"error",value:"No data from server"}):"ready"===a.state?r.a.createElement(t,{mobxstore:a}):r.a.createElement("div",{className:"d-flex justify-content-center align-items-center m-5 p-2"},r.a.createElement(W.a,{color:"inherit",size:20}))}))},at=a(40),nt=a(196),rt=a(187),st=a(99),ot=a.n(st);function ct(t){var e=t.actionAdd,a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(H.a)((function(e){return{root:Object(at.a)(Object(at.a)({"& > *":{margin:e.spacing(1)}},t.style?t.style:{}),{},{backgroundColor:e.palette.background.paper}),extendedIcon:{marginRight:e.spacing(1)}}}))()}({style:t.style});return r.a.createElement("div",{className:a.root},r.a.createElement(rt.a,{color:"primary","aria-label":"add"},r.a.createElement(ot.a,{onClick:function(t){e&&e(),t.stopPropagation(),t.preventDefault()}})))}function it(t){var e=t.className,a=t.entity,n=t.add,s=t.childStore,o=t.text,c=t.style,i=t.variantName,u=void 0===i?"outlined":i,d=(t.value,t.onUpdate),l=t.id,f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(H.a)((function(e){return{root:Object(at.a)({backgroundColor:e.palette.background.paper,"& > *":{margin:e.spacing(1),width:"25ch"},"& .outlined-basic.form-control":{background:"transparent"}},t.style?t.style:{})}}))()}({style:c}),h=r.a.useState(""),b=Object(S.a)(h,2),p=b[0],m=b[1];return r.a.createElement("form",{value:p,onChange:function(t){var e=t.target.value||"";m(e)},onSubmit:function(t){var e="subtask"===a?"addSubtask":"addBucket";return(p||"").length>1?d({title:p},l,a,e,s,(function(){m("")})):Object(j.j)("[Input]","title is too short"),t.stopPropagation(),t.preventDefault(),!1},className:f.root+" "+e,noValidate:!0,autoComplete:"off"},r.a.createElement(r.a.Fragment,null,n?r.a.createElement("div",{className:"input-group mb-3 mr-1"},r.a.createElement(nt.a,{value:p,className:"outlined-basic form-control ",label:o,variant:u}),r.a.createElement(ct,{actionAdd:function(){var t="subtask"===a?"addSubtask":"addBucket";(p||"").length>1?d({title:p},l,a,t,s,(function(){m("")})):Object(j.j)("[Input]","title is too short")},style:{"& .MuiFab-root":{width:"34px",height:"34px"}}})):r.a.createElement(nt.a,{value:p,className:"outlined-basic",label:o,variant:u})))}var ut=a(199),dt=a(189),lt=a(191),ft=a(190),ht=a(100),bt=a.n(ht),pt=Object(H.a)((function(t){return{root:{width:"100%"},heading:{fontSize:t.typography.pxToRem(15),flexBasis:"85%",margin:"0px",flexShrink:0},secondaryHeading:{fontSize:"smaller",paddingTop:"0.75rem!important",color:t.palette.text.secondary,flexShrink:0,flexBasis:"15%"}}}));function mt(t){var e=t.SubTasks,a=t.Check,n=t.item,s=t.finishedCount,o=pt();return r.a.createElement("div",{className:o.root},r.a.createElement(ut.a,{className:"px-2 mb-2 accordion-wrap"},r.a.createElement(dt.a,{expandIcon:r.a.createElement(bt.a,null),"aria-label":"Expand","aria-controls":"additional-actions1-content",id:"additional-actions1-header"},r.a.createElement(ft.a,{className:o.heading,"aria-label":"Acknowledge",onClick:function(t){return t.stopPropagation()},onFocus:function(t){return t.stopPropagation()},control:r.a.createElement(a,null),label:n.title}),r.a.createElement(G.a,{className:o.secondaryHeading},"Done ",s,"/",n.subtasks.length," ")),r.a.createElement(lt.a,null,r.a.createElement(r.a.Fragment,null,e?r.a.createElement(e,null):"no details as yet"))))}var kt=a(188),vt=a(198),gt=a(192),Ot=a(193),jt=a(194),St=Object(H.a)((function(t){return{root:{backgroundColor:t.palette.background.paper}}})),yt=Object(Q.a)((function(t){var e=t.todo,a=t.inx,n=t.onUpdate,s=t.subTaskStore,o=t.currentCount,c=t.onCurrentCount,i=r.a.useState(!1),u=Object(S.a)(i,2),d=u[0],l=u[1];r.a.useEffect((function(){d||(o(s.finishedCount),l(!0))}),[d,o,s.finishedCount]);var f="subtask-item checkbox-list-label-".concat(a);return r.a.createElement(gt.a,{key:e.todo_id,role:void 0,dense:!0,button:!0,onClick:function(t){e.toggle(),n(e,e.todo_id,"subtask","statusChange",s),c(),t.stopPropagation()}},r.a.createElement(Ot.a,null,r.a.createElement(vt.a,{edge:"start",checked:e.finished,tabIndex:-1,inputProps:{"aria-labelledby":f}})),r.a.createElement(jt.a,{id:f,primary:e.title}))})),Et=Object(Q.a)((function(t){var e=t.subTaskStore,a=t.inx,n=t.onUpdate,s=t.currentCount,o=t.onCurrentCount,c=St();return r.a.createElement(kt.a,{className:c.root+" m-auto subtask-list"},e.todos.map((function(t){return r.a.createElement(yt,{onCurrentCount:o,currentCount:s,todo:t,key:t.todo_id,inx:a,onUpdate:n,subTaskStore:e})})),r.a.createElement("div",{className:"d-flex justify-content-between align-items-center flex-row subtask-item"},r.a.createElement(it,{variantName:"standard",text:"Add Task",style:{"& input":{padding:"3px 0 5px"}},id:e.id,entity:"subtask",childStore:e,onUpdate:n,add:!0})))})),xt=function(t){var e=t.subtasks,a=t.id,n=t.onUpdate,s=t.onCurrentCount,o=t.currentCount,c=new U(e||[],{id:a,entity:"SubTaskStore"});return r.a.createElement(Et,{currentCount:o,onCurrentCount:function(){return s(c.finishedCount)},subTaskStore:c,onUpdate:n})},_t=Object(H.a)((function(t){return{root:{width:"100%",backgroundColor:t.palette.background.paper}}})),Nt=Object(Q.a)((function(t){var e=t.todo,a=t.onUpdate,n=t.mobxstore,s=t.bucketStore;e.finished;var o=r.a.useState(0),c=Object(S.a)(o,2),i=c[0],u=c[1],d=function(t){return u(t)};return r.a.createElement("div",{className:"d-flex justify-content-center m-auto px-3 py-2 bucket-item"},r.a.createElement(mt,{Check:function(){return r.a.createElement(vt.a,{onClick:function(t){var n=e.toggle()?"completed":"pending",r=s.taskByID(e.id).subtasks.length?"statusChange":"statusNoChange";a({status:n},e.id,"bucket",r,s),t.stopPropagation()},checked:e.finished,edge:"start"})},item:e,finishedCount:i,SubTasks:function(){return r.a.createElement(xt,{onCurrentCount:d,currentCount:function(t){return d(t)},mobxstore:n,subtasks:e.subtasks||[],id:e.id,onUpdate:function(t,n,r,s,o,c){e.onUpdate(t,r,s),a(t,n,"subtask",s,o,c)}})}}))})),wt=Object(Q.a)((function(t){var e=t.bucketStore,a=t.mobxstore,n=t.onUpdate,s=_t();return r.a.createElement(kt.a,{className:s.root+" m-auto bucket-list"},(e.todos||[]).length?e.todos.map((function(t){return r.a.createElement(Nt,{todo:t,key:t.id,onUpdate:n,mobxstore:a,bucketStore:e})})):r.a.createElement(tt,{type:"info",value:"Add a new bucket list :)"}),(e.todos||[]).length&&e.unfinishedCount?r.a.createElement(tt,{type:"info",value:"Tasks left: "+e.unfinishedCount}):(e.todos||[]).length&&!e.unfinishedCount?r.a.createElement(tt,{type:"success",value:"All done!"}):null)})),Tt=function(t){var e=t.mobxstore,a=t.onUpdate;if("ready"===e.state){var n=new U(e.todoData||[],{entity:"BucketStore"});return e.childstores.bucketStore=n,e.childStoresAvailable.bucketStore.resolve(!0),"ready"===n.state?r.a.createElement(wt,{bucketStore:n,mobxstore:t.mobxstore,onUpdate:a}):"error"===n.state?r.a.createElement(tt,{type:"error",value:"No data for Bucket Store"}):r.a.createElement(W.a,{color:"inherit",size:20})}return r.a.createElement(W.a,{color:"inherit",size:20})};var Ct=et((function(t){var e=t.mobxstore,a=function(t,a,n,r,s,o){e.onUpdate(t,a,n,r,s,o)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12 col-md-8 m-auto bucket-wrap "},r.a.createElement("div",{className:"d-flex justify-content-center align-items-center m-auto"},r.a.createElement(it,{className:"bucket-add-input",variantName:"outlined",text:"New bucket",entity:"homeComponent",childStore:null,onUpdate:a,add:!0})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12 col-md-7 m-auto p-4"},r.a.createElement(Tt,{mobxstore:e,onUpdate:a}))))}));Object(j.g)("log","off"),Object(j.g)("debug","off");var Bt=new I;var Dt=function(){return r.a.createElement(c.a,{basename:"/bucket/app/"},r.a.createElement(l.a,{theme:d},r.a.createElement(q,{mobxstore:Bt}),r.a.createElement("div",{className:"container-fluid mt-3"},r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/app"},r.a.createElement(i.a,{to:"/profile/johndoe"}))),r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/",render:function(t){return r.a.createElement(i.a,{to:"/profile/johndoe"})}})),r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"/profile/:user"},r.a.createElement(Ct,{mobxstore:Bt}))),r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/error",render:function(t){return r.a.createElement(tt,{type:"error",value:"Ups something went wrong"})}})),r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/session-expired",render:function(t){return r.a.createElement(tt,{type:"error",value:"Your token expired, please login again at: /login"})}})),r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"*"},r.a.createElement(i.a,{to:"/profile/johndoe"}))))))};o.a.render(r.a.createElement(Dt,null),document.getElementById("root"))}},[[112,1,2]]]);
//# sourceMappingURL=main.f395645c.chunk.js.map