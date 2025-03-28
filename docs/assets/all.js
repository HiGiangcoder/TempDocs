// docs/js/custom.js
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các liên kết có định dạng *.cpp, *.ipynb, *.py
    const links = document.querySelectorAll('a[href$=".cpp"], a[href$=".ipynb"], a[href$=".py"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Ngừng hành động mặc định
            const fileUrl = link.getAttribute('href');
            const fileName = fileUrl.split('/').pop();
            
            // Tạo popup
            const popup = window.open('', 'popup', 'width=600,height=400,scrollbars=yes,resizable=yes');
            popup.document.write(`
                <html>
                <head><title>${fileName}</title></head>
                <body>
                <h2>${fileName}</h2>
                <iframe src="${fileUrl}" width="100%" height="100%"></iframe>
                </body>
                </html>
            `);
            popup.document.close();
        });
    });
});