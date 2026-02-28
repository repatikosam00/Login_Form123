 (function() {
      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const usernameGroup = document.getElementById('username-group');
      const passwordGroup = document.getElementById('password-group');
      const loginBtn = document.getElementById('loginBtn');
      const messageBox = document.getElementById('login-message');
      const messageText = document.getElementById('message-text');

      // validation helpers
      function validateUsername() {
        const val = usernameInput.value.trim();
        const isValid = val.length >= 4;
        if (isValid) {
          usernameGroup.classList.add('valid');
        } else {
          usernameGroup.classList.remove('valid');
        }
        return isValid;
      }

      function validatePassword() {
        const val = passwordInput.value;
        const isValid = val.length >= 6;
        if (isValid) {
          passwordGroup.classList.add('valid');
        } else {
          passwordGroup.classList.remove('valid');
        }
        return isValid;
      }

      // realtime validation with dynamic class & hint update
      usernameInput.addEventListener('input', function() {
        validateUsername();
        updateMessageNeutral();   // while typing, reset to neutral (but keep dynamic)
      });

      passwordInput.addEventListener('input', function() {
        validatePassword();
        updateMessageNeutral();
      });

      // helper to set neutral message
      function updateMessageNeutral() {
        messageBox.classList.remove('error-message', 'success-message');
        messageText.innerText = 'awaiting secure handshake';
        messageBox.style.borderColor = 'rgba(255,255,255,0.05)';
        // change icon if needed (always satellite by default)
        const icon = messageBox.querySelector('i');
        if (icon) icon.className = 'fas fa-satellite-dish';
      }

      // handle form submit (interactive dynamic effect)
      loginBtn.addEventListener('click', function(e) {
        e.preventDefault();  // prevent actual submit for demo

        const usernameValid = validateUsername();
        const passwordValid = validatePassword();

        // animate button as feedback (extra dynamic touch)
        loginBtn.style.transform = 'scale(0.98)';
        setTimeout(() => loginBtn.style.transform = '', 120);

        if (usernameValid && passwordValid) {
          // success state
          messageBox.classList.remove('error-message');
          messageBox.classList.add('success-message');
          messageText.innerText = '✓ access granted · redirecting to nebula';
          messageBox.style.borderColor = '#87ffbf30';
          const icon = messageBox.querySelector('i');
          if (icon) icon.className = 'fas fa-shield-halos';  // (fallback if not exists? using shield-halos)
          // if shield-halos not available, fallback to check-circle
          if (!icon || icon.className.indexOf('shield') === -1) {
            messageBox.querySelector('i').className = 'fas fa-circle-check';
          } else {
            messageBox.querySelector('i').className = 'fas fa-shield-halos';
          }

          // also bounce the container slightly (unique)
          document.querySelector('.login-container').style.animation = 'none';
          document.querySelector('.login-container').offsetHeight;
          document.querySelector('.login-container').style.animation = 'subtleGlow 0.4s ease';

        } else {
          // error / invalid
          messageBox.classList.remove('success-message');
          messageBox.classList.add('error-message');
          messageText.innerText = '✗ invalid identifier or passphrase';
          messageBox.style.borderColor = '#ff9f9f40';
          const icon = messageBox.querySelector('i');
          if (icon) icon.className = 'fas fa-triangle-exclamation';

          // shake effect on container for fun dynamic feedback
          const container = document.querySelector('.login-container');
          container.style.transform = 'translateX(-5px)';
          setTimeout(() => container.style.transform = 'translateX(5px)', 50);
          setTimeout(() => container.style.transform = 'translateX(-3px)', 100);
          setTimeout(() => container.style.transform = 'translateX(2px)', 150);
          setTimeout(() => container.style.transform = 'translateX(0)', 200);
        }
      });

      // extra dynamic: hover on message updates icon (unique micro-interaction)
      messageBox.addEventListener('mouseenter', function() {
        if (!messageBox.classList.contains('error-message') && !messageBox.classList.contains('success-message')) {
          messageBox.querySelector('i').className = 'fas fa-sync fa-spin';
        }
      });
      messageBox.addEventListener('mouseleave', function() {
        if (!messageBox.classList.contains('error-message') && !messageBox.classList.contains('success-message')) {
          messageBox.querySelector('i').className = 'fas fa-satellite-dish';
        }
      });

      // dynamic placeholder / label interactive effect: on focus label glows
      const inputWrappers = document.querySelectorAll('.input-wrapper');
      inputWrappers.forEach(w => {
        w.addEventListener('mouseenter', () => {
          w.style.backgroundColor = 'rgba(22, 30, 55, 0.8)';
        });
        w.addEventListener('mouseleave', () => {
          w.style.backgroundColor = 'rgba(12, 16, 30, 0.6)';
        });
      });

      // validate on page load (to set initial valid/invalid classes)
      validateUsername();
      validatePassword();

      // handle "forgot" click just for demo (interactive dummy)
      document.querySelector('.forgot-link').addEventListener('click', function(e) {
        e.preventDefault();
        messageBox.classList.remove('error-message', 'success-message');
        messageText.innerText = '🌀 sending recovery pulse ... (demo)';
        messageBox.querySelector('i').className = 'fas fa-pulse fa-satellite';
        setTimeout(updateMessageNeutral, 1500);
      });

      // Checkbox dynamic – no validation needed but extra visual
      const check = document.getElementById('remember');
      check.addEventListener('change', function() {
        if (this.checked) {
          this.nextElementSibling.style.color = '#b3d0ff';
        } else {
          this.nextElementSibling.style.color = '#bac3ee';
        }
      });
    })();