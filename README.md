# 🎮 Game Dev Freelancer Calculator

Uma **calculadora estática para freelancers de desenvolvimento de jogos**, criada para ajudar a **precificar serviços de forma justa e profissional**, com geração de **orçamento em PDF** e **histórico persistente no navegador**.

Ideal para programadores, game designers, level designers, VFX artists, UI/UX e outros profissionais da área de games.

---

## ✨ Funcionalidades

* 💰 Cálculo de preço baseado em:

  * Tipo de serviço
  * Nível profissional
  * Horas estimadas
  * Custos extras (%)
* 🧾 Geração de **orçamento profissional**
* 📄 Exportação do orçamento em **PDF**
* 🧠 Histórico de cálculos salvo no **LocalStorage**
* 👤 Histórico organizado por **nome do cliente**
* 🔄 Persistência dos dados mesmo após recarregar a página
* ⚡ 100% Front-end (sem backend)

---

## 🖥️ Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* LocalStorage
* jsPDF (exportação de PDF)

---

## 📂 Estrutura do Projeto

```
calculadora/
│
├── index.html        # Página principal
├── script.js         # Lógica da aplicação
├── data.json         # Configurações de serviços e níveis
└── README.md
```

---

## 🚀 Como Usar

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/game-dev-freelancer-calculator.git
```

### 2️⃣ Execute em um servidor local

> ⚠️ O projeto utiliza `fetch`, portanto é necessário rodar em um servidor HTTP.

Opções recomendadas:

* **Live Server** (VS Code)
* Servidor HTTP simples

Exemplo usando VS Code:

```bash
Clique com o botão direito no index.html → "Open with Live Server"
```

### 3️⃣ Preencha os dados

* Nome do cliente
* Tipo de serviço
* Nível profissional
* Horas estimadas
* Custos extras

### 4️⃣ Gere o orçamento

1. Clique em **Calcular**
2. Clique em **Gerar Orçamento**
3. Clique em **Exportar PDF**

---

## 📄 Orçamento em PDF

O PDF gerado inclui:

* Nome do cliente
* Serviço contratado
* Nível profissional
* Horas estimadas
* Valor total
* Data
* Texto de validade do orçamento

📌 O nome do arquivo é gerado automaticamente com base no nome do cliente.

---

## 🧠 Histórico de Cálculos

* Os cálculos são salvos automaticamente
* O histórico permanece após fechar o navegador
* Cada item pode ser removido individualmente

> Os dados são armazenados localmente usando `LocalStorage`.

---

## 🛠️ Customização

### 📦 Serviços e valores

Arquivo: `data.json`

```json
{
  "services": [
    {
      "name": "Programação",
      "baseRate": 80
    }
  ]
}
```

### 📊 Níveis profissionais

```json
{
  "levels": [
    {
      "name": "Pleno",
      "multiplier": 1.4
    }
  ]
}
```

---

## 📌 Próximas Evoluções (Ideias)

* 📊 Dashboard financeiro
* 🧾 Numeração automática de orçamentos
* ✍️ Campo de observações personalizadas
* 🌍 Versão em inglês
* 📤 Envio automático de PDF por e-mail
* 🏷️ Branding com logo e dados da empresa
* ☁️ Versão SaaS com login

---

## 📜 Licença

Este projeto é livre para uso pessoal e profissional.

Você pode:

* Usar
* Modificar
* Melhorar
* Criar forks

---

## 👨‍💻 Autor

Desenvolvido por **Luiz Ricardo Fuly Silva**
🎮 Game Developer | Freelancer

Se este projeto te ajudou, deixe uma ⭐ no repositório!
