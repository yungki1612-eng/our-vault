/**
 * AssetCard Web Component
 * Displays asset overview info with a title, value, and trend.
 */
class AssetCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'value', 'trend', 'type'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Title';
    const value = this.getAttribute('value') || '$0.00';
    const trend = this.getAttribute('trend') || '+0%';
    const type = this.getAttribute('type') || 'primary';
    const isPositive = trend.startsWith('+');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: white;
          padding: 1.5rem;
          border-radius: 24px;
          border: 1px solid oklch(0.9 0.02 250);
          box-shadow: 0 10px 15px -3px oklch(0 0 0 / 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          container-type: inline-size;
        }
        :host(:hover) {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px oklch(0 0 0 / 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .title {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          color: oklch(0.5 0.02 250);
          font-weight: 500;
        }
        .icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: oklch(from var(--color) l c h / 0.1);
          color: var(--color);
        }
        .value {
          font-family: 'Outfit', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: oklch(0.2 0.02 250);
          margin-bottom: 0.5rem;
        }
        .footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .trend {
          color: ${isPositive ? 'oklch(0.65 0.15 145)' : 'oklch(0.6 0.2 25)'};
          background: ${isPositive ? 'oklch(0.65 0.15 145 / 0.1)' : 'oklch(0.6 0.2 25 / 0.1)'};
          padding: 2px 6px;
          border-radius: 4px;
        }
        .period {
          color: oklch(0.5 0.02 250);
        }
        :host {
          --color: ${type === 'primary' ? 'oklch(0.55 0.25 260)' : type === 'secondary' ? 'oklch(0.45 0.2 280)' : 'oklch(0.7 0.2 160)'};
        }
      </style>
      <div class="header">
        <span class="title">${title}</span>
        <div class="icon-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      </div>
      <div class="value">${value}</div>
      <div class="footer">
        <span class="trend">${trend}</span>
        <span class="period">vs last month</span>
      </div>
    `;
  }
}
customElements.define('asset-card', AssetCard);

/**
 * TransactionList Web Component
 * Renders a list of mock recent transactions.
 */
class TransactionList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const transactions = [
      { name: 'Apple Store', category: 'Technology', date: 'Oct 24, 2023', amount: '-$1,299.00', positive: false },
      { name: 'Upwork Payment', category: 'Freelance', date: 'Oct 22, 2023', amount: '+$3,450.00', positive: true },
      { name: 'Spotify Premium', category: 'Subscription', date: 'Oct 20, 2023', amount: '-$12.99', positive: false },
      { name: 'Airbnb Refund', category: 'Travel', date: 'Oct 18, 2023', amount: '+$450.20', positive: true },
      { name: 'Starbucks Coffee', category: 'Food & Drink', date: 'Oct 15, 2023', amount: '-$5.50', positive: false }
    ];

    const listHtml = transactions.map(t => `
      <div class="transaction-item">
        <div class="avatar-box">${t.name[0]}</div>
        <div class="info">
          <span class="name">${t.name}</span>
          <span class="category">${t.category} • ${t.date}</span>
        </div>
        <div class="amount ${t.positive ? 'positive' : 'negative'}">${t.amount}</div>
      </div>
    `).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Outfit', sans-serif;
        }
        .transaction-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid oklch(0.9 0.02 250);
          gap: 1rem;
          transition: transform 0.2s ease;
        }
        .transaction-item:last-child {
          border-bottom: none;
        }
        .transaction-item:hover {
          transform: translateX(4px);
        }
        .avatar-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: oklch(0.95 0.01 250);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: oklch(0.4 0.02 250);
        }
        .info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .name {
          font-weight: 600;
          font-size: 0.95rem;
          color: oklch(0.2 0.02 250);
        }
        .category {
          font-size: 0.8rem;
          color: oklch(0.5 0.02 250);
        }
        .amount {
          font-weight: 700;
          font-size: 1rem;
        }
        .positive {
          color: oklch(0.65 0.15 145);
        }
        .negative {
          color: oklch(0.6 0.2 25);
        }
      </style>
      <div class="list-container">
        ${listHtml}
      </div>
    `;
  }
}
customElements.define('transaction-list', TransactionList);

/**
 * App Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Dashboard Initialized');
  
  // Example: Portfolio Chart Animation/Init (using placeholder)
  const chartPlaceholder = document.querySelector('.placeholder-chart');
  if (chartPlaceholder) {
    chartPlaceholder.innerHTML = '<p style="color: oklch(0.5 0.02 250); font-weight: 500;">Portfolio Visualization Active</p>';
  }
});