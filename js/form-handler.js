document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pengaduanForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Mencegah pengiriman formulir secara default

        const formData = new FormData(form); // Membuat objek FormData dari formulir

        try {
            const response = await fetch('http://localhost:3000/pengaduan', {
                method: 'POST',
                body: formData,
                headers: {
                    'User-ID': localStorage.getItem('userId') // Menyertakan ID pengguna di header
                }
            });

            const result = await response.json(); // Mengurai respons JSON dari server

            if (response.ok) {
                alert('Pengaduan berhasil dikirim!');
                form.reset(); // Mengatur ulang formulir setelah berhasil
            } else {
                alert(`Error: ${result.error}`); // Menampilkan pesan error jika ada
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim pengaduan.'); // Menampilkan pesan error jika terjadi kesalahan
        }
    });
});
