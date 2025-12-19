const BASE_URL = 'http://localhost:5000'

const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'employee-crud-app',
    // For authentication (example):
    // 'Authorization': 'Bearer your-token-here'
}

// Helper function to handle fetch requests
const fetchAPI = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`

    const headers = {
        ...defaultHeaders,
        ...options.headers,
    }

    const token = localStorage.getItem('token')
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const config = {
        ...options,
        headers,
    }

    console.log(`[Fetch] ${config.method || 'GET'} ${url}`)

    try {
        const response = await fetch(url, config)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Check if response has content
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json()
            console.log(`[Fetch Response] ${response.status} ${url}`)
            return data
        }

        return null
    } catch (error) {
        console.error('[Fetch Error]', error)

        // Handle specific errors
        if (error.message.includes('401')) {
            console.error('Unauthorized! Please login again.')
        } else if (error.message.includes('404')) {
            console.error('Resource not found!')
        }

        throw error
    }
}

// Employee API methods using Fetch
export const employeeAPI = {
    // GET all employees
    getAll: async () => {
        return await fetchAPI('/employees')
    },

    // GET single employee
    getById: async (id) => {
        return await fetchAPI(`/employees/${id}`)
    },

    // CREATE new employee
    create: async (employeeData) => {
        return await fetchAPI('/employees', {
            method: 'POST',
            body: JSON.stringify(employeeData),
        })
    },

    // UPDATE employee
    update: async (id, employeeData) => {
        return await fetchAPI(`/employees/${id}`, {
            method: 'PUT',
            body: JSON.stringify(employeeData),
        })
    },

    // DELETE employee
    delete: async (id) => {
        return await fetchAPI(`/employees/${id}`, {
            method: 'DELETE',
        })
    },

    // SEARCH employees
    search: async (query) => {
        return await fetchAPI(`/employees?q=${query}`)
    }
}