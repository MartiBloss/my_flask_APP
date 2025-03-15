from flask import Flask, render_template

# Создаем экземпляр Flask приложения
app = Flask(__name__)

# Определяем маршрут для главной страницы
@app.route('/')
def index():
    # Отображаем HTML-шаблон из папки templates
    return render_template('index.html')

# Запуск сервера
if __name__ == '__main__':
    # Указываем host и port для Render
    # Render использует порт 10000 по умолчанию
    app.run(host='0.0.0.0', port=10000, debug=False)  # Режим отладки отключен для продакшена