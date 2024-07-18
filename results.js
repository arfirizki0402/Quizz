document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.getElementById('results');
    const username = localStorage.getItem('username');
    const answers = JSON.parse(localStorage.getItem('quizAnswers'));

    if (!username || !answers) {
        resultsContainer.innerHTML = '<p>No results available. Please complete the quiz first.</p>';
        return;
    }

    let resultsHtml = `<p>Username: ${username}</p><ul>`;
    answers.forEach((answer, index) => {
        resultsHtml += `<li>Question ${index + 1}: ${answer}</li>`;
    });
    resultsHtml += '</ul>';

    resultsContainer.innerHTML = resultsHtml;
});