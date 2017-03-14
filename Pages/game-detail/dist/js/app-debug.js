/*!
 * Vue.js v2.1.4
 * (c) 2014-2016 Evan You
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Vue=t()}(this,function(){"use strict";function e(e){return null==e?"":"object"==typeof e?JSON.stringify(e,null,2):String(e)}function t(e){var t=parseFloat(e,10);return t||0===t?t:e}function n(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}function r(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}function i(e,t){return Br.call(e,t)}function o(e){return"string"==typeof e||"number"==typeof e}function a(e){var t=Object.create(null);return function(n){var r=t[n];return r||(t[n]=e(n))}}function s(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function c(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function l(e,t){for(var n in t)e[n]=t[n];return e}function u(e){return null!==e&&"object"==typeof e}function f(e){return Wr.call(e)===Zr}function d(e){for(var t={},n=0;n<e.length;n++)e[n]&&l(t,e[n]);return t}function p(){}function v(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}function h(e,t){return e==t||!(!u(e)||!u(t))&&JSON.stringify(e)===JSON.stringify(t)}function m(e,t){for(var n=0;n<e.length;n++)if(h(e[n],t))return n;return-1}function g(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function y(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function _(e){if(!Qr.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}function b(e){return/native code/.test(e.toString())}function $(e){pi.target&&vi.push(pi.target),pi.target=e}function w(){pi.target=vi.pop()}function x(e,t){e.__proto__=t}function C(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];y(e,o,t[o])}}function k(e){if(u(e)){var t;return i(e,"__ob__")&&e.__ob__ instanceof _i?t=e.__ob__:yi.shouldConvert&&!si()&&(Array.isArray(e)||f(e))&&Object.isExtensible(e)&&!e._isVue&&(t=new _i(e)),t}}function A(e,t,n,r){var i=new pi,o=Object.getOwnPropertyDescriptor(e,t);if(!o||o.configurable!==!1){var a=o&&o.get,s=o&&o.set,c=k(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=a?a.call(e):n;return pi.target&&(i.depend(),c&&c.dep.depend(),Array.isArray(t)&&T(t)),t},set:function(t){var r=a?a.call(e):n;t===r||t!==t&&r!==r||(s?s.call(e,t):n=t,c=k(t),i.notify())}})}}function O(e,t,n){if(Array.isArray(e))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(i(e,t))return void(e[t]=n);var r=e.__ob__;if(!(e._isVue||r&&r.vmCount))return r?(A(r.value,t,n),r.dep.notify(),n):void(e[t]=n)}function S(e,t){var n=e.__ob__;e._isVue||n&&n.vmCount||i(e,t)&&(delete e[t],n&&n.dep.notify())}function T(e){for(var t=void 0,n=0,r=e.length;n<r;n++)t=e[n],t&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&T(t)}function E(e,t){if(!t)return e;for(var n,r,o,a=Object.keys(t),s=0;s<a.length;s++)n=a[s],r=e[n],o=t[n],i(e,n)?f(r)&&f(o)&&E(r,o):O(e,n,o);return e}function j(e,t){return t?e?e.concat(t):Array.isArray(t)?t:[t]:e}function N(e,t){var n=Object.create(e||null);return t?l(n,t):n}function L(e){var t=e.props;if(t){var n,r,i,o={};if(Array.isArray(t))for(n=t.length;n--;)r=t[n],"string"==typeof r&&(i=zr(r),o[i]={type:null});else if(f(t))for(var a in t)r=t[a],i=zr(a),o[i]=f(r)?r:{type:r};e.props=o}}function D(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}function M(e,t,n){function r(r){var i=bi[r]||$i;u[r]=i(e[r],t[r],n,r)}L(t),D(t);var o=t.extends;if(o&&(e="function"==typeof o?M(e,o.options,n):M(e,o,n)),t.mixins)for(var a=0,s=t.mixins.length;a<s;a++){var c=t.mixins[a];c.prototype instanceof Re&&(c=c.options),e=M(e,c,n)}var l,u={};for(l in e)r(l);for(l in t)i(e,l)||r(l);return u}function P(e,t,n,r){if("string"==typeof n){var i=e[t],o=i[n]||i[zr(n)]||i[Jr(zr(n))];return o}}function R(e,t,n,r){var o=t[e],a=!i(n,e),s=n[e];if(U(o.type)&&(a&&!i(o,"default")?s=!1:""!==s&&s!==qr(e)||(s=!0)),void 0===s){s=I(r,o,e);var c=yi.shouldConvert;yi.shouldConvert=!0,k(s),yi.shouldConvert=c}return s}function I(e,t,n){if(i(t,"default")){var r=t.default;return u(r),e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e[n]?e[n]:"function"==typeof r&&t.type!==Function?r.call(e):r}}function F(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t&&t[1]}function U(e){if(!Array.isArray(e))return"Boolean"===F(e);for(var t=0,n=e.length;t<n;t++)if("Boolean"===F(e[t]))return!0;return!1}function H(){xi.length=0,Ci={},ki=Ai=!1}function B(){for(Ai=!0,xi.sort(function(e,t){return e.id-t.id}),Oi=0;Oi<xi.length;Oi++){var e=xi[Oi],t=e.id;Ci[t]=null,e.run()}ci&&Yr.devtools&&ci.emit("flush"),H()}function V(e){var t=e.id;if(null==Ci[t]){if(Ci[t]=!0,Ai){for(var n=xi.length-1;n>=0&&xi[n].id>e.id;)n--;xi.splice(Math.max(n,Oi)+1,0,e)}else xi.push(e);ki||(ki=!0,li(B))}}function z(e){Ei.clear(),J(e,Ei)}function J(e,t){var n,r,i=Array.isArray(e);if((i||u(e))&&Object.isExtensible(e)){if(e.__ob__){var o=e.__ob__.dep.id;if(t.has(o))return;t.add(o)}if(i)for(n=e.length;n--;)J(e[n],t);else for(r=Object.keys(e),n=r.length;n--;)J(e[r[n]],t)}}function K(e){e._watchers=[],q(e),Y(e),W(e),Z(e),Q(e)}function q(e){var t=e.$options.props;if(t){var n=e.$options.propsData||{},r=e.$options._propKeys=Object.keys(t),i=!e.$parent;yi.shouldConvert=i;for(var o=function(i){var o=r[i];A(e,o,R(o,t,n,e))},a=0;a<r.length;a++)o(a);yi.shouldConvert=!0}}function W(e){var t=e.$options.data;t=e._data="function"==typeof t?t.call(e):t||{},f(t)||(t={});for(var n=Object.keys(t),r=e.$options.props,o=n.length;o--;)r&&i(r,n[o])||te(e,n[o]);k(t),t.__ob__&&t.__ob__.vmCount++}function Z(e){var t=e.$options.computed;if(t)for(var n in t){var r=t[n];"function"==typeof r?(ji.get=G(r,e),ji.set=p):(ji.get=r.get?r.cache!==!1?G(r.get,e):s(r.get,e):p,ji.set=r.set?s(r.set,e):p),Object.defineProperty(e,n,ji)}}function G(e,t){var n=new Ti(t,e,p,{lazy:!0});return function(){return n.dirty&&n.evaluate(),pi.target&&n.depend(),n.value}}function Y(e){var t=e.$options.methods;if(t)for(var n in t)e[n]=null==t[n]?p:s(t[n],e)}function Q(e){var t=e.$options.watch;if(t)for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)X(e,n,r[i]);else X(e,n,r)}}function X(e,t,n){var r;f(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}function ee(e){var t={};t.get=function(){return this._data},Object.defineProperty(e.prototype,"$data",t),e.prototype.$set=O,e.prototype.$delete=S,e.prototype.$watch=function(e,t,n){var r=this;n=n||{},n.user=!0;var i=new Ti(r,e,t,n);return n.immediate&&t.call(r,i.value),function(){i.teardown()}}}function te(e,t){g(t)||Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){return e._data[t]},set:function(n){e._data[t]=n}})}function ne(e){var t=new Ni(e.tag,e.data,e.children,e.text,e.elm,e.ns,e.context,e.componentOptions);return t.isStatic=e.isStatic,t.key=e.key,t.isCloned=!0,t}function re(e){for(var t=new Array(e.length),n=0;n<e.length;n++)t[n]=ne(e[n]);return t}function ie(e,t,n,r){r+=t;var i=e.__injected||(e.__injected={});if(!i[r]){i[r]=!0;var o=e[t];o?e[t]=function(){o.apply(this,arguments),n.apply(this,arguments)}:e[t]=n}}function oe(e,t,n,r,i){var o,a,s,c,l,u,f;for(o in e)if(a=e[o],s=t[o],a)if(s){if(a!==s)if(Array.isArray(s)){s.length=a.length;for(var d=0;d<s.length;d++)s[d]=a[d];e[o]=s}else s.fn=a,e[o]=s}else f="~"===o.charAt(0),l=f?o.slice(1):o,u="!"===l.charAt(0),l=u?l.slice(1):l,Array.isArray(a)?n(l,a.invoker=ae(a),f,u):(a.invoker||(c=a,a=e[o]={},a.fn=c,a.invoker=se(a)),n(l,a.invoker,f,u));else;for(o in t)e[o]||(f="~"===o.charAt(0),l=f?o.slice(1):o,u="!"===l.charAt(0),l=u?l.slice(1):l,r(l,t[o].invoker,u))}function ae(e){return function(t){for(var n=arguments,r=1===arguments.length,i=0;i<e.length;i++)r?e[i](t):e[i].apply(null,n)}}function se(e){return function(t){var n=1===arguments.length;n?e.fn(t):e.fn.apply(null,arguments)}}function ce(e,t,n){if(o(e))return[le(e)];if(Array.isArray(e)){for(var r=[],i=0,a=e.length;i<a;i++){var s=e[i],c=r[r.length-1];Array.isArray(s)?r.push.apply(r,ce(s,t,(n||"")+"_"+i)):o(s)?c&&c.text?c.text+=String(s):""!==s&&r.push(le(s)):s instanceof Ni&&(s.text&&c&&c.text?c.isCloned||(c.text+=s.text):(t&&ue(s,t),s.tag&&null==s.key&&null!=n&&(s.key="__vlist"+n+"_"+i+"__"),r.push(s)))}return r}}function le(e){return new Ni(void 0,void 0,void 0,String(e))}function ue(e,t){if(e.tag&&!e.ns&&(e.ns=t,e.children))for(var n=0,r=e.children.length;n<r;n++)ue(e.children[n],t)}function fe(e){return e&&e.filter(function(e){return e&&e.componentOptions})[0]}function de(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function pe(e){e.prototype._mount=function(e,t){var n=this;return n.$el=e,n.$options.render||(n.$options.render=Li),ve(n,"beforeMount"),n._watcher=new Ti(n,function(){n._update(n._render(),t)},p),t=!1,null==n.$vnode&&(n._isMounted=!0,ve(n,"mounted")),n},e.prototype._update=function(e,t){var n=this;n._isMounted&&ve(n,"beforeUpdate");var r=n.$el,i=n._vnode,o=Di;Di=n,n._vnode=e,i?n.$el=n.__patch__(i,e):n.$el=n.__patch__(n.$el,e,t,!1,n.$options._parentElm,n.$options._refElm),Di=o,r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el),n._isMounted&&ve(n,"updated")},e.prototype._updateFromParent=function(e,t,n,r){var i=this,o=!(!i.$options._renderChildren&&!r);if(i.$options._parentVnode=n,i.$vnode=n,i._vnode&&(i._vnode.parent=n),i.$options._renderChildren=r,e&&i.$options.props){yi.shouldConvert=!1;for(var a=i.$options._propKeys||[],s=0;s<a.length;s++){var c=a[s];i[c]=R(c,i.$options.props,e,i)}yi.shouldConvert=!0,i.$options.propsData=e}if(t){var l=i.$options._parentListeners;i.$options._parentListeners=t,i._updateListeners(t,l)}o&&(i.$slots=je(r,n.context),i.$forceUpdate())},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){ve(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||r(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,ve(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.__patch__(e._vnode,null)}}}function ve(e,t){var n=e.$options[t];if(n)for(var r=0,i=n.length;r<i;r++)n[r].call(e);e.$emit("hook:"+t)}function he(e,t,n,r,i){if(e){var o=n.$options._base;if(u(e)&&(e=o.extend(e)),"function"==typeof e){if(!e.cid)if(e.resolved)e=e.resolved;else if(e=we(e,o,function(){n.$forceUpdate()}),!e)return;Pe(e),t=t||{};var a=xe(t,e);if(e.options.functional)return me(e,a,t,n,r);var s=t.on;t.on=t.nativeOn,e.options.abstract&&(t={}),ke(t);var c=e.options.name||i,l=new Ni("vue-component-"+e.cid+(c?"-"+c:""),t,void 0,void 0,void 0,void 0,n,{Ctor:e,propsData:a,listeners:s,tag:i,children:r});return l}}}function me(e,t,n,r,i){var o={},a=e.options.props;if(a)for(var c in a)o[c]=R(c,a,t);var l=e.options.render.call(null,s(Oe,{_self:Object.create(r)}),{props:o,data:n,parent:r,children:ce(i),slots:function(){return je(i,r)}});return l instanceof Ni&&(l.functionalContext=r,n.slot&&((l.data||(l.data={})).slot=n.slot)),l}function ge(e,t,n,r){var i=e.componentOptions,o={_isComponent:!0,parent:t,propsData:i.propsData,_componentTag:i.tag,_parentVnode:e,_parentListeners:i.listeners,_renderChildren:i.children,_parentElm:n||null,_refElm:r||null},a=e.data.inlineTemplate;return a&&(o.render=a.render,o.staticRenderFns=a.staticRenderFns),new i.Ctor(o)}function ye(e,t,n,r){if(!e.child||e.child._isDestroyed){var i=e.child=ge(e,Di,n,r);i.$mount(t?e.elm:void 0,t)}else if(e.data.keepAlive){var o=e;_e(o,o)}}function _e(e,t){var n=t.componentOptions,r=t.child=e.child;r._updateFromParent(n.propsData,n.listeners,t,n.children)}function be(e){e.child._isMounted||(e.child._isMounted=!0,ve(e.child,"mounted")),e.data.keepAlive&&(e.child._inactive=!1,ve(e.child,"activated"))}function $e(e){e.child._isDestroyed||(e.data.keepAlive?(e.child._inactive=!0,ve(e.child,"deactivated")):e.child.$destroy())}function we(e,t,n){if(!e.requested){e.requested=!0;var r=e.pendingCallbacks=[n],i=!0,o=function(n){if(u(n)&&(n=t.extend(n)),e.resolved=n,!i)for(var o=0,a=r.length;o<a;o++)r[o](n)},a=function(e){},s=e(o,a);return s&&"function"==typeof s.then&&!e.resolved&&s.then(o,a),i=!1,e.resolved}e.pendingCallbacks.push(n)}function xe(e,t){var n=t.options.props;if(n){var r={},i=e.attrs,o=e.props,a=e.domProps;if(i||o||a)for(var s in n){var c=qr(s);Ce(r,o,s,c,!0)||Ce(r,i,s,c)||Ce(r,a,s,c)}return r}}function Ce(e,t,n,r,o){if(t){if(i(t,n))return e[n]=t[n],o||delete t[n],!0;if(i(t,r))return e[n]=t[r],o||delete t[r],!0}return!1}function ke(e){e.hook||(e.hook={});for(var t=0;t<Pi.length;t++){var n=Pi[t],r=e.hook[n],i=Mi[n];e.hook[n]=r?Ae(i,r):i}}function Ae(e,t){return function(n,r,i,o){e(n,r,i,o),t(n,r,i,o)}}function Oe(e,t,n){return t&&(Array.isArray(t)||"object"!=typeof t)&&(n=t,t=void 0),Se(this._self,e,t,n)}function Se(e,t,n,r){if(!n||!n.__ob__){if(!t)return Li();if(Array.isArray(r)&&"function"==typeof r[0]&&(n=n||{},n.scopedSlots={default:r[0]},r.length=0),"string"==typeof t){var i,o=Yr.getTagNamespace(t);if(Yr.isReservedTag(t))return new Ni(t,n,ce(r,o),void 0,void 0,o,e);if(i=P(e.$options,"components",t))return he(i,n,e,r,t);var a="foreignObject"===t?"xhtml":o;return new Ni(t,n,ce(r,a),void 0,void 0,o,e)}return he(t,n,e,r)}}function Te(e){e.$vnode=null,e._vnode=null,e._staticTrees=null;var t=e.$options._parentVnode,n=t&&t.context;e.$slots=je(e.$options._renderChildren,n),e.$scopedSlots={},e.$createElement=s(Oe,e),e.$options.el&&e.$mount(e.$options.el)}function Ee(n){function r(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&i(e[r],t+"_"+r,n);else i(e,t,n)}function i(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}n.prototype.$nextTick=function(e){return li(e,this)},n.prototype._render=function(){var e=this,t=e.$options,n=t.render,r=t.staticRenderFns,i=t._parentVnode;if(e._isMounted)for(var o in e.$slots)e.$slots[o]=re(e.$slots[o]);i&&i.data.scopedSlots&&(e.$scopedSlots=i.data.scopedSlots),r&&!e._staticTrees&&(e._staticTrees=[]),e.$vnode=i;var a;try{a=n.call(e._renderProxy,e.$createElement)}catch(t){if(!Yr.errorHandler)throw t;Yr.errorHandler.call(null,t,e),a=e._vnode}return a instanceof Ni||(a=Li()),a.parent=i,a},n.prototype._h=Oe,n.prototype._s=e,n.prototype._n=t,n.prototype._e=Li,n.prototype._q=h,n.prototype._i=m,n.prototype._m=function(e,t){var n=this._staticTrees[e];return n&&!t?Array.isArray(n)?re(n):ne(n):(n=this._staticTrees[e]=this.$options.staticRenderFns[e].call(this._renderProxy),r(n,"__static__"+e,!1),n)},n.prototype._o=function(e,t,n){return r(e,"__once__"+t+(n?"_"+n:""),!0),e};var o=function(e){return e};n.prototype._f=function(e){return P(this.$options,"filters",e,!0)||o},n.prototype._l=function(e,t){var n,r,i,o,a;if(Array.isArray(e))for(n=new Array(e.length),r=0,i=e.length;r<i;r++)n[r]=t(e[r],r);else if("number"==typeof e)for(n=new Array(e),r=0;r<e;r++)n[r]=t(r+1,r);else if(u(e))for(o=Object.keys(e),n=new Array(o.length),r=0,i=o.length;r<i;r++)a=o[r],n[r]=t(e[a],a,r);return n},n.prototype._t=function(e,t,n){var r=this.$scopedSlots[e];if(r)return r(n||{})||t;var i=this.$slots[e];return i||t},n.prototype._b=function(e,t,n,r){if(n)if(u(n)){Array.isArray(n)&&(n=d(n));for(var i in n)if("class"===i||"style"===i)e[i]=n[i];else{var o=r||Yr.mustUseProp(t,i)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={});o[i]=n[i]}}else;return e},n.prototype._k=function(e,t,n){var r=Yr.keyCodes[t]||n;return Array.isArray(r)?r.indexOf(e)===-1:r!==e}}function je(e,t){var n={};if(!e)return n;for(var r,i,o=ce(e)||[],a=[],s=0,c=o.length;s<c;s++)if(i=o[s],(i.context===t||i.functionalContext===t)&&i.data&&(r=i.data.slot)){var l=n[r]||(n[r]=[]);"template"===i.tag?l.push.apply(l,i.children):l.push(i)}else a.push(i);return a.length&&(1!==a.length||" "!==a[0].text&&!a[0].isComment)&&(n.default=a),n}function Ne(e){e._events=Object.create(null);var t=e.$options._parentListeners,n=function(t,n,r){r?e.$once(t,n):e.$on(t,n)},r=s(e.$off,e);e._updateListeners=function(t,i){oe(t,i||{},n,r,e)},t&&e._updateListeners(t)}function Le(e){e.prototype.$on=function(e,t){var n=this;return(n._events[e]||(n._events[e]=[])).push(t),n},e.prototype.$once=function(e,t){function n(){r.$off(e,n),t.apply(r,arguments)}var r=this;return n.fn=t,r.$on(e,n),r},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;var r=n._events[e];if(!r)return n;if(1===arguments.length)return n._events[e]=null,n;for(var i,o=r.length;o--;)if(i=r[o],i===t||i.fn===t){r.splice(o,1);break}return n},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?c(n):n;for(var r=c(arguments,1),i=0,o=n.length;i<o;i++)n[i].apply(t,r)}return t}}function De(e){e.prototype._init=function(e){var t=this;t._uid=Ri++,t._isVue=!0,e&&e._isComponent?Me(t,e):t.$options=M(Pe(t.constructor),e||{},t),t._renderProxy=t,t._self=t,de(t),Ne(t),ve(t,"beforeCreate"),K(t),ve(t,"created"),Te(t)}}function Me(e,t){var n=e.$options=Object.create(e.constructor.options);n.parent=t.parent,n.propsData=t.propsData,n._parentVnode=t._parentVnode,n._parentListeners=t._parentListeners,n._renderChildren=t._renderChildren,n._componentTag=t._componentTag,n._parentElm=t._parentElm,n._refElm=t._refElm,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}function Pe(e){var t=e.options;if(e.super){var n=e.super.options,r=e.superOptions,i=e.extendOptions;n!==r&&(e.superOptions=n,i.render=t.render,i.staticRenderFns=t.staticRenderFns,i._scopeId=t._scopeId,t=e.options=M(n,i),t.name&&(t.components[t.name]=e))}return t}function Re(e){this._init(e)}function Ie(e){e.use=function(e){if(!e.installed){var t=c(arguments,1);return t.unshift(this),"function"==typeof e.install?e.install.apply(e,t):e.apply(null,t),e.installed=!0,this}}}function Fe(e){e.mixin=function(e){this.options=M(this.options,e)}}function Ue(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=t++,a.options=M(n.options,e),a.super=n,a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,Yr._assetTypes.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,i[r]=a,a}}function He(e){Yr._assetTypes.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&f(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function Be(e,t){return"string"==typeof e?e.split(",").indexOf(t)>-1:e.test(t)}function Ve(e){var t={};t.get=function(){return Yr},Object.defineProperty(e,"config",t),e.util=wi,e.set=O,e.delete=S,e.nextTick=li,e.options=Object.create(null),Yr._assetTypes.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,l(e.options.components,Ui),Ie(e),Fe(e),Ue(e),He(e)}function ze(e){for(var t=e.data,n=e,r=e;r.child;)r=r.child._vnode,r.data&&(t=Je(r.data,t));for(;n=n.parent;)n.data&&(t=Je(t,n.data));return Ke(t)}function Je(e,t){return{staticClass:qe(e.staticClass,t.staticClass),class:e.class?[e.class,t.class]:t.class}}function Ke(e){var t=e.class,n=e.staticClass;return n||t?qe(n,We(t)):""}function qe(e,t){return e?t?e+" "+t:e:t||""}function We(e){var t="";if(!e)return t;if("string"==typeof e)return e;if(Array.isArray(e)){for(var n,r=0,i=e.length;r<i;r++)e[r]&&(n=We(e[r]))&&(t+=n+" ");return t.slice(0,-1)}if(u(e)){for(var o in e)e[o]&&(t+=o+" ");return t.slice(0,-1)}return t}function Ze(e){return Yi(e)?"svg":"math"===e?"math":void 0}function Ge(e){if(!ei)return!0;if(Xi(e))return!1;if(e=e.toLowerCase(),null!=eo[e])return eo[e];var t=document.createElement(e);return e.indexOf("-")>-1?eo[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:eo[e]=/HTMLUnknownElement/.test(t.toString())}function Ye(e){if("string"==typeof e){if(e=document.querySelector(e),!e)return document.createElement("div")}return e}function Qe(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&"multiple"in t.data.attrs&&n.setAttribute("multiple","multiple"),n)}function Xe(e,t){return document.createElementNS(Zi[e],t)}function et(e){return document.createTextNode(e)}function tt(e){return document.createComment(e)}function nt(e,t,n){e.insertBefore(t,n)}function rt(e,t){e.removeChild(t)}function it(e,t){e.appendChild(t)}function ot(e){return e.parentNode}function at(e){return e.nextSibling}function st(e){return e.tagName}function ct(e,t){e.textContent=t}function lt(e){return e.childNodes}function ut(e,t,n){e.setAttribute(t,n)}function ft(e,t){var n=e.data.ref;if(n){var i=e.context,o=e.child||e.elm,a=i.$refs;t?Array.isArray(a[n])?r(a[n],o):a[n]===o&&(a[n]=void 0):e.data.refInFor?Array.isArray(a[n])&&a[n].indexOf(o)<0?a[n].push(o):a[n]=[o]:a[n]=o}}function dt(e){return null==e}function pt(e){return null!=e}function vt(e,t){return e.key===t.key&&e.tag===t.tag&&e.isComment===t.isComment&&!e.data==!t.data}function ht(e,t,n){var r,i,o={};for(r=t;r<=n;++r)i=e[r].key,pt(i)&&(o[i]=r);return o}function mt(e){function t(e){return new Ni(A.tagName(e).toLowerCase(),{},[],void 0,e)}function n(e,t){function n(){0===--n.listeners&&r(e)}return n.listeners=t,n}function r(e){var t=A.parentNode(e);t&&A.removeChild(t,e)}function i(e,t,n,r,i){if(e.isRootInsert=!i,!a(e,t,n,r)){var o=e.data,s=e.children,u=e.tag;pt(u)?(e.elm=e.ns?A.createElementNS(e.ns,u):A.createElement(u,e),p(e),l(e,s,t),pt(o)&&f(e,t),c(n,e.elm,r)):e.isComment?(e.elm=A.createComment(e.text),c(n,e.elm,r)):(e.elm=A.createTextNode(e.text),c(n,e.elm,r))}}function a(e,t,n,r){var i=e.data;if(pt(i)){var o=pt(e.child)&&i.keepAlive;if(pt(i=i.hook)&&pt(i=i.init)&&i(e,!1,n,r),pt(e.child))return d(e,t),o&&s(e,t,n,r),!0}}function s(e,t,n,r){for(var i,o=e;o.child;)if(o=o.child._vnode,pt(i=o.data)&&pt(i=i.transition)){for(i=0;i<C.activate.length;++i)C.activate[i](ro,o);t.push(o);break}c(n,e.elm,r)}function c(e,t,n){e&&A.insertBefore(e,t,n)}function l(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)i(t[r],n,e.elm,null,!0);else o(e.text)&&A.appendChild(e.elm,A.createTextNode(e.text))}function u(e){for(;e.child;)e=e.child._vnode;return pt(e.tag)}function f(e,t){for(var n=0;n<C.create.length;++n)C.create[n](ro,e);w=e.data.hook,pt(w)&&(w.create&&w.create(ro,e),w.insert&&t.push(e))}function d(e,t){e.data.pendingInsert&&t.push.apply(t,e.data.pendingInsert),e.elm=e.child.$el,u(e)?(f(e,t),p(e)):(ft(e),t.push(e))}function p(e){var t;pt(t=e.context)&&pt(t=t.$options._scopeId)&&A.setAttribute(e.elm,t,""),pt(t=Di)&&t!==e.context&&pt(t=t.$options._scopeId)&&A.setAttribute(e.elm,t,"")}function v(e,t,n,r,o,a){for(;r<=o;++r)i(n[r],a,e,t)}function h(e){var t,n,r=e.data;if(pt(r))for(pt(t=r.hook)&&pt(t=t.destroy)&&t(e),t=0;t<C.destroy.length;++t)C.destroy[t](e);if(pt(t=e.children))for(n=0;n<e.children.length;++n)h(e.children[n])}function m(e,t,n,r){for(;n<=r;++n){var i=t[n];pt(i)&&(pt(i.tag)?(g(i),h(i)):A.removeChild(e,i.elm))}}function g(e,t){if(t||pt(e.data)){var i=C.remove.length+1;for(t?t.listeners+=i:t=n(e.elm,i),pt(w=e.child)&&pt(w=w._vnode)&&pt(w.data)&&g(w,t),w=0;w<C.remove.length;++w)C.remove[w](e,t);pt(w=e.data.hook)&&pt(w=w.remove)?w(e,t):t()}else r(e.elm)}function y(e,t,n,r,o){for(var a,s,c,l,u=0,f=0,d=t.length-1,p=t[0],h=t[d],g=n.length-1,y=n[0],b=n[g],$=!o;u<=d&&f<=g;)dt(p)?p=t[++u]:dt(h)?h=t[--d]:vt(p,y)?(_(p,y,r),p=t[++u],y=n[++f]):vt(h,b)?(_(h,b,r),h=t[--d],b=n[--g]):vt(p,b)?(_(p,b,r),$&&A.insertBefore(e,p.elm,A.nextSibling(h.elm)),p=t[++u],b=n[--g]):vt(h,y)?(_(h,y,r),$&&A.insertBefore(e,h.elm,p.elm),h=t[--d],y=n[++f]):(dt(a)&&(a=ht(t,u,d)),s=pt(y.key)?a[y.key]:null,dt(s)?(i(y,r,e,p.elm),y=n[++f]):(c=t[s],c.tag!==y.tag?(i(y,r,e,p.elm),y=n[++f]):(_(c,y,r),t[s]=void 0,$&&A.insertBefore(e,y.elm,p.elm),y=n[++f])));u>d?(l=dt(n[g+1])?null:n[g+1].elm,v(e,l,n,f,g,r)):f>g&&m(e,t,u,d)}function _(e,t,n,r){if(e!==t){if(t.isStatic&&e.isStatic&&t.key===e.key&&(t.isCloned||t.isOnce))return t.elm=e.elm,void(t.child=e.child);var i,o=t.data,a=pt(o);a&&pt(i=o.hook)&&pt(i=i.prepatch)&&i(e,t);var s=t.elm=e.elm,c=e.children,l=t.children;if(a&&u(t)){for(i=0;i<C.update.length;++i)C.update[i](e,t);pt(i=o.hook)&&pt(i=i.update)&&i(e,t)}dt(t.text)?pt(c)&&pt(l)?c!==l&&y(s,c,l,n,r):pt(l)?(pt(e.text)&&A.setTextContent(s,""),v(s,null,l,0,l.length-1,n)):pt(c)?m(s,c,0,c.length-1):pt(e.text)&&A.setTextContent(s,""):e.text!==t.text&&A.setTextContent(s,t.text),a&&pt(i=o.hook)&&pt(i=i.postpatch)&&i(e,t)}}function b(e,t,n){if(n&&e.parent)e.parent.data.pendingInsert=t;else for(var r=0;r<t.length;++r)t[r].data.hook.insert(t[r])}function $(e,t,n){t.elm=e;var r=t.tag,i=t.data,o=t.children;if(pt(i)&&(pt(w=i.hook)&&pt(w=w.init)&&w(t,!0),pt(w=t.child)))return d(t,n),!0;if(pt(r)){if(pt(o)){var a=A.childNodes(e);if(a.length){var s=!0;if(a.length!==o.length)s=!1;else for(var c=0;c<o.length;c++)if(!$(a[c],o[c],n)){s=!1;break}if(!s)return!1}else l(t,o,n)}pt(i)&&f(t,n)}return!0}var w,x,C={},k=e.modules,A=e.nodeOps;for(w=0;w<io.length;++w)for(C[io[w]]=[],x=0;x<k.length;++x)void 0!==k[x][io[w]]&&C[io[w]].push(k[x][io[w]]);return function(e,n,r,o,a,s){if(!n)return void(e&&h(e));var c,l,f=!1,d=[];if(e){var p=pt(e.nodeType);if(!p&&vt(e,n))_(e,n,d,o);else{if(p){if(1===e.nodeType&&e.hasAttribute("server-rendered")&&(e.removeAttribute("server-rendered"),r=!0),r&&$(e,n,d))return b(n,d,!0),e;e=t(e)}if(c=e.elm,l=A.parentNode(c),i(n,d,l,A.nextSibling(c)),n.parent){for(var v=n.parent;v;)v.elm=n.elm,v=v.parent;if(u(n))for(var g=0;g<C.create.length;++g)C.create[g](ro,n.parent)}null!==l?m(l,[e],0,0):pt(e.tag)&&h(e)}}else f=!0,i(n,d,a,s);return b(n,d,f),n.elm}}function gt(e,t){if(e.data.directives||t.data.directives){var n,r,i,o=e===ro,a=yt(e.data.directives,e.context),s=yt(t.data.directives,t.context),c=[],l=[];for(n in s)r=a[n],i=s[n],r?(i.oldValue=r.value,bt(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(bt(i,"bind",t,e),i.def&&i.def.inserted&&c.push(i));if(c.length){var u=function(){c.forEach(function(n){bt(n,"inserted",t,e)})};o?ie(t.data.hook||(t.data.hook={}),"insert",u,"dir-insert"):u()}if(l.length&&ie(t.data.hook||(t.data.hook={}),"postpatch",function(){l.forEach(function(n){bt(n,"componentUpdated",t,e)})},"dir-postpatch"),!o)for(n in a)s[n]||bt(a[n],"unbind",e)}}function yt(e,t){var n=Object.create(null);if(!e)return n;var r,i;for(r=0;r<e.length;r++)i=e[r],i.modifiers||(i.modifiers=ao),n[_t(i)]=i,i.def=P(t.$options,"directives",i.name,!0);return n}function _t(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function bt(e,t,n,r){var i=e.def&&e.def[t];i&&i(n.elm,e,n,r)}function $t(e,t){if(e.data.attrs||t.data.attrs){var n,r,i,o=t.elm,a=e.data.attrs||{},s=t.data.attrs||{};s.__ob__&&(s=t.data.attrs=l({},s));for(n in s)r=s[n],i=a[n],i!==r&&wt(o,n,r);for(n in a)null==s[n]&&(Ki(n)?o.removeAttributeNS(Ji,qi(n)):Vi(n)||o.removeAttribute(n))}}function wt(e,t,n){zi(t)?Wi(n)?e.removeAttribute(t):e.setAttribute(t,t):Vi(t)?e.setAttribute(t,Wi(n)||"false"===n?"false":"true"):Ki(t)?Wi(n)?e.removeAttributeNS(Ji,qi(t)):e.setAttributeNS(Ji,t,n):Wi(n)?e.removeAttribute(t):e.setAttribute(t,n)}function xt(e,t){var n=t.elm,r=t.data,i=e.data;if(r.staticClass||r.class||i&&(i.staticClass||i.class)){var o=ze(t),a=n._transitionClasses;a&&(o=qe(o,We(a))),o!==n._prevClass&&(n.setAttribute("class",o),n._prevClass=o)}}function Ct(e,t){if(e.data.on||t.data.on){var n=t.data.on||{},r=e.data.on||{},i=t.elm._v_add||(t.elm._v_add=function(e,n,r,i){if(r){var a=n;n=function(t){o(e,n,i),1===arguments.length?a(t):a.apply(null,arguments)}}t.elm.addEventListener(e,n,i)}),o=t.elm._v_remove||(t.elm._v_remove=function(e,n,r){t.elm.removeEventListener(e,n,r)});oe(n,r,i,o,t.context)}}function kt(e,t){if(e.data.domProps||t.data.domProps){var n,r,i=t.elm,o=e.data.domProps||{},a=t.data.domProps||{};a.__ob__&&(a=t.data.domProps=l({},a));for(n in o)null==a[n]&&(i[n]="");for(n in a)if(r=a[n],"textContent"!==n&&"innerHTML"!==n||(t.children&&(t.children.length=0),r!==o[n]))if("value"===n){i._value=r;var s=null==r?"":String(r);i.value===s||i.composing||(i.value=s)}else i[n]=r}}function At(e){var t=Ot(e.style);return e.staticStyle?l(e.staticStyle,t):t}function Ot(e){return Array.isArray(e)?d(e):"string"==typeof e?po(e):e}function St(e,t){var n,r={};if(t)for(var i=e;i.child;)i=i.child._vnode,i.data&&(n=At(i.data))&&l(r,n);(n=At(e.data))&&l(r,n);for(var o=e;o=o.parent;)o.data&&(n=At(o.data))&&l(r,n);return r}function Tt(e,t){var n=t.data,r=e.data;if(n.staticStyle||n.style||r.staticStyle||r.style){var i,o,a=t.elm,s=e.data.staticStyle,c=e.data.style||{},u=s||c,f=Ot(t.data.style)||{};t.data.style=f.__ob__?l({},f):f;var d=St(t,!0);for(o in u)null==d[o]&&mo(a,o,"");for(o in d)i=d[o],i!==u[o]&&mo(a,o,null==i?"":i)}}function Et(e,t){if(t&&t.trim())if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+e.getAttribute("class")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function jt(e,t){if(t&&t.trim())if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t);else{for(var n=" "+e.getAttribute("class")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");e.setAttribute("class",n.trim())}}function Nt(e){Oo(function(){Oo(e)})}function Lt(e,t){(e._transitionClasses||(e._transitionClasses=[])).push(t),Et(e,t)}function Dt(e,t){e._transitionClasses&&r(e._transitionClasses,t),jt(e,t)}function Mt(e,t,n){var r=Pt(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===$o?Co:Ao,c=0,l=function(){e.removeEventListener(s,u),n()},u=function(t){t.target===e&&++c>=a&&l()};setTimeout(function(){c<a&&l()},o+1),e.addEventListener(s,u)}function Pt(e,t){var n,r=window.getComputedStyle(e),i=r[xo+"Delay"].split(", "),o=r[xo+"Duration"].split(", "),a=Rt(i,o),s=r[ko+"Delay"].split(", "),c=r[ko+"Duration"].split(", "),l=Rt(s,c),u=0,f=0;t===$o?a>0&&(n=$o,u=a,f=o.length):t===wo?l>0&&(n=wo,u=l,f=c.length):(u=Math.max(a,l),n=u>0?a>l?$o:wo:null,f=n?n===$o?o.length:c.length:0);var d=n===$o&&So.test(r[xo+"Property"]);return{type:n,timeout:u,propCount:f,hasTransform:d}}function Rt(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return It(t)+It(e[n])}))}function It(e){return 1e3*Number(e.slice(0,-1))}function Ft(e){var t=e.elm;t._leaveCb&&(t._leaveCb.cancelled=!0,t._leaveCb());var n=Ht(e.data.transition);if(n&&!t._enterCb&&1===t.nodeType){for(var r=n.css,i=n.type,o=n.enterClass,a=n.enterActiveClass,s=n.appearClass,c=n.appearActiveClass,l=n.beforeEnter,u=n.enter,f=n.afterEnter,d=n.enterCancelled,p=n.beforeAppear,v=n.appear,h=n.afterAppear,m=n.appearCancelled,g=Di,y=Di.$vnode;y&&y.parent;)y=y.parent,g=y.context;var _=!g._isMounted||!e.isRootInsert;if(!_||v||""===v){var b=_?s:o,$=_?c:a,w=_?p||l:l,x=_&&"function"==typeof v?v:u,C=_?h||f:f,k=_?m||d:d,A=r!==!1&&!ri,O=x&&(x._length||x.length)>1,S=t._enterCb=Bt(function(){A&&Dt(t,$),S.cancelled?(A&&Dt(t,b),k&&k(t)):C&&C(t),t._enterCb=null});e.data.show||ie(e.data.hook||(e.data.hook={}),"insert",function(){var n=t.parentNode,r=n&&n._pending&&n._pending[e.key];r&&r.context===e.context&&r.tag===e.tag&&r.elm._leaveCb&&r.elm._leaveCb(),x&&x(t,S)},"transition-insert"),w&&w(t),A&&(Lt(t,b),Lt(t,$),Nt(function(){Dt(t,b),S.cancelled||O||Mt(t,i,S)})),e.data.show&&x&&x(t,S),A||O||S()}}}function Ut(e,t){function n(){m.cancelled||(e.data.show||((r.parentNode._pending||(r.parentNode._pending={}))[e.key]=e),l&&l(r),v&&(Lt(r,s),Lt(r,c),Nt(function(){Dt(r,s),m.cancelled||h||Mt(r,a,m);
})),u&&u(r,m),v||h||m())}var r=e.elm;r._enterCb&&(r._enterCb.cancelled=!0,r._enterCb());var i=Ht(e.data.transition);if(!i)return t();if(!r._leaveCb&&1===r.nodeType){var o=i.css,a=i.type,s=i.leaveClass,c=i.leaveActiveClass,l=i.beforeLeave,u=i.leave,f=i.afterLeave,d=i.leaveCancelled,p=i.delayLeave,v=o!==!1&&!ri,h=u&&(u._length||u.length)>1,m=r._leaveCb=Bt(function(){r.parentNode&&r.parentNode._pending&&(r.parentNode._pending[e.key]=null),v&&Dt(r,c),m.cancelled?(v&&Dt(r,s),d&&d(r)):(t(),f&&f(r)),r._leaveCb=null});p?p(n):n()}}function Ht(e){if(e){if("object"==typeof e){var t={};return e.css!==!1&&l(t,To(e.name||"v")),l(t,e),t}return"string"==typeof e?To(e):void 0}}function Bt(e){var t=!1;return function(){t||(t=!0,e())}}function Vt(e,t){t.data.show||Ft(t)}function zt(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=m(r,Kt(a))>-1,a.selected!==o&&(a.selected=o);else if(h(Kt(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function Jt(e,t){for(var n=0,r=t.length;n<r;n++)if(h(Kt(t[n]),e))return!1;return!0}function Kt(e){return"_value"in e?e._value:e.value}function qt(e){e.target.composing=!0}function Wt(e){e.target.composing=!1,Zt(e.target,"input")}function Zt(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function Gt(e){return!e.child||e.data&&e.data.transition?e:Gt(e.child._vnode)}function Yt(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?Yt(fe(t.children)):e}function Qt(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[zr(o)]=i[o].fn;return t}function Xt(e,t){return/\d-keep-alive$/.test(t.tag)?e("keep-alive"):null}function en(e){for(;e=e.parent;)if(e.data.transition)return!0}function tn(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function nn(e){e.data.newPos=e.elm.getBoundingClientRect()}function rn(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function on(e,t){var n=document.createElement("div");return n.innerHTML='<div a="'+e+'">',n.innerHTML.indexOf(t)>0}function an(e){return Bo=Bo||document.createElement("div"),Bo.innerHTML=e,Bo.textContent}function sn(e,t){return t&&(e=e.replace(Pa,"\n")),e.replace(Da,"<").replace(Ma,">").replace(Ra,"&").replace(Ia,'"')}function cn(e,t){function n(t){f+=t,e=e.substring(t)}function r(){var t=e.match(Xo);if(t){var r={tagName:t[1],attrs:[],start:f};n(t[0].length);for(var i,o;!(i=e.match(ea))&&(o=e.match(Go));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=f,r}}function i(e){var n=e.tagName,r=e.unarySlash;l&&("p"===s&&Ko(n)&&o("",s),Jo(n)&&s===n&&o("",n));for(var i=u(n)||"html"===n&&"head"===s||!!r,a=e.attrs.length,f=new Array(a),d=0;d<a;d++){var p=e.attrs[d];oa&&p[0].indexOf('""')===-1&&(""===p[3]&&delete p[3],""===p[4]&&delete p[4],""===p[5]&&delete p[5]);var v=p[3]||p[4]||p[5]||"";f[d]={name:p[1],value:sn(v,t.shouldDecodeNewlines)}}i||(c.push({tag:n,attrs:f}),s=n,r=""),t.start&&t.start(n,f,i,e.start,e.end)}function o(e,n,r,i){var o;if(null==r&&(r=f),null==i&&(i=f),n){var a=n.toLowerCase();for(o=c.length-1;o>=0&&c[o].tag.toLowerCase()!==a;o--);}else o=0;if(o>=0){for(var l=c.length-1;l>=o;l--)t.end&&t.end(c[l].tag,r,i);c.length=o,s=o&&c[o-1].tag}else"br"===n.toLowerCase()?t.start&&t.start(n,[],!0,r,i):"p"===n.toLowerCase()&&(t.start&&t.start(n,[],!1,r,i),t.end&&t.end(n,r,i))}for(var a,s,c=[],l=t.expectHTML,u=t.isUnaryTag||Gr,f=0;e;){if(a=e,s&&Na(s,t.sfc,c)){var d=s.toLowerCase(),p=La[d]||(La[d]=new RegExp("([\\s\\S]*?)(</"+d+"[^>]*>)","i")),v=0,h=e.replace(p,function(e,n,r){return v=r.length,"script"!==d&&"style"!==d&&"noscript"!==d&&(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),t.chars&&t.chars(n),""});f+=e.length-h.length,e=h,o("</"+d+">",d,f-v,f)}else{var m=e.indexOf("<");if(0===m){if(ra.test(e)){var g=e.indexOf("-->");if(g>=0){n(g+3);continue}}if(ia.test(e)){var y=e.indexOf("]>");if(y>=0){n(y+2);continue}}var _=e.match(na);if(_){n(_[0].length);continue}var b=e.match(ta);if(b){var $=f;n(b[0].length),o(b[0],b[1],$,f);continue}var w=r();if(w){i(w);continue}}var x=void 0,C=void 0,k=void 0;if(m>0){for(C=e.slice(m);!(ta.test(C)||Xo.test(C)||ra.test(C)||ia.test(C)||(k=C.indexOf("<",1),k<0));)m+=k,C=e.slice(m);x=e.substring(0,m),n(m)}m<0&&(x=e,e=""),t.chars&&x&&t.chars(x)}if(e===a&&t.chars){t.chars(e);break}}o()}function ln(e){function t(){(a||(a=[])).push(e.slice(v,i).trim()),v=i+1}var n,r,i,o,a,s=!1,c=!1,l=!1,u=!1,f=0,d=0,p=0,v=0;for(i=0;i<e.length;i++)if(r=n,n=e.charCodeAt(i),s)39===n&&92!==r&&(s=!1);else if(c)34===n&&92!==r&&(c=!1);else if(l)96===n&&92!==r&&(l=!1);else if(u)47===n&&92!==r&&(u=!1);else if(124!==n||124===e.charCodeAt(i+1)||124===e.charCodeAt(i-1)||f||d||p)switch(n){case 34:c=!0;break;case 39:s=!0;break;case 96:l=!0;break;case 47:u=!0;break;case 40:p++;break;case 41:p--;break;case 91:d++;break;case 93:d--;break;case 123:f++;break;case 125:f--}else void 0===o?(v=i+1,o=e.slice(0,i).trim()):t();if(void 0===o?o=e.slice(0,i).trim():0!==v&&t(),a)for(i=0;i<a.length;i++)o=un(o,a[i]);return o}function un(e,t){var n=t.indexOf("(");if(n<0)return'_f("'+t+'")('+e+")";var r=t.slice(0,n),i=t.slice(n+1);return'_f("'+r+'")('+e+","+i}function fn(e,t){var n=t?Ha(t):Fa;if(n.test(e)){for(var r,i,o=[],a=n.lastIndex=0;r=n.exec(e);){i=r.index,i>a&&o.push(JSON.stringify(e.slice(a,i)));var s=ln(r[1].trim());o.push("_s("+s+")"),a=i+r[0].length}return a<e.length&&o.push(JSON.stringify(e.slice(a))),o.join("+")}}function dn(e){console.error("[Vue parser]: "+e)}function pn(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function vn(e,t,n){(e.props||(e.props=[])).push({name:t,value:n})}function hn(e,t,n){(e.attrs||(e.attrs=[])).push({name:t,value:n})}function mn(e,t,n,r,i,o){(e.directives||(e.directives=[])).push({name:t,rawName:n,value:r,arg:i,modifiers:o})}function gn(e,t,n,r,i){r&&r.capture&&(delete r.capture,t="!"+t),r&&r.once&&(delete r.once,t="~"+t);var o;r&&r.native?(delete r.native,o=e.nativeEvents||(e.nativeEvents={})):o=e.events||(e.events={});var a={value:n,modifiers:r},s=o[t];Array.isArray(s)?i?s.unshift(a):s.push(a):s?o[t]=i?[a,s]:[s,a]:o[t]=a}function yn(e,t,n){var r=_n(e,":"+t)||_n(e,"v-bind:"+t);if(null!=r)return ln(r);if(n!==!1){var i=_n(e,t);if(null!=i)return JSON.stringify(i)}}function _n(e,t){var n;if(null!=(n=e.attrsMap[t]))for(var r=e.attrsList,i=0,o=r.length;i<o;i++)if(r[i].name===t){r.splice(i,1);break}return n}function bn(e){if(sa=e,aa=sa.length,la=ua=fa=0,e.indexOf("[")<0||e.lastIndexOf("]")<aa-1)return{exp:e,idx:null};for(;!wn();)ca=$n(),xn(ca)?kn(ca):91===ca&&Cn(ca);return{exp:e.substring(0,ua),idx:e.substring(ua+1,fa)}}function $n(){return sa.charCodeAt(++la)}function wn(){return la>=aa}function xn(e){return 34===e||39===e}function Cn(e){var t=1;for(ua=la;!wn();)if(e=$n(),xn(e))kn(e);else if(91===e&&t++,93===e&&t--,0===t){fa=la;break}}function kn(e){for(var t=e;!wn()&&(e=$n(),e!==t););}function An(e,t){da=t.warn||dn,pa=t.getTagNamespace||Gr,va=t.mustUseProp||Gr,ha=t.isPreTag||Gr,ma=pn(t.modules,"preTransformNode"),ga=pn(t.modules,"transformNode"),ya=pn(t.modules,"postTransformNode"),_a=t.delimiters;var n,r,i=[],o=t.preserveWhitespace!==!1,a=!1,s=!1;return cn(e,{expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,shouldDecodeNewlines:t.shouldDecodeNewlines,start:function(e,o,c){function l(e){}var u=r&&r.ns||pa(e);ni&&"svg"===u&&(o=zn(o));var f={type:1,tag:e,attrsList:o,attrsMap:Hn(o),parent:r,children:[]};u&&(f.ns=u),Vn(f)&&!si()&&(f.forbidden=!0);for(var d=0;d<ma.length;d++)ma[d](f,t);if(a||(On(f),f.pre&&(a=!0)),ha(f.tag)&&(s=!0),a)Sn(f);else{jn(f),Nn(f),Mn(f),Tn(f),f.plain=!f.key&&!o.length,En(f),Pn(f),Rn(f);for(var p=0;p<ga.length;p++)ga[p](f,t);In(f)}if(n?i.length||n.if&&(f.elseif||f.else)&&(l(f),Dn(n,{exp:f.elseif,block:f})):(n=f,l(n)),r&&!f.forbidden)if(f.elseif||f.else)Ln(f,r);else if(f.slotScope){r.plain=!1;var v=f.slotTarget||"default";(r.scopedSlots||(r.scopedSlots={}))[v]=f}else r.children.push(f),f.parent=r;c||(r=f,i.push(f));for(var h=0;h<ya.length;h++)ya[h](f,t)},end:function(){var e=i[i.length-1],t=e.children[e.children.length-1];t&&3===t.type&&" "===t.text&&e.children.pop(),i.length-=1,r=i[i.length-1],e.pre&&(a=!1),ha(e.tag)&&(s=!1)},chars:function(e){if(r&&(!ni||"textarea"!==r.tag||r.attrsMap.placeholder!==e)&&(e=s||e.trim()?Za(e):o&&r.children.length?" ":"")){var t;!a&&" "!==e&&(t=fn(e,_a))?r.children.push({type:2,expression:t,text:e}):r.children.push({type:3,text:e})}}}),n}function On(e){null!=_n(e,"v-pre")&&(e.pre=!0)}function Sn(e){var t=e.attrsList.length;if(t)for(var n=e.attrs=new Array(t),r=0;r<t;r++)n[r]={name:e.attrsList[r].name,value:JSON.stringify(e.attrsList[r].value)};else e.pre||(e.plain=!0)}function Tn(e){var t=yn(e,"key");t&&(e.key=t)}function En(e){var t=yn(e,"ref");t&&(e.ref=t,e.refInFor=Fn(e))}function jn(e){var t;if(t=_n(e,"v-for")){var n=t.match(Va);if(!n)return;e.for=n[2].trim();var r=n[1].trim(),i=r.match(za);i?(e.alias=i[1].trim(),e.iterator1=i[2].trim(),i[3]&&(e.iterator2=i[3].trim())):e.alias=r}}function Nn(e){var t=_n(e,"v-if");if(t)e.if=t,Dn(e,{exp:t,block:e});else{null!=_n(e,"v-else")&&(e.else=!0);var n=_n(e,"v-else-if");n&&(e.elseif=n)}}function Ln(e,t){var n=Bn(t.children);n&&n.if&&Dn(n,{exp:e.elseif,block:e})}function Dn(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function Mn(e){var t=_n(e,"v-once");null!=t&&(e.once=!0)}function Pn(e){if("slot"===e.tag)e.slotName=yn(e,"name");else{var t=yn(e,"slot");t&&(e.slotTarget='""'===t?'"default"':t),"template"===e.tag&&(e.slotScope=_n(e,"scope"))}}function Rn(e){var t;(t=yn(e,"is"))&&(e.component=t),null!=_n(e,"inline-template")&&(e.inlineTemplate=!0)}function In(e){var t,n,r,i,o,a,s,c,l=e.attrsList;for(t=0,n=l.length;t<n;t++)if(r=i=l[t].name,o=l[t].value,Ba.test(r))if(e.hasBindings=!0,s=Un(r),s&&(r=r.replace(Wa,"")),Ja.test(r))r=r.replace(Ja,""),o=ln(o),s&&(s.prop&&(c=!0,r=zr(r),"innerHtml"===r&&(r="innerHTML")),s.camel&&(r=zr(r))),c||va(e.tag,r)?vn(e,r,o):hn(e,r,o);else if(Ka.test(r))r=r.replace(Ka,""),gn(e,r,o,s);else{r=r.replace(Ba,"");var u=r.match(qa);u&&(a=u[1])&&(r=r.slice(0,-(a.length+1))),mn(e,r,i,o,a,s)}else hn(e,r,JSON.stringify(o))}function Fn(e){for(var t=e;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}function Un(e){var t=e.match(Wa);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function Hn(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}function Bn(e){for(var t=e.length;t--;)if(e[t].tag)return e[t]}function Vn(e){return"style"===e.tag||"script"===e.tag&&(!e.attrsMap.type||"text/javascript"===e.attrsMap.type)}function zn(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];Ga.test(r.name)||(r.name=r.name.replace(Ya,""),t.push(r))}return t}function Jn(e,t){e&&(ba=Qa(t.staticKeys||""),$a=t.isReservedTag||Gr,qn(e),Wn(e,!1))}function Kn(e){return n("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(e?","+e:""))}function qn(e){if(e.static=Gn(e),1===e.type){if(!$a(e.tag)&&"slot"!==e.tag&&null==e.attrsMap["inline-template"])return;for(var t=0,n=e.children.length;t<n;t++){var r=e.children[t];qn(r),r.static||(e.static=!1)}}}function Wn(e,t){if(1===e.type){if((e.static||e.once)&&(e.staticInFor=t),e.static&&e.children.length&&(1!==e.children.length||3!==e.children[0].type))return void(e.staticRoot=!0);if(e.staticRoot=!1,e.children)for(var n=0,r=e.children.length;n<r;n++)Wn(e.children[n],t||!!e.for);e.ifConditions&&Zn(e.ifConditions,t)}}function Zn(e,t){for(var n=1,r=e.length;n<r;n++)Wn(e[n].block,t)}function Gn(e){return 2!==e.type&&(3===e.type||!(!e.pre&&(e.hasBindings||e.if||e.for||Hr(e.tag)||!$a(e.tag)||Yn(e)||!Object.keys(e).every(ba))))}function Yn(e){for(;e.parent;){if(e=e.parent,"template"!==e.tag)return!1;if(e.for)return!0}return!1}function Qn(e,t){var n=t?"nativeOn:{":"on:{";for(var r in e)n+='"'+r+'":'+Xn(r,e[r])+",";return n.slice(0,-1)+"}"}function Xn(e,t){if(t){if(Array.isArray(t))return"["+t.map(function(t){return Xn(e,t)}).join(",")+"]";if(t.modifiers){var n="",r=[];for(var i in t.modifiers)ns[i]?n+=ns[i]:r.push(i);r.length&&(n=er(r)+n);var o=es.test(t.value)?t.value+"($event)":t.value;return"function($event){"+n+o+"}"}return Xa.test(t.value)||es.test(t.value)?t.value:"function($event){"+t.value+"}"}return"function(){}"}function er(e){return"if("+e.map(tr).join("&&")+")return;"}function tr(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=ts[e];return"_k($event.keyCode,"+JSON.stringify(e)+(n?","+JSON.stringify(n):"")+")"}function nr(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+(t.modifiers&&t.modifiers.prop?",true":"")+")"}}function rr(e,t){var n=Aa,r=Aa=[],i=Oa;Oa=0,Sa=t,wa=t.warn||dn,xa=pn(t.modules,"transformCode"),Ca=pn(t.modules,"genData"),ka=t.directives||{};var o=e?ir(e):'_h("div")';return Aa=n,Oa=i,{render:"with(this){return "+o+"}",staticRenderFns:r}}function ir(e){if(e.staticRoot&&!e.staticProcessed)return or(e);if(e.once&&!e.onceProcessed)return ar(e);if(e.for&&!e.forProcessed)return lr(e);if(e.if&&!e.ifProcessed)return sr(e);if("template"!==e.tag||e.slotTarget){if("slot"===e.tag)return yr(e);var t;if(e.component)t=_r(e.component,e);else{var n=e.plain?void 0:ur(e),r=e.inlineTemplate?null:hr(e);t="_h('"+e.tag+"'"+(n?","+n:"")+(r?","+r:"")+")"}for(var i=0;i<xa.length;i++)t=xa[i](e,t);return t}return hr(e)||"void 0"}function or(e){return e.staticProcessed=!0,Aa.push("with(this){return "+ir(e)+"}"),"_m("+(Aa.length-1)+(e.staticInFor?",true":"")+")"}function ar(e){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return sr(e);if(e.staticInFor){for(var t="",n=e.parent;n;){if(n.for){t=n.key;break}n=n.parent}return t?"_o("+ir(e)+","+Oa++ +(t?","+t:"")+")":ir(e)}return or(e)}function sr(e){return e.ifProcessed=!0,cr(e.ifConditions.slice())}function cr(e){function t(e){return e.once?ar(e):ir(e)}if(!e.length)return"_e()";var n=e.shift();return n.exp?"("+n.exp+")?"+t(n.block)+":"+cr(e):""+t(n.block)}function lr(e){var t=e.for,n=e.alias,r=e.iterator1?","+e.iterator1:"",i=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,"_l(("+t+"),function("+n+r+i+"){return "+ir(e)+"})"}function ur(e){var t="{",n=fr(e);n&&(t+=n+","),e.key&&(t+="key:"+e.key+","),e.ref&&(t+="ref:"+e.ref+","),e.refInFor&&(t+="refInFor:true,"),e.pre&&(t+="pre:true,"),e.component&&(t+='tag:"'+e.tag+'",');for(var r=0;r<Ca.length;r++)t+=Ca[r](e);if(e.attrs&&(t+="attrs:{"+br(e.attrs)+"},"),e.props&&(t+="domProps:{"+br(e.props)+"},"),e.events&&(t+=Qn(e.events)+","),e.nativeEvents&&(t+=Qn(e.nativeEvents,!0)+","),e.slotTarget&&(t+="slot:"+e.slotTarget+","),e.scopedSlots&&(t+=pr(e.scopedSlots)+","),e.inlineTemplate){var i=dr(e);i&&(t+=i+",")}return t=t.replace(/,$/,"")+"}",e.wrapData&&(t=e.wrapData(t)),t}function fr(e){var t=e.directives;if(t){var n,r,i,o,a="directives:[",s=!1;for(n=0,r=t.length;n<r;n++){i=t[n],o=!0;var c=ka[i.name]||rs[i.name];c&&(o=!!c(e,i,wa)),o&&(s=!0,a+='{name:"'+i.name+'",rawName:"'+i.rawName+'"'+(i.value?",value:("+i.value+"),expression:"+JSON.stringify(i.value):"")+(i.arg?',arg:"'+i.arg+'"':"")+(i.modifiers?",modifiers:"+JSON.stringify(i.modifiers):"")+"},")}return s?a.slice(0,-1)+"]":void 0}}function dr(e){var t=e.children[0];if(1===t.type){var n=rr(t,Sa);return"inlineTemplate:{render:function(){"+n.render+"},staticRenderFns:["+n.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}function pr(e){return"scopedSlots:{"+Object.keys(e).map(function(t){return vr(t,e[t])}).join(",")+"}"}function vr(e,t){return e+":function("+String(t.attrsMap.scope)+"){return "+("template"===t.tag?hr(t)||"void 0":ir(t))+"}"}function hr(e){if(e.children.length)return"["+e.children.map(mr).join(",")+"]"}function mr(e){return 1===e.type?ir(e):gr(e)}function gr(e){return 2===e.type?e.expression:$r(JSON.stringify(e.text))}function yr(e){var t=e.slotName||'"default"',n=hr(e);return"_t("+t+(n?","+n:"")+(e.attrs?(n?"":",null")+",{"+e.attrs.map(function(e){return zr(e.name)+":"+e.value}).join(",")+"}":"")+")"}function _r(e,t){var n=t.inlineTemplate?null:hr(t);return"_h("+e+","+ur(t)+(n?","+n:"")+")"}function br(e){for(var t="",n=0;n<e.length;n++){var r=e[n];t+='"'+r.name+'":'+$r(r.value)+","}return t.slice(0,-1)}function $r(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function wr(e,t){var n=An(e.trim(),t);Jn(n,t);var r=rr(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}}function xr(e,t){var n=(t.warn||dn,_n(e,"class"));n&&(e.staticClass=JSON.stringify(n));var r=yn(e,"class",!1);r&&(e.classBinding=r)}function Cr(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}function kr(e,t){var n=(t.warn||dn,_n(e,"style"));n&&(e.staticStyle=JSON.stringify(po(n)));var r=yn(e,"style",!1);r&&(e.styleBinding=r)}function Ar(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}function Or(e,t,n){Ta=n;var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;return"select"===o?jr(e,r,i):"input"===o&&"checkbox"===a?Sr(e,r,i):"input"===o&&"radio"===a?Tr(e,r,i):Er(e,r,i),!0}function Sr(e,t,n){var r=n&&n.number,i=yn(e,"value")||"null",o=yn(e,"true-value")||"true",a=yn(e,"false-value")||"false";vn(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1:_q("+t+","+o+")"),gn(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$c){$$i<0&&("+t+"=$$a.concat($$v))}else{$$i>-1&&("+t+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+t+"=$$c}",null,!0)}function Tr(e,t,n){var r=n&&n.number,i=yn(e,"value")||"null";i=r?"_n("+i+")":i,vn(e,"checked","_q("+t+","+i+")"),gn(e,"change",Nr(t,i),null,!0)}function Er(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=o||ni&&"range"===r?"change":"input",l=!o&&"range"!==r,u="input"===e.tag||"textarea"===e.tag,f=u?"$event.target.value"+(s?".trim()":""):s?"(typeof $event === 'string' ? $event.trim() : $event)":"$event";f=a||"number"===r?"_n("+f+")":f;var d=Nr(t,f);u&&l&&(d="if($event.target.composing)return;"+d),vn(e,"value",u?"_s("+t+")":"("+t+")"),gn(e,c,d,null,!0)}function jr(e,t,n){var r=n&&n.number,i='Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(r?"_n(val)":"val")+"})"+(null==e.attrsMap.multiple?"[0]":""),o=Nr(t,i);gn(e,"change",o,null,!0)}function Nr(e,t){var n=bn(e);return null===n.idx?e+"="+t:"var $$exp = "+n.exp+", $$idx = "+n.idx+";if (!Array.isArray($$exp)){"+e+"="+t+"}else{$$exp.splice($$idx, 1, "+t+")}"}function Lr(e,t){t.value&&vn(e,"textContent","_s("+t.value+")")}function Dr(e,t){t.value&&vn(e,"innerHTML","_s("+t.value+")")}function Mr(e,t){return t=t?l(l({},ls),t):ls,wr(e,t)}function Pr(e,t,n){var r=(t&&t.warn||fi,t&&t.delimiters?String(t.delimiters)+e:e);if(cs[r])return cs[r];var i={},o=Mr(e,t);i.render=Rr(o.render);var a=o.staticRenderFns.length;i.staticRenderFns=new Array(a);for(var s=0;s<a;s++)i.staticRenderFns[s]=Rr(o.staticRenderFns[s]);return cs[r]=i}function Rr(e){try{return new Function(e)}catch(e){return p}}function Ir(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}var Fr,Ur,Hr=n("slot,component",!0),Br=Object.prototype.hasOwnProperty,Vr=/-(\w)/g,zr=a(function(e){return e.replace(Vr,function(e,t){return t?t.toUpperCase():""})}),Jr=a(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),Kr=/([^-])([A-Z])/g,qr=a(function(e){return e.replace(Kr,"$1-$2").replace(Kr,"$1-$2").toLowerCase()}),Wr=Object.prototype.toString,Zr="[object Object]",Gr=function(){return!1},Yr={optionMergeStrategies:Object.create(null),silent:!1,devtools:!1,errorHandler:null,ignoredElements:null,keyCodes:Object.create(null),isReservedTag:Gr,isUnknownElement:Gr,getTagNamespace:p,mustUseProp:Gr,_assetTypes:["component","directive","filter"],_lifecycleHooks:["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated"],_maxUpdateCount:100},Qr=/[^\w.$]/,Xr="__proto__"in{},ei="undefined"!=typeof window,ti=ei&&window.navigator.userAgent.toLowerCase(),ni=ti&&/msie|trident/.test(ti),ri=ti&&ti.indexOf("msie 9.0")>0,ii=ti&&ti.indexOf("edge/")>0,oi=ti&&ti.indexOf("android")>0,ai=ti&&/iphone|ipad|ipod|ios/.test(ti),si=function(){return void 0===Fr&&(Fr=!ei&&"undefined"!=typeof global&&"server"===global.process.env.VUE_ENV),Fr},ci=ei&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,li=function(){function e(){r=!1;var e=n.slice(0);n.length=0;for(var t=0;t<e.length;t++)e[t]()}var t,n=[],r=!1;if("undefined"!=typeof Promise&&b(Promise)){var i=Promise.resolve(),o=function(e){console.error(e)};t=function(){i.then(e).catch(o),ai&&setTimeout(p)}}else if("undefined"==typeof MutationObserver||!b(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())t=function(){setTimeout(e,0)};else{var a=1,s=new MutationObserver(e),c=document.createTextNode(String(a));s.observe(c,{characterData:!0}),t=function(){a=(a+1)%2,c.data=String(a)}}return function(e,i){var o;if(n.push(function(){e&&e.call(i),o&&o(i)}),r||(r=!0,t()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){o=e})}}();Ur="undefined"!=typeof Set&&b(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return void 0!==this.set[e]},e.prototype.add=function(e){this.set[e]=1},e.prototype.clear=function(){this.set=Object.create(null)},e}();var ui,fi=p,di=0,pi=function(){this.id=di++,this.subs=[]};pi.prototype.addSub=function(e){this.subs.push(e)},pi.prototype.removeSub=function(e){r(this.subs,e)},pi.prototype.depend=function(){pi.target&&pi.target.addDep(this)},pi.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},pi.target=null;var vi=[],hi=Array.prototype,mi=Object.create(hi);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=hi[e];y(mi,e,function(){for(var n=arguments,r=arguments.length,i=new Array(r);r--;)i[r]=n[r];var o,a=t.apply(this,i),s=this.__ob__;switch(e){case"push":o=i;break;case"unshift":o=i;break;case"splice":o=i.slice(2)}return o&&s.observeArray(o),s.dep.notify(),a})});var gi=Object.getOwnPropertyNames(mi),yi={shouldConvert:!0,isSettingProps:!1},_i=function(e){if(this.value=e,this.dep=new pi,this.vmCount=0,y(e,"__ob__",this),Array.isArray(e)){var t=Xr?x:C;t(e,mi,gi),this.observeArray(e)}else this.walk(e)};_i.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)A(e,t[n],e[t[n]])},_i.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)k(e[t])};var bi=Yr.optionMergeStrategies;bi.data=function(e,t,n){return n?e||t?function(){var r="function"==typeof t?t.call(n):t,i="function"==typeof e?e.call(n):void 0;return r?E(r,i):i}:void 0:t?"function"!=typeof t?e:e?function(){return E(t.call(this),e.call(this))}:t:e},Yr._lifecycleHooks.forEach(function(e){bi[e]=j}),Yr._assetTypes.forEach(function(e){bi[e+"s"]=N}),bi.watch=function(e,t){if(!t)return e;if(!e)return t;var n={};l(n,e);for(var r in t){var i=n[r],o=t[r];i&&!Array.isArray(i)&&(i=[i]),n[r]=i?i.concat(o):[o]}return n},bi.props=bi.methods=bi.computed=function(e,t){if(!t)return e;if(!e)return t;var n=Object.create(null);return l(n,e),l(n,t),n};var $i=function(e,t){return void 0===t?e:t},wi=Object.freeze({defineReactive:A,_toString:e,toNumber:t,makeMap:n,isBuiltInTag:Hr,remove:r,hasOwn:i,isPrimitive:o,cached:a,camelize:zr,capitalize:Jr,hyphenate:qr,bind:s,toArray:c,extend:l,isObject:u,isPlainObject:f,toObject:d,noop:p,no:Gr,genStaticKeys:v,looseEqual:h,looseIndexOf:m,isReserved:g,def:y,parsePath:_,hasProto:Xr,inBrowser:ei,UA:ti,isIE:ni,isIE9:ri,isEdge:ii,isAndroid:oi,isIOS:ai,isServerRendering:si,devtools:ci,nextTick:li,get _Set(){return Ur},mergeOptions:M,resolveAsset:P,warn:fi,formatComponentName:ui,validateProp:R}),xi=[],Ci={},ki=!1,Ai=!1,Oi=0,Si=0,Ti=function(e,t,n,r){void 0===r&&(r={}),this.vm=e,e._watchers.push(this),this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.expression=t.toString(),this.cb=n,this.id=++Si,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new Ur,this.newDepIds=new Ur,"function"==typeof t?this.getter=t:(this.getter=_(t),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Ti.prototype.get=function(){$(this);var e=this.getter.call(this.vm,this.vm);return this.deep&&z(e),w(),this.cleanupDeps(),e},Ti.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Ti.prototype.cleanupDeps=function(){for(var e=this,t=this.deps.length;t--;){var n=e.deps[t];e.newDepIds.has(n.id)||n.removeSub(e)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},Ti.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():V(this)},Ti.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||u(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){if(!Yr.errorHandler)throw e;Yr.errorHandler.call(null,e,this.vm)}else this.cb.call(this.vm,e,t)}}},Ti.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Ti.prototype.depend=function(){for(var e=this,t=this.deps.length;t--;)e.deps[t].depend()},Ti.prototype.teardown=function(){var e=this;if(this.active){this.vm._isBeingDestroyed||this.vm._vForRemoving||r(this.vm._watchers,this);for(var t=this.deps.length;t--;)e.deps[t].removeSub(e);this.active=!1}};var Ei=new Ur,ji={enumerable:!0,configurable:!0,get:p,set:p},Ni=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=o,this.context=a,this.functionalContext=void 0,this.key=t&&t.key,this.componentOptions=s,this.child=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1},Li=function(){var e=new Ni;return e.text="",e.isComment=!0,e},Di=null,Mi={init:ye,prepatch:_e,insert:be,destroy:$e},Pi=Object.keys(Mi),Ri=0;De(Re),ee(Re),Le(Re),pe(Re),Ee(Re);var Ii=[String,RegExp],Fi={name:"keep-alive",abstract:!0,props:{include:Ii,exclude:Ii},created:function(){this.cache=Object.create(null)},render:function(){var e=fe(this.$slots.default);if(e&&e.componentOptions){var t=e.componentOptions,n=t.Ctor.options.name||t.tag;if(n&&(this.include&&!Be(this.include,n)||this.exclude&&Be(this.exclude,n)))return e;var r=null==e.key?t.Ctor.cid+(t.tag?"::"+t.tag:""):e.key;this.cache[r]?e.child=this.cache[r].child:this.cache[r]=e,e.data.keepAlive=!0}return e},destroyed:function(){var e=this;for(var t in this.cache){var n=e.cache[t];ve(n.child,"deactivated"),n.child.$destroy()}}},Ui={KeepAlive:Fi};Ve(Re),Object.defineProperty(Re.prototype,"$isServer",{get:si}),Re.version="2.1.4";var Hi,Bi=function(e,t){return"value"===t&&("input"===e||"textarea"===e||"option"===e)||"selected"===t&&"option"===e||"checked"===t&&"input"===e||"muted"===t&&"video"===e},Vi=n("contenteditable,draggable,spellcheck"),zi=n("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),Ji="http://www.w3.org/1999/xlink",Ki=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},qi=function(e){return Ki(e)?e.slice(6,e.length):""},Wi=function(e){return null==e||e===!1},Zi={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML",xhtml:"http://www.w3.org/1999/xhtml"},Gi=n("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template"),Yi=n("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Qi=function(e){return"pre"===e},Xi=function(e){return Gi(e)||Yi(e)},eo=Object.create(null),to=Object.freeze({createElement:Qe,createElementNS:Xe,createTextNode:et,createComment:tt,insertBefore:nt,removeChild:rt,appendChild:it,parentNode:ot,nextSibling:at,tagName:st,setTextContent:ct,childNodes:lt,setAttribute:ut}),no={create:function(e,t){ft(t)},update:function(e,t){e.data.ref!==t.data.ref&&(ft(e,!0),ft(t))},destroy:function(e){ft(e,!0)}},ro=new Ni("",{},[]),io=["create","activate","update","remove","destroy"],oo={create:gt,update:gt,destroy:function(e){gt(e,ro)}},ao=Object.create(null),so=[no,oo],co={create:$t,update:$t},lo={create:xt,update:xt},uo={create:Ct,update:Ct},fo={create:kt,update:kt},po=a(function(e){var t={},n=/;(?![^(]*\))/g,r=/:(.+)/;return e.split(n).forEach(function(e){if(e){var n=e.split(r);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}),vo=/^--/,ho=/\s*!important$/,mo=function(e,t,n){vo.test(t)?e.style.setProperty(t,n):ho.test(n)?e.style.setProperty(t,n.replace(ho,""),"important"):e.style[yo(t)]=n},go=["Webkit","Moz","ms"],yo=a(function(e){if(Hi=Hi||document.createElement("div"),e=zr(e),"filter"!==e&&e in Hi.style)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<go.length;n++){var r=go[n]+t;if(r in Hi.style)return r}}),_o={create:Tt,update:Tt},bo=ei&&!ri,$o="transition",wo="animation",xo="transition",Co="transitionend",ko="animation",Ao="animationend";bo&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(xo="WebkitTransition",Co="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(ko="WebkitAnimation",Ao="webkitAnimationEnd"));var Oo=ei&&window.requestAnimationFrame||setTimeout,So=/\b(transform|all)(,|$)/,To=a(function(e){return{enterClass:e+"-enter",leaveClass:e+"-leave",appearClass:e+"-enter",enterActiveClass:e+"-enter-active",leaveActiveClass:e+"-leave-active",appearActiveClass:e+"-enter-active"}}),Eo=ei?{create:Vt,activate:Vt,remove:function(e,t){e.data.show?t():Ut(e,t)}}:{},jo=[co,lo,uo,fo,_o,Eo],No=jo.concat(so),Lo=mt({nodeOps:to,modules:No});ri&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&Zt(e,"input")});var Do={inserted:function(e,t,n){if("select"===n.tag){var r=function(){zt(e,t,n.context)};r(),(ni||ii)&&setTimeout(r,0)}else"textarea"!==n.tag&&"text"!==e.type||t.modifiers.lazy||(oi||(e.addEventListener("compositionstart",qt),e.addEventListener("compositionend",Wt)),ri&&(e.vmodel=!0))},componentUpdated:function(e,t,n){if("select"===n.tag){zt(e,t,n.context);var r=e.multiple?t.value.some(function(t){return Jt(t,e.options)}):t.value!==t.oldValue&&Jt(t.value,e.options);r&&Zt(e,"change")}}},Mo={bind:function(e,t,n){var r=t.value;n=Gt(n);var i=n.data&&n.data.transition;r&&i&&!ri&&Ft(n);var o="none"===e.style.display?"":e.style.display;e.style.display=r?o:"none",e.__vOriginalDisplay=o},update:function(e,t,n){var r=t.value,i=t.oldValue;if(r!==i){n=Gt(n);var o=n.data&&n.data.transition;o&&!ri?r?(Ft(n),e.style.display=e.__vOriginalDisplay):Ut(n,function(){e.style.display="none"}):e.style.display=r?e.__vOriginalDisplay:"none"}}},Po={model:Do,
show:Mo},Ro={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String},Io={name:"transition",props:Ro,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(function(e){return e.tag}),n.length)){var r=this.mode,i=n[0];if(en(this.$vnode))return i;var o=Yt(i);if(!o)return i;if(this._leaving)return Xt(e,i);var a=o.key=null==o.key||o.isStatic?"__v"+(o.tag+this._uid)+"__":o.key,s=(o.data||(o.data={})).transition=Qt(this),c=this._vnode,u=Yt(c);if(o.data.directives&&o.data.directives.some(function(e){return"show"===e.name})&&(o.data.show=!0),u&&u.data&&u.key!==a){var f=u.data.transition=l({},s);if("out-in"===r)return this._leaving=!0,ie(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()},a),Xt(e,i);if("in-out"===r){var d,p=function(){d()};ie(s,"afterEnter",p,a),ie(s,"enterCancelled",p,a),ie(f,"delayLeave",function(e){d=e},a)}}return i}}},Fo=l({tag:String,moveClass:String},Ro);delete Fo.mode;var Uo={props:Fo,render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=Qt(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var l=[],u=[],f=0;f<r.length;f++){var d=r[f];d.data.transition=a,d.data.pos=d.elm.getBoundingClientRect(),n[d.key]?l.push(d):u.push(d)}this.kept=e(t,null,l),this.removed=u}return e(t,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";if(e.length&&this.hasMove(e[0].elm,t)){e.forEach(tn),e.forEach(nn),e.forEach(rn);document.body.offsetHeight;e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Lt(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Co,n._moveCb=function e(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Co,e),n._moveCb=null,Dt(n,t))})}})}},methods:{hasMove:function(e,t){if(!bo)return!1;if(null!=this._hasMove)return this._hasMove;Lt(e,t);var n=Pt(e);return Dt(e,t),this._hasMove=n.hasTransform}}},Ho={Transition:Io,TransitionGroup:Uo};Re.config.isUnknownElement=Ge,Re.config.isReservedTag=Xi,Re.config.getTagNamespace=Ze,Re.config.mustUseProp=Bi,l(Re.options.directives,Po),l(Re.options.components,Ho),Re.prototype.__patch__=ei?Lo:p,Re.prototype.$mount=function(e,t){return e=e&&ei?Ye(e):void 0,this._mount(e,t)},setTimeout(function(){Yr.devtools&&ci&&ci.emit("init",Re)},0);var Bo,Vo=!!ei&&on("\n","&#10;"),zo=n("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr",!0),Jo=n("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source",!0),Ko=n("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track",!0),qo=/([^\s"'<>\/=]+)/,Wo=/(?:=)/,Zo=[/"([^"]*)"+/.source,/'([^']*)'+/.source,/([^\s"'=<>`]+)/.source],Go=new RegExp("^\\s*"+qo.source+"(?:\\s*("+Wo.source+")\\s*(?:"+Zo.join("|")+"))?"),Yo="[a-zA-Z_][\\w\\-\\.]*",Qo="((?:"+Yo+"\\:)?"+Yo+")",Xo=new RegExp("^<"+Qo),ea=/^\s*(\/?)>/,ta=new RegExp("^<\\/"+Qo+"[^>]*>"),na=/^<!DOCTYPE [^>]+>/i,ra=/^<!--/,ia=/^<!\[/,oa=!1;"x".replace(/x(.)?/g,function(e,t){oa=""===t});var aa,sa,ca,la,ua,fa,da,pa,va,ha,ma,ga,ya,_a,ba,$a,wa,xa,Ca,ka,Aa,Oa,Sa,Ta,Ea=n("script,style",!0),ja=function(e){return"lang"===e.name&&"html"!==e.value},Na=function(e,t,n){return!!Ea(e)||!(!t||1!==n.length)&&!("template"===e&&!n[0].attrs.some(ja))},La={},Da=/&lt;/g,Ma=/&gt;/g,Pa=/&#10;/g,Ra=/&amp;/g,Ia=/&quot;/g,Fa=/\{\{((?:.|\n)+?)\}\}/g,Ua=/[-.*+?^${}()|[\]\/\\]/g,Ha=a(function(e){var t=e[0].replace(Ua,"\\$&"),n=e[1].replace(Ua,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")}),Ba=/^v-|^@|^:/,Va=/(.*?)\s+(?:in|of)\s+(.*)/,za=/\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,Ja=/^:|^v-bind:/,Ka=/^@|^v-on:/,qa=/:(.*)$/,Wa=/\.[^.]+/g,Za=a(an),Ga=/^xmlns:NS\d+/,Ya=/^NS\d+:/,Qa=a(Kn),Xa=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,es=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,ts={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},ns={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:"if($event.target !== $event.currentTarget)return;",ctrl:"if(!$event.ctrlKey)return;",shift:"if(!$event.shiftKey)return;",alt:"if(!$event.altKey)return;",meta:"if(!$event.metaKey)return;"},rs={bind:nr,cloak:p},is={staticKeys:["staticClass"],transformNode:xr,genData:Cr},os={staticKeys:["staticStyle"],transformNode:kr,genData:Ar},as=[is,os],ss={model:Or,text:Lr,html:Dr},cs=Object.create(null),ls={expectHTML:!0,modules:as,staticKeys:v(as),directives:ss,isReservedTag:Xi,isUnaryTag:zo,mustUseProp:Bi,getTagNamespace:Ze,isPreTag:Qi},us=a(function(e){var t=Ye(e);return t&&t.innerHTML}),fs=Re.prototype.$mount;return Re.prototype.$mount=function(e,t){if(e=e&&Ye(e),e===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=us(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=Ir(e));if(r){var i=Pr(r,{warn:fi,shouldDecodeNewlines:Vo,delimiters:n.delimiters},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return fs.call(this,e,t)},Re.compile=Pr,Re});
/* AlloyFinger v0.1.3
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyFinger
 */
; (function () {
    function getLen(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    function dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    function getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    }

    function cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    }

    function getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2);
        if (cross(v1, v2) > 0) {
            angle *= -1;
        }

        return angle * 180 / Math.PI;
    }

    var HandlerAdmin = function(el) {
        this.handlers = [];
        this.el = el;
    };

    HandlerAdmin.prototype.add = function(handler) {
        this.handlers.push(handler);
    }

    HandlerAdmin.prototype.del = function(handler) {
        for(var i=this.handlers.length; i>=0; i--) {
            if(this.handlers[i] === handler) {
                this.handlers.splice(i, 1);
            }
        }
    }

    HandlerAdmin.prototype.dispatch = function() {
        for(var i=0,len=this.handlers.length; i<len; i++) {
            this.handlers[i].apply(this.el, arguments);
        }
    }

    function wrapFunc(el, handler) {
        var handlerAdmin = new HandlerAdmin(el);
        handlerAdmin.add(handler);

        return handlerAdmin;
    }

    var AlloyFinger = function (el, option) {

        this.element = typeof el == 'string' ? document.querySelector(el) : el;

        this.element.addEventListener("touchstart", this.start.bind(this), false);
        this.element.addEventListener("touchmove", this.move.bind(this), false);
        this.element.addEventListener("touchend", this.end.bind(this), false);
        this.element.addEventListener("touchcancel", this.cancel.bind(this), false);

        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.scale = 1;
        this.isDoubleTap = false;

        var noop = function () { };

        this.rotate = wrapFunc(this.element, option.rotate || noop);
        this.touchStart = wrapFunc(this.element, option.touchStart || noop);
        this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
        this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
        this.pinch = wrapFunc(this.element, option.pinch || noop);
        this.swipe = wrapFunc(this.element, option.swipe || noop);
        this.tap = wrapFunc(this.element, option.tap || noop);
        this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
        this.longTap = wrapFunc(this.element, option.longTap || noop);
        this.singleTap = wrapFunc(this.element, option.singleTap || noop);
        this.pressMove = wrapFunc(this.element, option.pressMove || noop);
        this.touchMove = wrapFunc(this.element, option.touchMove || noop);
        this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
        this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);

        this.delta = null;
        this.last = null;
        this.now = null;
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition = { x: null, y: null };
    };

    AlloyFinger.prototype = {
        start: function (evt) {
            if (!evt.touches) return;
            this.now = Date.now();
            this.x1 = evt.touches[0].pageX;
            this.y1 = evt.touches[0].pageY;
            this.delta = this.now - (this.last || this.now);
            this.touchStart.dispatch(evt);
            if (this.preTapPosition.x !== null) {
                this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
            }
            this.preTapPosition.x = this.x1;
            this.preTapPosition.y = this.y1;
            this.last = this.now;
            var preV = this.preV,
                len = evt.touches.length;
            if (len > 1) {
                this._cancelLongTap();
                this._cancelSingleTap();
                var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
                preV.x = v.x;
                preV.y = v.y;
                this.pinchStartLen = getLen(preV);
                this.multipointStart.dispatch(evt);
            }
            this.longTapTimeout = setTimeout(function () {
                this.longTap.dispatch(evt);
            }.bind(this), 750);
        },
        move: function (evt) {
            if (!evt.touches) return;
            var preV = this.preV,
                len = evt.touches.length,
                currentX = evt.touches[0].pageX,
                currentY = evt.touches[0].pageY;
            this.isDoubleTap = false;
            if (len > 1) {
                var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

                if (preV.x !== null) {
                    if (this.pinchStartLen > 0) {
                        evt.scale = getLen(v) / this.pinchStartLen;
                        this.pinch.dispatch(evt);
                    }

                    evt.angle = getRotateAngle(v, preV);
                    this.rotate.dispatch(evt);
                }
                preV.x = v.x;
                preV.y = v.y;
            } else {
                if (this.x2 !== null) {
                    evt.deltaX = currentX - this.x2;
                    evt.deltaY = currentY - this.y2;

                } else {
                    evt.deltaX = 0;
                    evt.deltaY = 0;
                }
                this.pressMove.dispatch(evt);
            }

            this.touchMove.dispatch(evt);

            this._cancelLongTap();
            this.x2 = currentX;
            this.y2 = currentY;
            if (len > 1) {
                evt.preventDefault();
            }
        },
        end: function (evt) {
            if (!evt.changedTouches) return;
            this._cancelLongTap();
            var self = this;
            if (evt.touches.length < 2) {
                this.multipointEnd.dispatch(evt);
            }
            this.touchEnd.dispatch(evt);
            //swipe
            if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
                (this.y2 && Math.abs(this.preV.y - this.y2) > 30)) {
                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                this.swipeTimeout = setTimeout(function () {
                    self.swipe.dispatch(evt);

                }, 0)
            } else {
                this.tapTimeout = setTimeout(function () {
                    self.tap.dispatch(evt);
                    // trigger double tap immediately
                    if (self.isDoubleTap) {
                        self.doubleTap.dispatch(evt);
                        clearTimeout(self.singleTapTimeout);
                        self.isDoubleTap = false;
                    } else {
                        self.singleTapTimeout = setTimeout(function () {
                            self.singleTap.dispatch(evt);
                        }, 250);
                    }
                }, 0)
            }

            this.preV.x = 0;
            this.preV.y = 0;
            this.scale = 1;
            this.pinchStartLen = null;
            this.x1 = this.x2 = this.y1 = this.y2 = null;
        },
        cancel: function (evt) {
            clearTimeout(this.singleTapTimeout);
            clearTimeout(this.tapTimeout);
            clearTimeout(this.longTapTimeout);
            clearTimeout(this.swipeTimeout);
            this.touchCancel.dispatch(evt);
        },
        _cancelLongTap: function () {
            clearTimeout(this.longTapTimeout);
        },
        _cancelSingleTap: function () {
            clearTimeout(this.singleTapTimeout);
        },
        _swipeDirection: function (x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },

        on: function(evt, handler) {
            if(this[evt]) {
                this[evt].add(handler);
            }
        },

        off: function(evt, handler) {
            if(this[evt]) {
                this[evt].del(handler);
            }
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = AlloyFinger;
    } else {
        window.AlloyFinger = AlloyFinger;
    }
})();

/* AlloyFinger v0.1.0 for Vue
 * By june01
 * Github: https://github.com/AlloyTeam/AlloyFinger
 */

; (function() {

  var AlloyFingerPlugin = {
    install: function(Vue, options) {
      options = options || {};
      var AlloyFinger = window.AlloyFinger || options.AlloyFinger;
      var isVue2 = !!(Vue.version.substr(0,1) == 2);

      if(!AlloyFinger) {
        throw new Error('you need include the AlloyFinger!');
      }

      var EVENTMAP = {
        'touch-start': 'touchStart',
        'touch-move': 'touchMove',
        'touch-end': 'touchEnd',
        'touch-cancel': 'touchCancel',
        'multipoint-start': 'multipointStart',
        'multipoint-end': 'multipointEnd',
        'tap': 'tap',
        'double-tap': 'doubleTap',
        'long-tap': 'longTap',
        'single-tap': 'singleTap',
        'rotate': 'rotate',
        'pinch': 'pinch',
        'press-move': 'pressMove',
        'swipe': 'swipe'
      };

      var CACHE = [];

      var directiveOpts = {};

      // get the index for elem in CACHE
      var getElemCacheIndex = function(elem) {
        for(var i=0,len=CACHE.length; i<len; i++) {
          if(CACHE[i].elem === elem) {
            return i;
          }
        }

        return null;
      };

      // do on or off handler
      var doOnOrOff = function(cacheObj, options) {
        var eventName = options.eventName;
        var elem = options.elem;
        var func = options.func;
        var oldFunc = options.oldFunc;

        if(cacheObj && cacheObj.alloyFinger) {
          if(cacheObj.alloyFinger.off && oldFunc) cacheObj.alloyFinger.off(eventName, oldFunc);
          if(cacheObj.alloyFinger.on && func) cacheObj.alloyFinger.on(eventName, func);
        } else {
          options = {};
          options[eventName] = func;

          CACHE.push({
            elem: elem,
            alloyFinger: new AlloyFinger(elem, options)
          });
        }
      }

      // for bind the event
      var doBindEvent = function(elem, binding) {
        var func = binding.value;
        var oldFunc = binding.oldValue;
        var eventName = binding.arg;

        eventName = EVENTMAP[eventName];

        var cacheObj = CACHE[getElemCacheIndex(elem)];

        doOnOrOff(cacheObj, {
          elem: elem,
          func: func,
          oldFunc: oldFunc,
          eventName: eventName
        });
      };

      // for bind the event
      var doUnbindEvent = function(elem) {
        var index = getElemCacheIndex(elem);

        if(!isNaN(index)) {
          CACHE.splice(index, 1);
        } 
      };

      if(isVue2) {
        directiveOpts = {
          bind: doBindEvent,
          update: doBindEvent,
          unbind: doUnbindEvent
        };
      } else {
        // vue1.xx
        directiveOpts = {
          update: function(newValue, oldValue) {
            var binding = {
              value: newValue,
              arg: this.arg
            };

            var elem = this.el;

            doBindEvent.call(this, elem, binding);
          },
          unbind: function() {
            var elem = this.el;

            doUnbindEvent.call(this, elem);
          }
        }
      }

      // definition
      Vue.directive('finger', directiveOpts);
    }
  }

  // export
  if(typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = AlloyFingerPlugin;
  } else {
    window.AlloyFingerVue = AlloyFingerPlugin;
  }

})();
/* transformjs 1.0.1
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs
 */
;(function(){function t(n,t,r){for(var e,u=0,f=t.length;u<f;u++)e=t[u],i(n,e,r)}function i(n,t,i){Object.defineProperty(n,t,{get:function(){return this["_"+t]},set:function(n){n!==this["_"+t]&&(this["_"+t]=n,i())}})}var n=function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p){this.elements=window.Float32Array?new Float32Array(16):[];var w=this.elements;w[0]=n!==undefined?n:1;w[4]=t||0;w[8]=i||0;w[12]=r||0;w[1]=u||0;w[5]=f!==undefined?f:1;w[9]=e||0;w[13]=o||0;w[2]=s||0;w[6]=h||0;w[10]=c!==undefined?c:1;w[14]=l||0;w[3]=a||0;w[7]=v||0;w[11]=y||0;w[15]=p!==undefined?p:1};n.DEG_TO_RAD=Math.PI/180;n.prototype={set:function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p){var w=this.elements;return w[0]=n,w[4]=t,w[8]=i,w[12]=r,w[1]=u,w[5]=f,w[9]=e,w[13]=o,w[2]=s,w[6]=h,w[10]=c,w[14]=l,w[3]=a,w[7]=v,w[11]=y,w[15]=p,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},multiplyMatrices:function(n,t){var i=n.elements,r=this.elements,u=i[0],f=i[4],e=i[8],o=i[12],s=i[1],h=i[5],c=i[9],l=i[13],a=i[2],v=i[6],y=i[10],p=i[14],w=i[3],b=i[7],k=i[11],d=i[15],g=t[0],nt=t[1],tt=t[2],it=t[3],rt=t[4],ut=t[5],ft=t[6],et=t[7],ot=t[8],st=t[9],ht=t[10],ct=t[11],lt=t[12],at=t[13],vt=t[14],yt=t[15];return r[0]=u*g+f*rt+e*ot+o*lt,r[4]=u*nt+f*ut+e*st+o*at,r[8]=u*tt+f*ft+e*ht+o*vt,r[12]=u*it+f*et+e*ct+o*yt,r[1]=s*g+h*rt+c*ot+l*lt,r[5]=s*nt+h*ut+c*st+l*at,r[9]=s*tt+h*ft+c*ht+l*vt,r[13]=s*it+h*et+c*ct+l*yt,r[2]=a*g+v*rt+y*ot+p*lt,r[6]=a*nt+v*ut+y*st+p*at,r[10]=a*tt+v*ft+y*ht+p*vt,r[14]=a*it+v*et+y*ct+p*yt,r[3]=w*g+b*rt+k*ot+d*lt,r[7]=w*nt+b*ut+k*st+d*at,r[11]=w*tt+b*ft+k*ht+d*vt,r[15]=w*it+b*et+k*ct+d*yt,this},_rounded:function(n,t){return t=Math.pow(10,t||15),Math.round(n*t)/t},_arrayWrap:function(n){return window.Float32Array?new Float32Array(n):n},appendTransform:function(t,i,r,u,f,e,o,s,h,c,l,a,v,y){var p=o*n.DEG_TO_RAD,w=this._rounded(Math.cos(p)),b=this._rounded(Math.sin(p)),k=s*n.DEG_TO_RAD,d=this._rounded(Math.cos(k)),g=this._rounded(Math.sin(k)),nt=h*n.DEG_TO_RAD,tt=this._rounded(Math.cos(nt*-1)),it=this._rounded(Math.sin(nt*-1));return this.multiplyMatrices(this,this._arrayWrap([1,0,0,t,0,w,b,i,0,-b,w,r,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([d,0,g,0,0,1,0,0,-g,0,d,0,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([tt*u,it*f,0,0,-it*u,tt*f,0,0,0,0,1*e,0,0,0,0,1])),(c||l)&&this.multiplyMatrices(this,this._arrayWrap([this._rounded(Math.cos(c*n.DEG_TO_RAD)),this._rounded(Math.sin(c*n.DEG_TO_RAD)),0,0,-1*this._rounded(Math.sin(l*n.DEG_TO_RAD)),this._rounded(Math.cos(l*n.DEG_TO_RAD)),0,0,0,0,1,0,0,0,0,1])),(a||v||y)&&(this.elements[12]-=a*this.elements[0]+v*this.elements[4]+y*this.elements[8],this.elements[13]-=a*this.elements[1]+v*this.elements[5]+y*this.elements[9],this.elements[14]-=a*this.elements[2]+v*this.elements[6]+y*this.elements[10]),this}};window.Transform=function(i,r){t(i,["translateX","translateY","translateZ","scaleX","scaleY","scaleZ","rotateX","rotateY","rotateZ","skewX","skewY","originX","originY","originZ"],function(){var n=i.matrix3D.identity().appendTransform(i.translateX,i.translateY,i.translateZ,i.scaleX,i.scaleY,i.scaleZ,i.rotateX,i.rotateY,i.rotateZ,i.skewX,i.skewY,i.originX,i.originY,i.originZ);i.style.transform=i.style.msTransform=i.style.OTransform=i.style.MozTransform=i.style.webkitTransform=(r?"":"perspective("+(i.perspective===undefined?500:i.perspective)+"px) ")+"matrix3d("+Array.prototype.slice.call(n.elements).join(",")+")"});i.matrix3D=new n;r||(t(i,["perspective"],function(){i.style.transform=i.style.msTransform=i.style.OTransform=i.style.MozTransform=i.style.webkitTransform="perspective("+i.perspective+"px) matrix3d("+Array.prototype.slice.call(i.matrix3D.elements).join(",")+")"}),i.perspective=500);i.scaleX=i.scaleY=i.scaleZ=1;i.translateX=i.translateY=i.translateZ=i.rotateX=i.rotateY=i.rotateZ=i.skewX=i.skewY=i.originX=i.originY=i.originZ=0}})();
;(function() {
    var loadingImg = 'data:image/gif;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';

    Vue.use(AlloyFingerVue);
    var eventBus = new Vue();
    var initData = {
        gameInfo: {
            id: 1111,
            avatar: '/assets/images.jpg',
            name: '神武2',
            type: '回合',
            size: '219M',
            pitches: '快乐西游, 只有神武, 来就送新手',
            imgs: [
                '/assets/images.jpg',
                '/assets/images1.jpg',
                '/assets/images2.jpg',
                '/assets/images3.jpg',
                '/assets/images4.jpg',
                '/assets/images5.jpg',
                '/assets/images6.jpg'
            ],
            installed: false,
            downloadLink: 'downloadLink',
            intrText: '功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍功夫熊猫介绍'
        },
        watcherInfo: {
            show: false,
            curIndex: 0,
            swipeLocked: false,
        },
        isZmApp: true,
    };

    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
        if (windwo.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    }

    // 使用
    /**
     * setupWebViewJavascriptBridge(function (bridge) {
     *      bridge.callHandler('function name', 'arguments');
     * });
     */

    var _loadImg = function(el, url) {
        var img = document.createElement('img');
        img.addEventListener('load', function() {
            el.src = url;
        });
        img.src = url;
    }

    Vue.component('game-profile', {
        props: ['gameInfo'],
        template: '#tmpl-game-profile',
    });

    Vue.component('game-intr', {
        props: ['gameInfo', 'watcherInfo'],
        template: '#tmpl-game-intr',
        methods: {
            clickPictBox: function(index) {
                this.watcherInfo.show = true;
                this.watcherInfo.curIndex = index;
            },
        }
    });

    Vue.component('game-download', {
        props: ['gameInfo', 'isZmApp'],
        template: '#tmpl-game-download',
        data: function() {
            var u = navigator.userAgent;
            return {
                btnState: '下载游戏',
                downloadRate: 0,
                downloading: false,
                isMobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器,
            }
        },
        computed: {
            isZmIosApp      : function() { return this.isZmApp && this.isIos; },
            isZmAndroidApp  : function() { return this.isZmApp && this.isAndroid; },
        },
        methods: {
            clickHandler: function(evt) {
                if (this.isZmAndroidApp) {
                    this.zmAndroidAct(evt);
                    evt.preventDefault();
                } else if (this.isZmIosApp) {
                    this.zmIosAct(evt);
                    evt.preventDefault();
                }
            },
            zmIosAct: function(evt) {
                if (this.installed) {
                    try {
                        setupWebViewJavascriptBridge(function(bridge) {
                            ZhanMengGameDetailOpenInstalledGame(this.gameInfo.id);
                        });
                    } catch(e) {
                        alert('打开游戏失败, 请手动打开');
                    }
                } else {
                    try {
                        setupWebViewJavascriptBridge(function(bridge) {
                            ZhanMengGameDetailGotoAppStore(this.gameInfo.id);
                        });
                    } catch(e) {
                        alert('转跳AppStore失败, 请刷新重试');
                    }
                }
            },
            zmAndroidAct: function(evt) {
                this.downloading = true;
                var that = this;
                var downloadInterval = setInterval(function() {
                    that.downloadRate += 10;
                    that.btnState = that.downloadRate + '%';
                    if (that.downloadRate >= 100) {
                        that.downloadRate = 100;
                        that.btnState = that.downloadRate + '%';
                        clearInterval(downloadInterval);
                    }
                }, 1000);
            },
            browserIosAct: function(evt) {
                // <a href="https://itunes.apple.com/cn/app/id978985106" id="openApp">打开应用</a>
                var ifr = document.createElement('iframe'); 
                ifr.src = 'weixin://scanqrcode';
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                window.setTimeout(function() {
                    document.body.removeChild(ifr);
                }, 3000);
            },
        },
        watch: {
            isInstalled: function(installed) {
                this.isInstalled = installed;
                if (this.isInstalled) { this.btnState = '打开'; }
            }
        },
        created: function() {
            if (this.isInstalled) { this.btnState = '打开'; }
        }
    });

    Vue.component('img-watcher', {
        props: [ 'watcherInfo', 'gameInfo'],
        data: function() {
            return {
                width: 0,
                posX: 0,
                moveAnimate: false,
            };
        },
        template: '#tmpl-img-watcher',
        methods: {
            clickImgWatcher: function() {
                this.watcherInfo.show = false;
            },
            touchStart: function(evt) {
                if (this.watcherInfo.swipeLocked) { return; }
                this.moveAnimate = false;
                this.setPosX();
            },
            touchMove: function(evt) {
                if (this.watcherInfo.swipeLocked) {
                    this.moveAnimate = true;
                    this.setPosX();
                    return;
                }
                this.posX += evt.deltaX;
            },
            touchEnd: function(evt) {
                // if (this.watcherInfo.swipeLocked) { this.setPosX(); }
            },
            swipe: function(evt) {
                if (this.watcherInfo.swipeLocked) { return; }

                this.moveAnimate = true;

                var type = 'swipe' + evt.direction;
                if (this[type]) { this[type](evt); }
                this.setPosX();
            },
            swipeLeft: function(evt) {
                if (this.watcherInfo.curIndex === this.gameInfo.imgs.length - 1) { return; }
                this.$refs.imgBox[this.watcherInfo.curIndex].restoreBoxStyle();
                this.watcherInfo.curIndex += 1;
            },
            swipeRight: function(evt) {
                if (this.watcherInfo.curIndex === 0) { return; }
                this.$refs.imgBox[this.watcherInfo.curIndex].restoreBoxStyle();
                this.watcherInfo.curIndex -= 1;
            },
            setPosX: function() {
                this.posX = -this.width * this.watcherInfo.curIndex;
            }
        },
        computed: {
            touchMoveStyle: function() {
                var that = this;
                var style = {
                    transform: 'translate3d(' + that.posX + 'px, 0, 0)',
                };
                if (this.moveAnimate) { style.transition = 'transform 200ms ease-out'; }
                return style
            },
            liStyle: function() {
                return {
                    width: this.width + 'px'
                };
            }
        },
        created: function() {
            var that = this;
            this.width = this.$root.$el.offsetWidth;
            this.$watch('watcherInfo.curIndex', function(index) {
                that.setPosX();
            });
        }
    });

    Vue.component('img-box', {
        props: ['watcherInfo', 'img'],
        data: function() {
            return {
                imgElem: null,
                loadingImg: loadingImg,
                initScale: 1,
                msg: 'msg',
            }
        },
        template: '#tmpl-img-box',
        methods: {
            print: function(msg) {
                this.msg = JSON.stringify(msg);
            },
            restoreBoxStyle: function() {
                this.imgElem.scaleX = 1;
                this.imgElem.scaleY = 1;
                this.imgElem.translateX = 0;
                this.imgElem.translateY = 0;
            },
            touchStart: function() {
                this.watcherInfo.swipeLocked = this.getScaledSize().width > this.$el.offsetWidth;
            },
            multipointStart: function(evt) {
                this.watcherInfo.swipeLocked = true;
                this.initScale = this.imgElem.scaleX;
            },
            pinch: function(evt) {
                var scale = this.initScale * evt.scale;
                this.imgElem.scaleX = scale;
                this.imgElem.scaleY = scale;
                
                var moveRange = this.getMoveRange();
                var translateX = this.imgElem.translateX;
                var translateY = this.imgElem.translateY;
                if (translateX > moveRange.x) { this.imgElem.translateX = moveRange.x }
                if (translateX < -moveRange.x) { this.imgElem.translateX = -moveRange.x }
                if (translateY > moveRange.y) { this.imgElem.translateY = moveRange.y }
                if (translateY < -moveRange.y) { this.imgElem.translateY = -moveRange.y }
            },
            touchEnd: function(evt) {
                if (this.imgElem.scaleX < 1) {
                    this.restoreBoxStyle();
                    this.watcherInfo.swipeLocked = true;
                }
            },
            touchMove: function(evt) {
                // if (this.watcherInfo.swipeLocked) {
                this.watcherInfo.swipeLocked = true;

                var moveRange = this.getMoveRange();
                var oldTranslateX = this.imgElem.translateX;
                var oldTranslateY = this.imgElem.translateY;

                this.imgElem.translateX += evt.deltaX || 0;
                this.imgElem.translateY += evt.deltaY || 0;

                var translateX = this.imgElem.translateX;
                var translateY = this.imgElem.translateY;

                var isInRangeX = translateX <= moveRange.x && translateX >= -moveRange.x;
                var isInRangeY = translateY <= moveRange.y && translateY >= -moveRange.y;

                if (!isInRangeX) {
                    // this.imgElem.translateX += evt.deltaX || 0;
                    this.imgElem.translateX = oldTranslateX;
                    this.watcherInfo.swipeLocked = false;
                }
                if (!isInRangeY) {
                    // this.imgElem.translateY += evt.deltaY || 0;
                    this.imgElem.translateY = oldTranslateY;
                }
                // }
            },
            getScaledSize: function() {
                return {
                    width: this.imgElem.offsetWidth * this.imgElem.scaleX,
                    height: this.imgElem.offsetHeight * this.imgElem.scaleY,
                };
            },
            getMoveRange: function() {
                var scaledSize = this.getScaledSize();
                var xRange = scaledSize.width - this.$el.offsetWidth;
                var yRange = scaledSize.height - this.$el.offsetHeight;
                return {
                    x: xRange > 0 ? (xRange) / 2 : 0,
                    y: yRange > 0 ? (yRange) / 2 : 0,
                }
            }
        },
        mounted: function() {
            this.imgElem = this.$el.querySelector('.game-intr__pict');
            Transform(this.imgElem);
            var that = this;
            var unWatchImg = this.$watch('watcherInfo.show', function() {
                var img = that.imgElem;
                var src = img.dataset.realSrc;
                var newImg = new Image();
                newImg.onload = function() {
                    img.src = src;
                    img.style.marginTop = ((that.$el.offsetHeight - img.height) / 2) + 'px';
                    newImg.onload = null;
                }
                newImg.src = src;
                unWatchImg();
            });

            this.$watch('watcherInfo.show', function(show) {
                if (!show) { that.restoreBoxStyle(); }
            });
        }
    });

    var vm = new Vue({
        el: '#app',
        template: '#tmpl-index',
        data: initData
    });


    // init 初始化的操作
    try {
        setupWebViewJavascriptBridge(function() {
            var installed = ZhanMengGameDetailCheckInstalled(initData.gameInfo.id);
            vm.gameInfo.installed = installed;
            vm.isZmApp = true;
        });
    } catch(e) {}
})();