window.addEventListener('DOMContentLoaded', function () {
	
	// Timer

	let deadline = '2025-12-09'; // Дата окончания таймера

	function getTimeRemaining(endtime) { // Функция получения времени
		let t = Date.parse(endtime) - Date.parse(new Date()), //Кол-во миллисекунд до окончания
		seconds = Math.floor( (t / 1000) % 60 ), //Перевод миллисекунд в секунды
		minutes = Math.floor( (t / 1000 / 60) % 60 ), // Перевод в минуты
		hours = Math.floor( (t / (1000 * 60 * 60)) ); // Перевод в часы

		return { // Возврат объекта времени
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	};

	function setClock(id, endtime) { 
	 	let timer = document.getElementById(id), // Получаем блок с таймером
	 			hours = timer.querySelector('.hours'), // Получаем поле с часами
	 			minutes = timer.querySelector('.minutes'), // Получаем поле с минутами
	 			seconds = timer.querySelector('.seconds'); // Получаем поле с секундами

	 	function updateClock() { // Функция обновления времени
	 		let t = getTimeRemaining(endtime); // Записыв в переменную ф-ию получения времени
	 		hours.innerHTML = t.hours; // Записываем в поле часы
	 		minutes.innerHTML = t.minutes; // Записываем в поле минуты
	 		seconds.innerHTML = t.seconds; // Записываем в поле секунды

	 		if(t.total <= 0) { // Проверка на окончание общего времени
	 			clearInterval(timeInterval); // остановка таймера
	 		}
	 	};

	 	updateClock(); // Вызов функции обноления времени
	 	let timeInterval = setInterval(updateClock, 1000); // Установление 
	 																										 //интервала в 1 секунду

	}; 

	setClock('timer', deadline); // Вызов функции получения времени

});