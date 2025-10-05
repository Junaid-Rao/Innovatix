const https = require('https');

class ApiClient {
  constructor() {
    this.baseURL = 'https://reqres.in/api';
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': 'reqres-free-v1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };
  }

  async makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
      // Use the full URL instead of constructing it
      const fullUrl = this.baseURL + path;
      const url = new URL(fullUrl);
      
      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: method,
        headers: this.headers
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const jsonData = JSON.parse(responseData);
            resolve({
              status: res.statusCode,
              data: jsonData
            });
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}. Response: ${responseData.substring(0, 200)}...`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async getUsers(page = 1) {
    return await this.makeRequest('GET', `/users?page=${page}`);
  }

  async getUserById(id) {
    return await this.makeRequest('GET', `/users/${id}`);
  }

  async createUser(userData) {
    try {
      return await this.makeRequest('POST', '/users', userData);
    } catch (error) {
      // Handle rate limiting (429) gracefully
      if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        return await this.makeRequest('POST', '/users', userData);
      }
      throw error;
    }
  }

  async updateUser(id, userData) {
    return await this.makeRequest('PUT', `/users/${id}`, userData);
  }

  async deleteUser(id) {
    return await this.makeRequest('DELETE', `/users/${id}`);
  }
}

module.exports = { ApiClient };
