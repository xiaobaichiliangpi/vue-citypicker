import axios from './axios'

export function cityList () {
  return axios({
    method: 'GET',
    url: `Basic/CityRouteRequest`
  })
}

export function uploadImage (data = {}) {
  return axios({
    method: 'POST',
    url: `/Basic/UploadPicture`,
    data: {
      ByteBinary: data.ByteBinary,
      TypeName: data.TypeName
    }
  })
}

export function sendCommission (data = {}) {
  return axios({
    method: 'POST',
    url: `/Invoices/SendPowerOfAttorneyLink`,
    data: {
      ...data
    }
  })
}

export function applyQualification (data = {}) {
  return axios({
    method: 'POST',
    url: `/Invoices/ApplyQualification`,
    data: {
      ...data
    }
  })
}

export function qualificationList () {
  return axios({
    method: 'GET',
    url: `/Invoices/QualificationRecordsRequest`
  })
}

export function wxPay (data = {}) {
  return axios({
    method: 'POST',
    url: `/Pay/PhoneWxJsPay`,
    data: {
      PlatFormType: 2,
      BusinessType: 2,
      ...data
    }
  })
}

export function aliPay (data = {}) {
  return axios({
    method: 'POST',
    url: `/Pay/PhoneAliWapPay`,
    data: {
      PlatFormType: 2,
      BusinessType: 2,
      ...data
    }
  })
}
