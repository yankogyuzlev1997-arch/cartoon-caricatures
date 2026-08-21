const ECONT_DELIVERY = 5.6;
const BASE_PRICES = { A4: 65, A3: 110, A2: 190 };

function selectedOrderOptions(form) {
  const selectedSize = form.querySelector('input[name="size-choice"]:checked');
  const facesInput = form.querySelector("#faces");
  const size = selectedSize?.value || "A4";
  const faces = Math.max(1, Math.min(20, Number.parseInt(facesInput?.value || "1", 10) || 1));
  const artwork = (BASE_PRICES[size] || BASE_PRICES.A4) + Math.max(0, faces - 1) * 12;
  return { size, faces, artwork, total: artwork + ECONT_DELIVERY };
}

function euro(value) {
  return new Intl.NumberFormat("bg-BG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function refreshOrderSummary(form) {
  const { size, faces, artwork, total } = selectedOrderOptions(form);

  form.querySelectorAll(".size-options label").forEach((label) => {
    const input = label.querySelector('input[name="size-choice"]');
    const chosen = input?.value === size;
    label.classList.toggle("selected", chosen);
    let mark = label.querySelector(".selected-mark");
    if (chosen && !mark) {
      mark = document.createElement("b");
      mark.className = "selected-mark";
      mark.textContent = "✓ Избран";
      label.append(mark);
    }
    if (!chosen) mark?.remove();
  });

  let summary = form.querySelector(".selection-summary");
  if (!summary) {
    summary = document.createElement("div");
    summary.className = "selection-summary";
    summary.setAttribute("aria-live", "polite");
    form.querySelector(".faces-row")?.after(summary);
  }
  summary.innerHTML = `
    <span><small>Избран размер</small><strong>✓ ${size}</strong></span>
    <span><small>Брой лица</small><strong>✓ ${faces}</strong></span>
    <span><small>Карикатура</small><strong>${euro(artwork)} €</strong></span>`;

  const totalBox = form.querySelector(".order-total");
  if (totalBox) {
    totalBox.innerHTML = `
      <div class="order-breakdown">
        <div><span>Карикатура · ${size} · ${faces} ${faces === 1 ? "лице" : "лица"}</span><strong>${euro(artwork)} €</strong></div>
        <div><span>Доставка с Еконт</span><strong>${euro(ECONT_DELIVERY)} €</strong></div>
        <div class="order-grand-total"><span>Общо с доставка</span><strong>${euro(total)} €</strong></div>
      </div>
      <small>Рамката и всички допълнителни детайли са включени в цената.</small>`;
  }

  const codNote = form.querySelector(".cod-note");
  if (codNote) {
    codNote.innerHTML = `<span>🚚</span><div><strong>Еконт · 5,60 € · плащане с наложен платеж</strong><small>Не въвеждаш карта. Плащаш на куриера при получаване.</small></div>`;
  }
}

function enhanceOrderForm() {
  const form = document.querySelector("#order form");
  if (!(form instanceof HTMLFormElement)) return;

  const phone = form.querySelector('input[name="phone"]');
  if (phone instanceof HTMLInputElement) {
    if (!phone.value.trim()) phone.value = "+359 ";
    phone.placeholder = "+359 88 123 4567";
    phone.pattern = "(?:\\+359|0)[0-9\\s]{8,}";
    phone.title = "Въведи валиден български телефон, например +359 88 123 4567";
  }

  if (!document.getElementById("order-enhancement-styles")) {
    const style = document.createElement("style");
    style.id = "order-enhancement-styles";
    style.textContent = `
      .size-options .selected-mark{grid-column:1/3;justify-self:start;margin-top:10px;padding:4px 8px;border-radius:999px;background:#2497c9;color:#fff;font-size:9px;letter-spacing:.03em}
      .selection-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:18px}.selection-summary>span{display:flex;flex-direction:column;gap:5px;padding:11px 12px;border:1px solid #c9e9f5;border-radius:8px;background:#f3fbfe}.selection-summary small{color:#6c8393;font-size:9px}.selection-summary strong{color:#17324a;font-size:12px}
      .order-total{display:block;background:#e9f8fe;padding:18px;border-radius:9px}.order-breakdown{display:flex;flex-direction:column;gap:10px}.order-breakdown>div{display:flex;align-items:center;justify-content:space-between;gap:15px}.order-breakdown span{color:#17324a;font-size:11px;font-weight:800}.order-breakdown strong{color:#17324a;font-size:13px;white-space:nowrap}.order-breakdown .order-grand-total{padding-top:12px;border-top:1px solid #bddfed}.order-grand-total span{font-size:13px;font-weight:900}.order-grand-total strong{font-family:Georgia,serif;font-size:29px}.order-total>small{display:block;color:#6c8393;font-size:9px;margin-top:9px}
      @media(max-width:680px){.selection-summary{grid-template-columns:1fr 1fr}.selection-summary>span:last-child{grid-column:1/3}}
    `;
    document.head.append(style);
  }

  refreshOrderSummary(form);
  form.addEventListener("change", () => setTimeout(() => refreshOrderSummary(form), 0));
  form.addEventListener("input", (event) => {
    if (event.target?.id === "faces") refreshOrderSummary(form);
  });
  form.querySelector(".counter")?.addEventListener("click", () => setTimeout(() => refreshOrderSummary(form), 0));
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || (button.closest("form") && button.type === "submit")) return;
  const text = (button.textContent || "").trim();
  if (text.includes("Поръчай") || text.includes("Създай") || text.includes("Започни") || text.includes("Направи своята") || text.includes("Избери A")) {
    const order = document.getElementById("order");
    if (order) {
      event.preventDefault();
      event.stopPropagation();
      location.hash = "order";
      order.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}, true);

document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.closest("#order")) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (!form.reportValidity()) return;

  const button = form.querySelector("button[type=submit]");
  const oldText = button?.textContent || "";
  if (button) {
    button.disabled = true;
    button.textContent = "Изпращане...";
  }

  try {
    const options = selectedOrderOptions(form);
    const formData = new FormData(form);
    formData.set("size", options.size);
    formData.set("faces", String(options.faces));
    formData.set("total", String(options.total));
    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput?.files) Array.from(fileInput.files).forEach((file) => formData.append("photos", file));

    const response = await window.fetch("/api/orders", { method: "POST", body: formData });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.checkoutUrl) throw new Error(data.error || "Поръчката не беше подготвена.");

    const checkoutUrl = new URL(data.checkoutUrl);
    checkoutUrl.searchParams.set("checkout[shipping_address][country]", "Bulgaria");
    checkoutUrl.searchParams.set("checkout[shipping_address][country_code]", "BG");
    checkoutUrl.searchParams.set("attributes[Размер]", options.size);
    checkoutUrl.searchParams.set("attributes[Брой лица]", String(options.faces));
    checkoutUrl.searchParams.set("attributes[Доставка]", "Еконт · 5,60 €");
    window.location.assign(checkoutUrl.toString());
  } catch (error) {
    alert(error.message || "Възникна грешка. Опитайте отново.");
    if (button) {
      button.disabled = false;
      button.textContent = oldText;
    }
  }
}, true);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enhanceOrderForm, { once: true });
} else {
  enhanceOrderForm();
}
