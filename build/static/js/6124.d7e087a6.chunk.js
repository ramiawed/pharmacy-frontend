"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[6124],{1061:function(e,n,t){t.d(n,{Z:function(){return d}});t(2791);var s=t(9271),c=t(7500),a=t(4373),i=t(3585),r="header_header__MhatS",l="header_back__wgjRV",o=t(3329);var d=function(e){var n=e.children,t=(0,s.k6)();return(0,o.jsxs)("div",{className:r,children:[n,(0,o.jsx)("div",{className:l,children:(0,o.jsx)(c.Z,{onclick:function(){t.goBack()},icon:function(){return(0,o.jsx)(a.D_,{})},foreColor:i.wL.WHITE_COLOR})})]})}},3566:function(e,n,t){t.d(n,{Z:function(){return o}});t(2791);var s=t(3168),c=t(1968),a=t.n(c),i=t(3585),r="loader_loader__qZv+U",l=t(3329);var o=function(e){var n=e.color,t=(0,s.$)().t;return(0,l.jsxs)("div",{className:r,style:{color:n||i.wL.SECONDARY_COLOR},children:[(0,l.jsx)(a(),{type:"bars",height:75,width:75,color:n||i.wL.SECONDARY_COLOR}),(0,l.jsx)("p",{children:t("loading-data")})]})}},3575:function(e,n,t){t(2791);var s=t(9942),c=t(3126),a=t(3585),i=t(3329);n.Z=function(e){var n=e.msg;return(0,i.jsxs)("div",{className:[s.Z.no_content_div].join(" "),children:[(0,i.jsx)("img",{src:c,alt:"thumb",style:{width:"150px",height:"150px"}}),(0,i.jsx)("p",{style:{color:a.wL.MAIN_COLOR},children:n})]})}},6124:function(e,n,t){t.r(n),t.d(n,{default:function(){return W}});var s=t(885),c=t(2791),a=t(3168),i=t(6030),r=t(2200),l=t(3541),o=t(7425),d=t(6856),u=t(7500),m=t(1061),h=t(9942),x=t(3585),f=t(3329);var _=function(e){var n=e.isNew,t=e.setIsNew,s=(0,a.$)().t,c=(0,i.I0)(),_=(0,i.v9)(l.rK),j=function(){c((0,r.cC)({token:_}))};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(m.Z,{children:[(0,f.jsx)("h2",{children:s("nav-advertise")}),n&&(0,f.jsx)("div",{className:h.Z.refresh_icon,children:(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.WHITE_COLOR,tooltip:s("refresh-tooltip"),onclick:function(){j()},icon:function(){return(0,f.jsx)(o.PwW,{})}})})]}),(0,f.jsx)("div",{className:[h.Z.actions,h.Z.margin_v_4].join(" "),children:!n&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.MAIN_COLOR,tooltip:s("new-advertisement"),onclick:function(){t(!0)},icon:function(){return(0,f.jsx)(d.NcC,{size:20})},withBackground:!0}),(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.MAIN_COLOR,tooltip:s("refresh-tooltip"),onclick:function(){j()},icon:function(){return(0,f.jsx)(o.PwW,{})},withBackground:!0})]})})]})},j=t(1176),v=t(2982),p=t(4569),C=t.n(p),g=t(8489),w=t(3575),L=t(3566),Z=t(4373),O=t(6053),N={small_font:"select-partner-modal_small_font__Kp3oN",search_container:"select-partner-modal_search_container__X5Syf",search_input:"select-partner-modal_search_input__IVAlg",company_row:"select-partner-modal_company_row__BKU0e"};var E=function(e){var n=e.data,t=e.select;return(0,f.jsxs)("div",{className:N.company_row,children:[(0,f.jsx)("p",{className:N.company_name,children:n.name}),(0,f.jsx)(u.Z,{icon:function(){return(0,f.jsx)(O.PgY,{})},foreColor:x.wL.SUCCEEDED_COLOR,onclick:function(){t(n)}})]})},k=function(e){var n=e.close,t=e.chooseAction,r=e.url,o=e.header,d=(0,a.$)().t,u=(0,i.v9)(l.rK),m=(0,c.useState)(""),_=(0,s.Z)(m,2),p=_[0],O=_[1],k=(0,c.useState)([]),R=(0,s.Z)(k,2),b=R[0],y=R[1],S=(0,c.useState)(!1),D=(0,s.Z)(S,2),A=D[0],I=D[1],F=(0,c.useState)(1),z=(0,s.Z)(F,2),U=z[0],T=z[1],K=(0,c.useState)(0),Y=(0,s.Z)(K,2),B=Y[0],P=Y[1],M=(0,c.useCallback)((function(e){try{I(!0);var n="";p.trim().length>0&&(n="&name=".concat(p.trim())),C().get("".concat(r,"&page=").concat(e).concat(n),{headers:{Authorization:"Bearer ".concat(u)}}).then((function(n){y(1===e?n.data.data.users:[].concat((0,v.Z)(b),(0,v.Z)(n.data.data.users))),P(n.data.count),I(!1),T(e+1)}))}catch(t){}}),[b,p,u,r]),$=function(e){t(e),n()};return(0,c.useEffect)((function(){M(1)}),[]),(0,f.jsx)(g.Z,{header:d(o),cancelLabel:"cancel-label",closeModal:n,small:!0,children:A?(0,f.jsx)(L.Z,{}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:[N.search_container,h.Z.flex_center_container].join(" "),children:[(0,f.jsx)(Z.FKI,{color:x.wL.SECONDARY_COLOR,size:24}),(0,f.jsx)("input",{className:N.search_input,placeholder:d("enter-company-name"),value:p,onChange:function(e){return O(e.target.value)},onKeyDown:function(e){"Enter"===e.code&&M(1),"Escape"!==e.code&&e.stopPropagation()}}),(0,f.jsx)(j.Z,{text:"search",action:function(){M(1)},bgColor:x.wL.SECONDARY_COLOR})]}),(0,f.jsxs)("div",{style:{maxHeight:"300px",overflow:"auto"},children:[(null===b||void 0===b?void 0:b.length)>0&&b.map((function(e){return(0,f.jsx)(E,{data:e,select:$},e._id)})),0===b.length&&0===p.length&&(0,f.jsx)(w.Z,{msg:d("search-for-company")}),0===b.length&&0!==p.length&&(0,f.jsx)(w.Z,{msg:d("search-empty")})]}),b.length<B&&(0,f.jsx)("div",{className:h.Z.padding_v_6,children:(0,f.jsx)(j.Z,{text:"more",action:function(){M(U)},bgColor:x.wL.SECONDARY_COLOR})})]})})},R=t(5861),b=t(7757),y=t.n(b),S={small_font:"select-medicine-modal_small_font__g7TUb",search_container:"select-medicine-modal_search_container__pdObl",search_input:"select-medicine-modal_search_input__+nLqw",item_row:"select-medicine-modal_item_row__4Do0R",item_name:"select-medicine-modal_item_name__CFbG1",small:"select-medicine-modal_small__ID-Uy"};var D=function(e){var n=e.data,t=e.select;return(0,f.jsxs)("div",{className:S.item_row,children:[(0,f.jsx)("p",{className:S.item_name,children:n.name}),(0,f.jsx)("p",{className:[S.small].join(" "),children:n.caliber}),(0,f.jsx)("p",{className:[S.small].join(" "),children:n.packing}),(0,f.jsx)(u.Z,{icon:function(){return(0,f.jsx)(O.PgY,{})},foreColor:x.wL.SUCCEEDED_COLOR,onclick:function(){t(n)}})]})},A=function(e){var n=e.close,t=e.chooseAction,r=e.url,o=(0,a.$)().t,d=(0,i.v9)(l.rK),u=(0,c.useState)(""),m=(0,s.Z)(u,2),_=m[0],p=m[1],O=(0,c.useState)([]),N=(0,s.Z)(O,2),E=N[0],k=N[1],b=(0,c.useState)(!1),A=(0,s.Z)(b,2),I=A[0],F=A[1],z=(0,c.useState)(1),U=(0,s.Z)(z,2),T=U[0],K=U[1],Y=(0,c.useState)(0),B=(0,s.Z)(Y,2),P=B[0],M=B[1],$=(0,c.useCallback)(function(){var e=(0,R.Z)(y().mark((function e(n){var t,s;return y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,F(!0),t="",_.trim().length>0&&(t="&itemName=".concat(_.trim())),e.next=6,C().get("".concat(r,"&page=").concat(n).concat(t),{headers:{Authorization:"Bearer ".concat(d)}});case 6:s=e.sent,k(1===n?s.data.data.items:[].concat((0,v.Z)(E),(0,v.Z)(s.data.data.items))),M(s.data.count),F(!1),K(n+1),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(n){return e.apply(this,arguments)}}(),[E,_,d,r]),H=function(e){t(e),n()};return(0,c.useEffect)((function(){$(1)}),[]),(0,f.jsx)(g.Z,{header:"choose-item",cancelLabel:"cancel-label",closeModal:n,small:!0,children:I?(0,f.jsx)(L.Z,{}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:[S.search_container,h.Z.flex_center_container].join(" "),children:[(0,f.jsx)(Z.FKI,{color:x.wL.SECONDARY_COLOR,size:24}),(0,f.jsx)("input",{className:S.search_input,placeholder:o("enter-item-trade-name"),value:_,onChange:function(e){return p(e.target.value)},onKeyDown:function(e){"Enter"===e.code&&$(1),"Escape"!==e.code&&e.stopPropagation()}}),(0,f.jsx)(j.Z,{text:"search",action:function(){$(1)},bgColor:x.wL.SECONDARY_COLOR})]}),(0,f.jsxs)("div",{style:{maxHeight:"300px",overflow:"auto"},children:[(null===E||void 0===E?void 0:E.length)>0&&E.map((function(e){return(0,f.jsx)(D,{data:e,select:H},e._id)})),0===E.length&&0===_.length&&(0,f.jsx)(w.Z,{msg:o("search-for-item")}),0===E.length&&0!==_.length&&(0,f.jsx)(w.Z,{msg:o("search-empty")})]}),E.length<P&&(0,f.jsx)("div",{className:h.Z.padding_v_6,children:(0,f.jsx)(j.Z,{text:"more",action:function(){$(T)},bgColor:x.wL.SECONDARY_COLOR})})]})})},I=t(9488),F=t(7692),z="new-advertisement_new_advertisement_div__2EKiP",U="new-advertisement_content__-qzdA",T="new-advertisement_links_container__1Oxgf",K="new-advertisement_img__9D4pP",Y="new-advertisement_image__uUaUy",B="new-advertisement_actions__-gfB1",P="new-advertisement_links__2xT1r",M="new-advertisement_delete__q6nXX",$="new-advertisement_row__O0lWG";var H=function(e){var n=e.isNew,t=e.setIsNew,m=(0,a.$)().t,h=(0,c.useRef)(null),_=(0,i.I0)(),v=(0,i.v9)(l.tT).token,p=(0,c.useState)(null),C=(0,s.Z)(p,2),g=C[0],w=C[1],L=(0,c.useState)(null),Z=(0,s.Z)(L,2),O=Z[0],N=Z[1],E=(0,c.useState)(null),R=(0,s.Z)(E,2),b=R[0],y=R[1],S=(0,c.useState)(null),D=(0,s.Z)(S,2),T=D[0],M=D[1],H=(0,c.useState)(!1),X=(0,s.Z)(H,2),q=X[0],W=X[1],G=(0,c.useState)(!1),V=(0,s.Z)(G,2),J=V[0],Q=V[1],ee=(0,c.useState)(!1),ne=(0,s.Z)(ee,2),te=ne[0],se=ne[1],ce=(0,c.useState)(""),ae=(0,s.Z)(ce,2),ie=ae[0],re=ae[1],le=function(){h.current.click()};return(0,f.jsxs)("div",{children:[n&&(0,f.jsxs)("div",{className:z,style:{marginBottom:"10px"},children:[(0,f.jsxs)("div",{className:U,children:[(0,f.jsxs)("div",{className:P,children:[(0,f.jsxs)("div",{className:$,children:[(0,f.jsxs)("label",{children:[m("company"),":"]}),null===g?(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.SUCCEEDED_COLOR,onclick:function(){W(!0)},icon:function(){return(0,f.jsx)(d.NcC,{size:24})}}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("p",{children:g.name}),(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.FAILED_COLOR,onclick:function(){w(null)},icon:function(){return(0,f.jsx)(o.w6k,{size:24})}})]})]}),(0,f.jsxs)("div",{className:$,children:[(0,f.jsxs)("label",{children:[m("warehouse"),":"]}),null===O?(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.SUCCEEDED_COLOR,onclick:function(){Q(!0)},icon:function(){return(0,f.jsx)(d.NcC,{size:24})}}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("p",{children:O.name}),(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.FAILED_COLOR,onclick:function(){N(null)},icon:function(){return(0,f.jsx)(o.w6k,{size:24})}})]})]}),(0,f.jsxs)("div",{className:$,children:[(0,f.jsxs)("label",{children:[m("single-item"),":"]}),null===b?(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.SUCCEEDED_COLOR,onclick:function(){se(!0)},icon:function(){return(0,f.jsx)(d.NcC,{size:24})}}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("p",{children:b.name}),(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.FAILED_COLOR,onclick:function(){y(null)},icon:function(){return(0,f.jsx)(o.w6k,{size:24})}})]})]}),(0,f.jsxs)("div",{className:$,children:[(0,f.jsxs)("label",{children:[m("image-label"),":"]}),null===T?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(u.Z,{selected:!1,foreColor:x.wL.SUCCEEDED_COLOR,onclick:le,icon:function(){return(0,f.jsx)(d.NcC,{size:24})}}),(0,f.jsx)("div",{style:{display:"none"},children:(0,f.jsx)("form",{encType:"multipart/form-data",children:(0,f.jsx)("div",{children:(0,f.jsx)("input",{multiple:!1,accept:"image/*",ref:h,type:"file",onChange:function(e){e.target.files&&e.target.files.length>0&&M(e.target.files[0])},style:{display:"none"}})})})})]}):(0,f.jsx)(u.Z,{icon:function(){return(0,f.jsx)(o.w6k,{size:24})},selected:!1,foreColor:x.wL.FAILED_COLOR,onclick:function(){return M(null)}})]})]}),(0,f.jsx)("div",{className:K,children:T?(0,f.jsx)("img",{src:URL.createObjectURL(T),className:Y,alt:"Thumb"}):(0,f.jsx)("div",{children:(0,f.jsx)(F.ntj,{size:128,color:x.wL.SECONDARY_COLOR,onClick:le,style:{cursor:"pointer"}})})})]}),(0,f.jsxs)("div",{className:B,children:[(0,f.jsx)(j.Z,{action:function(){if(T){if(T){var e=new FormData;e.append("file",T),e.append("company",g?g._id:null),e.append("warehouse",O?O._id:null),e.append("medicine",b?b._id:null),_((0,r.Xi)({data:e,token:v}))}}else re("choose-image-msg")},text:m("add-label"),bgColor:x.wL.SUCCEEDED_COLOR}),(0,f.jsx)(j.Z,{action:function(){t(!1),w(null),N(null),y(null),M(null)},text:m("cancel-label"),bgColor:x.wL.FAILED_COLOR})]})]}),ie&&(0,f.jsx)(I.Z,{bgColor:x.wL.FAILED_COLOR,foreColor:"#fff",toastText:m(ie),actionAfterTimeout:function(){re("")}}),q&&(0,f.jsx)(k,{header:"choose-company",close:function(){return W(!1)},chooseAction:function(e){return function(e){w(e),N(null),y(null)}(e)},url:"".concat(x.Hc,"/users?limit=15&isActive=true&isApproved=true&type=company")}),J&&(0,f.jsx)(k,{header:"choose-warehouse",close:function(){return Q(!1)},chooseAction:function(e){return function(e){N(e),w(null),y(null)}(e)},url:"".concat(x.Hc,"/users?limit=15&isActive=true&isApproved=true&type=warehouse")}),te&&(0,f.jsx)(A,{close:function(){return se(!1)},chooseAction:function(e){return function(e){y(e),N(null),w(null)}(e)},url:"".concat(x.Hc,"/items?limit=15&isActive=true")})]})},X=t(2541);var q=function(e){var n,t,d,u=e.advertisement,m=(0,a.$)().t,h=(0,i.I0)(),_=(0,i.v9)(l.rK),j=(0,c.useState)(!1),v=(0,s.Z)(j,2),p=v[0],C=v[1];return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:z,children:(0,f.jsxs)("div",{className:U,children:[(0,f.jsx)("div",{className:P,children:(0,f.jsxs)("div",{className:T,children:[u.company&&(0,f.jsxs)("div",{className:$,children:[(0,f.jsxs)("label",{children:[m("company"),":"]}),(0,f.jsx)("p",{children:null===(n=u.company)||void 0===n?void 0:n.name})]}),u.warehouse&&(0,f.jsxs)("div",{className:$,children:[(0,f.jsxs)("label",{children:[m("warehouse"),":"]}),(0,f.jsx)("p",{children:null===(t=u.warehouse)||void 0===t?void 0:t.name})]}),u.medicine&&(0,f.jsxs)("div",{className:$,children:[(0,f.jsxs)("label",{children:[m("item-name"),":"]}),(0,f.jsx)("p",{children:null===(d=u.medicine)||void 0===d?void 0:d.name})]}),(0,f.jsx)("div",{className:M,onClick:function(){C(!0)},children:(0,f.jsx)(o.w6k,{})})]})}),(0,f.jsx)("div",{className:K,children:(0,f.jsx)("img",{src:"".concat(x.LB,"/advertisements/").concat(u.logo_url),className:Y,alt:"Thumb"})})]})}),p&&(0,f.jsx)(g.Z,{header:"delete-advertisement",cancelLabel:"close-label",okLabel:"ok-label",closeModal:function(){C(!1)},small:!0,okModal:function(){C(!1),h((0,r.Xx)({id:u._id,token:_}))},color:x.wL.FAILED_COLOR,children:(0,f.jsx)("p",{children:m("delete-advertisement-confirm-msg")})})]})};var W=function(e){var n=e.onSelectedChange,t=(0,a.$)().t,l=(0,i.I0)(),o=(0,i.v9)(r.RP),d=o.status,u=o.error,m=o.advertisements,j=(0,c.useState)(!1),v=(0,s.Z)(j,2),p=v[0],C=v[1];return(0,c.useEffect)((function(){window.scrollTo(0,0),n()}),[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(_,{isNew:p,setIsNew:C}),(0,f.jsxs)("div",{className:h.Z.container_with_header,children:[(0,f.jsx)(H,{isNew:p,setIsNew:C}),0===m.length&&!p&&(0,f.jsx)(w.Z,{}),m.map((function(e){return(0,f.jsx)(q,{advertisement:e},e._id)}))]}),"loading"===d&&(0,f.jsx)(X.Z,{allowCancel:!0,onclick:function(){(0,r.iX)()}}),u&&(0,f.jsx)(I.Z,{bgColor:x.wL.FAILED_COLOR,foreColor:"#fff",toastText:t(u),actionAfterTimeout:function(){return l((0,r.q$)())}})]})}},3126:function(e,n,t){e.exports=t.p+"static/media/no-content.577bb836915173c305ce.jpeg"}}]);
//# sourceMappingURL=6124.d7e087a6.chunk.js.map