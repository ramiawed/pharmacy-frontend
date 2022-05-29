"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[5198],{6824:function(e,n,i){var a=i(885),c=i(2791),o=i(3168),s=i(4651),t=i(6349),r=i(9942),l=i(7500),d=i(3329);n.Z=function(e){var n=e.children,i=e.searchAction,m=(0,o.$)().t,_=c.Children.toArray(n),u=(0,c.useState)(!1),h=(0,a.Z)(u,2),x=h[0],f=h[1];return(0,d.jsx)("div",{className:[t.Z.search_container,t.Z.expanded,x?t.Z.expanded_with_options:""].join(" "),children:(0,d.jsx)("div",{className:t.Z.expanded_div,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{style:{flex:1},children:[_[0],x&&_.length>1?_.map((function(e,n){return n>0?e:null})):null,x&&(0,d.jsx)("button",{onClick:function(){i(),f(!1)},style:{marginBlockStart:"4px",marginInline:"auto",marginLeft:"auto",marginRight:"auto",width:"50%"},className:[r.Z.button,r.Z.bg_main,r.Z.fc_white,r.Z.block,r.Z.padding_v_6,r.Z.padding_h_8].join(" "),children:m("search")})]}),_.length>1&&(0,d.jsx)("div",{style:{marginInline:"4px",marginLeft:"4px",marginRight:"4px"},children:(0,d.jsx)(l.Z,{onclick:function(){return f(!x)},icon:function(){return(0,d.jsx)(s.P66,{})}})}),1===_.length&&(0,d.jsx)("div",{className:[r.Z.icon,r.Z.margin_h_4].join(" "),onClick:function(){i(),f(!1)},children:(0,d.jsx)("button",{className:[r.Z.button,r.Z.bg_secondary,r.Z.fc_white,r.Z.block,r.Z.padding_v_6,r.Z.padding_h_8].join(" "),children:m("search")})})]})})})}},2235:function(e,n,i){i.d(n,{Z:function(){return r}});i(2791);var a=i(3168),c=i(8820),o="search-input_input_div__4KoDe",s="search-input_icon_close__TC1nF",t=i(3329);var r=function(e){var n=e.type,i=e.label,r=e.id,l=e.value,d=e.onchange,m=e.placeholder,_=e.onEnterPress,u=e.resetField,h=e.onkeyup,x=(0,a.$)().t;return(0,t.jsxs)("div",{className:o,children:[i&&(0,t.jsx)("label",{htmlFor:r,children:x(i)}),(0,t.jsx)("input",{placeholder:m?x("".concat(m)):"",id:r,type:n,value:l,onChange:d,onKeyPress:function(e){"Enter"===e.key&&_&&_()},onKeyUp:h&&h}),u&&l&&(0,t.jsx)(c.LHV,{onClick:function(){return u(r)},className:s})]})}},5198:function(e,n,i){i.r(n),i.d(n,{default:function(){return B}});var a=i(2791),c=i(3168),o=i(9271),s=i(1968),t=i.n(s),r=i(6824),l=i(2235),d=i(3575),m=i(7500),_=i(3585),u="medicines-search-string_div_search_str__VtrHq",h="medicines-search-string_label__-AfzZ",x="medicines-search-string_value__TyoDg",f=i(3329);var j=function(e){var n=e.pageState,i=e.user,a=(0,c.$)().t;return(0,f.jsxs)("div",{className:u,children:[n.searchName&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("label",{className:h,children:[a("item-name"),":"]})," ",(0,f.jsx)("label",{className:x,children:n.searchName})]}),n.searchCompanyName&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("label",{className:h,children:[a("item-company"),":"]})," ",(0,f.jsx)("label",{className:x,children:n.searchCompanyName})]}),n.searchWarehouseName&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("label",{className:h,children:[a("item-warehouse"),":"]})," ",(0,f.jsx)("label",{className:x,children:n.searchWarehouseName})]}),n.searchInWarehouse&&i.type===_.Wl.WAREHOUSE&&(0,f.jsx)("label",{className:x,children:a("warehouse-in-warehouse")}),n.searchInWarehouse&&i.type!==_.Wl.WAREHOUSE&&(0,f.jsx)("label",{className:x,children:a("pharmacy-in-warehouse")}),n.searchOutWarehouse&&i.type===_.Wl.WAREHOUSE&&(0,f.jsx)("label",{className:x,children:a("warehouse-out-warehouse")}),n.searchOutWarehouse&&i.type!==_.Wl.WAREHOUSE&&(0,f.jsx)("label",{className:x,children:a("pharmacy-out-warehouse")})]})},p=i(885),v=i(3994),w=i(8785),N=i(6030),b=i(3541),g=i(6425),y=i(6201),C=i(6523),k=i(1847),Z=i(9488),O=i(8820),E=i(8014),L=i(7425),W=i(6856),I=i(4651),R={small_font:"medicine-row_small_font__+8ZUj",item_row:"medicine-row_item_row__fiqmL",first_row:"medicine-row_first_row__zInzm",nameDiv:"medicine-row_nameDiv__yCJbp",nameAr:"medicine-row_nameAr__PH3PI",item_name:"medicine-row_item_name__TskTd",icon:"medicine-row_icon__0jmIa",second_row:"medicine-row_second_row__xXAjz",item_company:"medicine-row_item_company__fgt3Z",item_price:"medicine-row_item_price__3+zHe",item_customer_price:"medicine-row_item_customer_price__Ez3J+",separator:"medicine-row_separator__7e7N1",details_row:"medicine-row_details_row__Xo7IX",label:"medicine-row_label__qFkQg",value:"medicine-row_value__AY-+G",offer_div:"medicine-row_offer_div__xsflQ",loading:"medicine-row_loading__y9F-W","loading-move":"medicine-row_loading-move__QXYWk",ribbon_2:"medicine-row_ribbon_2__Jed9U"};var S=function(e){var n=e.item,i=(0,c.$)().t,s=(0,o.k6)(),t=(0,N.I0)(),r=(0,N.v9)(g.VY),l=(0,N.v9)(b.tT),d=l.user,u=l.token,h=(0,N.v9)(y.hX),x=(0,a.useState)(!1),j=(0,p.Z)(x,2),S=j[0],A=j[1],U=(0,a.useState)(!1),H=(0,p.Z)(U,2),D=H[0],T=H[1],F=(0,a.useState)(!1),Y=(0,p.Z)(F,2),P=Y[0],z=Y[1],M=(0,a.useState)(""),$=(0,p.Z)(M,2),B=$[0],X=$[1],G=(0,a.useState)(!1),K=(0,p.Z)(G,2),J=K[0],Q=K[1];return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:R.item_row,onClick:function(){d.type!==_.Wl.PHARMACY&&d.type!==_.Wl.GUEST||t((0,v.F$)({obj:{sourceUser:d._id,targetItem:n._id,action:"choose-item"},token:u})),s.push("/item",{from:d.type,type:"info",allowAction:!1,itemId:n._id,companyId:n.company._id,warehouseId:d.type===_.Wl.WAREHOUSE?d._id:null})},children:[(0,_.nx)(n,d)&&(0,f.jsx)("div",{className:R.offer_div}),(0,f.jsxs)("div",{className:R.first_row,children:[(0,f.jsxs)("label",{className:[R.item_name].join(" "),children:[(0,f.jsx)("label",{className:R.icon,onClick:function(e){Q(!J),e.stopPropagation()},children:J?(0,f.jsx)(W.Faw,{}):(0,f.jsx)(W.Yc6,{})}),(0,f.jsxs)("div",{className:R.nameDiv,children:[(0,f.jsx)("label",{children:n.name}),(0,f.jsx)("label",{className:R.nameAr,children:n.nameAr})]})]}),P?(0,f.jsx)(m.Z,{text:i(""),onclick:function(){},foreColor:_.wL.SECONDARY_COLOR,icon:function(){return(0,f.jsx)(I.H_P,{className:R.loading})}}):d.type===_.Wl.WAREHOUSE&&(n.warehouses.map((function(e){return e.warehouse._id})).includes(d._id)?(0,f.jsx)(m.Z,{text:i("remove-from-warehouse-tooltip"),onclick:function(e){r?(z(!0),t((0,C.LK)({obj:{itemId:n._id,warehouseId:d._id,city:d.city},token:u})).then(w.SI).then((function(){z(!1)})).catch((function(){z(!1)}))):t((0,g.Rb)())},foreColor:_.wL.FAILED_COLOR,icon:function(){return(0,f.jsx)(L.w6k,{})}}):(0,f.jsx)(m.Z,{text:i("add-to-warehouse-tooltip"),onclick:function(e){r?(z(!0),t((0,C._h)({obj:{itemId:n._id,warehouseId:d._id,city:d.city},token:u})).then(w.SI).then((function(){z(!1)})).catch((function(){z(!1)}))):t((0,g.Rb)())},foreColor:_.wL.SUCCEEDED_COLOR,icon:function(){return(0,f.jsx)(W.NcC,{})}})),d.type===_.Wl.PHARMACY&&(0,_.ZC)(n,d)&&(0,f.jsx)(m.Z,{text:i("add-to-cart"),onclick:function(){return A(!0)},foreColor:_.wL.SUCCEEDED_COLOR,icon:function(){return(0,f.jsx)(E.ffc,{})}}),D?(0,f.jsx)(m.Z,{text:i(""),onclick:function(){},foreColor:_.wL.YELLOW_COLOR,icon:function(){return(0,f.jsx)(I.H_P,{className:R.loading})}}):h.map((function(e){return e._id})).includes(n._id)?(0,f.jsx)(m.Z,{text:i("remove-from-favorite-tooltip"),onclick:function(e){r?(T(!0),t((0,y.wy)({obj:{favoriteItemId:n._id},token:u})).then(w.SI).then((function(){T(!1)})).catch((function(){T(!1)}))):t((0,g.Rb)())},foreColor:_.wL.YELLOW_COLOR,icon:function(){return(0,f.jsx)(O.pHD,{})}}):(0,f.jsx)(m.Z,{text:i("add-to-favorite-tooltip"),onclick:function(e){r?(T(!0),t((0,y.wF)({obj:{favoriteItemId:n._id},token:u})).then(w.SI).then((function(){t((0,v.F$)({obj:{sourceUser:d._id,targetItem:n._id,action:"item-added-to-favorite"},token:u})),T(!1)})).catch((function(){T(!1)}))):t((0,g.Rb)())},foreColor:_.wL.YELLOW_COLOR,icon:function(){return(0,f.jsx)(O.y5j,{})}})]}),(0,f.jsxs)("div",{className:R.second_row,children:[(0,f.jsx)("label",{className:R.item_company,children:n.company.name}),(0,f.jsx)("label",{className:R.item_price,children:n.price}),(0,f.jsx)("label",{className:R.item_customer_price,children:n.customer_price})]}),J&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:R.separator}),(0,f.jsxs)("div",{className:R.details_row,children:[(0,f.jsxs)("label",{className:R.label,children:[i("item-packing"),":"]}),(0,f.jsx)("label",{className:R.value,children:n.packing})]}),(0,f.jsxs)("div",{className:R.details_row,children:[(0,f.jsxs)("label",{className:R.label,children:[i("item-caliber"),":"]}),(0,f.jsx)("label",{className:R.value,children:n.caliber})]}),(0,f.jsxs)("div",{className:R.details_row,children:[(0,f.jsxs)("label",{className:R.label,children:[i("item-composition"),":"]}),(0,f.jsx)("label",{className:R.value,children:n.composition})]})]})]}),S&&(0,f.jsx)(k.Z,{item:n,close:function(){return A(!1)},setAddItemToCartMsg:X}),B.length>0&&(0,f.jsx)(Z.Z,{bgColor:_.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:i(B),actionAfterTimeout:function(){return X("")}})]})},A=i(6886),U=i(1221),H=i(9942),D={small_font:"medicine-card_small_font__azgsm",partner_container:"medicine-card_partner_container__yb2zQ",icons_div:"medicine-card_icons_div__dj+FN",offer_icon:"medicine-card_offer_icon__lDsfJ",logo_div:"medicine-card_logo_div__7a5ID",logo:"medicine-card_logo__pqunT",company_name:"medicine-card_company_name__DCc1K",content:"medicine-card_content__k4Bsz",showed_content:"medicine-card_showed_content__Eme5w",main_details:"medicine-card_main_details__+dyxr",name:"medicine-card_name__xKz0J",secondRow:"medicine-card_secondRow__YTM3x",nameAr:"medicine-card_nameAr__vTika",price:"medicine-card_price__igMZ1",customer_price:"medicine-card_customer_price__cIsWM",info:"medicine-card_info__XYxwi",label:"medicine-card_label__5HNDN",value:"medicine-card_value__0jzw9",ribbon_2:"medicine-card_ribbon_2__HnyT2"};var T=function(e){var n=e.companyItem,i=(0,c.$)().t,s=(0,o.k6)(),t=(0,N.I0)(),r=(0,N.v9)(g.VY),l=(0,N.v9)(b.tT),d=l.user,u=l.token,h=(0,N.v9)(y.hX),x=(0,a.useState)(!1),j=(0,p.Z)(x,2),Z=j[0],R=j[1],S=(0,a.useState)(!1),A=(0,p.Z)(S,2),T=A[0],F=A[1],Y=(0,a.useState)(!1),P=(0,p.Z)(Y,2),z=P[0],M=P[1];return(0,f.jsxs)("div",{className:[D.partner_container].join(" "),onClick:function(){d.type!==_.Wl.PHARMACY&&d.type!==_.Wl.GUEST||t((0,v.F$)({obj:{sourceUser:d._id,targetItem:n._id,action:"choose-item"},token:u})),s.push("item",{from:d.type,type:"info",allowAction:!1,itemId:n._id,companyId:n.company._id,warehouseId:d.type===_.Wl.WAREHOUSE?d._id:null})},children:[(0,_.nx)(n,d)&&(0,f.jsx)("div",{className:[D.ribbon_2].join(" "),children:(0,f.jsx)("span",{children:i("offer")})}),(0,f.jsx)("div",{className:D.company_name,children:n.company.name}),(0,f.jsxs)("div",{style:{flex:1},children:[(0,f.jsxs)("div",{className:D.icons_div,children:[z?(0,f.jsx)(m.Z,{icon:function(){return(0,f.jsx)(I.H_P,{className:H.Z.loading,size:20})},onclick:function(){},foreColor:_.wL.SECONDARY_COLOR}):d.type===_.Wl.WAREHOUSE&&(n.warehouses.map((function(e){return e.warehouse._id})).includes(d._id)?(0,f.jsx)(m.Z,{icon:function(){return(0,f.jsx)(L.w6k,{size:24})},onclick:function(e){r?(M(!0),t((0,C.LK)({obj:{itemId:n._id,warehouseId:d._id},token:u})).then(w.SI).then((function(){M(!1)})).catch((function(){M(!1)})),e.stopPropagation()):t((0,g.Rb)())},tooltip:i("remove-from-warehouse-tooltip"),foreColor:_.wL.FAILED_COLOR}):(0,f.jsx)(m.Z,{icon:function(){return(0,f.jsx)(W.NcC,{size:24})},onclick:function(e){r?(M(!0),t((0,C._h)({obj:{itemId:n._id,warehouseId:d._id},token:u})).then(w.SI).then((function(){M(!1)})).catch((function(){M(!1)}))):t((0,g.Rb)())},tooltip:i("add-to-warehouse-tooltip"),foreColor:_.wL.SUCCEEDED_COLOR})),d.type===_.Wl.PHARMACY&&(0,_.ZC)(n,d)&&(0,f.jsx)(m.Z,{icon:function(){return(0,f.jsx)(E.ffc,{size:24})},onclick:function(){return R(!0)},foreColor:_.wL.SUCCEEDED_COLOR}),T?(0,f.jsx)(m.Z,{icon:function(){return(0,f.jsx)(I.H_P,{className:H.Z.loading,size:24})},onclick:function(){},foreColor:_.wL.YELLOW_COLOR}):h.map((function(e){return e._id})).includes(n._id)?(0,f.jsx)(m.Z,{icon:function(){return(0,f.jsx)(O.pHD,{size:24})},onclick:function(e){r?(F(!0),t((0,y.wy)({obj:{favoriteItemId:n._id},token:u})).then(w.SI).then((function(){F(!1)})).catch((function(){F(!1)}))):t((0,g.Rb)())},tooltip:i("remove-from-favorite-tooltip"),foreColor:_.wL.YELLOW_COLOR}):(0,f.jsx)(m.Z,{icon:function(){return(0,f.jsx)(O.y5j,{size:24})},onclick:function(e){r?(F(!0),t((0,y.wF)({obj:{favoriteItemId:n._id},token:u})).then(w.SI).then((function(){t((0,v.F$)({obj:{sourceUser:d._id,targetItem:n._id,action:"item-added-to-favorite"}})),F(!1)})).catch((function(){F(!1)}))):t((0,g.Rb)())},tooltip:i("add-to-favorite-tooltip"),foreColor:_.wL.YELLOW_COLOR})]}),(0,f.jsx)("div",{className:D.logo_div,children:n.logo_url&&""!==n.logo_url?(0,f.jsx)("img",{src:"".concat(_.LB,"/items/").concat(n.logo_url),className:D.logo,alt:"thumb"}):(0,f.jsx)("img",{src:U,className:D.logo,alt:"thumb"})}),(0,f.jsxs)("div",{className:D.content,children:[(0,f.jsxs)("div",{className:[D.showed_content].join(" "),children:[(0,f.jsxs)("div",{className:D.main_details,children:[(0,f.jsx)("label",{className:D.name,children:n.name}),(0,f.jsxs)("div",{className:D.secondRow,children:[(0,f.jsx)("label",{className:D.nameAr,children:n.nameAr}),d.type!==_.Wl.GUEST&&(0,f.jsx)("div",{className:D.price,children:(0,f.jsx)("label",{children:n.price})}),(0,f.jsx)("div",{className:D.price,children:(0,f.jsx)("label",{className:D.customer_price,children:n.customer_price})})]})]}),(0,f.jsxs)("div",{className:D.info,children:[(0,f.jsxs)("label",{className:D.label,children:[i("item-formula"),":"]}),(0,f.jsx)("label",{className:D.value,children:n.formula})]}),(0,f.jsxs)("div",{className:D.info,children:[(0,f.jsxs)("label",{className:D.label,children:[i("item-packing"),":"]}),(0,f.jsx)("label",{className:D.value,children:n.packing})]}),(0,f.jsxs)("div",{className:D.info,children:[(0,f.jsxs)("label",{className:D.label,children:[i("item-caliber"),":"]}),(0,f.jsx)("label",{className:D.value,children:n.caliber})]}),(0,f.jsxs)("div",{className:D.info,children:[(0,f.jsxs)("label",{className:D.label,children:[i("item-composition"),":"]}),(0,f.jsx)("label",{className:D.value,children:n.composition})]})]}),(0,f.jsx)("div",{className:D.behind_content})]})]}),Z&&(0,f.jsx)(k.Z,{item:n,close:function(){return R(!1)}})]})},F=i(6355),Y=i(4373),P=i(5880),z=i(8218),M=i(6349),$=null;var B=function(e){var n=e.onSelectedChange,i=(0,c.$)().t,s=(0,o.k6)(),u=(0,N.I0)(),h=(0,N.v9)(b.tT),x=h.token,p=h.user,v=(0,N.v9)(C.oH),w=v.medicines,g=v.count,y=v.status,k=v.pageState,Z=function(){p.type===_.Wl.PHARMACY?u((0,C.nc)(p.city)):u((0,C.nc)("")),u((0,C.iK)({token:x}))},E=function(){u((0,C.ic)()),Z()},W=function(e){"item-warehouse"===e.target.id&&u((0,z.Mm)(null)),(0,C.iX)(),$&&clearTimeout($),$=setTimeout((function(){u((0,C.ic)()),Z()}),200)};return(0,a.useEffect)((function(){0===w.length&&(Z(),window.scrollTo(0,0)),n()}),[]),p?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(r.Z,{searchAction:E,children:[(0,f.jsx)(l.Z,{label:"user-name",id:"search-name",type:"text",value:k.searchName,onchange:function(e){u((0,C.$p)(e.target.value))},icon:(0,f.jsx)(F.U41,{}),placeholder:"search-by-name-composition-barcode",onEnterPress:E,resetField:function(){u((0,C.$p)(""))},onkeyup:W}),null===k.searchCompanyId&&(0,f.jsx)(l.Z,{label:"item-company",id:"item-company",type:"text",value:k.searchCompanyName,onchange:function(e){u((0,C.HN)(e.target.value))},icon:(0,f.jsx)(F.U41,{}),placeholder:"search-by-company-name",onEnterPress:E,resetField:function(){u((0,C.HN)(""))},onkeyup:W}),null===k.searchWarehouseId&&p.type!==_.Wl.GUEST&&(0,f.jsx)(l.Z,{label:"item-warehouse",id:"item-warehouse",type:"text",value:k.searchWarehouseName,onchange:function(e){u((0,C.jY)(e.target.value))},icon:(0,f.jsx)(F.U41,{}),placeholder:"search-by-warehouse-name",onEnterPress:E,resetField:function(){u((0,C.jY)(""))},onkeyup:W}),p.type!==_.Wl.GUEST&&(0,f.jsxs)("div",{className:M.Z.checkbox_div,children:[(0,f.jsx)("input",{type:"checkbox",value:k.searchInWarehouse,checked:k.searchInWarehouse,onChange:function(){u((0,C.yU)(!k.searchInWarehouse)),u((0,C.Zf)(!1)),W()}}),p.type===_.Wl.WAREHOUSE&&(0,f.jsx)("label",{children:i("warehouse-in-warehouse")}),p.type!==_.Wl.WAREHOUSE&&(0,f.jsx)("label",{children:i("pharmacy-in-warehouse")})]}),p.type!==_.Wl.GUEST&&(0,f.jsxs)("div",{className:M.Z.checkbox_div,children:[(0,f.jsx)("input",{type:"checkbox",value:k.searchOutWarehouse,checked:k.searchOutWarehouse,onChange:function(){u((0,C.Zf)(!k.searchOutWarehouse)),u((0,C.yU)(!1)),W()}}),p.type===_.Wl.WAREHOUSE&&(0,f.jsx)("label",{children:i("warehouse-out-warehouse")}),p.type!==_.Wl.WAREHOUSE&&(0,f.jsx)("label",{children:i("pharmacy-out-warehouse")})]})]}),(0,f.jsxs)("div",{className:H.Z.container,style:{marginBlockStart:"50px",paddingInlineStart:"50px"},children:[(0,f.jsx)(j,{pageState:k,user:p}),(0,f.jsxs)("div",{className:H.Z.actions,children:[(0,f.jsx)(m.Z,{withBackground:!0,icon:function(){return(0,f.jsx)(L.PwW,{})},foreColor:_.wL.MAIN_COLOR,tooltip:i("refresh-tooltip"),onclick:E}),(k.searchName.length>0||k.searchCompanyName.length>0||k.searchWarehouseName.length>0||k.searchInWarehouse||k.searchOutWarehouse)&&(0,f.jsx)(m.Z,{withBackground:!0,selected:!1,foreColor:_.wL.MAIN_COLOR,tooltip:i("clear-filter-tooltip"),onclick:function(){u((0,C.zy)()),E()},icon:function(){return(0,f.jsx)(I.jTJ,{})}}),(0,f.jsx)(m.Z,{withBackground:!0,icon:function(){return(0,f.jsx)(O.sF$,{})},foreColor:"card"===k.displayType?_.wL.SUCCEEDED_COLOR:_.wL.MAIN_COLOR,tooltip:i("show-item-as-card-tooltip"),onclick:function(){return u((0,C.Q$)("card"))}}),(0,f.jsx)(m.Z,{withBackground:!0,icon:function(){return(0,f.jsx)(F.hON,{})},foreColor:"list"===k.displayType?_.wL.SUCCEEDED_COLOR:_.wL.MAIN_COLOR,tooltip:i("show-item-as-row-tooltip"),onclick:function(){return u((0,C.Q$)("list"))}}),(0,f.jsx)(m.Z,{withBackground:!0,tooltip:i("go-back"),onclick:function(){s.goBack()},icon:function(){return(0,f.jsx)(Y.D_,{})},foreColor:_.wL.MAIN_COLOR})]}),g>0&&(0,f.jsxs)("div",{className:H.Z.count,children:[(0,f.jsx)("span",{className:H.Z.label,children:i("items-count")}),(0,f.jsx)("span",{className:H.Z.count,children:g})]}),"list"===k.displayType&&w.map((function(e){return(0,f.jsx)(S,{item:e},e._id)})),"card"===k.displayType&&(0,f.jsx)("div",{className:[H.Z.flex_container,H.Z.margin_top_10].join(" "),children:w.map((function(e){return(0,f.jsx)(T,{companyItem:e},e._id)}))}),g>0&&"loading"!==y&&(0,f.jsxs)("div",{className:H.Z.count,children:[w.length," / ",g]}),0===w.length&&"loading"!==y&&0===k.searchName.length&&0===k.searchCompanyName.length&&0===k.searchWarehouseName.length&&!k.searchInWarehouse&&!k.searchOutWarehouse&&(0,f.jsx)(d.Z,{msg:i("no-items")}),0===w.length&&"loading"!==y&&(0!==k.searchName.length||0!==k.searchCompanyName.length||0!==k.searchWarehouseName.length||k.searchInWarehouse||k.searchOutWarehouse)&&(0,f.jsx)(d.Z,{msg:i("no-result-found")}),"loading"===y&&(0,f.jsx)("div",{className:H.Z.flex_container,children:(0,f.jsx)(t(),{color:_.wL.SECONDARY_COLOR,type:"cylon"})}),w.length<g&&"loading"!==y&&(0,f.jsx)("div",{className:H.Z.flex_container,children:(0,f.jsx)(A.Z,{text:i("more"),action:function(){Z()},bgColor:_.wL.SECONDARY_COLOR,icon:function(){return(0,f.jsx)(P.lYW,{})}})}),w.length===g&&"loading"!==y&&0!==g&&(0,f.jsx)("p",{className:[H.Z.center,H.Z.fc_secondary].join(" "),children:i("no-more")})]})]}):(0,f.jsx)(o.l_,{to:"/signin"})}},6349:function(e,n){n.Z={small_font:"search-container_small_font__Ha0Xq",search_container:"search-container_search_container__6isGM",expanded:"search-container_expanded__79n+k",expanded_div:"search-container_expanded_div__Hmmm1",checkbox_div:"search-container_checkbox_div__RPj5T"}}}]);
//# sourceMappingURL=5198.eb0db432.chunk.js.map