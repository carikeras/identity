(() => {
  "use strict";

  const form = document.querySelector("#loginForm");
  const status = document.querySelector("#status");
  const button = document.querySelector("#loginButton");

  const showStatus = (message) => {
    if (!status) return;
    status.textContent = message;
    status.classList.add("is-visible");
  };

  const setLoading = (loading) => {
    if (!button) return;
    button.disabled = loading;
    button.textContent = loading ? "Memproses…" : "Masuk";
  };

  const sessionMessage = async () => {
    try {
      const response = await fetch("/api/session", {
        credentials: "include",
        headers: { "accept": "application/json" }
      });

      if (!response.ok) return;
      const data = await response.json();

      if (data?.authenticated && data?.user?.redirect_url) {
        window.location.replace(data.user.redirect_url);
      }
    } catch {
      // A disconnected API must not turn the login page into a fake success state.
    }
  };

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    setLoading(true);

    try {
      const fields = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          identifier: fields.identifier,
          password: fields.password,
          remember: document.querySelector("#remember")?.checked === true
        })
      });

      let payload = null;
      try { payload = await response.json(); } catch {}

      if (!response.ok) {
        showStatus(payload?.message || "Login belum tersedia atau kredensial tidak diterima.");
        return;
      }

      window.location.replace(payload?.redirect_url || "https://cari.cc.cd/");
    } catch {
      showStatus("Identity API belum terhubung. Halaman ini belum akan berpura-pura bahwa login berhasil.");
    } finally {
      setLoading(false);
    }
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("registered") === "1") {
    showStatus("Akun berhasil dibuat. Silakan masuk.");
  }

  sessionMessage();
})();
