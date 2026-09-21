// Exercise baseline: deliberately duplicated validation. Do not refactor before comparison.
export function submitPayment({ reference, amount }) {
  if (!reference) throw new Error('Reference is required');
  if (amount <= 0) throw new Error('Amount must be positive');
  return { reference, amount, status: 'submitted' };
}

export function previewPayment({ reference, amount }) {
  if (!reference) throw new Error('Reference is required');
  if (amount <= 0) throw new Error('Amount must be positive');
  return { reference, amount, status: 'preview' };
}
