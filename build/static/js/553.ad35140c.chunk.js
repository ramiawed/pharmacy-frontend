"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[553,1349],{1061:function(e,n,t){t.d(n,{Z:function(){return h}});t(2791);var a=t(3168),o=t(9271),i=t(9883),c=t(4373),r=t(7425),s=t(3585),l="header_header__MhatS",d=t(3329);var h=function(e){var n=e.refreshHandler,t=e.title,h=e.count,u=(0,o.k6)(),p=(0,a.$)().t;return(0,d.jsxs)("div",{className:l,children:[(0,d.jsxs)("p",{children:[p(t),h?(0,d.jsx)("span",{children:h}):""]}),n&&(0,d.jsx)(i.Z,{selected:!1,foreColor:s.wL.WHITE_COLOR,tooltip:p("refresh"),onclick:n,icon:function(){return(0,d.jsx)(r.PwW,{})}}),(0,d.jsx)(i.Z,{onclick:function(){u.goBack()},icon:function(){return(0,d.jsx)(c.D_,{})},foreColor:s.wL.WHITE_COLOR})]})}},3229:function(e,n,t){t.d(n,{Z:function(){return i}});t(2791);var a="main-content-container_main_content_container__Aihvg",o=t(3329),i=function(e){var n=e.children;return(0,o.jsx)("div",{className:a,children:n})}},1349:function(e,n,t){t.r(n),t.d(n,{default:function(){return W}});var a=t(2791),o=t(9271),i=t(3168),c=t(6030),r=t(3541),s=t(3107),l=t(3229),d=t(5861),h=t(885),u=t(4687),p=t.n(u),v=t(8785),x=t(6425),f=t(3994),m=t(3666),j=t(7207),N=t(2541),S=t(6886),_=t(4899),O=t(9883),w=t(7425),b={small_font:"cart-item-card_small_font__aBnOR",item_row:"cart-item-card_item_row__3v7F4",row:"cart-item-card_row__altFb",additional_container:"cart-item-card_additional_container__BAxKh",label:"cart-item-card_label__vOnNA",grey_bg:"cart-item-card_grey_bg__K-p66"},T=t(3585),y=t(3329);var C=function(e){var n=e.cartItem,t=e.inOrderDetails,a=e.index,o=e.iconColor,r=(0,i.$)().t,l=(0,c.I0)();return(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)("div",{className:[b.item_row,a%2===0?b.grey_bg:""].join(" "),children:[(0,y.jsxs)("div",{className:b.row,children:[(0,y.jsx)("div",{style:{flex:1},children:(0,y.jsx)(_.Z,{flexDirection:"column",item:n.item})}),(0,y.jsxs)("div",{className:b.additional_container,children:[t?(0,y.jsx)("label",{style:{width:"32px"}}):(0,y.jsx)(O.Z,{onclick:function(){n.qty>1&&l((0,s.WG)(n.key))},icon:function(){return(0,y.jsx)(w.sAQ,{color:o||T.wL.MAIN_COLOR,size:32})}}),(0,y.jsx)("label",{className:b.label,children:n.qty}),t?(0,y.jsx)("label",{style:{width:"32px"}}):(0,y.jsx)(O.Z,{onclick:function(){(0!==n.warehouse.maxQty&&n.qty<n.warehouse.maxQty||0===n.warehouse.maxQty)&&l((0,s.zb)(n.key))},icon:function(){return(0,y.jsx)(w.J28,{color:o||T.wL.MAIN_COLOR,size:32})}}),(0,y.jsxs)("label",{className:b.label,children:[n.bonus&&n.bonus," ",n.bonus?n.bonusType===T.Hg.PERCENTAGE?r("percentage"):r("piece"):""]}),(0,y.jsxs)("label",{className:b.label,children:[n.point," ",r("point")]}),(0,y.jsx)("label",{className:b.label,children:(0,T.uf)(n.item.price)}),(0,y.jsx)("label",{className:b.label,children:(0,T.uf)(n.qty*(t?n.price:n.item.price)-(n.bonus&&n.bonusType===T.Hg.PERCENTAGE?n.qty*(t?n.price:n.item.price)*n.bonus/100:0))})]})]}),!t&&(0,y.jsx)(O.Z,{foreColor:T.wL.MAIN_COLOR,icon:function(){return(0,y.jsx)(w.w6k,{size:24,color:T.wL.FAILED_COLOR})},onclick:function(){return l((0,s.Cn)(n))}})]})})},g=t(6856),A={small_font:"cart-warehouse_small_font__xxo1Y",container:"cart-warehouse_container__dgErK",grey_bg:"cart-warehouse_grey_bg__LdOX3",additional_warehouse_info_div:"cart-warehouse_additional_warehouse_info_div__vkd+o",pay_label:"cart-warehouse_pay_label__MWh1y",header:"cart-warehouse_header__XorCl",name:"cart-warehouse_name__UjOCO",icon:"cart-warehouse_icon__D-CwQ"};var I=function(e){var n=e.warehouse,t=e.wIndex,o=(0,i.$)().t,l=(0,c.I0)(),u=(0,c.v9)(x.VY),_=(0,c.v9)(r.tT),O=_.token,w=_.user,b=(0,c.v9)(s.D1),I=(0,a.useState)(!1),E=(0,h.Z)(I,2),P=E[0],W=E[1],k=(0,a.useState)(!1),L=(0,h.Z)(k,2),R=L[0],M=L[1],Z=(0,a.useState)(!1),B=(0,h.Z)(Z,2),z=B[0],F=B[1],D=(0,a.useState)(!1),H=(0,h.Z)(D,2),$=H[0],q=H[1],Y=(0,a.useState)(!1),G=(0,h.Z)(Y,2),K=G[0],Q=G[1],U=(0,a.useState)(!1),V=(0,h.Z)(U,2),X=V[0],J=V[1],ee=function(){var e=0,t=0;return b.filter((function(e){return e.warehouse.name===n.name})).forEach((function(n){e=e+n.qty*n.item.price-(n.bonus&&n.bonusType===T.Hg.PERCENTAGE?n.qty*n.item.price*n.bonus/100:0),t+=n.point})),{invoiceTotal:e,itemsPoints:t}}(),ne=n.includeInPointSystem&&n.pointForAmount&&n.amountToGetPoint?Math.floor(ee.invoiceTotal/n.amountToGetPoint)*n.pointForAmount:0;return(0,y.jsxs)("div",{className:[A.container,t%2===0?A.grey_bg:""].join(" "),children:[(0,y.jsxs)("div",{className:A.header,children:[(0,y.jsxs)("div",{className:A.name,onClick:function(){return J(!X)},children:[(0,y.jsx)("label",{className:A.icon,children:X?(0,y.jsx)(g.Yc6,{}):(0,y.jsx)(g.Faw,{})}),(0,y.jsx)("label",{children:n.name})]}),(0,y.jsx)("label",{children:(0,y.jsx)(S.Z,{text:o("send order"),bgColor:T.wL.MAIN_COLOR,action:function(){n.invoiceMinTotal>0&&ee.invoiceTotal<n.invoiceMinTotal?Q(!0):q(!0)}})})]}),X&&(0,y.jsx)(y.Fragment,{children:b.filter((function(e){return e.warehouse.name===n.name})).map((function(e,n){return(0,y.jsx)(C,{cartItem:e,inOrderDetails:!1,index:n,iconColor:t%2===0?T.wL.WHITE_COLOR:T.wL.MAIN_COLOR},n)}))}),(0,y.jsxs)("div",{className:A.additional_warehouse_info_div,children:[(0,y.jsxs)("label",{children:[o("total invoice price"),":"," ",(0,T.uf)(ee.invoiceTotal)]}),ne>0&&(0,y.jsxs)("label",{children:[o("number of points that you get"),":"," ",ne+ee.itemsPoints]}),n.costOfDeliver>0&&(0,y.jsxs)("label",{children:[o("deliver cost"),": ",n.costOfDeliver," %"]}),n.invoiceMinTotal>0&&(0,y.jsxs)("label",{children:[o("minimum invoice cost"),":"," ",(0,T.uf)(n.invoiceMinTotal)]}),n.fastDeliver&&(0,y.jsx)("label",{children:o("fast deliver")}),n.payAtDeliver&&(0,y.jsx)("label",{className:A.pay_label,children:o("dear partner pay when deliver")})]}),z&&(0,y.jsx)(N.Z,{allowCancel:!1}),P&&(0,y.jsx)(j.Z,{closeModal:function(){W(!1),l((0,s.C3)(n))},header:o("send order"),cancelLabel:o("close"),small:!0,green:!0,children:o("send order succeeded")}),R&&(0,y.jsx)(j.Z,{closeModal:function(){M(!1)},header:o("send order"),cancelLabel:o("close"),small:!0,children:o("send order failed")}),$&&(0,y.jsx)(j.Z,{closeModal:function(){q(!1)},header:o("send order"),cancelLabel:o("cancel"),okLabel:o("send order"),okModal:function(){if(u){q(!1),F(!0);var e={pharmacy:w._id,warehouse:n._id,items:b.filter((function(e){return e.warehouse.name===n.name})).map((function(e){return{item:e.item._id,qty:e.qty,bonus:e.bonus,bonusType:e.bonusType,price:e.item.price,points:e.point}})),totalInvoicePrice:ee.invoiceTotal,totalInvoicePoints:ne+ee.itemsPoints,status:T.zi.SENT_BY_PHARMACY};l((0,m.TR)({obj:e,token:O})).then(v.SI).then((0,d.Z)(p().mark((function e(){return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l((0,f.F$)({obj:{sourceUser:w._id,targetUser:null,action:"user-made-an-order"},token:O})),ne+ee.itemsPoints>0)try{l((0,r.Dk)({token:O,obj:{id:w._id,amount:ne+ee.itemsPoints}}))}catch(n){}F(!1),W(!0);case 4:case"end":return e.stop()}}),e)})))).catch((function(){F(!1),M(!0)})),l((0,m.n9)(!0))}else l((0,x.Rb)())},small:!0,children:o("confirm save order")}),K&&(0,y.jsx)(j.Z,{closeModal:function(){Q(!1)},header:o("minimum invoice cost"),cancelLabel:o("cancel"),small:!0,children:o("minimum invoice cost error")})]})},E=t(9761),P=t(1061);var W=function(e){var n=e.onSelectedChange,t=(0,i.$)().t,d=(0,c.v9)(r.dy),h=(0,c.v9)(s.cj);return(0,a.useEffect)((function(){n(),window.scrollTo(0,0)}),[]),d&&d.type===T.Wl.PHARMACY?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(P.Z,{title:"cart"}),(0,y.jsxs)(l.Z,{children:[h.length>0&&(0,y.jsx)("div",{children:h.map((function(e,n){return(0,y.jsx)(I,{warehouse:e,wIndex:n},n)}))}),0===h.length&&(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(E.Z,{msg:t("empty-cart")})})]})]}):(0,y.jsx)(o.l_,{to:"/signin"})}},553:function(e,n,t){t.r(n);var a=t(2791),o=t(9271),i=t(4681),c=t(3585),r=t(1349),s=t(3329),l=(0,a.lazy)((function(){return Promise.all([t.e(1293),t.e(7760)]).then(t.bind(t,8718))})),d=(0,a.lazy)((function(){return Promise.all([t.e(1854),t.e(6818)]).then(t.bind(t,1854))})),h=(0,a.lazy)((function(){return t.e(7077).then(t.bind(t,7077))})),u=(0,a.lazy)((function(){return Promise.all([t.e(1089),t.e(3508)]).then(t.bind(t,1089))})),p=(0,a.lazy)((function(){return Promise.all([t.e(4007),t.e(3784)]).then(t.bind(t,4007))})),v=(0,a.lazy)((function(){return t.e(836).then(t.bind(t,8674))})),x=(0,a.lazy)((function(){return t.e(6356).then(t.bind(t,483))})),f=(0,a.lazy)((function(){return Promise.all([t.e(7692),t.e(5080)]).then(t.bind(t,5830))})),m=(0,a.lazy)((function(){return Promise.all([t.e(7226),t.e(4813),t.e(1746)]).then(t.bind(t,4813))})),j=(0,a.lazy)((function(){return Promise.all([t.e(1293),t.e(5757)]).then(t.bind(t,5228))})),N=(0,a.lazy)((function(){return Promise.all([t.e(2231),t.e(943)]).then(t.bind(t,2231))})),S=(0,a.lazy)((function(){return Promise.all([t.e(8484),t.e(6053),t.e(1842),t.e(2185)]).then(t.bind(t,3275))})),_=(0,a.lazy)((function(){return Promise.all([t.e(2430),t.e(960)]).then(t.bind(t,4351))})),O=(0,a.lazy)((function(){return t.e(1882).then(t.bind(t,1882))})),w=(0,a.lazy)((function(){return Promise.all([t.e(8484),t.e(6053),t.e(5201),t.e(7064),t.e(9636)]).then(t.bind(t,5240))})),b=(0,a.lazy)((function(){return Promise.all([t.e(6053),t.e(5201),t.e(2192)]).then(t.bind(t,9668))})),T=(0,a.lazy)((function(){return t.e(4021).then(t.bind(t,4021))})),y=(0,a.lazy)((function(){return Promise.all([t.e(2430),t.e(9606)]).then(t.bind(t,1191))}));n.default=function(e){var n=e.changeOptionHandler;return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(a.Suspense,{fallback:(0,s.jsx)(i.Z,{}),children:(0,s.jsxs)(o.rs,{children:[(0,s.jsx)(o.AW,{exact:!0,path:"/",children:(0,s.jsx)(h,{onSelectedChange:function(){n({selectedTopNavOption:c.c.HOME,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/companies",children:(0,s.jsx)(l,{onSelectedChange:function(){n({selectedTopNavOption:c.c.COMPANIES,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{excat:!0,path:"/special-offers",children:(0,s.jsx)(b,{onSelectedChange:function(){n({selectedTopNavOption:c.c.SPEACIAL_OFFERS,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/ordered-baskets",children:(0,s.jsx)(N,{type:"basket",onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.BASKETS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/medicines",children:(0,s.jsx)(p,{onSelectedChange:function(){n({selectedTopNavOption:c.c.MEDICINES,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/offers",children:(0,s.jsx)(_,{onSelectedChange:function(){n({selectedTopNavOption:c.c.OFFERS,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/items-with-points",children:(0,s.jsx)(y,{onSelectedChange:function(){n({selectedTopNavOption:c.c.ITEMS_WITH_POINTS,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/warehouses",children:(0,s.jsx)(j,{onSelectedChange:function(){n({selectedTopNavOption:c.c.WAREHOUSES,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/my-points",children:(0,s.jsx)(T,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.MY_POINTS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/item",children:(0,s.jsx)(u,{})}),(0,s.jsx)(o.AW,{exact:!0,path:"/profile",children:(0,s.jsx)(m,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.PROFILE,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/favorites",children:(0,s.jsx)(d,{onSelectedChange:function(){n({selectedTopNavOption:c.c.FAVORITES,collapsedSideNavOption:!0,selectedSideNavOption:"",showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/basket-order-details",children:(0,s.jsx)(w,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.BASKETS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/cart",children:(0,s.jsx)(r.default,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.c.CART,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/saved-items",children:(0,s.jsx)(O,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.c.SAVEDITEMS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/notifications",children:(0,s.jsx)(f,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.NOTIFICATIONS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/notification/:notificationId",children:(0,s.jsx)(x,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.NOTIFICATIONS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/orders",children:(0,s.jsx)(N,{type:"order",onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.ORDERS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{exact:!0,path:"/order-details",children:(0,s.jsx)(S,{onSelectedChange:function(){n({selectedTopNavOption:"",collapsedSideNavOption:!0,selectedSideNavOption:c.$6.ORDERS,showTopNav:!1,showSearchBar:!1})}})}),(0,s.jsx)(o.AW,{component:v})]})})})}}}]);
//# sourceMappingURL=553.ad35140c.chunk.js.map