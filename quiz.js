document.addEventListener('DOMContentLoaded', function() {
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

    const username = getCookie('username');
    if (!username) {
        alert('Login Untuk Bisa Mengikuti Quiz');
        window.location.href = 'index.html'; 
        return;
    }

    const questions = [
        "Peran impostor yang memiliki kemampuan untuk berubah menjadi player lain adalah?",
        "Sebutkan 3 fraksi di game supersus.",
        "Peran SpaceCrew yang mempunyai skill melindungi diri dari serangan.",
        "Peran netral yang mempunyai skill membakar seluruh pemain adalah?",
        "Tombol yang di gunakan untuk meeting disebut?",
        "Sebutkan kemampuan swapper di supersus.",
        "Pusat pembelian app di device ios adalah?",
        "Sebuah kesalahan dalam program disebut?",
        "Sebutkan 5 peran SpaceCrew yang kamu tau.",
        "Sebutkan nama kemampuan impostor yang bisa merusak fasilitas pesawat."
    ];

    let currentQuestionIndex = 0;
    const answers = [];
    const questionContainer = document.getElementById('question-container');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');

    function showQuestion(index) {
        questionContainer.innerHTML = `
            <div class="question">
                <label for="answer">${questions[index]}</label>
                <textarea id="answer" name="answer" required></textarea>
            </div>
        `;
    }

    nextButton.addEventListener('click', function() {
        const answer = document.getElementById('answer').value.trim();
        if (answer) {
            answers[currentQuestionIndex] = answer;
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            } else {
                nextButton.style.display = 'none';
                submitButton.style.display = 'block';
            }
        } else {
            alert('Silahkan Jawab Terlebih Dahulu Untuk Lanjut Ke Soal Berikutnya');
        }
    });

    document.getElementById('quizForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const answer = document.getElementById('answer').value.trim();
        if (answer) {
            answers[currentQuestionIndex] = answer;
            localStorage.setItem('quizAnswers', JSON.stringify(answers));
            localStorage.setItem('username', username);
            window.location.href = 'results.html';
        } else {
            alert('Jawab Sebelum Mengkonfirmasi Semua Jawaban');
        }
    });

    showQuestion(currentQuestionIndex);

    // Prevent re-login and leaving quiz
    window.addEventListener('beforeunload', function() {
        localStorage.setItem(username + '_quizLeft', 'true');
    });
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            localStorage.setItem(username + '_quizLeft', 'true');
            window.location.href = 'index.html';
        }
    });
});