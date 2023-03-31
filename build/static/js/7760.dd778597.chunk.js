"use strict";(self.webpackChunkpharmacy_frontend=self.webpackChunkpharmacy_frontend||[]).push([[7760],{8718:function(e,n,r){r.r(n),r.d(n,{default:function(){return D}});var a=r(2791),t=r(3168),l=r(9271),o=r(885),i=r(6030),c=r(3502),u=r(3384),s=r(6824),d=r(9363),h=r(4831),f=r(3585),x=r(3329);var m=function(e){var n=e.search,r=(0,t.$)().t,l=(0,i.I0)(),m=(0,i.v9)(c.lB),v=m.searchName,C=m.searchCity,A=(0,a.useState)(!1),p=(0,o.Z)(A,2),j=p[0],L=p[1],g=[{value:f.zx.ALL,label:r("all cities")},{value:f.zx.ALEPPO,label:r("aleppo")},{value:f.zx.DAMASCUS,label:r("damascus")},{value:f.zx.DARAA,label:r("daraa")},{value:f.zx.DEIR_EZ_ZOR,label:r("deir_ez_zor")},{value:f.zx.HAMA,label:r("hama")},{value:f.zx.AL_HASAKAH,label:r("al_hasakah")},{value:f.zx.HOMS,label:r("homs")},{value:f.zx.IDLIB,label:r("idlib")},{value:f.zx.LATAKIA,label:r("latakia")},{value:f.zx.QUNEITRA,label:r("quneitra")},{value:f.zx.RAQQA,label:r("raqqa")},{value:f.zx.AL_SUWAYDA,label:r("al_suwayda")},{value:f.zx.TARTUS,label:r("tartus")},{value:f.zx.DAMASCUS_COUNTRYSIDE,label:r("damascus_countryside")}],k=v.trim().length>0||C!==f.zx.ALL;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(s.Z,{searchAction:n,searchEngineAlert:k,children:[(0,x.jsx)(h.Z,{label:"name",id:"search-name",type:"text",value:v,onchange:function(e){l((0,c.ut)(e.target.value))},placeholder:"search by company name",resetField:function(){return l((0,c.ut)(""))}}),(0,x.jsx)(u.Z,{onclick:function(){return L(!0)},selectedValue:C,label:"city",styleForSearch:!0,withoutBorder:!0})]}),j&&(0,x.jsx)(d.Z,{headerTitle:"city",close:function(){L(!1)},values:g,defaultValue:C,chooseHandler:function(e){l((0,c.TH)(e))}})]})},v=r(3229),C=r(1650),A=r(9883),p=r(8516),j=r(7425),L=r(8820),g=r(6355),k=r(4651),O=r(4373);var Z=function(e){var n=e.refreshHandler,r=(0,t.$)().t,a=(0,l.k6)(),o=(0,i.I0)(),u=(0,i.v9)(c.lB),s=u.searchName,d=u.searchCity,h=u.displayType;return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p.Z,{children:[(0,x.jsx)(A.Z,{withBackground:!0,selected:!1,foreColor:f.wL.MAIN_COLOR,tooltip:r("refresh"),onclick:function(){n()},icon:function(){return(0,x.jsx)(j.PwW,{})}}),(s.length>0||d!==f.zx.ALL)&&(0,x.jsx)(A.Z,{withBackground:!0,selected:!1,foreColor:f.wL.MAIN_COLOR,tooltip:r("clear filter"),onclick:function(){o((0,c.ut)("")),o((0,c.TH)(f.zx.ALL))},icon:function(){return(0,x.jsx)(k.jTJ,{})}}),(0,x.jsx)(A.Z,{withBackground:!0,foreColor:"card"===h?f.wL.SUCCEEDED_COLOR:f.wL.MAIN_COLOR,tooltip:r("show as card"),onclick:function(){o((0,c.m1)("card"))},icon:function(){return(0,x.jsx)(L.sF$,{})}}),(0,x.jsx)(A.Z,{withBackground:!0,foreColor:"list"===h?f.wL.SUCCEEDED_COLOR:f.wL.MAIN_COLOR,tooltip:r("show as list"),onclick:function(){o((0,c.m1)("list"))},icon:function(){return(0,x.jsx)(g.hON,{})}}),(0,x.jsx)(A.Z,{withBackground:!0,tooltip:r("back"),onclick:function(){a.goBack()},icon:function(){return(0,x.jsx)(O.D_,{})},foreColor:f.wL.MAIN_COLOR})]})})},_=r(6886),b=r(9114),w=r(9215),z=r(3804),y=r(7875),H=r(1230),R=r(9761),E=r(3541),T=r(6201),F=r(6425),I=r(5880),S=r(9104);var D=function(e){var n=e.onSelectedChange,r=(0,t.$)().t,o=(0,l.k6)(),u=(0,i.I0)(),s=(0,i.v9)(E.tT),d=s.token,h=s.user,A=(0,i.v9)(c.zY),j=A.companies,L=A.count,g=A.status,k=(0,i.v9)(c.lB),O=k.searchName,D=k.searchCity,B=k.displayType,N=(0,i.v9)(F.VY),M=j.filter((function(e){return!(O.trim().length>0)||e.name.includes(O.trim())}));M=M.filter((function(e){return D===f.zx.ALL||e.city===D}));var U=function(){u((0,c.ap)({token:d}))};return(0,a.useEffect)((function(){window.scrollTo(0,0),n()}),[]),h?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(m,{}),(0,x.jsxs)(v.Z,{children:[(0,x.jsx)(Z,{refreshHandler:function(){u((0,T.iF)()),u((0,T._l)({token:d})),u((0,c.E5)()),U()}}),M.length>0&&(0,x.jsx)(w.Z,{label:r("companies count"),count:M.length}),"list"===B&&(0,x.jsx)(C.Z,{children:M.map((function(e){return(0,x.jsx)(H.Z,{partner:e,addPartnerToFavoriteHandler:function(){return(0,S.Vl)(e,N,u,d,h)},addCompanyToOurCompaniesHandler:function(){return(0,S.R9)(e,N,u,d)},removeCompanyFromOurCompaniesHandler:function(){(0,S.ql)(e,N,u,d)},removePartnerFromFavoriteHandler:function(){(0,S.Bd)(e,N,u,d)},partnerRowClickHandler:function(n){return(0,S.Vt)(e,n,h,u,d,o)}},e._id)}))}),"card"===B&&(0,x.jsx)(C.Z,{style:{alignItems:"stretch"},children:M.map((function(e){return(0,x.jsx)(y.Z,{partner:e,addPartnerToFavoriteHandler:function(){return(0,S.Vl)(e,N,u,d,h)},addCompanyToOurCompaniesHandler:function(){return(0,S.R9)(e,N,u,d)},removeCompanyFromOurCompaniesHandler:function(){(0,S.ql)(e,N,u,d)},removePartnerFromFavoriteHandler:function(){(0,S.Bd)(e,N,u,d)},partnerRowClickHandler:function(n){return(0,S.Vt)(e,n,h,u,d,o)}},e._id)}))}),0===M.length&&"loading"!==g&&0===O.length&&D===f.zx.ALL&&(0,x.jsx)(R.Z,{msg:r("no companies")}),0===M.length&&"loading"!==g&&(0!==O.length||D!==f.zx.ALL)&&(0,x.jsx)(R.Z,{msg:r("no result found")}),"loading"===g&&(0,x.jsx)(z.Z,{}),M.length<L&&(0,x.jsx)(p.Z,{children:(0,x.jsx)(_.Z,{text:r("more"),action:U,bgColor:f.wL.SUCCEEDED_COLOR,icon:function(){return(0,x.jsx)(I.lYW,{})}})}),M.length===L&&"loading"!==g&&0!==L&&(0,x.jsx)(b.Z,{msg:r("no more")})]})]}):(0,x.jsx)(l.l_,{to:"/signin"})}}}]);
//# sourceMappingURL=7760.dd778597.chunk.js.map