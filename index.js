document.addEventListener('DOMContentLoaded', function() {
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const allowedUsers = [
        { username: 'Adnan', password: '54113' },
        { username: 'Jovan', password: '88719' },
        { username: 'Farzan', password: '72819' },
        { username: 'Aldi', password: '33829' },
        { username: 'Farhan', password: '19207' },
        { username: 'Raihan', password: '22819' },
        { username: 'Opal', password: '50291' },
        { username: 'Uta', password: '34223' },
        { username: 'Apik', password: '48299' },
        { username: 'Acuy', password: '88192' },
        { username: 'Development', password: '9' }
    ];

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const allowedUser = allowedUsers.find(user => user.username === username && user.password === password);

        if (allowedUser) {
            if (localStorage.getItem(username + '_quizLeft') === 'true') {
                alert('Mampus Ga Bisa Login.');
            } else {
                setCookie('username', username, 1);
                alert('Akun Dikenal,Selamat Bermain!');
                window.location.href = 'quiz.html';
            }
        } else {
            alert('Akun Ini Tidak Di Kenal.');
        }
    });

    // Check if user has left the quiz when they return to login page
    const username = getCookie('username');
    if (username && localStorage.getItem(username + '_quizLeft') === 'true') {
        alert('Mau Curang Kah Maniez');
        window.location.href = 'index.html';
    }
});