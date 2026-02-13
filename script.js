let configData = null;
let lastCalculation = null;

const STORAGE_KEY = "freelancerCalculatorHistory";

async function loadData() {
  try {
    const response = await fetch("data/data.json");
    configData = await response.json();

    populateServices();
    populateLevels();
    setDefaultExtra();
    renderHistory();

  } catch (error) {
    console.error("Erro ao carregar JSON:", error);
  }
}

function populateServices() {
  const serviceSelect = document.getElementById("service");

  configData.services.forEach(service => {
    const option = document.createElement("option");
    option.value = service.baseRate;
    option.dataset.name = service.name;
    option.textContent = `${service.name} (R$ ${service.baseRate}/h)`;
    serviceSelect.appendChild(option);
  });
}

function populateLevels() {
  const levelSelect = document.getElementById("level");

  configData.levels.forEach(level => {
    const option = document.createElement("option");
    option.value = level.multiplier;
    option.dataset.name = level.name;
    option.textContent = level.name;
    levelSelect.appendChild(option);
  });
}

function setDefaultExtra() {
  document.getElementById("extra").value =
    configData.defaultExtraPercentage;
}

function calculate() {
  const clientName = document.getElementById("clientName").value.trim();
  if (!clientName) {
    alert("Digite o nome do cliente.");
    return;
  }

  const serviceSelect = document.getElementById("service");
  const levelSelect = document.getElementById("level");

  const valorHora = parseFloat(serviceSelect.value);
  const nivel = parseFloat(levelSelect.value);
  const horas = parseFloat(document.getElementById("hours").value);
  const extra = parseFloat(document.getElementById("extra").value) / 100;

  const base = valorHora * horas * nivel;
  const final = base * (1 + extra);

  const min = final * configData.safeRange.minMultiplier;
  const ideal = final * configData.safeRange.maxMultiplier;

  const result = document.getElementById("result");
  result.style.display = "block";
  result.innerHTML = `
    <p><strong>Valor Base:</strong> R$ ${base.toFixed(2)}</p>
    <p><strong>Valor Recomendado:</strong> R$ ${final.toFixed(2)}</p>
    <p><strong>Faixa Segura:</strong> R$ ${min.toFixed(2)} – R$ ${ideal.toFixed(2)}</p>
  `;

  lastCalculation = {
    clientName,
    service: serviceSelect.options[serviceSelect.selectedIndex].dataset.name,
    level: levelSelect.options[levelSelect.selectedIndex].dataset.name,
    hours: horas,
    finalValue: final,
    date: new Date()
 };

document.getElementById("budgetBtn").disabled = false;

  saveToHistory({
    clientName,
    service: serviceSelect.options[serviceSelect.selectedIndex].dataset.name,
    level: levelSelect.options[levelSelect.selectedIndex].dataset.name,
    hours: horas,
    finalValue: final,
    date: new Date().toISOString()
  });
}

function generateBudget() {
  if (!lastCalculation) return;

  const b = lastCalculation;
  const budgetDiv = document.getElementById("budget");

  budgetDiv.style.display = "block";
  budgetDiv.innerHTML = `
    <div style="
      background:#020617;
      border:1px solid #1e293b;
      padding:20px;
      border-radius:10px;
    ">
      <h2 style="text-align:center;">📄 Orçamento de Serviço</h2>

      <p><strong>Cliente:</strong> ${b.clientName}</p>
      <p><strong>Serviço:</strong> ${b.service}</p>
      <p><strong>Nível Profissional:</strong> ${b.level}</p>
      <p><strong>Horas Estimadas:</strong> ${b.hours}h</p>

      <hr style="margin:15px 0;">

      <p style="font-size:18px;">
        <strong>Valor Total:</strong> R$ ${b.finalValue.toFixed(2)}
      </p>

      <hr style="margin:15px 0;">

      <p><strong>Data:</strong> ${b.date.toLocaleDateString()}</p>

      <p style="font-size:12px; color:#94a3b8; margin-top:15px;">
        Este orçamento é válido por 7 dias e pode sofrer alterações
        conforme mudanças no escopo do projeto.
      </p>
    </div>
  `;

  document.getElementById("pdfBtn").disabled = false;
}

function exportBudgetPDF() {
  if (!lastCalculation) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const b = lastCalculation;

  let y = 20;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ORÇAMENTO DE SERVIÇO", 105, y, { align: "center" });

  y += 15;

  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");

  doc.text(`Cliente: ${b.clientName}`, 20, y); y += 8;
  doc.text(`Serviço: ${b.service}`, 20, y); y += 8;
  doc.text(`Nível Profissional: ${b.level}`, 20, y); y += 8;
  doc.text(`Horas Estimadas: ${b.hours}h`, 20, y); y += 12;

  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);
  y += 10;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Valor Total: R$ ${b.finalValue.toFixed(2)}`, 20, y);

  y += 15;

  doc.setFontSize(11);
  doc.setFont("Helvetica", "normal");
  doc.text(
    "Este orçamento é válido por 7 dias e pode sofrer alterações\ncaso o escopo do projeto seja modificado.",
    20,
    y
  );

  y += 20;

  doc.text(`Data: ${b.date.toLocaleDateString()}`, 20, y);

  const fileName =
    `orcamento_${b.clientName.replace(/\s+/g, "_").toLowerCase()}.pdf`;

  doc.save(fileName);
}


document
  .getElementById("pdfBtn")
  .addEventListener("click", exportBudgetPDF);


function getHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveToHistory(entry) {
  const history = getHistory();
  history.unshift(entry); // adiciona no topo
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const historyDiv = document.getElementById("history");
  const history = getHistory();

  if (history.length === 0) {
    historyDiv.innerHTML = "<p>Nenhum cálculo salvo.</p>";
    return;
  }

  historyDiv.innerHTML = history.map((item, index) => `
    <div style="background:#0f172a; padding:10px; margin-top:10px; border-radius:6px;">
      <strong>${item.clientName}</strong><br>
      ${item.service} - ${item.level}<br>
      ${item.hours}h<br>
      💰 R$ ${item.finalValue.toFixed(2)}<br>
      <small>${new Date(item.date).toLocaleString()}</small><br>
      <button onclick="removeHistory(${index})" style="margin-top:5px; background:#dc2626; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">
        Remover
      </button>
    </div>
  `).join("");
}

function removeHistory(index) {
  const history = getHistory();
  history.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  renderHistory();
}

document.getElementById("calculateBtn")
  .addEventListener("click", calculate);

loadData();

document
  .getElementById("budgetBtn")
  .addEventListener("click", generateBudget);

