/*
 * nArray - JavaScript data management tools
 *
 * Copyright (c) 2016 Na Chao (https://github.com/nachao/nArray)
 * Dual licensed under the MIT (Lie to you ) 
 * and not have GPL licenses.
 *
 * Date: 2016/1/11 10:40:38
 * Ver: 0.2.8
 */
function nArray(a,b){return window==this?new nArray(a,b):void 0}nArray.fn=nArray.prototype={},nArray.extend=nArray.fn.extend=function(a,b){b||(b=a,a=this);for(var c in b)a[c]=b[c];return a},nArray.extend({trim:function(a){return"string"==typeof a?a.replace(/^\s+|\s+$/g,""):a},each:function(a,b){var d,c=!1;if(a.constructor==Object){for(d in a)if(b(d,a[d])){c=!0;break}}else if(a.constructor==Array)for(d=0;d<a.length;d++)if(b(d,a[d])){c=!0;break}return c},indexOf:function(a,b){var c=a.length>>>0,d=Number(arguments[1])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1},toKeys:function(a){var c,b=[];if(a&&"object"==typeof a)for(c in a)b.push(c);return b},toArray:function(a,b){var d,c=[];if(a){for(d in a)"string"==typeof b&&(a[d][b]=d),c.push(a[d]);return c}},toObject:function(a,b){var d,c={};if(a){for(d=0;d<a.length;d++)"string"==typeof b&&a[d][b]?c[a[d][b]]=a[d]:c[d]=a[d];return c}},update:function(a,b){return"undefined"!=typeof b&&a.constructor==b.constructor&&("object"==typeof b?nArray.each(b,function(b,c){a[b]=c}):a=b),a},mateResolve:function(a){if("string"!=typeof a)return[];var d,e,f,g,h,i,j,l,b=["<=",">=","<",">","!=","="],c=[];for(a=a.toString().split(","),j=0;j<a.length;j++){for(e="=",f=a[j],l=0;l<b.length;l++)if(f.indexOf(b[l])>=0){e=b[l];break}if(f=f.split(e),f.length>1?(h=nArray.trim(f[0]),i=nArray.trim(f[1])):(h=null,i=nArray.trim(f[0])),i.indexOf("|")>=0)for(g=i.split("|"),d=[],k=0;k<g.length;k++)d.push({key:h,val:nArray.trim(g[k]),mode:e});else d={key:h,val:"*"==i?"":i,mode:e};d.constructor==Array?c=c.concat(d):c.push(d)}return c},mateFor:function(a,b,c){var e=[],f=nArray.mateResolve(c);return e.constructor.prototype.$path=[],nArray.mateDepth(a,f,b,e),e},mateDepth:function(a,b,c,d,e,f,g){var j,h=[],i=[];for(e||(e=[]),f||(f=[]),j=0;j<e.length;j++)h.push(e[j]);for(j=0;j<f.length;j++)i.push(f[j]);if(c.constructor==Object){h.push(c),i.push(g),nArray.mateData(a,b,c)&&(d.push(h[h.length-1]),d.constructor.prototype.$path.push({key:i,value:h}));for(j in c)nArray.mateDepth(a,b,c[j],d,h,i,j)}else if(c.constructor==Array)for(h.push(c),i.push(g),nArray.mateData(a,b,c)&&(d.push(h[h.length-1]),d.constructor.prototype.$path.push({key:i,value:h})),j=0;j<c.length;j++)nArray.mateDepth(a,b,c[j],d,h,i,j)},mateData:function(a,b,c){var f,g,d=!1,e=0;for(g=0;g<b.length;g++)if(f=b[g],f.key?"object"==typeof c&&nArray.each(c,function(b,c){return nArray.mateKeys(b,f,a)&&nArray.mateValues(c,f,a)?d=!0:void 0}):"object"==typeof c?nArray.each(c,function(b,c){return d=nArray.mateValues(c,f,a)}):d=nArray.mateValues(c,f,a),d){if(!(a.indexOf("whole")>=0))break;d=++e==b.length}return d},mateKeys:function(a,b,c){return b.key=b.key.toLocaleLowerCase(),a=String(a).toString().toLocaleLowerCase(),c.indexOf("full")>=0?a===b.key:a.indexOf(b.key)>=0},mateValues:function(a,b,c){var d=!1,e=a.toString().toLocaleLowerCase(),f=b.val.toString().toLocaleLowerCase(),g=Number(b.val)?Number(b.val):b.val;return"="==b.mode?d=c.indexOf("full")>=0?e===f:e.indexOf(f)>=0:"!="==b.mode?d=c.indexOf("search")>=0?e.indexOf(f)<0:e!==f:">"==b.mode?d=a>g:">="==b.mode?d=a>=g:"<"==b.mode?d=g>a:"<="==b.mode&&(d=g>=a),d},mateFull:function(a,b,c){var d="full";return c&&(d="whole "+d),b?nArray.mateFor(d,a,b):a},mateSearch:function(a,b,c){var d="search";return c&&(d="whole "+d),b?nArray.mateFor(d,a,b):a}}),Array.prototype.$get=function(a,b){return nArray.mateFull(this,a,b)},Array.prototype.$search=function(a,b){return nArray.mateSearch(this,a,b)},Array.prototype.$fetch=function(a){var d,e,f,b=[],c=[];for(a=a?a.split(","):[],e=0;e<a.length;e++)c.push(nArray.trim(a[e]));if(c.length)for(e=0;e<this.length;e++){for(d={},f=0;f<c.length;f++)nArray.indexOf(nArray.toKeys(this[e]),c[f])>=0&&(d[c[f]]=this[e][c[f]]);nArray.toKeys(d).length&&b.push(d)}else b=this;return b},Array.prototype.$update=function(a){var b,c;for(c=0;c<this.length;c++)b="function"==typeof a?a.call(this[c],this.$path[c]):a,nArray.update(this[c],b);return this},Array.prototype.$unique=function(){var b,a=[];for(b=0;b<this.length;b++)a.indexOf(this[b])<0&&a.push(this[b]);return a},Array.prototype.$path=[];