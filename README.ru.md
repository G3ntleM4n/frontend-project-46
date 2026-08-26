# Gendiff

[![Actions Status](https://github.com/G3ntleM4n/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/G3ntleM4n/frontend-project-46/actions) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46)

Русский | [English](README.md)

**Gendiff** — утилита командной строки для сравнения двух конфигурационных файлов и наглядного отображения различий между ними. Поддерживаются форматы **JSON** и **YAML** (`.yml`/`.yaml`), а файлы могут быть как плоскими, так и вложенными (с любым уровнем вложенности).

Утилита умеет показывать результат сравнения в трёх разных стилях вывода: `stylish` (по умолчанию), `plain` и `json`.

## Требования

Перед установкой убедитесь, что на компьютере установлен **Node.js** версии 18 или выше (вместе с ним автоматически устанавливается менеджер пакетов `npm`).

Проверить версию Node.js:

```bash
node -v
```

Если команда не найдена — скачайте и установите Node.js с официального сайта: <https://nodejs.org>

## Установка

1. Скачайте (или клонируйте) проект и перейдите в его папку:

   ```bash
   cd frontend-project-46-main
   ```

2. Установите зависимости проекта:

   ```bash
   make install
   ```

   Это сокращение для `npm ci` — оно установит все необходимые библиотеки в папку `node_modules`.

3. Сделайте утилиту доступной глобально, чтобы запускать её из любой папки командой `gendiff`:

   ```bash
   npm link
   ```

## Использование

Общий вид команды:

```bash
gendiff [опции] <путь_к_файлу_1> <путь_к_файлу_2>
```

Если `npm link` не выполнялся, запускайте утилиту через `node`:

```bash
node bin/gendiff.js <путь_к_файлу_1> <путь_к_файлу_2>
```

### Опции

| Опция | Описание |
| --- | --- |
| `-f, --format [type]` | Формат вывода результата: `stylish` (по умолчанию), `plain` или `json` |
| `-V, --version` | Показать версию утилиты |
| `-h, --help` | Показать справку по командам |

### Поддерживаемые форматы файлов

- `.json`
- `.yml` / `.yaml`

Сравнивать можно файлы разных форматов между собой (например, JSON с YAML).

## Примеры работы

Ниже используются тестовые файлы `files/file1.json` и `files/file2.json` из проекта:

### file1.json

```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

### file2.json

```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

### Формат `stylish` (по умолчанию)

```bash
gendiff files/file1.json files/file2.json
```

```text
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

Здесь `-` означает удалённое свойство, `+` — добавленное, а свойства без знака остались без изменений.

### Формат `plain`

```bash
gendiff files/file1.json files/file2.json --format plain
```

```text
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

### Формат `json`

```bash
gendiff files/file1.json files/file2.json --format json
```

```json
{
  "- follow": false,
  "  host": "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true
}
```

### Сравнение вложенных конфигураций

Утилита корректно обрабатывает и вложенные структуры (файлы `files/nested1.json` и `files/nested2.json`):

```bash
gendiff files/nested1.json files/nested2.json --format plain
```

```text
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

## Полезные команды для разработки

```bash
make install         # установка зависимостей (npm ci)
make lint             # проверка кода линтером ESLint
make lint-fix         # автоматическое исправление ошибок линтера
make test             # запуск тестов
make test-coverage    # запуск тестов с отчётом о покрытии
make publish          # тестовая публикация пакета (npm publish --dry-run)
```

## Структура проекта

```text
frontend-project-46-main/
├── bin/
│   └── gendiff.js           # точка входа CLI-утилиты (разбор аргументов и опций)
├── src/
│   ├── genDiff.js            # основная функция: чтение файлов и выбор форматтера
│   ├── parsers.js            # парсинг JSON и YAML файлов
│   ├── nestedCompare.js       # построение дерева различий (в т.ч. вложенных)
│   └── outputStyles.js        # форматирование результата: stylish, plain, json
├── files/                    # примеры файлов для сравнения (json/yml/yaml)
├── __fixtures__/              # тестовые данные
├── __tests__/                 # автотесты
├── package.json               # зависимости и команды проекта
└── Makefile                   # короткие команды для установки/тестов/линтинга
```

## Видеопримеры работы

### Сравнение плоских JSON-файлов

[![asciicast](https://asciinema.org/a/HJ2iOMlCH0NIpUll2abx0FSNo.svg)](https://asciinema.org/a/HJ2iOMlCH0NIpUll2abx0FSNo)

### Сравнение плоских YAML-файлов

[![asciicast](https://asciinema.org/a/WWBVwNPL2P8Xh1godohHP3FXu.svg)](https://asciinema.org/a/WWBVwNPL2P8Xh1godohHP3FXu)

### Сравнение вложенных JSON и YAML (формат stylish)

[![asciicast](https://asciinema.org/a/Gi5ZTFTHmSCnQ9fTrEVtwB5Ew.svg)](https://asciinema.org/a/Gi5ZTFTHmSCnQ9fTrEVtwB5Ew)

### Сравнение вложенных JSON и YAML (формат plain)

[![asciicast](https://asciinema.org/a/KrTDoAE8tF2caHeszdfxTLkAg.svg)](https://asciinema.org/a/KrTDoAE8tF2caHeszdfxTLkAg)

### Сравнение вложенных JSON и YAML (формат json)

[![asciicast](https://asciinema.org/a/zDkM3P3mLvLrki4mLlT8eB5e2.svg)](https://asciinema.org/a/zDkM3P3mLvLrki4mLlT8eB5e2)
