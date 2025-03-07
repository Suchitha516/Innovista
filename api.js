// public/js/api.js - API client for frontend

const API_URL = '/api';

// Fetch college overview
async function fetchOverview() {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/info/overview`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching overview:', error);
    return null;
  }
}

// Fetch departments
async function fetchDepartments() {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/info/departments`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

// Fetch programs
async function fetchPrograms() {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/info/programs`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
}

// Fetch faculty
async function fetchFaculty() {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/info/faculty`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return [];
  }
}

// Fetch timeline events
async function fetchTimeline() {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/info/timeline`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }
}

// Fetch FAQs
async function fetchFAQs() {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/info/faq`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

// Login user
async function login(username, password) {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return { success: true };
    } else {
      return { success: false, message: data.msg };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Server error' };
  }
}

// Register user
async function register(username,phone, email, password) {
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return { success: true };
    } else {
      return { success: false, message: data.msg };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Server error' };
  }
}

// Get current user
async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await fetch(`${'https://echo.paw.cloud/'}/auth/me`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      localStorage.removeItem('token');
      return null;
    }
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

// Logout user
function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}