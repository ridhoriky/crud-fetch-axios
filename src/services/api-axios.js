import axios from 'axios'

// Create axios instance with custom configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // You can add custom headers here
        'X-Custom-Header': 'employee-crud-app',
        // For authentication (example):
        // 'Authorization': 'Bearer your-token-here'
    }
})

apiClient.interceptors.request.use(
    (config) => {
        console.log(`[Axios] ${config.method.toUpperCase()} ${config.url}`)
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        console.error('[Axios Request Error]', error)
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => {
        console.log(`[Axios Response] ${response.status} ${response.config.url}`)
        return response
    },
    (error) => {
        console.error('[Axios Error]', error.response?.status, error.message)
        if (error.response?.status === 401) {
            console.error('Unauthorized! Please login again.')
        } else if (error.response?.status === 404) {
            console.error('Resource not found!')
        }

        return Promise.reject(error)
    }
)

export const employeeAPI = {
    // GET all employees
    getAll: async () => {
        const response = await apiClient.get('/employees')
        return response.data
    },

    // GET single employee
    getById: async (id) => {
        const response = await apiClient.get(`/employees/${id}`)
        return response.data
    },

    // CREATE new employee
    create: async (employeeData) => {
        const response = await apiClient.post('/employees', employeeData)
        return response.data
    },

    // UPDATE employee
    update: async (id, employeeData) => {
        const response = await apiClient.put(`/employees/${id}`, employeeData)
        return response.data
    },

    // DELETE employee
    delete: async (id) => {
        const response = await apiClient.delete(`/employees/${id}`)
        return response.data
    },

    // SEARCH employees (JSON Server search)
    search: async (query) => {
        const response = await apiClient.get(`/employees?q=${query}`)
        return response.data
    }
}

export default apiClient