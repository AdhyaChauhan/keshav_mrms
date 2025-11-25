import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.error || 'Request failed',
        details: error.response.data?.details,
        status: error.response.status
      });
    }
    return Promise.reject({ message: 'Network error' });
  }
);

// DOCTORS API
export const getDoctors = async () => {
  try {
    const { data } = await api.get('/doctors');
    return data.map(doctor => ({
      ...doctor,
      _id: doctor._id.toString()
    }));
  } catch (error) {
    console.error('Get doctors error:', error);
    throw error;
  }
};

export const createDoctor = async (doctorData) => {
  try {
    const { data } = await api.post('/doctors', doctorData);
    return { ...data, _id: data._id.toString() };
  } catch (error) {
    console.error('Create doctor error:', error);
    throw error;
  }
};

export const updateDoctor = async (id, doctorData) => {
  try {
    const { data } = await api.put(`/doctors/${id}`, doctorData);
    return { ...data, _id: data._id.toString() };
  } catch (error) {
    console.error('Update doctor error:', error);
    throw error;
  }
};

export const deleteDoctor = async (id) => {
  try {
    await api.delete(`/doctors/${id}`);
    return id;
  } catch (error) {
    console.error('Delete doctor error:', error);
    throw error;
  }
};

// PAYMENTS API - SINGLE DEFINITION OF EACH FUNCTION
export const getPayments = async () => {
  try {
    const { data } = await api.get('/payments');
    return data.map(payment => ({
      ...payment,
      _id: payment._id.toString(),
      doctorId: payment.doctorId?.toString()
    }));
  } catch (error) {
    console.error('Get payments error:', error);
    throw error;
  }
};

export const getPaymentById = async (id) => {
  try {
    const { data } = await api.get(`/payments/${id}`);
    return {
      ...data,
      _id: data._id.toString(),
      doctorId: data.doctorId?.toString()
    };
  } catch (error) {
    console.error('Get payment error:', error);
    throw error;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const { data } = await api.post('/payments', paymentData);
    return {
      ...data,
      _id: data._id.toString(),
      doctorId: data.doctorId?.toString()
    };
  } catch (error) {
    console.error('Create payment error:', error);
    throw error;
  }
};

export const updatePayment = async (id, paymentData) => {
  try {
    const { data } = await api.put(`/payments/${id}`, paymentData);
    return {
      ...data,
      _id: data._id.toString(),
      doctorId: data.doctorId?.toString()
    };
  } catch (error) {
    console.error('Update payment error:', error);
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    await api.delete(`/payments/${id}`);
    return id;
  } catch (error) {
    console.error('Delete payment error:', error);
    throw error;
  }
};

export const getDoctorPayments = async (doctorId) => {
  try {
    const { data } = await api.get(`/payments/doctor/${doctorId}`);
    return data.map(payment => ({
      ...payment,
      _id: payment._id.toString(),
      doctorId: payment.doctorId?.toString()
    }));
  } catch (error) {
    console.error('Get doctor payments error:', error);
    throw error;
  }
};

export const getPendingPayments = async () => {
  try {
    const { data } = await api.get('/payments/status/pending');
    return data.map(payment => ({
      ...payment,
      _id: payment._id.toString(),
      doctorId: payment.doctorId?.toString()
    }));
  } catch (error) {
    console.error('Get pending payments error:', error);
    throw error;
  }
};


// DASHBOARD API
export const getDoctorsCount = async () => {
  try {
    const { data } = await api.get('/doctors/count');
    return data;
  } catch (error) {
    console.error('Get doctors count error:', error);
    throw error;
  }
};

export const getPaymentsSummary = async () => {
  try {
    const { data } = await api.get('/payments/summary');
    return data;
  } catch (error) {
    console.error('Get payments summary error:', error);
    throw error;
  }
};

export const getDashboardData = async () => {
  try {
    // Get all data needed for dashboard in parallel
    const [doctorsCount, paymentsSummary] = await Promise.all([
      getDoctorsCount(),
      getPaymentsSummary()
    ]);

    return {
      doctorsCount: doctorsCount.count,
      pendingPayments: paymentsSummary.pendingPayments,
      collectedPayments: paymentsSummary.collectedPayments,
      totalRevenue: paymentsSummary.totalRevenue
    };
  } catch (error) {
    console.error('Get dashboard data error:', error);
    throw error;
  }
};

export default api;