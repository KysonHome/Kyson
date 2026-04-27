(function() {
	var config = window.pageI18n;
	if (!config || !config.translations) {
		return;
	}

	var translations = config.translations;
	var storageKey = config.storageKey || 'kyson-home-lang';
	var buttons = document.querySelectorAll('.lang-btn');

	function getDictionary(lang) {
		return translations[lang] || translations.zh || {};
	}

	function setButtonState(lang) {
		for (var i = 0; i < buttons.length; i += 1) {
			buttons[i].classList.toggle('is-active', buttons[i].getAttribute('data-lang') === lang);
		}
	}

	function applyNodes(selector, attribute, lang) {
		var nodes = document.querySelectorAll(selector);
		var current = getDictionary(lang);
		for (var i = 0; i < nodes.length; i += 1) {
			var key = nodes[i].getAttribute(attribute);
			if (current[key] !== undefined) {
				if (attribute === 'data-i18n-html') {
					nodes[i].innerHTML = current[key];
				} else if (attribute === 'data-i18n-placeholder') {
					nodes[i].setAttribute('placeholder', current[key]);
				} else {
					nodes[i].textContent = current[key];
				}
			}
		}
	}

	function applyLanguage(lang) {
		var current = getDictionary(lang);
		document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
		if (current.title) {
			document.title = current.title;
		}
		setButtonState(lang);
		applyNodes('[data-i18n]', 'data-i18n', lang);
		applyNodes('[data-i18n-html]', 'data-i18n-html', lang);
		applyNodes('[data-i18n-placeholder]', 'data-i18n-placeholder', lang);
		window.localStorage.setItem(storageKey, lang);
	}

	for (var i = 0; i < buttons.length; i += 1) {
		buttons[i].addEventListener('click', function() {
			applyLanguage(this.getAttribute('data-lang'));
		});
	}

	applyLanguage(window.localStorage.getItem(storageKey) || config.defaultLang || 'zh');
})();