(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[3301],{8845:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var a=t(885),r=t(2791),o=t(9126),s={small_font:"card-info_small_font__AusTH",card:"card-info_card__VcLb9",header:"card-info_header__uTcny",expanded:"card-info_expanded__IDH-A",warning:"card-info_warning__bmiK1"},i=t(3329);var c=function(e){var n=e.headerTitle,t=e.children,c=e.type,l=(0,r.useState)(!0),d=(0,a.Z)(l,2),u=d[0],f=d[1];return(0,i.jsxs)("div",{className:[s.card,"warning"===c?s.warning:null].join(" "),children:[(0,i.jsxs)("div",{onClick:function(){return f(!u)},className:[s.header,"warning"===c?s.warning:null,u?s.expanded:null].join(" "),children:[(0,i.jsx)("p",{children:n}),(0,i.jsx)("label",{className:s.header_label,onClick:function(){return f(!u)},children:u?(0,i.jsx)(o.jnn,{}):(0,i.jsx)(o.F0C,{})})]}),u&&(0,i.jsx)("div",{children:t})]})}},7096:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return M}});var a=t(5861),r=t(885),o=t(7757),s=t.n(o),i=t(2791),c=t(3168),l=t(9271),d=t(4569),u=t.n(d),f=t(7425),m=t(9126),p=t(6856),h=t(2541),v=t(3575),x=t(7500),j=t(1061),w=t(6181),b=t(8845),g=t(2982),_=t(4942),y=t(4802),E=t(8484),C=t(3585),Z=t(3329),k=function(e){var n=0;return e.forEach((function(e){n=n+e.qty*e.item.price-(e.bonus&&e.bonusType===C.Hg.PERCENTAGE?e.qty*e.item.price*e.bonus/100:0)})),n},N=function(e){var n=e.csvData,t=e.fileName,a=(0,c.$)().t;return(0,Z.jsx)(x.Z,{selected:!1,foreColor:C.wL.GREY_COLOR,tooltip:a("save-order"),icon:function(){return(0,Z.jsx)(f.Qup,{})},onclick:function(e){return function(e,n){var t,r=e.map((function(e){var n;return n={},(0,_.Z)(n,"\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062a\u062d\u0627\u0631\u064a",e.item.name),(0,_.Z)(n,"\u0627\u0644\u0634\u0631\u0643\u0629",e.item.company.name),(0,_.Z)(n,"\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a",e.item.formula),(0,_.Z)(n,"\u0627\u0644\u0639\u064a\u0627\u0631",e.item.caliber),(0,_.Z)(n,"\u0627\u0644\u062a\u0639\u0628\u0626\u0629",e.item.packing),(0,_.Z)(n,"\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a",e.item.price),(0,_.Z)(n,"\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0639\u0645\u0648\u0645",e.item.customer_price),(0,_.Z)(n,"\u0627\u0644\u0643\u0645\u064a\u0629",e.qty),(0,_.Z)(n,"\u0627\u0644\u0639\u0631\u0636",e.bonus?e.bonus+(e.bonus?e.bonusType===C.Hg.PERCENTAGE?a("after-bonus-percentage-label"):a("after-quantity-label"):""):""),(0,_.Z)(n,"\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0627\u062c\u0645\u0627\u0644\u064a",e.qty*e.item.price-(e.bonus&&e.bonusType===C.Hg.PERCENTAGE?e.qty*e.item.price*e.bonus/100:0)),n}));r=[].concat((0,g.Z)(r),[(t={},(0,_.Z)(t,"\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062a\u062d\u0627\u0631\u064a",""),(0,_.Z)(t,"\u0627\u0644\u0634\u0631\u0643\u0629",""),(0,_.Z)(t,"\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a",""),(0,_.Z)(t,"\u0627\u0644\u0639\u064a\u0627\u0631",""),(0,_.Z)(t,"\u0627\u0644\u062a\u0639\u0628\u0626\u0629",""),(0,_.Z)(t,"\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0635\u064a\u062f\u0644\u0627\u0646\u064a",""),(0,_.Z)(t,"\u0627\u0644\u0633\u0639\u0631 \u0644\u0644\u0639\u0645\u0648\u0645",""),(0,_.Z)(t,"\u0627\u0644\u0643\u0645\u064a\u0629",""),(0,_.Z)(t,"\u0627\u0644\u0639\u0631\u0636",""),(0,_.Z)(t,"\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0627\u062c\u0645\u0627\u0644\u064a",k(e)),t)]);var o={Sheets:{data:E.utils.json_to_sheet(r)},SheetNames:["data"]},s=E.write(o,{bookType:"xlsx",type:"array"}),i=new Blob([s],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});y.saveAs(i,n+".xlsx")}(n,t)},withBackground:!0})},L=t(6030),R=t(3541),A=t(3666),O=t(9942),S="order-details-page_container__OB3bm",T="order-details-page_basic_details_container__PVdB9",D="order-details-page_row__rFeqv",H="order-details-page_label__D6gx8",B="order-details-page_name__4KXeS",U="order-details-page_actions_div__iMBlV";var M=(0,l.EN)((function(e){var n=e.location,t=e.onSelectedChange,o=(0,c.$)().t,l=null===n||void 0===n?void 0:n.search.slice(1),d=(0,L.I0)(),g=(0,L.v9)(R.tT),_=g.token,y=g.user,E=(0,L.v9)(A.ny).status,k=(0,i.useState)(null),M=(0,r.Z)(k,2),q=M[0],F=M[1],P=(0,i.useState)(!0),W=(0,r.Z)(P,2),G=W[0],I=W[1],Y=(0,i.useState)(""),K=(0,r.Z)(Y,2),Q=K[0],V=K[1],X=function(e){var n=[l];if(n.length>0){var t={};y.type===C.Wl.PHARMACY&&(t={pharmacyStatus:e}),y.type===C.Wl.WAREHOUSE&&(t={warehouseStatus:e}),d((0,A.PT)({obj:{ids:n,body:t},token:_}))}},$=function(){var e=(0,a.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:V(""),I(!0),u().get("".concat(C.Hc,"/orders/details?id=").concat(l),{headers:{Authorization:"Bearer ".concat(_)}}).then((function(e){null===e.data.data.order?V("order-deleted"):F(e.data.data.order)})).catch((function(e){V("order-details-error")})),I(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){$(),t()}),[]),(0,Z.jsxs)(Z.Fragment,{children:[G?(0,Z.jsx)(h.Z,{allowCancel:!1}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(j.Z,{children:[(0,Z.jsx)("h2",{children:o("order-details")}),(0,Z.jsx)("div",{className:O.Z.refresh_icon,children:(0,Z.jsx)(x.Z,{icon:function(){return(0,Z.jsx)(f.PwW,{color:C.wL.WHITE_COLOR})},foreColor:C.wL.SECONDARY_COLOR,tooltip:o("refresh-tooltip"),onclick:$})})]}),(0,Z.jsx)("div",{className:O.Z.container_with_header,children:q?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("div",{className:S,children:(0,Z.jsxs)(b.Z,{headerTitle:o("order-details"),children:[(0,Z.jsxs)("div",{className:T,children:[(0,Z.jsxs)("div",{className:D,children:[(0,Z.jsxs)("label",{className:H,children:[o("pharmacy-name"),":"," "]}),(0,Z.jsx)("label",{className:B,children:q.pharmacy.name})]}),(0,Z.jsxs)("div",{className:D,children:[(0,Z.jsxs)("label",{className:H,children:[o("user-address-details"),":"," "]}),(0,Z.jsx)("label",{className:B,children:q.pharmacy.addressDetails})]}),(0,Z.jsxs)("div",{className:D,children:[(0,Z.jsxs)("label",{className:H,children:[o("user-mobile"),":"," "]}),(0,Z.jsx)("label",{className:B,children:q.pharmacy.mobile})]}),(0,Z.jsxs)("div",{className:D,children:[(0,Z.jsxs)("label",{className:H,children:[o("warehouse-name"),":"," "]}),(0,Z.jsx)("label",{className:B,children:q.warehouse.name})]}),(0,Z.jsxs)("div",{className:D,children:[(0,Z.jsxs)("label",{className:H,children:[o("date-label"),":"," "]}),(0,Z.jsx)("label",{className:B,children:new Date(q.createdAt).toLocaleDateString()})]}),(0,Z.jsxs)("div",{className:D,children:[(0,Z.jsxs)("label",{className:H,children:[o("total-invoice-price"),":"," "]}),(0,Z.jsx)("label",{className:B,children:function(){var e=0;return q.items.forEach((function(n){e=e+n.qty*n.price-(n.bonus&&n.bonusType===C.Hg.PERCENTAGE?n.qty*n.price*n.bonus/100:0)})),e}()})]})]}),(0,Z.jsxs)("div",{className:U,children:[y.type===C.Wl.PHARMACY&&(0,Z.jsx)(x.Z,{selected:!1,foreColor:C.wL.SUCCEEDED_COLOR,tooltip:o("mark-as-received"),icon:function(){return(0,Z.jsx)(m.fC0,{})},onclick:function(){return X("received")},withBackground:!0}),y.type===C.Wl.PHARMACY&&(0,Z.jsx)(x.Z,{selected:!1,foreColor:C.wL.SUCCEEDED_COLOR,tooltip:o("mark-as-sent"),icon:function(){return(0,Z.jsx)(f.OIQ,{})},onclick:function(){return X("sent")},withBackground:!0}),y.type===C.Wl.WAREHOUSE&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(x.Z,{selected:!1,foreColor:C.wL.SUCCEEDED_COLOR,tooltip:o("mark-as-shipped"),icon:function(){return(0,Z.jsx)(p.tR_,{})},onclick:function(){return X("sent")},withBackground:!0}),(0,Z.jsx)(x.Z,{selected:!1,foreColor:C.wL.SUCCEEDED_COLOR,tooltip:o("mark-as-received"),icon:function(){return(0,Z.jsx)(m.fC0,{})},onclick:function(){return X("received")},withBackground:!0}),(0,Z.jsx)(x.Z,{selected:!1,foreColor:C.wL.FAILED_COLOR,tooltip:o("mark-as-will-dont-server"),icon:function(){return(0,Z.jsx)(p.ngl,{})},onclick:function(){return X("dontServe")},withBackground:!0})]}),(0,Z.jsx)(N,{csvData:q.items,fileName:q.pharmacy.name+"_"+q.warehouse.name+"_"+new Date(q.createdAt).toLocaleDateString()})]})]})}),q.items.map((function(e,n){return(0,Z.jsx)(w.Z,{cartItem:e,withoutMaxQty:"without",inOrderDetails:!0},n)}))]}):(0,Z.jsx)(v.Z,{msg:o(Q)})})]}),"loading"===E&&(0,Z.jsx)(h.Z,{allowCancel:!1})]})}))},4802:function(e,n,t){var a,r,o;r=[],a=function(){"use strict";function n(e,n){return"undefined"==typeof n?n={autoBom:!1}:"object"!=typeof n&&(console.warn("Deprecated: Expected third argument to be a object"),n={autoBom:!n}),n.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function a(e,n,t){var a=new XMLHttpRequest;a.open("GET",e),a.responseType="blob",a.onload=function(){c(a.response,n,t)},a.onerror=function(){console.error("could not download file")},a.send()}function r(e){var n=new XMLHttpRequest;n.open("HEAD",e,!1);try{n.send()}catch(e){}return 200<=n.status&&299>=n.status}function o(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(a){var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}var s="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof t.g&&t.g.global===t.g?t.g:void 0,i=s.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),c=s.saveAs||("object"!=typeof window||window!==s?function(){}:"download"in HTMLAnchorElement.prototype&&!i?function(e,n,t){var i=s.URL||s.webkitURL,c=document.createElement("a");n=n||e.name||"download",c.download=n,c.rel="noopener","string"==typeof e?(c.href=e,c.origin===location.origin?o(c):r(c.href)?a(e,n,t):o(c,c.target="_blank")):(c.href=i.createObjectURL(e),setTimeout((function(){i.revokeObjectURL(c.href)}),4e4),setTimeout((function(){o(c)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,t,s){if(t=t||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(n(e,s),t);else if(r(e))a(e,t,s);else{var i=document.createElement("a");i.href=e,i.target="_blank",setTimeout((function(){o(i)}))}}:function(e,n,t,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof e)return a(e,n,t);var o="application/octet-stream"===e.type,c=/constructor/i.test(s.HTMLElement)||s.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||o&&c||i)&&"undefined"!=typeof FileReader){var d=new FileReader;d.onloadend=function(){var e=d.result;e=l?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},d.readAsDataURL(e)}else{var u=s.URL||s.webkitURL,f=u.createObjectURL(e);r?r.location=f:location.href=f,r=null,setTimeout((function(){u.revokeObjectURL(f)}),4e4)}});s.saveAs=c.saveAs=c,e.exports=c},void 0===(o="function"===typeof a?a.apply(n,r):a)||(e.exports=o)},5382:function(){},2095:function(){},1219:function(){}}]);
//# sourceMappingURL=3301.f0dc26be.chunk.js.map