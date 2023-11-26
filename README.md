<h2 align="center">Описание</h2>

<h3>Реализована функциональность</h3>

<li>Модель, оценивающая транзакции с точностью 99.63%</li>

<li>Веб сайт с интерфейсом, графиками и информацией по транзакциями</li>


<h3>Основной стек технологий</h3>

<li>HTML, CSS, JavaScript</li>
<li>Python</li>


<h3>Среда запуска</h3>

<li>Google Collab</li>
<li>Node.js</li>
<li>*если будете пробовать запускать обучение модели и/или оценку транзакций не в Collab - понадобится установка Cuda</li><br><br>

[Ссылка](https://disk.yandex.ru/client/disk) на диск с презентацией и видео работы.

<h1 align="center">Запуск</h1>

<h4>1. Оценка транзакций</h4>

<h5>*В проекте уже залит файл, со столбцом оценки транзакции, прогнанный через модель, на 1000 строк</h5>

Если хотите ввести новые данные - следуйте инструкции ниже. Если хватит тех, которые имеются и хотите просмотреть работоспособность интерфейса - можете использовать существующее.

В [этом файле](https://github.com/Allfeeto/monitoring_tranzaction/blob/main/Обучение%20модели/Оценка%20транзакций%20(Collab).txt) написан код, который мы запускали с помощью [Google Collab](https://colab.google/) (для тестирования идеально, так как там все библиотеки скачаны изначально)

<li>--> Измените среду выполнения на "Т4";</li>
    
<li>--> Добавьте вес модели (fraud_detection_model_epoch_594640.pth, находится в папке "Обучение модели") в файлы в коллабе;</li>
    
<li>--> Добавьте изначальный csv-файл с транзакциями юез оценки, которые нужно оценить туда же;</li>
    
<li>--> запустите код.</li><br>
    
Вы получите `csv-файл` с оцененными транзакциями, этот файл закиньте в проект в папку "dataCSV"

<br><br>

<h4>2. Запуск сайта и сервера</h4>

<b>Проверьте установлен ли у вас Node.js</b>

Откройте терминал, пройдите к каталогу проекта:

    cd ВАШЕ РАСПОЛОЖЕНИЕ ПРОЕКТА

введите команду:

    node server.js

HTML файл мы запускали на локальном сервере с помощью расширения "Live Server" в VisualStudio Code, но его запустить можно любыми удобными для вас способами. (вплоть до простого открытия в браузере)

<br><br>

<h4>3. Загрузка файла с данными</h4>

Нажмите на кнопку `Выбрать файл`, выберите `data.csv` и нажмите кнопку `Загрузить файл`

*Файл для сервера должен называться `data.csv` и находиться в папке "dataCSV".

**Готово**, вы можете просматривать информацию по транзакциям!





