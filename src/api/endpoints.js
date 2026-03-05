import { api } from "./client";

export const AuthAPI = {
  login: (email, password) => api.post("/api/auth/login", { email, password }),
};

export const EventsAPI = {
  list: () => api.get("/api/events"),
  create: (payload) => api.post("/api/events", payload),
};

export const RegistrationAPI = {
  register: (payload) => api.post("/api/registrations", payload),
};

export const TicketsAPI = {
  get: (ticketId) => api.get(`/api/tickets/${ticketId}`),
};

export const CheckInAPI = {
  verify: (payload) => api.post("/api/checkin/verify", payload),
};
