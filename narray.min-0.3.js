//! nArray.js
//! version : 0.3
//! author : Na Chao
//! license : FFF
//! github.com/nachao/nArray
!function(a,b){"use strict";b(a)}(Array.prototype,function(a){"use strict";function c(){}function e(a,b){var d,e,c=a?a.constructor:null;if(c==Object)for(e in a)if(d=b(e,a[e]))break;if(c==Array)for(e=0;e<a.length&&!(d=b(e,a[e]));e++);return!!d}c.fn=c.prototype={};var d=["<=",">=","<",">","!=","="];Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var c,d,e,f;if(null==this)throw new TypeError('"this" is null or not defined');if(d=Object(this),e=d.length>>>0,0===e)return-1;if(f=+b||0,1/0===Math.abs(f)&&(f=0),f>=e)return-1;for(c=Math.max(f>=0?f:e-Math.abs(f),0);e>c;){if(c in d&&d[c]===a)return c;c++}return-1}),Object.keys||(Object.keys=function(a){if(a!==Object(a))throw new TypeError("Object.keys called on a non-object");var c,b=[];for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),c.extend=c.fn.extend=function(a,b){return b||(b=a,a=this),e(b,function(b,c){a[b]=c}),a},c.extend({update:function(a,b){return"undefined"!=typeof b&&a.constructor==b.constructor&&("object"==typeof b?c.each(b,function(b,c){a[b]=c}):a=b),a},unique:function(a){var b=[];return e(a,function(a,c){b.indexOf(JSON.stringify(c))<0&&b.push(c)}),b},parseCondition:function(a){var b=[];return a=a?a.toString().split(","):[],e(a,function(a,d){var e=c.getInquiry(d),f=d.split(e),g=f[0],h=f[1];e||h||(h=g||"",g=""),b=b.concat(c.getCondition(g,h.split("|"),e))}),b},getInquiry:function(a){var b;return e(d,function(c,d){return a.indexOf(d)>=0?(b=d,!0):void 0}),b},getCondition:function(a,b,c){var d=[];return b.constructor!=Array&&(b=[b]),e(b,function(b,e){d.push({key:"*"==a?"":a.trim(),val:"*"==e?"":e.trim(),mode:c||"="})}),d},mateEnter:function(a,b,d,e){var f=[];return e&&(d="whole "+d),a.constructor!=Array&&(a=[a]),f.constructor.prototype.$path=[],a&&c.mateDepth(d,b,a,f),f},mateDepth:function(a,b,d,f,g,h,i){var j=[],k=[];c.extend(k,h||[]),c.extend(j,g||[]),[Function,Object,Array].indexOf(d.constructor)>-1&&("undefined"!=typeof i&&k.push(i),j.push(d),c.mateCondition(a,d,b)&&(f.push(j[j.length-1]),f.constructor.prototype.$path.push({key:k,value:j})),e(d,function(d,e){c.mateDepth(a,b,e,f,j,k,d)}))},mateCondition:function(a,b,d){var f=!1,g=0;return d=c.parseCondition(d),e(d,function(h,i){return i.key&&"object"==typeof b?e(b,function(b,d){return f=c.mateKeys(b,i,a)&&c.mateValues(d,i,a)}):i.key||"object"!=typeof b?f=c.mateValues(b,i,a):e(b,function(b,d){return f=c.mateValues(d,i,a)}),f&&a.indexOf("whole")>=0&&(f=++g==d.length),f}),f},mateKeys:function(a,b,c){return b.key=b.key.toLocaleLowerCase(),a=String(a).toString().toLocaleLowerCase(),c.indexOf("get")>=0?a===b.key:a.indexOf(b.key)>=0},mateValues:function(a,b,c){var d=!1,e=a?a.toString().toLocaleLowerCase():"",f=b.val.toString().toLocaleLowerCase(),g=Number(b.val)?Number(b.val):b.val;if(["object","function"].indexOf(typeof a)>=0)return d;switch(b.mode){case"=":d=c.indexOf("get")>=0?e===f:e.indexOf(f)>=0;break;case"!=":d=c.indexOf("search")>=0?e.indexOf(f)<0:e!==f;break;case">":d=a>g;break;case">=":d=a>=g;break;case"<":d=g>a;break;case"<=":d=g>=a}return d}}),c.extend(a,{$get:function(a,b){return c.mateEnter(this,a,"get",b)},$search:function(a,b){return c.mateEnter(this,a,"search",b)},$update:function(a){return c.update(this,a)},$path:[]}),window.nArray=c});