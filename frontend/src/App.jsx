import React, { useEffect, useMemo, useState } from "react";
import {
  actConditions,
  badgeClasses,
  initialData,
  labels,
  meterTypes,
  paymentMethods,
  paymentStatuses,
  requestStatuses,
  roomStatuses,
  sections,
  tenantTypes
} from "./data";

const PAGE_SIZE = 6;
const ALL_VALUES = "Все значения";

const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    let message = `Ошибка API: ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.error || message;
    } catch {
      // ignore JSON parse errors for non-JSON errors
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

function apiCreate(sectionKey, entity) {
  return apiRequest(`/api/${sectionKey}/`, { method: "POST", body: JSON.stringify(entity) });
}

function apiUpdate(sectionKey, id, entity) {
  return apiRequest(`/api/${sectionKey}/${encodeURIComponent(id)}/`, { method: "PUT", body: JSON.stringify(entity) });
}

function apiDelete(sectionKey, id) {
  return apiRequest(`/api/${sectionKey}/${encodeURIComponent(id)}/`, { method: "DELETE" });
}


const styles = `
:root {
  --bg: #f4f6fb;
  --card: #ffffff;
  --card-soft: #f8fafc;
  --text: #1f2937;
  --muted: #6b7280;
  --line: #e5e7eb;
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-soft: #dbeafe;
  --green: #15803d;
  --green-soft: #dcfce7;
  --red: #b91c1c;
  --red-soft: #fee2e2;
  --yellow: #a16207;
  --yellow-soft: #fef3c7;
  --purple: #6d28d9;
  --purple-soft: #ede9fe;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  --radius: 24px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, "Helvetica Neue", sans-serif;
  background: var(--bg);
  color: var(--text);
}

button, input, select, textarea { font-family: inherit; }

.page { min-height: 100vh; }

.hero {
  background: linear-gradient(135deg, #172554, #1d4ed8 55%, #60a5fa);
  color: #fff;
  padding: 22px 28px 82px;
}

.hero-inner {
  max-width: 1480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
}

.brand {
  display: flex;
  gap: 14px;
  align-items: center;
}

.brand-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.16);
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.24);
}

.brand strong {
  display: block;
  font-size: 18px;
}

.brand span {
  color: rgba(255, 255, 255, 0.74);
  font-size: 13px;
}

.manager-card {
  background: rgba(255, 255, 255, 0.13);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  padding: 8px 16px 8px 8px;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 12px;
}

.manager-card .avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  color: var(--primary-dark);
  display: grid;
  place-items: center;
  font-weight: 900;
  flex: 0 0 auto;
}

.manager-card strong {
  display: block;
  font-size: 16px;
}

.manager-card span {
  display: block;
  color: rgba(255, 255, 255, 0.74);
  font-size: 12px;
  margin-top: 1px;
}

.main {
  max-width: 1480px;
  margin: -62px auto 0;
  padding: 0 28px 40px;
  position: relative;
}

.summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(160px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.summary-card {
  background: var(--card);
  border-radius: 22px;
  padding: 18px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(229, 231, 235, 0.9);
}

.summary-card span {
  color: var(--muted);
  font-size: 13px;
}

.summary-card strong {
  display: block;
  font-size: 30px;
  margin: 8px 0 4px;
}

.summary-card small {
  color: var(--muted);
  line-height: 1.35;
}

.catalog-shell {
  background: var(--card);
  border-radius: 30px;
  box-shadow: var(--shadow);
  border: 1px solid var(--line);
  overflow: visible;
}

.tabs {
  display: flex;
  gap: 10px;
  padding: 18px 18px 0;
  overflow-x: auto;
}

.tab {
  border: 1px solid var(--line);
  background: #fff;
  color: var(--text);
  border-radius: 999px;
  padding: 11px 15px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s ease;
}

.tab:hover { background: var(--card-soft); }

.tab.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.tab-count {
  font-size: 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
  padding: 3px 8px;
}

.tab.active .tab-count {
  background: rgba(255, 255, 255, 0.22);
}

.catalog-head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 22px 22px 16px;
  align-items: center;
}

.catalog-head h2 {
  margin: 0;
  font-size: 26px;
  letter-spacing: -0.02em;
}

.catalog-head p {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.45;
  max-width: 740px;
}

.catalog-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn {
  border: 0;
  border-radius: 14px;
  padding: 13px 17px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) { background: var(--primary-dark); }

.btn-secondary {
  background: #eef2f7;
  color: var(--text);
}

.btn-secondary:hover:not(:disabled) { background: #e2e8f0; }

.btn-danger {
  background: var(--red-soft);
  color: var(--red);
}

.filters {
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  gap: 12px;
  padding: 0 22px 20px;
  border-bottom: 1px solid var(--line);
}

.filters.rooms {
  grid-template-columns: 1.4fr 1fr 0.7fr 0.7fr auto;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

label {
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
}

input, select, textarea {
  width: 100%;
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 15px;
  padding: 12px 13px;
  font: inherit;
  outline: none;
  color: var(--text);
}

textarea {
  min-height: 96px;
  resize: vertical;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.field-hint {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.35;
}

.catalog-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  padding: 24px 26px 28px;
  background: #fbfdff;
  border-radius: 0 0 30px 30px;
  overflow: visible;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 18px;
  overflow: visible;
}

.item-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  transition: 0.2s ease;
  position: relative;
  overflow: visible;
}

.item-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.1);
  z-index: 3;
}

.card-visual {
  min-height: 138px;
  padding: 16px;
  background: linear-gradient(135deg, #eff6ff, #f8fafc);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius) var(--radius) 0 0;
}

.card-visual::after {
  content: "";
  position: absolute;
  right: -42px;
  bottom: -46px;
  width: 140px;
  height: 140px;
  border-radius: 36px;
  background: rgba(37, 99, 235, 0.12);
  transform: rotate(18deg);
}

.visual-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: #fff;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 900;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
  position: relative;
  z-index: 1;
}

.visual-icon.icon-good {
  background: var(--green-soft);
  color: var(--green);
}

.visual-icon.icon-warning {
  background: var(--yellow-soft);
  color: var(--yellow);
}

.visual-icon.icon-bad {
  background: var(--red-soft);
  color: var(--red);
}

.visual-icon.icon-purple {
  background: var(--purple-soft);
  color: var(--purple);
}

.visual-icon.icon-info {
  background: var(--primary-soft);
  color: var(--primary-dark);
}

.visual-note {
  position: relative;
  z-index: 1;
  text-align: right;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.35;
  max-width: 190px;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 10px;
}

.card-title {
  margin: 0;
  font-size: 21px;
  line-height: 1.25;
}

.card-subtitle {
  color: var(--muted);
  margin: 5px 0 0;
  font-size: 15px;
  line-height: 1.4;
}

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
}

.badge.free,
.badge.active,
.badge.done,
.badge.person {
  background: var(--green-soft);
  color: var(--green);
}

.badge.busy,
.badge.work,
.badge.warning {
  background: var(--yellow-soft);
  color: var(--yellow);
}

.badge.repair,
.badge.debt,
.badge.bad {
  background: var(--red-soft);
  color: var(--red);
}

.badge.company,
.badge.notice,
.badge.new {
  background: var(--purple-soft);
  color: var(--purple);
}

.badge.info {
  background: var(--primary-soft);
  color: var(--primary-dark);
}

.meta-list {
  display: grid;
  gap: 9px;
  margin: auto 0 16px;
  padding-top: 18px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px dashed #e5e7eb;
  padding-bottom: 10px;
  font-size: 15px;
}

.meta-row span:first-child { color: var(--muted); }

.meta-row strong {
  text-align: right;
  font-size: 15px;
}

.card-footer {
  margin-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  position: relative;
}

.card-footer .btn { width: 100%; }

.action-menu-wrap { position: relative; }

.actions-menu {
  display: none;
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  min-width: 260px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 8px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.16);
  z-index: 10;
}

.actions-menu.open {
  display: grid;
  gap: 5px;
}

.menu-item {
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  border-radius: 12px;
  padding: 11px 12px;
  cursor: pointer;
  color: var(--text);
  font-weight: 750;
  font-size: 14px;
}

.menu-item:hover { background: var(--card-soft); }

.menu-item.danger { color: var(--red); }

.menu-item.danger:hover { background: var(--red-soft); }

.empty {
  grid-column: 1 / -1;
  background: var(--card);
  border: 1px dashed #cbd5e1;
  border-radius: 24px;
  padding: 36px;
  text-align: center;
  color: var(--muted);
}

.pagination {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 14px;
}

.pagination-info {
  color: var(--muted);
  font-weight: 700;
  line-height: 1.35;
}

.pagination-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.drawer-backdrop {
  position: fixed;
  inset: 0;
  display: none;
  justify-content: flex-end;
  background: rgba(15, 23, 42, 0.46);
  z-index: 20;
}

.drawer-backdrop.open { display: flex; }

.drawer {
  width: min(680px, 100%);
  height: 100%;
  overflow-y: auto;
  background: #fff;
  box-shadow: -20px 0 50px rgba(0, 0, 0, 0.2);
  padding: 24px;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.drawer-header h3 {
  margin: 0;
  font-size: 25px;
  letter-spacing: -0.02em;
}

.drawer-header p {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.4;
}

.close-btn {
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: #eef2f7;
  cursor: pointer;
  font-size: 24px;
}

.details {
  display: grid;
  gap: 12px;
  margin: 18px 0;
}

.detail-row {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 12px;
  border: 1px solid var(--line);
  background: var(--card-soft);
  border-radius: 16px;
  padding: 13px;
}

.detail-row span:first-child {
  color: var(--muted);
  font-weight: 800;
  font-size: 13px;
}

.linked-box {
  margin: 18px 0;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  border-radius: 22px;
  padding: 17px;
}

.linked-box h4 {
  margin: 0 0 6px;
  font-size: 18px;
}

.linked-box p {
  margin: 0 0 14px;
  color: #1e40af;
  line-height: 1.45;
  font-size: 14px;
}

.linked-grid {
  display: grid;
  gap: 10px;
}

.linked-card {
  background: #fff;
  border: 1px solid #dbeafe;
  border-radius: 16px;
  padding: 13px;
}

.linked-card strong {
  display: block;
  margin-bottom: 4px;
}

.linked-card small {
  color: var(--muted);
  line-height: 1.35;
}

.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.toast {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 60;
  display: none;
  max-width: 420px;
  background: #111827;
  color: #fff;
  padding: 14px 16px;
  border-radius: 16px;
  box-shadow: var(--shadow);
  line-height: 1.4;
}

.toast.show { display: block; }

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.52);
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 20px;
}

.modal {
  width: min(820px, 100%);
  max-height: min(88vh, 900px);
  overflow-y: auto;
  background: #fff;
  border-radius: 26px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.25);
  border: 1px solid var(--line);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 22px 22px 12px;
  align-items: flex-start;
  border-bottom: 1px solid var(--line);
}

.modal-header h3 {
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.modal-header p {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.4;
}

.modal-body {
  padding: 20px 22px 22px;
}

.modal-footer {
  padding: 0 22px 22px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-grid .field.full {
  grid-column: 1 / -1;
}

.form-error {
  grid-column: 1 / -1;
  border: 1px solid var(--red-soft);
  background: var(--red-soft);
  color: var(--red);
  border-radius: 14px;
  padding: 12px 14px;
  font-weight: 800;
  line-height: 1.45;
}

@media (max-width: 1120px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filters.rooms,
  .filters {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 850px) {
  .hero-inner,
  .catalog-head,
  .filters,
  .filters.rooms {
    grid-template-columns: 1fr;
  }

  .hero-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary,
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .catalog-actions {
    justify-content: flex-start;
  }

  .main {
    padding: 0 14px 28px;
  }

  .hero {
    padding: 24px 16px 54px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    align-items: stretch;
    flex-direction: column;
  }
}

@media (max-width: 520px) {
  .catalog-body,
  .catalog-head,
  .filters {
    padding-left: 14px;
    padding-right: 14px;
  }

  .card-footer,
  .quick-actions,
  .detail-row {
    grid-template-columns: 1fr;
  }

  .actions-menu {
    left: 0;
    right: auto;
    min-width: 100%;
  }
}
`;

const COMMON_ACTIONS = [
  { code: "open", label: "Открыть карточку" },
  { code: "edit", label: "Изменить" },
  { code: "delete", label: "Удалить", danger: true }
];

const SECTION_ACTIONS = {
  tenants: [{ code: "new-contract", label: "Заключить договор" }],
  rooms: [
    { code: "new-contract", label: "Заключить договор" },
    { code: "new-request", label: "Создать заявку на обслуживание" }
  ],
  contracts: [
    { code: "new-act", label: "Создать акт приема-передачи" },
    { code: "new-certificate", label: "Создать свидетельство" },
    { code: "new-request", label: "Создать заявку на обслуживание" },
    { code: "new-notice", label: "Создать уведомление о задолженности" }
  ],
  acts: [],
  certificates: [{ code: "open-contract", label: "Открыть договор" }],
  requests: [
    { code: "change-request-status", label: "Изменить статус заявки" },
    { code: "open-contract", label: "Открыть договор" }
  ],
  notices: [{ code: "open-contract", label: "Открыть договор" }]
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function defaultFilters() {
  return {
    search: "",
    status: ALL_VALUES,
    areaMin: "",
    areaMax: ""
  };
}

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function digits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function numberValue(value) {
  const prepared = String(value ?? "")
    .replace(/\s/g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const result = Number(prepared);
  return Number.isFinite(result) ? result : 0;
}

function formatMoney(value) {
  const number = numberValue(value);
  return `${number.toLocaleString("ru-RU")} ₽`;
}

function formatArea(value) {
  const number = numberValue(value);
  return `${number.toLocaleString("ru-RU")} м²`;
}

function compareIntegerStrings(left, right) {
  const a = String(left).replace(/^0+/, "") || "0";
  const b = String(right).replace(/^0+/, "") || "0";

  if (a.length !== b.length) return a.length > b.length ? 1 : -1;
  if (a === b) return 0;

  return a > b ? 1 : -1;
}

function inIntegerRange(value, min, max) {
  const raw = digits(value);
  if (!raw) return false;

  return compareIntegerStrings(raw, min) >= 0 && compareIntegerStrings(raw, max) <= 0;
}

function parseRuDate(value) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(value ?? "").trim());
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return { day, month, year, date };
}

function isDateInRange(value, minYear, maxYear, maxInclusive = true) {
  const parsed = parseRuDate(value);
  if (!parsed) return false;
  if (parsed.year < minYear) return false;
  if (maxInclusive) return parsed.year <= maxYear;
  return parsed.year < maxYear;
}

function todayRu(date = new Date()) {
  return new Intl.DateTimeFormat("ru-RU").format(date);
}

function addDaysRu(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return todayRu(date);
}

function daysUntil(value) {
  const parsed = parseRuDate(value);
  if (!parsed) return null;

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  parsed.date.setHours(0, 0, 0, 0);

  return Math.round((parsed.date.getTime() - start.getTime()) / 86400000);
}

function nextStringId(items, prefix) {
  const max = items.reduce((result, item) => {
    const raw = String(item.id ?? "").replace(/\D/g, "");
    const number = Number(raw || 0);
    return Math.max(result, number);
  }, 0);

  return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

function nextRoomId(rooms) {
  const max = rooms.reduce((result, room) => {
    const number = Number(room.id);
    return Number.isFinite(number) ? Math.max(result, number) : result;
  }, 0);

  return String(max + 1);
}

function nextNoticeId(notices) {
  const max = notices.reduce((result, notice) => Math.max(result, Number(notice.id || 0)), 0);
  return String(max + 1);
}

function makeContractNumber(contracts) {
  const year = String(new Date().getFullYear()).slice(-2);
  const max = contracts.reduce((result, contract) => {
    const match = /\/(\d+)$/.exec(String(contract.contractNumber ?? ""));
    return match ? Math.max(result, Number(match[1])) : result;
  }, 0);

  return `ДА-${year}/${String(max + 1).padStart(3, "0")}`;
}

function optionValue(option) {
  return typeof option === "object" ? option.value : option;
}

function optionLabel(option) {
  return typeof option === "object" ? option.label : option;
}

function tenantFullName(tenant) {
  if (!tenant) return "—";

  if (tenant.tenantType === "юридическое лицо") {
    return tenant.companyName || "Юридическое лицо";
  }

  return [tenant.lastName, tenant.firstName, tenant.middleName].filter(Boolean).join(" ") || "Физическое лицо";
}

function tenantDirectorName(tenant) {
  if (!tenant) return "—";
  return [tenant.directorLastName, tenant.directorFirstName, tenant.directorMiddleName].filter(Boolean).join(" ") || "—";
}

function landlordName(db, id) {
  return db.landlords.find((landlord) => String(landlord.id) === String(id))?.name || "—";
}

function tenantName(db, id) {
  return tenantFullName(db.tenants.find((tenant) => String(tenant.id) === String(id)));
}

function roomName(db, id) {
  const room = db.rooms.find((item) => String(item.id) === String(id));
  return room ? `Помещение №${room.id}` : "—";
}

function contractName(db, id) {
  const contract = db.contracts.find((item) => String(item.id) === String(id));
  return contract ? `Договор ${contract.contractNumber}` : "—";
}

function getContractById(db, id) {
  return db.contracts.find((contract) => String(contract.id) === String(id)) || null;
}

function contractDebt(contract) {
  if (!contract) return 0;
  return Math.max(0, numberValue(contract.rentCost) - numberValue(contract.payment));
}

function getContractBadge(contract) {
  const debt = contractDebt(contract);
  const days = daysUntil(contract.endDate);

  if (debt > 0) return "есть задолженность";
  if (days !== null && days <= 30) return "истекает срок";
  return "без задолженности";
}

function getReadingValue(readings, type) {
  const reading = readings?.find((item) => item.meterType === type);
  return reading ? reading.meterValue : "";
}

function readingsToText(readings) {
  if (!readings?.length) return "—";

  return readings
    .map((reading) => `${reading.meterType}: ${reading.meterValue}`)
    .join("; ");
}

function normalizeEntity(sectionKey, values) {
  const v = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value
    ])
  );

  if (sectionKey === "tenants") {
    if (v.tenantType === "физическое лицо") {
      return {
        id: v.id,
        tenantType: v.tenantType,
        lastName: v.lastName,
        firstName: v.firstName,
        middleName: v.middleName,
        passportSeries: digits(v.passportSeries),
        passportNumber: digits(v.passportNumber),
        birthDate: v.birthDate,
        passportIssueDate: v.passportIssueDate,
        inn: digits(v.inn),
        email: v.email,
        phone: digits(v.phone)
      };
    }

    return {
      id: v.id,
      tenantType: v.tenantType,
      companyName: v.companyName,
      legalAddress: v.legalAddress,
      ogrn: digits(v.ogrn),
      inn: digits(v.inn),
      bankName: v.bankName,
      checkingAccount: digits(v.checkingAccount),
      phone: digits(v.phone),
      email: v.email,
      directorLastName: v.directorLastName,
      directorFirstName: v.directorFirstName,
      directorMiddleName: v.directorMiddleName
    };
  }

  if (sectionKey === "rooms") {
    return {
      id: v.id,
      area: String(numberValue(v.area)),
      floor: String(numberValue(v.floor)),
      address: v.address,
      status: v.status
    };
  }

  if (sectionKey === "contracts") {
    return {
      id: v.id,
      contractNumber: v.contractNumber,
      roomId: v.roomId,
      landlordId: v.landlordId,
      tenantId: v.tenantId,
      startDate: v.startDate,
      endDate: v.endDate,
      rentCost: String(numberValue(v.rentCost)),
      payment: String(numberValue(v.payment)),
      lastPaymentDate: v.lastPaymentDate
    };
  }

  if (sectionKey === "payments") {
    return {
      id: v.id,
      contractId: v.contractId,
      amount: String(numberValue(v.amount)),
      paymentDate: v.paymentDate,
      periodStart: v.periodStart,
      periodEnd: v.periodEnd,
      method: v.method,
      status: v.status,
      note: v.note
    };
  }

  if (sectionKey === "acts") {
    return {
      id: v.id,
      contractId: v.contractId,
      settlementDate: v.settlementDate,
      roomCondition: v.roomCondition,
      meterReadings: [
        { meterType: meterTypes[0], meterValue: String(numberValue(v.electricity)) },
        { meterType: meterTypes[1], meterValue: String(numberValue(v.coldWater)) },
        { meterType: meterTypes[2], meterValue: String(numberValue(v.hotWater)) }
      ]
    };
  }

  if (sectionKey === "certificates") {
    return {
      id: v.id,
      contractId: v.contractId,
      cadastralNumber: digits(v.cadastralNumber),
      registrationDate: v.registrationDate,
      registrationNumber: digits(v.registrationNumber)
    };
  }

  if (sectionKey === "requests") {
    return {
      id: v.id,
      contractId: v.contractId,
      roomId: v.roomId,
      tenantRoomContractId: v.tenantRoomContractId,
      description: v.description,
      requestDate: v.requestDate,
      status: v.status
    };
  }

  return {
    id: digits(v.id),
    contractId: v.contractId,
    tenantRoomContractId: v.tenantRoomContractId,
    roomId: v.roomId,
    debtAmount: String(numberValue(v.debtAmount)),
    formationDate: v.formationDate,
    repaymentDeadline: v.repaymentDeadline
  };
}

function validateEntity(sectionKey, entity) {
  const errors = [];

  function required(value, label) {
    if (!String(value ?? "").trim()) errors.push(`поле «${label}» обязательно`);
  }

  function date(value, label, minYear, maxYear, maxInclusive = true) {
    if (!isDateInRange(value, minYear, maxYear, maxInclusive)) {
      const border = maxInclusive ? `${minYear}–${maxYear}` : `${minYear}–${maxYear - 1}`;
      errors.push(`поле «${label}» должно быть датой в формате ДД.ММ.ГГГГ, год ${border}`);
    }
  }

  function range(value, label, min, max) {
    if (!inIntegerRange(value, min, max)) {
      errors.push(`поле «${label}» должно быть в диапазоне ${min}–${max}`);
    }
  }

  if (sectionKey === "tenants") {
    required(entity.id, labels.id);
    required(entity.tenantType, labels.tenantType);

    if (entity.tenantType === "физическое лицо") {
      required(entity.lastName, labels.lastName);
      required(entity.firstName, labels.firstName);
      required(entity.middleName, labels.middleName);
      range(entity.passportSeries, labels.passportSeries, "1000", "9999");
      range(entity.passportNumber, labels.passportNumber, "100000", "999999");
      date(entity.birthDate, labels.birthDate, 1900, 2026);
      date(entity.passportIssueDate, labels.passportIssueDate, 2000, 2026);
    } else {
      required(entity.companyName, labels.companyName);
      required(entity.legalAddress, labels.legalAddress);
      range(entity.ogrn, labels.ogrn, "1000000000000", "9999999999999");
      required(entity.bankName, labels.bankName);
      range(entity.checkingAccount, labels.checkingAccount, "1000000000000000", "9999999999999999");
      required(entity.directorLastName, labels.directorLastName);
      required(entity.directorFirstName, labels.directorFirstName);
      required(entity.directorMiddleName, labels.directorMiddleName);
    }

    range(entity.inn, labels.inn, "1000000000", "9999999999");
    required(entity.email, labels.email);
    range(entity.phone, labels.phone, "70000000000", "79999999999");
  }

  if (sectionKey === "rooms") {
    required(entity.id, labels.id);
    if (numberValue(entity.area) < 0) errors.push(`поле «${labels.area}» должно быть неотрицательным`);
    if (numberValue(entity.floor) < 1 || numberValue(entity.floor) > 10) {
      errors.push(`поле «${labels.floor}» должно быть от 1 до 10`);
    }
    required(entity.address, labels.address);
    if (!roomStatuses.includes(entity.status)) errors.push(`поле «${labels.roomStatus}» выбрано неверно`);
  }

  if (sectionKey === "contracts") {
    required(entity.id, labels.id);
    required(entity.contractNumber, labels.contractNumber);
    required(entity.roomId, labels.roomId);
    required(entity.landlordId, labels.landlordId);
    required(entity.tenantId, labels.tenantId);
    date(entity.startDate, labels.startDate, 2020, 2026);
    date(entity.endDate, labels.endDate, 2020, 2026);
    if (numberValue(entity.rentCost) < 0) errors.push(`поле «${labels.rentCost}» должно быть неотрицательным`);
    if (numberValue(entity.payment) < 0) errors.push(`поле «${labels.payment}» должно быть неотрицательным`);
    date(entity.lastPaymentDate, labels.lastPaymentDate, 2020, 2026);
  }

  if (sectionKey === "payments") {
    required(entity.id, labels.id);
    required(entity.contractId, labels.contractId);
    if (numberValue(entity.amount) < 0) errors.push(`поле «${labels.amount}» должно быть неотрицательным`);
    date(entity.paymentDate, labels.paymentDate, 2020, 2026);
    date(entity.periodStart, labels.periodStart, 2020, 2026);
    date(entity.periodEnd, labels.periodEnd, 2020, 2026);
    if (!paymentMethods.includes(entity.method)) errors.push(`поле «${labels.method}» выбрано неверно`);
    if (!paymentStatuses.includes(entity.status)) errors.push(`поле «${labels.paymentStatus}» выбрано неверно`);
  }

  if (sectionKey === "acts") {
    required(entity.id, labels.id);
    required(entity.contractId, labels.contractId);
    date(entity.settlementDate, labels.settlementDate, 2020, 2026);
    if (!actConditions.includes(entity.roomCondition)) errors.push(`поле «${labels.roomCondition}» выбрано неверно`);
    entity.meterReadings.forEach((reading) => {
      if (!meterTypes.includes(reading.meterType)) errors.push(`прибор учета выбран неверно`);
      if (numberValue(reading.meterValue) < 0) {
        errors.push(`показание «${reading.meterType}» должно быть неотрицательным`);
      }
    });
  }

  if (sectionKey === "certificates") {
    required(entity.id, labels.id);
    required(entity.contractId, labels.contractId);
    range(entity.cadastralNumber, labels.cadastralNumber, "1000000000", "9999999999");
    date(entity.registrationDate, labels.registrationDate, 2020, 2050, false);
    required(entity.registrationNumber, labels.registrationNumber);
  }

  if (sectionKey === "requests") {
    required(entity.id, labels.id);
    required(entity.contractId, labels.contractId);
    required(entity.roomId, labels.roomId);
    required(entity.tenantRoomContractId, labels.tenantRoomContractId);
    required(entity.description, labels.description);
    date(entity.requestDate, labels.requestDate, 2020, 2026);
    if (!requestStatuses.includes(entity.status)) errors.push(`поле «${labels.requestStatus}» выбрано неверно`);
  }

  if (sectionKey === "notices") {
    range(entity.id, labels.id, "1", "999999999999999999");
    required(entity.contractId, labels.contractId);
    required(entity.tenantRoomContractId, labels.tenantRoomContractId);
    required(entity.roomId, labels.roomId);
    if (numberValue(entity.debtAmount) < 0) errors.push(`поле «${labels.debtAmount}» должно быть неотрицательным`);
    date(entity.formationDate, labels.formationDate, 2024, 2100);
    date(entity.repaymentDeadline, labels.repaymentDeadline, 2024, 2100);
  }

  return errors;
}

function Badge({ value }) {
  return <span className={`badge ${badgeClasses[value] || "info"}`}>{value}</span>;
}

function EntityForm({
  getFields,
  initialValues,
  submitLabel,
  danger,
  onSubmit,
  onCancel,
  onFieldChange
}) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");

  const fields = typeof getFields === "function" ? getFields(values) : getFields;
  const visibleFields = fields.filter((field) => !field.showWhen || field.showWhen(values));

  function updateValue(name, value) {
    setValues((current) => {
      const base = { ...current, [name]: value };
      const patch = onFieldChange ? onFieldChange(name, value, base) : null;
      return patch ? { ...base, ...patch } : base;
    });
  }

  function submit(event) {
    event.preventDefault();

    const missing = visibleFields.filter((field) => field.required && !String(values[field.name] ?? "").trim());
    if (missing.length) {
      setError(`Заполните обязательные поля: ${missing.map((field) => field.label).join(", ")}`);
      return;
    }

    const result = onSubmit(values);
    if (result !== false) onCancel();
  }

  return (
    <form onSubmit={submit}>
      <div className="form-grid">
        {error ? <div className="form-error">{error}</div> : null}

        {visibleFields.map((field) => (
          <div className={`field ${field.full ? "full" : ""}`} key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required ? " *" : ""}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                value={values[field.name] ?? ""}
                placeholder={field.placeholder || ""}
                onChange={(event) => updateValue(field.name, event.target.value)}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                value={values[field.name] ?? ""}
                onChange={(event) => updateValue(field.name, event.target.value)}
              >
                {(field.options || []).map((option) => (
                  <option key={optionValue(option)} value={optionValue(option)}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type || "text"}
                min={field.min}
                max={field.max}
                step={field.step}
                value={values[field.name] ?? ""}
                placeholder={field.placeholder || ""}
                onChange={(event) => updateValue(field.name, event.target.value)}
              />
            )}

            {field.hint ? <span className="field-hint">{field.hint}</span> : null}
          </div>
        ))}
      </div>

      <div className="modal-footer" style={{ padding: "18px 0 0" }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className={`btn ${danger ? "btn-danger" : "btn-primary"}`}>
          {submitLabel || "Сохранить"}
        </button>
      </div>
    </form>
  );
}

function AppModal({ modal, onClose }) {
  if (!modal) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="modal">
        <header className="modal-header">
          <div>
            <h3>{modal.title}</h3>
            {modal.subtitle ? <p>{modal.subtitle}</p> : null}
          </div>
          <button className="close-btn" type="button" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </header>

        <div className="modal-body">
          {modal.kind === "form" ? (
            <EntityForm
              getFields={modal.getFields}
              initialValues={modal.initialValues}
              submitLabel={modal.submitLabel}
              danger={modal.danger}
              onSubmit={modal.onSubmit}
              onCancel={onClose}
              onFieldChange={modal.onFieldChange}
            />
          ) : (
            modal.content
          )}
        </div>

        {modal.kind !== "form" ? (
          <footer className="modal-footer">
            {modal.footer || (
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Закрыть
              </button>
            )}
          </footer>
        ) : null}
      </section>
    </div>
  );
}

function App() {
  const [db, setDb] = useState(() => deepClone(initialData));
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [current, setCurrent] = useState("rooms");
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(null);
  const [openedMenu, setOpenedMenu] = useState(null);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);

  const section = sections[current];

  useEffect(() => {
    let cancelled = false;

    apiRequest("/api/data/")
      .then((payload) => {
        if (!cancelled) {
          setDb(payload);
          setApiError("");
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setApiError(`Бэкенд недоступен, используются локальные демо-данные. ${error.message}`);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    function closeMenus(event) {
      if (!event.target.closest(".action-menu-wrap")) setOpenedMenu(null);
    }

    document.addEventListener("click", closeMenus);
    return () => document.removeEventListener("click", closeMenus);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [current, filters.search, filters.status, filters.areaMin, filters.areaMax]);

  const summary = useMemo(() => {
    const freeRooms = db.rooms.filter((room) => room.status === "Свободно").length;
    const occupiedRooms = db.rooms.filter((room) => room.status === "Занято").length;
    const debtContracts = db.contracts.filter((contract) => contractDebt(contract) > 0).length;
    const activeRequests = db.requests.filter((request) => request.status !== "выполнена").length;

    return [
      ["Свободно", freeRooms, "помещения со статусом «Свободно»"],
      ["Занято", occupiedRooms, "помещения со статусом «Занято»"],
      ["Долги", debtContracts, "договоры с неполным платежом"],
      ["Заявки", activeRequests, "заявки не в статусе «выполнена»"]
    ];
  }, [db]);

  const filteredEntries = useMemo(() => {
    const query = normalizeText(filters.search);
    const areaMin = filters.areaMin === "" ? null : numberValue(filters.areaMin);
    const areaMax = filters.areaMax === "" ? null : numberValue(filters.areaMax);

    return db[current]
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        const fullText = normalizeText(
          [
            getEntityTitle(current, item),
            getEntitySubtitle(current, item),
            getFilterValue(current, item),
            ...Object.values(item).flatMap((value) => {
              if (Array.isArray(value)) return value.map((entry) => Object.values(entry).join(" "));
              return String(value);
            })
          ].join(" ")
        );

        const found = !query || fullText.includes(query);
        const statusOk = filters.status === ALL_VALUES || getFilterValue(current, item) === filters.status;

        const area = numberValue(item.area);
        const areaMinOk = current !== "rooms" || areaMin === null || area >= areaMin;
        const areaMaxOk = current !== "rooms" || areaMax === null || area <= areaMax;

        return found && statusOk && areaMinOk && areaMaxOk;
      });
  }, [db, current, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedEntries = filteredEntries.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const drawerItem = useMemo(() => {
    if (!drawer) return null;
    return db[drawer.sectionKey]?.[drawer.index] || null;
  }, [db, drawer]);

  function showToast(message) {
    setToast(message);
  }

  function changeSection(key) {
    setCurrent(key);
    setDrawer(null);
    setFilters(defaultFilters());
    setPage(1);
    setOpenedMenu(null);
  }

  function tenantOptions() {
    return db.tenants.map((tenant) => ({
      value: tenant.id,
      label: `${tenantFullName(tenant)} · ${tenant.tenantType}`
    }));
  }

  function roomOptions() {
    return db.rooms.map((room) => ({
      value: room.id,
      label: `№${room.id} · ${room.area} м² · ${room.status}`
    }));
  }

  function landlordOptions() {
    return db.landlords.map((landlord) => ({
      value: landlord.id,
      label: `${landlord.name} · ИНН ${landlord.inn}`
    }));
  }

  function contractOptions() {
    return db.contracts.map((contract) => ({
      value: contract.id,
      label: `${contract.contractNumber} · ${tenantName(db, contract.tenantId)} · помещение №${contract.roomId}`
    }));
  }

  function getDefaultEntityValues(sectionKey, preset = {}) {
    if (sectionKey === "tenants") {
      return {
        id: nextStringId(db.tenants, "T-"),
        tenantType: tenantTypes[0],
        lastName: "",
        firstName: "",
        middleName: "",
        passportSeries: "",
        passportNumber: "",
        birthDate: "",
        passportIssueDate: "",
        inn: "",
        email: "",
        phone: "",
        companyName: "",
        legalAddress: "",
        ogrn: "",
        bankName: "",
        checkingAccount: "",
        directorLastName: "",
        directorFirstName: "",
        directorMiddleName: "",
        ...preset
      };
    }

    if (sectionKey === "rooms") {
      return {
        id: nextRoomId(db.rooms),
        area: "",
        floor: "1",
        address: "",
        status: roomStatuses[0],
        ...preset
      };
    }

    if (sectionKey === "contracts") {
      return {
        id: nextStringId(db.contracts, "C-"),
        contractNumber: makeContractNumber(db.contracts),
        roomId: db.rooms[0]?.id || "",
        landlordId: db.landlords[0]?.id || "",
        tenantId: db.tenants[0]?.id || "",
        startDate: todayRu(),
        endDate: "31.12.2026",
        rentCost: "",
        payment: "0",
        lastPaymentDate: todayRu(),
        ...preset
      };
    }

    if (sectionKey === "payments") {
      const contract = getContractById(db, preset.contractId) || db.contracts[0];
      return {
        id: nextStringId(db.payments || [], "P-"),
        contractId: contract?.id || "",
        amount: contract?.rentCost || "0",
        paymentDate: todayRu(),
        periodStart: todayRu(),
        periodEnd: addDaysRu(30),
        method: paymentMethods[0],
        status: paymentStatuses[0],
        note: "",
        ...preset
      };
    }

    if (sectionKey === "acts") {
      return {
        id: nextStringId(db.acts, "A-"),
        contractId: db.contracts[0]?.id || "",
        settlementDate: todayRu(),
        roomCondition: actConditions[1],
        electricity: "0",
        coldWater: "0",
        hotWater: "0",
        ...preset
      };
    }

    if (sectionKey === "certificates") {
      return {
        id: nextStringId(db.certificates, "S-"),
        contractId: db.contracts[0]?.id || "",
        cadastralNumber: "",
        registrationDate: todayRu(),
        registrationNumber: "",
        ...preset
      };
    }

    if (sectionKey === "requests") {
      const contract = getContractById(db, preset.contractId) || db.contracts[0];

      return {
        id: nextStringId(db.requests, "З-"),
        contractId: contract?.id || "",
        roomId: preset.roomId || contract?.roomId || "",
        tenantRoomContractId: contract?.id || "",
        description: "",
        requestDate: todayRu(),
        status: requestStatuses[0],
        ...preset
      };
    }

    const contract = getContractById(db, preset.contractId) || db.contracts[0];

    return {
      id: nextNoticeId(db.notices),
      contractId: contract?.id || "",
      tenantRoomContractId: contract?.id || "",
      roomId: preset.roomId || contract?.roomId || "",
      debtAmount: contract ? String(contractDebt(contract)) : "0",
      formationDate: todayRu(),
      repaymentDeadline: addDaysRu(10),
      ...preset
    };
  }

  function getFormValues(sectionKey, item) {
    if (sectionKey === "payments") {
      const contract = getContractById(db, preset.contractId) || db.contracts[0];
      return {
        id: nextStringId(db.payments || [], "P-"),
        contractId: contract?.id || "",
        amount: contract?.rentCost || "0",
        paymentDate: todayRu(),
        periodStart: todayRu(),
        periodEnd: addDaysRu(30),
        method: paymentMethods[0],
        status: paymentStatuses[0],
        note: "",
        ...preset
      };
    }

    if (sectionKey === "acts") {
      return {
        ...item,
        electricity: getReadingValue(item.meterReadings, meterTypes[0]),
        coldWater: getReadingValue(item.meterReadings, meterTypes[1]),
        hotWater: getReadingValue(item.meterReadings, meterTypes[2])
      };
    }

    return { ...item };
  }

  function getEntityFields(sectionKey) {
    if (sectionKey === "tenants") {
      return [
        { name: "id", label: labels.id, required: true },
        { name: "tenantType", label: labels.tenantType, type: "select", options: tenantTypes, required: true },

        { name: "lastName", label: labels.lastName, required: true, showWhen: (v) => v.tenantType === "физическое лицо" },
        { name: "firstName", label: labels.firstName, required: true, showWhen: (v) => v.tenantType === "физическое лицо" },
        { name: "middleName", label: labels.middleName, required: true, showWhen: (v) => v.tenantType === "физическое лицо" },
        { name: "passportSeries", label: labels.passportSeries, required: true, hint: "4 цифры: 1000–9999", showWhen: (v) => v.tenantType === "физическое лицо" },
        { name: "passportNumber", label: labels.passportNumber, required: true, hint: "6 цифр: 100000–999999", showWhen: (v) => v.tenantType === "физическое лицо" },
        { name: "birthDate", label: labels.birthDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 1900–2026", showWhen: (v) => v.tenantType === "физическое лицо" },
        { name: "passportIssueDate", label: labels.passportIssueDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2000–2026", showWhen: (v) => v.tenantType === "физическое лицо" },

        { name: "companyName", label: labels.companyName, required: true, showWhen: (v) => v.tenantType === "юридическое лицо" },
        { name: "legalAddress", label: labels.legalAddress, required: true, full: true, showWhen: (v) => v.tenantType === "юридическое лицо" },
        { name: "ogrn", label: labels.ogrn, required: true, hint: "13 цифр", showWhen: (v) => v.tenantType === "юридическое лицо" },
        { name: "bankName", label: labels.bankName, required: true, showWhen: (v) => v.tenantType === "юридическое лицо" },
        { name: "checkingAccount", label: labels.checkingAccount, required: true, hint: "16 цифр", showWhen: (v) => v.tenantType === "юридическое лицо" },
        { name: "directorLastName", label: labels.directorLastName, required: true, showWhen: (v) => v.tenantType === "юридическое лицо" },
        { name: "directorFirstName", label: labels.directorFirstName, required: true, showWhen: (v) => v.tenantType === "юридическое лицо" },
        { name: "directorMiddleName", label: labels.directorMiddleName, required: true, showWhen: (v) => v.tenantType === "юридическое лицо" },

        { name: "inn", label: labels.inn, required: true, hint: "10 цифр" },
        { name: "email", label: labels.email, required: true },
        { name: "phone", label: labels.phone, required: true, hint: "11 цифр в формате 7XXXXXXXXXX" }
      ];
    }

    if (sectionKey === "rooms") {
      return [
        { name: "id", label: labels.id, required: true },
        { name: "area", label: labels.area, type: "number", min: 0, step: "0.01", required: true },
        { name: "floor", label: labels.floor, type: "number", min: 1, max: 10, required: true },
        { name: "address", label: labels.address, full: true, required: true },
        { name: "status", label: labels.roomStatus, type: "select", options: roomStatuses, required: true }
      ];
    }

    if (sectionKey === "contracts") {
      return [
        { name: "id", label: labels.id, required: true },
        { name: "contractNumber", label: labels.contractNumber, required: true },
        { name: "roomId", label: labels.roomId, type: "select", options: roomOptions(), required: true },
        { name: "landlordId", label: labels.landlordId, type: "select", options: landlordOptions(), required: true },
        { name: "tenantId", label: labels.tenantId, type: "select", options: tenantOptions(), required: true },
        { name: "startDate", label: labels.startDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" },
        { name: "endDate", label: labels.endDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" },
        { name: "rentCost", label: labels.rentCost, type: "number", min: 0, step: "0.01", required: true },
        { name: "payment", label: labels.payment, type: "number", min: 0, step: "0.01", required: true },
        { name: "lastPaymentDate", label: labels.lastPaymentDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" }
      ];
    }

    if (sectionKey === "payments") {
      return [
        { name: "id", label: labels.id, required: true },
        { name: "contractId", label: labels.contractId, type: "select", options: contractOptions(), required: true },
        { name: "amount", label: labels.amount, type: "number", min: 0, step: "0.01", required: true },
        { name: "paymentDate", label: labels.paymentDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" },
        { name: "periodStart", label: labels.periodStart, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" },
        { name: "periodEnd", label: labels.periodEnd, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" },
        { name: "method", label: labels.method, type: "select", options: paymentMethods, required: true },
        { name: "status", label: labels.paymentStatus, type: "select", options: paymentStatuses, required: true },
        { name: "note", label: labels.note, full: true, type: "textarea" }
      ];
    }

    if (sectionKey === "acts") {
      return [
        { name: "id", label: labels.id, required: true },
        { name: "contractId", label: labels.contractId, type: "select", options: contractOptions(), required: true },
        { name: "settlementDate", label: labels.settlementDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" },
        { name: "roomCondition", label: labels.roomCondition, type: "select", options: actConditions, required: true },
        { name: "electricity", label: meterTypes[0], type: "number", min: 0, step: "0.01", required: true },
        { name: "coldWater", label: meterTypes[1], type: "number", min: 0, step: "0.01", required: true },
        { name: "hotWater", label: meterTypes[2], type: "number", min: 0, step: "0.01", required: true }
      ];
    }

    if (sectionKey === "certificates") {
      return [
        { name: "id", label: labels.id, required: true },
        { name: "contractId", label: labels.contractId, type: "select", options: contractOptions(), required: true },
        { name: "cadastralNumber", label: labels.cadastralNumber, required: true, hint: "10 цифр" },
        { name: "registrationDate", label: labels.registrationDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2049" },
        { name: "registrationNumber", label: labels.registrationNumber, required: true, hint: "Непустой набор цифр" }
      ];
    }

    if (sectionKey === "requests") {
      return [
        { name: "id", label: labels.id, required: true },
        { name: "contractId", label: labels.contractId, type: "select", options: contractOptions(), required: true },
        { name: "tenantRoomContractId", label: labels.tenantRoomContractId, type: "select", options: contractOptions(), required: true },
        { name: "roomId", label: labels.roomId, type: "select", options: roomOptions(), required: true },
        { name: "description", label: labels.description, full: true, type: "textarea", required: true },
        { name: "requestDate", label: labels.requestDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2020–2026" },
        { name: "status", label: labels.requestStatus, type: "select", options: requestStatuses, required: true }
      ];
    }

    return [
      { name: "id", label: labels.id, required: true, hint: "Положительное натуральное число" },
      { name: "contractId", label: labels.contractId, type: "select", options: contractOptions(), required: true },
      { name: "tenantRoomContractId", label: labels.tenantRoomContractId, type: "select", options: contractOptions(), required: true },
      { name: "roomId", label: labels.roomId, type: "select", options: roomOptions(), required: true },
      { name: "debtAmount", label: labels.debtAmount, type: "number", min: 0, step: "0.01", required: true },
      { name: "formationDate", label: labels.formationDate, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2024–2100" },
      { name: "repaymentDeadline", label: labels.repaymentDeadline, required: true, placeholder: "ДД.ММ.ГГГГ", hint: "Год 2024–2100" }
    ];
  }

  function onContractFieldChange(name, value) {
    if (name !== "contractId") return null;

    const contract = getContractById(db, value);
    if (!contract) return null;

    return {
      roomId: contract.roomId,
      tenantRoomContractId: contract.id,
      debtAmount: String(contractDebt(contract))
    };
  }

  function openFormModal(config) {
    setModal({ kind: "form", ...config });
  }

  function createEntity(sectionKey, values) {
    const entity = normalizeEntity(sectionKey, values);
    const errors = validateEntity(sectionKey, entity);

    if (errors.length) {
      showToast(errors[0]);
      return false;
    }

    if (db[sectionKey].some((item) => String(item.id) === String(entity.id))) {
      showToast(`Запись с идентификатором ${entity.id} уже существует`);
      return false;
    }

    setDb((previous) => {
      let next = {
        ...previous,
        [sectionKey]: [...previous[sectionKey], entity]
      };

      if (sectionKey === "contracts") {
        next = {
          ...next,
          rooms: previous.rooms.map((room) =>
            String(room.id) === String(entity.roomId)
              ? { ...room, status: "Занято" }
              : room
          )
        };
      }

      return next;
    });

    apiCreate(sectionKey, entity)
      .then((saved) => {
        setDb((previous) => ({
          ...previous,
          [sectionKey]: previous[sectionKey].map((item) => String(item.id) === String(entity.id) ? saved : item)
        }));
      })
      .catch((error) => showToast(`Не удалось сохранить на сервере: ${error.message}`));

    setCurrent(sectionKey);
    setFilters(defaultFilters());
    setPage(Math.ceil((db[sectionKey].length + 1) / PAGE_SIZE));
    setDrawer({ sectionKey, index: db[sectionKey].length });
    showToast(`${getEntityTitle(sectionKey, entity)} добавлено`);
    return true;
  }

  function updateEntity(sectionKey, index, values) {
    const entity = normalizeEntity(sectionKey, values);
    const errors = validateEntity(sectionKey, entity);

    if (errors.length) {
      showToast(errors[0]);
      return false;
    }

    if (db[sectionKey].some((item, itemIndex) => itemIndex !== index && String(item.id) === String(entity.id))) {
      showToast(`Запись с идентификатором ${entity.id} уже существует`);
      return false;
    }

    setDb((previous) => ({
      ...previous,
      [sectionKey]: previous[sectionKey].map((item, itemIndex) =>
        itemIndex === index ? entity : item
      )
    }));

    apiUpdate(sectionKey, entity.id, entity)
      .then((saved) => {
        setDb((previous) => ({
          ...previous,
          [sectionKey]: previous[sectionKey].map((item) => String(item.id) === String(entity.id) ? saved : item)
        }));
      })
      .catch((error) => showToast(`Не удалось обновить на сервере: ${error.message}`));

    showToast(`${getEntityTitle(sectionKey, entity)} изменено`);
    return true;
  }

  function deleteEntity(sectionKey, index) {
    const item = db[sectionKey][index];
    const title = getEntityTitle(sectionKey, item);

    if (!window.confirm(`Удалить запись «${title}»?`)) return;

    setDb((previous) => ({
      ...previous,
      [sectionKey]: previous[sectionKey].filter((_, itemIndex) => itemIndex !== index)
    }));

    apiDelete(sectionKey, item.id)
      .catch((error) => showToast(`Не удалось удалить на сервере: ${error.message}`));

    setDrawer(null);
    showToast(`${title} удалено`);
  }

  function openCreateEntity(sectionKey, preset = {}, title = null) {
    openFormModal({
      title: title || sections[sectionKey].action.replace("+ ", ""),
      subtitle: sections[sectionKey].title,
      getFields: () => getEntityFields(sectionKey),
      initialValues: getDefaultEntityValues(sectionKey, preset),
      submitLabel: "Сохранить",
      onFieldChange: ["requests", "notices"].includes(sectionKey) ? onContractFieldChange : undefined,
      onSubmit: (values) => createEntity(sectionKey, values)
    });
  }

  function openEditEntity(sectionKey, index) {
    const item = db[sectionKey][index];

    openFormModal({
      title: "Изменить запись",
      subtitle: getEntityTitle(sectionKey, item),
      getFields: () => getEntityFields(sectionKey),
      initialValues: getFormValues(sectionKey, item),
      submitLabel: "Сохранить",
      onFieldChange: ["requests", "notices"].includes(sectionKey) ? onContractFieldChange : undefined,
      onSubmit: (values) => updateEntity(sectionKey, index, values)
    });
  }

  function openNewContractForItem(item, sourceSection) {
    if (sourceSection === "rooms") {
      openCreateEntity("contracts", { roomId: item.id }, "Заключение договора");
      return;
    }

    if (sourceSection === "tenants") {
      openCreateEntity("contracts", { tenantId: item.id }, "Заключение договора");
    }
  }

  function openNewRequestForItem(item, sourceSection) {
    if (sourceSection === "rooms") {
      const contract = db.contracts.find((candidate) => String(candidate.roomId) === String(item.id));

      openCreateEntity(
        "requests",
        {
          contractId: contract?.id || db.contracts[0]?.id || "",
          tenantRoomContractId: contract?.id || db.contracts[0]?.id || "",
          roomId: item.id
        },
        "Заявка на обслуживание"
      );
      return;
    }

    if (sourceSection === "contracts") {
      openCreateEntity(
        "requests",
        {
          contractId: item.id,
          tenantRoomContractId: item.id,
          roomId: item.roomId
        },
        "Заявка на обслуживание"
      );
    }
  }

  function openNewActForContract(contract) {
    openCreateEntity("acts", { contractId: contract.id }, "Акт приема-передачи");
  }

  function openNewCertificateForContract(contract) {
    openCreateEntity("certificates", { contractId: contract.id }, "Свидетельство о праве собственности");
  }

  function openNewNoticeForContract(contract) {
    openCreateEntity(
      "notices",
      {
        contractId: contract.id,
        tenantRoomContractId: contract.id,
        roomId: contract.roomId,
        debtAmount: String(contractDebt(contract))
      },
      "Уведомление о задолженности"
    );
  }

  function openChangeRequestStatus(request, index) {
    openFormModal({
      title: "Изменить статус заявки",
      subtitle: getEntityTitle("requests", request),
      getFields: () => [
        { name: "status", label: labels.requestStatus, type: "select", options: requestStatuses, required: true }
      ],
      initialValues: { status: request.status },
      submitLabel: "Сохранить",
      onSubmit: (values) => {
        const updated = { ...request, status: values.status };
        setDb((previous) => ({
          ...previous,
          requests: previous.requests.map((item, itemIndex) =>
            itemIndex === index ? updated : item
          )
        }));
        apiUpdate("requests", updated.id, updated)
          .catch((error) => showToast(`Не удалось обновить на сервере: ${error.message}`));
        showToast(`Статус заявки изменен на «${values.status}»`);
        return true;
      }
    });
  }

  function openRelatedContract(item) {
    const contractId = item.contractId || item.tenantRoomContractId;
    const index = db.contracts.findIndex((contract) => String(contract.id) === String(contractId));

    if (index < 0) {
      showToast("Связанный договор не найден");
      return;
    }

    setCurrent("contracts");
    setFilters(defaultFilters());
    setPage(Math.floor(index / PAGE_SIZE) + 1);
    setDrawer({ sectionKey: "contracts", index });
  }

  function handleAction(code, item, index) {
    setOpenedMenu(null);

    if (code === "open") {
      setDrawer({ sectionKey: current, index });
      return;
    }

    if (code === "edit") {
      openEditEntity(current, index);
      return;
    }

    if (code === "delete") {
      deleteEntity(current, index);
      return;
    }

    if (code === "new-contract") {
      openNewContractForItem(item, current);
      return;
    }

    if (code === "new-request") {
      openNewRequestForItem(item, current);
      return;
    }

    if (code === "new-act") {
      openNewActForContract(item);
      return;
    }

    if (code === "new-certificate") {
      openNewCertificateForContract(item);
      return;
    }

    if (code === "new-notice") {
      openNewNoticeForContract(item);
      return;
    }

    if (code === "change-request-status") {
      openChangeRequestStatus(item, index);
      return;
    }

    if (code === "open-contract") {
      openRelatedContract(item);
    }
  }

  function runSectionAction(kind) {
    if (kind === "primary") {
      openCreateEntity(current);
      return;
    }

    if (current === "rooms") {
      setFilters({ ...defaultFilters(), status: "Свободно" });
      return;
    }

    if (current === "contracts") {
      setFilters({ ...defaultFilters(), status: "есть задолженность" });
      return;
    }

    if (current === "tenants") {
      setFilters({ ...defaultFilters(), status: "физическое лицо" });
      return;
    }

    setFilters(defaultFilters());
  }

  function getEntityTitle(sectionKey, item) {
    if (sectionKey === "tenants") return tenantFullName(item);
    if (sectionKey === "rooms") return `Помещение №${item.id}`;
    if (sectionKey === "contracts") return `Договор ${item.contractNumber}`;
    if (sectionKey === "payments") return `Платеж ${item.id}`;
    if (sectionKey === "acts") return `Акт ${item.id}`;
    if (sectionKey === "certificates") return `Свидетельство ${item.id}`;
    if (sectionKey === "requests") return `Заявка ${item.id}`;
    return `Уведомление ${item.id}`;
  }

  function getEntitySubtitle(sectionKey, item) {
    if (sectionKey === "tenants") return item.tenantType;
    if (sectionKey === "rooms") return `${formatArea(item.area)}, этаж ${item.floor}`;
    if (sectionKey === "contracts") return `${tenantName(db, item.tenantId)} · ${roomName(db, item.roomId)}`;
    if (sectionKey === "payments") return `${contractName(db, item.contractId)} · ${formatMoney(item.amount)}`;
    if (sectionKey === "acts") return `${contractName(db, item.contractId)} · ${item.roomCondition}`;
    if (sectionKey === "certificates") return `Кадастровый номер ${item.cadastralNumber}`;
    if (sectionKey === "requests") return `${roomName(db, item.roomId)} · ${item.status}`;
    return `${roomName(db, item.roomId)} · ${formatMoney(item.debtAmount)}`;
  }

  function getFilterValue(sectionKey, item) {
    if (sectionKey === "tenants") return item.tenantType;
    if (sectionKey === "rooms") return item.status;
    if (sectionKey === "contracts") return getContractBadge(item);
    if (sectionKey === "payments") return item.status;
    if (sectionKey === "acts") return item.roomCondition;
    if (sectionKey === "requests") return item.status;
    if (sectionKey === "notices") return "уведомление";
    return ALL_VALUES;
  }

  function getVisualIcon(sectionKey, item) {
    if (sectionKey === "tenants") return item.tenantType === "физическое лицо" ? "ФЛ" : "ЮЛ";
    if (sectionKey === "rooms") return "П";
    if (sectionKey === "contracts") return contractDebt(item) > 0 ? "!" : "ДА";
    if (sectionKey === "payments") return item.status === "оплачен" ? "₽" : "!";
    if (sectionKey === "acts") return "АК";
    if (sectionKey === "certificates") return "СВ";
    if (sectionKey === "requests") return item.status === "выполнена" ? "✓" : "З";
    return "УВ";
  }

  function getVisualClass(sectionKey, item) {
    const value = getFilterValue(sectionKey, item);

    if (["Свободно", "без задолженности", "выполнена", "физическое лицо", "отличное", "хорошее", "оплачен"].includes(value)) {
      return "icon-good";
    }

    if (["Занято", "истекает срок", "в работе", "удовлетворительное", "частично оплачен"].includes(value)) {
      return "icon-warning";
    }

    if (["в ремонте", "есть задолженность", "требует ремонта", "просрочен"].includes(value)) {
      return "icon-bad";
    }

    if (["юридическое лицо", "зарегистрирована", "уведомление"].includes(value)) {
      return "icon-purple";
    }

    return "icon-info";
  }

  function displayValue(key, value, sectionKey, item) {
    if (value === undefined || value === null || value === "") return "—";

    if (key === "tenantId") return tenantName(db, value);
    if (key === "landlordId") return landlordName(db, value);
    if (key === "roomId") return roomName(db, value);
    if (key === "contractId" || key === "tenantRoomContractId") return contractName(db, value);
    if (key === "area") return formatArea(value);
    if (["rentCost", "payment", "amount", "debtAmount", "__debt"].includes(key)) return formatMoney(value);
    if (key === "meterReadings") return readingsToText(value);
    if (key === "__contractStatus") return getContractBadge(item);
    if (key === "__directorName") return tenantDirectorName(item);

    return String(value);
  }

  function getDetailRows(sectionKey, item) {
    const base = Object.entries(item).map(([key, value]) => [key, value]);

    if (sectionKey === "contracts") {
      base.push(["__contractStatus", getContractBadge(item)]);
      base.push(["__debt", String(contractDebt(item))]);
    }

    if (sectionKey === "tenants" && item.tenantType === "юридическое лицо") {
      base.push(["__directorName", tenantDirectorName(item)]);
    }

    return base;
  }

  function renderRelatedInfo(sectionKey, item) {
    if (sectionKey === "rooms") {
      const contracts = db.contracts.filter((contract) => String(contract.roomId) === String(item.id));
      const requests = db.requests.filter((request) => String(request.roomId) === String(item.id));

      return (
        <section className="linked-box">
          <h4>Связи помещения</h4>
          <p>Показаны договоры аренды и заявки на обслуживание, связанные с выбранным помещением.</p>

          <div className="linked-grid">
            {contracts.map((contract) => (
              <article className="linked-card" key={contract.id}>
                <strong>{contractName(db, contract.id)}</strong>
                <small>
                  Арендатор: {tenantName(db, contract.tenantId)}
                  <br />
                  Срок: {contract.startDate} — {contract.endDate}
                </small>
              </article>
            ))}

            {requests.map((request) => (
              <article className="linked-card" key={request.id}>
                <strong>Заявка {request.id}</strong>
                <small>
                  {request.description}
                  <br />
                  Статус: {request.status}
                </small>
              </article>
            ))}

            {!contracts.length && !requests.length ? (
              <article className="linked-card">
                <strong>Связей нет</strong>
                <small>Для помещения пока нет договоров и заявок.</small>
              </article>
            ) : null}
          </div>
        </section>
      );
    }

    if (sectionKey === "contracts") {
      const landlord = db.landlords.find((entry) => entry.id === item.landlordId);
      const acts = db.acts.filter((act) => act.contractId === item.id);
      const certificates = db.certificates.filter((certificate) => certificate.contractId === item.id);
      const notices = db.notices.filter((notice) => notice.contractId === item.id);

      return (
        <section className="linked-box">
          <h4>Реквизиты и связанные объекты</h4>
          <p>Здесь отображаются реквизиты арендодателя, акт, свидетельство и уведомления по договору.</p>

          <div className="linked-grid">
            {landlord ? (
              <article className="linked-card">
                <strong>{landlord.name}</strong>
                <small>
                  ИНН: {landlord.inn}
                  <br />
                  Юридический адрес: {landlord.legalAddress}
                  <br />
                  Банковские реквизиты: {landlord.bankDetails}
                </small>
              </article>
            ) : null}

            {acts.map((act) => (
              <article className="linked-card" key={act.id}>
                <strong>Акт {act.id}</strong>
                <small>
                  Дата заселения: {act.settlementDate}
                  <br />
                  Состояние: {act.roomCondition}
                  <br />
                  Показания: {readingsToText(act.meterReadings)}
                </small>
              </article>
            ))}

            {certificates.map((certificate) => (
              <article className="linked-card" key={certificate.id}>
                <strong>Свидетельство {certificate.id}</strong>
                <small>
                  Кадастровый номер: {certificate.cadastralNumber}
                  <br />
                  Дата регистрации: {certificate.registrationDate}
                </small>
              </article>
            ))}

            {notices.map((notice) => (
              <article className="linked-card" key={notice.id}>
                <strong>Уведомление {notice.id}</strong>
                <small>
                  Сумма: {formatMoney(notice.debtAmount)}
                  <br />
                  Срок погашения: {notice.repaymentDeadline}
                </small>
              </article>
            ))}
          </div>
        </section>
      );
    }

    return null;
  }

  function renderCard(item, index) {
    const menuId = `${current}-${index}`;
    const actions = [...COMMON_ACTIONS, ...(SECTION_ACTIONS[current] || [])];
    const badge = getFilterValue(current, item);

    return (
      <article className="item-card" key={`${current}-${index}`}>
        <div className="card-visual">
          <div className={`visual-icon ${getVisualClass(current, item)}`}>{getVisualIcon(current, item)}</div>
          <div className="visual-note">{getEntitySubtitle(current, item)}</div>
        </div>

        <div className="card-content">
          <div className="card-title-row">
            <div>
              <h3 className="card-title">{getEntityTitle(current, item)}</h3>
              <p className="card-subtitle">{getEntitySubtitle(current, item)}</p>
            </div>
            <Badge value={badge} />
          </div>

          <div className="meta-list">
            {section.meta.map((row) => (
              <div className="meta-row" key={row.key}>
                <span>{row.label}</span>
                <strong>{displayValue(row.key, item[row.key], current, item)}</strong>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <button className="btn btn-primary" type="button" onClick={() => setDrawer({ sectionKey: current, index })}>
              Подробнее
            </button>

            <div className="action-menu-wrap">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenedMenu((opened) => (opened === menuId ? null : menuId));
                }}
              >
                Действия ▾
              </button>

              <div className={`actions-menu ${openedMenu === menuId ? "open" : ""}`}>
                {actions.map((action) => (
                  <button
                    className={`menu-item ${action.danger ? "danger" : ""}`}
                    type="button"
                    key={action.code}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAction(action.code, item, index);
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  function renderDrawer() {
    if (!drawerItem || !drawer) return null;

    const drawerSection = sections[drawer.sectionKey];
    const badge = getFilterValue(drawer.sectionKey, drawerItem);

    return (
      <div
        className="drawer-backdrop open"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setDrawer(null);
        }}
      >
        <aside className="drawer">
          <div className="drawer-header">
            <div>
              <h3>{getEntityTitle(drawer.sectionKey, drawerItem)}</h3>
              <p>{drawerSection.title}</p>
            </div>
            <button className="close-btn" type="button" onClick={() => setDrawer(null)} aria-label="Закрыть">
              ×
            </button>
          </div>

          <Badge value={badge} />

          <div className="details">
            {getDetailRows(drawer.sectionKey, drawerItem).map(([key, value]) => (
              <div className="detail-row" key={key}>
                <span>{labels[key] || key}</span>
                <span>{displayValue(key, value, drawer.sectionKey, drawerItem)}</span>
              </div>
            ))}
          </div>

          {renderRelatedInfo(drawer.sectionKey, drawerItem)}

          <div className="quick-actions">
            <button className="btn btn-primary" type="button" onClick={() => openEditEntity(drawer.sectionKey, drawer.index)}>
              Изменить
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setDrawer(null)}>
              Закрыть
            </button>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="page">
        <header className="hero">
          <div className="hero-inner">
            <div className="brand">
              <div className="brand-icon">A</div>
              <div>
                <strong>Аренда PRO</strong>
              </div>
            </div>

            <aside className="manager-card">
              <div className="avatar">М</div>
              <div>
                <strong>Менеджер</strong>
                <span>управление помещениями и договорами</span>
              </div>
            </aside>
          </div>
        </header>

        <main className="main">
          {isLoading ? (
            <div className="empty" style={{ marginBottom: 20 }}>Загрузка данных из SQLite через Django API...</div>
          ) : null}
          {apiError ? (
            <div className="empty" style={{ marginBottom: 20 }}>{apiError}</div>
          ) : null}

          <section className="summary">
            {summary.map(([title, value, text]) => (
              <article className="summary-card" key={title}>
                <span>{title}</span>
                <strong>{value}</strong>
                <small>{text}</small>
              </article>
            ))}
          </section>

          <section className="catalog-shell">
            <nav className="tabs">
              {Object.entries(sections).map(([key, tabSection]) => (
                <button
                  className={`tab ${key === current ? "active" : ""}`}
                  type="button"
                  key={key}
                  onClick={() => changeSection(key)}
                >
                  {tabSection.tab}
                  <span className="tab-count">{db[key].length}</span>
                </button>
              ))}
            </nav>

            <div className="catalog-head">
              <div>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>

              <div className="catalog-actions">
                <button className="btn btn-primary" type="button" onClick={() => runSectionAction("primary")}>
                  {section.action}
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => runSectionAction("secondary")}>
                  {section.secondAction}
                </button>
              </div>
            </div>

            <div className={`filters ${current === "rooms" ? "rooms" : ""}`}>
              <div className="field">
                <label htmlFor="searchInput">Поиск</label>
                <input
                  id="searchInput"
                  type="search"
                  placeholder="Номер, арендатор, договор, помещение или описание"
                  value={filters.search}
                  onChange={(event) => setFilters((old) => ({ ...old, search: event.target.value }))}
                />
              </div>

              <div className="field">
                <label htmlFor="statusFilter">Фильтр</label>
                <select
                  id="statusFilter"
                  value={filters.status}
                  onChange={(event) => setFilters((old) => ({ ...old, status: event.target.value }))}
                >
                  {[ALL_VALUES, ...(section.filters || [])].map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {current === "rooms" ? (
                <>
                  <div className="field">
                    <label htmlFor="areaMin">Площадь от, м²</label>
                    <input
                      id="areaMin"
                      type="number"
                      min="0"
                      step="0.01"
                      value={filters.areaMin}
                      onChange={(event) => setFilters((old) => ({ ...old, areaMin: event.target.value }))}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="areaMax">Площадь до, м²</label>
                    <input
                      id="areaMax"
                      type="number"
                      min="0"
                      step="0.01"
                      value={filters.areaMax}
                      onChange={(event) => setFilters((old) => ({ ...old, areaMax: event.target.value }))}
                    />
                  </div>
                </>
              ) : null}

              <div className="field">
                <label>&nbsp;</label>
                <button className="btn btn-secondary" type="button" onClick={() => setFilters(defaultFilters())}>
                  Сбросить
                </button>
              </div>
            </div>

            <div className="catalog-body">
              <div className="cards-grid">
                {paginatedEntries.length ? (
                  paginatedEntries.map(({ item, index }) => renderCard(item, index))
                ) : (
                  <div className="empty">Ничего не найдено. Попробуйте изменить поиск или фильтр.</div>
                )}
              </div>

              <div className="pagination">
                <div className="pagination-info">
                  Страница {safePage} из {totalPages}. Найдено записей: {filteredEntries.length}.
                </div>

                <div className="pagination-actions">
                  <button className="btn btn-secondary" type="button" disabled={safePage <= 1} onClick={() => setPage(1)}>
                    Первая
                  </button>
                  <button className="btn btn-secondary" type="button" disabled={safePage <= 1} onClick={() => setPage((old) => Math.max(1, old - 1))}>
                    Назад
                  </button>
                  <button className="btn btn-primary" type="button" disabled={safePage >= totalPages} onClick={() => setPage((old) => Math.min(totalPages, old + 1))}>
                    Вперед
                  </button>
                  <button className="btn btn-secondary" type="button" disabled={safePage >= totalPages} onClick={() => setPage(totalPages)}>
                    Последняя
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {renderDrawer()}

      <AppModal modal={modal} onClose={() => setModal(null)} />

      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </>
  );
}

export default App;