import { submitPayment, previewPayment } from './entries.mjs';

export function quoteThenSubmit(input) {
  return [previewPayment(input), submitPayment(input)];
}
