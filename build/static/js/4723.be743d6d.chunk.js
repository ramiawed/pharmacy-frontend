"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[4723],{553:function(n,e,t){t.d(e,{Z:function(){return C}});var o=t(885),r=t(2791),i=t(3168),a=t(9271),c=t(1221),s=t(1176),l=t(8820),d=t(4651),u=t(8785),_=t(6030),h=t(6201),p=t(3541),f=t(3994),m=t(6425),x=t(6481),j=t(6523),g=(t(8218),t(9942)),v={small_font:"partner-card_small_font__B6atq",partner_container:"partner-card_partner_container__VB59l",full_width:"partner-card_full_width__CUiS6",partner_logo:"partner-card_partner_logo__zh12g",partner_name:"partner-card_partner_name__jXB4j",from_top:"partner-card_from_top__OssbS",name:"partner-card_name__xgWNa"},Z=t(3585),y=t(3329);var C=function(n){var e,t=n.partner,C=n.fullWidth,k=(0,i.$)().t,N=(0,a.k6)(),w=(0,_.I0)(),O=(0,_.v9)(x.vi).settings.showWarehouseItem,b=(0,_.v9)(m.VY),L=(0,_.v9)(h.oT),E=(0,_.v9)(h.GI),A=(0,_.v9)(p.tT),R=A.token,W=A.user,S=(0,r.useState)(!1),H=(0,o.Z)(S,2),I=H[0],U=H[1],T=W.type===Z.Wl.ADMIN||t.type===Z.Wl.COMPANY||t.type===Z.Wl.WAREHOUSE&&O&&t.allowShowingMedicines;return(0,y.jsxs)("div",{className:[v.partner_container,C?v.full_width:""].join(" "),children:[(0,y.jsx)("p",{className:v.partner_name,children:t.name}),(null===(e=t.logo_url)||void 0===e?void 0:e.length)>0?(0,y.jsx)("img",{src:"".concat(Z.LB,"/profiles/").concat(t.logo_url),className:v.partner_logo,alt:"thumb"}):(0,y.jsx)("img",{src:c,className:v.partner_logo,alt:"thumb"}),(0,y.jsxs)("div",{className:v.from_top,children:[""===E?I?(0,y.jsx)("div",{className:[g.Z.icon,g.Z.fc_yellow].join(" "),children:(0,y.jsx)(d.H_P,{className:g.Z.loading,size:20})}):(0,y.jsx)("div",{className:[g.Z.icon,g.Z.fc_yellow].join(" "),children:L&&L.map((function(n){return n._id})).includes(t._id)?(0,y.jsx)(l.pHD,{size:24,onClick:function(){b?(U(!0),w((0,h.Ni)({obj:{favoriteId:t._id},token:R})).then(u.SI).then((function(){I(!1)})).catch((function(){return U(!1)}))):w((0,m.Rb)())}}):(0,y.jsx)(l.y5j,{size:24,onClick:function(){b?(U(!0),w((0,h.a3)({obj:{favoriteId:t._id},token:R})).then(u.SI).then((function(){U(!1),w((0,f.F$)({obj:{sourceUser:W._id,targetUser:t._id,action:"user-added-to-favorite"},token:R}))})).catch((function(){U(!1)}))):w((0,m.Rb)())}})}):null,(t.type===Z.Wl.COMPANY||t.type===Z.Wl.WAREHOUSE&&W.type!==Z.Wl.WAREHOUSE)&&(0,y.jsx)("div",{children:(0,y.jsx)(s.Z,{action:function(){(t.type!==Z.Wl.WAREHOUSE||W.type!==Z.Wl.WAREHOUSE&&W.type!==Z.Wl.COMPANY&&W.type!==Z.Wl.GUEST)&&T&&(W.type===Z.Wl.PHARMACY&&w((0,f.F$)({obj:{sourceUser:W._id,targetUser:t._id,action:"choose-company"},token:R})),w((0,j.Pl)()),t.type===Z.Wl.COMPANY&&w((0,j.HN)(t.name)),t.type===Z.Wl.WAREHOUSE&&w((0,j.yT)(t._id)),N.push("/medicines"))},text:k("medicines"),bgColor:Z.wL.FAILED_COLOR})})]})]})}},6824:function(n,e,t){var o=t(885),r=t(2791),i=t(3168),a=t(4651),c=t(6349),s=t(9942),l=t(7500),d=t(3329);e.Z=function(n){var e=n.children,t=n.searchAction,u=(0,i.$)().t,_=r.Children.toArray(e),h=(0,r.useState)(!1),p=(0,o.Z)(h,2),f=p[0],m=p[1];return(0,d.jsx)("div",{className:[c.Z.search_container,c.Z.expanded,f?c.Z.expanded_with_options:""].join(" "),children:(0,d.jsx)("div",{className:c.Z.expanded_div,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{style:{flex:1},children:[_[0],f&&_.length>1?_.map((function(n,e){return e>0?n:null})):null,f&&(0,d.jsx)("button",{onClick:function(){t(),m(!1)},style:{marginBlockStart:"4px",marginInline:"auto",marginLeft:"auto",marginRight:"auto",width:"50%"},className:[s.Z.button,s.Z.bg_main,s.Z.fc_white,s.Z.block,s.Z.padding_v_6,s.Z.padding_h_8].join(" "),children:u("search")})]}),_.length>1&&(0,d.jsx)("div",{style:{marginInline:"4px",marginLeft:"4px",marginRight:"4px"},children:(0,d.jsx)(l.Z,{onclick:function(){return m(!f)},icon:function(){return(0,d.jsx)(a.P66,{})}})}),1===_.length&&(0,d.jsx)("div",{className:[s.Z.icon,s.Z.margin_h_4].join(" "),onClick:function(){t(),m(!1)},children:(0,d.jsx)("button",{className:[s.Z.button,s.Z.bg_secondary,s.Z.fc_white,s.Z.block,s.Z.padding_v_6,s.Z.padding_h_8].join(" "),children:u("search")})})]})})})}},2235:function(n,e,t){t.d(e,{Z:function(){return s}});t(2791);var o=t(3168),r=t(8820),i="search-input_input_div__4KoDe",a="search-input_icon_close__TC1nF",c=t(3329);var s=function(n){var e=n.type,t=n.label,s=n.id,l=n.value,d=n.onchange,u=n.placeholder,_=n.onEnterPress,h=n.resetField,p=n.onkeyup,f=(0,o.$)().t;return(0,c.jsxs)("div",{className:i,children:[t&&(0,c.jsx)("label",{htmlFor:s,children:f(t)}),(0,c.jsx)("input",{placeholder:u?f("".concat(u)):"",id:s,type:e,value:l,onChange:d,onKeyPress:function(n){"Enter"===n.key&&_&&_()},onKeyUp:p&&p}),h&&l&&(0,c.jsx)(r.LHV,{onClick:function(){return h(s)},className:a})]})}},4723:function(n,e,t){t.r(e),t.d(e,{default:function(){return R}});var o=t(2791),r=t(3168),i=t(9271),a=t(1968),c=t.n(a),s=t(5880),l=t(125),d=t(553),u=t(3575),_=t(6030),h=t(3502),p=t(6824),f=t(2235),m=t(7500),x=t(670),j=t(7425),g=t(8820),v=t(6355),Z=t(4651),y=t(4373),C=t(9942),k=t(3585),N=t(3329);var w,O=function(n){var e=n.search,t=n.refreshHandler,o=(n.count,n.keyUpHandler),a=(0,r.$)().t,c=(0,i.k6)(),s=(0,_.I0)(),l=(0,_.v9)(h.lB),d=l.searchName,u=l.searchCity,w=l.displayType;return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(p.Z,{searchAction:e,children:[(0,N.jsx)(f.Z,{label:"user-name",id:"search-name",type:"text",value:d,onchange:function(n){s((0,h.ut)(n.target.value))},placeholder:"search-by-company-name",onEnterPress:e,resetField:function(){return s((0,h.ut)(""))},onkeyup:o}),(0,N.jsx)("div",{style:{display:"flex",justifyContent:"flex-start",backgroundColor:k.wL.WHITE_COLOR,borderRadius:"6px"},children:(0,N.jsx)(x.Z,{onSelectionChange:function(n){s((0,h.TH)(n))},defaultValue:{value:u,label:a(u.toLowerCase())},caption:"user-city"})})]}),(0,N.jsxs)("div",{className:[C.Z.actions,C.Z.margin_v_4].join(" "),children:[(0,N.jsx)(m.Z,{withBackground:!0,selected:!1,foreColor:k.wL.MAIN_COLOR,tooltip:a("refresh-tooltip"),onclick:function(){t()},icon:function(){return(0,N.jsx)(j.PwW,{})}}),(d.length>0||u!==k.zx.ALL)&&(0,N.jsx)(m.Z,{withBackground:!0,selected:!1,foreColor:k.wL.MAIN_COLOR,tooltip:a("clear-filter-tooltip"),onclick:function(){s((0,h.Fq)()),t()},icon:function(){return(0,N.jsx)(Z.jTJ,{})}}),(0,N.jsx)(m.Z,{withBackground:!0,foreColor:"card"===w?k.wL.SUCCEEDED_COLOR:k.wL.MAIN_COLOR,tooltip:a("show-item-as-card-tooltip"),onclick:function(){s((0,h.m1)("card"))},icon:function(){return(0,N.jsx)(g.sF$,{})}}),(0,N.jsx)(m.Z,{withBackground:!0,foreColor:"list"===w?k.wL.SUCCEEDED_COLOR:k.wL.MAIN_COLOR,tooltip:a("show-item-as-row-tooltip"),onclick:function(){s((0,h.m1)("list"))},icon:function(){return(0,N.jsx)(v.hON,{})}}),(0,N.jsx)(m.Z,{withBackground:!0,tooltip:a("go-back"),onclick:function(){c.goBack()},icon:function(){return(0,N.jsx)(y.D_,{})},foreColor:k.wL.MAIN_COLOR})]})]})},b=t(6886),L=t(3541),E=t(6201),A=t(6425);var R=function(n){var e=n.onSelectedChange,t=(0,r.$)().t,a=(0,_.I0)(),p=(0,_.v9)(L.tT),f=p.token,m=p.user,x=(0,_.v9)(h.zY),j=x.companies,g=x.count,v=x.status,Z=(0,_.v9)(h.lB),y=Z.searchName,R=Z.searchCity,W=(0,_.v9)(h.lB).displayType,S=(0,_.v9)(A.VY),H=function(){a((0,h.ap)({token:f}))},I=function(){a((0,h.bO)()),H()};return(0,o.useEffect)((function(){return 0===j.length&&H(),window.scrollTo(0,0),e(),function(){(0,h.iX)()}}),[]),m?(0,N.jsxs)("div",{className:C.Z.container,children:[(0,N.jsx)(O,{search:I,refreshHandler:function(){a((0,E.iF)()),a((0,E._l)({token:f})),a((0,h.E5)()),H()},count:g,keyUpHandler:function(n){13!==n.keyCode&&((0,h.iX)(),w&&clearTimeout(w),w=setTimeout((function(){I()}),200))}}),g>0&&(0,N.jsxs)("div",{className:C.Z.count,children:[(0,N.jsx)("span",{className:C.Z.label,children:t("companies-count")}),(0,N.jsx)("span",{className:C.Z.count,children:g})]}),"list"===W&&j.map((function(n){return(0,N.jsx)(l.Z,{partner:n},n._id)})),"card"===W&&(0,N.jsx)("div",{className:[C.Z.flex_container,C.Z.margin_top_10].join(" "),children:j.map((function(n){return(0,N.jsx)(d.Z,{partner:n},n._id)}))}),g>0&&"loading"!==v&&(0,N.jsxs)("div",{className:C.Z.count,children:[j.length," / ",g]}),0===j.length&&"loading"!==v&&0===y.length&&R===k.zx.ALL&&(0,N.jsx)(u.Z,{msg:t("no-companies")}),0===j.length&&"loading"!==v&&(0!==y.length||R!==k.zx.ALL)&&(0,N.jsx)(u.Z,{msg:t("no-result-found")}),"loading"===v&&(0,N.jsx)("div",{className:C.Z.flex_container,children:(0,N.jsx)(c(),{color:k.wL.SECONDARY_COLOR,type:"cylon"})}),j.length<g&&(0,N.jsx)("div",{className:C.Z.flex_container,children:(0,N.jsx)(b.Z,{text:t("more"),action:function(){S?H():a((0,A.Rb)())},bgColor:k.wL.SECONDARY_COLOR,icon:function(){return(0,N.jsx)(s.lYW,{})}})}),j.length===g&&"loading"!==v&&0!==g&&(0,N.jsx)("p",{className:[C.Z.center,C.Z.fc_secondary].join(" "),children:t("no-more")})]}):(0,N.jsx)(i.l_,{to:"/signin"})}},6349:function(n,e){e.Z={small_font:"search-container_small_font__Ha0Xq",search_container:"search-container_search_container__6isGM",expanded:"search-container_expanded__79n+k",expanded_div:"search-container_expanded_div__Hmmm1",checkbox_div:"search-container_checkbox_div__RPj5T"}}}]);
//# sourceMappingURL=4723.be743d6d.chunk.js.map