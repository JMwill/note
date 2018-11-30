import utils from './utils'

export function getSupplierBillList(params) {
  return utils.list('supplier-bill/', params)
}

export function downloadBill(id) {
  return utils.get(`supplier-bill/${id}/download/`)
}

export function updateSupplierBillStatus(params) {
  return utils.patch('supplier-bill/', params)
}

export function paySupplierBill(id, params) {
  return utils.patch(`supplier-bill/${id}/`, params)
}

export function batchPaySupplierBill(formData) {
  return utils.uploadFileView(formData, `api/v3/pepe/merchant-dashboard/supplier/batch-pay/`)
}

export function downloadInvoice(params) {
  return utils.get('download-supplier-invoice/', params)
}

export function getSupplierBill(id) {
  return utils.get(`supplier-bill/${id}/`)
}

export function getSupplierBillSummary(id, params) {
  return utils.get(`supplier-bill/${id}/summary/`, params)
}

export function getSupplierBillDetail(id, params) {
  return utils.get(`supplier-bill/${id}/detail/`, params)
}
