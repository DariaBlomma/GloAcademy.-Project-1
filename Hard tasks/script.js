'use strict';
const cityArr = {
    rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
    uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
    bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
    jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
}


const countrySelect = document.querySelector('#country'),
        citySelect = document.querySelector('#city'),
        result = document.querySelector('.result');

const fillSelect = elem => {
    let cityOption = document.createElement('option');
    cityOption.textContent = elem;
    citySelect.append(cityOption);
    citySelect.style.display = 'inline-block';
};

const clearSelect = () => {
    const options = document.querySelectorAll('#city option');
    options.forEach(item => item.remove())
};

const bind = (opt) => {
    for (const key in cityArr) {
        if (opt === key) {
            const arr = cityArr[key].map(item => {
                fillSelect(item);
            });
        }
    }
};

countrySelect.addEventListener('change', () => {
    clearSelect();
    const option = countrySelect.value;
    bind (option);
});

citySelect.addEventListener('change', () => {
    const option = citySelect.value;
    result.textContent = countrySelect.options[countrySelect.selectedIndex].innerHTML + ' ' + option;
})
