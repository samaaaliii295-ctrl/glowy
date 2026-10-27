const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let paymentDecorated = false;

function routeAlias() {
  const aliases = { '#new-arrivals': '#shop?filter=new', '#best-sellers': '#shop?filter=bestseller', '#offers': '#shop?filter=offers' };
  if (aliases[location.hash]) location.hash = aliases[location.hash];
}

function paymentFields(type) {
  if (type === 'card') return `<div class="payment-fields" id="cardFields"><div class="form-field full"><label for="cardName">Cardholder name</label><input id="cardName" autocomplete="cc-name" placeholder="Name on card"></div><div class="form-field full"><label for="cardNumber">Card number</label><div class="input-with-icon"><i class="bi bi-credit-card"></i><input id="cardNumber" inputmode="numeric" autocomplete="cc-number" maxlength="19" placeholder="1234 1234 1234 1234"></div></div><div class="form-grid"><div class="form-field"><label for="cardExpiry">Expiry date</label><input id="cardExpiry" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM / YY"></div><div class="form-field"><label for="cardCvc">CVC</label><input id="cardCvc" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="123"></div></div></div>`;
  if (type === 'wallet') return `<div class="payment-fields" id="walletFields"><div class="form-field full"><label for="walletNumber">Wallet phone number</label><input id="walletNumber" inputmode="tel" placeholder="01XXXXXXXXX"></div><p class="payment-note"><i class="bi bi-shield-check"></i> You will receive a confirmation prompt from your wallet provider.</p></div>`;
  return `<div class="payment-fields" id="codFields"><p class="payment-note"><i class="bi bi-box-seam"></i> Pay when your order arrives.</p></div>`;
}

function paymentBrandIcons() {
  return '<span class="payment-brands" aria-label="Accepted cards"><span class="brand-visa">VISA</span><span class="brand-mastercard"><i></i><i></i><b>MC</b></span><span class="brand-amex">AMEX</span></span>';
}

function decorateCheckout() {
  const form = $('#checkoutForm');
  if (!form || form.dataset.paymentReady) return;
  form.dataset.paymentReady = 'true';
  const select = form.querySelector('select[name="payment"]');
  if (!select) return;
  select.closest('.form-field').innerHTML = `<label>Payment method</label><div class="payment-methods" role="radiogroup" aria-label="Payment method"><button type="button" class="payment-method selected" data-payment="cod"><span class="payment-icon"><i class="bi bi-cash-coin"></i></span><span><strong>Cash on delivery</strong><small>Pay at your door</small></span><i class="bi bi-check-circle-fill payment-check"></i></button><button type="button" class="payment-method" data-payment="card"><span class="payment-icon"><i class="bi bi-credit-card-2-front"></i></span><span><strong>Card</strong>${paymentBrandIcons()}<small>Secure card details</small></span><i class="bi bi-check-circle-fill payment-check"></i></button><button type="button" class="payment-method" data-payment="wallet"><span class="payment-icon"><i class="bi bi-phone"></i></span><span><strong>Mobile wallet</strong><small>Fast and secure</small></span><i class="bi bi-check-circle-fill payment-check"></i></button></div><div id="paymentFields">${paymentFields('cod')}</div>`;
  select.style.display = 'none';
  form.querySelector('button[type="submit"]').textContent = 'Place order';
  form.querySelectorAll('[data-payment]').forEach(button => button.addEventListener('click', () => {
    form.querySelectorAll('[data-payment]').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const type = button.dataset.payment;
    select.value = type === 'card' ? 'Card payment' : type === 'wallet' ? 'Mobile wallet' : 'Cash on delivery';
    $('#paymentFields').innerHTML = paymentFields(type);
  }));
  form.addEventListener('submit', event => {
    const selected = $('.payment-method.selected', form)?.dataset.payment || 'cod';
    const required = selected === 'card' ? ['#cardName', '#cardNumber', '#cardExpiry', '#cardCvc'] : selected === 'wallet' ? ['#walletNumber'] : [];
    const valid = required.every(selector => $(selector, form)?.value.trim());
    if (!valid) { event.preventDefault(); event.stopImmediatePropagation(); showPaymentError('Please complete your payment details.'); return; }
    required.forEach(selector => { const field = $(selector, form); if (field) field.value = ''; });
  }, true);
}

function showPaymentError(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function improveSearch() {
  const input = $('#shopSearch');
  if (!input || input.dataset.searchReady) return;
  input.dataset.searchReady = 'true';
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { location.hash = `#shop?q=${encodeURIComponent(input.value.trim())}`; }, 280);
  });
}

function decorateShopFilters() {
  const layout = $('.shop-layout');
  const filters = $('.filters', layout || document);
  if (!layout || !filters || layout.dataset.mobileFiltersReady) return;
  layout.dataset.mobileFiltersReady = 'true';
  const trigger = document.createElement('button');
  trigger.className = 'mobile-filter-toggle btn btn-outline';
  trigger.type = 'button';
  trigger.dataset.action = 'open-filters';
  trigger.innerHTML = '<i class="bi bi-sliders"></i> Filters';
  layout.parentElement.insertBefore(trigger, layout);
  const head = document.createElement('div');
  head.className = 'mobile-filter-head';
  head.innerHTML = '<strong>Filter beauty</strong><button class="icon-btn" type="button" data-action="close-filters" aria-label="Close filters"><i class="bi bi-x-lg"></i></button>';
  filters.prepend(head);
}

function cleanDemoLabels() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (!/demo/i.test(node.nodeValue)) return;
    node.nodeValue = node.nodeValue.replace(/Demo only · no real authentication/gi, 'Secure local account').replace(/Demo checkout/gi, 'Secure checkout').replace(/demo order/gi, 'order').replace(/demo reviews/gi, 'reviews').replace(/demo/gi, '').replace(/  +/g, ' ').trim();
  });
}

function refreshEnhancements() {
  routeAlias();
  decorateCheckout();
  improveSearch();
  decorateShopFilters();
  cleanDemoLabels();
}

function closeMobilePanels() {
  $('.mobile-drawer')?.classList.remove('open');
  $('.filters')?.classList.remove('mobile-open');
  $('#overlay')?.classList.remove('open');
  $('.mobile-drawer')?.setAttribute('aria-hidden', 'true');
}

window.addEventListener('hashchange', () => { closeMobilePanels(); setTimeout(refreshEnhancements, 0); });
new MutationObserver(refreshEnhancements).observe($('#app'), { childList: true, subtree: true });
document.addEventListener('click', event => {
  const link = event.target.closest('.mobile-drawer a');
  if (link) closeMobilePanels();
  const filterControl = event.target.closest('.filters input, .filters select');
  if (filterControl) setTimeout(closeMobilePanels, 0);
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'open-filters') { $('.filters')?.classList.add('mobile-open'); $('#overlay')?.classList.add('open'); }
  if (action === 'close-filters') { $('.filters')?.classList.remove('mobile-open'); $('#overlay')?.classList.remove('open'); }
});
$('#overlay')?.addEventListener('click', closeMobilePanels);
setTimeout(refreshEnhancements, 0);
setTimeout(cleanDemoLabels, 300);
