import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { hash } from 'bcryptjs';
import pool from '@/lib/db/config';
import { getUserByUsername } from '@/lib/db/queries';

describe('Authentication and Security Tests', () => {
  const testUser = {
    username: 'testuser',
    password: 'Test@123',
    full_name: 'Test User',
    email: 'test@example.com',
    role: 'user'
  };
  
  // Setup test user
  beforeAll(async () => {
    // Hash the password
    const hashedPassword = await hash(testUser.password, 10);
    
    // Insert test user
    try {
      await pool.query(
        'INSERT INTO users (username, password, full_name, email, role) VALUES (?, ?, ?, ?, ?)',
        [testUser.username, hashedPassword, testUser.full_name, testUser.email, testUser.role]
      );
    } catch (error) {
      console.error('Error creating test user:', error);
    }
  });
  
  // Clean up after tests
  afterAll(async () => {
    // Remove test user
    try {
      await pool.query('DELETE FROM users WHERE username = ?', [testUser.username]);
    } catch (error) {
      console.error('Error removing test user:', error);
    }
    
    // Close database connection
    await pool.end();
  });
  
  // Test user retrieval
  it('should retrieve a user by username', async () => {
    const user = await getUserByUsername(testUser.username);
    
    expect(user).toBeDefined();
    expect(user.username).toBe(testUser.username);
    expect(user.full_name).toBe(testUser.full_name);
    expect(user.email).toBe(testUser.email);
    expect(user.role).toBe(testUser.role);
  });
  
  // Test password security
  it('should store passwords as hashed values', async () => {
    const user = await getUserByUsername(testUser.username);
    
    expect(user.password).toBeDefined();
    expect(user.password).not.toBe(testUser.password);
    expect(user.password.length).toBeGreaterThan(20); // Hashed passwords are long
  });
  
  // Test role-based access
  it('should have the correct role for the user', async () => {
    const user = await getUserByUsername(testUser.username);
    
    expect(user.role).toBe('user');
    expect(user.role).not.toBe('admin');
  });
});
