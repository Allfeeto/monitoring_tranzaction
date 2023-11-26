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
<li>*если будете пробовать запускать обучение модели и/или оценку транзакций не в Collab - понадобится установка Cuda</li>



<h1 align="center">Запуск</h1>

<h4>1. Оценка транзакций</h4>

В [этом файле](https://github.com/Allfeeto/monitoring_tranzaction/blob/main/Обучение%20модели/Оценка%20транзакций%20(Collab).txt) написан код, который мы запускали с помощью [Google Collab](https://colab.google/) (для тестирования идеально, так как там все библиотеки скачаны изначально)

<li>--> Измените среду выполнения на "Т4";</li>
    
<li>--> Добавьте вес модели (fraud_detection_model_epoch_594640.pth, находится в папке "Обучение модели") в файлы в коллабе;</li>
    
<li>--> Добавьте изначальный csv-файл с транзакциями, которые нужно оценить туда же;</li>
    
<li>--> запустите код.</li><br>
    
Вы получите `csv-файл` с оцененными транзакциями, этот файл закиньте в проект в папку "dataCSV"

*В проекте уже залит файл, со столбцом оценки транзакции, прогнанный, через модель<br><br>

<h4>2. Запуск сайта и сервера</h4>

<b>Проверьте установлены ли у вас Node.js, VisualStudio Code</b>

Откройте терминал, пройдите к каталогу проекта, введите команду:

    node server.js

HTML файл мы запускали на локальном сервере с помощью расширения "Live Server" в VisualStudio Code, но его запустить можно любыми удобными для вас способами. (вплоть до простого открытия в браузере)





