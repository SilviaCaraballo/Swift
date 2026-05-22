document.addEventListener('DOMContentLoaded', () => {
    const commentForm  = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const commentsList = document.getElementById('commentsList');
    const noComments   = document.getElementById('noComments');
    const commentError = document.getElementById('commentError');

    if (commentForm && commentInput && commentsList) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const text = commentInput.value.trim();

            if (text === '') {
                commentInput.setAttribute('aria-invalid', 'true');
                if (commentError) {
                    commentError.setAttribute('aria-hidden', 'false');
                }
                commentInput.focus();
                return;
            }

            commentInput.removeAttribute('aria-invalid');
            if (commentError) {
                commentError.setAttribute('aria-hidden', 'true');
            }

            if (noComments) {
                noComments.style.display = 'none';
            }

            const commentCard = document.createElement('article');
            commentCard.className = 'comment-item';

            const now = new Date();
            const dateString = now.toLocaleDateString('es-ES', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            // Sanitización contra XSS
            const safeText = text
                .replace(/&/g,  '&amp;')
                .replace(/</g,  '&lt;')
                .replace(/>/g,  '&gt;')
                .replace(/"/g,  '&quot;')
                .replace(/'/g,  '&#039;');

            commentCard.innerHTML = `
                <div class="comment-meta">
                    <span class="comment-meta-left">Lector@ de SwiftData</span>
                    <span class="comment-meta-right"><time>${dateString}</time></span>
                </div>
                <p class="comment-text">${safeText}</p>
            `;

            commentsList.insertBefore(commentCard, commentsList.firstChild);

            commentInput.value = '';
            commentInput.focus();
        });
    }
});

function w3_open() {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('myOverlay');
    const menuBtn = document.querySelector('[aria-controls="mySidebar"]');
    if (sidebar) sidebar.style.display = 'block';
    if (overlay) overlay.style.display = 'block';
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
}

function w3_close() {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('myOverlay');
    const menuBtn = document.querySelector('[aria-controls="mySidebar"]');
    if (sidebar) sidebar.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}
