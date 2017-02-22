/**
 * by lcs
 * 2017-02-21
 */
(function(win){
	'use strict';
	const defaultSetting = {};
	const STR = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
	let MatrixRain = function( str ){
		let text = (str || STR).split('');
		let fontSize = 10;

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext("2d");
		const randomNum = function(min,max){ return min + Math.floor( Math.random() * ( max - min ) ) };
		const getText = function(){
			return text[randomNum(0,text.length)];
		};

		const showMap = {};
		const textMap = {};

		const render = function(){
			let colNum = Math.floor(canvas.width / (fontSize ));
			let rowNum = Math.floor(canvas.height / (fontSize ));

			for( let x = 0 ; x < colNum ; x++ ){
				showMap[x] = showMap[x] || {};
				let last = showMap[x][1] || {};
				let showText =  ( last.length ||  Math.random() > 0.975) ? true : false;
				showText = last.showText || Math.random() > 0.9 ? showText : !showText;
				showMap[x][0] = {
					showText : last.showText == undefined ? Math.random() > 0.5 : showText,
					color: Math.random() > 0.875 ? '#FFF':'#0F0',
					length: !last.length ? randomNum(3,25) : last.length -1
				}
			}

			for( let y = rowNum -1 ; y > 0; y-- ){
				for( let x = 0 ; x < colNum ; x++ ){
					showMap[x][y] = showMap[x][y-1] || {};
				}
			}

			for( let x = 0 ; x < colNum ; x++ ){
				for( let y = 0 ; y < rowNum -1; y++ ){
					if( showMap[x][y].showText ^ showMap[x][y+1].showText ){
						textMap[x] = textMap[x] || {};
						textMap[x][y] = getText();
					}
				}
			}

			ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for( let x = 0 ; x < colNum ; x++ ){
				for( let y = 0 ; y < rowNum ; y++ ){
					ctx.fillStyle = showMap[x][y].color;
					ctx.fillText ( showMap[x][y].showText  ? textMap[x][y]  : ' ' , x * fontSize * 1.1 ,  y * fontSize * 1.2);
				}
			}

			requestAnimationFrame(render);

		};

		this.width = function( width ){
			canvas.width = width;
		};

		this.height = function( height ){
			canvas.height = height;
		};

		this.getElement = function(){
			return canvas;
		};

		render();
	};

	win.MatrixRain = MatrixRain;
})(this);
