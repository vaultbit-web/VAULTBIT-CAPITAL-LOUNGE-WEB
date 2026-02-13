const WEBHOOK_URL = 'https://dokployn8n.vaultbit.es/webhook/90697bc8-886f-4969-8d2e-bc8a57a7e89a';

function openModal() {
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Close on outside click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        closeModal();
    }
});

document.getElementById('accessForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('statusMsg');

    btn.disabled = true;
    btn.innerText = 'PROCESANDO...';
    status.style.display = 'none';

    // Collect Data
    const formData = new URLSearchParams(new FormData(e.target));

    try {
        // Using URLSearchParams + no-cors is the most reliable way to send leads to n8n
        // It arrives at n8n as a parsed object in $json.body
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        if (typeof fbq === 'function') {
            fbq('track', 'Lead');
        }

        status.innerText = 'SOLICITUD ENVIADA CORRECTAMENTE. REVISE SU EMAIL.';
        status.style.color = '#00ffaa';
        status.style.display = 'block';
        e.target.reset();
        setTimeout(closeModal, 3000);

    } catch (error) {
        console.error(error);
        status.innerText = 'ERROR EN LA CONEXIÓN. INTÉNTELO NUEVAMENTE.';
        status.style.color = '#ff4444';
        status.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.innerText = 'CONFIRMAR ASISTENCIA';
    }
});
