import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  role: string;
}

const generateJwtToken = ({ username, role }: JwtPayload): string => {
  const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  try {
    return jwt.sign({ username, role }, process.env.JWT_SECRET, options);
  } catch (error) {
    throw new Error('Error generating JWT token: see server log for details.');
  }
};

export { generateJwtToken };