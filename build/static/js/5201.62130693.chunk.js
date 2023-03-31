"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[5201],{5201:function(e,t,s){s.d(t,{Z:function(){return K}});var n=s(1413),a=s(2982),l=s(885),o=s(2791),c=s(3168),i=s(8785),r=s(3541),d=s(6030),u=s(4618),m=s(8218),_=s(3666),h=s(3076),f=s(5861),x=s(4687),j=s.n(x),b=s(1968),g=s.n(b),v=s(4569),p=s.n(v),k=s(6425),w=s(7207),y=s(1176),Z=s(9883),C=s(9761),L=s(1650),S=s(4373),N=s(6053),E=s(4651),O={small_font:"choose-item-modal_small_font__NmAvv",search_container:"choose-item-modal_search_container__FA0lf",search_input:"choose-item-modal_search_input__qStm1",item_row:"choose-item-modal_item_row__TUKI+",row:"choose-item-modal_row__gepe9",item_details:"choose-item-modal_item_details__wIEgQ",actions_div:"choose-item-modal_actions_div__s+uPG"},I=s(3585),M=s(3329);var F=function(e){var t=e.data,s=e.addAction,n=(0,c.$)().t,a=(0,o.useRef)(),i=(0,d.I0)(),r=(0,d.v9)(k.VY),u=(0,o.useState)(!1),m=(0,l.Z)(u,2),_=m[0],h=m[1];return(0,o.useEffect)((function(){return function(){clearTimeout(a)}}),[]),(0,M.jsxs)("div",{className:O.item_row,children:[(0,M.jsxs)("div",{className:O.item_details,children:[(0,M.jsxs)("div",{className:O.row,children:[(0,M.jsx)("label",{children:n("item name")}),(0,M.jsx)("p",{children:t.name})]}),(0,M.jsxs)("div",{className:O.row,children:[(0,M.jsx)("label",{children:n("caliber")}),(0,M.jsx)("p",{children:t.caliber})]}),(0,M.jsxs)("div",{className:O.row,children:[(0,M.jsx)("label",{children:n("packing")}),(0,M.jsx)("p",{children:t.packing})]})]}),_?(0,M.jsx)(Z.Z,{icon:function(){return(0,M.jsx)(E.H_P,{className:"loading",size:24,color:I.wL.SUCCEEDED_COLOR})},onclick:function(){},foreColor:I.wL.SUCCEEDED_COLOR}):(0,M.jsx)(Z.Z,{icon:function(){return(0,M.jsx)(N.PgY,{color:I.wL.SUCCEEDED_COLOR})},foreColor:I.wL.SUCCEEDED_COLOR,onclick:function(){r?(h(!0),s(t._id),a=setTimeout((function(){h(!1)}),15e3)):i((0,k.Rb)())}})]})},D=function(e){var t=e.close,s=e.chooseAction,u=e.setBaskItems,m=e.index,_=e.basketItems,h=(0,c.$)().t,x=(0,d.v9)(r.rK),b=(0,d.I0)(),v=(0,o.useState)(""),k=(0,l.Z)(v,2),Z=k[0],N=k[1],E=(0,o.useState)([]),D=(0,l.Z)(E,2),R=D[0],A=D[1],z=(0,o.useState)(!1),U=(0,l.Z)(z,2),B=U[0],q=U[1],H=(0,o.useState)(1),T=(0,l.Z)(H,2),W=T[0],Y=T[1],P=(0,o.useState)(0),K=(0,l.Z)(P,2),Q=K[0],G=K[1],$=function(){var e=(0,f.Z)(j().mark((function e(t){var s,n;return j().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,q(!0),s="",Z.trim().length>0&&(s="&itemName=".concat(Z.trim())),e.next=6,p().get("".concat(I.Hc,"/items?limit=15&isActive=true&page=").concat(t).concat(s),{headers:{Authorization:"Bearer ".concat(x)}});case 6:n=e.sent,A(1===t?n.data.data.items:[].concat((0,a.Z)(R),(0,a.Z)(n.data.data.items))),G(n.data.count),q(!1),Y(t+1),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}(),J=function(e){null!==m?(u(_.map((function(t,s){return s===m?(0,n.Z)((0,n.Z)({},t),{},{item:R.filter((function(t){return t._id===e}))[0]}):t}))),t()):b(s({id:e,token:x})).then(i.SI).then((function(){A(R.filter((function(t){return t._id!==e})))}))};return(0,o.useEffect)((function(){$(1)}),[]),(0,M.jsx)(w.Z,{header:"choose item",cancelLabel:"cancel",closeModal:t,small:!0,children:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)("div",{className:[O.search_container,"flex_center_container"].join(" "),children:[(0,M.jsx)(S.FKI,{color:I.wL.LIGHT_COLOR,size:24}),(0,M.jsx)("input",{className:O.search_input,placeholder:h("search by name composition barcode"),value:Z,onChange:function(e){return N(e.target.value)},onKeyDown:function(e){"Enter"===e.code&&$(1),"Escape"!==e.code&&e.stopPropagation()}}),(0,M.jsx)(y.Z,{text:"search",action:function(){$(1)},classStyle:"bg_green"})]}),(0,M.jsxs)("div",{style:{maxHeight:"300px",overflow:"auto"},children:[(null===R||void 0===R?void 0:R.length)>0&&R.map((function(e){return(0,M.jsx)(F,{data:e,addAction:J},e._id)})),0===R.length&&0===Z.length&&(0,M.jsx)(C.Z,{msg:h("search for item")}),0===R.length&&0!==Z.length&&(0,M.jsx)(C.Z,{msg:h("no results found")})]}),B?(0,M.jsx)(L.Z,{children:(0,M.jsx)(g(),{color:I.wL.LIGHT_COLOR,type:"cylon"})}):R.length<Q&&(0,M.jsx)("div",{className:O.actions_div,children:(0,M.jsx)(y.Z,{text:"more",action:function(){$(W)},classStyle:"bg_green"})})]})})},R=s(6856),A="basket-item-row_item_row__eoaSo",z="basket-item-row_content_div__rFL-Y",U="basket-item-row_name_div__UeJkn",B="basket-item-row_content_details__00LzW",q="basket-item-row_cell__LmotM",H="basket-item-row_delete_div__GJT-m",T=function(e){var t,s,n=e.index,a=e.setSelectedIndex,l=e.setShowChooseModal,o=e.changeIsFree,i=e.changeQty,r=e.item,d=e.deleteItem,u=e.changeBonus,m=e.allowEdit,_=(0,c.$)().t;return(0,M.jsxs)("div",{className:A,children:[(0,M.jsxs)("div",{className:z,children:[(0,M.jsxs)("div",{className:U,children:[m&&(0,M.jsx)(Z.Z,{selected:!1,foreColor:I.wL.SUCCEEDED_COLOR,tooltip:_("add"),onclick:function(){a(n),l(!0)},icon:function(){return(0,M.jsx)(R.vU7,{size:24})},withBackground:!0}),(0,M.jsx)("label",{children:null===(t=r.item)||void 0===t?void 0:t.name})]}),(0,M.jsxs)("div",{className:B,children:[(0,M.jsxs)("div",{className:q,children:[(0,M.jsx)("label",{children:_("price")}),(0,M.jsx)("label",{children:(0,I.uf)(null===(s=r.item)||void 0===s?void 0:s.price)})]}),(0,M.jsxs)("div",{className:q,children:[(0,M.jsx)("label",{children:_("free")}),(0,M.jsx)("input",{type:"checkbox",value:r.isFree,checked:r.isFree,onChange:function(e){return o(e,n)},style:{position:"relative",top:"6px",width:"18px",height:"18px"},disabled:!m})]}),(0,M.jsxs)("div",{className:q,children:[(0,M.jsx)("label",{children:_("quantity")}),m?(0,M.jsx)("input",{value:r.qty,type:"number",min:0,max:100,onChange:function(e){return i(e,n)},disabled:!m}):(0,M.jsx)("label",{children:r.qty})]}),(0,M.jsxs)("div",{className:q,children:[(0,M.jsx)("label",{children:_("piece")}),m?(0,M.jsx)("input",{value:r.bonus,type:"number",min:0,max:100,onChange:function(e){return u(e,n)},disabled:!m}):(0,M.jsx)("label",{children:r.bonus})]}),(0,M.jsxs)("div",{className:q,children:[(0,M.jsx)("label",{children:_("total price")}),(0,M.jsx)("label",{children:r.item?r.isFree?0:(0,I.uf)(r.item.price*r.qty):0})]})]})]}),m&&(0,M.jsx)("div",{className:H,children:(0,M.jsx)(Z.Z,{selected:!1,foreColor:I.wL.FAILED_COLOR,tooltip:_("delete"),onclick:function(){d(n)},icon:function(){return(0,M.jsx)(R.ZkW,{size:24})},withBackground:!0})})]},n)},W=s(1162),Y=s(7425),P={small_font:"basket_small_font__pgSHJ",basket_div:"basket_basket_div__iWXrI",expanded_div:"basket_expanded_div__hmFM4",content:"basket_content__2mcEl",details_row:"basket_details_row__h2eOx",row:"basket_row__9Duoj",actions:"basket_actions__Yq+Qz"};var K=function(e){var t=e.setIsNew,s=e.basket,f=e.editable,x=e.forRead,j=(0,c.$)().t,b=(0,d.I0)(),g=(0,d.v9)(r.tT),v=g.token,p=g.user,k=(0,d.v9)(m.op).warehouses,C=(0,o.useState)(s?s.items:[]),L=(0,l.Z)(C,2),S=L[0],N=L[1],E=(0,o.useState)(s?s.gift:""),O=(0,l.Z)(E,2),F=O[0],A=O[1],z=(0,o.useState)(s?s.note:""),U=(0,l.Z)(z,2),B=U[0],q=U[1],H=(0,o.useState)(s?s.discount:0),K=(0,l.Z)(H,2),Q=K[0],G=K[1],$=(0,o.useState)(!!t),J=(0,l.Z)($,2),X=J[0],V=J[1],ee=(0,o.useState)(!!f),te=(0,l.Z)(ee,2),se=te[0],ne=te[1],ae=(0,o.useState)(0),le=(0,l.Z)(ae,2),oe=le[0],ce=le[1],ie=(0,o.useState)(!1),re=(0,l.Z)(ie,2),de=re[0],ue=re[1],me=(0,o.useState)(!1),_e=(0,l.Z)(me,2),he=_e[0],fe=_e[1],xe=(0,o.useState)(s?s.warehouse:null),je=(0,l.Z)(xe,2),be=je[0],ge=je[1],ve=(0,o.useState)(!1),pe=(0,l.Z)(ve,2),ke=pe[0],we=pe[1],ye=(0,o.useState)(!1),Ze=(0,l.Z)(ye,2),Ce=Ze[0],Le=Ze[1],Se=(0,o.useState)(null),Ne=(0,l.Z)(Se,2),Ee=Ne[0],Oe=Ne[1],Ie=(0,o.useState)(!1),Me=(0,l.Z)(Ie,2),Fe=Me[0],De=Me[1],Re=(0,o.useState)(null),Ae=(0,l.Z)(Re,2),ze=Ae[0],Ue=Ae[1],Be=(0,o.useState)(!1),qe=(0,l.Z)(Be,2),He=qe[0],Te=qe[1],We=function(){var e=0;return S.forEach((function(t){null!==t.item&&(t.isFree||(e+=t.qty*t.item.price))})),e},Ye=function(){var e={obj:{pharmacy:p._id,warehouse:s.warehouse._id,basket:s._id,status:I.zi.SENT_BY_PHARMACY},token:v};b((0,_.mv)(e)).then(i.SI).then((function(){Oe({msg:"basket-ordered-successfully-msg",type:"success",closeModal:function(){Oe(null),Le(!1)}}),De(!1),Le(!0)})).catch((function(e){Oe({msg:"basket-ordered-failed-msg",type:"failed",closeModal:function(){Oe(null),Le(!1)}}),De(!1),Le(!0)}))},Pe=function(e){N(S.filter((function(t,s){return s!==e})))},Ke=function(e,t){N(S.map((function(s,a){return a===t?(0,n.Z)((0,n.Z)({},s),{},{qty:e.target.value}):s}))),Te(!1),fe(!1)},Qe=function(e,t){N(S.map((function(s,a){return a===t?(0,n.Z)((0,n.Z)({},s),{},{bonus:e.target.value}):s}))),Te(!1),fe(!1)},Ge=function(e,t){N(S.map((function(e,s){return s===t?(0,n.Z)((0,n.Z)({},e),{},{isFree:!e.isFree}):e}))),Te(!1),fe(!1)},$e=function(){var e=S.filter((function(e){return null!==e.item&&e.qty>0}));N(e),0===e.length||p.type===I.Wl.ADMIN&&null===be?(Te(!0),fe(!1)):(Te(!1),fe(!0)),De(!1)},Je=function(){var e={warehouse:p.type===I.Wl.WAREHOUSE?p._id:be._id,items:S.map((function(e){return(0,n.Z)((0,n.Z)({},e),{},{item:e.item._id,bonus:1*e.bonus,qty:1*e.qty})})),discount:Q,gift:F,note:B};t?b((0,u.yg)({data:e,token:v})).then(i.SI).then((function(){Oe({msg:"basket added successfully msg",type:"success",closeModal:function(){Oe(null),Le(!1),t(!1)}}),De(!1),Le(!0)})).catch((function(){Oe({msg:"basket added failed msg",type:"failed",closeModal:function(){Oe(null),Le(!1)}}),Le(!0),De(!1)})):b((0,u.Wf)({data:{basketId:s._id,data:e},token:v})).then(i.SI).then((function(){Oe({msg:"basket updated successfully msg",type:"success",closeModal:function(){Oe(null),Le(!1)}}),V(!1),De(!1),Le(!0)}))},Xe=function(){b((0,u.Fm)({basketId:s._id,token:v})).then(i.SI).then((function(){Oe({msg:"basket removed successfully msg",type:"success",closeModal:function(){Oe(null),Le(!1),b((0,u.NX)({basketId:s._id}))}}),De(!1),Le(!0)})).catch((function(){Oe({msg:"basket removed failed msg",type:"failed",closeModal:function(){Oe(null),Le(!1)}}),Le(!0),De(!1)}))};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)("div",{className:[P.basket_div].join(" "),style:{backgroundColor:He?"rgb(255, 132, 123)":""},children:[(0,M.jsxs)("div",{className:P.content,children:[p.type!==I.Wl.WAREHOUSE&&!x&&(0,M.jsxs)("div",{className:P.details_row,children:[(0,M.jsxs)("label",{children:[j("warehouse"),":"]}),null===be?X&&(0,M.jsx)(Z.Z,{selected:!1,foreColor:I.wL.SUCCEEDED_COLOR,onclick:function(){we(!0),Te(!1)},icon:function(){return(0,M.jsx)(R.NcC,{size:24})},withBackground:!0}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("label",{children:be.name}),X?(0,M.jsx)(Z.Z,{selected:!1,foreColor:I.wL.FAILED_COLOR,onclick:function(){ge(null),fe(!1)},icon:function(){return(0,M.jsx)(Y.w6k,{size:24})},withBackground:!0}):(0,M.jsx)(M.Fragment,{})]})]}),f&&X&&(0,M.jsx)("div",{className:P.row,style:{justifyContent:"center"},children:(0,M.jsx)(Z.Z,{selected:!1,foreColor:I.wL.SUCCEEDED_COLOR,tooltip:j("new item"),onclick:function(){N([].concat((0,a.Z)(S),[{item:null,qty:0,bonus:0,isFree:!1}])),Te(!1),fe(!1)},icon:function(){return(0,M.jsx)(R.NcC,{size:24})},withBackground:!0})}),(0,M.jsxs)("div",{className:P.details_row,children:[(0,M.jsx)("label",{children:j("basket total items")}),(0,M.jsx)("label",{children:S.length}),(0,M.jsx)("div",{className:P.expanded_div,onClick:function(){return ne(!se)},children:se?(0,M.jsx)(R.Faw,{size:24}):(0,M.jsx)(R.Yc6,{size:24})})]}),se&&S.map((function(e,t){return(0,M.jsx)(T,{changeBonus:Qe,changeIsFree:Ge,changeQty:Ke,deleteItem:Pe,index:t,item:e,setSelectedIndex:ce,setShowChooseModal:ue,editable:f,allowEdit:X},t)})),(0,M.jsxs)("div",{className:P.content,children:[(0,M.jsxs)("div",{className:P.details_row,children:[(0,M.jsx)("label",{children:j("total price")}),(0,M.jsx)("label",{children:(0,I.uf)(We())})]}),(0,M.jsxs)("div",{className:P.details_row,children:[(0,M.jsx)("label",{children:j("discount")}),f&&X?(0,M.jsx)("input",{value:Q,onChange:function(e){return G(e.target.value)},type:"number",min:0,max:100}):(0,M.jsx)("label",{children:Q})]}),(0,M.jsxs)("div",{className:P.details_row,children:[(0,M.jsx)("label",{children:j("total price after discount")}),(0,M.jsx)("label",{children:0!==Q?(0,I.uf)(We()-We()*Q/100):(0,I.uf)(We())})]}),(0,M.jsxs)("div",{className:P.details_row,children:[(0,M.jsx)("label",{children:j("gift")}),f&&X?(0,M.jsx)("textarea",{rows:"2",value:F,onChange:function(e){return A(e.target.value)}}):(0,M.jsx)("label",{children:F})]}),(0,M.jsxs)("div",{className:P.details_row,children:[(0,M.jsx)("label",{children:j("note")}),f&&X?(0,M.jsx)("textarea",{rows:"2",value:B,onChange:function(e){return q(e.target.value)}}):(0,M.jsx)("label",{children:B})]})]})]}),f?(0,M.jsxs)("div",{className:P.actions,children:[!he&&X&&(0,M.jsx)("div",{style:{margin:"0 5px"},children:(0,M.jsx)(y.Z,{action:function(){Ue({closeModal:function(){De(!1)},header:"check basket ",cancelLabel:"close",okLabel:"ok",okModal:$e,small:!0,msg:"check basket msg"}),De(!0)},text:j("check basket"),classStyle:"bg_main"})}),he&&X&&(0,M.jsx)("div",{style:{margin:"0 5px"},children:(0,M.jsx)(y.Z,{action:function(){Ue({closeModal:function(){De(!1)},header:"add",cancelLabel:"close",okLabel:"ok",okModal:Je,small:!0,msg:t?"add basket msg":"update basket msg"}),De(!0)},text:j("ok"),bgColor:I.wL.SUCCEEDED_COLOR,classStyle:"bg_green"})}),X?(0,M.jsx)(y.Z,{action:function(){t?t(!1):(V(!1),N(s.items),A(s.gift),q(s.note),G(s.discount),ge(s.warehouse))},text:j("cancel"),classStyle:"bg_red"}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(y.Z,{action:function(){V(!0)},text:j("edit basket"),classStyle:"bg_main"}),(0,M.jsx)("div",{style:{width:"10px"}}),(0,M.jsx)(y.Z,{action:function(){Ue({closeModal:function(){De(!1)},header:"remove basket",cancelLabel:"close",okLabel:"ok",okModal:Xe,small:!0,msg:"remove basket confirm msg"}),De(!0)},text:j("remove basket"),classStyle:"bg_red"})]})]}):x?(0,M.jsx)(M.Fragment,{}):(0,M.jsx)("div",{className:P.actions,children:(0,M.jsx)(y.Z,{action:function(){Ue({closeModal:function(){De(!1)},header:"order basket",cancelLabel:"close",okLabel:"ok",okModal:Ye,small:!0,msg:"order basket confirm msg"}),De(!0)},text:j("order basket"),classStyle:"bg_green"})})]}),de&&(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(D,{close:function(){ue(!1),ce(0),fe(!1)},setBaskItems:N,basketItems:S,index:oe,url:"".concat(I.Hc,"/items?limit=15&isActive=true&warehouseId=").concat(p.type===I.Wl.WAREHOUSE?p._id:be?be._id:"")})}),ke&&(0,M.jsx)(h.Z,{header:"choose warehouse",close:function(){return we(!1)},chooseAction:function(e){return function(e){ge(e)}(e)},data:k,placeholder:"enter warehouse name"}),Fe&&(0,M.jsx)(w.Z,{closeModal:ze.closeModal,header:j(ze.header),cancelLabel:j(ze.cancelLabel),okLabel:j(ze.okLabel),okModal:ze.okModal,small:ze.small,children:(0,M.jsx)("p",{children:j(ze.msg)})}),Ce&&(0,M.jsx)(W.Z,{msg:Ee.msg,closeModal:Ee.closeModal,type:Ee.type})]})}},1162:function(e,t,s){s.d(t,{Z:function(){return d}});var n=s(2791),a=s(4164),l=s(3168),o=s(6856),c=s(3585),i={small_font:"result-modal_small_font__ks35+",modal:"result-modal_modal__UtY1F",closable_div:"result-modal_closable_div__TN6RQ",modal_content:"result-modal_modal_content__u5QGL","modal-show":"result-modal_modal-show__LKAI+",modal_body:"result-modal_modal_body__Yk0+b","zoom-in-text":"result-modal_zoom-in-text__UnOQF",success_msg:"result-modal_success_msg__Chsn+",failed_msg:"result-modal_failed_msg__q1Tbo",icon:"result-modal_icon__0X-cs","zoom-in-icon":"result-modal_zoom-in-icon__Tsjl+",modal_footer:"result-modal_modal_footer__N-Zko",success_button:"result-modal_success_button__L8xh8",failed_button:"result-modal_failed_button__ecj3O"},r=s(3329),d=function(e){var t=e.closeModal,s=e.msg,d=e.type,u=(0,l.$)().t;return(0,n.useEffect)((function(){return document.body.style.overflow="hidden",function(){document.body.style.overflow="unset"}})),a.createPortal((0,r.jsxs)("div",{className:i.modal,children:[(0,r.jsx)("div",{className:i.closable_div,onClick:t}),(0,r.jsxs)("div",{className:[i.modal_content].join(" "),children:[(0,r.jsxs)("main",{className:i.modal_body,children:["success"===d?(0,r.jsx)(o.w6,{color:c.wL.SUCCEEDED_COLOR,className:i.icon}):(0,r.jsx)(o.MKW,{color:c.wL.FAILED_COLOR,className:i.icon}),s&&(0,r.jsx)("p",{className:"success"===d?i.success_msg:i.failed_msg,children:u(s)})]}),(0,r.jsx)("footer",{className:i.modal_footer,children:(0,r.jsx)("button",{className:"success"===d?i.success_button:i.failed_button,onClick:function(e){t(),e.stopPropagation()},children:u("close")})})]})]}),document.getElementById("success-modal-root"))}},3076:function(e,t,s){s.d(t,{Z:function(){return f}});var n=s(885),a=s(2791),l=s(3168),o=s(9761),c=s(9883),i=s(7207),r=s(4373),d=s(6856),u={small_font:"select-partner-modal_small_font__dmMS8",search_container:"select-partner-modal_search_container__vOBPi",search_input:"select-partner-modal_search_input__aSI3L",company_row:"select-partner-modal_company_row__Z4ogO",more_btn:"select-partner-modal_more_btn__BhuwE"},m=s(3585),_=s(3329);var h=function(e){var t=e.data,s=e.select;return(0,_.jsxs)("div",{className:u.company_row,children:[(0,_.jsx)("p",{className:u.company_name,children:t.name}),(0,_.jsx)(c.Z,{icon:function(){return(0,_.jsx)(d.NcC,{size:24})},foreColor:m.wL.SUCCEEDED_COLOR,onclick:function(){s(t)},selected:!1})]})},f=function(e){var t=e.close,s=e.chooseAction,c=e.header,d=e.placeholder,f=e.data,x=(0,l.$)().t,j=(0,a.useRef)(),b=(0,a.useState)(""),g=(0,n.Z)(b,2),v=g[0],p=g[1],k=f.filter((function(e){return!(v.trim().length>0)||e.name.includes(v.trim())})),w=function(e){s(e),t()};return(0,a.useEffect)((function(){j.current.focus()}),[]),(0,_.jsx)(i.Z,{header:x(c),cancelLabel:"cancel",closeModal:t,small:!0,children:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("div",{className:[u.search_container,"flex_center_container"].join(" "),children:[(0,_.jsx)(r.FKI,{color:m.wL.LIGHT_COLOR,size:24}),(0,_.jsx)("input",{className:u.search_input,placeholder:x(d),value:v,onChange:function(e){return p(e.target.value)},ref:j})]}),(0,_.jsxs)("div",{style:{maxHeight:"300px",overflow:"auto"},children:[(null===k||void 0===k?void 0:k.length)>0&&k.map((function(e){return(0,_.jsx)(h,{data:e,select:w},e._id)})),0===k.length&&0===v.length&&(0,_.jsx)(o.Z,{msg:x("no result found")}),0===k.length&&0!==v.length&&(0,_.jsx)(o.Z,{msg:x("no result found")})]})]})})}}}]);
//# sourceMappingURL=5201.62130693.chunk.js.map