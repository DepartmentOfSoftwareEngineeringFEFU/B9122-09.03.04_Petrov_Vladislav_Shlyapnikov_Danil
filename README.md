# Веб-сервис для учёта и аренды коммерческой недвижимости

Готовый сервис для веб-приложения учёта аренды коммерческой недвижимости. Фронт находится в папке `/frontend` и запускается отдельно от бэкенда в папке `/backend`.

## Состав проекта

```text
backend/
  manage.py
  db.sqlite3                 # уже заполненная SQLite-БД
  requirements.txt
  rental_service/            # Django-проект
  core/                      # модели, API, seed-команда
frontend/
  package.json
  index.html
  src/App.jsx
  src/data.js                # справочники и локальный fallback, если API не запущен
```

## Быстрый запуск

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate --run-syncdb
# python manage.py seed_demo
python manage.py runserver 127.0.0.1:8000
```

`seed_demo` можно не запускать, потому что в архив уже добавлен заполненный `db.sqlite3`. Команда оставлена для повторного наполнения базы после очистки.

### 2. Frontend

Во втором терминале:

```bash
cd frontend
npm install
npm run dev
```

Откройте адрес, который покажет Vite, обычно `http://127.0.0.1:5173`.

Если backend запущен на другом адресе:

```bash
VITE_API_URL=http://127.0.0.1:8000 npm run dev
```

## API

- `GET /api/data/` — вся БД в формате, совместимом с React-фронтом.
- `GET /api/<collection>/` — список записей коллекции.
- `POST /api/<collection>/` — создать запись.
- `PUT /api/<collection>/<id>/` — обновить запись.
- `DELETE /api/<collection>/<id>/` — удалить запись.

Коллекции: `landlords`, `tenants`, `rooms`, `contracts`, `payments`, `acts`, `certificates`, `requests`, `notices`.

## Демонстрационные данные

В seed-файле и SQLite-БД находятся(около):

- 40 арендаторов;
- 65 помещений;
- 39 договоров аренды;
- 108 платежей по договорам;
- 36 актов приема-передачи;
- 20 свидетельств;
- 16 заявок на обслуживание;
- 11 уведомлений о задолженности.

## Демонстрация собранного решения(визуальная)
![Первое окно, на которое попадает пользователь](/screenshots/1.png)

![Пример изменения записи "Помещения"](/screenshots/2.png)

![Пример добавления новой записи "Заявки"](/screenshots/3.png)

### Сущности и связи



| Таблица Django/SQLite | Назначение | Ключи и связи |
|---|---|---|
| `core_landlord` | Арендодатель | `id` PK, `inn` UNIQUE |
| `core_tenant` | Общая карточка арендатора | `id` PK; содержит тип, ИНН, email, телефон |
| `core_tenantperson` | Данные арендатора-физлица | `tenant_id` PK/FK → `core_tenant.id`; UNIQUE(`passport_series`, `passport_number`) |
| `core_tenantcompany` | Данные арендатора-юрлица | `tenant_id` PK/FK → `core_tenant.id`; `ogrn` UNIQUE |
| `core_room` | Помещение | `id` PK; площадь, этаж, адрес, статус |
| `core_contract` | Договор аренды | `id` PK; FK: `room_id`, `landlord_id`, `tenant_id`; `contract_number` UNIQUE |
| `core_transferact` | Акт приема-передачи | `id` PK; FK `contract_id` → договор |
| `core_rentpayment` | Журнал платежей по аренде | `id` PK; FK `contract_id`; сумма, дата платежа, расчетный период, способ оплаты, статус |
| `core_metertype` | Справочник типов счетчиков | `id` PK; `name` UNIQUE |
| `core_meterreading` | Показания счетчиков по акту | FK `act_id`, `meter_type_id`; UNIQUE(`act_id`, `meter_type_id`) |
| `core_ownershipcertificate` | Свидетельство/документ о собственности | `id` PK; FK `contract_id`; UNIQUE(`cadastral_number`, `registration_number`) |
| `core_servicerequest` | Заявка на обслуживание | `id` PK; FK `contract_id`, `room_id`; бизнес-правило: помещение заявки должно совпадать с помещением договора |
| `core_debtnotice` | Уведомление о задолженности | `id` PK; FK `contract_id`, `room_id`; сумма долга и сроки погашения |
