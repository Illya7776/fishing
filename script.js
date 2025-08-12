document.getElementById('telegram-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Зупиняємо стандартну відправку форми

    const BOT_TOKEN = 'YOUR_BOT_TOKEN'; // 8466477225:AAEOAb1KqMPQ74FpBxQ0A9W-NV0DRcIESx0
    const CHAT_ID = 'YOUR_CHAT_ID'; // 657727975

    const name = this.elements.name.value;
    const phone = this.elements.phone.value;
    const comment = this.elements.comment.value;

    let message = `<b>🔥 Нове замовлення! 🔥</b>\n\n`;
    message += `<b>Ім'я:</b> ${name}\n`;
    message += `<b>Телефон:</b> ${phone}\n`;
    if (comment) {
        message += `<b>Коментар:</b> ${comment}`;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=html`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Показуємо повідомлення про успіх
                document.getElementById('success-message').style.display = 'block';
                // Очищуємо форму
                this.reset();
            } else {
                alert('Сталася помилка при відправці. Спробуйте ще раз.');
                console.error('Telegram API error:', data);
            }
        })
        .catch(error => {
            alert('Сталася помилка мережі. Перевірте з\'єднання.');
            console.error('Fetch error:', error);
        });
});
