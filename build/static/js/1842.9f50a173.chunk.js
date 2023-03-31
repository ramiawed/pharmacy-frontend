(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[1842],{4917:function(e,t,n){"use strict";n.d(t,{Z:function(){return E}});var o=n(885),a=n(2791),r=n(3168),i=n(8140),l=n(6670),s=n(7207),c=n(3585),d=n(3329),u=function(e){var t=e.orderDetails,n=e.close,o=(0,r.$)().t;return(0,d.jsxs)(s.Z,{header:o("order details"),closeModal:n,cancelLabel:"close",small:!0,children:[(0,d.jsx)(i.Z,{label:"pharmacy",value:t.pharmacy.name}),(0,d.jsx)(l.Z,{}),(0,d.jsx)(i.Z,{label:"certificate name",value:t.pharmacy.certificateName}),(0,d.jsx)(l.Z,{}),(0,d.jsx)(i.Z,{label:"address",value:t.pharmacy.addressDetails}),(0,d.jsx)(l.Z,{}),(0,d.jsx)(i.Z,{label:"mobile",value:t.pharmacy.mobile}),(0,d.jsx)(l.Z,{}),(0,d.jsx)(i.Z,{label:"warehouse",value:t.warehouse.name}),(0,d.jsx)(l.Z,{}),(0,d.jsx)(i.Z,{label:"date",value:(0,c.p6)(new Date(t.createdAt))}),t.totalInvoicePrice&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.Z,{}),(0,d.jsx)(i.Z,{label:"total price",value:(0,c.uf)(t.totalInvoicePrice)})]})]})},f=(0,a.memo)(u),m="choose-date-modal_container__yjI1S",h="choose-date-modal_row__JYAa7",p="choose-date-modal_input__Qoms8",v=function(e){var t=e.closeModal,n=e.header,i=e.msg,c=e.handler,u=e.withTime,f=(0,r.$)().t,v=(0,a.useState)(!0),j=(0,o.Z)(v,2),x=j[0],b=j[1],w=(0,a.useState)(!0),g=(0,o.Z)(w,2),_=g[0],y=g[1],L=(0,a.useState)(null),C=(0,o.Z)(L,2),Z=C[0],N=C[1],D=(0,a.useState)(null),O=(0,o.Z)(D,2),T=O[0],E=O[1];return(0,d.jsx)(s.Z,{header:f(n),closeModal:t,cancelLabel:f("cancel"),okLabel:f("ok"),small:!0,okModal:function(){c(x?void 0:Z,_?void 0:T),t()},children:(0,d.jsxs)("div",{className:m,children:[(0,d.jsx)("p",{children:f(i)}),(0,d.jsxs)("div",{className:h,children:[(0,d.jsx)("input",{type:"checkbox",checked:!x,onChange:function(){return b(!x)},id:"date"}),(0,d.jsx)("label",{htmlFor:"date",children:f("date")}),(0,d.jsx)("input",{type:"date",className:p,disabled:x,value:Z,onChange:function(e){N(e.target.value)}})]}),u&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.Z,{}),(0,d.jsxs)("div",{className:h,children:[(0,d.jsx)("input",{type:"checkbox",checked:!_,onChange:function(){return y(!_)},id:"time"}),(0,d.jsx)("label",{htmlFor:"time",children:f("time")}),(0,d.jsx)("input",{type:"time",className:p,disabled:_,value:T,onChange:function(e){E(e.target.value)}})]})]})]})})},j=n(2982),x=n(4802),b=n(8484),w=n(9883),g=n(7425),_=function(e){var t=0;return e.forEach((function(e){t=t+e.qty*e.item.price-(e.bonus&&e.bonusType===c.Hg.PERCENTAGE?e.qty*e.item.price*e.bonus/100:0)})),t},y=function(e){var t=e.csvData,n=e.fileName,o=(0,r.$)().t;return(0,d.jsx)(w.Z,{selected:!1,foreColor:c.wL.DARK_COLOR,tooltip:o("save order"),icon:function(){return(0,d.jsx)(g.Qup,{})},onclick:function(){return function(e,t){var n=e.map((function(e){return{"\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062a\u062d\u0627\u0631\u064a":e.item.name,"\u0627\u0644\u0634\u0631\u0643\u0629":e.item.company.name,"\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a":e.item.formula,"\u0627\u0644\u0639\u064a\u0627\u0631":e.item.caliber,"\u0627\u0644\u062a\u0639\u0628\u0626\u0629":e.item.packing,"\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a":e.item.price,"\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0639\u0645\u0648\u0645":e.item.customer_price,"\u0627\u0644\u0643\u0645\u064a\u0629":e.qty,"\u0627\u0644\u0639\u0631\u0636":e.bonus?e.bonus+(e.bonus?e.bonusType===c.Hg.PERCENTAGE?o("after-bonus-percentage-label"):o("after-quantity-label"):""):"","\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0627\u062c\u0645\u0627\u0644\u064a":e.qty*e.item.price-(e.bonus&&e.bonusType===c.Hg.PERCENTAGE?e.qty*e.item.price*e.bonus/100:0)}}));n=[].concat((0,j.Z)(n),[{"\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062a\u062d\u0627\u0631\u064a":"","\u0627\u0644\u0634\u0631\u0643\u0629":"","\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a":"","\u0627\u0644\u0639\u064a\u0627\u0631":"","\u0627\u0644\u062a\u0639\u0628\u0626\u0629":"","\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a":"","\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0639\u0645\u0648\u0645":"","\u0627\u0644\u0643\u0645\u064a\u0629":"","\u0627\u0644\u0639\u0631\u0636":"","\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0627\u062c\u0645\u0627\u0644\u064a":_(e)}]);var a={Sheets:{data:b.utils.json_to_sheet(n)},SheetNames:["data"]},r=b.write(a,{bookType:"xlsx",type:"array"}),i=new Blob([r],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});x.saveAs(i,t+".xlsx")}(t,n)},withBackground:!0,text:o("save order")})},L=n(8516),C=n(9126),Z=n(8014),N=n(6053),D=n(6856),O=n(6030),T=n(3541),E=function(e){var t=e.orderDetails,n=e.warehouseDontServeHanlder,i=e.devlierHandler,l=e.confirmOrderHanlder,u=e.shippedHandler,m=e.withSaveOption,h=(0,r.$)().t,p=(0,O.v9)(T.dy),j=(0,a.useState)(!1),x=(0,o.Z)(j,2),b=x[0],g=x[1],_=(0,a.useState)(!1),E=(0,o.Z)(_,2),k=E[0],R=E[1],S=(0,a.useState)(!1),A=(0,o.Z)(S,2),I=A[0],M=A[1],H=(0,a.useState)(!1),F=(0,o.Z)(H,2),q=F[0],B=F[1],U=(0,a.useState)(!1),G=(0,o.Z)(U,2),P=G[0],z=G[1];return(0,d.jsxs)(L.Z,{children:[(0,d.jsx)(w.Z,{icon:function(){return(0,d.jsx)(N.sTG,{color:c.wL.MAIN_COLOR})},onclick:function(){g(!0)},foreColor:c.wL.LIGHT_COLOR,withBackground:!0,tooltip:h("order details"),text:h("details")}),(p.type===c.Wl.ADMIN||p.type===c.Wl.WAREHOUSE)&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(w.Z,{icon:function(){return(0,d.jsx)(C.lXt,{color:c.wL.MAIN_COLOR})},onclick:function(){M(!0)},foreColor:c.wL.LIGHT_COLOR,withBackground:!0,tooltip:h("will dont serve label"),text:h("will dont serve label")}),(0,d.jsx)(w.Z,{icon:function(){return(0,d.jsx)(Z._XM,{color:c.wL.MAIN_COLOR})},onclick:function(){B(!0)},foreColor:c.wL.LIGHT_COLOR,withBackground:!0,tooltip:h("confirm order label"),text:h("confirm order label")}),(0,d.jsx)(w.Z,{icon:function(){return(0,d.jsx)(C.oFd,{color:c.wL.MAIN_COLOR})},onclick:function(){R(!0)},foreColor:c.wL.LIGHT_COLOR,withBackground:!0,tooltip:h("deliver order label"),text:h("deliver order label")}),(0,d.jsx)(w.Z,{icon:function(){return(0,d.jsx)(D.O4H,{color:c.wL.MAIN_COLOR})},onclick:function(){z(!0)},foreColor:c.wL.LIGHT_COLOR,withBackground:!0,tooltip:h("shipped order label"),text:h("shipped order label")})]}),m&&(0,d.jsx)(y,{csvData:null===t||void 0===t?void 0:t.items,fileName:t.pharmacy.name+"_"+t.warehouse.name+"_"+new Date(t.createdAt).toLocaleDateString()}),b&&(0,d.jsx)(f,{orderDetails:t,close:function(){return g(!1)}}),k&&(0,d.jsx)(v,{header:"deliver order label",msg:"deliver confirm msg",closeModal:function(){return R(!1)},handler:i,withTime:!0}),P&&(0,d.jsx)(v,{header:"shipped order label",msg:"shipped confirm msg",closeModal:function(){return z(!1)},handler:u,withTime:!0}),q&&(0,d.jsx)(v,{header:"confirm order label",msg:"confirm order confirm msg",closeModal:function(){return B(!1)},handler:l}),I&&(0,d.jsx)(s.Z,{header:h("will dont serve label"),closeModal:function(){return M(!1)},small:!0,cancelLabel:"cancel",okLabel:"ok",okModal:function(){n(),M(!1)},children:(0,d.jsx)("p",{children:h("dont serve confirm msg")})})]})}},3275:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Z}});var o=n(5861),a=n(885),r=n(4687),i=n.n(r),l=n(2791),s=n(3168),c=n(9271),d=n(4569),u=n.n(d),f=n(3229),m=n(4917),h=n(2541),p=n(4899),v=n(9761),j=n(1061),x=n(9488),b=n(8785),w=n(6030),g=n(3541),_=n(3666),y=n(3585),L={small_font:"order-details-page_small_font__d2Pm-",table:"order-details-page_table__4qQvk",row:"order-details-page_row__rFeqv",cell:"order-details-page_cell__zUby-",header:"order-details-page_header__hNqeT",body:"order-details-page_body__N-fSf",item_names_cell:"order-details-page_item_names_cell__C5zEM",names_container:"order-details-page_names_container__drJVw"},C=n(3329);var Z=(0,c.EN)((function(e){var t,n=e.location,r=e.onSelectedChange,c=(0,s.$)().t,d=(0,w.I0)(),Z=null===n||void 0===n?void 0:n.search.slice(1),N=(0,w.v9)(g.tT),D=N.token,O=N.user,T=(0,w.v9)(_.ny).status,E=(0,l.useState)(null),k=(0,a.Z)(E,2),R=k[0],S=k[1],A=(0,l.useState)(!0),I=(0,a.Z)(A,2),M=I[0],H=I[1],F=(0,l.useState)(""),q=(0,a.Z)(F,2),B=q[0],U=q[1],G=(0,l.useState)(""),P=(0,a.Z)(G,2),z=P[0],W=P[1],V=(0,l.useState)(""),Y=(0,a.Z)(V,2),$=Y[0],X=Y[1],Q=function(){var e=(0,o.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:U(""),H(!0),u().get("".concat(y.Hc,"/orders/details?id=").concat(Z),{headers:{Authorization:"Bearer ".concat(D)}}).then((function(e){null===e.data.data.order?U("order-deleted"):S(e.data.data.order)})).catch((function(e){U("order-details-error")})),H(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){S(null),Q()};return(0,l.useEffect)((function(){Q(),r(),window.scrollTo(0,0)}),[]),(0,C.jsxs)(C.Fragment,{children:[M?(0,C.jsx)(h.Z,{allowCancel:!1}):(0,C.jsx)(C.Fragment,{children:R?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(j.Z,{title:"order details",refreshHandler:J}),R&&(0,C.jsx)(m.Z,{orderDetails:R,warehouseDontServeHanlder:function(){d((0,_.Cs)({obj:{status:y.zi.WILL_DONT_SERVER,couldNotDeliverDate:Date.now()},id:Z,token:D})).then(b.SI).then((function(){W("change order status success"),J()})).catch((function(){X("change order status failed")}))},devlierHandler:function(e,t){var n=e?new Date(e):new Date,o=t||"";d((0,_.Cs)({obj:{status:y.zi.DELIVERY,deliverDate:n,deliverTime:o},id:Z,token:D})).then(b.SI).then((function(){W("change order status success"),J()})).catch((function(){X("change order status failed")}))},confirmOrderHanlder:function(e){var t=e?new Date(e):new Date;d((0,_.Cs)({obj:{status:y.zi.CONFIRM,confirmDate:t},id:Z,token:D})).then(b.SI).then((function(){W("change order status success"),J()})).catch((function(){X("change order status failed")}))},shippedHandler:function(e,t){var n=e?new Date(e):null,o=t||"";d((0,_.Cs)({obj:{status:y.zi.SHIPPING,shippedDate:n,shippedTime:o},id:Z,token:D})).then(b.SI).then((function(){W("change order status success"),J()})).catch((function(){X("change order status failed")}))},withSaveOption:!0}),(0,C.jsxs)("p",{style:{textAlign:"center",color:y.wL.SUCCEEDED_COLOR,textDecoration:"underline"},children:[(0,C.jsx)("label",{children:c(R.status)}),R.status===y.zi.WILL_DONT_SERVER&&(0,C.jsx)("label",{children:R.couldNotDeliverDate.split("T")[0]}),R.status===y.zi.CONFIRM&&(0,C.jsx)("label",{children:R.confirmDate.split("T")[0]}),R.status===y.zi.DELIVERY&&(0,C.jsxs)("label",{children:[null===(t=R.deliverDate)||void 0===t?void 0:t.split("T")[0]," ",R.deliverTime?"---".concat(c("time-label"),": ").concat(R.deliverTime):""]}),R.status===y.zi.SHIPPING&&(0,C.jsxs)("label",{children:[R.shippedDate?R.shippedDate.split("T")[0]:c("shipped done"),R.shippedTime?"---".concat(c("time-label"),": ").concat(R.shippedTime):""]})]}),(0,C.jsx)(f.Z,{children:R?(0,C.jsxs)("div",{className:L.table,children:[(0,C.jsxs)("div",{className:[L.row,L.header].join(" "),children:[(0,C.jsx)("div",{className:[L.cell,L.names_container].join(" "),children:c("item name")}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:c("quantity")}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:c("offer")}),(O.type===y.Wl.PHARMACY||O.type===y.Wl.ADMIN)&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)("div",{className:[L.cell].join(" "),children:c("points")}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:c("price")}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:c("total")})]})]}),R.items.map((function(e,t){return(0,C.jsxs)("div",{className:[L.row,L.body].join(" "),children:[(0,C.jsx)("div",{className:[L.cell,L.names_container].join(" "),children:(0,C.jsx)("div",{className:L.item_names_cell,children:(0,C.jsx)(p.Z,{flexDirection:"column",item:e.item})})}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:(0,y.uf)(e.qty)}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:(0,y.uf)(e.bonus)}),(O.type===y.Wl.PHARMACY||O.type===y.Wl.ADMIN)&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)("div",{className:[L.cell].join(" "),children:(0,y.uf)(e.points)}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:(0,y.uf)(e.price)}),(0,C.jsx)("div",{className:[L.cell].join(" "),children:(0,y.uf)(e.qty*e.item.price-(e.bonus&&e.bonusType===y.Hg.PERCENTAGE?e.qty*e.item.price*e.bonus/100:0))})]})]},t)}))]}):(0,C.jsx)(v.Z,{msg:c(B)})})]}):(0,C.jsx)(C.Fragment,{})}),"loading"===T&&(0,C.jsx)(h.Z,{allowCancel:!1}),z&&(0,C.jsx)(x.Z,{bgColor:y.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:c(z),actionAfterTimeout:function(){return W("")}}),$&&(0,C.jsx)(x.Z,{bgColor:y.wL.FAILED_COLOR,foreColor:"#fff",toastText:c($),actionAfterTimeout:function(){return X("")}})]})}))},4802:function(e,t,n){var o,a,r;a=[],o=function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function o(e,t,n){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){s(o.response,t,n)},o.onerror=function(){console.error("could not download file")},o.send()}function a(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(o){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n.g&&n.g.global===n.g?n.g:void 0,l=i.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype&&!l?function(e,t,n){var l=i.URL||i.webkitURL,s=document.createElement("a");t=t||e.name||"download",s.download=t,s.rel="noopener","string"==typeof e?(s.href=e,s.origin===location.origin?r(s):a(s.href)?o(e,t,n):r(s,s.target="_blank")):(s.href=l.createObjectURL(e),setTimeout((function(){l.revokeObjectURL(s.href)}),4e4),setTimeout((function(){r(s)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,i){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,i),n);else if(a(e))o(e,n,i);else{var l=document.createElement("a");l.href=e,l.target="_blank",setTimeout((function(){r(l)}))}}:function(e,t,n,a){if((a=a||open("","_blank"))&&(a.document.title=a.document.body.innerText="downloading..."),"string"==typeof e)return o(e,t,n);var r="application/octet-stream"===e.type,s=/constructor/i.test(i.HTMLElement)||i.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||r&&s||l)&&"undefined"!=typeof FileReader){var d=new FileReader;d.onloadend=function(){var e=d.result;e=c?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),a?a.location.href=e:location=e,a=null},d.readAsDataURL(e)}else{var u=i.URL||i.webkitURL,f=u.createObjectURL(e);a?a.location=f:location.href=f,a=null,setTimeout((function(){u.revokeObjectURL(f)}),4e4)}});i.saveAs=s.saveAs=s,e.exports=s},void 0===(r="function"===typeof o?o.apply(t,a):o)||(e.exports=r)},5382:function(){},2095:function(){},1219:function(){}}]);
//# sourceMappingURL=1842.9f50a173.chunk.js.map