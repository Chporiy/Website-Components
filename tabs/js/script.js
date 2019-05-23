window.addEventListener('DOMContentLoaded', function () {
	
	let tab = document.getElementsByClassName('info-header-tab'),
			tabContent = document.getElementsByClassName('info-tabcontent'),
			info = document.getElementsByClassName('info')[0];

	function hideTabContent(a) {
			for (let i = a; i < tabContent.length; i++) { // Проходим по всем блокам с информацией
				tabContent[i].classList.remove('show'); // Удаляем класс show 
				tabContent[i].classList.add('hide'); // Добавляем класс hide
			}
	}

	hideTabContent(1); // Вызываем функцию скрытия контекта табов, кроме 1 таба

	function showTabContent (b) { 
			if (tabContent[b].classList.contains('hide')){ // Проверяем, если блок с инфо имеет класc hide
				hideTabContent(0); // Скрываем все блоки с инфо
				tabContent[b].classList.remove('hide'); // Удаляем класс hide для нужного таба
				tabContent[b].classList.add('show'); // Добавляем класс show для нужного таба
			}
	}

	info.addEventListener('click',  function(event) { // Событие нажание на блок info 
			let target = event.target; // Создание переменной, в которой хранится цель события
			if (target.className == 'info-header-tab') { // Проверка на наличие у цели класса info-header-tab (ДЕЛЕГИРОВАНИЕ)
				for (let i = 0; i < tab.length; i++) { // Проход по всем табам
					if (target == tab[i]){ // Проверка на совпадение цели и таба 
						showTabContent(i); // Показ блока с инфо для нужного таба
						break; // Остановка функции
					}
				}
			}
	});

});