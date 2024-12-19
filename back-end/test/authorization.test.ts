import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../service/userService';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (role: string) => {
  return jwt.sign(
    { id: 1, email: 'test@example.com', role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

beforeEach(() => {
    tokenBlacklist.clear();
  });

describe('Authorization Tests', () => {
  const adminToken = generateToken('ADMIN');
  const userToken = generateToken('USER');

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).patch('/users/1/role').send({ role: 'USER' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Unauthorized');
  });

  it('should return 401 for an invalid token', async () => {
    const res = await request(app)
      .patch('/users/1/role')
      .set('Authorization', 'Bearer invalid.token.here')
      .send({ role: 'USER' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid token');
  });

  it('should return 403 for a valid token with insufficient role', async () => {
    const res = await request(app)
      .patch('/users/1/role')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ role: 'ADMIN' });
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden: Insufficient permissions');
  });

  it('should allow access for a valid token with sufficient role', async () => {
    const res = await request(app)
      .patch('/users/1/role')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'USER' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.role).toBe('USER');
  });

  it('should invalidate the token on logout', async () => {
    const adminToken = generateToken('ADMIN');
  
    const logoutResponse = await request(app)
      .post('/users/logout')
      .set('Authorization', `Bearer ${adminToken}`);
  
    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.message).toBe('Successfully logged out');
  
    const protectedResponse = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
    
    console.log('Protected route response:', protectedResponse.status, protectedResponse.body);
  
    expect(protectedResponse.status).toBe(401);
    expect(protectedResponse.body.error).toBe('Token has been invalidated');
  });
});
