"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[960],{4351:function(e,n,t){t.r(n),t.d(n,{default:function(){return E}});var o=t(2791),r=t(3168),s=t(9271),a=t(3229),c=t(6030),l=t(3379),i=t(8838),u=t(6824),h=t(4831),d=t(6355),g=t(3585),f=t(3329),p=function(e){var n=e.handleEnterPress,t=e.keyUpHandler,o=(0,r.$)().t,s=(0,c.I0)(),a=(0,c.v9)(l.Wn).pageState,p=a.searchName.length>0||a.searchCompaniesIds.length>0||a.searchWarehousesIds.length>0;return(0,f.jsxs)(u.Z,{searchAction:n,searchEngineAlert:p,children:[(0,f.jsx)(h.Z,{label:"item name",id:"search-name",type:"text",value:a.searchName,onchange:function(e){s((0,l.$p)(e.target.value))},icon:(0,f.jsx)(d.U41,{}),placeholder:"search by name composition barcode",onEnterPress:n,resetField:function(){s((0,l.$p)(""))},onkeyup:t}),(0,f.jsx)(i.Z,{label:o("company"),partners:null===a||void 0===a?void 0:a.searchCompaniesIds,addId:l.YW,removeId:l.ok,partnerType:g.Wl.COMPANY,action:n}),(0,f.jsx)(i.Z,{label:o("warehouse"),partners:null===a||void 0===a?void 0:a.searchWarehousesIds,addId:l.PJ,removeId:l.ni,partnerType:g.Wl.WAREHOUSE,action:n})]})},m=t(6886),x=t(9114),j=t(5599),k=t(9215),C=t(3804),I=t(8516),Z=t(9761),v=t(9883),w=t(7425),y=t(4651),W=t(4373),N=t(5880),b=t(3541),A=null;var E=function(e){var n=e.onSelectedChange,t=(0,r.$)().t,i=(0,s.k6)(),u=(0,c.I0)(),h=(0,c.v9)(b.tT),d=h.token,E=h.user,O=(0,c.v9)(l.Wn),L=O.medicines,_=O.count,P=O.status,R=O.pageState,T=function(){u((0,l.Rg)({token:d}))},M=function(){u((0,l.XI)()),T()};return(0,o.useEffect)((function(){0===L.length&&(T(),window.scrollTo(0,0)),n()}),[]),!E||E.type!==g.Wl.PHARMACY&&E.type!==g.Wl.ADMIN?(0,f.jsx)(s.l_,{to:"/signin"}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(p,{handleEnterPress:M,keyUpHandler:function(e){(0,l.iX)(),A&&clearTimeout(A),A=setTimeout((function(){u((0,l.XI)()),T()}),200)}}),(0,f.jsxs)(a.Z,{children:[(0,f.jsxs)(I.Z,{children:[(0,f.jsx)(v.Z,{withBackground:!0,icon:function(){return(0,f.jsx)(w.PwW,{})},foreColor:g.wL.MAIN_COLOR,tooltip:t("refresh"),onclick:M}),(R.searchName.length>0||R.searchCompaniesIds.length>0||R.searchWarehousesIds.length>0)&&(0,f.jsx)(v.Z,{withBackground:!0,selected:!1,foreColor:g.wL.MAIN_COLOR,tooltip:t("clear filter"),onclick:function(){u((0,l.p9)()),M()},icon:function(){return(0,f.jsx)(y.jTJ,{})}}),(0,f.jsx)(v.Z,{withBackground:!0,tooltip:t("go-back"),onclick:function(){i.goBack()},icon:function(){return(0,f.jsx)(W.D_,{})},foreColor:g.wL.MAIN_COLOR})]}),_>0&&(0,f.jsx)(k.Z,{label:t("offers count"),count:_}),L.map((function(e,n){return(0,f.jsx)(j.Z,{item:e,index:n,searchString:R.searchName,type:"offer"},n)})),_>0&&"loading"!==P&&(0,f.jsx)(k.Z,{count:"".concat(L.length," / ").concat(_)}),0===L.length&&"loading"!==P&&0===R.searchName.length&&(0,f.jsx)(Z.Z,{msg:t("no offers")}),0===L.length&&"loading"!==P&&0!==R.searchName.length&&(0,f.jsx)(Z.Z,{msg:t("no result found")}),"loading"===P&&(0,f.jsx)(C.Z,{}),L.length<_&&"loading"!==P&&(0,f.jsx)(I.Z,{children:(0,f.jsx)(m.Z,{text:t("more"),action:function(){T()},bgColor:g.wL.SUCCEEDED_COLOR,icon:function(){return(0,f.jsx)(N.lYW,{})}})}),L.length===_&&"loading"!==P&&0!==_&&(0,f.jsx)(x.Z,{msg:t("no more")})]})]})}}}]);
//# sourceMappingURL=960.7057df57.chunk.js.map