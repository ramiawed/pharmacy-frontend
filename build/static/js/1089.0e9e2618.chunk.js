"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[1089],{8845:function(e,n,t){t.d(n,{Z:function(){return c}});var a=t(885),i=t(2791),r=t(9126),o={small_font:"card-info_small_font__AusTH",card:"card-info_card__VcLb9",header:"card-info_header__uTcny",expanded:"card-info_expanded__IDH-A",warning:"card-info_warning__bmiK1"},l=t(3329);var c=function(e){var n=e.headerTitle,t=e.children,c=e.type,s=(0,i.useState)(!0),d=(0,a.Z)(s,2),u=d[0],h=d[1];return(0,l.jsxs)("div",{className:[o.card,"warning"===c?o.warning:null].join(" "),children:[(0,l.jsxs)("div",{onClick:function(){return h(!u)},className:[o.header,"warning"===c?o.warning:null,u?o.expanded:null].join(" "),children:[(0,l.jsx)("p",{children:n}),(0,l.jsx)("label",{className:o.header_label,onClick:function(){return h(!u)},children:u?(0,l.jsx)(r.jnn,{}):(0,l.jsx)(r.F0C,{})})]}),u&&(0,l.jsx)("div",{children:t})]})}},4960:function(e,n,t){t.d(n,{Z:function(){return o}});t(2791);var a="custom-checkbox_container__xRmIL",i="custom-checkbox_checkmark__Sr2i9",r=t(3329),o=function(e){var n=e.label,t=e.value,o=e.changeHandler;return(0,r.jsxs)("div",{className:a,onClick:o,children:[(0,r.jsx)("input",{type:"checkbox",checked:t,value:t,onChange:function(){o()}}),(0,r.jsx)("span",{className:i}),(0,r.jsx)("label",{children:n})]})}},6011:function(e,n,t){t.d(n,{Z:function(){return f}});t(2791);var a=t(3168),i=t(9883),r=t(7425),o=t(6856),l="multi-value_container__efvXg",c="multi-value_row__CgABK",s="multi-value_header__sV-dg",d="multi-value_input_div__4ZhqR",u=t(3585),h=t(3329);var f=function(e){var n=e.addHandler,t=e.deleteHandler,f=e.values,m=e.changeHandler,_=e.placeholder,x=e.quantityLabel,p=e.bonusLabel,v=e.afterBonusLabel,g=e.allowEdit,j=(0,a.$)().t;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{className:s,children:g&&(0,h.jsx)("div",{style:{margin:"0 auto"},children:(0,h.jsx)(i.Z,{icon:function(){return(0,h.jsx)(o.NcC,{size:24,color:u.wL.SUCCEEDED_COLOR})},onclick:n,tooltip:j("add")})})}),(0,h.jsx)("div",{className:l,children:f.map((function(e){return(0,h.jsxs)("div",{className:c,children:[(0,h.jsxs)("div",{className:d,children:[x&&(0,h.jsx)("label",{children:x}),(0,h.jsx)("input",{id:e.key,title:"qty",value:e.value.qty,onChange:function(e){return m("qty",e.target.value,e.target.id)},placeholder:_,onKeyPress:u.I0,disabled:!g,type:"number"}),p&&(0,h.jsx)("label",{children:p})]}),(0,h.jsxs)("div",{className:d,children:[(0,h.jsx)("input",{id:e.key,title:"bonus",value:e.value.bonus,onChange:function(e){return m("bonus",e.target.value,e.target.id)},placeholder:_,disabled:!g,type:"number"}),v&&(0,h.jsx)("label",{children:v})]},e.key),g&&(0,h.jsx)(i.Z,{icon:function(){return(0,h.jsx)(r.w6k,{size:24,color:u.wL.FAILED_COLOR})},onclick:function(){return t(e.key)},tooltip:j("remove")})]},e.key)}))})]})}},6802:function(e,n,t){t.d(n,{Z:function(){return j}});var a=t(4942),i=t(1413),r=t(2982),o=t(885),l=t(2791),c=t(3168),s=t(2810),d=t(6030),u=t(3268),h=t(4960),f=t(6011),m=t(7207),_=t(6856),x="offers-modal_checkboxes_div__GuAMP",p="offers-modal_offer_type_checkbox__Ntro-",v=t(3585),g=t(3329);var j=function(e){var n,t=e.item,j=e.warehouseId,b=e.close,w=e.token,y=e.allowEdit,Z=(0,c.$)().t,C=(0,d.I0)(),k=t.warehouses.find((function(e){return e.warehouse._id===j})).offer,E=(0,l.useState)(!1),L=(0,o.Z)(E,2),N=L[0],A=L[1],O=(0,l.useState)(k.mode===v.Hg.PIECES),S=(0,o.Z)(O,2),I=S[0],R=S[1],D=(0,l.useState)(k.mode===v.Hg.PERCENTAGE),H=(0,o.Z)(D,2),T=H[0],q=H[1],W=(0,l.useState)((null===(n=k.offers)||void 0===n?void 0:n.length)>0?k.offers.map((function(e){return{value:{qty:e.qty,bonus:e.bonus},key:e._id}})):[]),F=(0,o.Z)(W,2),M=F[0],z=F[1];return(0,g.jsxs)(m.Z,{header:"offers",cancelLabel:"close",okLabel:"add",closeModal:b,okModal:y?function(){!function(){if(I||T){var e=M.filter((function(e){return 0!==e.value.bonus||e.value.qty})).sort((function(e,n){return e.value.qty>n.value.qty?-1:e.value.qty<n.value.qty?1:0})).map((function(e){return{qty:e.value.qty,bonus:e.value.bonus}})),n={mode:0===e.length?null:I?v.Hg.PIECES:v.Hg.PERCENTAGE,offers:e};C((0,u.Ex)({obj:{itemId:t._id,warehouseId:j,offer:n},token:w})),b()}else A(!0)}()}:null,small:!0,children:[y&&M.length>0&&(0,g.jsxs)("div",{className:x,children:[(0,g.jsx)("div",{className:p,children:(0,g.jsx)(h.Z,{label:Z("piece bouns"),value:I,changeHandler:function(){R(!I),q(!1),A(!1)}})}),(0,g.jsx)("div",{className:p,children:(0,g.jsx)(h.Z,{label:Z("percentage bouns"),value:T,changeHandler:function(){q(!T),R(!1),A(!1)}})}),N&&(0,g.jsx)(_.wr$,{color:v.wL.FAILED_COLOR,size:24})]}),0===M.length&&(0,g.jsx)("p",{className:["center","fc_light"].join(" "),children:Z("no offers")}),(0,g.jsx)(f.Z,{allowEdit:y,values:M,addHandler:function(){return z([].concat((0,r.Z)(M),[{value:{qty:0,bonus:0},key:(0,s.Z)()}]))},deleteHandler:function(e){var n=M.filter((function(n){return n.key!==e}));z(n)},changeHandler:function(e,n,t){var r=M.map((function(r){return r.key===t?(0,i.Z)((0,i.Z)({},r),{},{value:(0,i.Z)((0,i.Z)({},r.value),{},(0,a.Z)({},"bonus"===e?"bonus":"qty",1*(0,v.F8)(n)))}):r}));z(r)},quantityLabel:Z("quantity"),bonusLabel:I?Z("piece bouns"):T?Z("percentage bouns"):null,afterBonusLabel:I?Z("piece"):T?Z("percentage"):null})]})}},1089:function(e,n,t){t.r(n),t.d(n,{default:function(){return P}});var a=t(4942),i=t(1413),r=t(885),o=t(2791),l=t(3168),c=t(9271),s=t(4569),d=t.n(s),u=t(6552),h=t(8785),f=t(6030),m=t(3541),_=t(3268),x=t(6523),p=t(6425),v=t(3229),g=t(6886),j=t(4891),b=t(2541),w=t(6802),y=t(6670),Z=t(8845),C=t(1061),k=t(9724),E=t(9488),L=t(9883),N=t(7207),A=t(3585),O=t(6856),S=t(7425),I=t(8014),R=t(9126),D=t(8820),H=t(4131),T="item-page_content__R9NDn",q="item-page_textarea__qwkQA",W="item-page_horizontal_div__uGnXE",F="item-page_error_ul__SKblv",M="item-page_info__3cySs",z="item-page_logo__l6dvL",U=t(3329);var P=function(){var e,n,t,s,P,B,G,K,Y,$,V=(0,l.$)().t,X=(0,f.I0)(),Q=(0,c.k6)(),J=(0,c.TH)().state,ee=J.from,ne=J.allowAction,te=J.type,ae=J.itemId,ie=J.companyId,re=J.warehouseId,oe=o.useRef(null),le=(0,f.v9)(p.VY),ce=(0,f.v9)(m.tT),se=ce.user,de=ce.token,ue=(0,f.v9)(_.a1),he=ue.addStatus,fe=ue.updateStatus,me=ue.changeLogoStatus,_e=(0,f.v9)(x.oH),xe=_e.addToWarehouseStatus,pe=_e.removeFromWarehouseStatus,ve=(0,o.useState)(!1),ge=(0,r.Z)(ve,2),je=ge[0],be=ge[1],we=(0,o.useState)(!1),ye=(0,r.Z)(we,2),Ze=ye[0],Ce=ye[1],ke=(0,o.useState)(""),Ee=(0,r.Z)(ke,2),Le=Ee[0],Ne=Ee[1],Ae=(0,o.useState)(!1),Oe=(0,r.Z)(Ae,2),Se=Oe[0],Ie=Oe[1],Re=(0,o.useState)(!1),De=(0,r.Z)(Re,2),He=De[0],Te=De[1],qe=(0,o.useState)("idle"),We=(0,r.Z)(qe,2),Fe=We[0],Me=We[1],ze=(0,o.useState)({}),Ue=(0,r.Z)(ze,2),Pe=Ue[0],Be=Ue[1],Ge=(0,o.useState)(""),Ke=(0,r.Z)(Ge,2),Ye=Ke[0],$e=Ke[1],Ve=(0,o.useState)({name:"",caliber:"",formula:"",indication:"",barcode:"",barcodeTwo:"",composition:"",packing:"",warehouses:[],price:0,customer_price:0}),Xe=(0,r.Z)(Ve,2),Qe=Xe[0],Je=Xe[1],en=function(e){Je((0,i.Z)((0,i.Z)({},Qe),{},(0,a.Z)({},e.target.id,"price"===e.target.id||"customer_price"===e.target.id?(0,A.F8)(e.target.value):e.target.value))),Be((0,i.Z)((0,i.Z)({},Pe),{},(0,a.Z)({},e.target.id,"")))},nn=(0,o.useCallback)((function(){Me("loading"),d().get("".concat(A.Hc,"/items/item/").concat(ae),{headers:{Authorization:"Bearer ".concat(de)}}).then((function(e){Je(e.data.data.item),Me("idle")})).catch((function(e){Me("idle")}))}));return(0,o.useEffect)((function(){"info"===te&&ae&&(nn(),window.scrollTo(0,0))}),[ae,te]),se?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(C.Z,{title:0!==(null===Qe||void 0===Qe?void 0:Qe.name.length)?Qe.name:V("item name"),refreshHandler:function(){"info"===te&&ae&&(nn(),window.scrollTo(0,0))}}),(0,U.jsx)(v.Z,{children:(0,U.jsxs)("div",{className:T,children:[(0,U.jsxs)("div",{className:["flex_center_container","flex_column"].join(" "),style:{padding:"6px 12px"},children:["succeeded"===me||"idle"===me?(0,U.jsx)("div",{className:z,children:(0,U.jsx)("img",{src:Qe.logo_url&&""!==Qe.logo_url?"".concat(A.LB,"/items/").concat(Qe.logo_url):u,alt:"thumb"})}):null,ne&&ae&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("div",{style:{display:"none"},children:(0,U.jsx)("form",{encType:"multipart/form-data",children:(0,U.jsx)("div",{children:(0,U.jsx)("input",{type:"file",name:"file",onChange:function(e){if(e.target.files[0])if(parseFloat(e.target.files[0].size/1024).toFixed(2)<512){var n=new FormData;n.append("file",e.target.files[0]);var t={headers:{"content-type":"multipart/form-data",Authorization:"Bearer ".concat(de)}};d().post("".concat(A.Hc,"/items/upload/").concat(Qe._id),n,t).then((function(e){nn()}))}else $e("image-size-must-be-less-than")},ref:oe,stye:{display:"none"}})})})}),(0,U.jsx)("div",{children:(0,U.jsx)(g.Z,{text:V("change logo"),action:function(){oe.current.click()},bgColor:A.wL.MAIN_COLOR,icon:function(){return(0,U.jsx)(R.Eno,{})}})})]}),ne&&(ee===A.Wl.COMPANY||ee===A.Wl.ADMIN)&&(0,U.jsx)("div",{style:{margin:"4px 0"},children:(0,U.jsx)(g.Z,{text:V("info"===te?"update item":"add item"),action:function(){return Te(!0)},bgColor:A.wL.SUCCEEDED_COLOR,icon:function(){return(0,U.jsx)(D.QML,{})}})}),se.type===A.Wl.PHARMACY&&null!==Qe&&(0,A.ZC)(Qe,se)&&(0,U.jsx)("div",{style:{margin:"4px 0"},children:(0,U.jsx)(g.Z,{text:V("add to cart"),action:function(){return be(!0)},bgColor:A.wL.SUCCEEDED_COLOR,icon:function(){return(0,U.jsx)(I.ffc,{})}})}),se.type===A.Wl.WAREHOUSE&&(null!==(e=Qe.warehouses)&&void 0!==e&&e.map((function(e){return e.warehouse._id})).includes(se._id)?(0,U.jsx)("div",{style:{margin:"4px 0"},children:(0,U.jsx)(g.Z,{text:V("remove item from warehouse"),action:function(){le?X((0,x.LK)({obj:{itemId:ae,warehouseId:re},token:de})).then(h.SI).then((function(){return nn()})).catch((function(){})):X((0,p.Rb)())},bgColor:A.wL.FAILED_COLOR,icon:function(){return(0,U.jsx)(S.w6k,{})}})}):(0,U.jsx)("div",{style:{margin:"4px 0"},children:(0,U.jsx)(g.Z,{text:V("add item to warehouse"),action:function(){le?X((0,x._h)({obj:{itemId:ae,warehouseId:re},token:de})).then(h.SI).then((function(){return nn()})).catch((function(){})):X((0,p.Rb)())},bgColor:A.wL.SUCCEEDED_COLOR,icon:function(){return(0,U.jsx)(O.NcC,{})}})}))]}),(0,U.jsxs)("div",{className:M,children:[(0,U.jsxs)(Z.Z,{headerTitle:V("main info"),children:[(0,U.jsx)(k.Z,{label:"item name",id:"name",type:"text",value:Qe.name,bordered:!1,onchange:en,error:(null===(n=Pe.name)||void 0===n?void 0:n.length)>0,readOnly:!ne}),(0,U.jsx)(y.Z,{}),(0,U.jsx)(k.Z,{label:"item name ar",id:"nameAr",type:"text",value:Qe.nameAr,bordered:!1,onchange:en,error:(null===(t=Pe.nameAr)||void 0===t?void 0:t.length)>0,readOnly:!ne}),(0,U.jsx)("div",{className:W}),(0,U.jsx)(k.Z,{label:"formula",id:"formula",type:"text",value:Qe.formula,bordered:!1,onchange:en,error:(null===(s=Pe.formula)||void 0===s?void 0:s.length)>0,readOnly:!ne}),(0,U.jsx)("div",{className:W}),(0,U.jsx)(k.Z,{label:"caliber",id:"caliber",type:"text",value:Qe.caliber,bordered:!1,onchange:en,error:(null===(P=Pe.caliber)||void 0===P?void 0:P.length)>0,readOnly:!ne}),(0,U.jsx)("div",{className:W}),(0,U.jsx)(k.Z,{label:"packing",id:"packing",type:"text",value:Qe.packing,bordered:!1,onchange:en,error:(null===(B=Pe.packing)||void 0===B?void 0:B.length)>0,readOnly:!ne}),se.type===A.Wl.ADMIN&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("div",{className:W}),(0,U.jsx)(k.Z,{label:"barcode",id:"barcode",type:"text",value:Qe.barcode,bordered:!1,onchange:en,readOnly:!ne}),(0,U.jsx)("div",{className:W}),(0,U.jsx)(k.Z,{label:"barcode",id:"barcodeTwo",type:"text",value:Qe.barcodeTwo,bordered:!1,onchange:en,readOnly:!ne})]})]}),(0,U.jsxs)(Z.Z,{headerTitle:V("price"),children:[se.type!==A.Wl.GUEST&&(0,U.jsx)("div",{style:{width:"300px"},children:(0,U.jsx)(k.Z,{label:"price",id:"price",type:"number",value:Qe.price,bordered:!1,onchange:en,error:(null===(G=Pe.price)||void 0===G?void 0:G.length)>0,readOnly:!ne})}),(0,U.jsx)("div",{className:W}),(0,U.jsx)("div",{style:{width:"300px"},children:(0,U.jsx)(k.Z,{label:"customer price",id:"customer_price",type:"number",value:Qe.customer_price,bordered:!1,onchange:en,error:(null===(K=Pe.customer_price)||void 0===K?void 0:K.length)>0,readOnly:!ne})})]}),(0,U.jsx)(Z.Z,{headerTitle:V("composition"),children:(0,U.jsx)("textarea",{className:q,placeholder:V("enter composition"),id:"composition",value:Qe.composition,onChange:en,disabled:!ne})}),(0,U.jsx)(Z.Z,{headerTitle:V("indication"),children:(0,U.jsx)("textarea",{className:q,placeholder:V("enter indication"),id:"indication",value:Qe.indication,onChange:en,disabled:!ne})}),(null===(Y=Qe.warehouses)||void 0===Y?void 0:Y.length)>0&&se.type===A.Wl.ADMIN&&(0,U.jsx)(Z.Z,{headerTitle:V("warehouses"),children:Qe.warehouses.map((function(e,n){return(0,U.jsxs)("div",{className:[H.Z.container,H.Z.without_box_shadow].join(" "),style:{padding:"0 6px"},children:[(0,U.jsx)("label",{style:{padding:"6px 0"},children:e.warehouse.name}),(0,U.jsx)(L.Z,{icon:function(){return(0,U.jsx)(O.Rtn,{size:24})},onclick:function(){Ne(e.warehouse._id),Ie(se.type===A.Wl.WAREHOUSE&&se._id===e.warehouse._id||se.type===A.Wl.ADMIN&&e.warehouse.allowAdmin),Ce(!0)},tooltip:V("offers")})]},n)}))}),(null===($=Qe.warehouses)||void 0===$?void 0:$.length)>0&&se.type===A.Wl.PHARMACY&&(0,U.jsx)(Z.Z,{headerTitle:V("warehouses"),children:Qe.warehouses.filter((function(e){return e.warehouse.city===se.city&&!0===e.warehouse.isActive})).map((function(e,n){return(0,U.jsxs)("div",{className:[H.Z.container,H.Z.without_box_shadow].join(" "),style:{padding:"0 6px"},children:[(0,U.jsx)("label",{style:{padding:"6px 0"},children:e.warehouse.name}),(0,U.jsx)(L.Z,{icon:function(){return(0,U.jsx)(O.Rtn,{size:24})},onclick:function(){Ne(e.warehouse._id),Ie(se.type===A.Wl.WAREHOUSE&&se._id===e.warehouse._id||se.type===A.Wl.ADMIN&&e.warehouse.allowAdmin),Ce(!0)},tooltip:V("offers")})]},n)}))}),Object.entries(Pe).length>0&&(0,U.jsx)("ul",{className:F,children:Object.keys(Pe).map((function(e){return Pe[e].length>0?(0,U.jsx)("li",{children:V(Pe[e])},e):null}))})]})]})}),"loading"===me&&(0,U.jsx)(b.Z,{allowCancel:!1}),"loading"===xe&&(0,U.jsx)(b.Z,{allowCancel:!1}),"loading"===pe&&(0,U.jsx)(b.Z,{allowCancel:!1}),("loading"===fe||"loading"===Fe)&&(0,U.jsx)(b.Z,{allowCancel:!1}),"succeeded"===he&&(0,U.jsx)(E.Z,{bgColor:A.wL.SUCCEEDED_COLOR,foreColor:"#fff",actionAfterTimeout:function(){X((0,_.s4)())},children:(0,U.jsx)("p",{children:V("add item succeeded")})}),"succeeded"===fe&&(0,U.jsx)(E.Z,{bgColor:A.wL.SUCCEEDED_COLOR,foreColor:"#fff",actionAfterTimeout:function(){X((0,_.uM)())},children:(0,U.jsx)("p",{children:V("update item succeeded")})}),Ye&&(0,U.jsx)(E.Z,{bgColor:A.wL.FAILED_COLOR,foreColor:"#fff",actionAfterTimeout:function(){$e("")},children:(0,U.jsx)("p",{children:V("image size must be less than")})}),je&&(0,U.jsx)(j.Z,{item:Qe,close:function(){return be(!1)}}),Ze&&(0,U.jsx)(w.Z,{token:de,item:Qe,warehouseId:Le,allowEdit:Se,close:function(){Ce(!1),Ne(""),Ie(!1)},afterUpdateOffer:nn}),He&&(0,U.jsx)(N.Z,{header:"info"===te?"update item":"add item",cancelLabel:"cancel",okLabel:"ok",closeModal:function(){Te(!1)},small:!0,okModal:function(){var e={};if(0===Qe.name.length&&(e.name="enter item trade name"),0!==Qe.price&&Qe.price||(e.price="enter price"),0!==Qe.customer_price&&Qe.customer_price||(e.customer_price="enter customer price"),0===Object.entries(e).length){if(!le)return void X((0,p.Rb)());var n=(0,i.Z)({},Qe);"new"===te?(n=(0,i.Z)((0,i.Z)({},n),{},{company:ie}),X((0,_.jX)({obj:n,token:de})).then(h.SI).then((function(e){Q.push({pathname:"/item",state:{from:ee,type:"info",allowAction:ne,itemId:e.data.item._id,companyId:ie,warehouseId:re}})})).catch((function(){}))):"info"===te&&(n=(0,i.Z)((0,i.Z)({},n),{},{_id:ae}),X((0,_.$G)({obj:n,token:de})).then((function(){Te(!1)})).catch((function(){Te(!1)})))}else Be((0,i.Z)({},e)),Te(!1)},children:"info"===te?(0,U.jsx)("p",{children:V("update item confirm msg")}):(0,U.jsx)("p",{children:V("add item confirm msg")})})]}):(0,U.jsx)(c.l_,{to:"/signin"})}},4131:function(e,n){n.Z={small_font:"row_small_font__QRZyr",container:"row_container__Y6btC",search_container:"row_search_container__+3nD0",without_box_shadow:"row_without_box_shadow__nNFVn",error:"row_error__ndRw+",align_start:"row_align_start__o1AI5",hover_underline:"row_hover_underline__cCk90",padding_start:"row_padding_start__qzXL4",padding_end:"row_padding_end__w2Kek",padding_all:"row_padding_all__qiAwy",full_width:"row_full_width__fyOgl",icon:"row_icon__nyfpJ",cart_icon:"row_cart_icon__evv2R",input:"row_input__mnhz8"}},6552:function(e,n,t){e.exports=t.p+"static/media/transparent_logo.7dc40fbb56f0f84914ce.png"}}]);
//# sourceMappingURL=1089.0e9e2618.chunk.js.map