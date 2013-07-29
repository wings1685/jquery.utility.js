/**
 * jQuery Utility v1.0.4
 * http://flugel.biz/
 *
 * Licensed under the MIT license.
 * Copyright 2013 Yutaka Imagawa
 */

$.fn.extend({
	create: function(a, b) {
		var e = document.createElement(a), $t = $(this)[0], px = ['width', 'height', 'font-size'], v;
		if (!$t) return this;
		if (b) {
			for (var i in b) {
				var p = i.split('/'), s = typeof(b[i]) == 'function' ? b[i]() : b[i];
				for (var x = 0, l = p.length; x < l; x++) {
					switch (p[x]) {
						case 'css':
							for (var c in b[p[x]]) {
								v = typeof(b[p[x]][c]) == 'function' ? b[p[x]][c]() : b[p[x]][c];
								if (!isNaN(e.style[c]) && $.inArray(c, px) != -1) v += 'px';
								e.style[c] = v;
							}
							break;
						case 'data':
							for (var d in b[p[x]]) {
								var s = typeof(b[p[x]][d]) == 'function' ? b[p[x]][d]() : b[p[x]][d];
								e.setAttribute('data-' + d, s);
							}
							break;
						case 'class':
							e.className = s;
							break;
						case 'text':
							e.appendChild(document.createTextNode(s));
							break;
						case 'html':
							e.innerHTML = s;
							break;
						default:
							e[p[x]] = s;
							break;
					}
				}
			}
		}
		$t.appendChild(e);
		return this;
	},
	tx: function(s) {
		var $e = $(this)[0], t = ['text', 'search', 'url', 'tel'];
		if (!$e) return this;
		if ($e.tagName == 'IMG' || ($e.tagName == 'INPUT' && $e.type == 'image')) {
			$e.title = s, $e.alt = s;
		} else if (($e.tagName == 'INPUT' && $.inArray($e.type, t) != -1) || $e.tagName == 'TEXTAREA') {
			$e.title = s, $e.placeholder = s;
		} else {
			$e.title = s, $e.innerHTML = s;
		}
		return this;
	},
	changeClass: function(a, b) {
		a = a.split(' '), b = b.split(' ');
		var $t = $(this)[0];
		var c = $t.className.split(' '), n, m, f;
		for (var i = 0, l = c.length; i < l; i++) {
			if ((m = $.inArray(c[i], a)) != -1 || (n = $.inArray(c[i], b)) != -1) {
				c.splice(i, 1);
				i--;
				if (m != -1) f = true;
			}
		}
		if (f) $t.className = c.length == 0 ? b : c.join(' ') + ' ' + b;
		return this;
	},
	isMobile: function(m) {
		var u = ['iPhone', 'iPad', 'iPod', 'Android'], d = {
			mobile: (new RegExp(u.join('|'), 'i')).test(navigator.userAgent) ? true : false,
			iPhone: (new RegExp(u[0], 'i')).test(navigator.userAgent) ? true : false,
			iPad: (new RegExp(u[1], 'i')).test(navigator.userAgent) ? true : false,
			iPod: (new RegExp(u[2], 'i')).test(navigator.userAgent) ? true : false
		};
		d.iOS = (d.iPhone || d.iPad || d.iPod) ? true : false;
		return m === true ? d : m ? d[m] : d.mobile;
	},
	isMail: function(s){
		var s = s !== undefined ? s : $(this).val()
		return s.match(/^[A-Za-z0-9]+[\w-_.]+@[\w\.-]+\.\w{2,}$/) ? true : false;
	},
	doScroll: function(t) {
		var s = t !== undefined ? ($(t).offset()).top : 0;
		$().isMobile() ? window.scroll(0, s) : $('html,body').animate({scrollTop: s}, 500);
		return this;
	},
	addJS: function(s) {
		var e = document.createElement('script');
		e.type = 'text/javascript', e.src = s;
		$('head')[0].appendChild(e);
		return this;
	},
	addCSS: function(s) {
		var e = document.createElement('link');
		e.type = 'text/css', e.rel = 'stylesheet', e.href = s;
		$('head')[0].appendChild(e);
		return this;
	},
	print: function(p) {
		if (!window.console) return this;
		p !== undefined ? console.log(p) : console.log($(this));
		return this;
	}
});
