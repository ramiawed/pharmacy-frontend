"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[5157,1022],{1061:function(e,n,t){t.d(n,{Z:function(){return d}});t(2791);var s=t(9271),r=t(7500),c=t(2268),i=t(3585),o="header_header__MhatS",a="header_back__wgjRV",l=t(3329);var d=function(e){var n=e.children,t=(0,s.k6)();return(0,l.jsxs)("div",{className:o,children:[n,(0,l.jsx)("div",{className:a,children:(0,l.jsx)(r.Z,{onclick:function(){t.goBack()},icon:function(){return(0,l.jsx)(c.D_,{})},foreColor:i.wL.WHITE_COLOR})})]})}},3575:function(e,n,t){t(2791);var s=t(9942),r=t(3126),c=t(3585),i=t(3329);n.Z=function(e){var n=e.msg;return(0,i.jsxs)("div",{className:[s.Z.no_content_div].join(" "),children:[(0,i.jsx)("img",{src:r,alt:"thumb",style:{width:"150px",height:"150px"}}),(0,i.jsx)("p",{style:{color:c.wL.MAIN_COLOR},children:n})]})}},146:function(e,n,t){t.r(n),t.d(n,{default:function(){return _}});var s=t(885),r=t(2791),c=t(3168),i=t(9271),o=t(6030),a=t(3541),l=t(4618),d=t(6425),u=t(6856),h=t(7425),x=t(1061),f=t(7500),j=t(9942),p=t(3585),k=t(3329);var v=function(e){var n=e.isNew,t=e.setIsNew,s=(0,c.$)().t,r=(0,o.I0)(),i=(0,o.v9)(a.tT),d=i.user,v=i.token;return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(x.Z,{children:(0,k.jsx)("h2",{children:s("nav-baskets")})}),(0,k.jsx)("div",{className:[j.Z.actions,j.Z.margin_v_4].join(" "),children:!n&&(0,k.jsxs)(k.Fragment,{children:[d.type!==p.Wl.PHARMACY&&(0,k.jsx)(f.Z,{selected:!1,foreColor:p.wL.MAIN_COLOR,tooltip:s("new-basket"),onclick:function(){t(!0)},icon:function(){return(0,k.jsx)(u.NcC,{size:24})},withBackground:!0}),(0,k.jsx)(f.Z,{selected:!1,foreColor:p.wL.MAIN_COLOR,tooltip:s("refresh-tooltip"),onclick:function(){r((0,l.lG)()),r((0,l.d1)({token:v}))},icon:function(){return(0,k.jsx)(h.PwW,{})},withBackground:!0})]})})]})},g=t(3565),m=t(3575),_=function(e){var n=e.onSelectedChange,t=(0,c.$)().t,u=(0,o.I0)(),h=((0,o.v9)(d.VY),(0,o.v9)(a.tT)),x=h.user,f=h.token,_=(0,o.v9)(l.Vk),w=_.status,N=_.baskets,Z=_.count,b=(_.error,(0,r.useState)(!1)),C=(0,s.Z)(b,2),A=C[0],I=C[1],y=function(){u((0,l.d1)({token:f}))};return(0,r.useEffect)((function(){return 0===N.length&&y(),window.scrollTo(0,0),n(),function(){(0,l.iX)()}}),[]),x.type===p.Wl.ADMIN||x.type===p.Wl.PHARMACY||x.type===p.Wl.WAREHOUSE?(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(v,{isNew:A,setIsNew:I}),Z>0&&!A&&(0,k.jsxs)("div",{className:j.Z.count,children:[(0,k.jsx)("span",{className:j.Z.label,children:t("baskets-count")}),(0,k.jsx)("span",{className:j.Z.count,children:Z})]}),0===Z&&"loading"!==w&&!A&&(0,k.jsx)(k.Fragment,{children:(0,k.jsx)(m.Z,{msg:t("no-basket-to-order")})}),(0,k.jsx)("div",{className:j.Z.container_with_header,children:(0,k.jsx)("div",{style:{paddingInline:"10px",paddingLeft:"10px",paddingRight:"10px"},children:A?(0,k.jsx)(g.Z,{setIsNew:I,editable:!0}):N.map((function(e){return(0,k.jsx)(g.Z,{basket:e,editable:x.type!==p.Wl.PHARMACY},e._id)}))})})]}):(0,k.jsx)(i.l_,{to:"/"})}},3126:function(e,n,t){e.exports=t.p+"static/media/no-content.577bb836915173c305ce.jpeg"}}]);
//# sourceMappingURL=5157.4b6b2628.chunk.js.map