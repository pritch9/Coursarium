const authRepository = require('../../Repository/AuthRepository/AuthRepository');

// Create a new user
authRepository.createNewUser(1, 'example@example.com'
  , '$2a$12$pay0kLAvcb6OWpyuceYRyupdZ/7y8DMZZ6CFsjZM6edCAl9Pyvh82', ''
  ,'Test','User','Users, Test').then();

