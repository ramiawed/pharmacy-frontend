"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[1882],{394:function(e,i,n){n.d(i,{Z:function(){return N}});var o=n(885),t=n(2791),c=n(3168),s=n(9271),r=n(3994),a=n(8785),l=n(6030),d=n(3541),m=n(6425),_=n(6201),u=n(6523),f=n(1847),x=n(7500),j=n(9488),h=n(8820),w=n(8014),p=n(7425),v=n(6856),C=n(4651),b=n(9126),I={small_font:"medicine-row_small_font__+8ZUj",item_row:"medicine-row_item_row__fiqmL",first_row:"medicine-row_first_row__zInzm",nameDiv:"medicine-row_nameDiv__yCJbp",nameAr:"medicine-row_nameAr__PH3PI",item_name:"medicine-row_item_name__TskTd",icon:"medicine-row_icon__0jmIa",second_row:"medicine-row_second_row__xXAjz",item_company:"medicine-row_item_company__fgt3Z",item_price:"medicine-row_item_price__3+zHe",item_customer_price:"medicine-row_item_customer_price__Ez3J+",separator:"medicine-row_separator__7e7N1",details_row:"medicine-row_details_row__Xo7IX",label:"medicine-row_label__qFkQg",value:"medicine-row_value__AY-+G",offer_div:"medicine-row_offer_div__xsflQ",loading:"medicine-row_loading__y9F-W","loading-move":"medicine-row_loading-move__QXYWk",ribbon_2:"medicine-row_ribbon_2__Jed9U"},L=n(3585),k=n(8682),O=n(3329);var N=function(e){var i=e.item,n=(0,c.$)().t,N=(0,s.k6)(),Z=(0,l.I0)(),g=(0,l.v9)(m.VY),E=(0,l.v9)(d.tT),y=E.user,R=E.token,S=(0,l.v9)(_.hX),A=(0,l.v9)(k.IO).savedItems,W=(0,t.useState)(!1),D=(0,o.Z)(W,2),T=D[0],z=D[1],F=(0,t.useState)(!1),H=(0,o.Z)(F,2),U=H[0],Y=H[1],P=(0,t.useState)(!1),X=(0,o.Z)(P,2),M=X[0],$=X[1],G=(0,t.useState)(!1),J=(0,o.Z)(G,2),Q=J[0],q=J[1],B=(0,t.useState)(""),K=(0,o.Z)(B,2),V=K[0],ee=K[1],ie=(0,t.useState)(!1),ne=(0,o.Z)(ie,2),oe=ne[0],te=ne[1];return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)("div",{className:I.item_row,onClick:function(){y.type!==L.Wl.PHARMACY&&y.type!==L.Wl.GUEST||Z((0,r.F$)({obj:{sourceUser:y._id,targetItem:i._id,action:"choose-item"},token:R})),N.push("/item",{from:y.type,type:"info",allowAction:!1,itemId:i._id,companyId:i.company._id,warehouseId:y.type===L.Wl.WAREHOUSE?y._id:null})},children:[(0,L.nx)(i,y)&&(0,O.jsx)("div",{className:I.offer_div}),(0,O.jsxs)("div",{className:I.first_row,children:[(0,O.jsxs)("label",{className:[I.item_name].join(" "),children:[(0,O.jsx)("label",{className:I.icon,onClick:function(e){te(!oe),e.stopPropagation()},children:oe?(0,O.jsx)(v.Faw,{}):(0,O.jsx)(v.Yc6,{})}),(0,O.jsxs)("div",{className:I.nameDiv,children:[(0,O.jsx)("label",{children:i.name}),(0,O.jsx)("label",{className:I.nameAr,children:i.nameAr})]})]}),Q?(0,O.jsx)(x.Z,{text:n(""),onclick:function(){},foreColor:L.wL.SECONDARY_COLOR,icon:function(){return(0,O.jsx)(C.H_P,{className:I.loading})}}):y.type===L.Wl.WAREHOUSE&&(i.warehouses.map((function(e){return e.warehouse._id})).includes(y._id)?(0,O.jsx)(x.Z,{text:n("remove-from-warehouse-tooltip"),onclick:function(e){g?(q(!0),Z((0,u.LK)({obj:{itemId:i._id,warehouseId:y._id,city:y.city},token:R})).then(a.SI).then((function(){q(!1)})).catch((function(){q(!1)}))):Z((0,m.Rb)())},foreColor:L.wL.FAILED_COLOR,icon:function(){return(0,O.jsx)(p.w6k,{size:24})}}):(0,O.jsx)(x.Z,{text:n("add-to-warehouse-tooltip"),onclick:function(e){g?(q(!0),Z((0,u._h)({obj:{itemId:i._id,warehouseId:y._id,city:y.city},token:R})).then(a.SI).then((function(){q(!1)})).catch((function(){q(!1)}))):Z((0,m.Rb)())},foreColor:L.wL.SUCCEEDED_COLOR,icon:function(){return(0,O.jsx)(v.NcC,{size:24})}})),y.type===L.Wl.PHARMACY?(0,L.ZC)(i,y)?(0,O.jsx)(x.Z,{text:n("add-to-cart"),onclick:function(){return z(!0)},foreColor:L.wL.SUCCEEDED_COLOR,icon:function(){return(0,O.jsx)(w.ffc,{size:24})}}):M?(0,O.jsx)(x.Z,{text:n(""),onclick:function(){},foreColor:L.wL.YELLOW_COLOR,icon:function(){return(0,O.jsx)(C.H_P,{className:I.loading})}}):A.map((function(e){return e._id})).includes(i._id)?(0,O.jsx)(x.Z,{tooltip:n("remove-item-from-saved-items-tooltip"),onclick:function(e){g?($(!0),Z((0,k.xT)({obj:{savedItemId:i._id},token:R})).then(a.SI).then((function(){$(!1)})).catch((function(){$(!1)}))):Z((0,m.Rb)())},foreColor:L.wL.FAILED_COLOR,icon:function(){return(0,O.jsx)(b.aiX,{size:24})}}):(0,O.jsx)(x.Z,{tooltip:n("add-item-to-saved-items-tooltip"),onclick:function(e){g?($(!0),Z((0,k.Mg)({obj:{savedItemId:i._id},token:R})).then(a.SI).then((function(){$(!1)})).catch((function(){$(!1)}))):Z((0,m.Rb)())},foreColor:L.wL.SUCCEEDED_COLOR,icon:function(){return(0,O.jsx)(b.XNB,{size:24})}}):(0,O.jsx)(O.Fragment,{}),U?(0,O.jsx)(x.Z,{text:n(""),onclick:function(){},foreColor:L.wL.YELLOW_COLOR,icon:function(){return(0,O.jsx)(C.H_P,{className:I.loading})}}):S.map((function(e){return e._id})).includes(i._id)?(0,O.jsx)(x.Z,{text:n("remove-from-favorite-tooltip"),onclick:function(e){g?(Y(!0),Z((0,_.wy)({obj:{favoriteItemId:i._id},token:R})).then(a.SI).then((function(){Y(!1)})).catch((function(){Y(!1)}))):Z((0,m.Rb)())},foreColor:L.wL.YELLOW_COLOR,icon:function(){return(0,O.jsx)(h.pHD,{size:24})}}):(0,O.jsx)(x.Z,{text:n("add-to-favorite-tooltip"),onclick:function(e){g?(Y(!0),Z((0,_.wF)({obj:{favoriteItemId:i._id},token:R})).then(a.SI).then((function(){Z((0,r.F$)({obj:{sourceUser:y._id,targetItem:i._id,action:"item-added-to-favorite"},token:R})),Y(!1)})).catch((function(){Y(!1)}))):Z((0,m.Rb)())},foreColor:L.wL.YELLOW_COLOR,icon:function(){return(0,O.jsx)(h.y5j,{size:24})}})]}),(0,O.jsxs)("div",{className:I.second_row,children:[(0,O.jsx)("label",{className:I.item_company,children:i.company.name}),y.type!==L.Wl.GUEST&&(0,O.jsx)("label",{className:I.item_price,children:i.price}),(0,O.jsx)("label",{className:I.item_customer_price,children:i.customer_price})]}),oe&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)("div",{className:I.separator}),(0,O.jsxs)("div",{className:I.details_row,children:[(0,O.jsxs)("label",{className:I.label,children:[n("item-packing"),":"]}),(0,O.jsx)("label",{className:I.value,children:i.packing})]}),(0,O.jsxs)("div",{className:I.details_row,children:[(0,O.jsxs)("label",{className:I.label,children:[n("item-caliber"),":"]}),(0,O.jsx)("label",{className:I.value,children:i.caliber})]}),(0,O.jsxs)("div",{className:I.details_row,children:[(0,O.jsxs)("label",{className:I.label,children:[n("item-composition"),":"]}),(0,O.jsx)("label",{className:I.value,children:i.composition})]})]})]}),T&&(0,O.jsx)(f.Z,{item:i,close:function(){return z(!1)},setAddItemToCartMsg:ee,fromSavedItems:!0}),V.length>0&&(0,O.jsx)(j.Z,{bgColor:L.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:n(V),actionAfterTimeout:function(){return ee("")}})]})}},1882:function(e,i,n){n.r(i);var o=n(2791),t=n(9271),c=n(3168),s=n(1061),r=n(7500),a=n(394),l=n(3575),d=n(2541),m=n(3541),_=n(6030),u=n(8682),f=n(7425),x=n(9942),j=n(3585),h=n(3329);i.default=function(e){var i=e.onSelectedChange,n=(0,c.$)().t,w=(0,_.I0)(),p=(0,_.v9)(m.tT),v=p.user,C=p.token,b=(0,_.v9)(u.IO),I=b.savedItems,L=b.status;return(0,o.useEffect)((function(){i()}),[]),v&&v.type===j.Wl.PHARMACY?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(s.Z,{children:[(0,h.jsx)("h2",{children:n("saved-items")}),(0,h.jsx)("div",{className:x.Z.refresh_icon,children:(0,h.jsx)(r.Z,{selected:!1,foreColor:j.wL.WHITE_COLOR,tooltip:n("refresh-tooltip"),onclick:function(){w(u.TD),w((0,u.ZI)({token:C}))},icon:function(){return(0,h.jsx)(f.PwW,{})}})})]}),(0,h.jsx)("div",{className:x.Z.container_with_header,style:{paddingTop:"10px"},children:I.map((function(e){return(0,h.jsx)(a.Z,{item:e},e._id)}))}),0===I.length&&"loading"!==L&&(0,h.jsx)(l.Z,{msg:n("no-saved-items")}),"loading"===L&&(0,h.jsx)(d.Z,{allowCancel:!1})]}):(0,h.jsx)(t.l_,{to:"/signin"})}}}]);
//# sourceMappingURL=1882.a866d4f1.chunk.js.map