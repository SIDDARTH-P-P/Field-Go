const countryHead = {
  keys: ['name', 'isoName', 'iso3Name', 'niceName', 'callingCode'],
  config: {
    name: {
      label: 'Name',
      type: 'string',
      class: 'cmn_Cap'
    },
    isoName: {
      label: 'ISO Name',
      type: 'string',
      class: ' cmn_Cap'
    },
    iso3Name: {
      label: 'ISO3 Name',
      type: 'string',
      class: ' capClass'
    },
    niceName: {
      label: 'Nice Name',
      type: 'string',
      class: ' '
    },
    callingCode: {
      label: 'CallingCode',
      type: 'string',
      class: ' '
    }
  }
};

export default {
  countryHead
};
