"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[2231],{1162:function(e,t,n){n.d(t,{Z:function(){return d}});var o=n(2791),a=n(4164),l=n(3168),s=n(6856),r=n(3585),c={small_font:"result-modal_small_font__ks35+",modal:"result-modal_modal__UtY1F",closable_div:"result-modal_closable_div__TN6RQ",modal_content:"result-modal_modal_content__u5QGL","modal-show":"result-modal_modal-show__LKAI+",modal_body:"result-modal_modal_body__Yk0+b","zoom-in-text":"result-modal_zoom-in-text__UnOQF",success_msg:"result-modal_success_msg__Chsn+",failed_msg:"result-modal_failed_msg__q1Tbo",icon:"result-modal_icon__0X-cs","zoom-in-icon":"result-modal_zoom-in-icon__Tsjl+",modal_footer:"result-modal_modal_footer__N-Zko",success_button:"result-modal_success_button__L8xh8",failed_button:"result-modal_failed_button__ecj3O"},i=n(3329),d=function(e){var t=e.closeModal,n=e.msg,d=e.type,u=(0,l.$)().t;return(0,o.useEffect)((function(){return document.body.style.overflow="hidden",function(){document.body.style.overflow="unset"}})),a.createPortal((0,i.jsxs)("div",{className:c.modal,children:[(0,i.jsx)("div",{className:c.closable_div,onClick:t}),(0,i.jsxs)("div",{className:[c.modal_content].join(" "),children:[(0,i.jsxs)("main",{className:c.modal_body,children:["success"===d?(0,i.jsx)(s.w6,{color:r.wL.SUCCEEDED_COLOR,className:c.icon}):(0,i.jsx)(s.MKW,{color:r.wL.FAILED_COLOR,className:c.icon}),n&&(0,i.jsx)("p",{className:"success"===d?c.success_msg:c.failed_msg,children:u(n)})]}),(0,i.jsx)("footer",{className:c.modal_footer,children:(0,i.jsx)("button",{className:"success"===d?c.success_button:c.failed_button,onClick:function(e){t(),e.stopPropagation()},children:u("close")})})]})]}),document.getElementById("success-modal-root"))}},6824:function(e,t,n){var o=n(885),a=n(2791),l=n(3168),s=n(6355),r=n(3585),c=n(9883),i=n(6349),d=n(3329);t.Z=function(e){var t=e.children,n=e.searchAction,u=e.searchEngineAlert,_=(0,l.$)().t,m=a.Children.toArray(t),h=(0,a.useState)(!1),f=(0,o.Z)(h,2),p=f[0],x=f[1];return(0,d.jsxs)("div",{className:[i.Z.search_container,i.Z.expanded].join(" "),children:[(0,d.jsxs)("div",{className:i.Z.options_container,children:[m[0],p&&m.length>1?m.map((function(e,t){return t>0?e:null})):null,p&&n&&(0,d.jsx)("button",{className:i.Z.search_button,onClick:function(){n(),x(!1)},children:_("search")})]}),(0,d.jsx)("div",{className:i.Z.icon_container,children:m.length>1?(0,d.jsx)(c.Z,{onclick:function(){return x(!p)},icon:function(){return(0,d.jsx)(s.ulB,{size:24,color:r.wL.WHITE_COLOR})},withAlertIcon:u}):n?(0,d.jsx)(c.Z,{onclick:function(){n(),x(!1)},icon:function(){return(0,d.jsx)(s.U41,{size:24,color:r.wL.WHITE_COLOR})}}):(0,d.jsx)(d.Fragment,{})})]})}},2231:function(e,t,n){n.r(t),n.d(t,{default:function(){return W}});var o=n(885),a=n(2791),l=n(9271),s=n(3168),r=n(3229),c=n(2785),i=n(3384),d=n(6824),u=n(9363),_=n(4831),m=n(6030),h=n(3541),f=n(3666),p=n(3585),x=n(3329);var j=function(e){var t=e.pageState,n=e.search,l=(e.type,(0,s.$)().t),r=(0,m.I0)(),j=(0,m.v9)(h.dy),v=(0,a.useState)(!1),b=(0,o.Z)(v,2),y=b[0],g=b[1],w=(0,a.useState)(!1),N=(0,o.Z)(w,2),C=N[0],E=N[1],O=[{value:"",label:l("choose date")},{value:p.r6.ONE_DAY,label:l("one day")},{value:p.r6.THREE_DAY,label:l("three days")},{value:p.r6.ONE_WEEK,label:l("one week")},{value:p.r6.TWO_WEEK,label:l("two weeks")},{value:p.r6.ONE_MONTH,label:l("one month")},{value:p.r6.TWO_MONTH,label:l("two months")},{value:p.r6.SIX_MONTH,label:l("six months")},{value:p.r6.ONE_YEAR,label:l("one year")}],A=[{value:p.zi.ALL,label:l("all orders")},{value:p.zi.SENT_BY_PHARMACY,label:l("sent by pharmacy label")},{value:p.zi.CONFIRM,label:l("confirm label")},{value:p.zi.DELIVERY,label:l("delivery label")},{value:p.zi.SHIPPING,label:l("shipping label")},{value:p.zi.WILL_DONT_SERVER,label:l("dont serve label")}],L=t.searchPharmacyName.trim().length>0||t.searchWarehouseName.trim().length>0||t.orderStatus!==p.zi.ALL||""!==t.dateOption&&""!==t.date;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d.Z,{searchAction:n,searchEngineAlert:L,children:[j.type!==p.Wl.PHARMACY&&(0,x.jsx)(_.Z,{label:"pharmacy",id:"pharmacy-name",type:"text",value:t.searchPharmacyName,onchange:function(e){return r((0,f.UT)(e.target.value))},placeholder:"search by pharmacy name",onEnterPress:n,resetField:function(){r((0,f.UT)(""))}}),j.type!==p.Wl.WAREHOUSE&&(0,x.jsx)(_.Z,{label:"warehouse",id:"warehouse-name",type:"text",value:t.searchWarehouseName,onchange:function(e){return r((0,f.jY)(e.target.value))},placeholder:"enter warehouse name",onEnterPress:n,resetField:function(){r((0,f.jY)(""))}}),(0,x.jsx)(i.Z,{onclick:function(){g(!0)},selectedValue:A.filter((function(e){return e.value===t.orderStatus}))[0].label,label:"order status",styleForSearch:!0,withoutBorder:!0}),(0,x.jsx)(i.Z,{onclick:function(){E(!0)},selectedValue:O.filter((function(e){return e.value===t.dateOption}))[0].label,label:"dates within",styleForSearch:!0,withoutBorder:!0}),(0,x.jsxs)(c.Z,{children:[(0,x.jsx)("label",{children:l("date")}),(0,x.jsx)("input",{type:"date",value:t.date,onChange:function(e){r((0,f.XC)(e.target.value))}})]})]}),y&&(0,x.jsx)(u.Z,{headerTitle:"order status",close:function(){g(!1)},values:A,defaultValue:t.orderStatus,chooseHandler:function(e){var t;t=e,r((0,f.hn)(t))}}),C&&(0,x.jsx)(u.Z,{headerTitle:"dates within",close:function(){E(!1)},values:O,defaultValue:t.dateOption,chooseHandler:function(e){var t;t=e,r((0,f.DT)(t))}})]})},v=n(6886),b=n(9114),y=n(9215),g=n(3804),w=n(1162),N=n(9761),C=n(8516),E=n(7207),O=n(9883),A=n(9488),L=n(7425),Z={small_font:"order-row_small_font__t4PeP",outer_container:"order-row_outer_container__kbuLb",status_div:"order-row_status_div__MFeM4",container:"order-row_container__AhBA7",details:"order-row_details__6T7FL",pharmacy_info_div:"order-row_pharmacy_info_div__nSx2D",name:"order-row_name__tuVJ4",address:"order-row_address__Z3tMa",warehouse_info_div:"order-row_warehouse_info_div__UAHf+",date_div:"order-row_date_div__9jeQn",actions:"order-row_actions__1w95b",grey_div:"order-row_grey_div__f56JG"};var k=function(e){var t,n,r=e.order,c=e.deleteAction,i=e.type,d=e.index,u=(0,s.$)().t,_=(0,l.k6)(),f=(0,m.v9)(h.tT).user,j=(0,a.useState)(!1),v=(0,o.Z)(j,2),b=v[0],y=v[1],g=(0,a.useState)(""),w=(0,o.Z)(g,2),N=w[0],C=w[1],k=function(e){"normal"===i?_.push("/order-details?".concat(e)):_.push("/basket-order-details?".concat(e))};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:[Z.outer_container,d%2===0?Z.grey_div:""].join(" "),children:[(0,x.jsxs)("div",{className:Z.container,children:[(0,x.jsxs)("div",{className:[Z.details].join(" "),children:[(f.type===p.Wl.ADMIN||f.type===p.Wl.WAREHOUSE)&&(0,x.jsxs)("div",{className:Z.pharmacy_info_div,onClick:function(){k(r._id)},children:[(0,x.jsx)("label",{className:Z.name,children:r.pharmacy.name})," ",(0,x.jsx)("label",{className:Z.address,children:r.pharmacy.addressDetails})]}),(f.type===p.Wl.ADMIN||f.type===p.Wl.PHARMACY)&&(0,x.jsx)("div",{className:Z.warehouse_info_div,onClick:function(){k(r._id)},children:(0,x.jsx)("label",{className:Z.name,children:r.warehouse.name})}),(0,x.jsx)("div",{className:Z.date_div,onClick:function(){k(r._id)},children:(0,x.jsx)("label",{children:null===(t=r.createdAt)||void 0===t?void 0:t.split("T")[0]})})]}),f.type!==p.Wl.WAREHOUSE?(0,x.jsx)("div",{className:Z.actions,children:(0,x.jsx)(O.Z,{icon:function(){return(0,x.jsx)(L.w6k,{size:24})},onclick:function(){y(!0)},tooltip:u("delete"),foreColor:p.wL.FAILED_COLOR})}):(0,x.jsx)("div",{})]}),(0,x.jsx)("div",{className:Z.status_div,onClick:function(){k(r._id)},children:(0,x.jsxs)("label",{style:{textAlign:"center"},children:[u(r.status),r.status===p.zi.WILL_DONT_SERVER&&(0,x.jsx)("label",{children:r.couldNotDeliverDate.split("T")[0]}),r.status===p.zi.CONFIRM&&(0,x.jsx)("label",{children:r.confirmDate.split("T")[0]}),r.status===p.zi.DELIVERY&&(0,x.jsxs)("label",{children:[null===(n=r.deliverDate)||void 0===n?void 0:n.split("T")[0]," ",r.deliverTime?"---".concat(u("time"),": ").concat(r.deliverTime):""]}),r.status===p.zi.SHIPPING&&(0,x.jsxs)("label",{children:[r.shippedDate?r.shippedDate.split("T")[0]:u("shipped done"),r.shippedTime?"---".concat(u("time"),": ").concat(r.shippedTime):""]})]})})]}),b&&(0,x.jsx)(E.Z,{header:"delete order",cancelLabel:"cancel",okLabel:"ok",closeModal:function(){y(!1)},small:!0,okModal:function(){var e,t;e=r._id,t=r.warehouseStatus,f.type===p.Wl.ADMIN||f.type===p.Wl.PHARMACY&&"sent"!==t?(c(e),y(!1)):(y(!1),C("cant delete order"))},color:p.wL.FAILED_COLOR,children:(0,x.jsx)("p",{children:u("delete order confirm msg")})}),""!==N&&(0,x.jsx)(A.Z,{bgColor:p.wL.FAILED_COLOR,foreColor:"#fff",toastText:u(N),actionAfterTimeout:function(){C("")}})]})},T=n(8785),R=n(4373),I=n(5880),S={small_font:"orders-page_small_font__7J2QN",btn:"orders-page_btn__P7Gbz",selected:"orders-page_selected__jzBIk"},D=n(4651);var W=function(e){var t=e.onSelectedChange,n=e.type,c=(0,s.$)().t,i=(0,l.k6)(),d=(0,m.I0)(),u=(0,m.v9)(h.tT),_=u.token,E=u.user,Z=(0,m.v9)(f.ny),W=Z.status,M=Z.error,P=Z.count,H=Z.orders,z=Z.basketOrdersCount,F=Z.basketOrders,Y=Z.pageState,U=(0,a.useState)(!1),B=(0,o.Z)(U,2),V=B[0],G=B[1],J=(0,a.useState)({}),Q=(0,o.Z)(J,2),X=Q[0],$=Q[1],K=function(e){"normal"===e&&d((0,f.AU)({token:_})),"special"===e&&d((0,f.Pf)({token:_}))},q=function(){K(Y.type)},ee=function(e){d("normal"===Y.type?(0,f.wH)({token:_,orderId:e}):(0,f.XE)({token:_,orderId:e})).then(T.SI).then((function(){$({msg:"order deleted successfully msg",type:"success",closeModal:function(){$(null),G(!1)}}),G(!0)})).catch((function(){$({msg:"order deleted failed msg",type:"failed",closeModal:function(){$(null),G(!1)}}),G(!0)}))},te=function(){"normal"===Y.type&&d((0,f.GO)()),"special"===Y.type&&d((0,f.yg)()),K(Y.type)},ne=function(e){d((0,f.wk)(e)),"normal"===e&&0===H.length&&K(e),"special"===e&&0===F.length&&K(e)};return(0,a.useEffect)((function(){"normal"===Y.type&&0===H.length&&K("normal"),"special"===Y.type&&0===F.length&&K("special"),t(),window.scrollTo(0,0)}),[]),!E||E.type!==p.Wl.ADMIN&&E.type!==p.Wl.WAREHOUSE&&E.type!==p.Wl.PHARMACY?(0,x.jsx)(l.l_,{to:"/"}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{pageState:Y,search:te,type:n}),(0,x.jsxs)(r.Z,{children:[(0,x.jsxs)(C.Z,{children:[(0,x.jsx)("button",{className:[S.btn,"normal"===Y.type?S.selected:""].join(" "),onClick:function(){return ne("normal")},children:c("normal orders")}),(0,x.jsx)("button",{className:[S.btn,"special"===Y.type?S.selected:""].join(" "),onClick:function(){return ne("special")},children:c("special orders")}),(Y.searchPharmacyName.trim().length>0||Y.searchWarehouseName.trim().length>0||Y.orderStatus!==p.zi.ALL||""!==Y.dateOption&&""!==Y.date)&&(0,x.jsx)(O.Z,{withBackground:!0,selected:!1,foreColor:p.wL.MAIN_COLOR,tooltip:c("clear filter"),onclick:function(){d((0,f.Dg)()),te()},icon:function(){return(0,x.jsx)(D.jTJ,{})}}),(0,x.jsx)(O.Z,{foreColor:p.wL.MAIN_COLOR,selected:!1,icon:function(){return(0,x.jsx)(L.PwW,{})},tooltip:c("refresh"),onclick:te,withBackground:!0}),(0,x.jsx)(O.Z,{onclick:function(){i.goBack()},icon:function(){return(0,x.jsx)(R.D_,{})},foreColor:p.wL.MAIN_COLOR,withBackground:!0})]}),"normal"===Y.type&&P>0&&(0,x.jsx)(y.Z,{label:c("normal orders count"),count:P}),"special"===Y.type&&z>0&&(0,x.jsx)(y.Z,{label:c("special orders count"),count:z}),(0,x.jsxs)("div",{children:["normal"===Y.type&&(null===H||void 0===H?void 0:H.map((function(e,t){return(0,x.jsx)(k,{order:e,deleteAction:ee,type:"normal",index:t},e._id)}))),"special"===Y.type&&(null===F||void 0===F?void 0:F.map((function(e,t){return(0,x.jsx)(k,{order:e,deleteAction:ee,type:"special",index:t},e._id)}))),"normal"===Y.type&&P>0&&"loading"!==W&&(0,x.jsx)(y.Z,{count:"".concat(H.length," / ").concat(P)}),"special"===Y.type&&z>0&&"loading"!==W&&(0,x.jsx)(y.Z,{count:"".concat(F.length," / ").concat(z)}),"normal"===Y.type&&0===P&&"loading"!==W&&(0,x.jsx)(N.Z,{msg:c("no orders found")}),"special"===Y.type&&0===z&&"loading"!==W&&(0,x.jsx)(N.Z,{msg:c("no special orders found")}),"loading"===W&&(0,x.jsx)(g.Z,{}),"normal"===Y.type&&H.length<P&&"loading"!==W&&(0,x.jsx)(C.Z,{children:(0,x.jsx)(v.Z,{text:c("more"),action:q,bgColor:p.wL.SUCCEEDED_COLOR,icon:function(){return(0,x.jsx)(I.lYW,{})}})}),"normal"===Y.type&&H.length===P&&"loading"!==W&&0!==P&&(0,x.jsx)(b.Z,{msg:c("no more")}),"special"===Y.type&&F.length<z&&"loading"!==W&&(0,x.jsx)(C.Z,{children:(0,x.jsx)(v.Z,{text:c("more"),action:q,bgColor:p.wL.SUCCEEDED_COLOR,icon:function(){return(0,x.jsx)(I.lYW,{})}})}),"special"===Y.type&&F.length===z&&"loading"!==W&&0!==z&&(0,x.jsx)(b.Z,{msg:c("no more")}),M&&(0,x.jsx)(A.Z,{bgColor:p.wL.FAILED_COLOR,foreColor:"#fff",toastText:c(M),actionAfterTimeout:function(){return d((0,f.PU)())}})]}),V&&(0,x.jsx)(w.Z,{msg:X.msg,closeModal:X.closeModal,type:X.type})]})]})}},6349:function(e,t){t.Z={small_font:"search-container_small_font__Ha0Xq",search_container:"search-container_search_container__6isGM",options_container:"search-container_options_container__vvfU4",search_button:"search-container_search_button__CR7Cm",small_search_button:"search-container_small_search_button__FJ+gS",checkbox_div:"search-container_checkbox_div__RPj5T",icon_container:"search-container_icon_container__1e8wJ"}}}]);
//# sourceMappingURL=2231.d10f49c5.chunk.js.map