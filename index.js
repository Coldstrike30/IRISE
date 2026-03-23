const addBtn = document.querySelector('.addBtn');
      const modalOverlay = document.getElementById('addNoteModal');
      const closeBtn = document.getElementById('closeModalBtn');
      const dropZone = document.getElementById('dropZone');
      const fileInput = document.getElementById('fileInput');
      const filePreview = document.getElementById('filePreview');
      const form = document.getElementById('noteForm');

      addBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
      });

      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });

      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });

      dropZone.addEventListener('click', () => fileInput.click());

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
      });

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        handleFile(file);
      });

      function handleFile(file) {
        if (!file) return;

        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedTypes.includes(file.type)) {
          alert('Invalid file type.');
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          alert('File must be under 10MB.');
          return;
        }

        filePreview.innerHTML = `Selected File: ${file.name}`;
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('Form submitted');
        console.log('Name:', document.getElementById('userName').value);
        console.log('Email:', document.getElementById('userEmail').value);
        console.log('Department:', document.getElementById('department').value);
        console.log('Core Value:', document.getElementById('coreValue').value);
        console.log('Description:', document.getElementById('noteContent').value);
        console.log('File:', fileInput.files[0]);

        alert('Submission Successful!');

        modalOverlay.classList.remove('active');
        form.reset();
        filePreview.innerHTML = '';
      });