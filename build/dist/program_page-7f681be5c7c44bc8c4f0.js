(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{DaGC:function(e,t){$("[data-delete-pinned-report]").click(function(e){e.preventDefault();var t=$(this).data("deletePinnedReport"),a=$(this).closest(".pinned-report");window.confirm(gettext("Warning: This action cannot be undone. Are you sure you want to delete this pinned report?"))&&$.ajax({type:"POST",url:jsContext.delete_pinned_report_url,data:{pinned_report_id:t},success:function(){a.remove()}})})},aJgA:function(e,t,a){"use strict";a.r(t);var r,n,i,o,l,c,s,d,u=a("q1tI"),_=a.n(u),g=a("i8i4"),p=a.n(g),m=a("qtBC"),f=a("wgi2"),h=a("0pHI"),y=a("TSYQ"),v=a.n(y),b=a("okNM"),I=a("7O5W"),E=a("IP2g"),w=a("wHSu"),k=a("2vnA");function T(e,t,a,r){a&&Object.defineProperty(e,t,{enumerable:a.enumerable,configurable:a.configurable,writable:a.writable,value:a.initializer?a.initializer.call(r):void 0})}function N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(e,t,a){return t&&O(e.prototype,t),a&&O(e,a),e}function S(a,r,e,t,n){var i={};return Object.keys(t).forEach(function(e){i[e]=t[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=e.slice().reverse().reduce(function(e,t){return t(a,r,e)||e},i),n&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(n):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(a,r,i),i=null),i}var j,C,R,L=Object.freeze({noFilter:0,missingTarget:1,missingResults:2,missingEvidence:3,aboveTarget:5,belowTarget:6,onTarget:7}),M=(n=S((r=function(){function t(e){N(this,t),T(this,"indicators",n,this),this.indicators=e,this.updateIndicator=this.updateIndicator.bind(this),this.filterIndicators=this.filterIndicators.bind(this)}return x(t,[{key:"updateIndicator",value:function(t){var e=this.indicators.findIndex(function(e){return e.id===t.id});0<e&&(this.indicators[e]=t)}},{key:"filterIndicators",value:function(e){var t;switch(e){case L.missingTarget:t=this.getIndicatorsNeedingTargets;break;case L.missingResults:t=this.getIndicatorsNeedingResults;break;case L.missingEvidence:t=this.getIndicatorsNeedingEvidence;break;case L.aboveTarget:t=this.getIndicatorsAboveTarget;break;case L.belowTarget:t=this.getIndicatorsBelowTarget;break;case L.onTarget:t=this.getIndicatorsOnTarget;break;case L.noFilter:default:t=this.indicators}return t}},{key:"getIndicatorsNeedingTargets",get:function(){return this.indicators.filter(function(e){return 0===e.all_targets_defined})}},{key:"getIndicatorsNeedingResults",get:function(){return this.indicators.filter(function(e){return 0===e.results_count})}},{key:"getIndicatorsNeedingEvidence",get:function(){return this.indicators.filter(function(e){return e.results_count!==e.results_with_evidence_count})}},{key:"getIndicatorsNotReporting",get:function(){return this.indicators.filter(function(e){return null===e.over_under})}},{key:"getIndicatorsAboveTarget",get:function(){return this.indicators.filter(function(e){return 0<e.over_under})}},{key:"getIndicatorsBelowTarget",get:function(){return this.indicators.filter(function(e){return e.over_under<0})}},{key:"getIndicatorsOnTarget",get:function(){return this.indicators.filter(function(e){return 0===e.over_under})}},{key:"getIndicatorsReporting",get:function(){return this.indicators.filter(function(e){return!0===e.reporting})}},{key:"getTotalResultsCount",get:function(){return this.indicators.reduce(function(e,t){return e+t.results_count},0)}},{key:"getTotalResultsWithEvidenceCount",get:function(){return this.indicators.reduce(function(e,t){return e+t.results_with_evidence_count},0)}}]),t}()).prototype,"indicators",[k.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),S(r.prototype,"updateIndicator",[k.d],Object.getOwnPropertyDescriptor(r.prototype,"updateIndicator"),r.prototype),S(r.prototype,"getIndicatorsNeedingTargets",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsNeedingTargets"),r.prototype),S(r.prototype,"getIndicatorsNeedingResults",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsNeedingResults"),r.prototype),S(r.prototype,"getIndicatorsNeedingEvidence",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsNeedingEvidence"),r.prototype),S(r.prototype,"getIndicatorsNotReporting",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsNotReporting"),r.prototype),S(r.prototype,"getIndicatorsAboveTarget",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsAboveTarget"),r.prototype),S(r.prototype,"getIndicatorsBelowTarget",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsBelowTarget"),r.prototype),S(r.prototype,"getIndicatorsOnTarget",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsOnTarget"),r.prototype),S(r.prototype,"getIndicatorsReporting",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getIndicatorsReporting"),r.prototype),S(r.prototype,"getTotalResultsCount",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getTotalResultsCount"),r.prototype),S(r.prototype,"getTotalResultsWithEvidenceCount",[k.e],Object.getOwnPropertyDescriptor(r.prototype,"getTotalResultsWithEvidenceCount"),r.prototype),r),P=(o=S((i=function(){function a(e,t){N(this,a),this.indicatorStore=void 0,T(this,"program",o,this),T(this,"resultsMap",l,this),this.indicatorStore=new M(e),this.program=t,this.addResultsHTML=this.addResultsHTML.bind(this),this.deleteResultsHTML=this.deleteResultsHTML.bind(this)}return x(a,[{key:"addResultsHTML",value:function(e,t){this.resultsMap.set(parseInt(e),t)}},{key:"deleteResultsHTML",value:function(e){this.resultsMap.delete(e)}},{key:"deleteAllResultsHTML",value:function(){this.resultsMap.clear()}}]),a}()).prototype,"program",[k.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),l=S(i.prototype,"resultsMap",[k.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),S(i.prototype,"addResultsHTML",[k.d],Object.getOwnPropertyDescriptor(i.prototype,"addResultsHTML"),i.prototype),S(i.prototype,"deleteResultsHTML",[k.d],Object.getOwnPropertyDescriptor(i.prototype,"deleteResultsHTML"),i.prototype),S(i.prototype,"deleteAllResultsHTML",[k.d],Object.getOwnPropertyDescriptor(i.prototype,"deleteAllResultsHTML"),i.prototype),i),F=(s=S((c=function(){function e(){N(this,e),T(this,"currentIndicatorFilter",s,this),T(this,"selectedIndicatorId",d,this),this.setIndicatorFilter=this.setIndicatorFilter.bind(this),this.clearIndicatorFilter=this.clearIndicatorFilter.bind(this),this.setSelectedIndicatorId=this.setSelectedIndicatorId.bind(this)}return x(e,[{key:"setIndicatorFilter",value:function(e){this.currentIndicatorFilter=e}},{key:"clearIndicatorFilter",value:function(){this.currentIndicatorFilter=null}},{key:"setSelectedIndicatorId",value:function(e){this.selectedIndicatorId=e}}]),e}()).prototype,"currentIndicatorFilter",[k.l],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),d=S(c.prototype,"selectedIndicatorId",[k.l],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),S(c.prototype,"setIndicatorFilter",[k.d],Object.getOwnPropertyDescriptor(c.prototype,"setIndicatorFilter"),c.prototype),S(c.prototype,"clearIndicatorFilter",[k.d],Object.getOwnPropertyDescriptor(c.prototype,"clearIndicatorFilter"),c.prototype),S(c.prototype,"setSelectedIndicatorId",[k.d],Object.getOwnPropertyDescriptor(c.prototype,"setSelectedIndicatorId"),c.prototype),c),A=a("y2Vs");function D(e){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function z(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function B(e,t,a){return t&&z(e.prototype,t),a&&z(e,a),e}function U(e,t){return!t||"object"!==D(t)&&"function"!=typeof t?q(e):t}function q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function J(e){return(J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function W(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&G(e,t)}function G(e,t){return(G=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}I.b.add(w.a,w.b);var K,V,Y=Object(b.a)(j=function(e){function a(e){var t;return H(this,a),(t=U(this,J(a).call(this,e))).onShowAllClick=function(e){e.preventDefault(),m.a.emit("clear-all-indicator-filters")},t}return W(a,_.a.Component),B(a,[{key:"render",value:function(){var e=this.props,t=e.indicatorCount,a=e.programId,r=e.currentIndicatorFilter,n=e.filterApplied;return _.a.createElement("div",{className:"indicators-list__header"},_.a.createElement("h3",{className:"no-bold"},_.a.createElement("span",{id:"indicators-list-title"},function(e,t){var a;switch(e){case L.missingTarget:return a=ngettext("%s indicator has missing targets","%s indicators have missing targets",t),interpolate(a,[t]);case L.missingResults:return a=ngettext("%s indicator has missing results","%s indicators have missing results",t),interpolate(a,[t]);case L.missingEvidence:return a=ngettext("%s indicator has missing evidence","%s indicators have missing evidence",t),interpolate(a,[t]);case L.aboveTarget:return a=ngettext("%s indicator is >15% above target","%s indicators are >15% above target",t),interpolate(a,[t]);case L.belowTarget:return a=ngettext("%s indicator is >15% below target","%s indicators are >15% below target",t),interpolate(a,[t]);case L.onTarget:return a=ngettext("%s indicator is on track","%s indicators are on track",t),interpolate(a,[t]);default:return a=ngettext("%s indicator","%s indicators",t),interpolate(a,[t])}}(r,t)," "),n&&_.a.createElement("a",{href:"#",id:"show-all-indicators",onClick:this.onShowAllClick},_.a.createElement("small",null,"Show all"))),_.a.createElement("div",null,_.a.createElement("a",{href:"/indicators/indicator_create/".concat(a),role:"button",className:"btn-link btn-add"},_.a.createElement("i",{className:"fas fa-plus-circle"})," ",gettext("Add indicator"))))}}]),a}())||j,Q=Object(b.a)(C=function(e){function i(){var e,t;H(this,i);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(t=U(this,(e=J(i)).call.apply(e,[this].concat(r)))).onSelection=function(e){var t=e?e.value:null;t&&m.a.emit("select-indicators-to-filter",t)},t}return W(i,_.a.Component),B(i,[{key:"render",value:function(){var e=this.props.rootStore.indicatorStore.indicators,t=this.props.uiStore.selectedIndicatorId,a=e.map(function(e){return{value:e.id,label:e.name}}),r=null;return t&&(r=a.find(function(e){return e.value===t})),_.a.createElement("nav",{className:"list__filters list__filters--inline-label",id:"id_div_indicators"},_.a.createElement("label",{className:"filters__label"},gettext("Find an indicator:")),_.a.createElement("div",{className:"filters__control"},_.a.createElement(A.a,{options:a,value:r,isClearable:!1,placeholder:gettext("None"),onChange:this.onSelection})))}}]),i}())||C,X=Object(b.a)(R=function(e){function a(e){var t;return H(this,a),(t=U(this,J(a).call(this,e))).onIndicatorUpdateClick=t.onIndicatorUpdateClick.bind(q(q(t))),t.onIndicatorResultsToggleClick=t.onIndicatorResultsToggleClick.bind(q(q(t))),t}return W(a,_.a.Component),B(a,[{key:"onIndicatorUpdateClick",value:function(e,t){e.preventDefault(),m.a.emit("open-indicator-update-modal",t)}},{key:"onIndicatorResultsToggleClick",value:function(e,t){e.preventDefault(),this.props.resultsMap.has(t)?m.a.emit("delete-indicator-results",t):m.a.emit("load-indicator-results",t)}},{key:"render",value:function(){var n=this,e=this.props.indicators,t=this.props.program,i=new Date(t.reporting_period_end),o=this.props.resultsMap;return _.a.createElement("table",{className:"table indicators-list"},_.a.createElement("thead",null,_.a.createElement("tr",{className:"table-header"},_.a.createElement("th",{className:"",id:"id_indicator_name_col_header"},gettext("Indicator")),_.a.createElement("th",{className:"",id:"id_indicator_buttons_col_header"}," "),_.a.createElement("th",{className:"",id:"id_indicator_level_col_header"},gettext("Level")),_.a.createElement("th",{className:"",id:"id_indicator_unit_col_header"},gettext("Unit of measure")),_.a.createElement("th",{className:"text-right",id:"id_indicator_baseline_col_header"},gettext("Baseline")),_.a.createElement("th",{className:"text-right",id:"id_indicator_target_col_header"},gettext("Target")))),_.a.createElement("tbody",null,e.map(function(t){var e=o.has(t.id),a=o.get(t.id),r=t.target_period_last_end_date?new Date(t.target_period_last_end_date):null;return _.a.createElement(_.a.Fragment,{key:t.id},_.a.createElement("tr",{className:v()("indicators-list__row","indicators-list__indicator-header",{"is-highlighted":t.just_created,"is-expanded":e})},_.a.createElement("td",null,_.a.createElement("a",{href:"#",className:"indicator_results_toggle",onClick:function(e){return n.onIndicatorResultsToggleClick(e,t.id)}},_.a.createElement(E.a,{icon:e?"caret-down":"caret-right"}),_.a.createElement("strong",null,t.number)," ",_.a.createElement("span",{className:"indicator_name"},t.name)),t.key_performance_indicator&&_.a.createElement("span",{className:"badge"},"KPI"),r&&r<i&&_.a.createElement("a",{href:"/indicators/indicator_update/".concat(t.id,"/"),className:"indicator-link color-red missing_targets","data-toggle":"modal","data-target":"#indicator_modal_div","data-tab":"targets"},_.a.createElement("i",{className:"fas fa-bullseye"})," Missing targets")),_.a.createElement("td",null,_.a.createElement("a",{href:"#",className:"indicator-link",onClick:function(e){return n.onIndicatorUpdateClick(e,t.id)}},_.a.createElement("i",{className:"fas fa-cog"}))),_.a.createElement("td",null,t.level?t.level.name:""),_.a.createElement("td",null,t.unit_of_measure),_.a.createElement("td",{className:"text-right"},t.baseline_display),_.a.createElement("td",{className:"text-right"},t.lop_target_display)),e&&_.a.createElement("tr",{className:"indicators-list__row indicators-list__indicator-body"},_.a.createElement("td",{colSpan:"6",ref:function(e){return $(e).find('[data-toggle="popover"]').popover({html:!0})}},_.a.createElement("div",{dangerouslySetInnerHTML:{__html:a}}))))})))}}]),a}())||R,Z=Object(b.a)(function(e){var t=e.rootStore.program,a=e.rootStore.indicatorStore,r=e.rootStore.resultsMap,n=e.uiStore.currentIndicatorFilter,i=e.uiStore.selectedIndicatorId,o=a.filterIndicators(n);return i&&(o=o.filter(function(e){return e.id==i})),_.a.createElement(_.a.Fragment,null,_.a.createElement(Y,{indicatorCount:o.length,programId:t.id,currentIndicatorFilter:n,filterApplied:n||i}),_.a.createElement(Q,{uiStore:e.uiStore,rootStore:e.rootStore}),t.does_it_need_additional_target_periods&&_.a.createElement("div",{id:"id_missing_targets_msg",className:"color-red"},_.a.createElement("i",{className:"fas fa-bullseye"})," ",gettext("Some indicators have missing targets. To enter these values, click the target icon near the indicator name.")),_.a.createElement(X,{indicators:o,resultsMap:r,program:t}))});function ee(){return(ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function te(e){return(te="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ae(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function re(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ne(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ie(e,t,a){return t&&ne(e.prototype,t),a&&ne(e,a),e}function oe(e,t){return!t||"object"!==te(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function le(e){return(le=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ce(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&se(e,t)}function se(e,t){return(se=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}for(var de=Object(b.a)(K=function(e){function i(){var e,t;re(this,i);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(t=oe(this,(e=le(i)).call.apply(e,[this].concat(r)))).handleClick=function(e){e.preventDefault(),m.a.emit("apply-gauge-tank-filter",t.props.filterType)},t}return ce(i,_.a.Component),ie(i,[{key:"render",value:function(){var e=this.props,t=e.allIndicatorsLength,a=e.filteredIndicatorsLength,r=e.title,n=e.filledLabel,i=e.unfilledLabel,o=e.cta,l=e.emptyLabel,c=this.props.filterType===this.props.currentIndicatorFilter,s=t<=0||t==a?100:0==a?0:Math.max(1,Math.min(Math.round(a/t*100),99)),d=100-s;return _.a.createElement("div",{className:v()("gauge","filter-trigger",{"is-highlighted":c}),onClick:this.handleClick},_.a.createElement("h6",{className:"gauge__title"},r),_.a.createElement("div",{className:"gauge__overview"},_.a.createElement("div",{className:"gauge__graphic gauge__graphic--tank{% if filled_percent == 0 %} gauge__graphic--empty{% endif %}"},_.a.createElement("div",{className:"graphic__tick-marks"},ae(Array(10)).map(function(e,t){return _.a.createElement("div",{key:t,className:"graphic__tick"})})),_.a.createElement("div",{className:"graphic__tank--unfilled",style:{flexBasis:"".concat(s,"%")}}),_.a.createElement("div",{className:"graphic__tank--filled",style:{flexBasis:"".concat(d,"%")}})),_.a.createElement("div",{className:"gauge__labels"},0<d?_.a.createElement(_.a.Fragment,null,_.a.createElement("div",{className:"gauge__label text-muted"},s,"% ",i),_.a.createElement("div",{className:"gauge__label"},_.a.createElement("span",{className:"gauge__value"},d,"% ",n))):_.a.createElement("div",{className:"gauge__label"},_.a.createElement("span",{className:"text-danger"},_.a.createElement("strong",null,l))))),0<s&&_.a.createElement("div",{className:"gauge__cta"},_.a.createElement("span",{className:"btn-link btn-inline"},_.a.createElement("i",{className:"fas fa-exclamation-triangle text-warning"})," ",o)," "))}}]),i}())||K,ue=Object(b.a)(V=function(e){function a(e){var t;return re(this,a),(t=oe(this,le(a).call(this,e))).onFilterLinkClick=function(e){e.preventDefault(),m.a.emit("apply-gauge-tank-filter",parseInt(e.target.getAttribute("data-filter-type")))},t.handledFilterTypes=new Set([L.aboveTarget,L.belowTarget,L.onTarget]),t}return ce(a,_.a.Component),ie(a,[{key:"componentDidUpdate",value:function(){$(this.el).find('[data-toggle="popover"]').popover({html:!0})}},{key:"render",value:function(){var t=this,e=this.props.indicatorStore,a=this.props.currentIndicatorFilter,r=this.handledFilterTypes.has(a),n=e.indicators.length,i=e.getIndicatorsNotReporting.length,o=e.getIndicatorsAboveTarget.length,l=e.getIndicatorsBelowTarget.length,c=e.getIndicatorsOnTarget.length,s=0<n?function(e){return e==n?100:0==e?0:Math.max(1,Math.min(Math.round(e/n*100),99))}:function(e){return 0},d=s(o),u=s(c),g=s(l),p=s(i),m=100*this.props.indicatorOnScopeMargin,f=function(e){return _.a.createElement("div",{className:v()("gauge",{"is-highlighted":r}),ref:function(e){return t.el=e}},_.a.createElement("h6",{className:"gauge__title"},gettext("Indicators on track")),_.a.createElement("div",{className:"gauge__overview"},e.children))};if(0===e.getTotalResultsCount)return _.a.createElement(f,null,_.a.createElement("div",null,_.a.createElement("p",{className:"text-muted"},gettext("Unavailable until results are reported")),_.a.createElement("div",null,_.a.createElement("i",{className:"gauge__icon gauge__icon--error fas fa-frown"}))));if(0===e.getIndicatorsReporting.length)return _.a.createElement(f,null,_.a.createElement("div",{className:"gauge__graphic gauge__graphic--empty gauge__graphic--performance-band"},_.a.createElement("div",{className:"graphic__tick-marks"},ae(Array(10)).map(function(e,t){return _.a.createElement("div",{key:t,className:"graphic__tick"})}))),_.a.createElement("div",{className:"gauge__labels"},_.a.createElement("div",{className:"gauge__label"},_.a.createElement("p",{className:"text-muted"},gettext("Unavailable until the first target period ends with results reported")))));var h,y,b;return _.a.createElement(f,null,_.a.createElement("div",{className:"gauge__graphic gauge__graphic--performance-band"},_.a.createElement("div",{className:"graphic__tick-marks"},ae(Array(10)).map(function(e,t){return _.a.createElement("div",{key:t,className:"graphic__tick"})})),_.a.createElement("div",{className:"graphic__performance-band--above-target",style:{flexBasis:"".concat(d,"%")}}),_.a.createElement("div",{className:"graphic__performance-band--on-target",style:{flexBasis:"".concat(u,"%")}}),_.a.createElement("div",{className:"graphic__performance-band--below-target",style:{flexBasis:"".concat(g,"%")}})),_.a.createElement("div",{className:"gauge__labels"},_.a.createElement("div",{className:"gauge__label"},_.a.createElement("span",{className:"text-muted"},interpolate(gettext("%s% unavailable"),[p]))," ",_.a.createElement("a",{href:"#",tabIndex:"0","data-toggle":"popover","data-placement":"right","data-trigger":"focus","data-content":gettext("The indicator has no targets, no completed target periods, or no results reported."),onClick:function(e){return e.preventDefault()}},_.a.createElement("i",{className:"far fa-question-circle"}))),_.a.createElement("div",{className:"gauge__label"},_.a.createElement("span",{className:"gauge__value--above filter-trigger--band","data-filter-type":L.aboveTarget,onClick:this.onFilterLinkClick,dangerouslySetInnerHTML:(b=gettext("<strong>%(percentHigh)s%</strong> are >%(marginPercent)s% above target"),{__html:interpolate(b,{percentHigh:d,marginPercent:m},!0)})})),_.a.createElement("div",{className:"gauge__label"},_.a.createElement("span",{className:"gauge__value filter-trigger--band","data-filter-type":L.onTarget,onClick:this.onFilterLinkClick,dangerouslySetInnerHTML:(y=gettext("<strong>%s%</strong> are on track"),{__html:interpolate(y,[u])})})," ",_.a.createElement("a",{href:"#",tabIndex:"0","data-toggle":"popover","data-placement":"right","data-trigger":"focus","data-content":gettext("The actual value matches the target value, plus or minus 15%. So if your target is 100 and your result is 110, the indicator is 10% above target and on track.  <br><br>Please note that if your indicator has a decreasing direction of change, then “above” and “below” are switched. In that case, if your target is 100 and your result is 200, your indicator is 50% below target and not on track.<br><br><a href='https://docs.google.com/document/d/1Gl9bxJJ6hdhCXeoOCoR1mnVKZa2FlEOhaJcjexiHzY0' target='_blank'>See our documentation for more information.</a>"),onClick:function(e){return e.preventDefault()}},_.a.createElement("i",{className:"far fa-question-circle"}))),_.a.createElement("div",{className:"gauge__label"},_.a.createElement("span",{className:"gauge__value--below filter-trigger--band","data-filter-type":L.belowTarget,onClick:this.onFilterLinkClick,dangerouslySetInnerHTML:(h=gettext("<strong>%(percentBelow)s%</strong> are >%(marginPercent)s% below target"),{__html:interpolate(h,{percentBelow:g,marginPercent:m},!0)})}))))}}]),a}())||V,ge=Object(b.a)(function(e){var t=e.rootStore.indicatorStore,a=t.indicators,r=e.uiStore.currentIndicatorFilter,n=this.props.indicatorOnScopeMargin,i={title:gettext("Indicators with targets"),filledLabel:gettext("have targets"),unfilledLabel:gettext("no targets"),cta:gettext("Add missing targets"),emptyLabel:gettext("No targets")},o={title:gettext("Indicators with results"),filledLabel:gettext("have results"),unfilledLabel:gettext("no results"),cta:gettext("Add missing results"),emptyLabel:gettext("No results")},l={title:gettext("Results with evidence"),filledLabel:gettext("have evidence"),unfilledLabel:gettext("no evidence"),cta:gettext("Add missing evidence"),emptyLabel:gettext("No evidence")};return 0===a.length?null:_.a.createElement("div",{className:"status__gauges"},_.a.createElement(ue,{currentIndicatorFilter:r,indicatorOnScopeMargin:n,indicatorStore:t}),_.a.createElement(de,ee({filterType:L.missingTarget,currentIndicatorFilter:r,allIndicatorsLength:a.length,filteredIndicatorsLength:t.getIndicatorsNeedingTargets.length},i)),_.a.createElement(de,ee({filterType:L.missingResults,currentIndicatorFilter:r,allIndicatorsLength:a.length,filteredIndicatorsLength:t.getIndicatorsNeedingResults.length},o)),_.a.createElement(de,ee({filterType:L.missingEvidence,currentIndicatorFilter:r,allIndicatorsLength:t.getTotalResultsCount,filteredIndicatorsLength:t.getTotalResultsCount-t.getTotalResultsWithEvidenceCount},l)))}),pe=(a("DaGC"),new P(jsContext.indicators,jsContext.program)),me=new F,fe=[{name:"all",path:"/",filterType:L.noFilter},{name:"targets",path:"/targets",filterType:L.missingTarget},{name:"results",path:"/results",filterType:L.missingResults},{name:"evidence",path:"/evidence",filterType:L.missingEvidence},{name:"scope",path:"/scope"},{name:"scope.on",path:"/on",filterType:L.onTarget},{name:"scope.above",path:"/above",filterType:L.aboveTarget},{name:"scope.below",path:"/below",filterType:L.belowTarget}],he={},ye={},be=0;be<fe.length;be++)"scope"==fe[be].name?he[fe[be].name]=null:(he[fe[be].name]=fe[be].filterType,ye[fe[be].filterType]=fe[be].name);var _e=Object(f.b)(fe,{defaultRoute:"all",defaultParams:{},trailingSlashMode:"always"});_e.usePlugin(Object(h.a)({useHash:!0,base:"/program/"+jsContext.program.id+"/"})),_e.subscribe(function(e){"scope"==e.route.name&&_e.navigate("scope.on",{},{replace:!0})}),_e.start();m.a.on("open-indicator-update-modal",function(e){var t="/indicators/indicator_update/".concat(e,"/?modal=1");$("#indicator_modal_content").empty(),$("#modalmessages").empty(),$("#indicator_modal_content").load(t),$("#indicator_modal_div").modal("show")}),m.a.on("load-indicator-results",function(t){if(t){var e="/indicators/result_table/".concat(t,"/").concat(pe.program.id,"/");$.get(e,function(e){pe.addResultsHTML(t,e)})}}),m.a.on("delete-indicator-results",function(e){pe.deleteResultsHTML(e)}),m.a.on("reload-indicator",function(e){$.get("/indicators/api/indicator/".concat(e),pe.indicatorStore.updateIndicator)}),m.a.on("apply-gauge-tank-filter",function(e){m.a.emit("clear-all-indicator-filters"),m.a.emit("close-all-indicators"),ye.hasOwnProperty(e)&&_e.navigate(ye[e]),me.setIndicatorFilter(e)}),m.a.on("clear-all-indicator-filters",function(){_e.navigate("all"),me.clearIndicatorFilter(),m.a.emit("select-indicators-to-filter",null),m.a.emit("close-all-indicators")}),m.a.on("select-indicators-to-filter",function(e){me.clearIndicatorFilter(),me.setSelectedIndicatorId(e),m.a.emit("load-indicator-results",e)}),m.a.on("close-all-indicators",function(){pe.deleteAllResultsHTML()}),p.a.render(_.a.createElement(Z,{rootStore:pe,uiStore:me}),document.querySelector("#indicator-list-react-component")),p.a.render(_.a.createElement(ge,{rootStore:pe,uiStore:me,indicatorOnScopeMargin:jsContext.indicator_on_scope_margin}),document.querySelector("#program-metrics-react-component")),function(e){if(he.hasOwnProperty(e)){var t=he[e];m.a.emit("apply-gauge-tank-filter",t)}}(_e.getState().name),$("#indicator-list-react-component").on("click",".collected-data__link",function(e){e.preventDefault();var t=$(this).attr("href");t+="?modal=1",$("#indicator_modal_content").empty(),$("#modalmessages").empty(),$("#indicator_collected_data_modal_content").load(t),$("#indicator_collecteddata_div").modal("show")}),$("#indicator-list-react-component").on("click",".indicator-link[data-tab]",function(e){e.preventDefault();var t=$(this).attr("href");t+="?modal=1";var a=$(this).data("tab");a&&""!=a&&null!=a&&"undefined"!=a&&(t+="&targetsactive=true"),$("#indicator_modal_content").empty(),$("#modalmessages").empty(),$("#indicator_modal_content").load(t),$("#indicator_modal_div").modal("show")}),$("#indicator_modal_div").on("hide.bs.modal",function(e){var t=$(this).find("form").attr("action").split("/"),a=parseInt(t[t.length-2]);m.a.emit("reload-indicator",a),pe.resultsMap.has(a)&&m.a.emit("load-indicator-results",a)}),$("#indicator_collecteddata_div").on("hide.bs.modal",function(e){if(!0===$(this).find("form").data("recordchanged")){var t=$(this).find("form #id_indicator").val();m.a.emit("load-indicator-results",t),m.a.emit("reload-indicator",t)}})},qtBC:function(e,t,a){"use strict";var r=a("7+Rn"),n=a.n(r)()();t.a=n}},[["aJgA",0,1]]]);