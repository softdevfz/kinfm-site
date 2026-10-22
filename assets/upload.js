/* Private upload page: no telemetry, persistence, or third-party dependencies. */
(function (global) {
  'use strict';
  const MAX_BYTES = 209_715_200;
  const TEXT = {
    es: {
      loading: "Comprobando tu enlace…", unavailable: "Este enlace venció o ya no tiene subidas disponibles. Pedí un enlace nuevo respondiendo el mensaje.",
      language: 'Idioma', eyebrow: 'La muestra gratis de tu familia', title: 'Envía tu grabación',
      intro: 'Una historia, con su propia voz. Elige el audio que grabaron para la muestra de KinFM.',
      consentTitle: 'Antes de subirla', consent: 'Al inicio, el abuelo o la abuela dice su nombre y que acepta que KinFM use la grabación para su muestra.',
      privacy: 'Comparte este enlace privado solo con tu familia. Si no continúas, borramos la grabación y la muestra dentro de los 30 días.',
      choose: 'Elige los archivos de audio', limits: 'M4A, MP3, OGG, OPUS, WAV o AAC · Hasta 200 MB por archivo.',
      send: 'Subir grabación', help: '¿Necesitas ayuda o un enlace nuevo?', progress: 'Progreso de subida',
      ready: 'Puedes subir hasta {n} archivo(s) con este enlace. Cada espacio se usa una sola vez; para reemplazar una grabación, pide otro enlace.',
      invalid: 'Este enlace no es válido. Abre el enlace completo del correo o pide uno nuevo a soporte@kinfm.com.',
      select: 'Elige al menos un archivo de audio.', count: 'Quedan {n} espacios disponibles. Elige menos archivos.',
      file: 'Cada archivo debe ser un audio M4A, MP3, OGG, OPUS, WAV o AAC, no estar vacío y pesar hasta 200 MB.',
      uploading: 'Subiendo archivo {n} de {total}… Mantén abierta esta página. La barra se completará cuando se confirme la subida.',
      done: 'Grabación recibida. {n} archivo(s) subido(s). La muestra llegará por correo hasta 7 días después de recibir tu grabación.',
      error: 'No pudimos confirmar esta subida. {n} archivo(s) confirmado(s). Revisa tu conexión. Si el enlace venció o el problema continúa, escribe a soporte@kinfm.com; no vuelvas a enviar los archivos ya confirmados.'
    },
    en: {
      loading: "Checking your link…", unavailable: "This link has expired or has no uploads left. Reply to the message to ask for a new link.",
      language: 'Language', eyebrow: "Your family's free sample", title: 'Send your recording',
      intro: 'A story, in their own voice. Choose the audio you recorded for your KinFM sample.',
      consentTitle: 'Before you upload', consent: 'At the beginning, your grandparent says their name and that they agree to KinFM using the recording for their sample.',
      privacy: "Keep this private link within your family. If you don't continue, we delete the recording and sample within 30 days.",
      choose: 'Choose audio files', limits: 'M4A, MP3, OGG, OPUS, WAV or AAC · Up to 200 MB per file.',
      send: 'Upload recording', help: 'Need help or a new link?', progress: 'Upload progress',
      ready: 'You can upload up to {n} file(s) with this link. Each slot can be used once; ask for another link to replace a recording.',
      invalid: 'This link is invalid. Open the complete link from your email or request a new one from soporte@kinfm.com.',
      select: 'Choose at least one audio file.', count: 'There are {n} upload slots left. Choose fewer files.',
      file: 'Each file must be a nonempty M4A, MP3, OGG, OPUS, WAV or AAC audio file, up to 200 MB.',
      uploading: 'Uploading file {n} of {total}… Keep this page open. The bar will fill when your upload is confirmed.',
      done: 'Recording received. {n} file(s) uploaded. Your sample will arrive by email within 7 days of receiving your recording.',
      error: 'We could not confirm this upload. {n} file(s) confirmed. Check your connection. If the link has expired or the problem continues, contact soporte@kinfm.com; do not resend files already confirmed.'
    },
    pt: {
      loading: "Verificando seu link…", unavailable: "Este link expirou ou não tem mais envios disponíveis. Responda à mensagem para pedir um novo link.",
      language: 'Idioma', eyebrow: 'A amostra grátis da sua família', title: 'Envie sua gravação',
      intro: 'Uma história, com a própria voz. Escolha o áudio que vocês gravaram para a amostra da KinFM.',
      consentTitle: 'Antes de enviar', consent: 'No início, o avô ou a avó diz seu nome e que aceita que a KinFM use a gravação para a sua amostra.',
      privacy: 'Compartilhe este link privado apenas com sua família. Se você não continuar, apagamos a gravação e a amostra em até 30 dias.',
      choose: 'Escolha os arquivos de áudio', limits: 'M4A, MP3, OGG, OPUS, WAV ou AAC · Até 200 MB por arquivo.',
      send: 'Enviar gravação', help: 'Precisa de ajuda ou de um novo link?', progress: 'Progresso do envio',
      ready: 'Você pode enviar até {n} arquivo(s) com este link. Cada espaço pode ser usado uma vez; para substituir uma gravação, peça outro link.',
      invalid: 'Este link é inválido. Abra o link completo do e-mail ou peça um novo a suporte@kinfm.com.',
      select: 'Escolha pelo menos um arquivo de áudio.', count: 'Restam {n} espaços para envio. Escolha menos arquivos.',
      file: 'Cada arquivo deve ser um áudio M4A, MP3, OGG, OPUS, WAV ou AAC, não estar vazio e ter até 200 MB.',
      uploading: 'Enviando arquivo {n} de {total}… Mantenha esta página aberta. A barra será preenchida quando o envio for confirmado.',
      done: 'Gravação recebida. {n} arquivo(s) enviado(s). Sua amostra chegará por e-mail em até 7 dias após recebermos sua gravação.',
      error: 'Não conseguimos confirmar este envio. {n} arquivo(s) confirmado(s). Verifique sua conexão. Se o link venceu ou o problema continuar, escreva para soporte@kinfm.com; não reenvie os arquivos já confirmados.'
    },
    it: {
      loading: "Verifica del link…", unavailable: "Questo link è scaduto o non ha più caricamenti disponibili. Rispondi al messaggio per chiedere un nuovo link.",
      language: 'Lingua', eyebrow: 'L’assaggio gratuito della tua famiglia', title: 'Invia la tua registrazione',
      intro: 'Una storia, con la sua voce. Scegli l’audio che avete registrato per l’assaggio di KinFM.',
      consentTitle: 'Prima di caricarla', consent: 'All’inizio, il nonno o la nonna dice il proprio nome e che acconsente all’uso della registrazione da parte di KinFM per il suo assaggio.',
      privacy: 'Condividi questo link privato solo con la tua famiglia. Se non prosegui, eliminiamo la registrazione e l’assaggio entro 30 giorni.',
      choose: 'Scegli i file audio', limits: 'M4A, MP3, OGG, OPUS, WAV o AAC · Fino a 200 MB per file.',
      send: 'Carica la registrazione', help: 'Ti serve aiuto o un nuovo link?', progress: 'Avanzamento del caricamento',
      ready: 'Con questo link puoi caricare fino a {n} file. Ogni spazio si usa una sola volta; per sostituire una registrazione, richiedi un altro link.',
      invalid: 'Questo link non è valido. Apri il link completo dell’email o richiedine uno nuovo a soporte@kinfm.com.',
      select: 'Scegli almeno un file audio.', count: 'Puoi caricare ancora {n} file. Scegline meno.',
      file: 'Ogni file deve essere un audio M4A, MP3, OGG, OPUS, WAV o AAC, non essere vuoto e pesare al massimo 200 MB.',
      uploading: 'Caricamento del file {n} di {total}… Tieni aperta questa pagina. La barra si riempirà quando il caricamento sarà confermato.',
      done: 'Registrazione ricevuta. {n} file caricati. Riceverai l’assaggio via email entro 7 giorni dalla ricezione della registrazione.',
      error: 'Non abbiamo potuto confermare questo caricamento. {n} file confermati. Controlla la connessione. Se il link è scaduto o il problema persiste, scrivi a soporte@kinfm.com; non inviare di nuovo i file già confermati.'
    },
    fr: {
      loading: "Vérification de votre lien…", unavailable: "Ce lien a expiré ou ne permet plus d’envois. Répondez au message pour demander un nouveau lien.",
      language: 'Langue', eyebrow: 'L’extrait gratuit de votre famille', title: 'Envoyez votre enregistrement',
      intro: 'Une histoire, avec sa propre voix. Choisissez l’audio enregistré pour votre extrait KinFM.',
      consentTitle: 'Avant l’envoi', consent: 'Au début, le grand-père ou la grand-mère dit son nom et accepte que KinFM utilise l’enregistrement pour son extrait.',
      privacy: 'Partagez ce lien privé uniquement avec votre famille. Si vous ne poursuivez pas, nous supprimons l’enregistrement et l’extrait sous 30 jours.',
      choose: 'Choisissez les fichiers audio', limits: 'M4A, MP3, OGG, OPUS, WAV ou AAC · Jusqu’à 200 Mo par fichier.',
      send: 'Envoyer l’enregistrement', help: 'Besoin d’aide ou d’un nouveau lien ?', progress: 'Progression de l’envoi',
      ready: 'Vous pouvez envoyer jusqu’à {n} fichier(s) avec ce lien. Chaque emplacement ne sert qu’une fois ; pour remplacer un enregistrement, demandez un autre lien.',
      invalid: 'Ce lien n’est pas valide. Ouvrez le lien complet reçu par email ou demandez-en un nouveau à soporte@kinfm.com.',
      select: 'Choisissez au moins un fichier audio.', count: 'Vous pouvez encore envoyer {n} fichier(s). Choisissez-en moins.',
      file: 'Chaque fichier doit être un audio M4A, MP3, OGG, OPUS, WAV ou AAC, ne pas être vide et ne pas dépasser 200 Mo.',
      uploading: 'Envoi du fichier {n} sur {total}… Gardez cette page ouverte. La barre se remplira une fois l’envoi confirmé.',
      done: 'Enregistrement reçu. {n} fichier(s) envoyé(s). Votre extrait arrivera par email sous 7 jours après réception de votre enregistrement.',
      error: 'Nous n’avons pas pu confirmer cet envoi. {n} fichier(s) confirmé(s). Vérifiez votre connexion. Si le lien a expiré ou si le problème persiste, écrivez à soporte@kinfm.com ; ne renvoyez pas les fichiers déjà confirmés.'
    },
    de: {
      loading: "Dein Link wird geprüft…", unavailable: "Dieser Link ist abgelaufen oder erlaubt keine weiteren Uploads. Antworte auf die Nachricht und bitte um einen neuen Link.",
      language: 'Sprache', eyebrow: 'Die kostenlose Hörprobe deiner Familie', title: 'Lade deine Aufnahme hoch',
      intro: 'Eine Geschichte, mit der eigenen Stimme. Wähle die Aufnahme für eure KinFM-Hörprobe aus.',
      consentTitle: 'Vor dem Hochladen', consent: 'Am Anfang nennt dein Großvater oder deine Großmutter den eigenen Namen und stimmt zu, dass KinFM die Aufnahme für die Hörprobe verwendet.',
      privacy: 'Teile diesen privaten Link nur mit deiner Familie. Wenn du nicht weitermachst, löschen wir die Aufnahme und die Hörprobe innerhalb von 30 Tagen.',
      choose: 'Audiodateien auswählen', limits: 'M4A, MP3, OGG, OPUS, WAV oder AAC · Bis zu 200 MB pro Datei.',
      send: 'Aufnahme hochladen', help: 'Brauchst du Hilfe oder einen neuen Link?', progress: 'Fortschritt beim Hochladen',
      ready: 'Mit diesem Link kannst du bis zu {n} Datei(en) hochladen. Jeder Platz ist einmal nutzbar; bitte um einen neuen Link, wenn du eine Aufnahme ersetzen möchtest.',
      invalid: 'Dieser Link ist ungültig. Öffne den vollständigen Link aus der E-Mail oder bitte soporte@kinfm.com um einen neuen.',
      select: 'Wähle mindestens eine Audiodatei aus.', count: 'Du kannst noch {n} Datei(en) hochladen. Wähle weniger Dateien aus.',
      file: 'Jede Datei muss eine nicht leere M4A-, MP3-, OGG-, OPUS-, WAV- oder AAC-Audiodatei sein und darf höchstens 200 MB groß sein.',
      uploading: 'Datei {n} von {total} wird hochgeladen… Lass diese Seite geöffnet. Der Balken füllt sich, sobald das Hochladen bestätigt wurde.',
      done: 'Aufnahme erhalten. {n} Datei(en) hochgeladen. Deine Hörprobe kommt innerhalb von 7 Tagen nach Eingang deiner Aufnahme per E-Mail.',
      error: 'Wir konnten diesen Upload nicht bestätigen. {n} Datei(en) bestätigt. Prüfe deine Verbindung. Wenn der Link abgelaufen ist oder das Problem bestehen bleibt, schreib an soporte@kinfm.com; sende bereits bestätigte Dateien nicht erneut.'
    }
  };

  function language(query, preferred) {
    const requested = new URLSearchParams(query).get('lang');
    for (const candidate of [requested, ...(preferred || []), 'en']) {
      const code = String(candidate || '').toLowerCase().split(/[-_]/)[0];
      if (Object.hasOwn(TEXT, code)) return code;
    }
    return 'en';
  }

  function parseLinks(hash, ranged = false) {
    if (!hash || hash.length > 200000) throw new Error('invalid');
    const values = JSON.parse(decodeURIComponent(hash.slice(1)));
    if (!Array.isArray(values) || !values.length || values.length > 20) throw new Error('invalid');
    const seen = new Set();
    return values.map(value => {
      if (typeof value !== 'string' || value.length > 10000) throw new Error('invalid');
      const url = new URL(value);
      const prefix = '/kinfm-radiofamilia-muestras/muestras/';
      if (url.protocol !== 'https:' || url.hostname !== 'storage.googleapis.com' || url.port ||
          url.username || url.password || url.hash || !url.pathname.startsWith(prefix)) throw new Error('invalid');
      const parts = url.pathname.slice(prefix.length).split('/');
      if (parts.length !== 2 || parts.some(p => !/^[A-Za-z0-9_-][A-Za-z0-9_.-]*$/.test(p))) throw new Error('invalid');
      // Reject aliases/normalization as well as duplicate object targets, even with different signatures.
      if (!value.startsWith('https://storage.googleapis.com' + prefix) || value.includes('\\') ||
          /\/(?:\.|%2e)/i.test(value.split('?')[0]) || seen.has(url.pathname)) throw new Error('invalid');
      seen.add(url.pathname);
      const signed = url.searchParams;
      if (signed.get('X-Goog-Algorithm') !== 'GOOG4-RSA-SHA256' ||
          !signed.get('X-Goog-Credential') || !signed.get('X-Goog-Signature') ||
          !/^\d{8}T\d{6}Z$/.test(signed.get('X-Goog-Date') || '') ||
          !/^\d+$/.test(signed.get('X-Goog-Expires') || '') ||
          Number(signed.get('X-Goog-Expires')) < 1 || Number(signed.get('X-Goog-Expires')) > 604800 ||
          signed.get('X-Goog-SignedHeaders') !== (ranged ? 'host;x-goog-content-length-range' : 'host') ||
          (ranged && signed.get('X-Goog-Expires') !== '900')) throw new Error('invalid');
      return value;
    });
  }

  function validateFiles(files, available) {
    if (!files.length) return 'select';
    if (files.length > available) return 'count';
    if (files.some(file => !/\.(m4a|mp3|ogg|opus|wav|aac)$/i.test(file.name) ||
        !Number.isFinite(file.size) || file.size < 1 || file.size > MAX_BYTES)) return 'file';
    return null;
  }

  function mount(doc, win) {
    // Opening another private link in an already-open uploader is a same-document
    // navigation. Reload to consume its fragment with a fresh quota check.
    if (win.addEventListener) win.addEventListener('hashchange', () => {
      if (win.location.hash) win.location.reload();
    });
    const code = /^#[A-Za-z0-9]{10}$/.test(win.location.hash) ? win.location.hash.slice(1) : null;
    const api = win.KINFM_UPLOAD_CONFIG && win.KINFM_UPLOAD_CONFIG.api;
    let urls = [];
    try { urls = parseLinks(win.location.hash); } catch (_) { /* Never echo credentials or parser errors. */ }
    // Fragments never reach the server. Remove the capability from the address bar/history too.
    try { win.history.replaceState(null, '', win.location.pathname + win.location.search); } catch (_) { /* Local previews may restrict history. */ }
    let lang = language(win.location.search, win.navigator.languages || [win.navigator.language]);
    let available = urls.length;
    let cursor = 0, busy = false, status = code ? 'loading' : (urls.length ? 'ready' : 'invalid'), statusValues = { n: available };
    const el = id => doc.getElementById(id);
    function message(key, values) {
      return TEXT[lang][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name]));
    }
    function render() {
      doc.documentElement.lang = lang;
      doc.title = TEXT[lang].title + ' — KinFM';
      doc.querySelectorAll('[data-copy]').forEach(node => { node.textContent = TEXT[lang][node.dataset.copy]; });
      el('language').value = lang;
      el('language').setAttribute('aria-label', TEXT[lang].language);
      el('progress').setAttribute('aria-label', TEXT[lang].progress);
      el('status').textContent = message(status, statusValues);
      el('recording').disabled = busy || available <= 0;
      el('send').disabled = busy || available <= 0;
    }
    function show(key, values = {}) { status = key; statusValues = values; render(); }
    el('language').addEventListener('change', event => { lang = event.target.value; render(); });
    el('upload-form').addEventListener('submit', async event => {
      event.preventDefault();
      if (busy || available <= 0) return;
      const files = Array.from(el('recording').files);
      const invalid = validateFiles(files, available);
      if (invalid) { show(invalid, { n: available }); return; }
      busy = true;
      const progress = el('progress');
      progress.hidden = false;
      // fetch has no upload-progress events. Indeterminate is honest until GCS confirms receipt.
      progress.removeAttribute('value');
      try {
        for (let i = 0; i < files.length; i += 1) {
          show('uploading', { n: i + 1, total: files.length });
          let target = urls[cursor];
          const headers = { 'Content-Type': 'application/octet-stream' };
          if (code) {
            const signed = await win.fetch(api + '/firmar', {
              method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'error',
              referrerPolicy: 'no-referrer', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 'código': code })
            });
            if ([404, 409].includes(signed.status)) throw new Error('unavailable');
            if (!signed.ok) throw new Error('network');
            const data = await signed.json();
            if (data.vence_en !== 900 || !data.headers || data.headers['x-goog-content-length-range'] !== '0,209715200') throw new Error('network');
            target = parseLinks('#' + encodeURIComponent(JSON.stringify([data.url])), true)[0];
            headers['x-goog-content-length-range'] = '0,209715200';
          }
          const response = await win.fetch(target, {
            method: 'PUT', body: files[i], mode: 'cors', credentials: 'omit',
            redirect: 'error', referrerPolicy: 'no-referrer',
            headers
          });
          if (!response.ok) throw new Error('upload');
          // Consume successful slots in memory; never retry or overwrite them automatically.
          if (!code) urls[cursor] = null;
          cursor += 1;
          available -= 1;
        }
        progress.value = 100;
        show('done', { n: cursor });
      } catch (error) {
        progress.hidden = true;
        if (error.message === 'unavailable') { available = 0; show('unavailable'); }
        else show('error', { n: cursor });
      } finally {
        busy = false;
        el('recording').value = '';
        render();
      }
    });
    render();
    if (code) {
      // Capability lives in memory only. No filename or media content is sent to this API.
      return (async () => {
        try {
          if (!/^https:\/\/[a-z0-9.-]+\.run\.app$/.test(api || '')) throw new Error('network');
          const response = await win.fetch(api + '/c/' + code, {
            mode: 'cors', credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer'
          });
          if (response.status === 404) { show('unavailable'); return; }
          if (!response.ok) throw new Error('network');
          const data = await response.json();
          if (!Object.hasOwn(TEXT, data.lang) || !Number.isInteger(data.restantes) || data.restantes < 0 || data.restantes > 20) throw new Error('network');
          lang = language(win.location.search, [data.lang]);
          available = data.restantes;
          show(available ? 'ready' : 'unavailable', { n: available });
        } catch (_) { show('error', { n: cursor }); }
      })();
    }
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { MAX_BYTES, TEXT, language, parseLinks, validateFiles, mount };
  if (global.document) mount(global.document, global);
})(typeof window !== 'undefined' ? window : globalThis);
