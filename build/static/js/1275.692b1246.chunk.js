"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[1275],{8845:function(e,t,n){n.d(t,{Z:function(){return s}});var o=n(885),i=n(2791),r=n(9126),a={small_font:"card-info_small_font__AusTH",card:"card-info_card__VcLb9",header:"card-info_header__uTcny",expanded:"card-info_expanded__IDH-A",warning:"card-info_warning__bmiK1"},c=n(3329);var s=function(e){var t=e.headerTitle,n=e.children,s=e.type,l=(0,i.useState)(!0),d=(0,o.Z)(l,2),u=d[0],f=d[1];return(0,c.jsxs)("div",{className:[a.card,"warning"===s?a.warning:null].join(" "),children:[(0,c.jsxs)("div",{onClick:function(){return f(!u)},className:[a.header,"warning"===s?a.warning:null,u?a.expanded:null].join(" "),children:[(0,c.jsx)("p",{children:t}),(0,c.jsx)("label",{className:a.header_label,onClick:function(){return f(!u)},children:u?(0,c.jsx)(r.jnn,{}):(0,c.jsx)(r.F0C,{})})]}),u&&(0,c.jsx)("div",{children:n})]})}},1061:function(e,t,n){n.d(t,{Z:function(){return d}});n(2791);var o=n(9271),i=n(7500),r=n(4373),a=n(3585),c="header_header__MhatS",s="header_back__wgjRV",l=n(3329);var d=function(e){var t=e.children,n=(0,o.k6)();return(0,l.jsxs)("div",{className:c,children:[t,(0,l.jsx)("div",{className:s,children:(0,l.jsx)(i.Z,{onclick:function(){n.goBack()},icon:function(){return(0,l.jsx)(r.D_,{})},foreColor:a.wL.WHITE_COLOR})})]})}},3566:function(e,t,n){n.d(t,{Z:function(){return l}});n(2791);var o=n(3168),i=n(1968),r=n.n(i),a=n(3585),c="loader_loader__qZv+U",s=n(3329);var l=function(e){var t=e.color,n=(0,o.$)().t;return(0,s.jsxs)("div",{className:c,style:{color:t||a.wL.SECONDARY_COLOR},children:[(0,s.jsx)(r(),{type:"bars",height:75,width:75,color:t||a.wL.SECONDARY_COLOR}),(0,s.jsx)("p",{children:n("loading-data")})]})}},3575:function(e,t,n){n(2791);var o=n(9942),i=n(3126),r=n(3585),a=n(3329);t.Z=function(e){var t=e.msg;return(0,a.jsxs)("div",{className:[o.Z.no_content_div].join(" "),children:[(0,a.jsx)("img",{src:i,alt:"thumb",style:{width:"150px",height:"150px"}}),(0,a.jsx)("p",{style:{color:r.wL.MAIN_COLOR},children:t})]})}},1275:function(e,t,n){n.r(t),n.d(t,{default:function(){return ae}});var o=n(2791),i=n(9271),r=n(3168),a=n(6030),c=n(3541),s=n(4613),l=n(2989),d=n(6341),u=n(6527),f=n(7859),m=n(9220),h=n(6481),x=n(1061),_=n(7500),j=n(885),C=n(2982),v=n(5861),p=n(7757),g=n.n(p),O=n(4569),Z=n.n(O),w=n(8785),S=n(6425),L=n(8489),E=n(1176),b=n(3575),T=n(3566),A=n(4373),R=n(6053),y=n(4651),D={small_font:"choose-company-modal_small_font__5YnYs",search_container:"choose-company-modal_search_container__LEEok",search_input:"choose-company-modal_search_input__CHtHO",company_row:"choose-company-modal_company_row__9RA7E",data_container:"choose-company-modal_data_container__km1sk"},N=n(9942),k=n(3585),I=n(3329);var F=function(e){var t=e.data,n=e.addAction,i=(0,o.useRef)(),r=(0,a.I0)(),c=(0,a.v9)(S.VY),s=(0,o.useState)(!1),l=(0,j.Z)(s,2),d=l[0],u=l[1];return(0,o.useEffect)((function(){return function(){clearTimeout(i)}}),[]),(0,I.jsxs)("div",{className:D.company_row,children:[(0,I.jsx)("p",{className:D.company_name,children:t.name}),d?(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(y.H_P,{className:N.Z.loading,size:24})},onclick:function(){},foreColor:k.wL.SECONDARY_COLOR}):(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(R.PgY,{})},foreColor:k.wL.SUCCEEDED_COLOR,onclick:function(){c?(u(!0),n(t._id),i=setTimeout((function(){u(!1)}),15e3)):r((0,S.Rb)())}})]})},U=function(e){var t=e.close,n=e.chooseAction,i=e.url,s=(0,r.$)().t,l=(0,a.v9)(c.rK),d=(0,a.I0)(),u=(0,o.useState)(""),f=(0,j.Z)(u,2),m=f[0],h=f[1],x=(0,o.useState)([]),_=(0,j.Z)(x,2),p=_[0],O=_[1],S=(0,o.useState)(!1),R=(0,j.Z)(S,2),y=R[0],U=R[1],H=(0,o.useState)(1),P=(0,j.Z)(H,2),V=P[0],Y=P[1],K=(0,o.useState)(0),$=(0,j.Z)(K,2),z=$[0],W=$[1],M=function(){var e=(0,v.Z)(g().mark((function e(t){var n,o;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,U(!0),n="",m.trim().length>0&&(n="&name=".concat(m.trim())),e.next=6,Z().get("".concat(i,"&page=").concat(t).concat(n),{headers:{Authorization:"Bearer ".concat(l)}});case 6:o=e.sent,O(1===t?o.data.data.users:[].concat((0,C.Z)(p),(0,C.Z)(o.data.data.users))),W(o.data.count),U(!1),Y(t+1),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}(),B=function(e){d(n({id:e,token:l})).then(w.SI).then((function(){O(p.filter((function(t){return t._id!==e})))}))};return(0,o.useEffect)((function(){M(1)}),[]),(0,I.jsx)(L.Z,{header:"choose-company",cancelLabel:"cancel-label",closeModal:t,small:!0,children:y?(0,I.jsx)(T.Z,{}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)("div",{className:[D.search_container,N.Z.flex_center_container].join(" "),children:[(0,I.jsx)(A.FKI,{color:k.wL.SECONDARY_COLOR,size:24}),(0,I.jsx)("input",{className:D.search_input,placeholder:s("enter-company-name"),value:m,onChange:function(e){return h(e.target.value)},onKeyDown:function(e){"Enter"===e.code&&M(1),"Escape"!==e.code&&e.stopPropagation()}}),(0,I.jsx)(E.Z,{text:"search",action:function(){M(1)},bgColor:k.wL.SECONDARY_COLOR})]}),(0,I.jsxs)("div",{className:D.data_container,children:[(null===p||void 0===p?void 0:p.length)>0&&p.map((function(e){return(0,I.jsx)(F,{data:e,addAction:B},e._id)})),0===p.length&&0===m.length&&(0,I.jsx)(b.Z,{msg:s("search-for-company")}),0===p.length&&0!==m.length&&(0,I.jsx)(b.Z,{msg:s("search-empty")})]}),p.length<z&&(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"more",action:function(){M(V)},bgColor:k.wL.SECONDARY_COLOR})})]})})},H=n(8845),P=n(9488),V=n(7425),Y=n(4131);var K=function(e){var t=e.data,n=e.tooltip,i=e.action,c=e.type,s=(0,r.$)().t,l=(0,a.I0)(),d=(0,a.v9)(S.VY),u=(0,o.useRef)(),f=(0,o.useState)(!1),m=(0,j.Z)(f,2),h=m[0],x=m[1];return(0,o.useEffect)((function(){return function(){clearTimeout(u)}}),[]),(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{className:[Y.Z.container,Y.Z.without_box_shadow].join(" "),children:[(0,I.jsx)("label",{style:{flex:3,textAlign:"start"},className:Y.Z.padding_start,children:t.name}),"item"===c&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)("label",{style:{flex:1},children:t.caliber}),(0,I.jsx)("label",{style:{flex:1},children:t.packing})]}),(0,I.jsx)("div",{className:Y.Z.padding_end,children:h?(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(y.H_P,{className:N.Z.loading,size:24})},onclick:function(){},foreColor:k.wL.FAILED_COLOR}):(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(V.w6k,{size:20})},foreColor:k.wL.FAILED_COLOR,onclick:function(){d?(x(!0),u=setTimeout((function(){x(!1)}),15e3),i(t._id)):l((0,S.Rb)())},tooltip:s(n)})})]})})},$=n(4942),z=n(8820),W=n(71),M={small_font:"setting-section-header_small_font__XcZyi",input:"setting-section-header_input__YRPV5",error:"setting-section-header_error__aYyvA",label:"setting-section-header_label__pzVxB",value:"setting-section-header_value__3kKbB",checkbox_label:"setting-section-header_checkbox_label__zG5BO"};var B=function(e){var t=e.show,n=e.title,i=e.description,s=e.order,l=e.header,d=e.checkboxLabel,u=e.updateAction,f=e.field,m=(0,r.$)().t,h=(0,a.I0)(),x=(0,a.v9)(c.rK),C=(0,o.useState)(!1),v=(0,j.Z)(C,2),p=v[0],g=v[1],O=(0,o.useState)(t),Z=(0,j.Z)(O,2),S=Z[0],L=Z[1],E=(0,o.useState)(n),b=(0,j.Z)(E,2),T=b[0],A=b[1],R=(0,o.useState)(!1),y=(0,j.Z)(R,2),D=y[0],F=y[1],U=(0,o.useState)(i),H=(0,j.Z)(U,2),P=H[0],V=H[1],Y=(0,o.useState)(s),K=(0,j.Z)(Y,2),B=K[0],X=K[1],G=(0,o.useState)(!1),q=(0,j.Z)(G,2),Q=q[0],J=q[1];return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)("div",{className:[N.Z.flex_center_container],style:{justifyContent:"flex-start"},children:[(0,I.jsx)("h3",{style:{color:k.wL.FAILED_COLOR,paddingInlineEnd:"12px"},children:l}),p?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(W.XZG,{size:20})},foreColor:k.wL.SUCCEEDED_COLOR,onclick:function(){var e=!1;0===T.trim().length&&(F(!0),e=!0),(B<1||B>7)&&(J(!0),e=!0),e||h(u({token:x,obj:(0,$.Z)({},"".concat(f),{title:T,description:P,order:B,show:S})})).then(w.SI).then((function(){g(!1)}))}}),(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(z.LHV,{size:20})},foreColor:k.wL.FAILED_COLOR,onclick:function(){L(t),A(n),V(i),X(s),F(!1),J(!1),g(!1)}})]}):(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(z.QML,{size:20})},foreColor:k.wL.MAIN_COLOR,onclick:function(){g(!0)},tooltip:m("update-label")})]}),(0,I.jsxs)("div",{className:[N.Z.flex_center_container,N.Z.fc_secondary,N.Z.padding_v_4].join(" "),style:{justifyContent:"flex-start"},children:[(0,I.jsx)("label",{className:M.label,children:m("section-title")}),p?(0,I.jsx)("input",{className:[M.input,D?M.error:""].join(" "),value:T,onChange:function(e){return A(e.target.value)},placeholder:m("section-title-placeholder")}):(0,I.jsx)("label",{className:M.value,children:T})]}),(0,I.jsxs)("div",{className:[N.Z.flex_center_container,N.Z.fc_secondary,N.Z.padding_v_4].join(" "),style:{justifyContent:"flex-start"},children:[(0,I.jsx)("label",{className:M.label,children:m("section-description")}),p?(0,I.jsx)("input",{className:[M.input].join(" "),value:P,onChange:function(e){return V(e.target.value)},placeholder:m("section-description-placeholder")}):(0,I.jsx)("label",{className:M.value,children:P})]}),(0,I.jsxs)("div",{className:[N.Z.flex_center_container,N.Z.fc_secondary,N.Z.padding_v_4].join(" "),style:{justifyContent:"flex-start"},children:[(0,I.jsx)("label",{className:M.label,children:m("section-order")}),p?(0,I.jsx)(I.Fragment,{children:(0,I.jsx)("input",{value:B,onKeyPress:k.I0,onChange:function(e){var t=Number.parseInt((0,k.F8)(e.target.value));X(isNaN(t)?"":t)},className:[M.input,Q?M.error:""].join(" "),placeholder:m("section-order-placeholder")})}):(0,I.jsx)("label",{className:M.value,children:B})]}),(0,I.jsxs)("div",{className:[N.Z.flex_center_container,N.Z.fc_secondary].join(" "),style:{justifyContent:"flex-start"},children:[(0,I.jsx)("input",{type:"checkbox",value:S,checked:S,disabled:!p,onChange:function(){return L(!S)}}),(0,I.jsx)("label",{className:M.checkbox_label,children:m(d)})]})]})};var X=function(){var e=(0,r.$)().t,t=(0,a.v9)(c.rK),n=(0,a.I0)(),i=(0,a.v9)(s.$M),l=i.companiesSectionOne,d=i.companiesSectionOneStatus,u=i.addCompanyToSectionOneStatus,f=i.removeCompanyFromSectionOneStatus,m=i.addCompanyToSectionOneError,x=i.removeCompanyFromSectionOneError,_=(0,a.v9)(h.vi).settings.companiesSectionOne,C=_.show,v=_.title,p=_.description,g=_.order,O=_.titleRight,Z=(0,o.useState)(!1),w=(0,j.Z)(Z,2),S=w[0],L=w[1],b=function(e){n((0,s.Fw)({id:e,token:t}))};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(B,{show:C,title:v,description:p,order:g,titleRight:O,header:"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0627\u0648\u0644 / \u0634\u0631\u0643\u0627\u062a /",checkboxLabel:"show-section-one-companies-in-home-page",updateAction:h.VP,field:"companiesSectionOne"}),(0,I.jsx)(H.Z,{headerTitle:e("section-one-companies"),children:"loading"===d?(0,I.jsx)(T.Z,{}):(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{children:[l.map((function(e){return(0,I.jsx)(K,{data:e,action:b},e._id)})),(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"add-label",action:function(){L(!0)},bgColor:k.wL.SUCCEEDED_COLOR})})]})})}),S&&(0,I.jsx)(U,{close:function(){return L(!1)},chooseAction:s.N2,url:"".concat(k.Hc,"/users?limit=15&isActive=true&type=company&inSectionOne=false")}),"succeeded"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("company-added"),actionAfterTimeout:function(){return n((0,s.S2)())}}),"failed"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(m),actionAfterTimeout:function(){return n((0,s.S2)())}}),"succeeded"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("company-removed"),actionAfterTimeout:function(){return n((0,s.Wd)())}}),"failed"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(x),actionAfterTimeout:function(){return n((0,s.Wd)())}})]})};var G=function(){var e=(0,r.$)().t,t=(0,a.v9)(c.rK),n=(0,a.I0)(),i=(0,a.v9)(l.lB),s=i.companiesSectionTwo,d=i.companiesSectionTwoStatus,u=i.addCompanyToSectionTwoStatus,f=i.removeCompanyFromSectionTwoStatus,m=i.addCompanyToSectionTwoError,x=i.removeCompanyFromSectionTwoError,_=(0,a.v9)(h.vi).settings.companiesSectionTwo,C=_.show,v=_.title,p=_.description,g=_.order,O=(0,o.useState)(!1),Z=(0,j.Z)(O,2),w=Z[0],S=Z[1],L=function(e){n((0,l.C9)({id:e,token:t}))};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(B,{show:C,title:v,description:p,order:g,header:"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062b\u0627\u0646\u064a / \u0634\u0631\u0643\u0627\u062a /",checkboxLabel:"show-section-two-companies-in-home-page",updateAction:h.VP,field:"companiesSectionTwo"}),(0,I.jsx)(H.Z,{headerTitle:e("section-two-companies"),children:"loading"===d?(0,I.jsx)(T.Z,{}):(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{children:[s.map((function(e){return(0,I.jsx)(K,{data:e,action:L},e._id)})),(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"add-label",action:function(){S(!0)},bgColor:k.wL.SUCCEEDED_COLOR})})]})})}),w&&(0,I.jsx)(U,{close:function(){return S(!1)},chooseAction:l.eV,url:"".concat(k.Hc,"/users?limit=15&isActive=true&type=company&inSectionTwo=false")}),"succeeded"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("company-added"),actionAfterTimeout:function(){return n((0,l.aE)())}}),"failed"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(m),actionAfterTimeout:function(){return n((0,l.aE)())}}),"succeeded"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("company-removed"),actionAfterTimeout:function(){return n((0,l.As)())}}),"failed"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(x),actionAfterTimeout:function(){return n((0,l.As)())}})]})},q={small_font:"choose-item-modal_small_font__fH0jm",search_container:"choose-item-modal_search_container__KStNN",search_input:"choose-item-modal_search_input__rfCu4",item_row:"choose-item-modal_item_row__mmTpP",item_name:"choose-item-modal_item_name__j0LDx",small:"choose-item-modal_small__gOmtc"};var Q=function(e){var t=e.data,n=e.addAction,i=(0,o.useRef)(),r=(0,a.I0)(),c=(0,a.v9)(S.VY),s=(0,o.useState)(!1),l=(0,j.Z)(s,2),d=l[0],u=l[1];return(0,o.useEffect)((function(){return function(){clearTimeout(i)}}),[]),(0,I.jsxs)("div",{className:q.item_row,children:[(0,I.jsx)("p",{className:q.item_name,children:t.name}),(0,I.jsx)("p",{className:[q.small].join(" "),children:t.caliber}),(0,I.jsx)("p",{className:[q.small].join(" "),children:t.packing}),d?(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(y.H_P,{className:N.Z.loading,size:24})},onclick:function(){},foreColor:k.wL.SECONDARY_COLOR}):(0,I.jsx)(_.Z,{icon:function(){return(0,I.jsx)(R.PgY,{})},foreColor:k.wL.SUCCEEDED_COLOR,onclick:function(){c?(u(!0),n(t._id),i=setTimeout((function(){u(!1)}),15e3)):r((0,S.Rb)())}})]})},J=function(e){var t=e.close,n=e.chooseAction,i=e.url,s=(0,r.$)().t,l=(0,a.v9)(c.rK),d=(0,a.I0)(),u=(0,o.useState)(""),f=(0,j.Z)(u,2),m=f[0],h=f[1],x=(0,o.useState)([]),_=(0,j.Z)(x,2),p=_[0],O=_[1],S=(0,o.useState)(!1),R=(0,j.Z)(S,2),y=R[0],D=R[1],F=(0,o.useState)(1),U=(0,j.Z)(F,2),H=U[0],P=U[1],V=(0,o.useState)(0),Y=(0,j.Z)(V,2),K=Y[0],$=Y[1],z=function(){var e=(0,v.Z)(g().mark((function e(t){var n,o;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,D(!0),n="",m.trim().length>0&&(n="&itemName=".concat(m.trim())),e.next=6,Z().get("".concat(i,"&page=").concat(t).concat(n),{headers:{Authorization:"Bearer ".concat(l)}});case 6:o=e.sent,O(1===t?o.data.data.items:[].concat((0,C.Z)(p),(0,C.Z)(o.data.data.items))),$(o.data.count),D(!1),P(t+1),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}(),W=function(e){d(n({id:e,token:l})).then(w.SI).then((function(){O(p.filter((function(t){return t._id!==e})))}))};return(0,o.useEffect)((function(){z(1)}),[]),(0,I.jsx)(L.Z,{header:"choose-item",cancelLabel:"cancel-label",closeModal:t,small:!0,children:y?(0,I.jsx)(T.Z,{}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)("div",{className:[q.search_container,N.Z.flex_center_container].join(" "),children:[(0,I.jsx)(A.FKI,{color:k.wL.SECONDARY_COLOR,size:24}),(0,I.jsx)("input",{className:q.search_input,placeholder:s("enter-item-trade-name"),value:m,onChange:function(e){return h(e.target.value)},onKeyDown:function(e){"Enter"===e.code&&z(1),"Escape"!==e.code&&e.stopPropagation()}}),(0,I.jsx)(E.Z,{text:"search",action:function(){z(1)},bgColor:k.wL.SECONDARY_COLOR})]}),(0,I.jsxs)("div",{style:{maxHeight:"300px",overflow:"auto"},children:[(null===p||void 0===p?void 0:p.length)>0&&p.map((function(e){return(0,I.jsx)(Q,{data:e,addAction:W},e._id)})),0===p.length&&0===m.length&&(0,I.jsx)(b.Z,{msg:s("search-for-item")}),0===p.length&&0!==m.length&&(0,I.jsx)(b.Z,{msg:s("search-empty")})]}),p.length<K&&(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"more",action:function(){z(H)},bgColor:k.wL.SECONDARY_COLOR})})]})})};var ee=function(){var e=(0,r.$)().t,t=(0,a.v9)(c.rK),n=(0,a.I0)(),i=(0,a.v9)(f.li),s=i.itemsSectionThree,l=i.itemsSectionThreeStatus,d=i.addItemToSectionThreeStatus,u=i.removeItemFromSectionThreeStatus,m=i.addItemToSectionThreeError,x=i.removeItemFromSectionThreeError,_=(0,a.v9)(h.vi).settings.itemsSectionThree,C=_.show,v=_.title,p=_.description,g=_.order,O=_.titleRight,Z=(0,o.useState)(!1),w=(0,j.Z)(Z,2),S=w[0],L=w[1],b=function(e){n((0,f.pv)({id:e,token:t}))};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(B,{show:C,title:v,description:p,order:g,titleRight:O,header:"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062b\u0627\u0644\u062b / \u0623\u062f\u0648\u064a\u0629 /",checkboxLabel:"show-section-three-items-in-home-page",updateAction:h.VP,field:"itemsSectionThree"}),(0,I.jsx)(H.Z,{headerTitle:e("section-three-items"),children:"loading"===l?(0,I.jsx)(T.Z,{}):(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{children:[s.map((function(e){return(0,I.jsx)(K,{data:e,action:b,type:"item"},e._id)})),(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"add-label",action:function(){L(!0)},bgColor:k.wL.SUCCEEDED_COLOR})})]})})}),S&&(0,I.jsx)(J,{close:function(){return L(!1)},chooseAction:f.OQ,url:"".concat(k.Hc,"/items?limit=15&isActive=true&inSectionThree=false")}),"succeeded"===d&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("item-added"),actionAfterTimeout:function(){return n((0,f.kg)())}}),"failed"===d&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(m),actionAfterTimeout:function(){return n((0,f.kg)())}}),"succeeded"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("item-removed"),actionAfterTimeout:function(){return n((0,f.gS)())}}),"failed"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(x),actionAfterTimeout:function(){return n((0,f.gS)())}})]})};var te=function(){var e=(0,r.$)().t,t=(0,a.v9)(c.rK),n=(0,a.I0)(),i=(0,a.v9)(d.Ns),s=i.itemsSectionOne,l=i.itemsSectionOneStatus,u=i.addItemToSectionOneStatus,f=i.removeItemFromSectionOneStatus,m=i.addItemToSectionOneError,x=i.removeItemFromSectionOneError,_=(0,a.v9)(h.vi).settings.itemsSectionOne,C=_.show,v=_.title,p=_.description,g=_.order,O=_.titleRight,Z=(0,o.useState)(!1),w=(0,j.Z)(Z,2),S=w[0],L=w[1],b=function(e){n((0,d.Uk)({id:e,token:t}))};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(B,{show:C,title:v,description:p,order:g,titleRight:O,header:"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0627\u0648\u0644 / \u0623\u062f\u0648\u064a\u0629 /",checkboxLabel:"show-section-one-items-in-home-page",updateAction:h.VP,field:"itemsSectionOne"}),(0,I.jsx)(H.Z,{headerTitle:e("section-one-items"),children:"loading"===l?(0,I.jsx)(T.Z,{}):(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{children:[s.map((function(e){return(0,I.jsx)(K,{data:e,action:b,type:"item"},e._id)})),(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"add-label",action:function(){L(!0)},bgColor:k.wL.SUCCEEDED_COLOR})})]})})}),S&&(0,I.jsx)(J,{close:function(){return L(!1)},chooseAction:d.Hj,url:"".concat(k.Hc,"/items?limit=15&isActive=true&inSectionOne=false")}),"succeeded"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("item-added"),actionAfterTimeout:function(){return n((0,d.Zb)())}}),"failed"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(m),actionAfterTimeout:function(){return n((0,d.Zb)())}}),"succeeded"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("item-removed"),actionAfterTimeout:function(){return n((0,d.IG)())}}),"failed"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(x),actionAfterTimeout:function(){return n((0,d.IG)())}})]})};var ne=function(){var e=(0,r.$)().t,t=(0,a.v9)(c.rK),n=(0,a.I0)(),i=(0,a.v9)(u.q8),s=i.itemsSectionTwo,l=i.itemsSectionTwoStatus,d=i.addItemToSectionTwoStatus,f=i.removeItemFromSectionTwoStatus,m=i.addItemToSectionTwoError,x=i.removeItemFromSectionTwoError,_=(0,a.v9)(h.vi).settings.itemsSectionTwo,C=_.show,v=_.title,p=_.description,g=_.order,O=_.titleRight,Z=(0,o.useState)(!1),w=(0,j.Z)(Z,2),S=w[0],L=w[1],b=function(e){n((0,u.no)({id:e,token:t}))};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(B,{show:C,title:v,description:p,order:g,titleRight:O,header:"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062b\u0627\u0646\u064a / \u0623\u062f\u0648\u064a\u0629 /",checkboxLabel:"show-section-two-items-in-home-page",updateAction:h.VP,field:"itemsSectionTwo"}),(0,I.jsx)(H.Z,{headerTitle:e("section-two-items"),children:"loading"===l?(0,I.jsx)(T.Z,{}):(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{children:[s.map((function(e){return(0,I.jsx)(K,{data:e,action:b,type:"item"},e._id)})),(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"add-label",action:function(){L(!0)},bgColor:k.wL.SUCCEEDED_COLOR})})]})})}),S&&(0,I.jsx)(J,{close:function(){return L(!1)},chooseAction:u.V,url:"".concat(k.Hc,"/items?limit=15&isActive=true&inSectionTwo=false")}),"succeeded"===d&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("item-added"),actionAfterTimeout:function(){return n((0,u.t9)())}}),"failed"===d&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(m),actionAfterTimeout:function(){return n((0,u.t9)())}}),"succeeded"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("item-removed"),actionAfterTimeout:function(){return n((0,u.nD)())}}),"failed"===f&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(x),actionAfterTimeout:function(){return n((0,u.nD)())}})]})};var oe=function(){var e=(0,r.$)().t,t=(0,a.v9)(c.rK),n=(0,a.I0)(),i=(0,a.v9)(m.p),s=i.warehousesSectionOne,l=i.warehousesSectionOneStatus,d=i.addWarehouseToSectionOneStatus,u=i.removeWarehouseFromSectionOneStatus,f=i.addWarehouseToSectionOneError,x=i.removeWarehouseFromSectionOneError,_=(0,a.v9)(h.vi).settings.warehousesSectionOne,C=_.show,v=_.title,p=_.description,g=_.order,O=_.titleRight,Z=(0,o.useState)(!1),w=(0,j.Z)(Z,2),S=w[0],L=w[1],b=function(e){n((0,m.uH)({id:e,token:t}))};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(B,{show:C,title:v,description:p,order:g,titleRight:O,header:e("section-one-warehouses"),checkboxLabel:"show-section-one-warehouses-in-home-page",updateAction:h.VP,field:"warehousesSectionOne"}),(0,I.jsx)(H.Z,{headerTitle:e("section-one-warehouses"),children:"loading"===l?(0,I.jsx)(T.Z,{}):(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{children:[s.map((function(e){return(0,I.jsx)(K,{data:e,action:b},e._id)})),(0,I.jsx)("div",{className:N.Z.padding_v_6,children:(0,I.jsx)(E.Z,{text:"add-label",action:function(){L(!0)},bgColor:k.wL.SUCCEEDED_COLOR})})]})})}),S&&(0,I.jsx)(U,{close:function(){return L(!1)},chooseAction:m.Tw,url:"".concat(k.Hc,"/users?limit=15&isActive=true&type=warehouse&inSectionOne=false")}),"succeeded"===d&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("company-added"),actionAfterTimeout:function(){return n((0,m.dX)())}}),"failed"===d&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(f),actionAfterTimeout:function(){return n((0,m.dX)())}}),"succeeded"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.SUCCEEDED_COLOR,foreColor:"#fff",toastText:e("company-removed"),actionAfterTimeout:function(){return n((0,m.XA)())}}),"failed"===u&&(0,I.jsx)(P.Z,{bgColor:k.wL.FAILED_COLOR,foreColor:"#fff",toastText:e(x),actionAfterTimeout:function(){return n((0,m.XA)())}})]})};var ie=function(e){var t=e.value,n=e.action,o=e.label;return(0,I.jsxs)("div",{className:[N.Z.flex_center_container,N.Z.fc_secondary].join(" "),style:{justifyContent:"start"},children:[(0,I.jsx)("input",{type:"checkbox",value:t,checked:t,onChange:n}),(0,I.jsx)("label",{style:{padding:"0 10px"},children:o})]})},re=n(2541);var ae=function(e){var t=e.onSelectedChange,n=(0,r.$)().t,j=(0,a.I0)(),C=(0,a.v9)(h.vi).status,v=(0,a.v9)(c.tT),p=v.user,g=v.token,O=(0,a.v9)(h.vi).settings,Z=O.showWarehouseItem,w=O.showAdvertisements,S=O.saveOrders;return(0,o.useEffect)((function(){window.scrollTo(0,0),t()}),[]),p&&p.type===k.Wl.ADMIN?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(x.Z,{children:[(0,I.jsx)("h2",{children:n("nav-settings")}),(0,I.jsx)("div",{className:N.Z.refresh_icon,children:(0,I.jsx)(_.Z,{selected:!1,foreColor:k.wL.WHITE_COLOR,tooltip:n("refresh-tooltip"),onclick:function(){j((0,s.cR)({token:g})),j((0,l.q$)({token:g})),j((0,d.ZC)({token:g})),j((0,u.dU)({token:g})),j((0,f.Nf)({token:g})),j((0,m.cn)({token:g}))},icon:function(){return(0,I.jsx)(V.PwW,{})}})})]}),(0,I.jsxs)("div",{className:N.Z.container_with_header,children:[(0,I.jsx)(X,{}),(0,I.jsx)(G,{}),(0,I.jsx)(oe,{}),(0,I.jsx)(te,{}),(0,I.jsx)(ne,{}),(0,I.jsx)(ee,{}),(0,I.jsx)("div",{children:(0,I.jsx)("h3",{style:{color:k.wL.FAILED_COLOR},children:n("general-settings")})}),(0,I.jsx)(ie,{label:n("show-warehouse-items-permission"),value:Z,action:function(){return j((0,h.VP)({token:g,obj:{showWarehouseItem:!Z}}))}}),(0,I.jsx)(ie,{label:n("show-advertisement-on-home-page"),value:w,action:function(){return j((0,h.VP)({token:g,obj:{showAdvertisements:!w}}))}}),(0,I.jsx)(ie,{label:n("save-orders-in-database-permission"),value:S,action:function(){return j((0,h.VP)({token:g,obj:{saveOrders:!S}}))}})]}),"loading"===C&&(0,I.jsx)(re.Z,{})]}):(0,I.jsx)(i.l_,{to:"/signin"})}},3126:function(e,t,n){e.exports=n.p+"static/media/no-content.577bb836915173c305ce.jpeg"}}]);
//# sourceMappingURL=1275.692b1246.chunk.js.map