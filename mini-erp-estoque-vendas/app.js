const STORAGE_KEY = "miniErpDataV1";

const demoData = {
  clients: [
    { id: 1, name: "Mercado Central", email: "compras@mercadocentral.com", phone: "(11) 98888-1000" },
    { id: 2, name: "Padaria Avenida", email: "contato@padariaavenida.com", phone: "(11) 97777-2000" }
  ],
  products: [
    { id: 1, name: "Café 500 g", price: 18.9, stock: 18 },
    { id: 2, name: "Açúcar 1 kg", price: 6.5, stock: 7 },
    { id: 3, name: "Leite 1 L", price: 5.8, stock: 3 }
  ],
  sales: []
};

let data = loadData();

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : structuredClone(demoData);
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function nextId(items) {
  return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
}

function render() {
  renderMetrics();
  renderClients();
  renderProducts();
  renderSaleOptions();
  renderSales();
  renderStock();
}

function renderMetrics() {
  document.querySelector("#metric-clients").textContent = data.clients.length;
  document.querySelector("#metric-products").textContent = data.products.length;
  document.querySelector("#metric-sales").textContent = data.sales.length;
  const revenue = data.sales.reduce((sum, sale) => sum + sale.total, 0);
  document.querySelector("#metric-revenue").textContent = money(revenue);
}

function renderClients() {
  const body = document.querySelector("#clients-table");
  body.innerHTML = data.clients.length
    ? data.clients.map(c => `<tr><td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td></tr>`).join("")
    : '<tr><td colspan="3" class="empty">Nenhum cliente cadastrado.</td></tr>';
}

function renderProducts() {
  const body = document.querySelector("#products-table");
  body.innerHTML = data.products.length
    ? data.products.map(p => `<tr><td>${p.name}</td><td>${money(p.price)}</td><td>${p.stock}</td></tr>`).join("")
    : '<tr><td colspan="3" class="empty">Nenhum produto cadastrado.</td></tr>';
}

function renderSaleOptions() {
  const clientSelect = document.querySelector("#sale-client");
  const productSelect = document.querySelector("#sale-product");
  clientSelect.innerHTML = '<option value="">Selecione</option>' +
    data.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  productSelect.innerHTML = '<option value="">Selecione</option>' +
    data.products.map(p => `<option value="${p.id}">${p.name} — estoque: ${p.stock}</option>`).join("");
}

function renderSales() {
  const body = document.querySelector("#sales-table");
  body.innerHTML = data.sales.length
    ? [...data.sales].reverse().map(s => `<tr>
        <td>${s.date}</td><td>${s.clientName}</td><td>${s.productName}</td>
        <td>${s.qty}</td><td>${money(s.total)}</td>
      </tr>`).join("")
    : '<tr><td colspan="5" class="empty">Nenhuma venda registrada.</td></tr>';
}

function renderStock() {
  const body = document.querySelector("#stock-table");
  body.innerHTML = data.products.length
    ? data.products.map(p => {
        const status = p.stock === 0 ? ["Sem estoque", "out"] : p.stock <= 5 ? ["Estoque baixo", "low"] : ["Disponível", "ok"];
        return `<tr><td>${p.name}</td><td>${p.stock}</td><td><span class="badge ${status[1]}">${status[0]}</span></td></tr>`;
      }).join("")
    : '<tr><td colspan="3" class="empty">Nenhum produto cadastrado.</td></tr>';
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(panel => panel.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector("#" + tab.dataset.target).classList.add("active");
  });
});

document.querySelector("#client-form").addEventListener("submit", event => {
  event.preventDefault();
  data.clients.push({
    id: nextId(data.clients),
    name: document.querySelector("#client-name").value.trim(),
    email: document.querySelector("#client-email").value.trim(),
    phone: document.querySelector("#client-phone").value.trim()
  });
  saveData();
  event.target.reset();
  render();
});

document.querySelector("#product-form").addEventListener("submit", event => {
  event.preventDefault();
  data.products.push({
    id: nextId(data.products),
    name: document.querySelector("#product-name").value.trim(),
    price: Number(document.querySelector("#product-price").value),
    stock: Number(document.querySelector("#product-stock").value)
  });
  saveData();
  event.target.reset();
  render();
});

document.querySelector("#sale-form").addEventListener("submit", event => {
  event.preventDefault();
  const message = document.querySelector("#sale-message");
  const client = data.clients.find(c => c.id === Number(document.querySelector("#sale-client").value));
  const product = data.products.find(p => p.id === Number(document.querySelector("#sale-product").value));
  const qty = Number(document.querySelector("#sale-qty").value);

  if (!client || !product || qty < 1) {
    message.textContent = "Preencha os dados da venda.";
    message.className = "message error";
    return;
  }
  if (product.stock < qty) {
    message.textContent = "Estoque insuficiente para esta venda.";
    message.className = "message error";
    return;
  }

  product.stock -= qty;
  data.sales.push({
    id: nextId(data.sales),
    date: new Date().toLocaleDateString("pt-BR"),
    clientName: client.name,
    productName: product.name,
    qty,
    total: product.price * qty
  });
  saveData();
  event.target.reset();
  document.querySelector("#sale-qty").value = 1;
  message.textContent = "Venda registrada e estoque atualizado.";
  message.className = "message";
  render();
});

document.querySelector("#reset-demo").addEventListener("click", () => {
  data = structuredClone(demoData);
  saveData();
  document.querySelector("#sale-message").textContent = "";
  render();
});

render();