const stats = [
  { label: 'Open tickets', value: '184', delta: '+12.4%', tone: 'good' },
  { label: 'SLA compliance', value: '96.8%', delta: '+3.1%', tone: 'good' },
  { label: 'AI auto-resolution', value: '41%', delta: '+9.2%', tone: 'warn' },
  { label: 'Escalations', value: '17', delta: '-6.3%', tone: 'bad' }
];

const tickets = [
  {
    id: 'SR-1048',
    title: 'API latency spike on order service',
    priority: 'high',
    client: 'Northwind Retail',
    note: 'Regional slowdown reported for US customers affecting checkout completion rate.'
  },
  {
    id: 'SR-1092',
    title: 'User access review for finance portal',
    priority: 'medium',
    client: 'Nova Finance',
    note: 'Access anomalies detected in quarterly compliance sampling.'
  },
  {
    id: 'SR-1114',
    title: 'Billing data mismatch in reporting dashboard',
    priority: 'low',
    client: 'Vertex Logistics',
    note: 'User-facing discrepancy due to delayed nightly batch synchronization.'
  },
  {
    id: 'SR-1127',
    title: 'Security patch validation for workflow app',
    priority: 'high',
    client: 'Borealis Energy',
    note: 'Urgent follow-up required for a vulnerability advisory affecting production systems.'
  }
];

function renderStats() {
  const container = document.getElementById('statsGrid');
  container.innerHTML = stats
    .map(
      (item) => `
        <article class="stat-card">
          <p class="eyebrow">${item.label}</p>
          <div class="value">${item.value}</div>
          <span class="delta ${item.tone}">${item.delta}</span>
        </article>
      `
    )
    .join('');
}

function renderTickets(filter = 'all') {
  const list = document.getElementById('serviceList');
  const filtered = filter === 'all' ? tickets : tickets.filter((ticket) => ticket.priority === filter);

  list.innerHTML = filtered
    .map(
      (ticket) => `
        <article class="ticket-item ${ticket.priority}">
          <div class="ticket-meta">
            <strong>${ticket.id}</strong>
            <span class="tag ${ticket.priority}">${ticket.priority}</span>
          </div>
          <h4>${ticket.title}</h4>
          <p><strong>${ticket.client}</strong></p>
          <p>${ticket.note}</p>
        </article>
      `
    )
    .join('');
}

function bindFilters() {
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
      renderTickets(chip.dataset.filter);
    });
  });
}

function bindAI() {
  const askBtn = document.getElementById('askBtn');
  const input = document.getElementById('promptInput');
  const conversation = document.getElementById('conversation');

  askBtn.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'bubble user';
    userBubble.innerHTML = `<strong>Client:</strong> ${value}`;
    conversation.appendChild(userBubble);

    const aiBubble = document.createElement('div');
    aiBubble.className = 'bubble bot';

    const reply = value.toLowerCase().includes('sla')
      ? 'SLA risk is moderate. Prioritize the affected region and share a proactive mitigation note with the client within 15 minutes.'
      : value.toLowerCase().includes('security')
        ? 'Security controls are healthy, but the patch validation queue needs attention before the next deploy window.'
        : 'Based on the current monitoring signals, the highest-priority action is to validate dependency health and communicate a customer update with a resolution timeline.';

    aiBubble.innerHTML = `<strong>AI:</strong> ${reply}`;
    conversation.appendChild(aiBubble);
    input.value = '';
    conversation.scrollTop = conversation.scrollHeight;
  });
}

function bindForm() {
  const form = document.getElementById('ticketForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    button.textContent = 'Request submitted';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = 'Submit request';
      button.disabled = false;
    }, 1800);
  });
}

renderStats();
renderTickets();
bindFilters();
bindAI();
bindForm();
