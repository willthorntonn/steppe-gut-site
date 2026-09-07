// What is left of the order store on the client: how a status is spelled.
//
// Every other rule - what an order costs, what number it gets, which account
// it belongs to, what order the history reads in - moved to the server when
// orders stopped living in localStorage. They are in server/routes/orders.js
// and server/catalog.js, with tests in server/test/api.test.mjs.

const STATUS_LABELS = {
  delivered: "Delivered",
  shipped: "Shipped",
  processing: "Processing",
};

/** `status` is one of: "delivered" | "shipped" | "processing" */
export function statusLabel(status) {
  return STATUS_LABELS[status] ?? "Processing";
}
