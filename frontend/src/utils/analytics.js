"use client";

import { sendGTMEvent } from "./GTM";

// Eventos de Autenticação
export const trackAuthEvent = (action, method = "email") => {
   sendGTMEvent("auth_event", {
      action,
      method,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Navegação
export const trackNavigation = (from, to) => {
   sendGTMEvent("navigation", {
      from_page: from,
      to_page: to,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Motorista
export const trackDriverEvent = (action, driverId, details = {}) => {
   sendGTMEvent("driver_event", {
      action,
      driver_id: driverId,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Veículo
export const trackCarEvent = (action, carId, details = {}) => {
   sendGTMEvent("car_event", {
      action,
      car_id: carId,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Gestor
export const trackManagerEvent = (action, managerId, details = {}) => {
   sendGTMEvent("manager_event", {
      action,
      manager_id: managerId,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Operação
export const trackOperationEvent = (action, eventId, details = {}) => {
   sendGTMEvent("operation_event", {
      action,
      event_id: eventId,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de UI/UX
export const trackUIInteraction = (element, action, details = {}) => {
   sendGTMEvent("ui_interaction", {
      element,
      action,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Erro
export const trackError = (errorType, errorMessage, details = {}) => {
   sendGTMEvent("error_event", {
      error_type: errorType,
      error_message: errorMessage,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Performance
export const trackPerformance = (metric, value, details = {}) => {
   sendGTMEvent("performance_metric", {
      metric,
      value,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Busca
export const trackSearch = (searchTerm, results, details = {}) => {
   sendGTMEvent("search_event", {
      search_term: searchTerm,
      results_count: results,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Filtro
export const trackFilter = (filterType, filterValue, details = {}) => {
   sendGTMEvent("filter_event", {
      filter_type: filterType,
      filter_value: filterValue,
      ...details,
      timestamp: new Date().toISOString(),
   });
};

// Eventos de Relatório
export const trackReport = (reportType, details = {}) => {
   sendGTMEvent("report_event", {
      report_type: reportType,
      ...details,
      timestamp: new Date().toISOString(),
   });
};
