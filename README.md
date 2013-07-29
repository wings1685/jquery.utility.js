これはメソッドチェイン内でいくつかの機能を使えるようにした jQuery プラグインです。

# 機能説明

## _.create(tagName, elements)_
_.create()_ は、ほぼ .append() と似ていますが、生成する方法が異なります。

### 第一引数 _tagName_
'div' や 'span' などのタグ名を定義します。

### 第二引数 _elements_
生成する要素に与えるデータを Object 形式で定義します。

'css' の場合は、$(selector).css({color: 'rgb(255, 0, 0)'}) と同じ形式です。font-size などハイフンが入る値の場合は、  
<code>css: {'font-size': '1.2em'}</code> のように引用符で囲んでください。  
'data' の場合は、<code>data: {name: 'user name'}</code> のように Object 形式で指定します。name-01 などハイフンが入る値の場合は、  
<code>data: {'name-01': 'user name 01'}</code> のように引用符で囲んでください。  
また、上記以外の場合、スラッシュで区切ることで、同じ値を複数の属性に定義できます。

### 使用例
	$('#create')
		.create('input', {
			id: 'create_input',
			'placeholder/title/value': 'Fill in your name'
		})
		.create('a', {
			id: 'a',
			href: 'http://jquery.com/',
			'title/html': 'A',
			data: {
				href: 'http://jquery.com/',
				tag: function() {
					return 'a';
				}
			},
			css: {
				color: 'rgb(255, 0, 0)',
				'font-size': function() {
					return '1.2em';
				}
			}
		})
	;


## _.tx(string)_
_.tx()_ は、要素に title と html に同じ値を入れたい場合などに使用できます。

### 引数 _string_
値を定義します。

img 要素と input 要素（type:image）に使う場合は、alt と title に string が入ります。  
input 要素（type:text）、input 要素（type:search）、input 要素（type:url）、input 要素（type:tel）、textarea 要素に使う場合は、title と placeholder に string が入ります。  
その他の場合は title と html に string が入ります。

強制的に上記の 2 つの属性に string が入るので、個別に指定したい場合は、 _.tx()_ を使わず、.attr() などで個別に指定してください。

### 使用例
	$('body')
		.find('#tx1').tx('tx1').end()
		.find('#tx2').tx('tx2').end()
	;


## _.changeClass(remove, add)_
.toggleClass() は、あれば削除、なければ追加をしますが、 _.changeClass()_ は、強制的に第一引数を削除、第二引数を追加します。

### 第一引数 _remove_
削除したいクラス名を定義します。

### 第二引数 _add_
追加したいクラス名を定義します。

### 使用例
	$('#changeClass2').changeClass('blue', 'red');


## _.isMobile(target)_
_.isMobile()_ は、アクセスしたデバイスがモバイルかどうかを UserAgent で判定します。

### 引数 _target_
引数 _target_ が以下の場合、次のような挙動になります。


* 与えられない場合：iPhone/iPad/iPod/Android であるかの結果を true/false で返します。
* 'iPhone'：iPhone であるかの結果を true/false で返します。
* 'iPad'：iPad であるかの結果を true/false で返します。
* 'iPod'：iPod であるかの結果を true/false で返します。
* 'iOS'：iPhone/iPad/iPod であるかの結果を true/false で返します。
* true：iPhone/iPad/iPod/iOS であるかの結果を Object 形式で返します。

### 使用例
	var isMobile = $.isMobile(true);
	$('#isMobile')
		.create('p', {'title/text': 'mobile: ' + $.isMobile()})
		.create('p', {'title/text': 'iPhone: ' + $.isMobile('iPhone')})
		.create('p', {'title/text': 'iPad: ' + $.isMobile('iPad')})
		.create('p', {'title/text': 'iPod: ' + $.isMobile('iPod')})
		.create('p', {'title/text': 'iOS: ' + isMobile.iOS})
	;


## _.isMail(value)_
_.isMail()_ は、判定する値がメールアドレスかどうか（xx@xx.xx）を true/false で返します。

### 引数 _value_
引数 _value_ が以下の場合、次のような挙動になります。

* 与えられている場合：その与えられた _value_ がメールアドレスかどうかの判定をします。
* 与えられない場合：$(this).val() を値として、メールアドレスかどうかの判定をします。

### 使用例
	$(document)
		.on('keyup', '#isMail', function() {
			$('#result').tx('isMail: ' + $('#isMail').isMail());
		})
	;


## _.doScroll(target)_
_.doScroll()_ は、画面スクロールを行います。

### 引数 _target_
引数 _target_ が以下の場合、次のような挙動になります。
なお、$().doScroll としても機能するので、メソッドチェインの中であっても有効です。

* 与えられている場合： _target_ の場所を position() で取得し、スクロールします。
* 与えられない場合：ページの一番上（x: 0, y: 0）へスクロールします。

$.mobile() で true と判定された場合は、上記の場所へのスムーススクロールのアニメーション無しのジャンプになります。

### 使用例
	$(document)
		.on('click', '#btn_doScroll1', function() {
			$.doScroll('#btn_doScroll2');
		})
		.on('click', '#btn_doScroll2', function() {
			$.doScroll();
		})
	;


## _.addJS(file)_
_.addJS()_ は、head 要素の一番最後に JavaScript ファイルを追加します。
なお、$().addJS としても機能するので、メソッドチェインの中であっても有効です。

### 引数 _file_
読み込みたい JavaScript のファイル名を定義します。

### 使用例
	$.addJS('./test.js');


## _.addCSS(file)_
_.addCSS()_ は、head 要素の一番最後に CSS ファイルを追加します。
なお、$().addCSS としても機能するので、メソッドチェインの中であっても有効です。

### 引数 _file_
読み込みたい CSS のファイル名を定義します。

### 使用例
	$.addCSS('./test.css');


## _.print(target)_
_.print()_ は、console.log() を行います。

### 引数 _target_
引数 _target_ が以下の場合、次のような挙動になります。

* 与えられている場合：console.log( _target_ ) を実行します。
* 与えられない場合：concole.log($(this)) を実行します。

### 使用例
	var isMobile = $().isMobile(true);
	$('#print')
		.print(isMobile)
		.print()
	;


# 動作環境
Chrome/Safari/Firefox/Opera/IE8+
iPhone/iPad/iPod touch/Android


このプラグインがお役に立てれば幸いです。