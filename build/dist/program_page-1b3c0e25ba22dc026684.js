(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{DaGC:function(e,t){$("[data-delete-pinned-report]").click(function(e){e.preventDefault();var t=$(this).data("deletePinnedReport"),r=$(this).closest(".pinned-report");window.confirm(gettext("Warning: This action cannot be undone. Are you sure you want to delete this pinned report?"))&&$.ajax({type:"POST",url:jsContext.delete_pinned_report_url,data:{pinned_report_id:t},success:function(){r.remove()}})})},LBcr:function(e,t,r){"use strict";r.d(t,"a",function(){return o}),r.d(t,"b",function(){return l}),r.d(t,"c",function(){return c});var a=window.userLang,n="numeric",i={year:n,month:"short",day:n};function o(e){return new Date(e)}function l(e){var t=e.split("-").map(function(e){return parseInt(e)});return new Date(t[0],t[1]-1,t[2])}function c(e){return new Intl.DateTimeFormat(a,i).format(e)}},aJgA:function(e,t,r){"use strict";r.r(t);var a,n,i,o,l,c,s,d,u=r("q1tI"),I=r.n(u),p=r("i8i4"),g=r.n(p),m=r("qtBC"),f=r("wgi2"),h=r("0pHI"),y=r("TSYQ"),w=r.n(y),b=r("okNM"),v=r("7O5W"),_=r("IP2g"),E=r("wHSu"),T=r("2vnA");function k(e,t,r,a){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(a):void 0})}function N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function x(e,t,r){return t&&O(e.prototype,t),r&&O(e,r),e}function S(r,a,e,t,n){var i={};return Object.keys(t).forEach(function(e){i[e]=t[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=e.slice().reverse().reduce(function(e,t){return t(r,a,e)||e},i),n&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(n):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(r,a,i),i=null),i}var j,C,R,L=Object.freeze({noFilter:0,missingTarget:1,missingResults:2,missingEvidence:3,aboveTarget:5,belowTarget:6,onTarget:7}),P=(n=S((a=function(){function t(e){N(this,t),k(this,"indicators",n,this),this.indicators=e,this.updateIndicator=this.updateIndicator.bind(this),this.removeIndicator=this.removeIndicator.bind(this),this.filterIndicators=this.filterIndicators.bind(this)}return x(t,[{key:"updateIndicator",value:function(t){var e=this.indicators.findIndex(function(e){return e.id===t.id});-1<e&&(this.indicators[e]=t)}},{key:"removeIndicator",value:function(t){this.indicators=this.indicators.filter(function(e){return e.id!=t})}},{key:"filterIndicators",value:function(e){var t;switch(e){case L.missingTarget:t=this.getIndicatorsNeedingTargets;break;case L.missingResults:t=this.getIndicatorsNeedingResults;break;case L.missingEvidence:t=this.getIndicatorsNeedingEvidence;break;case L.aboveTarget:t=this.getIndicatorsAboveTarget;break;case L.belowTarget:t=this.getIndicatorsBelowTarget;break;case L.onTarget:t=this.getIndicatorsOnTarget;break;case L.noFilter:default:t=this.indicators}return t}},{key:"getIndicatorsNeedingTargets",get:function(){return this.indicators.filter(function(e){return 0===e.all_targets_defined})}},{key:"getIndicatorsNeedingResults",get:function(){return this.indicators.filter(function(e){return 0===e.results_count})}},{key:"getIndicatorsNeedingEvidence",get:function(){return this.indicators.filter(function(e){return e.results_count!==e.results_with_evidence_count})}},{key:"getIndicatorsNotReporting",get:function(){return this.indicators.filter(function(e){return null===e.over_under})}},{key:"getIndicatorsAboveTarget",get:function(){return this.indicators.filter(function(e){return 0<e.over_under})}},{key:"getIndicatorsBelowTarget",get:function(){return this.indicators.filter(function(e){return e.over_under<0})}},{key:"getIndicatorsOnTarget",get:function(){return this.indicators.filter(function(e){return 0===e.over_under})}},{key:"getIndicatorsReporting",get:function(){return this.indicators.filter(function(e){return!0===e.reporting})}},{key:"getTotalResultsCount",get:function(){return this.indicators.reduce(function(e,t){return e+t.results_count},0)}},{key:"getTotalResultsWithEvidenceCount",get:function(){return this.indicators.reduce(function(e,t){return e+t.results_with_evidence_count},0)}}]),t}()).prototype,"indicators",[T.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),S(a.prototype,"updateIndicator",[T.d],Object.getOwnPropertyDescriptor(a.prototype,"updateIndicator"),a.prototype),S(a.prototype,"removeIndicator",[T.d],Object.getOwnPropertyDescriptor(a.prototype,"removeIndicator"),a.prototype),S(a.prototype,"getIndicatorsNeedingTargets",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsNeedingTargets"),a.prototype),S(a.prototype,"getIndicatorsNeedingResults",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsNeedingResults"),a.prototype),S(a.prototype,"getIndicatorsNeedingEvidence",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsNeedingEvidence"),a.prototype),S(a.prototype,"getIndicatorsNotReporting",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsNotReporting"),a.prototype),S(a.prototype,"getIndicatorsAboveTarget",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsAboveTarget"),a.prototype),S(a.prototype,"getIndicatorsBelowTarget",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsBelowTarget"),a.prototype),S(a.prototype,"getIndicatorsOnTarget",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsOnTarget"),a.prototype),S(a.prototype,"getIndicatorsReporting",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getIndicatorsReporting"),a.prototype),S(a.prototype,"getTotalResultsCount",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getTotalResultsCount"),a.prototype),S(a.prototype,"getTotalResultsWithEvidenceCount",[T.e],Object.getOwnPropertyDescriptor(a.prototype,"getTotalResultsWithEvidenceCount"),a.prototype),a),M=(o=S((i=function(){function r(e,t){N(this,r),this.indicatorStore=void 0,k(this,"program",o,this),k(this,"resultsMap",l,this),this.indicatorStore=new P(e),this.program=t,this.addResultsHTML=this.addResultsHTML.bind(this),this.deleteResultsHTML=this.deleteResultsHTML.bind(this)}return x(r,[{key:"addResultsHTML",value:function(e,t){this.resultsMap.set(parseInt(e),t)}},{key:"deleteResultsHTML",value:function(e){this.resultsMap.delete(e)}},{key:"deleteAllResultsHTML",value:function(){this.resultsMap.clear()}}]),r}()).prototype,"program",[T.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),l=S(i.prototype,"resultsMap",[T.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),S(i.prototype,"addResultsHTML",[T.d],Object.getOwnPropertyDescriptor(i.prototype,"addResultsHTML"),i.prototype),S(i.prototype,"deleteResultsHTML",[T.d],Object.getOwnPropertyDescriptor(i.prototype,"deleteResultsHTML"),i.prototype),S(i.prototype,"deleteAllResultsHTML",[T.d],Object.getOwnPropertyDescriptor(i.prototype,"deleteAllResultsHTML"),i.prototype),i),F=(s=S((c=function(){function e(){N(this,e),k(this,"currentIndicatorFilter",s,this),k(this,"selectedIndicatorId",d,this),this.setIndicatorFilter=this.setIndicatorFilter.bind(this),this.clearIndicatorFilter=this.clearIndicatorFilter.bind(this),this.setSelectedIndicatorId=this.setSelectedIndicatorId.bind(this)}return x(e,[{key:"setIndicatorFilter",value:function(e){this.currentIndicatorFilter=e}},{key:"clearIndicatorFilter",value:function(){this.currentIndicatorFilter=null}},{key:"setSelectedIndicatorId",value:function(e){this.selectedIndicatorId=e}}]),e}()).prototype,"currentIndicatorFilter",[T.l],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),d=S(c.prototype,"selectedIndicatorId",[T.l],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),S(c.prototype,"setIndicatorFilter",[T.d],Object.getOwnPropertyDescriptor(c.prototype,"setIndicatorFilter"),c.prototype),S(c.prototype,"clearIndicatorFilter",[T.d],Object.getOwnPropertyDescriptor(c.prototype,"clearIndicatorFilter"),c.prototype),S(c.prototype,"setSelectedIndicatorId",[T.d],Object.getOwnPropertyDescriptor(c.prototype,"setSelectedIndicatorId"),c.prototype),c),D=r("y2Vs");function A(e){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function B(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function z(e,t,r){return t&&B(e.prototype,t),r&&B(e,r),e}function q(e,t){return!t||"object"!==A(t)&&"function"!=typeof t?J(e):t}function J(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function U(e){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function W(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&G(e,t)}function G(e,t){return(G=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}v.b.add(E.a,E.b);var K,V,Y=Object(b.a)(j=function(e){function r(e){var t;return H(this,r),(t=q(this,U(r).call(this,e))).onShowAllClick=function(e){e.preventDefault(),m.a.emit("nav-clear-all-indicator-filters")},t}return W(r,I.a.Component),z(r,[{key:"render",value:function(){var e=this.props,t=e.indicatorCount,r=e.programId,a=e.currentIndicatorFilter,n=e.filterApplied,i=e.readonly;return I.a.createElement("div",{className:"indicators-list__header"},I.a.createElement("h3",{className:"no-bold"},I.a.createElement("span",{id:"indicators-list-title"},function(e,t){var r;switch(e){case L.missingTarget:return r=ngettext("%s indicator has missing targets","%s indicators have missing targets",t),interpolate(r,[t]);case L.missingResults:return r=ngettext("%s indicator has missing results","%s indicators have missing results",t),interpolate(r,[t]);case L.missingEvidence:return r=ngettext("%s indicator has missing evidence","%s indicators have missing evidence",t),interpolate(r,[t]);case L.aboveTarget:return r=ngettext("%s indicator is >15% above target","%s indicators are >15% above target",t),interpolate(r,[t]);case L.belowTarget:return r=ngettext("%s indicator is >15% below target","%s indicators are >15% below target",t),interpolate(r,[t]);case L.onTarget:return r=ngettext("%s indicator is on track","%s indicators are on track",t),interpolate(r,[t]);default:return r=ngettext("%s indicator","%s indicators",t),interpolate(r,[t])}}(a,t)," "),n&&I.a.createElement("a",{href:"#",id:"show-all-indicators",onClick:this.onShowAllClick},I.a.createElement("small",null,"Show all"))),I.a.createElement("div",null,!i&&I.a.createElement("a",{href:"/indicators/indicator_create/".concat(r),role:"button",className:"btn-link btn-add"},I.a.createElement("i",{className:"fas fa-plus-circle"})," ",gettext("Add indicator"))))}}]),r}())||j,Q=Object(b.a)(C=function(e){function i(){var e,t;H(this,i);for(var r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];return(t=q(this,(e=U(i)).call.apply(e,[this].concat(a)))).onSelection=function(e){var t=e?e.value:null;t&&m.a.emit("nav-select-indicator-to-filter",t)},t}return W(i,I.a.Component),z(i,[{key:"render",value:function(){var e=this.props.rootStore.indicatorStore.indicators,t=this.props.uiStore.selectedIndicatorId,r=e.map(function(e){return{value:e.id,label:e.name}}),a=null;return t&&(a=r.find(function(e){return e.value===t})),I.a.createElement("nav",{className:"list__filters list__filters--inline-label",id:"id_div_indicators"},I.a.createElement("label",{className:"filters__label"},gettext("Find an indicator:")),I.a.createElement("div",{className:"filters__control"},I.a.createElement(D.default,{options:r,value:a,isClearable:!1,placeholder:gettext("None"),onChange:this.onSelection})))}}]),i}())||C,X=Object(b.a)(R=function(e){function r(e){var t;return H(this,r),(t=q(this,U(r).call(this,e))).onIndicatorUpdateClick=t.onIndicatorUpdateClick.bind(J(J(t))),t.onIndicatorResultsToggleClick=t.onIndicatorResultsToggleClick.bind(J(J(t))),t}return W(r,I.a.Component),z(r,[{key:"onIndicatorUpdateClick",value:function(e,t){e.preventDefault(),m.a.emit("open-indicator-update-modal",t)}},{key:"onIndicatorResultsToggleClick",value:function(e,t){e.preventDefault(),this.props.resultsMap.has(t)?m.a.emit("delete-indicator-results",t):m.a.emit("load-indicator-results",t)}},{key:"render",value:function(){var n=this,e=this.props.indicators,t=this.props.program,i=new Date(t.reporting_period_end),o=this.props.resultsMap;return I.a.createElement("table",{className:"table indicators-list"},I.a.createElement("thead",null,I.a.createElement("tr",{className:"table-header"},I.a.createElement("th",{className:"",id:"id_indicator_name_col_header"},gettext("Indicator")),I.a.createElement("th",{className:"",id:"id_indicator_buttons_col_header"}," "),I.a.createElement("th",{className:"",id:"id_indicator_level_col_header"},gettext("Level")),I.a.createElement("th",{className:"",id:"id_indicator_unit_col_header"},gettext("Unit of measure")),I.a.createElement("th",{className:"text-right",id:"id_indicator_baseline_col_header"},gettext("Baseline")),I.a.createElement("th",{className:"text-right",id:"id_indicator_target_col_header"},gettext("Target")))),I.a.createElement("tbody",null,e.map(function(t){var e=o.has(t.id),r=o.get(t.id),a=t.target_period_last_end_date?new Date(t.target_period_last_end_date):null;return I.a.createElement(I.a.Fragment,{key:t.id},I.a.createElement("tr",{className:w()("indicators-list__row","indicators-list__indicator-header",{"is-highlighted":t.just_created,"is-expanded":e})},I.a.createElement("td",null,I.a.createElement("a",{href:"#",className:"indicator_results_toggle",onClick:function(e){return n.onIndicatorResultsToggleClick(e,t.id)}},I.a.createElement(_.a,{icon:e?"caret-down":"caret-right"}),I.a.createElement("strong",null,t.number)," ",I.a.createElement("span",{className:"indicator_name"},t.name)),t.key_performance_indicator&&I.a.createElement("span",{className:"badge"},"KPI"),a&&a<i&&I.a.createElement("a",{href:"/indicators/indicator_update/".concat(t.id,"/"),className:"indicator-link color-red missing_targets","data-toggle":"modal","data-target":"#indicator_modal_div","data-tab":"targets"},I.a.createElement("i",{className:"fas fa-bullseye"})," Missing targets")),I.a.createElement("td",null,I.a.createElement("a",{href:"#",className:"indicator-link",onClick:function(e){return n.onIndicatorUpdateClick(e,t.id)}},I.a.createElement("i",{className:"fas fa-cog"}))),I.a.createElement("td",null,t.level?t.level.name:""),I.a.createElement("td",null,t.unit_of_measure),I.a.createElement("td",{className:"text-right"},t.baseline_display),I.a.createElement("td",{className:"text-right"},t.lop_target_display)),e&&I.a.createElement("tr",{className:"indicators-list__row indicators-list__indicator-body"},I.a.createElement("td",{colSpan:"6",ref:function(e){return $(e).find('[data-toggle="popover"]').popover({html:!0})}},I.a.createElement("div",{dangerouslySetInnerHTML:{__html:r}}))))})))}}]),r}())||R,Z=Object(b.a)(function(e){var t=e.rootStore.program,r=e.rootStore.indicatorStore,a=e.rootStore.resultsMap,n=e.uiStore.currentIndicatorFilter,i=e.uiStore.selectedIndicatorId,o=r.filterIndicators(n);return i&&(o=o.filter(function(e){return e.id==i})),I.a.createElement(I.a.Fragment,null,I.a.createElement(Y,{indicatorCount:o.length,programId:t.id,currentIndicatorFilter:n,filterApplied:n||i,readonly:e.readonly}),I.a.createElement(Q,{uiStore:e.uiStore,rootStore:e.rootStore}),t.does_it_need_additional_target_periods&&I.a.createElement("div",{id:"id_missing_targets_msg",className:"color-red"},I.a.createElement("i",{className:"fas fa-bullseye"})," ",gettext("Some indicators have missing targets. To enter these values, click the target icon near the indicator name.")),I.a.createElement(X,{indicators:o,resultsMap:a,program:t}))}),ee=r("LBcr");function te(){return(te=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function re(e){return(re="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ae(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function ne(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ie(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function oe(e,t,r){return t&&ie(e.prototype,t),r&&ie(e,r),e}function le(e,t){return!t||"object"!==re(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function ce(e){return(ce=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function se(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&de(e,t)}function de(e,t){return(de=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ue=Object(b.a)(K=function(e){function i(){var e,t;ne(this,i);for(var r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];return(t=le(this,(e=ce(i)).call.apply(e,[this].concat(a)))).handleClick=function(e){e.preventDefault(),t.props.disabled||0==t.unfilledPercent||m.a.emit("nav-apply-gauge-tank-filter",t.props.filterType)},t}return se(i,I.a.Component),oe(i,[{key:"render",value:function(){var e=this.props,t=e.allIndicatorsLength,r=e.filteredIndicatorsLength,a=e.title,n=e.filledLabel,i=e.unfilledLabel,o=e.cta,l=e.emptyLabel,c=e.disabled,s=this.props.filterType===this.props.currentIndicatorFilter,d=t<=0||t==r?100:0==r?0:Math.max(1,Math.min(Math.round(r/t*100),99)),u=100-(this.unfilledPercent=d);return I.a.createElement("div",{className:w()("gauge",{"filter-trigger":0<d&&!c,"is-highlighted":s}),onClick:this.handleClick},I.a.createElement("h6",{className:"gauge__title"},a),I.a.createElement("div",{className:"gauge__overview"},I.a.createElement("div",{className:"gauge__graphic gauge__graphic--tank{% if filled_percent == 0 %} gauge__graphic--empty{% endif %}"},I.a.createElement("div",{className:"graphic__tick-marks"},ae(Array(10)).map(function(e,t){return I.a.createElement("div",{key:t,className:"graphic__tick"})})),I.a.createElement("div",{className:"graphic__tank--unfilled",style:{flexBasis:"".concat(d,"%")}}),I.a.createElement("div",{className:"graphic__tank--filled",style:{flexBasis:"".concat(u,"%")}})),I.a.createElement("div",{className:"gauge__labels"},0<u?I.a.createElement(I.a.Fragment,null,I.a.createElement("div",{className:"gauge__label text-muted"},d,"% ",i),I.a.createElement("div",{className:"gauge__label"},I.a.createElement("span",{className:"gauge__value"},u,"% ",n))):I.a.createElement("div",{className:"gauge__label"},I.a.createElement("span",{className:"text-danger"},I.a.createElement("strong",null,l))))),0<d&&!c&&I.a.createElement("div",{className:"gauge__cta"},I.a.createElement("span",{className:"btn-link btn-inline"},I.a.createElement("i",{className:"fas fa-exclamation-triangle text-warning"})," ",o)," "))}}]),i}())||K,pe=Object(b.a)(V=function(e){function r(e){var t;return ne(this,r),(t=le(this,ce(r).call(this,e))).onFilterLinkClick=function(e){e.preventDefault(),m.a.emit("nav-apply-gauge-tank-filter",parseInt(e.target.getAttribute("data-filter-type")))},t.handledFilterTypes=new Set([L.aboveTarget,L.belowTarget,L.onTarget]),t}return se(r,I.a.Component),oe(r,[{key:"componentDidUpdate",value:function(){$(this.el).find('[data-toggle="popover"]').popover({html:!0})}},{key:"render",value:function(){var t=this,e=this.props,r=e.indicatorStore,a=e.program,n=this.props.currentIndicatorFilter,i=this.handledFilterTypes.has(n),o=r.indicators.length,l=r.getIndicatorsNotReporting.length,c=r.getIndicatorsAboveTarget.length,s=r.getIndicatorsBelowTarget.length,d=r.getIndicatorsOnTarget.length,u=0<o?function(e){return e==o?100:0==e?0:Math.max(1,Math.min(Math.round(e/o*100),99))}:function(e){return 0},p=u(c),g=u(d),m=u(s),f=u(l),h=100*this.props.indicatorOnScopeMargin,y=(Object(ee.b)(a.reporting_period_start),0===r.getIndicatorsReporting.length||0===r.getTotalResultsCount),b=function(){var e=gettext("<strong>%(percentHigh)s%</strong> are >%(marginPercent)s% above target");return{__html:interpolate(e,{percentHigh:p,marginPercent:h},!0)}},v=function(){var e=gettext("<strong>%s%</strong> are on track");return{__html:interpolate(e,[g])}},_=function(){var e=gettext("<strong>%(percentBelow)s%</strong> are >%(marginPercent)s% below target");return{__html:interpolate(e,{percentBelow:m,marginPercent:h},!0)}};return I.a.createElement(function(e){return I.a.createElement("div",{className:w()("gauge",{"is-highlighted":i}),ref:function(e){return t.el=e}},I.a.createElement("h6",{className:"gauge__title"},gettext("Indicators on track")),I.a.createElement("div",{className:"gauge__overview"},e.children))},null,I.a.createElement("div",{className:"gauge__graphic gauge__graphic--performance-band"},I.a.createElement("div",{className:"graphic__tick-marks"},ae(Array(10)).map(function(e,t){return I.a.createElement("div",{key:t,className:"graphic__tick"})})),I.a.createElement("div",{className:"graphic__performance-band--above-target",style:{flexBasis:"".concat(p,"%")}}),I.a.createElement("div",{className:"graphic__performance-band--on-target",style:{flexBasis:"".concat(g,"%")}}),I.a.createElement("div",{className:"graphic__performance-band--below-target",style:{flexBasis:"".concat(m,"%")}})),y?I.a.createElement("div",{className:"gauge__labels"},I.a.createElement("div",{className:"gauge__label"},I.a.createElement("p",{className:"text-muted"},gettext("Unavailable until the first target period ends with results reported.")))):I.a.createElement(function(e){return I.a.createElement("div",{className:"gauge__labels"},I.a.createElement("div",{className:"gauge__label"},I.a.createElement("span",{className:"text-muted"},interpolate(gettext("%(percentNonReporting)s% unavailable"),{percentNonReporting:f},!0))," ",I.a.createElement("a",{href:"#",tabIndex:"0","data-toggle":"popover","data-placement":"right","data-trigger":"focus","data-content":gettext("The indicator has no targets, no completed target periods, or no results reported."),onClick:function(e){return e.preventDefault()}},I.a.createElement("i",{className:"far fa-question-circle"}))),I.a.createElement("div",{className:"gauge__label"},I.a.createElement("span",{className:"gauge__value--above filter-trigger--band","data-filter-type":L.aboveTarget,onClick:t.onFilterLinkClick,dangerouslySetInnerHTML:b()})),I.a.createElement("div",{className:"gauge__label"},I.a.createElement("span",{className:"gauge__value filter-trigger--band","data-filter-type":L.onTarget,onClick:t.onFilterLinkClick,dangerouslySetInnerHTML:v()})," ",I.a.createElement("a",{href:"#",tabIndex:"0","data-toggle":"popover","data-placement":"right","data-trigger":"focus","data-content":gettext("The actual value matches the target value, plus or minus 15%. So if your target is 100 and your result is 110, the indicator is 10% above target and on track.  <br><br>Please note that if your indicator has a decreasing direction of change, then “above” and “below” are switched. In that case, if your target is 100 and your result is 200, your indicator is 50% below target and not on track.<br><br><a href='https://docs.google.com/document/d/1Gl9bxJJ6hdhCXeoOCoR1mnVKZa2FlEOhaJcjexiHzY0' target='_blank'>See our documentation for more information.</a>"),onClick:function(e){return e.preventDefault()}},I.a.createElement("i",{className:"far fa-question-circle"}))),I.a.createElement("div",{className:"gauge__label"},I.a.createElement("span",{className:"gauge__value--below filter-trigger--band","data-filter-type":L.belowTarget,onClick:t.onFilterLinkClick,dangerouslySetInnerHTML:_()})))},null))}}]),r}())||V,ge=Object(b.a)(function(e){var t=e.rootStore.program,r=e.rootStore.indicatorStore,a=r.indicators,n=e.uiStore.currentIndicatorFilter,i=this.props.indicatorOnScopeMargin,o={title:gettext("Indicators with targets"),filledLabel:gettext("have targets"),unfilledLabel:gettext("no targets"),cta:gettext("Indicators missing targets"),emptyLabel:gettext("No targets")},l={title:gettext("Indicators with results"),filledLabel:gettext("have results"),unfilledLabel:gettext("no results"),cta:gettext("Indicators missing results"),emptyLabel:gettext("No results")},c={title:gettext("Results with evidence"),filledLabel:gettext("have evidence"),unfilledLabel:gettext("no evidence"),cta:gettext("Indicators missing evidence"),emptyLabel:gettext("No evidence")},s=a.map(function(e){return 1===e.all_targets_defined}).some(function(e){return e}),d=a.map(function(e){return e.results_count}).some(function(e){return 0<e});return 0===a.length?null:I.a.createElement("div",{className:"status__gauges"},I.a.createElement(pe,{currentIndicatorFilter:n,indicatorOnScopeMargin:i,indicatorStore:r,program:t}),I.a.createElement(ue,te({filterType:L.missingTarget,currentIndicatorFilter:n,allIndicatorsLength:a.length,filteredIndicatorsLength:r.getIndicatorsNeedingTargets.length},o)),I.a.createElement(ue,te({filterType:L.missingResults,currentIndicatorFilter:n,allIndicatorsLength:a.length,filteredIndicatorsLength:r.getIndicatorsNeedingResults.length,disabled:!s},l)),I.a.createElement(ue,te({filterType:L.missingEvidence,currentIndicatorFilter:n,allIndicatorsLength:r.getTotalResultsCount,filteredIndicatorsLength:r.getTotalResultsCount-r.getTotalResultsWithEvidenceCount,disabled:!s||!d},c)))}),me=(r("DaGC"),new M(jsContext.indicators,jsContext.program)),fe=new F;m.a.on("open-indicator-update-modal",function(e){var t="/indicators/indicator_update/".concat(e,"/?modal=1");$("#indicator_modal_content").empty(),$("#modalmessages").empty(),$("#indicator_modal_content").load(t),$("#indicator_modal_div").modal("show")}),m.a.on("load-indicator-results",function(t){if(t){var e="/indicators/result_table/".concat(t,"/").concat(me.program.id,"/");$.get(e,function(e){me.addResultsHTML(t,e)})}}),m.a.on("delete-indicator-results",function(e){me.deleteResultsHTML(e)}),m.a.on("reload-indicator",function(e){$.get("/indicators/api/indicator/".concat(e),me.indicatorStore.updateIndicator)}),m.a.on("indicator-deleted",me.indicatorStore.removeIndicator),m.a.on("close-all-indicators",function(){me.deleteAllResultsHTML()}),m.a.on("apply-gauge-tank-filter",function(e){m.a.emit("clear-all-indicator-filters"),fe.setIndicatorFilter(e)}),m.a.on("clear-all-indicator-filters",function(){fe.clearIndicatorFilter(),m.a.emit("select-indicator-to-filter",null),m.a.emit("close-all-indicators")}),m.a.on("select-indicator-to-filter",function(e){fe.clearIndicatorFilter(),fe.setSelectedIndicatorId(e),m.a.emit("load-indicator-results",e)}),g.a.render(I.a.createElement(Z,{rootStore:me,uiStore:fe,readonly:jsContext.readonly}),document.querySelector("#indicator-list-react-component")),g.a.render(I.a.createElement(ge,{rootStore:me,uiStore:fe,indicatorOnScopeMargin:jsContext.indicator_on_scope_margin}),document.querySelector("#program-metrics-react-component")),$("#indicator-list-react-component").on("click",".results__link",function(e){e.preventDefault();var t=$(this).attr("href");t+="?modal=1",$("#indicator_modal_content").empty(),$("#modalmessages").empty(),$("#indicator_results_modal_content").load(t),$("#indicator_results_div").modal("show")}),$("#indicator-list-react-component").on("click",".indicator-link[data-tab]",function(e){e.preventDefault();var t=$(this).attr("href");t+="?modal=1";var r=$(this).data("tab");r&&""!=r&&null!=r&&"undefined"!=r&&(t+="&targetsactive=true"),$("#indicator_modal_content").empty(),$("#modalmessages").empty(),$("#indicator_modal_content").load(t),$("#indicator_modal_div").modal("show")}),$("#indicator_modal_div").on("hide.bs.modal",function(e){var t=$(this).find("form"),r=t.attr("action").split("/"),a=parseInt(r[r.length-2]);"true"===t.attr("deleted")?m.a.emit("indicator-deleted",a):(m.a.emit("reload-indicator",a),me.resultsMap.has(a)&&m.a.emit("load-indicator-results",a))}),$("#indicator_results_div").on("hide.bs.modal",function(e){if(!0===$(this).find("form").data("recordchanged")){var t=$(this).find("form #id_indicator").val();m.a.emit("load-indicator-results",t),m.a.emit("reload-indicator",t)}});var he=[{name:"all",path:"/",filterType:L.noFilter},{name:"targets",path:"/targets",filterType:L.missingTarget},{name:"results",path:"/results",filterType:L.missingResults},{name:"evidence",path:"/evidence",filterType:L.missingEvidence},{name:"scope",path:"/scope",forwardTo:"scope.on"},{name:"scope.on",path:"/on",filterType:L.onTarget},{name:"scope.above",path:"/above",filterType:L.aboveTarget},{name:"scope.below",path:"/below",filterType:L.belowTarget},{name:"indicator",path:"/indicator/:indicator_id<\\d+>",filterType:L.noFilter}],ye=Object(f.b)(he,{defaultRoute:"all",defaultParams:{},trailingSlashMode:"always"});ye.usePlugin(Object(h.a)({useHash:!0,base:"/program/"+jsContext.program.id+"/"})),ye.subscribe(function(e){var t=e.route.name,r=e.route.params;if("indicator"!==t){var a=he.find(function(e){return e.name===t});m.a.emit("apply-gauge-tank-filter",a.filterType)}else m.a.emit("select-indicator-to-filter",parseInt(r.indicator_id))}),ye.start(),m.a.on("nav-apply-gauge-tank-filter",function(t){var e=he.find(function(e){return e.filterType===t});ye.navigate(e.name)}),m.a.on("nav-clear-all-indicator-filters",function(){ye.navigate("all")}),m.a.on("nav-select-indicator-to-filter",function(e){ye.navigate("indicator",{indicator_id:e})}),$(function(){var e=0===window.performance.getEntriesByType("navigation")[0].transferSize,t="reload"===window.performance.getEntriesByType("navigation")[0].type;e&&!t&&window.location.reload()})},qtBC:function(e,t,r){"use strict";var a=r("7+Rn"),n=r.n(a)()();t.a=n}},[["aJgA",0,1]]]);