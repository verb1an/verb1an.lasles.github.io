$(document).ready(function () {
	reviewsSlider();
	btnshover();
	barmenu();
});

const barmenu = () => {
	const bar = $('#bar');
	const items = $('.nav .item');
	let active = false;
	$('#bar').click(function () {
		$('html').addClass('hidden');
		$(this).toggleClass('noactive').toggleClass('enactive');
		$('.header').toggleClass('active');

		if($('.header').hasClass('active')) {
			$('.header').css('position', 'fixed');
			$('#intro').css('padding-top', '85px');
		}else{
			closeMenu();
		}
	});

	items.click(function () {
		closeMenu();
	});

	function closeMenu() {
		$('html').removeClass('hidden');
		$('.header .nav').addClass('noactive');
		setTimeout(() => {
			$('.header').attr('style', '');
			$('#intro').attr('style', '');
			$('.header .nav').removeClass('noactive');
		}, 900)
	}
}

const btnshover = () => {
	const span = '<span class="wrap"><span class="hovered"></span></span>';
	$('.btn').mouseenter(function () {
		if(!$(this).hasClass('bdrs')) {
			$(this).append(span);

			console.log();
			let width = $(this).width() + 2*Number.parseInt($(this).css('padding-left').replace('px', ''));
			let height = $(this).height() + Number.parseInt($(this).css('padding-top').replace('px', ''));

			$('.hovered').css({
				'left': `${Math.floor(Math.random() * width)}px`,
				'top': `${Math.floor(Math.random() * height)}px`,
				'width': '200%',
				'height': '800%',
			})
		}
	});
	$('.btn').mouseleave(function () {
		$('.wrap').remove();
	});
}

const reviewsSlider = () => {
	const wrap = document.querySelector('#reviews .content');
	const pag = $('#reviews .controlls .pag');
	const item = $('#reviews .content .item');
	const thumb = $('#reviews .controlls .thumb a');

	const length = item.length;
	const swtchWidth = wrap.scrollWidth/length + 2;
	const scrLength = Math.ceil((wrap.scrollWidth - wrap.offsetWidth)/swtchWidth);

	let active = 0;


	thumb.click(function () {

		active = Math.round($(wrap).scrollLeft()/swtchWidth);

		if($(this).hasClass('right')) {
			if(active != scrLength) {
				active++;
				move( active * swtchWidth );
			}
		}else{
			if(active != 0) {
				active--;
				move( active * swtchWidth );
			}
		}
	})

	const setPagination = () => {
		active = Math.round($(wrap).scrollLeft()/swtchWidth);
		for (var i = 0; i <= scrLength; i++) {
			pag.append(`<div class="item" value="${i}"></div>`);
		}
		pag.children().click(function () {
			active = $(this).attr('value');
			move( active * swtchWidth );
		});
		pag.children().first().addClass('active');
	}
	setPagination();

	function move(togo) {
		wrap.scrollTo({
			left: togo,
			behavior: 'smooth'
		});
	}

	$(wrap).scroll(function () {
		let sw = $(wrap).scrollLeft()/swtchWidth;
		let tsw = Math.floor($(wrap).scrollLeft()/swtchWidth);
		if( $(wrap).scrollLeft() > active*swtchWidth ) {
			if( (sw - tsw) > 0.9) {
				active = Math.round(sw);
				check();
			}
		}else{
			if( (sw - tsw) < 0.1) {
				active = Math.round(sw);
				check();
			}
		}
	});

	function check() {
		if(active == 0) {
			$('#reviews .controlls .thumb a.left').addClass('dis');
		}else if(active == scrLength) {
			$('#reviews .controlls .thumb a.right').addClass('dis');
		}else{
			$('#reviews .controlls .thumb a').removeClass('dis');
		}

		$('#reviews .controlls .pag .item').removeClass('active');
		$(`#reviews .controlls .pag .item:eq(${active})`).addClass('active');
	}
}
