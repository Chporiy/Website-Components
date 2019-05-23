window.addEventListener('DOMContentLoaded', function () {
	
	// Модальное окно

	let more = document.querySelector('.more'),
			overlay = document.querySelector('.overlay'),
			close = document.querySelector('.popup-close'),
			descr = document.querySelector('.content'),
			show;

	more.addEventListener('click', show = function showModal() {
		more.classList.add('more-splash');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';		
	});
	close.addEventListener('click', function closeModal() {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	descr.addEventListener('click', function(event) {
		let target = event.target;
		if(target.className == 'description-btn') {
			show();
		}
	});

	// Form
	let message = new Object();
	message.loading = "Загрузка..";
	message.success = "Спасибо! Мы скорко с вами свяжемся";
	message.failure = "Ошибка..";

	let form = document.getElementsByClassName('main-form')[0],
			input = form.getElementsByTagName('input'),
			statusMessage = document.createElement('div');

	let contactForm = document.getElementById("form"),
			contactInput = contactForm.getElementsByTagName(input);

	statusMessage.classList.add('status');
	
	form.addEventListener('submit', function(event) {
		event.preventDefault();

		form.appendChild(statusMessage);

		// AJAX
		let request = new XMLHttpRequest();

		request.open('POST', 'server.php');
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(form);

		request.send(formData);

		request.onreadystatechange = function() {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4) {
				if(request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
				} else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}

	});		

	contactForm.addEventListener('submit', function(event) {
		event.preventDefault();

		contactForm.appendChild(statusMessage);

		//AJAX
		let request = new XMLHttpRequest();
		request.open("POST", "server.php");
		request.getResponseHeader('Content-Type', 'application/x-www-form-urlencoded');
		let formData = new FormData(contactForm);
		request.send(formData);
		request.onreadystatechange = function() {
			if(request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
				} else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}

	});

	// Slider

	let slideIndex = 1,
			slides = document.getElementsByClassName("slider-item"),
			prev = document.querySelector(".prev"),
			next = document.querySelector(".next"),
			dotsWrap = document.querySelector(".slider-dots"),
			dots = document.getElementsByClassName("dot");

	showSlides(slideIndex);

	function showSlides(n) {
		
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (let i = 0; i < dots.length; i++) {
			dots[i].classList.remove('dot-active');
		}
		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].classList.add("dot-active");

	}

	function plusSlides(n) {
		showSlides(slideIndex += n) 
	}

	function currentSlide(n) {
		showSlides(slideIndex = n);  
	}

	prev.addEventListener("click", () => {
		plusSlides(-1);
	});
	next.addEventListener("click", () => {
		plusSlides(1);
	});
	dotsWrap.addEventListener("click", (event) => {
		let target = event.target;
		for (let i = 0; i < dots.length + 1; i++) {
			if (target.classList.contains("dot") && target == dots[i-1]) {
				currentSlide(i);
			}
		}
	});

	//Calc

	let persons = document.getElementsByClassName("counter-block-input")[0],
			restDays = document.getElementsByClassName("counter-block-input")[1],
			place = document.getElementById("select"),
			totalValue = document.getElementById("total"),
			personsSum = 0,
			daysSum = 0,
			total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener("change", function() {
		personsSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if (restDays.value == "") {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});
	restDays.addEventListener("change", function() {
		daysSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if (persons.value == "") {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});
	place.addEventListener("change", function() {
		if (restDays.value == "" || persons.value == "") {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});

});