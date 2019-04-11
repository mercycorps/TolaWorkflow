(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"5Xg7":function(e,t,a){"use strict";a.d(t,"a",function(){return f});var n=a("q1tI"),i=a.n(n),c=a("c7k8"),r=a("y2Vs");function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function u(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=function(e){function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=s(this,m(a).call(this,e))).cache=new c.c({fixedWidth:!0,defaultHeight:35}),t.filter_val="",t}var t,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(a,i.a.PureComponent),t=a,(n=[{key:"render",value:function(){var l=this,e=this.props,o=(e.options,e.children),t=e.maxHeight,a=(e.getValue,e.selectProps),n=o.length||0;return a.inputValue!==this.filter_val&&(this.filter_val=a.inputValue,this.cache.clearAll()),i.a.createElement("div",{style:{display:"flex",height:"100vh",maxHeight:t+"px"}},i.a.createElement("div",{style:{flex:"1 1 auto"}},i.a.createElement(c.a,null,function(e){var t=e.width,a=e.height;return i.a.createElement(c.e,{height:a,width:t,deferredMeasurementCache:l.cache,rowCount:n,rowHeight:l.cache.rowHeight,noRowsRenderer:function(){return i.a.createElement("div",null,"No selections available")},rowRenderer:function(e){var t=e.index,a=e.parent,n=e.key,r=e.style;return i.a.createElement(c.b,{key:n,cache:l.cache,parent:a,columnIndex:0,rowIndex:t},i.a.createElement("div",{style:r},o[t]))}})})))}}])&&u(t.prototype,n),r&&u(t,r),a}();t.b=function(e){return i.a.createElement(r.default,o({components:{VirtualizedMenuList:f}},e))}},"6bbB":function(e,t,a){"use strict";a.r(t);var n,r,l,o,i,c,u,s,m,p,f,g,d=a("q1tI"),b=a.n(d),h=a("i8i4"),y=a.n(h),_=a("2vnA"),v=a("XoI5"),E=function(e,t){return v.a.get("/tola_management/program/".concat(e,"/audit_log/"),{params:{page:t}}).then(function(e){var t=e.data,a=t.count,n=(t.results.length,t.page_count);return{logs:t.results,total_pages:n,total_entries:a,next_page:t.next,prev_page:t.previous}})};function w(e,t,a,n){a&&Object.defineProperty(e,t,{enumerable:a.enumerable,configurable:a.configurable,writable:a.writable,value:a.initializer?a.initializer.call(n):void 0})}function N(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function O(a,n,e,t,r){var l={};return Object.keys(t).forEach(function(e){l[e]=t[e]}),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=e.slice().reverse().reduce(function(e,t){return t(a,n,e)||e},l),r&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(r):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(a,n,l),l=null),l}var x=(r=O((n=function(){function a(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),w(this,"program_id",r,this),w(this,"program_name",l,this),w(this,"log_rows",o,this),w(this,"fetching",i,this),w(this,"current_page",c,this),w(this,"details_target",u,this),w(this,"entries_count",s,this),w(this,"total_pages",m,this),w(this,"next_page",p,this),w(this,"previous_page",f,this),w(this,"current_page",g,this),this.program_id=e,this.program_name=t,this.fetchProgramAuditLog()}var e,t,n;return e=a,(t=[{key:"fetchProgramAuditLog",value:function(){var t=this;this.fetching=!0,E(this.program_id,this.current_page+1).then(function(e){Object(_.m)(function(){t.fetching=!1,t.log_rows=e.logs,t.entries_count=e.total_entries,t.total_pages=e.total_pages,t.next_page=e.next_page,t.previous_page=e.previous_page})})}},{key:"toggleDetailsTarget",value:function(e){this.details_target==e?this.details_target=null:this.details_target=e}},{key:"changePage",value:function(e){e.selected!=this.current_page&&(this.current_page=e.selected,this.fetchProgramAuditLog())}}])&&N(e.prototype,t),n&&N(e,n),a}()).prototype,"program_id",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),l=O(n.prototype,"program_name",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),o=O(n.prototype,"log_rows",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),i=O(n.prototype,"fetching",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),c=O(n.prototype,"current_page",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),u=O(n.prototype,"details_target",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),s=O(n.prototype,"entries_count",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),m=O(n.prototype,"total_pages",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),p=O(n.prototype,"next_page",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),f=O(n.prototype,"previous_page",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g=O(n.prototype,"current_page",[_.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),O(n.prototype,"fetchProgramAuditLog",[_.d],Object.getOwnPropertyDescriptor(n.prototype,"fetchProgramAuditLog"),n.prototype),O(n.prototype,"toggleDetailsTarget",[_.d],Object.getOwnPropertyDescriptor(n.prototype,"toggleDetailsTarget"),n.prototype),O(n.prototype,"changePage",[_.d],Object.getOwnPropertyDescriptor(n.prototype,"changePage"),n.prototype),n),j=a("okNM"),k=(a("TSYQ"),a("TGVD"),a("RCjz")),P=(a("Z2Y6"),a("H4hL"),a("DDFe"));function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function z(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==i.return||i.return()}finally{if(r)throw l}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var D=function(e){var t=e.data,a=e.name,n=e.pretty_name;return"evidence_url"==a?b.a.createElement("div",{className:"change__field"},b.a.createElement("strong",null,n),": ","N/A"!=t?b.a.createElement("a",{href:t},"Link"):t):b.a.createElement("div",{className:"change__field"},b.a.createElement("strong",null,n),": ",t)},I=function(e){var t=e.data,a=(e.name,e.pretty_name);return b.a.createElement("p",null,a,": ",t)},A=function(e){var t=e.data,a=e.name,n=e.pretty_name;return"targets"==a?b.a.createElement("div",{className:"changelog__change__targets"},b.a.createElement("h4",{className:"text-small"},gettext("Targets changed")),Object.entries(t).map(function(e){var t=R(e,2),a=t[0],n=t[1];return b.a.createElement("div",{className:"change__field",key:a},b.a.createElement("strong",null,n.name,":")," ",n.value)})):b.a.createElement("div",{className:"change__field"},b.a.createElement("strong",null,n,":")," ",null!=t?t.toString():gettext("N/A"))},q=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),z(this,L(t).apply(this,arguments))}var a,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(t,b.a.Component),a=t,(n=[{key:"renderType",value:function(e,t,a,n){switch(e){case"indicator_changed":case"indicator_created":case"indicator_deleted":return b.a.createElement(A,{data:t,name:a,pretty_name:n});case"result_changed":case"result_created":case"result_deleted":return b.a.createElement(D,{data:t,name:a,pretty_name:n});case"program_dates_changed":return b.a.createElement(I,{data:t,name:a,pretty_name:n})}}},{key:"render",value:function(){var e=this.props,t=e.data,a=e.type,n=e.name,r=e.pretty_name;return this.renderType(a,t,n,r)}}])&&C(a.prototype,n),r&&C(a,r),t}(),H=Object(j.a)(function(e){var t=e.store;return b.a.createElement("div",{id:"audit-log-index-view"},b.a.createElement("header",{className:"page-title"},b.a.createElement("h1",null,b.a.createElement("small",null,gettext("Indicator change log:"))," ",t.program_name)),b.a.createElement("div",{className:"admin-list__controls"},b.a.createElement("div",{className:"controls__bulk-actions"}),b.a.createElement("div",{className:"controls__buttons"},b.a.createElement("a",{className:"btn btn-secondary btn-sm",href:"/api/tola_management/program/".concat(t.program_id,"/export_audit_log")},b.a.createElement("i",{className:"fas fa-download"}),gettext("Excel")))),b.a.createElement("div",{className:"admin-list__table"},b.a.createElement(P.a,{isLoading:t.fetching},b.a.createElement("table",{className:"table table-sm table-bordered bg-white text-small changelog"},b.a.createElement("thead",null,b.a.createElement("tr",null,b.a.createElement("th",{className:"text-nowrap"},gettext("Date and Time")),b.a.createElement("th",{className:"text-nowrap"},gettext("No.")),b.a.createElement("th",{className:"text-nowrap"},gettext("Indicator")),b.a.createElement("th",{className:"text-nowrap"},gettext("User")),b.a.createElement("th",{className:"text-nowrap"},gettext("Organization")),b.a.createElement("th",{className:"text-nowrap"},gettext("Change Type")),b.a.createElement("th",{className:"text-nowrap"},gettext("Previous Entry")),b.a.createElement("th",{className:"text-nowrap"},gettext("New Entry")),b.a.createElement("th",{className:"text-nowrap"},gettext("Rationale")))),t.log_rows.map(function(t){return b.a.createElement("tbody",{key:t.id+"table"},b.a.createElement("tr",{key:t.id+"header",className:"changelog__entry__header is-expanded"},b.a.createElement("td",null,t.date),b.a.createElement("td",null,t.indicator?t.indicator.number:gettext("N/A")),b.a.createElement("td",null,t.indicator?t.indicator.name:gettext("N/A")),b.a.createElement("td",null,t.user),b.a.createElement("td",null,t.organization),b.a.createElement("td",null,t.pretty_change_type),b.a.createElement("td",null),b.a.createElement("td",null),b.a.createElement("td",null)),b.a.createElement("tr",{className:"changelog__entry__row",key:t.id},b.a.createElement("td",null),b.a.createElement("td",null),b.a.createElement("td",null),b.a.createElement("td",null),b.a.createElement("td",null),b.a.createElement("td",null),b.a.createElement("td",{className:"changelog__change--prev"},t.diff_list.map(function(e){return b.a.createElement(q,{key:e.name,name:e.name,pretty_name:e.pretty_name,type:t.change_type,data:e.prev})})),b.a.createElement("td",{className:"changelog__change--new"},t.diff_list.map(function(e){return b.a.createElement(q,{key:e.name,name:e.name,pretty_name:e.pretty_name,type:t.change_type,data:e.new})})),b.a.createElement("td",{className:"changelog__change--rationale"},t.rationale)))}))),b.a.createElement("div",{className:"admin-list__metadata"},b.a.createElement("div",{className:"metadata__count text-muted text-small"},t.entries_count?"".concat(t.entries_count," ").concat(gettext("entries")):"--"),b.a.createElement("div",{className:"metadata__controls"},t.total_pages&&b.a.createElement(k.a,{pageCount:t.total_pages,initialPage:t.current_page,onPageChange:function(e){return t.changePage(e)}})))))}),V=new x(jsContext.program_id,jsContext.program_name);y.a.render(b.a.createElement(H,{store:V}),document.querySelector("#app_root"))},DDFe:function(e,t,a){"use strict";var n=a("q1tI"),o=a.n(n);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],0<=t.indexOf(a)||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],0<=t.indexOf(a)||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}t.a=function(e){var t=e.children,a=e.isLoading,n=e.className,r=c(e,["children","isLoading","className"]),l=a?"loading":"";return o.a.createElement("div",i({className:"loading-spinner__container "+l+" "+(n||"")},r),o.a.createElement("div",{className:"loading-spinner__overlay"},o.a.createElement("div",{className:"loading-spinner__spinner"})),t)}},H4hL:function(e,t,a){"use strict";a("q1tI")},RCjz:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),l=a("werx"),o=a.n(l);a("okNM");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}t.a=function(e){return r.a.createElement(o.a,i({previousLabel:"‹",previousClassName:"page-item previous",previousLinkClassName:"page-link",nextLabel:"›",nextClassName:"page-item next",nextLinkClassName:"page-link",breakLabel:"...",disabledClassName:"disabled",breakClassName:"page-item disabled",breakLinkClassName:"page-link",pageClassName:"page-item",pageLinkClassName:"page-link",marginPagesDisplayed:2,pageRangeDisplayed:5,containerClassName:"pagination",activeClassName:"active"},e))}},TGVD:function(e,t,a){"use strict";var o=a("okNM"),n=a("q1tI"),i=a.n(n),r=a("TSYQ"),c=a.n(r);function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],0<=t.indexOf(a)||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],0<=t.indexOf(a)||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=function(e){var t=e.className,a=(e.size,s(e,["className","size"]));return i.a.createElement("td",u({className:["mgmt-table__col",t].join(" ")},a),a.children)},m=function(e){var t=e.className,a=(e.size,s(e,["className","size"]));return i.a.createElement("th",u({className:["mgmt-table__col",t].join(" ")},a),a.children)},p=function(e){var t=e.className,a=s(e,["className"]);return i.a.createElement("tr",u({className:["mgmt-table__row",t].join(" ")},a),a.children)},f=function(e){var t=e.className,a=s(e,["className"]);return i.a.createElement("tr",u({className:["mgmt-table__row table-header",t].join(" ")},a),a.children)},g=Object(o.a)(function(e){var t=e.className,a=e.expanded,n=e.Expando,r=s(e,["className","expanded","Expando"]);if(n){var l=Object(o.a)(n);return i.a.createElement("tbody",u({className:c()(["mgmt-table__body",t].join(" "),{"is-expanded":a})},r),i.a.createElement(p,null,r.children),a&&i.a.createElement(l,{Wrapper:d}))}return i.a.createElement("tbody",u({className:["mgmt-table__body",t].join(" ")},r),i.a.createElement(p,null,r.children))}),d=function(e){var t=e.className,a=s(e,["className"]);return i.a.createElement("tr",u({className:["mgmt-table__row--expanded",t].join(" ")},a),i.a.createElement("td",{colSpan:"6"},a.children))},b=Object(o.a)(function(e){var t=e.data,a=e.Row,n=e.keyField,r=(s(e,["data","Row","keyField"]),Object(o.a)(a));return t.map(function(e){return i.a.createElement(r,{key:e[n],data:e,Col:l,Row:g})})}),h=Object(o.a)(function(e){var t=e.HeaderRow,a=e.className,n=s(e,["HeaderRow","className"]),r=Object(o.a)(t);return i.a.createElement("table",{className:["table bg-white",a].join(" ")},i.a.createElement("thead",null,i.a.createElement(r,{Col:m,Row:f})),i.a.createElement(b,n))});t.a=h},XoI5:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var n=a("vDqi"),r=a.n(n).a.create({withCredentials:!0,baseURL:"/api/",headers:{"X-CSRFToken":document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/,"$1")}})},Z2Y6:function(e,t,a){"use strict";var n,r=a("q1tI"),l=a.n(r),o=a("5Xg7"),i=a("VCnP"),c=a.n(i),u=a("okNM");function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function p(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=function(e){return l.a.createElement("div",{className:"count__label"},e.children,e.clearable&&l.a.createElement("div",{onClick:e.clearSelect},l.a.createElement("i",{className:"fa fa-times","aria-hidden":"true"})))},h=Object(u.a)(n=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=f(this,g(t).call(this,e))).clearSelect=function(e){e.stopPropagation(),n.props.onChange([])},n.makeLabel=function(e){var t=e.placeholderButtonLabel,a=e.value;return a?Array.isArray(a)?0===a.length?l.a.createElement(b,{clearable:!1},t):1===a.length?l.a.createElement(b,{clearable:!0,clearSelect:n.clearSelect},a[0].label):l.a.createElement(b,{clearable:!0,clearSelect:n.clearSelect},"".concat(a.length," ",gettext("selected"))):l.a.createElement(b,{clearable:!1},a.label):l.a.createElement(b,{clearable:!1},t)},n}var a,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,l.a.Component),a=t,(n=[{key:"render",value:function(){return l.a.createElement(c.a,m({},this.props,{placeholder:gettext("Search"),placeholderButtonLabel:this.props.placeholder,getDropdownButtonLabel:this.makeLabel,components:{MenuList:o.a}}))}}])&&p(a.prototype,n),r&&p(a,r),t}())||n;t.a=h}},[["6bbB",0,1]]]);