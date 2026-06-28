export const tenantTypes = ["физическое лицо", "юридическое лицо"];

export const roomStatuses = ["Свободно", "Занято", "в ремонте"];

export const meterTypes = [
  "счетчик электроэнергии",
  "счетчик холодной воды",
  "счетчик горячей воды"
];

export const actConditions = [
  "отличное",
  "хорошее",
  "удовлетворительное",
  "требует ремонта"
];

export const requestStatuses = [
  "зарегистрирована",
  "в работе",
  "выполнена"
];

export const paymentMethods = [
  "безналичный перевод",
  "наличные через кассу",
  "банковская карта"
];

export const paymentStatuses = [
  "оплачен",
  "частично оплачен",
  "просрочен"
];

export const initialData = {
  landlords: [
    {
      id: "L-001",
      name: "ООО «Арендодатель»",
      inn: "7701000000",
      legalAddress: "г. Москва, ул. Центральная, д. 1",
      bankDetails: "р/с 4070281000000001, ПАО «Городской банк»"
    }
  ],

  tenants: [
    {
      id: "T-001",
      tenantType: "юридическое лицо",
      companyName: "ООО «Вектор»",
      legalAddress: "г. Москва, ул. Лесная, д. 7",
      ogrn: "1027700132195",
      inn: "7701234567",
      bankName: "ПАО «Городской банк»",
      checkingAccount: "4070281000000001",
      phone: "79001112233",
      email: "office@vector.ru",
      directorLastName: "Павлов",
      directorFirstName: "Игорь",
      directorMiddleName: "Андреевич"
    },
    {
      id: "T-002",
      tenantType: "физическое лицо",
      lastName: "Иванов",
      firstName: "Сергей",
      middleName: "Петрович",
      passportSeries: "4510",
      passportNumber: "123456",
      birthDate: "12.04.1991",
      passportIssueDate: "18.05.2012",
      inn: "5001234567",
      email: "ivanov@mail.ru",
      phone: "79002223344"
    },
    {
      id: "T-003",
      tenantType: "юридическое лицо",
      companyName: "ИП Смирнова Анна",
      legalAddress: "г. Москва, пр-т Мира, д. 18",
      ogrn: "3045001234567",
      inn: "5009876543",
      bankName: "АО «Расчетный банк»",
      checkingAccount: "4080281000000002",
      phone: "79003334455",
      email: "smirnova@business.ru",
      directorLastName: "Смирнова",
      directorFirstName: "Анна",
      directorMiddleName: "Игоревна"
    },
    {
      id: "T-004",
      tenantType: "физическое лицо",
      lastName: "Петрова",
      firstName: "Мария",
      middleName: "Алексеевна",
      passportSeries: "4511",
      passportNumber: "234567",
      birthDate: "09.09.1988",
      passportIssueDate: "11.10.2014",
      inn: "5002345678",
      email: "petrova@mail.ru",
      phone: "79004445566"
    },
    {
      id: "T-005",
      tenantType: "юридическое лицо",
      companyName: "ООО «Север»",
      legalAddress: "г. Москва, ул. Полярная, д. 9",
      ogrn: "1027800123456",
      inn: "7801234567",
      bankName: "ПАО «Северный банк»",
      checkingAccount: "4070281000000003",
      phone: "79005556677",
      email: "office@sever.ru",
      directorLastName: "Орлов",
      directorFirstName: "Денис",
      directorMiddleName: "Викторович"
    },
    {
      id: "T-006",
      tenantType: "физическое лицо",
      lastName: "Кузнецов",
      firstName: "Артем",
      middleName: "Ильич",
      passportSeries: "4512",
      passportNumber: "345678",
      birthDate: "21.01.1995",
      passportIssueDate: "22.02.2016",
      inn: "5003456789",
      email: "kuznetsov@mail.ru",
      phone: "79006667788"
    },
    {
      id: "T-007",
      tenantType: "юридическое лицо",
      companyName: "АО «Гранит»",
      legalAddress: "г. Москва, ул. Каменная, д. 4",
      ogrn: "1027700456789",
      inn: "7704567890",
      bankName: "АО «Столичный банк»",
      checkingAccount: "4070281000000004",
      phone: "79007778899",
      email: "info@granit.ru",
      directorLastName: "Белова",
      directorFirstName: "Елена",
      directorMiddleName: "Олеговна"
    },
    {
      id: "T-008",
      tenantType: "физическое лицо",
      lastName: "Соколов",
      firstName: "Никита",
      middleName: "Романович",
      passportSeries: "4513",
      passportNumber: "456789",
      birthDate: "03.06.1990",
      passportIssueDate: "04.07.2015",
      inn: "5004567890",
      email: "sokolov@mail.ru",
      phone: "79008889900"
    }
  ],

  rooms: [
    {
      id: "101",
      area: "28",
      floor: "1",
      address: "г. Москва, ул. Центральная, д. 1, помещение 101",
      status: "Свободно"
    },
    {
      id: "102",
      area: "16",
      floor: "1",
      address: "г. Москва, ул. Центральная, д. 1, помещение 102",
      status: "Свободно"
    },
    {
      id: "112",
      area: "41",
      floor: "1",
      address: "г. Москва, ул. Центральная, д. 1, помещение 112",
      status: "Занято"
    },
    {
      id: "205",
      area: "52",
      floor: "2",
      address: "г. Москва, ул. Центральная, д. 1, помещение 205",
      status: "Занято"
    },
    {
      id: "206",
      area: "64",
      floor: "2",
      address: "г. Москва, ул. Центральная, д. 1, помещение 206",
      status: "Свободно"
    },
    {
      id: "217",
      area: "23",
      floor: "2",
      address: "г. Москва, ул. Центральная, д. 1, помещение 217",
      status: "Занято"
    },
    {
      id: "301",
      area: "78",
      floor: "3",
      address: "г. Москва, ул. Центральная, д. 1, помещение 301",
      status: "Свободно"
    },
    {
      id: "317",
      area: "18",
      floor: "3",
      address: "г. Москва, ул. Центральная, д. 1, помещение 317",
      status: "в ремонте"
    },
    {
      id: "318",
      area: "33",
      floor: "3",
      address: "г. Москва, ул. Центральная, д. 1, помещение 318",
      status: "Занято"
    },
    {
      id: "410",
      area: "35",
      floor: "4",
      address: "г. Москва, ул. Центральная, д. 1, помещение 410",
      status: "Свободно"
    },
    {
      id: "411",
      area: "46",
      floor: "4",
      address: "г. Москва, ул. Центральная, д. 1, помещение 411",
      status: "Занято"
    },
    {
      id: "509",
      area: "90",
      floor: "5",
      address: "г. Москва, ул. Центральная, д. 1, помещение 509",
      status: "Свободно"
    }
  ],

  contracts: [
    {
      id: "C-001",
      contractNumber: "ДА-24/015",
      roomId: "205",
      landlordId: "L-001",
      tenantId: "T-001",
      startDate: "01.02.2026",
      endDate: "31.12.2026",
      rentCost: "92000",
      payment: "92000",
      lastPaymentDate: "07.05.2026"
    },
    {
      id: "C-002",
      contractNumber: "ДА-24/021",
      roomId: "317",
      landlordId: "L-001",
      tenantId: "T-002",
      startDate: "15.03.2026",
      endDate: "31.12.2026",
      rentCost: "21000",
      payment: "0",
      lastPaymentDate: "10.04.2026"
    },
    {
      id: "C-003",
      contractNumber: "ДА-24/030",
      roomId: "410",
      landlordId: "L-001",
      tenantId: "T-003",
      startDate: "01.06.2026",
      endDate: "31.12.2026",
      rentCost: "57000",
      payment: "57000",
      lastPaymentDate: "01.06.2026"
    },
    {
      id: "C-004",
      contractNumber: "ДА-24/031",
      roomId: "112",
      landlordId: "L-001",
      tenantId: "T-005",
      startDate: "01.01.2026",
      endDate: "31.12.2026",
      rentCost: "66000",
      payment: "66000",
      lastPaymentDate: "05.05.2026"
    },
    {
      id: "C-005",
      contractNumber: "ДА-24/032",
      roomId: "217",
      landlordId: "L-001",
      tenantId: "T-004",
      startDate: "01.04.2026",
      endDate: "30.11.2026",
      rentCost: "36000",
      payment: "18000",
      lastPaymentDate: "15.05.2026"
    },
    {
      id: "C-006",
      contractNumber: "ДА-24/033",
      roomId: "318",
      landlordId: "L-001",
      tenantId: "T-006",
      startDate: "10.04.2026",
      endDate: "10.12.2026",
      rentCost: "48000",
      payment: "48000",
      lastPaymentDate: "10.05.2026"
    },
    {
      id: "C-007",
      contractNumber: "ДА-24/034",
      roomId: "411",
      landlordId: "L-001",
      tenantId: "T-007",
      startDate: "20.02.2026",
      endDate: "20.12.2026",
      rentCost: "71000",
      payment: "30000",
      lastPaymentDate: "20.04.2026"
    },
    {
      id: "C-008",
      contractNumber: "ДА-24/035",
      roomId: "102",
      landlordId: "L-001",
      tenantId: "T-008",
      startDate: "01.05.2026",
      endDate: "31.10.2026",
      rentCost: "25000",
      payment: "25000",
      lastPaymentDate: "01.05.2026"
    }
  ],

  payments: [
      {
          "id": "P-001",
          "contractId": "C-001",
          "amount": "92000",
          "paymentDate": "06.02.2026",
          "periodStart": "01.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-002",
          "contractId": "C-001",
          "amount": "92000",
          "paymentDate": "07.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-003",
          "contractId": "C-001",
          "amount": "0",
          "paymentDate": "08.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "просрочен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-004",
          "contractId": "C-002",
          "amount": "21000",
          "paymentDate": "21.03.2026",
          "periodStart": "15.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-005",
          "contractId": "C-002",
          "amount": "21000",
          "paymentDate": "08.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-006",
          "contractId": "C-002",
          "amount": "21000",
          "paymentDate": "09.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-007",
          "contractId": "C-003",
          "amount": "57000",
          "paymentDate": "08.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-008",
          "contractId": "C-003",
          "amount": "57000",
          "paymentDate": "09.07.2026",
          "periodStart": "01.07.2026",
          "periodEnd": "31.07.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-009",
          "contractId": "C-003",
          "amount": "57000",
          "paymentDate": "10.08.2026",
          "periodStart": "01.08.2026",
          "periodEnd": "31.08.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-010",
          "contractId": "C-004",
          "amount": "66000",
          "paymentDate": "09.01.2026",
          "periodStart": "01.01.2026",
          "periodEnd": "31.01.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-011",
          "contractId": "C-004",
          "amount": "66000",
          "paymentDate": "10.02.2026",
          "periodStart": "01.02.2026",
          "periodEnd": "28.02.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-012",
          "contractId": "C-004",
          "amount": "66000",
          "paymentDate": "06.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-013",
          "contractId": "C-005",
          "amount": "36000",
          "paymentDate": "10.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-014",
          "contractId": "C-005",
          "amount": "36000",
          "paymentDate": "06.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-015",
          "contractId": "C-005",
          "amount": "18000",
          "paymentDate": "07.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "безналичный перевод",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-016",
          "contractId": "C-006",
          "amount": "48000",
          "paymentDate": "15.04.2026",
          "periodStart": "10.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-017",
          "contractId": "C-006",
          "amount": "48000",
          "paymentDate": "07.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-018",
          "contractId": "C-006",
          "amount": "24000",
          "paymentDate": "08.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-019",
          "contractId": "C-007",
          "amount": "71000",
          "paymentDate": "26.02.2026",
          "periodStart": "20.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-020",
          "contractId": "C-007",
          "amount": "71000",
          "paymentDate": "08.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-021",
          "contractId": "C-007",
          "amount": "30000",
          "paymentDate": "09.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-022",
          "contractId": "C-008",
          "amount": "25000",
          "paymentDate": "08.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-023",
          "contractId": "C-008",
          "amount": "25000",
          "paymentDate": "09.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-024",
          "contractId": "C-008",
          "amount": "0",
          "paymentDate": "10.07.2026",
          "periodStart": "01.07.2026",
          "periodEnd": "31.07.2026",
          "method": "безналичный перевод",
          "status": "просрочен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-025",
          "contractId": "C-009",
          "amount": "129600",
          "paymentDate": "18.10.2026",
          "periodStart": "10.10.2026",
          "periodEnd": "31.10.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-026",
          "contractId": "C-009",
          "amount": "129600",
          "paymentDate": "10.11.2026",
          "periodStart": "01.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-027",
          "contractId": "C-009",
          "amount": "129600",
          "paymentDate": "06.12.2026",
          "periodStart": "01.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-028",
          "contractId": "C-010",
          "amount": "128700",
          "paymentDate": "20.11.2026",
          "periodStart": "11.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-029",
          "contractId": "C-010",
          "amount": "128700",
          "paymentDate": "06.12.2026",
          "periodStart": "01.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-030",
          "contractId": "C-011",
          "amount": "31800",
          "paymentDate": "17.12.2026",
          "periodStart": "12.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-031",
          "contractId": "C-012",
          "amount": "84300",
          "paymentDate": "19.01.2026",
          "periodStart": "13.01.2026",
          "periodEnd": "31.01.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-032",
          "contractId": "C-012",
          "amount": "84300",
          "paymentDate": "08.02.2026",
          "periodStart": "01.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-033",
          "contractId": "C-012",
          "amount": "42150",
          "paymentDate": "09.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-034",
          "contractId": "C-013",
          "amount": "95900",
          "paymentDate": "21.02.2026",
          "periodStart": "14.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-035",
          "contractId": "C-013",
          "amount": "95900",
          "paymentDate": "09.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-036",
          "contractId": "C-013",
          "amount": "95900",
          "paymentDate": "10.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-037",
          "contractId": "C-014",
          "amount": "134800",
          "paymentDate": "23.03.2026",
          "periodStart": "15.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-038",
          "contractId": "C-014",
          "amount": "134800",
          "paymentDate": "10.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-039",
          "contractId": "C-014",
          "amount": "134800",
          "paymentDate": "06.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-040",
          "contractId": "C-015",
          "amount": "23400",
          "paymentDate": "25.04.2026",
          "periodStart": "16.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-041",
          "contractId": "C-015",
          "amount": "23400",
          "paymentDate": "06.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-042",
          "contractId": "C-015",
          "amount": "0",
          "paymentDate": "07.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "просрочен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-043",
          "contractId": "C-016",
          "amount": "87000",
          "paymentDate": "22.05.2026",
          "periodStart": "17.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-044",
          "contractId": "C-016",
          "amount": "87000",
          "paymentDate": "07.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-045",
          "contractId": "C-016",
          "amount": "43500",
          "paymentDate": "08.07.2026",
          "periodStart": "01.07.2026",
          "periodEnd": "31.07.2026",
          "method": "банковская карта",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-046",
          "contractId": "C-017",
          "amount": "98600",
          "paymentDate": "24.06.2026",
          "periodStart": "18.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-047",
          "contractId": "C-017",
          "amount": "98600",
          "paymentDate": "08.07.2026",
          "periodStart": "01.07.2026",
          "periodEnd": "31.07.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-048",
          "contractId": "C-017",
          "amount": "98600",
          "paymentDate": "09.08.2026",
          "periodStart": "01.08.2026",
          "periodEnd": "31.08.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-049",
          "contractId": "C-018",
          "amount": "110200",
          "paymentDate": "26.07.2026",
          "periodStart": "19.07.2026",
          "periodEnd": "31.07.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-050",
          "contractId": "C-018",
          "amount": "110200",
          "paymentDate": "09.08.2026",
          "periodStart": "01.08.2026",
          "periodEnd": "31.08.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-051",
          "contractId": "C-018",
          "amount": "110200",
          "paymentDate": "10.09.2026",
          "periodStart": "01.09.2026",
          "periodEnd": "30.09.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-052",
          "contractId": "C-019",
          "amount": "140000",
          "paymentDate": "28.08.2026",
          "periodStart": "20.08.2026",
          "periodEnd": "31.08.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-053",
          "contractId": "C-019",
          "amount": "140000",
          "paymentDate": "10.09.2026",
          "periodStart": "01.09.2026",
          "periodEnd": "30.09.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-054",
          "contractId": "C-019",
          "amount": "140000",
          "paymentDate": "06.10.2026",
          "periodStart": "01.10.2026",
          "periodEnd": "31.10.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-055",
          "contractId": "C-020",
          "amount": "28600",
          "paymentDate": "10.09.2026",
          "periodStart": "01.09.2026",
          "periodEnd": "30.09.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-056",
          "contractId": "C-020",
          "amount": "28600",
          "paymentDate": "06.10.2026",
          "periodStart": "01.10.2026",
          "periodEnd": "31.10.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-057",
          "contractId": "C-020",
          "amount": "14300",
          "paymentDate": "07.11.2026",
          "periodStart": "01.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-058",
          "contractId": "C-021",
          "amount": "49300",
          "paymentDate": "07.10.2026",
          "periodStart": "02.10.2026",
          "periodEnd": "31.10.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-059",
          "contractId": "C-021",
          "amount": "49300",
          "paymentDate": "07.11.2026",
          "periodStart": "01.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-060",
          "contractId": "C-021",
          "amount": "24650",
          "paymentDate": "08.12.2026",
          "periodStart": "01.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-061",
          "contractId": "C-022",
          "amount": "94700",
          "paymentDate": "09.11.2026",
          "periodStart": "03.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-062",
          "contractId": "C-022",
          "amount": "0",
          "paymentDate": "08.12.2026",
          "periodStart": "01.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "просрочен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-063",
          "contractId": "C-023",
          "amount": "106300",
          "paymentDate": "11.12.2026",
          "periodStart": "04.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-064",
          "contractId": "C-024",
          "amount": "117900",
          "paymentDate": "13.01.2026",
          "periodStart": "05.01.2026",
          "periodEnd": "31.01.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-065",
          "contractId": "C-024",
          "amount": "117900",
          "paymentDate": "10.02.2026",
          "periodStart": "01.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-066",
          "contractId": "C-024",
          "amount": "58950",
          "paymentDate": "06.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-067",
          "contractId": "C-025",
          "amount": "24700",
          "paymentDate": "15.02.2026",
          "periodStart": "06.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-068",
          "contractId": "C-025",
          "amount": "24700",
          "paymentDate": "06.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-069",
          "contractId": "C-025",
          "amount": "24700",
          "paymentDate": "07.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-070",
          "contractId": "C-026",
          "amount": "36300",
          "paymentDate": "12.03.2026",
          "periodStart": "07.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-071",
          "contractId": "C-026",
          "amount": "36300",
          "paymentDate": "07.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-072",
          "contractId": "C-026",
          "amount": "18150",
          "paymentDate": "08.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-073",
          "contractId": "C-027",
          "amount": "57000",
          "paymentDate": "14.04.2026",
          "periodStart": "08.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-074",
          "contractId": "C-027",
          "amount": "57000",
          "paymentDate": "08.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-075",
          "contractId": "C-027",
          "amount": "57000",
          "paymentDate": "09.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-076",
          "contractId": "C-028",
          "amount": "111500",
          "paymentDate": "16.05.2026",
          "periodStart": "09.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-077",
          "contractId": "C-028",
          "amount": "111500",
          "paymentDate": "09.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-078",
          "contractId": "C-028",
          "amount": "55750",
          "paymentDate": "10.07.2026",
          "periodStart": "01.07.2026",
          "periodEnd": "31.07.2026",
          "method": "банковская карта",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-079",
          "contractId": "C-029",
          "amount": "123100",
          "paymentDate": "18.06.2026",
          "periodStart": "10.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-080",
          "contractId": "C-029",
          "amount": "123100",
          "paymentDate": "10.07.2026",
          "periodStart": "01.07.2026",
          "periodEnd": "31.07.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-081",
          "contractId": "C-029",
          "amount": "0",
          "paymentDate": "06.08.2026",
          "periodStart": "01.08.2026",
          "periodEnd": "31.08.2026",
          "method": "безналичный перевод",
          "status": "просрочен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-082",
          "contractId": "C-030",
          "amount": "29900",
          "paymentDate": "20.07.2026",
          "periodStart": "11.07.2026",
          "periodEnd": "31.07.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-083",
          "contractId": "C-030",
          "amount": "29900",
          "paymentDate": "06.08.2026",
          "periodStart": "01.08.2026",
          "periodEnd": "31.08.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-084",
          "contractId": "C-030",
          "amount": "29900",
          "paymentDate": "07.09.2026",
          "periodStart": "01.09.2026",
          "periodEnd": "30.09.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-085",
          "contractId": "C-031",
          "amount": "41500",
          "paymentDate": "17.08.2026",
          "periodStart": "12.08.2026",
          "periodEnd": "31.08.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-086",
          "contractId": "C-031",
          "amount": "41500",
          "paymentDate": "07.09.2026",
          "periodStart": "01.09.2026",
          "periodEnd": "30.09.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-087",
          "contractId": "C-031",
          "amount": "20750",
          "paymentDate": "08.10.2026",
          "periodStart": "01.10.2026",
          "periodEnd": "31.10.2026",
          "method": "банковская карта",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-088",
          "contractId": "C-032",
          "amount": "62200",
          "paymentDate": "19.09.2026",
          "periodStart": "13.09.2026",
          "periodEnd": "30.09.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-089",
          "contractId": "C-032",
          "amount": "62200",
          "paymentDate": "08.10.2026",
          "periodStart": "01.10.2026",
          "periodEnd": "31.10.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-090",
          "contractId": "C-032",
          "amount": "31100",
          "paymentDate": "09.11.2026",
          "periodStart": "01.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "частично оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-091",
          "contractId": "C-033",
          "amount": "82900",
          "paymentDate": "21.10.2026",
          "periodStart": "14.10.2026",
          "periodEnd": "31.10.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-092",
          "contractId": "C-033",
          "amount": "82900",
          "paymentDate": "09.11.2026",
          "periodStart": "01.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-093",
          "contractId": "C-033",
          "amount": "82900",
          "paymentDate": "10.12.2026",
          "periodStart": "01.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-094",
          "contractId": "C-034",
          "amount": "128300",
          "paymentDate": "23.11.2026",
          "periodStart": "15.11.2026",
          "periodEnd": "30.11.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-095",
          "contractId": "C-034",
          "amount": "128300",
          "paymentDate": "10.12.2026",
          "periodStart": "01.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-096",
          "contractId": "C-035",
          "amount": "35100",
          "paymentDate": "25.12.2026",
          "periodStart": "16.12.2026",
          "periodEnd": "31.12.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-097",
          "contractId": "C-036",
          "amount": "46700",
          "paymentDate": "22.01.2026",
          "periodStart": "17.01.2026",
          "periodEnd": "31.01.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-098",
          "contractId": "C-036",
          "amount": "46700",
          "paymentDate": "07.02.2026",
          "periodStart": "01.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-099",
          "contractId": "C-036",
          "amount": "0",
          "paymentDate": "08.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "просрочен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-100",
          "contractId": "C-037",
          "amount": "67400",
          "paymentDate": "24.02.2026",
          "periodStart": "18.02.2026",
          "periodEnd": "28.02.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-101",
          "contractId": "C-037",
          "amount": "67400",
          "paymentDate": "08.03.2026",
          "periodStart": "01.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-102",
          "contractId": "C-037",
          "amount": "67400",
          "paymentDate": "09.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-103",
          "contractId": "C-038",
          "amount": "79000",
          "paymentDate": "26.03.2026",
          "periodStart": "19.03.2026",
          "periodEnd": "31.03.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-104",
          "contractId": "C-038",
          "amount": "79000",
          "paymentDate": "09.04.2026",
          "periodStart": "01.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-105",
          "contractId": "C-038",
          "amount": "79000",
          "paymentDate": "10.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-106",
          "contractId": "C-039",
          "amount": "90600",
          "paymentDate": "28.04.2026",
          "periodStart": "20.04.2026",
          "periodEnd": "30.04.2026",
          "method": "банковская карта",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-107",
          "contractId": "C-039",
          "amount": "90600",
          "paymentDate": "10.05.2026",
          "periodStart": "01.05.2026",
          "periodEnd": "31.05.2026",
          "method": "безналичный перевод",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      },
      {
          "id": "P-108",
          "contractId": "C-039",
          "amount": "90600",
          "paymentDate": "06.06.2026",
          "periodStart": "01.06.2026",
          "periodEnd": "30.06.2026",
          "method": "наличные через кассу",
          "status": "оплачен",
          "note": "Демо-платеж для проверки журнала оплат"
      }
  ],

  acts: [
    {
      id: "A-001",
      contractId: "C-001",
      settlementDate: "01.02.2026",
      roomCondition: "отличное",
      meterReadings: [
        { meterType: "счетчик электроэнергии", meterValue: "3820" },
        { meterType: "счетчик холодной воды", meterValue: "44" },
        { meterType: "счетчик горячей воды", meterValue: "18" }
      ]
    },
    {
      id: "A-002",
      contractId: "C-002",
      settlementDate: "15.03.2026",
      roomCondition: "требует ремонта",
      meterReadings: [
        { meterType: "счетчик электроэнергии", meterValue: "640" },
        { meterType: "счетчик холодной воды", meterValue: "12" },
        { meterType: "счетчик горячей воды", meterValue: "7" }
      ]
    },
    {
      id: "A-003",
      contractId: "C-004",
      settlementDate: "01.01.2026",
      roomCondition: "хорошее",
      meterReadings: [
        { meterType: "счетчик электроэнергии", meterValue: "2100" },
        { meterType: "счетчик холодной воды", meterValue: "27" },
        { meterType: "счетчик горячей воды", meterValue: "14" }
      ]
    },
    {
      id: "A-004",
      contractId: "C-005",
      settlementDate: "01.04.2026",
      roomCondition: "удовлетворительное",
      meterReadings: [
        { meterType: "счетчик электроэнергии", meterValue: "980" },
        { meterType: "счетчик холодной воды", meterValue: "19" },
        { meterType: "счетчик горячей воды", meterValue: "8" }
      ]
    },
    {
      id: "A-005",
      contractId: "C-006",
      settlementDate: "10.04.2026",
      roomCondition: "хорошее",
      meterReadings: [
        { meterType: "счетчик электроэнергии", meterValue: "1500" },
        { meterType: "счетчик холодной воды", meterValue: "21" },
        { meterType: "счетчик горячей воды", meterValue: "10" }
      ]
    },
    {
      id: "A-006",
      contractId: "C-007",
      settlementDate: "20.02.2026",
      roomCondition: "отличное",
      meterReadings: [
        { meterType: "счетчик электроэнергии", meterValue: "2600" },
        { meterType: "счетчик холодной воды", meterValue: "31" },
        { meterType: "счетчик горячей воды", meterValue: "16" }
      ]
    }
  ],

  certificates: [
    {
      id: "S-001",
      contractId: "C-001",
      cadastralNumber: "7701234567",
      registrationDate: "12.01.2024",
      registrationNumber: "100001"
    },
    {
      id: "S-002",
      contractId: "C-002",
      cadastralNumber: "7707654321",
      registrationDate: "18.02.2024",
      registrationNumber: "100002"
    },
    {
      id: "S-003",
      contractId: "C-004",
      cadastralNumber: "7702223344",
      registrationDate: "20.03.2024",
      registrationNumber: "100003"
    },
    {
      id: "S-004",
      contractId: "C-005",
      cadastralNumber: "7703334455",
      registrationDate: "25.03.2024",
      registrationNumber: "100004"
    },
    {
      id: "S-005",
      contractId: "C-006",
      cadastralNumber: "7704445566",
      registrationDate: "04.04.2024",
      registrationNumber: "100005"
    }
  ],

  requests: [
    {
      id: "З-105",
      contractId: "C-002",
      roomId: "317",
      tenantRoomContractId: "C-002",
      description: "Не работает освещение в помещении",
      requestDate: "26.05.2026",
      status: "зарегистрирована"
    },
    {
      id: "З-099",
      contractId: "C-001",
      roomId: "205",
      tenantRoomContractId: "C-001",
      description: "Проверить показания счетчика холодной воды",
      requestDate: "24.05.2026",
      status: "в работе"
    },
    {
      id: "З-081",
      contractId: "C-001",
      roomId: "205",
      tenantRoomContractId: "C-001",
      description: "Замена дверного замка",
      requestDate: "18.05.2026",
      status: "выполнена"
    },
    {
      id: "З-106",
      contractId: "C-005",
      roomId: "217",
      tenantRoomContractId: "C-005",
      description: "Проверить розетки в помещении",
      requestDate: "27.05.2026",
      status: "зарегистрирована"
    },
    {
      id: "З-107",
      contractId: "C-006",
      roomId: "318",
      tenantRoomContractId: "C-006",
      description: "Проверить счетчик электроэнергии",
      requestDate: "28.05.2026",
      status: "в работе"
    },
    {
      id: "З-108",
      contractId: "C-007",
      roomId: "411",
      tenantRoomContractId: "C-007",
      description: "Настроить вентиляцию",
      requestDate: "29.05.2026",
      status: "зарегистрирована"
    }
  ],

  notices: [
    {
      id: "1",
      contractId: "C-002",
      tenantRoomContractId: "C-002",
      roomId: "317",
      debtAmount: "21000",
      formationDate: "27.05.2026",
      repaymentDeadline: "10.06.2026"
    },
    {
      id: "2",
      contractId: "C-005",
      tenantRoomContractId: "C-005",
      roomId: "217",
      debtAmount: "18000",
      formationDate: "28.05.2026",
      repaymentDeadline: "12.06.2026"
    },
    {
      id: "3",
      contractId: "C-007",
      tenantRoomContractId: "C-007",
      roomId: "411",
      debtAmount: "41000",
      formationDate: "29.05.2026",
      repaymentDeadline: "15.06.2026"
    }
  ]
};

export const sections = {
  rooms: {
    tab: "Помещения",
    title: "Объект «Помещение»",
    description: "Хранятся только поля модели: площадь, этаж, адрес и статус помещения.",
    action: "+ Новое помещение",
    secondAction: "Показать свободные",
    filters: roomStatuses,
    meta: [
      { label: "Площадь", key: "area" },
      { label: "Этаж", key: "floor" },
      { label: "Статус", key: "status" },
      { label: "Адрес", key: "address" }
    ]
  },

  contracts: {
    tab: "Договоры",
    title: "Объект «Договор аренды»",
    description: "Договор связывает помещение, арендодателя и арендатора, содержит даты, стоимость аренды, платеж и дату последнего платежа.",
    action: "+ Сформировать договор",
    secondAction: "Показать задолженность",
    filters: ["без задолженности", "есть задолженность", "истекает срок"],
    meta: [
      { label: "Помещение", key: "roomId" },
      { label: "Арендатор", key: "tenantId" },
      { label: "Аренда", key: "rentCost" },
      { label: "Платеж", key: "payment" }
    ]
  },

  tenants: {
    tab: "Арендаторы",
    title: "Объект «Арендатор»",
    description: "Арендатор хранится как физическое или юридическое лицо с реквизитами.",
    action: "+ Новый арендатор",
    secondAction: "Показать физлиц",
    filters: tenantTypes,
    meta: [
      { label: "Тип", key: "tenantType" },
      { label: "ИНН", key: "inn" },
      { label: "Телефон", key: "phone" },
      { label: "Электронная почта", key: "email" }
    ]
  },


  payments: {
    tab: "Платежи",
    title: "Объект «Платеж по договору аренды»",
    description: "Платежи вынесены в отдельный журнал: каждый платеж связан с договором, расчетным периодом, датой, способом оплаты и статусом.",
    action: "+ Новый платеж",
    secondAction: "Показать просроченные",
    filters: paymentStatuses,
    meta: [
      { label: "Договор", key: "contractId" },
      { label: "Сумма", key: "amount" },
      { label: "Дата платежа", key: "paymentDate" },
      { label: "Статус", key: "status" }
    ]
  },

  acts: {
    tab: "Акты",
    title: "Объект «Акт приема-передачи»",
    description: "Акт связан с договором, датой фактического заселения, состоянием помещения и зафиксированными показаниями счетчиков.",
    action: "+ Новый акт",
    secondAction: "Сбросить фильтр",
    filters: actConditions,
    meta: [
      { label: "Договор", key: "contractId" },
      { label: "Дата заселения", key: "settlementDate" },
      { label: "Состояние", key: "roomCondition" },
      { label: "Показания", key: "meterReadings" }
    ]
  },

  certificates: {
    tab: "Свидетельства",
    title: "Объект «Свидетельство о праве собственности»",
    description: "Свидетельство связано с договором и содержит кадастровый номер, дату регистрации права и номер регистрации права.",
    action: "+ Новое свидетельство",
    secondAction: "Сбросить фильтр",
    filters: [],
    meta: [
      { label: "Договор", key: "contractId" },
      { label: "Кадастровый номер", key: "cadastralNumber" },
      { label: "Дата регистрации", key: "registrationDate" },
      { label: "Номер регистрации", key: "registrationNumber" }
    ]
  },

  requests: {
    tab: "Заявки",
    title: "Объект «Заявка на обслуживание»",
    description: "Заявка связана с договором, помещением и договором арендатора помещения, содержит описание, дату и статус.",
    action: "+ Новая заявка",
    secondAction: "Сбросить фильтр",
    filters: requestStatuses,
    meta: [
      { label: "Договор", key: "contractId" },
      { label: "Помещение", key: "roomId" },
      { label: "Дата заявки", key: "requestDate" },
      { label: "Статус", key: "status" }
    ]
  },

  notices: {
    tab: "Уведомления",
    title: "Объект «Уведомление о задолженности»",
    description: "Уведомление связано с договором и помещением, содержит сумму задолженности, дату формирования и срок погашения.",
    action: "+ Новое уведомление",
    secondAction: "Сбросить фильтр",
    filters: ["уведомление"],
    meta: [
      { label: "Договор", key: "contractId" },
      { label: "Помещение", key: "roomId" },
      { label: "Сумма", key: "debtAmount" },
      { label: "Срок погашения", key: "repaymentDeadline" }
    ]
  }
};

export const labels = {
  id: "Идентификатор",
  tenantType: "Тип арендатора",
  lastName: "Фамилия",
  firstName: "Имя",
  middleName: "Отчество",
  passportSeries: "Серия паспорта",
  passportNumber: "Номер паспорта",
  birthDate: "Дата рождения",
  passportIssueDate: "Дата выдачи паспорта",
  inn: "ИНН",
  email: "Электронная почта",
  phone: "Номер телефона",
  companyName: "Наименование фирмы",
  ogrn: "ОГРН",
  legalAddress: "Юридический адрес",
  bankName: "Наименование банка",
  checkingAccount: "Номер расчетного счета",
  directorLastName: "Фамилия представителя",
  directorFirstName: "Имя представителя",
  directorMiddleName: "Отчество представителя",
  __directorName: "ФИО представителя",

  area: "Площадь помещения",
  floor: "Этаж помещения",
  address: "Адрес помещения",
  status: "Статус",
  roomStatus: "Статус помещения",

  contractNumber: "Номер договора аренды",
  roomId: "Помещение договора аренды",
  landlordId: "Договор арендодателя",
  tenantId: "Договор арендатора помещения",
  startDate: "Дата начала договора",
  endDate: "Дата окончания договора",
  rentCost: "Стоимость аренды",
  payment: "Платеж по договору аренды",
  lastPaymentDate: "Дата последнего платежа",
  amount: "Сумма платежа",
  paymentDate: "Дата платежа",
  periodStart: "Начало расчетного периода",
  periodEnd: "Окончание расчетного периода",
  method: "Способ оплаты",
  paymentStatus: "Статус платежа",
  note: "Комментарий",
  __contractStatus: "Расчетное состояние договора",
  __debt: "Расчетная задолженность",

  contractId: "Договор",
  settlementDate: "Дата фактического заселения",
  roomCondition: "Состояние помещения",
  meterReadings: "Зафиксированные показания счетчиков",

  cadastralNumber: "Кадастровый номер",
  registrationDate: "Дата регистрации права",
  registrationNumber: "Номер регистрации права",

  tenantRoomContractId: "Договор арендатора помещения",
  description: "Описание проблемы",
  requestDate: "Дата заявки",
  requestStatus: "Статус заявки",

  debtAmount: "Сумма задолженности",
  formationDate: "Дата формирования уведомления",
  repaymentDeadline: "Срок погашения задолженности"
};

export const badgeClasses = {
  Свободно: "free",
  Занято: "busy",
  "в ремонте": "repair",

  "без задолженности": "active",
  "есть задолженность": "debt",
  "истекает срок": "warning",
  оплачен: "active",
  "частично оплачен": "warning",
  просрочен: "debt",

  "физическое лицо": "person",
  "юридическое лицо": "company",

  отличное: "active",
  хорошее: "active",
  удовлетворительное: "warning",
  "требует ремонта": "bad",

  зарегистрирована: "new",
  "в работе": "work",
  выполнена: "done",

  уведомление: "notice"
};