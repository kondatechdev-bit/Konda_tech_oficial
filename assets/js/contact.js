/**
 * Konda Tech - Form Validation & Native Email Redirection
 * Automatically directs form submissions to native device email app (iOS, Android, Windows, macOS, Linux)
 */

import { showToast } from './utils.js';

export function initContactForms() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    // Clear error state on user input/change
    inputs.forEach(input => {
      const clearError = () => {
        input.classList.remove('error');
        const errorMsg = input.closest('.form-group')?.querySelector('.form-error-msg') || input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
          errorMsg.classList.remove('visible');
        }
      };

      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let isValid = true;

      inputs.forEach(input => {
        const errorMsg = input.closest('.form-group')?.querySelector('.form-error-msg') || input.nextElementSibling;
        
        // Clear previous state
        input.classList.remove('error');
        if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
          errorMsg.classList.remove('visible');
        }

        // Email validation
        if (input.type === 'email' && input.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value)) {
            isValid = false;
            input.classList.add('error');
            if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
              errorMsg.textContent = 'Por favor, insira um e-mail válido.';
              errorMsg.classList.add('visible');
            }
          }
        }

        // Required check
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
            errorMsg.textContent = 'Este campo é obrigatório.';
            errorMsg.classList.add('visible');
          }
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
            Abrindo e-mail...
          `;
        }

        // Extract form fields dynamically
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const selectSubject = form.querySelector('select');
        const messageInput = form.querySelector('textarea');

        const name = nameInput ? nameInput.value.trim() : 'Visitante';
        const userEmail = emailInput ? emailInput.value.trim() : '';
        const subjectValue = selectSubject && selectSubject.selectedIndex >= 0 && selectSubject.options[selectSubject.selectedIndex].value
          ? selectSubject.options[selectSubject.selectedIndex].text 
          : 'Inscrição / Contacto Corporativo';
        const message = messageInput ? messageInput.value.trim() : 'Gostaria de receber mais detalhes sobre a Konda Tech e o ecossistema Atlas Engine.';

        const targetEmail = 'kondatech.dev@gmail.com';
        const emailSubject = `[Contacto Konda Tech] ${subjectValue}`;
        const emailBody = `Olá equipe Konda Tech,

Nova mensagem enviada pelo formulário do site:

• Nome: ${name}
• E-mail do remetente: ${userEmail}
• Assunto / Interesse: ${subjectValue}

• Mensagem:
${message}

--------------------------------------------------
Mensagem gerada pelo site oficial Konda Tech.`;

        const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        setTimeout(() => {
          // Trigger native device email client (iOS, Android, Windows, macOS, Linux)
          const mailLink = document.createElement('a');
          mailLink.href = mailtoUrl;
          mailLink.target = '_self';
          document.body.appendChild(mailLink);
          mailLink.click();
          document.body.removeChild(mailLink);

          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          showToast('Abrindo o aplicativo de e-mail do seu dispositivo (iOS/Android/Windows/Linux)...', 'success');
        }, 500);
      } else {
        showToast('Por favor, corrija os erros no formulário antes de enviar.', 'error');
      }
    });
  });
}

